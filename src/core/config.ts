//do wyrzucenia
import type { SwipeConfig } from '../hooks/useAnimationControl'
import Constants from './constants'

export const swipeConfigs: { [key in 'ios' | 'android']: SwipeConfig } = {
  ios: {
    direction: 'y',
    initialOffset: Constants.initialOffsetY,
    targetOffset: Constants.targetOffsetY,
    distanceThreshold: 50,
    velocityThreshold: 300,
  },
  android: {
    direction: 'x',
    initialOffset: Constants.initialOffsetX,
    targetOffset: Constants.targetOffsetX,
    distanceThreshold: Constants.width * 0.4,
    velocityThreshold: 2000,
  },
}
