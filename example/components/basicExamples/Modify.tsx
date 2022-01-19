import React, { VFC } from 'react'
import { Text } from 'react-native'
import { createNotifications } from 'react-native-notification'
import { styles } from '../styles'

interface Props {
  id: string
}

const { useNotifications } = createNotifications()

export const Modify: VFC<Props> = ({ id }) => {
  const { modify } = useNotifications()

  return (
    <Text
      style={styles.text}
      onPress={() =>
        modify({ id, params: { title: 'Modified title', description: 'Modified description' } })
      }>
      Modify success
    </Text>
  )
}
