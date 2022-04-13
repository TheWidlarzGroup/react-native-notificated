import type { CustomAnimationConfig } from './types/animations'
import type { DefaultLayoutConfig } from './defaultConfig/types'
import type { NotificationPosition } from './types/config'
import type { GestureConfig } from './types/gestures'
import type { ComponentProps, FC } from 'react'

export type RequiredProps<T extends Variant<FC>> = ComponentProps<T['component']>

export type Variant<T> = {
  component: T
  config?: Partial<Omit<NotificationConfigBase, 'isNotch'>>
}

export type VariantsMap = Readonly<Record<string, Variant<FC<any>>>>

export type NotificationConfigBase = {
  duration: number
  notificationPosition: NotificationPosition
  animationConfig: CustomAnimationConfig
  gestureConfig: GestureConfig
  isNotch?: boolean
}

export type NotificationsConfig<Variants> = {
  variants: Variants
} & NotificationConfigBase &
  DefaultLayoutConfig
