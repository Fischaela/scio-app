import { persistStore, persistCombineReducers, createTransform } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

const config = {
  debug: true,
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet,
}
const reducer = persistCombineReducers(config, reducers)

const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(thunk)
    ),
  )
  const persistor = persistStore(
    store,
    null,
    () => { store.getState() },
  )
  return { persistor, store }
}

export default configureStore
