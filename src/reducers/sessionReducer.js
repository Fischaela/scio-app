const defaultStore = {
  sessionError: null,
  sessionState: 'UNKNOWN',
  email: '',
  password: '',
}

/**
 * REDUCER
 */
const reducer = (store = defaultStore, action) => {
  switch (action && action.type) {
    case 'LOGIN_SUCCESS':
      return {...store, sessionState: 'LOGGED_IN'}
    case 'LOGIN_REQUEST':
      return {...store, sessionState: 'LOGIN_IN_PROGRESS'}
    case 'SESSION_ERROR':
      return {...store, sessionState: 'INVALID', sessionError: action.payload}
    case 'SET_EMAIL':
      return {...store, email: action.payload}
    case 'SET_PASSWORD':
      return {...store, password: action.payload}
    case 'SET_SESSION_STATE':
      return { ...store, sessionState: action.payload }
    default:
      return Object.assign({}, store)
  }
}

export default reducer
