import React from 'react'
import type { MergedNotificationStyleConfig } from '../../types'
import { Image, Text, View } from 'react-native'
import {
  constShadow,
  getContainerStyles,
  getDescriptionStyle,
  getLeftAccentStyle,
  getTitleStyle,
} from '../stylesUtils'
import { styles } from '../styles'
import type { NotificationOwnProps } from '../types'

export const NotificationBase = (props: NotificationOwnProps & MergedNotificationStyleConfig) => {
  const containerStyles = getContainerStyles({ ...props })
  const titleStyle = getTitleStyle({ ...props })
  const descriptionStyle = getDescriptionStyle({ ...props })
  const accentStyle = getLeftAccentStyle(props.accentColor)
  const rightIconSource =
    props.theme === 'regular'
      ? require('../../assets/images/close-regularMode.png')
      : require('../../assets/images/close-darkMode.png')

  const renderLeftIcon = () => <Image source={props.leftIconSource!} style={styles.icon} />
  const renderRightIcon = () => <Image source={rightIconSource} style={styles.icon} />
  const renderTitle = () => <Text style={titleStyle}>{props.title}</Text>
  const renderDescription = () => (
    <Text style={descriptionStyle} numberOfLines={props.multiline ?? 1}>
      {props.description}
    </Text>
  )
  const renderUndoButton = () => (
    <Text onPress={props.onPress} style={styles.undo}>
      UNDO
    </Text>
  )

  return (
    <View style={constShadow(props.theme, props.borderRadius)}>
      <View style={containerStyles}>
        {props.borderType === 'accent' && <View style={accentStyle} />}
        <View style={styles.content}>
          {props.defaultIconType !== 'no-icon' && renderLeftIcon()}
          <View style={styles.textWrapper}>
            {renderTitle()}
            {renderDescription()}
            {props.onPress && renderUndoButton()}
          </View>
          {renderRightIcon()}
        </View>
      </View>
    </View>
  )
}
