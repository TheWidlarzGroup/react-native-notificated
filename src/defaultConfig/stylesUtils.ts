import type { TextStyle, ViewStyle } from 'react-native'
import { Platform } from 'react-native'
import { themeBase } from './components/theme'
import type { MergedNotificationStyleConfig, NotificationVariants, Theme } from './types'

export const getTitleStyle = (styles: MergedNotificationStyleConfig): Partial<TextStyle> => ({
  color: styles.titleColor ? styles.titleColor : themeBase.fontColor[styles.theme],
  fontSize: styles.titleSize ? styles.titleSize : themeBase.fontSize.headerFontSize,
  paddingBottom: themeBase.spacing.xs,
  flex: 1,
})

export const getDescriptionStyle = (styles: MergedNotificationStyleConfig): Partial<TextStyle> => ({
  color: styles.descriptionColor ? styles.descriptionColor : themeBase.fontColor[styles.theme],
  fontSize: styles.descriptionSize ? styles.descriptionSize : themeBase.fontSize.messageFontSize,
})

export const constShadow = (theme: Theme, borderRadius?: number): Partial<ViewStyle> => {
  const crossPlatformStyle = Platform.select({
    ios: {
      shadowColor: themeBase.color.shadow,
      shadowOffset: { width: 1, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 7,
    },
    android: {
      elevation: 5,
      borderBottomWidth: 0,
      borderRadius: borderRadius,
    },
  })

  return theme === 'regular' && crossPlatformStyle ? crossPlatformStyle : {}
}

export const getContainerStyles = (styles: MergedNotificationStyleConfig): Partial<ViewStyle> => {
  const defaultBackgroundColor = styles.theme
    ? themeBase.bgColor[styles.theme]
    : themeBase.bgColor.regular

  return {
    ...styles,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: styles.borderRadius ?? themeBase.borderRadius.regular,
    borderWidth: styles.borderType === 'border' ? styles.borderWidth : 0,
    borderColor: styles.accentColor,
    backgroundColor: styles.bgColor ?? defaultBackgroundColor,
  }
}

export const getLeftAccentStyle = (accentColor: string | undefined) => {
  return {
    flex: 0.045,
    height: '100%',
    backgroundColor: accentColor ?? '',
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
    case 'info':
      return themeBase.color.info
  }
}
