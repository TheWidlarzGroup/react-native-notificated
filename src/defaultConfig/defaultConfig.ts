import { SuccessNotification } from './components/success'
import { WarningNotification } from './components/warning'
import { ErrorNotification } from './components/error'
import { InfoNotification } from './components/info'
import type { DefaultLayoutConfig, NotificationsConfig, Variant } from '../types'

export type _DefaultVariants = {
  success: Variant<typeof SuccessNotification>
  error: Variant<typeof ErrorNotification>
  warning: Variant<typeof WarningNotification>
  info: Variant<typeof InfoNotification>
}

export const defaultVariants: _DefaultVariants = {
  success: {
    component: SuccessNotification,
  },
  warning: {
    component: WarningNotification,
  },
  error: {
    component: ErrorNotification,
  },
  info: {
    component: InfoNotification,
  },
} as const

export const InAppNotificationsConfig: NotificationsConfig<_DefaultVariants> &
  Omit<DefaultLayoutConfig, 'variants'> = {
  defaultNotificationTime: 3000,
  defaultNotificationTimeLong: 5000,
  notificationMsgLengthTimerThreshold: 100,

  variants: defaultVariants,
} as const

export type DefaultKeys = keyof typeof defaultVariants
