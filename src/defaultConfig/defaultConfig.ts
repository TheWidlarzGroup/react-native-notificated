import { SuccessNotification } from './components/success'
import { WarningNotification } from './components/warning'
import { ErrorNotification } from './components/error'
import { UndoNotification } from './components/undo'
import type { NotificationsConfig, Variant } from '../types'

export type _DefaultVariants = {
  success: Variant<typeof SuccessNotification>
  error: Variant<typeof ErrorNotification>
  warning: Variant<typeof WarningNotification>
  undo: Variant<typeof UndoNotification>
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
  undo: {
    component: UndoNotification,
    defaultProps: {
      onPress: console.log,
    },
  },
} as const

export const InAppNotificationsConfig: NotificationsConfig<_DefaultVariants> = {
  defaultNotificationTime: 3000,
  defaultNotificationTimeLong: 5000,
  notificationMsgLengthTimerThreshold: 100,

  darkMode: false,
  variants: defaultVariants,
} as const
