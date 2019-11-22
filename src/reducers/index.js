import sessionReducer, * as FromSession from './sessionReducer'

/**
 * ROOT REDUCER
 * combines all reducers
 */
const rootReducer = {
  ['SESSION']: sessionReducer,
}

export default rootReducer

/**
 * PUBLIC SELECTORS
 */
export const getSessionState = (store) => (
  FromSession.getSessionState(store[SESSION])
)