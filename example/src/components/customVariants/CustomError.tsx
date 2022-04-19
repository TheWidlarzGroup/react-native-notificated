import { View } from 'react-native'
import React from 'react'

type Props = {
  customText: string
  customTitle?: string
}

export const CustomError = (p: Props) => {
  console.log(p)
  // eslint-disable-next-line react-native/no-inline-styles
  return <View style={{ width: '100%', height: 50, backgroundColor: 'red' }} />
}
