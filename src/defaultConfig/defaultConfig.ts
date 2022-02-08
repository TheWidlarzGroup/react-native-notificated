import { SuccessNotification } from './components/success'
import { WarningNotification } from './components/warning'
import { ErrorNotification } from './components/error'
import { SlideInLeftSlideOutRight } from './defaultAnimationConfig'
import { InfoNotification } from './components/info'
import type { NotificationsConfig, Variant } from '../types'

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

export const InAppNotificationsConfig: NotificationsConfig<_DefaultVariants> = {
  defaultNotificationTime: 3000,
  defaultNotificationTimeLong: 5000,
  notificationPosition: 'top',
  notificationMsgLengthTimerThreshold: 100,
  variants: defaultVariants,
  animationConfig: SlideInLeftSlideOutRight,
} as const

export type DefaultKeys = keyof typeof defaultVariants
