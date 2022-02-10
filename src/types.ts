import type { FC } from 'react'
import type { CustomAnimationConfig } from './types/animations'
import type { DefaultLayoutConfig } from './defaultConfig/types'
import type { NotificationPosition } from './types/config'
import type { GestureConfig } from './types/gestures'

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
  duration: number
  durationLong: number
  notificationPosition: NotificationPosition
  notificationMsgLengthTimerThreshold: number
  animationConfig: CustomAnimationConfig
  gestureConfig: GestureConfig
  isNotch?: boolean
}

export type NotificationsConfig<Variants> = {
  variants: Variants
} & NotificationConfigBase &
  DefaultLayoutConfig
