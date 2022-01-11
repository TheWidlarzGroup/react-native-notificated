import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Home } from './Home'
import type { Routes } from '../Routes'

const Stack = createStackNavigator<Routes>()

export const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
)
