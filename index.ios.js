import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import configureStore from './src/configureStore'
import App from './App'
import ScioShareExtension from './ScioShareExtension'
import { name as appName } from './app.json'

const { persistor, store } = configureStore()

export default class ReduxApp extends Component {

  render () {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    )
  }
}

AppRegistry.registerComponent(appName, () => ReduxApp)
AppRegistry.registerComponent('ScioShareExtension', () => ScioShareExtension)
