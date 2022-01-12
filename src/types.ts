import type { FC } from 'react'
import type { defaultVariants } from './defaultConfig/defaultConfig'
import type { NotificationPosition } from './types/config'

type NotificationConfig = {
  duration: number
  position: NotificationPosition
}

export type ComponentProps<T> = T extends FC<infer Props> ? Props : never

export type RequiredProps<T extends Variant<unknown>> = Omit<
  ComponentProps<T['component']>,
  keyof T['defaultProps']
> &
  Partial<ComponentProps<T['component']>>

export type Variant<T> = {
  component: T
  defaultProps?: Partial<ComponentProps<T>>
  config?: Partial<NotificationConfig>
}
export type VariantsMap = Readonly<Record<string, Variant<unknown>>>

export type DefaultVariants = typeof defaultVariants

export type NotificationsConfig<Variants> = {
  defaultNotificationTime: number
  defaultNotificationTimeLong: number
  defaultNotificationPosition: NotificationPosition
  notificationMsgLengthTimerThreshold: number

  variants: Variants
}
