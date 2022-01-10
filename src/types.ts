import type { FC } from 'react'
import type { NotificationOwnProps, NotificationStyleConfig, Theme } from './defaultConfig/types'

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
