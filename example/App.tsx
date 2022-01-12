import React from 'react'
import { useState } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { createNotifications } from 'react-native-notification'

const { NotificationsProvider, useNotification, remove } = createNotifications({
  defaultStylesSettings: {
    globalConfig: {
      borderType: 'accent',
      defaultIconType: 'monochromatic',
    },
    errorConfig: {
      titleColor: 'red',
      borderType: 'border',
    },
  },
})

const App = () => {
  const [id, setId] = useState('')

  const { notify } = useNotification()

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />
      <Text
        onPress={() =>
          setId(
            notify('success', {
              description: 'This is where the toast text goes',
              title: 'Success',
            }).id
          )
        }>
        emit success
      </Text>
      <Text
        onPress={() =>
          notify('error', {
            description:
              'This is where the toast text goes. This is where the toast text goes. This is where the toast text goes. This is where the toast text goes. This is where the toast text goes. This is where the toast text goes. ',
            title: 'Neutral title',
          })
        }>
        emit error
      </Text>
      <Text
        onPress={() =>
          notify('warning', {
            description: 'This is where the toast text goes',
            title: 'Warning',
          })
        }>
        emit warning
      </Text>
      <Text
        onPress={() =>
          notify('info', {
            description: 'This is where the toast text goes',
            title: 'Info',
          })
        }>
        emit info
      </Text>
      <Text onPress={() => remove(id)}>Remove {id}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column-reverse',
    marginBottom: 40,
  },
})

export default App
