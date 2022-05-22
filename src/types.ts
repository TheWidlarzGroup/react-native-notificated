import type { CustomAnimationConfig } from './types/animations'
import type { DefaultLayoutConfig, DefaultVariants } from './defaultConfig/types'
import type { NotificationPosition } from './types/config'
import type { GestureConfig } from './types/gestures'
<<<<<<< HEAD
import type { ComponentProps, FC } from 'react'

export type RequiredProps<T extends Variant<FC>> = ComponentProps<T['component']>
=======
import type { ComponentProps, VFC } from 'react'

export type RequiredProps<T extends Variant<VFC<any>>> = ComponentProps<T['component']>
>>>>>>> origin

export type Variant<T> = {
  component: T
  config?: Partial<Omit<NotificationConfigBase, 'isNotch'>>
}

<<<<<<< HEAD
export type VariantsMap = Readonly<Record<string, Variant<FC<any>>>>
=======
export type VariantsMap = Record<string, Variant<VFC<any>>>

export interface CustomVariants {}

export type Variants = CustomVariants[keyof CustomVariants] extends never
  ? DefaultVariants
  : CustomVariants
>>>>>>> origin

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

export type { CustomAnimationConfig }
