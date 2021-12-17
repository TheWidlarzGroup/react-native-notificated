import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import type {NotificationConfig} from "../../types/config";
import {themeBase} from "./theme";

interface Props {
  notificationConfig: NotificationConfig
}

export const WarningNotification = ({notificationConfig}: Props) => {
  return (
    <View style={styles.container}>
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
    backgroundColor: 'orange',
    height: 50,
  },
})
