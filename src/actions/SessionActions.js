import { API_URL } from '../config'
import { getBookmarks } from './BookmarkActions'
import { handleApiErrors } from '../helpers'

// ACTIONS

export const loginRequest = () => ({
  type: 'LOGIN_REQUEST',
})

export const loginSuccess = (json) => ({
  payload: json,
  type: 'LOGIN_SUCCESS',
})

export const logout = () => ({
  type: 'LOGOUT_SUCCESS',
})

export const sessionError = (error) => ({
  payload: error,
  type: 'SESSION_ERROR',
})

export const setEmail = (email) => ({
  payload: email,
  type: 'SET_EMAIL',
})

export const setPassword = (password) => ({
  payload: password,
  type: 'SET_PASSWORD',
})

export const setSessionState = (value) => ({
  payload: value,
  type: 'SET_SESSION_STATE',
})

// ASYNC ACTIONS

export const login = (emailAddress, password) => {
  return (dispatch) => {
    dispatch(loginRequest())
    const data = {
      email: emailAddress,
      password: password,
    }
    console.log('here', emailAddress, password)
    return fetch(`${API_URL}/sessions`, {
      body: JSON.stringify(data),
      'cache-control': 'no-cache',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => {
        handleApiErrors(response)
        return dispatch(getBookmarks())
      })
      .then(() => {
        return dispatch(loginSuccess())
      })
      .catch((error) => (
        dispatch(sessionError(error))
      ))
  }
}
