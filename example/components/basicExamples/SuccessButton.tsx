import React, { VFC } from 'react'
import { Text } from 'react-native'
import { styles } from '../styles'

interface Props {
  onPress: () => void
}

export const SuccessButton: VFC<Props> = ({ onPress }) => {
  return (
    <Text style={[styles.text, styles.success]} onPress={onPress}>
      Emit success
    </Text>
  )
}
