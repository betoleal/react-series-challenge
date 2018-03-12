import axios from 'axios'
import { put, takeEvery, all } from 'redux-saga/effects'

import {
  FETCHED_TREND,
  FETCH_TREND,
  ADD_FAVORITE,
  ADDED_FAVORITE,
  DELETE_FAVORITE,
  DELETED_FAVORITE,
  FETCH_DETAILS,
  FETCHED_DETAILS
} from '../actions/types'

const API_KEY = 'rqQsxVnE0vVW4UVFNqfjHpgjMijSundV'
const BASE_URL = 'https://api.giphy.com'

function* helloSaga() {
  yield console.log('Hello Sagas!')
}

function* fetchTrend() {
  const PATH = '/v1/stickers/trending'
  const response = yield axios.get(
    `${BASE_URL}${PATH}`,
    {
      params: {
        api_key: API_KEY
      }
    }
  )
  yield put({
    type: FETCHED_TREND,
    payload: response.data.data
  })
}

function* AddingToFavorites(action) {
  yield put({
    type: ADDED_FAVORITE,
    payload: action.favorite
  })
}

function* deletingFromFavorites(action) {
  yield put({
    type: DELETED_FAVORITE,
    payload: action.favorite
  })
}

function* fetchDetail(action) {
  const PATH = `/v1/gifs/${action.gimphyId}`
  let actionCreator
  try{
    const response = yield axios.get(
      `${BASE_URL}${PATH}`,
      {
        params: {
          api_key: API_KEY
        }
      }
    )
    actionCreator = {
      type: FETCHED_DETAILS,
      payload: response.data.data
    }
  }catch(err){
    const responseData = {}
    actionCreator = {
      type: FETCHED_DETAILS,
      payload: responseData
    }
  }
  yield put(actionCreator)
}

function* watchFetchTrend() {
  yield takeEvery(FETCH_TREND, fetchTrend)
}

function* watchAddFavorite() {
  yield takeEvery(ADD_FAVORITE, AddingToFavorites)
}

function* watchDeleteFavorite() {
  yield takeEvery(DELETE_FAVORITE, deletingFromFavorites)
}

function* watchFetchDetails() {
  yield takeEvery(FETCH_DETAILS, fetchDetail)
}

export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchFetchTrend(),
    watchAddFavorite(),
    watchDeleteFavorite(),
    watchFetchDetails()
  ])
}