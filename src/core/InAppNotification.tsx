import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { themeBase } from '../defaultConfig/components/theme'
import type { NotificationConfig } from '../types/config'

interface Props {
  notificationConfig: NotificationConfig
}

export const InAppNotification = ({ notificationConfig }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorMsg}>{notificationConfig.title}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  searchIcon: {
    marginLeft: themeBase.spacing.m,
  },
  errorMsg: {
    color: 'white',
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'red',
    height: 50,
  },
})
