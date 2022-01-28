import React, { Dispatch, SetStateAction, VFC } from 'react'
import { Text } from 'react-native'
import { createNotifications } from 'react-native-notification'
import { styles } from '../styles'

interface Props {
  setId?: Dispatch<SetStateAction<string>>
}

const { useNotifications } = createNotifications()

export const Success: VFC<Props> = ({ setId }) => {
  const { notify } = useNotifications()

  return (
    <Text
      style={[styles.text, styles.success]}
      onPress={() =>
        setId
          ? setId(
              notify('success', {
                description: 'This is where the toast text goes',
                title: 'Success',
              }).id
            )
          : notify('success', {
              description: 'This is where the toast text goes',
              title: 'Success',
            }).id
      }>
      Emit success
    </Text>
  )
}
