import type { CustomAnimationConfig } from './types/animations'
import type { DefaultLayoutConfig, DefaultVariants } from './defaultConfig/types'
import type { NotificationPosition } from './types/config'
import type { GestureConfig } from './types/gestures'
import type { ComponentProps, VFC } from 'react'
import type { AnimationBuilder } from './core/utils/generateAnimationConfig'

export type RequiredProps<T extends Variant<VFC<any>>> = ComponentProps<T['component']>

export type Variant<T> = {
  component: T
  config?: Partial<Omit<NotificationConfigBase, 'isNotch'>>
}

export type VariantsMap = Record<string, Variant<VFC<any>>>

export interface CustomVariants {}

export type Variants = CustomVariants[keyof CustomVariants] extends never
  ? DefaultVariants
  : CustomVariants

export type NotificationConfigBase = {
  duration: number
  notificationPosition: NotificationPosition
  animationConfig: AnimationBuilder | CustomAnimationConfig
  gestureConfig: GestureConfig
  isNotch?: boolean
  onClose?: () => void
}

export type NotificationsConfig<Variants> = {
  variants: Variants
} & NotificationConfigBase &
  DefaultLayoutConfig

export type { CustomAnimationConfig }
