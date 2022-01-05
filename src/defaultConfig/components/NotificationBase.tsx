import React from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import { themeBase } from './theme'

type F0<T = void> = () => T

type Theme = 'regular' | 'dark'

export interface NotificationBaseStyles extends ViewStyle {
  rounded?: boolean
  theme?: Theme
  accentColor?: string
}

export interface NotificationBaseProps extends NotificationBaseStyles {
  text: string
  icon?: any
  title?: string
  multiline?: number
  onClose?: F0
}

const getContainerStyles = (styles: NotificationBaseStyles): Partial<ViewStyle> => ({
  borderRadius: styles.rounded ? themeBase.borderRadius.m : themeBase.borderRadius.s,
  backgroundColor: styles.theme ? themeBase.bgColor[styles.theme] : 'white',
  borderColor: styles.accentColor,
  ...styles,
})

const getThemeStyles = (theme: Theme): Partial<ViewStyle | TextStyle> => ({
  color: themeBase.color[theme],
  backgroundColor: themeBase.bgColor[theme],
})

export const NotificationBase = (p: NotificationBaseProps) => {
  const containerStyles = getContainerStyles({ ...p })
  const themeStyles = getThemeStyles(p.theme ?? 'regular')

  const renderIcon = () => !!p.icon && <View style={[styles.icon, themeStyles]}>{p.icon}</View>
  const renderTitle = () => !!p.title && <Text style={[styles.title, themeStyles]}>{p.title}</Text>
  const renderText = () => (
    <Text style={[styles.text, themeStyles]} numberOfLines={p.multiline ?? 1}>
      {p.text}
    </Text>
  )
  const renderRightIcon = () =>
    p.onClose && (
      <View style={styles.rightIcon}>
        <Text>Close</Text>
      </View>
    )

  return (
    <View style={[containerStyles, styles.container]}>
      {renderIcon()}
      <View style={[styles.content]}>
        {renderTitle()}
        {renderText()}
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
  title: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    paddingBottom: 8,
  },
  text: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 16,
  },
  rightIcon: {},
})
