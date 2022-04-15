import { createNotifications } from './core/createNotifications'
import { modify, notify, remove, useNotifications } from './core/services/NotificationEmitterApi'
import {
  RotateInRotateOut,
  RotateZIn,
  SlideInLeftSlideOutRight,
  ZoomInDownZoomOutDown,
  ZoomInDownZoomOutUp,
} from './defaultConfig/defaultAnimationConfig'
import { defaultVariants } from './defaultConfig/defaultConfig'
import { useNotificationController } from './hooks/useNotificationController'
import type { CustomVariants } from './types'

// default
export { defaultVariants }

// animations
export {
  ZoomInDownZoomOutUp,
  SlideInLeftSlideOutRight,
  ZoomInDownZoomOutDown,
  RotateInRotateOut,
  RotateZIn,
}

// core api, root level
export { createNotifications, remove, modify, notify, useNotifications }

// toolbelt
export { useNotificationController }

// utility types
export { CustomVariants }
