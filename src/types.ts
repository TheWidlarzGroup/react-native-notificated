import type { FC } from 'react'
import type { defaultVariants } from './defaultConfig/defaultConfig'
import type { ImageSourcePropType } from 'react-native'

type NotificationConfig = {
  duration: number
}

export type ComponentProps<T> = T extends FC<infer Props> ? Props : never

export type RequiredProps<T extends Variant<unknown>> = ComponentProps<T['component']>

export type Variant<T> = {
  component: T
  config?: NotificationConfig
}

export type VariantsMap = Readonly<Record<string, Variant<unknown>>>

export type DefaultVariants = typeof defaultVariants
export type NotificationVariants = 'success' | 'error' | 'warning' | 'info'
export type IconVisualStyle = 'color' | 'monochromatic' | 'no-icon'

export type Theme = 'regular' | 'dark'
export type BorderType = 'border' | 'accent' | 'no-border'

export type IconsLinksTypes = {
  success: {
    color: ImageSourcePropType
    white: ImageSourcePropType
    black: ImageSourcePropType
  }
  error: {
    color: ImageSourcePropType
    white: ImageSourcePropType
    black: ImageSourcePropType
  }
  warning: {
    color: ImageSourcePropType
    white: ImageSourcePropType
    black: ImageSourcePropType
  }
  info: {
    color: ImageSourcePropType
    white: ImageSourcePropType
    black: ImageSourcePropType
  }
}

export type NotificationOwnProps = {
  title: string
  description: string
  icon?: string
  onPress?: () => void | undefined
}

export type NotificationStyleConfig = Partial<{
  icon?: string
  theme: Theme
  titleSize: number
  titleColor: string
  descriptionSize: number
  descriptionColor: string
  bgColor: string
  borderRadius: number
  accentColor: any
  borderWidth: number
  multiline: number
  defaultIconType: IconVisualStyle
  leftIconSource: ImageSourcePropType
  borderType: BorderType
  notificationType: NotificationVariants
}>


export type NotificationProps = NotificationOwnProps & Partial<NotificationStyleConfig>
export type MergedNotificationStyleConfig = NotificationStyleConfig & { theme: Theme }

export type NotificationsConfig<Variants> = {
  defaultNotificationTime: number
  defaultNotificationTimeLong: number
  notificationMsgLengthTimerThreshold: number

  darkMode: boolean
  defaultStylesSettings?: {
    globalConfig?: Partial<NotificationStyleConfig>
    successConfig?: Partial<NotificationStyleConfig>
    errorConfig?: Partial<NotificationStyleConfig>
    warningConfig?: Partial<NotificationStyleConfig>
    infoConfig?: Partial<NotificationStyleConfig>
  }

  variants: Variants
}
