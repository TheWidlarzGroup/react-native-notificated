import type { FC } from 'react'
import type { NotificationOwnProps, NotificationStyleConfig, Theme } from './defaultConfig/types'
import type { DefaultKeys } from './defaultConfig/defaultConfig'

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

export type NotificationConfigBase = {
  defaultNotificationTime: number
  defaultNotificationTimeLong: number
  notificationMsgLengthTimerThreshold: number
}

export type NotificationsConfig<Variants> = {
  variants: Variants
} & NotificationConfigBase

type DefaultStyleKeys = `${DefaultKeys}Config`

export type DefaultLayoutConfig = {
  variants: never

  defaultStylesSettings?: {
    darkMode?: boolean
    globalConfig?: Partial<NotificationStyleConfig>
  } & { [key in DefaultStyleKeys]?: Partial<NotificationStyleConfig> }
}

export type EmitParam<T> = {
  notificationType: unknown
  params: T
  id: string
}

export type ModifiedEmitParam<T> = Omit<EmitParam<T>, 'notificationType'>
export type DefaultVariantsConfig = NotificationConfigBase & DefaultLayoutConfig
