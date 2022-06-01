import React, { VFC } from 'react'
import { Text } from 'react-native'
import { styles } from '../basicExamples/styles'

type Props = {
  onPress: () => void
  buttonTitle: string
}

export const CustomCaseButton: VFC<Props> = ({ onPress, buttonTitle }) => {
  return (
    <Text style={[styles.text, styles.info]} onPress={onPress}>
      {buttonTitle}
    </Text>
  )
}
