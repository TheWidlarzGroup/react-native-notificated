import React, { VFC } from 'react'
import { Text } from 'react-native'
import { styles } from '../styles'

interface Props {
  onPress: () => void
  buttonText: string
}

export const AnimationButton: VFC<Props> = ({ onPress, buttonText }) => {
  return (
    <Text style={[styles.text, styles.success]} onPress={onPress}>
      {buttonText}
    </Text>
  )
}
