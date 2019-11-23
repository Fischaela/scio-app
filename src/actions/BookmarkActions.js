import { API_URL } from '../config'
import { sessionError } from './SessionActions'
import { handleApiErrors } from '../helpers'

// ACTIONS

export const createBookmarkRequest = () => ({
  type: 'CREATE_BOOKMARK_REQUEST',
})

export const createBookmarkSuccess = () => ({
  type: 'CREATE_BOOKMARK_SUCCESS',
})

export const deleteBookmarkRequest = () => ({
  type: 'DELETE_BOOKMARK_REQUEST',
})

export const deleteBookmarkSuccess = () => ({
  type: 'DELETE_BOOKMARK_SUCCESS',
})

export const getBookmarksRequest = () => ({
  type: 'GET_BOOKMARKS_REQUEST',
})

export const getBookmarksSuccess = (json) => ({
  payload: json,
  type: 'GET_BOOKMARKS_SUCCESS',
})

export const updateBookmarkRequest = () => ({
  type: 'UPDATE_BOOKMARK_REQUEST',
})

export const updateBookmarkSuccess = () => ({
  type: 'UPDATE_BOOKMARK_SUCCESS',
})

// ASYNC ACTIONS

export const getBookmarks = () => {
  return (dispatch) => {
    dispatch(getBookmarksRequest())
    return fetch(`${API_URL}/shortcuts`, {
      'cache-control': 'no-cache',
      credentials: 'include',
      method: 'GET',
    })
      .then(response => {
        handleApiErrors(response)
        return response.json()
      })
      .then((json) => {
        return dispatch(getBookmarksSuccess(json))
      })
      .catch((error) => {
        dispatch(sessionError(error))
      })
  }
}