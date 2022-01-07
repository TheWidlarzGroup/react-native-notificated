import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { createNotifications } from 'react-native-notification'

const { NotificationsProvider, notify } = createNotifications({
  defaultStylesSettings: {
    globalConfig: {
      titleSize: 15,
    },
    errorConfig: {
      titleSize: 20,
      borderRadius: 30,
    },
    successConfig: {
      titleSize: 17,
    },
  },
})

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />
      <Text
        onPress={() =>
          notify('success', {
            description: 'This is where the toast text goes',
            title: 'Success',
          })
        }>
        emit success
      </Text>
      <Text
        onPress={() =>
          notify('error', {
            description:
              'This is where the toast text goes. This is where the toast text goes. This is where the toast text goes. This is where the toast text goes. This is where the toast text goes. This is where the toast text goes. ',
            // title: 'Error',
            // titleColor: 'red',
            // borderColor: 'yellow',
            multiline: 5,
          })
        }>
        emit error
      </Text>
      <Text
        onPress={() =>
          notify('warning', {
            description: 'This is where the toast text goes',
            title: 'Warning',
            // bgColor: 'black',
            titleSize: 20,
          })
        }>
        emit warning
      </Text>
      <Text
        onPress={() =>
          notify('undo', {
            message: 'undo message',
            title: 'undo',
            onPress: () =>
              notify('success', {
                description: 'undo action success',
                title: 'undo action success',
              }),
          })
        }>
        emit undo
      </Text>
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
