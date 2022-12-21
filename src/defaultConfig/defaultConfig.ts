import { SuccessNotification } from './components/success'
import { WarningNotification } from './components/warning'
import { ErrorNotification } from './components/error'
import { SlideInLeftSlideOutRight } from './defaultAnimationConfig'
import { InfoNotification } from './components/info'
import type { NotificationsConfig } from '../types'
import { AndroidGestureConfig, IosGestureConfig } from './defaultGestureConfig'
import { Constants } from '../core/config'
import type { DefaultVariants } from './types'

export const defaultVariants: DefaultVariants = {
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
} as const as DefaultVariants

export const InAppNotificationsConfig: NotificationsConfig<DefaultVariants> = {
  duration: 3000,
  notificationPosition: 'top',
  variants: defaultVariants,
  animationConfig: SlideInLeftSlideOutRight,
  gestureConfig: Constants.isAndroid ? AndroidGestureConfig : IosGestureConfig,
} as const
