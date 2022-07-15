import { createNotifications } from './core/createNotifications'
import { modify, notify, remove, useNotifications } from './core/services/NotificationEmitterApi'
import { generateAnimationConfig, AnimationBuilder } from './core/utils/generateAnimationConfig'

import { defaultVariants } from './defaultConfig/defaultConfig'
import { useNotificationController } from './hooks/useNotificationController'
import type { CustomVariants } from './types'
import {SlideInLeftSlideOutRight, ZoomIn,MoveUp,ZoomInDownZoomOutUp, ZoomInDownZoomOutDown, MoveDown, SlideInLeft,RotateZIn, FadeIn, RotateIn,VeryCustomTransition,DiagonalSlideInLeftSlideOutRight } from './core/utils/generateAnimationConfig'


// default
export { defaultVariants }

// animations
export {
  generateAnimationConfig,
  AnimationBuilder,

  ZoomIn,
  ZoomInDownZoomOutDown,
  MoveDown,
  ZoomInDownZoomOutUp,
  MoveUp,
  SlideInLeft,
  SlideInLeftSlideOutRight,
  RotateZIn,
  FadeIn,
  RotateIn,
  VeryCustomTransition,
  DiagonalSlideInLeftSlideOutRight
}

// core api, root level
export { createNotifications, remove, modify, notify, useNotifications }

// toolbelt
export { useNotificationController }

// utility types
export { CustomVariants }
