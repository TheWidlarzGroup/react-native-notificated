import type { PropsConfig } from '../types'
import type { TextStyle, ViewStyle } from 'react-native'
import { themeBase } from './components/theme'
// import { Theme } from "../types";

export const getTitleStyle = (styles: PropsConfig): Partial<TextStyle> => ({
  color: styles.titleColor ? styles.titleColor : themeBase.fontColor[styles.theme],
  fontSize: styles.titleSize ? styles.titleSize : themeBase.fontSize.headerFontSize,
  lineHeight: 19,
  paddingBottom: themeBase.spacing.s,
})

export const getDescriptionStyle = (styles: PropsConfig): Partial<TextStyle> => ({
  color: styles.descriptionColor ? styles.descriptionColor : themeBase.fontColor[styles.theme],
  fontSize: styles.descriptionSize ? styles.descriptionSize : themeBase.fontSize.messageFontSize,
  lineHeight: 16,
})

export const getContainerStyles = (styles: PropsConfig): Partial<ViewStyle> => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingVertical: 24,
  paddingHorizontal: 16,
  borderRadius: styles.borderRadius ?? themeBase.borderRadius.default,
  backgroundColor: styles.bgColor
    ? styles.bgColor
    : styles.theme
    ? themeBase.bgColor[styles.theme]
    : themeBase.bgColor.regular,
  ...styles,
})

// const getThemeStyles = (theme: Theme): Partial<ViewStyle | TextStyle> => ({
//   color: themeBase.fontColor[theme],
//   backgroundColor: themeBase.bgColor[theme],
// })
