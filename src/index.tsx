import { createNotifications } from './core/createNotifications'
import { useNotifications, modify, notify, remove } from './core/services/NotificationEmitterApi'
import {
  ZoomInDownZoomOutUp,
  SlideInLeftSlideOutRight,
  ZoomInDownZoomOutDown,
  RotateInRotateOut,
  RotateZIn,
} from './defaultConfig/defaultAnimationConfig'
import { defaultVariants } from './defaultConfig/defaultConfig'
import { useNotificationController } from './hooks/useNotificationController'

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
