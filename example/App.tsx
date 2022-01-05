import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { createNotifications } from 'react-native-notification'

const { NotificationsProvider, notify } = createNotifications({
  defaultGlobalConfig: {
    titleSize: 4,
    bgColor: 'red',
    title: 'KURŁA ZBYCHU!!!',
  },
  defaultErrorConfig: {
    titleSize: 20,
    borderRadius: 5,
  },
  defaultSuccessConfig: {
    titleSize: 10,
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
            // theme: 'dark',
          })
        }>
        emit success
      </Text>
      <Text
        onPress={() =>
          notify('error', {
            description: 'This is where the toast text goes',
            title: 'Error',
            // theme: 'regular',
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
            theme: 'dark',
            bgColor: 'black',
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
                theme: 'dark',
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
