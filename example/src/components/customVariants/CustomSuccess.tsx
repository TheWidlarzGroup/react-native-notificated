import React from 'react'
import { View } from 'react-native'

type Props = {
  callback: () => void
  customTitle: string
}

export const CustomSuccess = (p: Props) => {
  console.log(p)
  return <View style={{ width: '100%', height: 50, backgroundColor: 'green' }} />
}
