import React, { VFC } from 'react'
import { Text } from 'react-native'
import { createNotifications } from 'react-native-notification'
import { styles } from '../styles'

interface Props {
  id: string
}

const { useNotifications } = createNotifications()

export const Remove: VFC<Props> = ({ id }) => {
  const { remove } = useNotifications()

  return (
    <Text style={styles.text} onPress={() => remove(id)}>
      Remove
    </Text>
  )
}
