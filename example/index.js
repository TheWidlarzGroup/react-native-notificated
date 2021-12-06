/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'

console.log(AppRegistry.getAppKeys())
console.log('Dreams')

AppRegistry.registerComponent(appName, () => App)
