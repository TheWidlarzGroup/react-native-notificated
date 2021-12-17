import type { FC } from 'react'
import { SuccessNotification } from './components/success'
import { WarningNotification } from './components/warning'
import { ErrorNotification } from './components/error'
import { UndoNotification } from './components/undo'

type NotificationConfig = {
  duration: number
}

type Variant<T> = T extends FC<infer Props>
  ? {
      component: FC<Props>
      defaultProps?: Partial<Props>
      config?: Partial<NotificationConfig>
    }
  : never

type DefaultVariants = {
  success: Variant<typeof SuccessNotification>
  error: Variant<typeof ErrorNotification>
  warning: Variant<typeof WarningNotification>
  undo: Variant<typeof UndoNotification>
}

const defaultVariants: DefaultVariants = {
  success: {
    component: SuccessNotification,
    defaultProps: {},
  },
  warning: {
    component: WarningNotification,
  },
  error: {
    component: ErrorNotification,
  },
  undo: {
    component: UndoNotification,
  },
}

type Config = {
  defaultNotificationTime?: number
  defaultNotificationTimeLong?: number
  notificationMsgLengthTimerThreshold?: number

  variants?: Record<string, Variant>
}

export const InAppNotificationsConfig: Config = {
  defaultNotificationTime: 3000,
  defaultNotificationTimeLong: 5000,
  notificationMsgLengthTimerThreshold: 100,

  variants: defaultVariants,
} as const
