import React from 'react'
import { Home } from '../components/Home'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()

export const AppNavigator = () => (
  <Drawer.Navigator screenOptions={{ header: () => null }}>
    <Drawer.Screen name="Home" component={Home} />
  </Drawer.Navigator>
)
