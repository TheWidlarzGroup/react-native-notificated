import type { FC } from 'react'
import type { defaultVariants } from './defaultConfig/defaultConfig'
import type { ImageSourcePropType } from 'react-native'

type NotificationConfig = {
  duration: number
}

export type ComponentProps<T> = T extends FC<infer Props> ? Props : never

export type RequiredProps<T extends Variant<unknown>> = Omit<
  ComponentProps<T['component']>,
  keyof T['defaultProps']
> &
  Partial<ComponentProps<T['component']>>

export type Variant<T> = {
  component: T
  defaultProps?: Partial<ComponentProps<T>>
  config?: Partial<NotificationConfig>
}

export type VariantsMap = Readonly<Record<string, Variant<unknown>>>

export type DefaultVariants = typeof defaultVariants
export type NotificationVariants = 'success' | 'error' | 'warning' | 'undo'
export type IconVisualStyle = 'color' | 'monochromatic' | 'no-icon'

export type Theme = 'regular' | 'dark'
export type BorderType = 'border' | 'accent' | 'no-border'

export type PropsConfig = {
  title?: string
  description?: string
  theme: Theme
  titleSize?: number
  titleColor?: string
  descriptionSize?: number
  descriptionColor?: string
  bgColor?: string
  borderRadius?: number
  accentColor?: any
  borderWidth?: number
  icon?: string
  multiline?: number
  defaultIconType?: IconVisualStyle
  leftIconSource?: ImageSourcePropType
  borderType?: BorderType
}

export type DefaultStylesConfig = Omit<PropsConfig, 'title' | 'description' | 'theme'>

export type NotificationsConfig<Variants> = {
  defaultNotificationTime: number
  defaultNotificationTimeLong: number
  notificationMsgLengthTimerThreshold: number

  darkMode: boolean
  defaultStylesSettings?: {
    globalConfig?: DefaultStylesConfig
    successConfig?: DefaultStylesConfig
    errorConfig?: DefaultStylesConfig
    warningConfig?: DefaultStylesConfig
    undoConfig?: DefaultStylesConfig
  }

  variants: Variants
}
