import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { themeBase } from './theme'

interface Props {
  title: string
  message: string
  onPress: () => void
}

export const UndoNotification = (notificationConfig: Props) => {
  return (
    <View style={styles.container}>
      <Text onPress={notificationConfig.onPress} style={styles.errorMsg}>
        {notificationConfig.title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  searchIcon: {
    marginLeft: themeBase.spacing.mplus,
  },
  errorMsg: {
    color: 'white',
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'pink',
    height: 50,
  },
})
