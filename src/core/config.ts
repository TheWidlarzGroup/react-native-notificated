//do wyrzucenia
import { Platform } from 'react-native'

const isAndroid = Platform.OS === 'android'
const maxLongPressDragDistance = 300
const notificationSideMargin = 14
const initialOffsetY = -300
const targetOffsetY = true ? 50 : 10

export const Constants = {
  maxLongPressDragDistance,
  notificationSideMargin,
  initialOffsetY,
  targetOffsetY,
  isAndroid,
}
