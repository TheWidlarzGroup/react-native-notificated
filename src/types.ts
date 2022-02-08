import type { FC } from 'react'
import type { CustomAnimationConfig } from './types/animations'
import type { DefaultLayoutConfig } from './defaultConfig/types'
import type { NotificationPosition } from './types/config'

// todo: extend this type
export type ComponentProps<T> = T extends FC<infer Props> ? Props : never

export type RequiredProps<T extends Variant<unknown>> = ComponentProps<T['component']> & {
  // todo: remove this
  notifyAnimationConfig?: CustomAnimationConfig
}

export type Variant<T> = {
  component: T
  config?: Partial<NotificationConfigBase>
}

export type VariantsMap = Readonly<Record<string, Variant<unknown>>>

export type NotificationConfigBase = {
  defaultNotificationTime: number
  defaultNotificationTimeLong: number
  notificationPosition: NotificationPosition
  notificationMsgLengthTimerThreshold: number
  animationConfig: CustomAnimationConfig
  isNotch?: boolean
}

export type NotificationsConfig<Variants> = {
  variants: Variants
} & NotificationConfigBase &
  DefaultLayoutConfig

// todo: move to adequate place
export type EmitParam<T = unknown> = {
  notificationType: unknown
  params: T
  id: string
  config?: Partial<NotificationConfigBase>
}

// todo: move to adequate place
export type ModifiedEmitParam<T> = Omit<EmitParam<T>, 'notificationType'>
export type RemoveEmitParam<T> = Pick<EmitParam<T>, 'id'>
