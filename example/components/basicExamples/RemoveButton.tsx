import React, { VFC } from 'react'
import { Text } from 'react-native'
import { styles } from '../styles'

interface Props {
  onPress: () => void
}

export const RemoveButton: VFC<Props> = ({ onPress }) => {
  return (
    <Text style={styles.text} onPress={onPress}>
      Remove success
    </Text>
  )
}
