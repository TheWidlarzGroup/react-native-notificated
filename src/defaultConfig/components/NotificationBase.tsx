import React from 'react'
import type { PropsConfig } from '../../types'
import { Image, StyleSheet, Text, View } from 'react-native'
import {
  getContainerStyles,
  getDescriptionStyle,
  getLeftAccentStyle,
  getTitleStyle,
} from '../stylesUtils'

export const NotificationBase = (props: PropsConfig) => {
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

  return (
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
  )
}

const styles = StyleSheet.create({
  icon: {
    height: 35,
    width: 35,
  },
  textWrapper: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 18,
  },
  content: {
    paddingVertical: 24,
    paddingLeft: 14,
    paddingRight: 18,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
})
