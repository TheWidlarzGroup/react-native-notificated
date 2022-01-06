import React from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import { themeBase } from './theme'
import type { Theme } from '../../types'

type F0<T = void> = () => T

export interface NotificationBaseStyles extends ViewStyle {
  theme?: Theme
  borderRadius?: number
  borderColor?: string
  borderWidth?: number
  titleColor?: string
  titleSize?: number
  descriptionColor?: string
  descriptionSize?: number
  bgColor?: string
}

export interface NotificationBaseProps extends NotificationBaseStyles {
  title?: string
  description?: string
  icon?: any
  multiline?: number
  onClose?: F0
}

const getContainerStyles = (styles: NotificationBaseStyles): Partial<ViewStyle> => ({
  borderRadius: styles.borderRadius ?? themeBase.borderRadius.default,
  backgroundColor: styles.bgColor
    ? styles.bgColor
    : styles.theme
    ? themeBase.bgColor[styles.theme]
    : themeBase.bgColor.regular,
  ...styles,
})

const getTitleStyle = (styles: NotificationBaseStyles, theme: Theme): Partial<TextStyle> => ({
  color: styles.titleColor ? styles.titleColor : themeBase.fontColor[theme],
  fontSize: styles.titleSize ? styles.titleSize : themeBase.fontSize.headerFontSize,
  lineHeight: 19,
  paddingBottom: themeBase.spacing.s,
})

const getDescriptionStyle = (styles: NotificationBaseStyles, theme: Theme): Partial<TextStyle> => ({
  color: styles.descriptionColor ? styles.descriptionColor : themeBase.fontColor[theme],
  fontSize: styles.descriptionSize ? styles.descriptionSize : themeBase.fontSize.messageFontSize,
  lineHeight: 16,
})

const getThemeStyles = (theme: Theme): Partial<ViewStyle | TextStyle> => ({
  color: themeBase.fontColor[theme],
  backgroundColor: themeBase.bgColor[theme],
})

export const NotificationBase = (props: NotificationBaseProps) => {
  const containerStyles = getContainerStyles({ ...props })
  const titleStyle = getTitleStyle({ ...props }, props.theme ?? 'regular')
  const descriptionStyle = getDescriptionStyle({ ...props }, props.theme ?? 'regular')
  const themeStyles = getThemeStyles(props.theme ?? 'regular')

  const renderLeftIcon = () =>
    !!props.icon && <View style={[styles.icon, themeStyles]}>{props.icon}</View>

  const renderTitle = () => !!props.title && <Text style={titleStyle}>{props.title}</Text>

  const renderDescription = () => (
    <Text style={descriptionStyle} numberOfLines={props.multiline ?? 1}>
      {props.description}
    </Text>
  )
  const renderRightIcon = () =>
    props.onClose && (
      <View style={styles.rightIcon}>
        <Text>Close</Text>
      </View>
    )

  return (
    <View style={[containerStyles, styles.container]}>
      {renderLeftIcon()}
      <View style={[styles.content]}>
        {renderTitle()}
        {renderDescription()}
      </View>
      {renderRightIcon()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 24,
  },
  icon: {},
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  rightIcon: {},
})
