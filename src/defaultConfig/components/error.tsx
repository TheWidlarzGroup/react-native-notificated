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

export const ErrorNotification = (notificationConfig: Props) => {
  const { defaultNotificationPosition, variants } = useNotificationConfig()

  let positionStyles = defaultNotificationPosition
  if (variants?.error?.config?.position) {
    positionStyles = variants?.error?.config?.position
  }

  return (
    <View style={[styles.container, styles[positionStyles]]}>
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
    backgroundColor: 'red',
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
