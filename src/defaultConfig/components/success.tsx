import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { themeBase } from './theme'
import { useNotificationConfig } from '../../core/useNotificationConfig'
import { DEVICE_HEIGHT } from '../../utils/deviceInfo'

interface Props {
  title: string
  message: string
}

const NOTIFICATION_HEIGHT = 50

export const SuccessNotification = (notificationConfig: Props) => {
  const { defaultNotificationPosition } = useNotificationConfig()

  return (
    <View style={[styles.container, styles[defaultNotificationPosition]]}>
      <Text style={styles.errorMsg}>{notificationConfig.title}</Text>
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
    backgroundColor: 'green',
    height: NOTIFICATION_HEIGHT,
  },
  top: {},
  center: {
    top: DEVICE_HEIGHT / 2 - NOTIFICATION_HEIGHT,
  },
  bottom: {
    top: DEVICE_HEIGHT - 2 * NOTIFICATION_HEIGHT,
  },
})
