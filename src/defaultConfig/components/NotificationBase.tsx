import React from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import { themeBase } from './theme'
import type { PropsConfig, Theme } from '../../types'

// type F0<T = void> = () => T

const getContainerStyles = (styles: PropsConfig): Partial<ViewStyle> => ({
  borderRadius: styles.borderRadius ?? themeBase.borderRadius.default,
  backgroundColor: styles.bgColor
    ? styles.bgColor
    : styles.theme
    ? themeBase.bgColor[styles.theme]
    : themeBase.bgColor.regular,
  ...styles,
})

const getTitleStyle = (styles: PropsConfig): Partial<TextStyle> => ({
  color: styles.titleColor ? styles.titleColor : themeBase.fontColor[styles.theme],
  fontSize: styles.titleSize ? styles.titleSize : themeBase.fontSize.headerFontSize,
  lineHeight: 19,
  paddingBottom: themeBase.spacing.s,
})

const getDescriptionStyle = (styles: PropsConfig): Partial<TextStyle> => ({
  color: styles.descriptionColor ? styles.descriptionColor : themeBase.fontColor[styles.theme],
  fontSize: styles.descriptionSize ? styles.descriptionSize : themeBase.fontSize.messageFontSize,
  lineHeight: 16,
})

const getThemeStyles = (theme: Theme): Partial<ViewStyle | TextStyle> => ({
  color: themeBase.fontColor[theme],
  backgroundColor: themeBase.bgColor[theme],
})

export const NotificationBase = (props: PropsConfig) => {
  const containerStyles = getContainerStyles({ ...props })
  const titleStyle = getTitleStyle({ ...props })
  const descriptionStyle = getDescriptionStyle({ ...props })
  const themeStyles = getThemeStyles(props.theme)

  const renderLeftIcon = () =>
    !!props.icon && <View style={[styles.icon, themeStyles]}>{props.icon}</View>
  const renderTitle = () => !!props.title && <Text style={titleStyle}>{props.title}</Text>
  const renderDescription = () => (
    <Text style={descriptionStyle} numberOfLines={props.multiline ?? 1}>
      {props.description}
    </Text>
  )
  // const renderRightIcon = () =>
  //   props.onClose && (
  //     <View style={styles.rightIcon}>
  //       <Text>Close</Text>
  //     </View>
  //   )

  return (
    <View style={[containerStyles, styles.container]}>
      {renderLeftIcon()}
      <View style={[styles.content]}>
        {renderTitle()}
        {renderDescription()}
      </View>
      {/*{renderRightIcon()}*/}
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
