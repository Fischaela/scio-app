/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import ScioShareExtension from './ScioShareExtension'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
AppRegistry.registerComponent('ScioShareExtension', () => ScioShareExtension)
