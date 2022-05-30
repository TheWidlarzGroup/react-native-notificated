import React, { VFC } from 'react'
import { Text } from 'react-native'
import { styles } from './styles'

type Props = {
  onPress: () => void
}

export const WarningButton: VFC<Props> = ({ onPress }) => {
  return (
    <Text style={[styles.text, styles.warning]} onPress={onPress}>
      Emit warning
    </Text>
  )
}
