import React from 'react'
import { View } from 'react-native'

type Props = {
  callback: () => void
  customTitle: string
}

export const CustomSuccess = (p: Props) => {
  console.log(p)
  // eslint-disable-next-line react-native/no-inline-styles
  return <View style={{ width: '100%', height: 50, backgroundColor: 'green' }} />
}
