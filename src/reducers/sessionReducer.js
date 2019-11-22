const defaultStore = {
  sessionState: 'UNKNOWN',
}

/**
 * REDUCER
 */
const reducer = (store = defaultStore, action) => {
  switch (action && action.type) {
    case 'SET_SESSION_STATE':
      return { ...store, sessionState: action.payload }
    default:
      return Object.assign({}, store)
  }
}

export default reducer

/**
 * PRIVATE SELECTORS
 */
export const getSessionState = (store = defaultStore) => (store.sessionState)
