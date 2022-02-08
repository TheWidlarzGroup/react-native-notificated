import React, { VFC } from 'react'
import { Text } from 'react-native'
import { styles } from '../styles'

interface Props {
  onPress: () => void
}

export const ErrorButton: VFC<Props> = ({ onPress }) => {
  return (
    <Text style={[styles.text, styles.error]} onPress={onPress}>
      Emit error
    </Text>
  )
}
