import 'react-native-gesture-handler'
import React from 'react'
import { AppNavigator } from './src/navigation'
import { NavigationContainer } from '@react-navigation/native'

const App = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
)

export default App
