import React, { VFC } from 'react'
import { Text } from 'react-native'
import { styles } from '../styles'

interface Props {
  onPress: () => void
}

export const ModifyButton: VFC<Props> = ({ onPress }) => {
  return (
    <Text style={styles.text} onPress={onPress}>
      Modify success
    </Text>
  )
}
