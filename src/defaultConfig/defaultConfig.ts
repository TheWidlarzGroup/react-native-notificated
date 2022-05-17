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
    config: { __isDefault: true },
  },
  warning: {
    component: WarningNotification,
    config: { __isDefault: true },
  },
  error: {
    component: ErrorNotification,
    config: { __isDefault: true },
  },
  info: {
    component: InfoNotification,
    config: { __isDefault: true },
  },
} as const as _DefaultVariants

export const InAppNotificationsConfig: NotificationsConfig<_DefaultVariants> = {
  duration: 3000,
  notificationPosition: 'top',
  variants: defaultVariants,
  animationConfig: SlideInLeftSlideOutRight,
  gestureConfig: Constants.isAndroid ? AndroidGestureConfig : IosGestureConfig,
} as const

export type DefaultKeys = keyof typeof defaultVariants
