import type { FC } from 'react'
import { SuccessNotification } from './components/success'
import { WarningNotification } from './components/warning'
import { ErrorNotification } from './components/error'
import { UndoNotification } from './components/undo'

type NotificationConfig = {
  duration: number
}

export type ComponentProps<T> = T extends FC<infer Props> ? Props : never

type Variant<T> = {
  component: T
  defaultProps?: Partial<ComponentProps<T>>
  config?: Partial<NotificationConfig>
}

export type VariantsMap = Readonly<Record<string, Variant<unknown>>>

export type _DefaultVariants = {
  success: Variant<typeof SuccessNotification>
  error: Variant<typeof ErrorNotification>
  warning: Variant<typeof WarningNotification>
  undo: Variant<typeof UndoNotification>
}

export type RequiredProps<T extends Variant<unknown>> = Omit<
  ComponentProps<T['component']>,
  keyof T['defaultProps']
> &
  Partial<ComponentProps<T['component']>>

const defaultVariants: _DefaultVariants = {
  success: {
    component: SuccessNotification,
  },
  warning: {
    component: WarningNotification,
  },
  error: {
    component: ErrorNotification,
  },
  undo: {
    component: UndoNotification,
    defaultProps: {
      onPress: console.log,
    },
  },
} as const

export type DefaultVariants = typeof defaultVariants

export type NotificationsConfig<Variants> = {
  defaultNotificationTime: number
  defaultNotificationTimeLong: number
  notificationMsgLengthTimerThreshold: number

  variants: Variants
}

export const InAppNotificationsConfig: NotificationsConfig<_DefaultVariants> = {
  defaultNotificationTime: 3000,
  defaultNotificationTimeLong: 5000,
  notificationMsgLengthTimerThreshold: 100,

  variants: defaultVariants,
} as const
