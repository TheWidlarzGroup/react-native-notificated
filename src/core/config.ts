//do wyrzucenia
import { Dimensions, Platform } from 'react-native'
import type { SwipeConfig } from './hooks/useAnimationControl'

const isAndroid = Platform.OS === 'android'
const maxLongPressDragDistance = 300
const { width, height } = Dimensions.get('window')
const notificationSideMargin = 14
const notificationWidth = width - notificationSideMargin * 2
const initialOffsetX = -(notificationWidth + 2 * notificationSideMargin)
const initialOffsetY = -300
const targetOffsetX = width
const targetOffsetY = true ? 50 : 10

export const Constants = {
  maxLongPressDragDistance,
  notificationSideMargin,
  notificationWidth,
  initialOffsetX,
  initialOffsetY,
  targetOffsetX,
  targetOffsetY,
  isAndroid,
  height,
  width,
}

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
