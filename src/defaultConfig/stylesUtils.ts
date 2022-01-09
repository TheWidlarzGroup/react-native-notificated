import type { PropsConfig } from '../types'
import type { TextStyle, ViewStyle } from 'react-native'
import { themeBase } from './components/theme'
import type { NotificationVariants } from '../types'

export const getTitleStyle = (styles: PropsConfig): Partial<TextStyle> => ({
  color: styles.titleColor ? styles.titleColor : themeBase.fontColor[styles.theme],
  fontSize: styles.titleSize ? styles.titleSize : themeBase.fontSize.headerFontSize,
  paddingBottom: themeBase.spacing.s,
  flex: 1,
})

export const getDescriptionStyle = (styles: PropsConfig): Partial<TextStyle> => ({
  color: styles.descriptionColor ? styles.descriptionColor : themeBase.fontColor[styles.theme],
  fontSize: styles.descriptionSize ? styles.descriptionSize : themeBase.fontSize.messageFontSize,
  lineHeight: 16,
})

export const getContainerStyles = (styles: PropsConfig): Partial<ViewStyle> => ({
  ...styles,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  overflow: 'hidden',
  borderRadius: styles.borderRadius ?? themeBase.borderRadius.default,
  borderWidth: styles.borderType === 'border' ? styles.borderWidth : 0,
  borderColor: styles.accentColor,
  backgroundColor: styles.bgColor
    ? styles.bgColor
    : styles.theme
    ? themeBase.bgColor[styles.theme]
    : themeBase.bgColor.regular,
})

export const getLeftAccentStyle = (accentColor: string) => {
  return {
    flex: 0.04,
    height: '100%',
    backgroundColor: accentColor,
  }
}

export const chooseDefaultAccentColor = (notificationType: NotificationVariants) => {
  switch (notificationType) {
    case 'success':
      return themeBase.color.success
    case 'error':
      return themeBase.color.error
    case 'warning':
      return themeBase.color.warning
    case 'undo':
      return themeBase.color.info
  }
}
