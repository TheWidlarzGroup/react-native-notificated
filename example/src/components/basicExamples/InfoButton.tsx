import React, { VFC } from 'react'
import { Text } from 'react-native'
import { styles } from '../styles'

interface Props {
  onPress: () => void
}

export const InfoButton: VFC<Props> = ({ onPress }) => {
  return (
    <Text style={[styles.text, styles.info]} onPress={onPress}>
      Emit info
    </Text>
  )
}
