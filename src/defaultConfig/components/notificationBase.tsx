import React from 'react'
import { Image, Text, View } from 'react-native'
import {
  constShadow,
  getContainerStyles,
  getDescriptionStyle,
  getLeftAccentStyle,
  getTitleStyle,
} from '../stylesUtils'
import { styles } from '../styles'
import type { MergedNotificationStyleConfig, NotificationOwnProps } from '../types'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useNotificationController } from 'react-native-notificated'

export const NotificationBase = (props: NotificationOwnProps & MergedNotificationStyleConfig) => {
  const containerStyles = getContainerStyles({ ...props })
  const titleStyle = getTitleStyle({ ...props })
  const descriptionStyle = getDescriptionStyle({ ...props })
  const accentStyle = getLeftAccentStyle(props.accentColor)
  const rightIconSource =
    props.theme === 'regular'
      ? require('../../assets/images/close-regularMode.png')
      : require('../../assets/images/close-darkMode.png')
  const { remove } = useNotificationController()

  const renderLeftIcon = () => <Image source={props.leftIconSource!} style={styles.icon} />

  const renderRightIcon = () => (
    <TouchableOpacity
      onPress={() => {
        remove()
      }}>
      <Image source={rightIconSource} style={styles.icon} />
    </TouchableOpacity>
  )

  const renderTitle = () => <Text style={titleStyle}>{props.title}</Text>
  const renderDescription = () =>
    !!props.description && (
      <Text style={descriptionStyle} numberOfLines={props.multiline ?? 1}>
        {props.description}
      </Text>
    )

  return (
    <View style={constShadow(props.theme, props.borderRadius)}>
      <TouchableWithoutFeedback onPress={() => props.onPress?.()}>
        <View style={containerStyles}>
          {props.borderType === 'accent' && <View style={accentStyle} />}
          <View style={styles.content}>
            {props.defaultIconType !== 'no-icon' && renderLeftIcon()}
            <View style={styles.textWrapper}>
              {renderTitle()}
              {renderDescription()}
            </View>
            {renderRightIcon()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}
