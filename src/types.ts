import type { FC } from 'react'
import type { NotificationOwnProps, NotificationStyleConfig, Theme } from './defaultConfig/types'
import type { NotificationPosition } from './types/config'
import type { DefaultKeys } from './defaultConfig/defaultConfig'

// type NotificationConfig = {
//   duration?: number
//   notificationPosition?: NotificationPosition
// }

export type ComponentProps<T> = T extends FC<infer Props> ? Props : never

export type RequiredProps<T extends Variant<unknown>> = ComponentProps<T['component']>

export type Variant<T> = {
  component: T
  config?: Partial<NotificationConfigBase>
}

export type VariantsMap = Readonly<Record<string, Variant<unknown>>>

export type StyleProps = { style?: Partial<NotificationStyleConfig> }
export type NotificationProps = NotificationOwnProps & StyleProps
export type MergedNotificationStyleConfig = NotificationStyleConfig & { theme: Theme }

export type NotificationConfigBase = {
  defaultNotificationTime: number
  defaultNotificationTimeLong: number
  notificationPosition: NotificationPosition
  notificationMsgLengthTimerThreshold: number
}

export type NotificationsConfig<Variants> = {
  variants: Variants
} & NotificationConfigBase

export type DefaultLayoutConfig = {
  variants: never
  notificationPosition?: NotificationPosition

  defaultStylesSettings?: {
    darkMode?: boolean
    globalConfig?: Partial<NotificationStyleConfig>
  } & { [key in `${DefaultKeys}Config`]?: Partial<NotificationStyleConfig> }
}

export type EmitParam<T> = {
  notificationType: unknown
  params: T
  id: string
  config?: Partial<NotificationConfigBase>
}

export type ModifiedEmitParam<T> = Omit<EmitParam<T>, 'notificationType'>
export type DefaultVariantsConfig = NotificationConfigBase & DefaultLayoutConfig
