import { createNotifications } from './core/createNotifications'
import { modify, notify, remove, useNotifications } from './core/services/NotificationEmitterApi'
import { generateAnimationConfig } from './core/utils/generateAnimationConfig'
import {
  RotateInRotateOut,
  RotateZIn,
  SlideInLeftSlideOutRight,
  ZoomInDownZoomOutDown,
  ZoomInDownZoomOutUp,
  FadeInFadeOut,
} from './defaultConfig/defaultAnimationConfig'
import { defaultVariants } from './defaultConfig/defaultConfig'
import { useNotificationController } from './hooks/useNotificationController'
import type { CustomVariants } from './types'

// default
export { defaultVariants }

// animations
export {
  generateAnimationConfig,
  ZoomInDownZoomOutUp,
  SlideInLeftSlideOutRight,
  ZoomInDownZoomOutDown,
  RotateInRotateOut,
  RotateZIn,
  FadeInFadeOut,
}

// core api, root level
export { createNotifications, remove, modify, notify, useNotifications }

// toolbelt
export { useNotificationController }

// utility types
export { CustomVariants }
