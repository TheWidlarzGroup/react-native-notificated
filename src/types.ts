import type { FC } from 'react'
import type { defaultVariants } from './defaultConfig/defaultConfig'
import type { CustomAnimationConfig } from './types/animations'

type NotificationConfig = {
  duration: number
  animationConfig?: CustomAnimationConfig
}

export type ComponentProps<T> = T extends FC<infer Props> ? Props : never

export type RequiredProps<T extends Variant<unknown>> = Omit<
  ComponentProps<T['component']>,
  keyof T['defaultProps']
> &
  Partial<ComponentProps<T['component']>> & { notifyAnimationConfig?: CustomAnimationConfig }

export type Variant<T> = {
  component: T
  defaultProps?: Partial<ComponentProps<T>>
  config?: Partial<NotificationConfig>
  animationConfig?: CustomAnimationConfig
}
export type VariantsMap = Readonly<Record<string, Variant<unknown>>>

export type DefaultVariants = typeof defaultVariants

export type NotificationsConfig<Variants> = {
  defaultNotificationTime: number
  defaultNotificationTimeLong: number
  notificationMsgLengthTimerThreshold: number
  animationConfig: CustomAnimationConfig
  variants: Variants
}
