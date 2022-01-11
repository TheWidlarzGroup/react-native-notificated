import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Home } from '../components/Home'
import type { Routes } from './routes'

const Stack = createStackNavigator<Routes>()

export const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
)
