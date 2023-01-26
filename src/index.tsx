import { createNotifications } from './core/createNotifications'
import { modify, notify, remove, useNotifications } from './core/services/NotificationEmitterApi'
import { generateAnimationConfig, AnimationBuilder } from './core/utils/generateAnimationConfig'

import { defaultVariants } from './defaultConfig/defaultConfig'
import { useNotificationController } from './hooks/useNotificationController'
import {
  SlideInLeftSlideOutRight,
  ZoomInZoomOut,
  MoveUp,
  ZoomInDownZoomOutUp,
  ZoomInDownZoomOutDown,
  MoveDown,
  SlideInLeft,
  RotateZIn,
  FadeInFadeOut,
  RotateInRotateOut,
  VeryCustomTransition,
  DiagonalSlideInLeftSlideOutRight,
} from './core/utils/generateAnimationConfig'

// default
export { defaultVariants }

// animations
export {
  generateAnimationConfig,
  AnimationBuilder,
  ZoomInZoomOut,
  ZoomInDownZoomOutDown,
  MoveDown,
  ZoomInDownZoomOutUp,
  MoveUp,
  SlideInLeft,
  SlideInLeftSlideOutRight,
  RotateZIn,
  FadeInFadeOut,
  RotateInRotateOut,
  VeryCustomTransition,
  DiagonalSlideInLeftSlideOutRight,
}

// core api, root level
export { createNotifications, remove, modify, notify, useNotifications }

// toolbelt
export { useNotificationController }
