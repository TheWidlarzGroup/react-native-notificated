import { View } from 'react-native'
import React from 'react'

type Props = {
  customText: string
  customTitle?: string
}

export const CustomError = (p: Props) => {
  console.log(p)
  return <View></View>
}
