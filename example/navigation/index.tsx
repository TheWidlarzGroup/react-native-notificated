import React from 'react'
import { DefaultExamples } from '../screens/DefaultExamples'
import { createDrawerNavigator } from '@react-navigation/drawer'
import type { Routes } from './routes'
import { GlobalConfigExamples } from '../screens/GlobalConfigExamples'
import { GlobalTypesConfigExamples } from '../screens/GlobalTypesConfigExamples'
import { DarkModeExamples } from '../screens/DarkModeExamples'
import { SingleCustomCases } from '../screens/SingleCustomCases'

const Drawer = createDrawerNavigator<Routes>()

export const AppNavigator = () => (
  <Drawer.Navigator screenOptions={{ header: () => null }}>
    <Drawer.Screen name="Default Examples" component={DefaultExamples} />
    <Drawer.Screen name="Dark Mode Examples" component={DarkModeExamples} />
    <Drawer.Screen name="Global Config Examples" component={GlobalConfigExamples} />
    <Drawer.Screen name="Global Types Config Examples" component={GlobalTypesConfigExamples} />
    <Drawer.Screen name="Single Custom Cases" component={SingleCustomCases} />
  </Drawer.Navigator>
)
