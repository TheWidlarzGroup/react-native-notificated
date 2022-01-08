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
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingVertical: 24,
  paddingLeft: 6,
  paddingRight: 18,
  borderRadius: styles.borderRadius ?? themeBase.borderRadius.default,
  backgroundColor: styles.bgColor
    ? styles.bgColor
    : styles.theme
    ? themeBase.bgColor[styles.theme]
    : themeBase.bgColor.regular,
  ...styles,
})

export const chooseAccentColor = (notificationType: NotificationVariants) => {
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
