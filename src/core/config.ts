//do wyrzucenia
import { Dimensions, Platform } from 'react-native'

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
