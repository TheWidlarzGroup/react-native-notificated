import type { FC } from 'react'
import type { CustomAnimationConfig } from './types/animations'
import type { NotificationOwnProps, NotificationStyleConfig, Theme } from './defaultConfig/types'

type NotificationConfig = {
  duration: number
  animationConfig?: CustomAnimationConfig
}

export type ComponentProps<T> = T extends FC<infer Props> ? Props : never

export type RequiredProps<T extends Variant<unknown>> = ComponentProps<T['component']> & {
  notifyAnimationConfig?: CustomAnimationConfig
}

export type Variant<T> = {
  component: T
  config?: NotificationConfig
  animationConfig?: CustomAnimationConfig
}

export type VariantsMap = Readonly<Record<string, Variant<unknown>>>

export type NotificationProps = NotificationOwnProps & Partial<NotificationStyleConfig>
export type MergedNotificationStyleConfig = NotificationStyleConfig & { theme: Theme }

export type NotificationConfigBase = {
  defaultNotificationTime: number
  defaultNotificationTimeLong: number
  notificationMsgLengthTimerThreshold: number
  animationConfig: CustomAnimationConfig
}

export type NotificationsConfig<Variants> = {
  variants: Variants
} & NotificationConfigBase

export type DefaultLayoutConfig = {
  variants: never

  defaultStylesSettings?: {
    darkMode?: boolean
    globalConfig?: Partial<NotificationStyleConfig>
    successConfig?: Partial<NotificationStyleConfig>
    errorConfig?: Partial<NotificationStyleConfig>
    warningConfig?: Partial<NotificationStyleConfig>
    infoConfig?: Partial<NotificationStyleConfig>
  }
}

export type EmitParam<T> = {
  notificationType: unknown
  params: T
  id: string
  animationConfig?: CustomAnimationConfig
}

export type ModifiedEmitParam<T> = Omit<EmitParam<T>, 'notificationType'>
export type DefaultVariantsConfig = NotificationConfigBase & DefaultLayoutConfig
