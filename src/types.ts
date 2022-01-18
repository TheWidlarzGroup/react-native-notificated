import type { FC } from 'react'
import type { NotificationOwnProps, NotificationStyleConfig, Theme } from './defaultConfig/types'

export type NotificationConfigBase = {
  duration: number
  position: 'top' | 'bottom'
}

export type ComponentProps<T> = T extends FC<infer Props> ? Props : never

export type RequiredProps<T extends Variant<unknown>> = ComponentProps<T['component']>

export type Variant<T> = {
  component: T
  config?: Partial<NotificationConfigBase>
}

export type VariantsMap = Readonly<Record<string, Variant<unknown>>>

export type NotificationProps = NotificationOwnProps & Partial<NotificationStyleConfig>
export type MergedNotificationStyleConfig = NotificationStyleConfig & { theme: Theme }

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
  config?: Partial<NotificationConfigBase>
}

export type ModifiedEmitParam<T> = Omit<EmitParam<T>, 'notificationType'>
export type DefaultVariantsConfig = NotificationConfigBase & DefaultLayoutConfig
