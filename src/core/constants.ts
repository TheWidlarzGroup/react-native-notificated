import { Dimensions, Platform } from 'react-native'
import { themeBase } from '../defaultConfig/components/theme'

const isAndroid = Platform.OS === 'android'
const maxLongPressDragDistance = 300
const { width } = Dimensions.get('window')
const notificationSideMargin = themeBase.spacing.s
const notificationWidth = width - notificationSideMargin * 2
const initialOffsetX = -(notificationWidth + 2 * notificationSideMargin)
const initialOffsetY = -300
const targetOffsetX = width
const targetOffsetY = true ? 50 : 10

export default {
  maxLongPressDragDistance,
  notificationSideMargin,
  notificationWidth,
  initialOffsetX,
  initialOffsetY,
  targetOffsetX,
  targetOffsetY,
  isAndroid,
  width,
}
