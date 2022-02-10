import { SuccessNotification } from './components/success'
import { WarningNotification } from './components/warning'
import { ErrorNotification } from './components/error'
import { SlideInLeftSlideOutRight } from './defaultAnimationConfig'
import { InfoNotification } from './components/info'
import type { NotificationsConfig, Variant } from '../types'
import { AndroidGestureConfig, IosGestureConfig } from './defaultGestureConfig'
import { Constants } from '../core/config'

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
  duration: 3000,
  notificationPosition: 'top',
  variants: defaultVariants,
  animationConfig: SlideInLeftSlideOutRight,
  gestureConfig: Constants.isAndroid ? AndroidGestureConfig : IosGestureConfig,
} as const

export type DefaultKeys = keyof typeof defaultVariants
