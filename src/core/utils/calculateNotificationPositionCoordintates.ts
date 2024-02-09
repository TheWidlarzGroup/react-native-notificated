import { Constants } from '../config'

type CalculateNotificationPositionCoordintatesProps = {
  screenWidth: number
  notificationOffset: {
    top: number
    left?: number
    right?: number
  }
  notificationWidth?: number
  notificationTopPosition?: number
}

type CalculateNotificationPositionCoordintatesReturn = {
  calculatedNotificationWidth: number
  top: number
  left?: number
  right?: number
}

export const calculateNotificationPositionCoordintates = ({
  screenWidth,
  notificationOffset,
  notificationWidth,
  notificationTopPosition,
}: CalculateNotificationPositionCoordintatesProps): CalculateNotificationPositionCoordintatesReturn => {
  const fullWidth = screenWidth - Constants.notificationSideMargin * 2

  const initialNotificationWidth = notificationWidth || Constants.maxNotificationWidth

  const isWidthWithinBounds = initialNotificationWidth <= fullWidth

  const calculatedNotificationWidth = isWidthWithinBounds ? initialNotificationWidth : fullWidth

  const top =
    notificationTopPosition || notificationTopPosition === 0
      ? notificationTopPosition
      : notificationOffset.top

  const left = notificationOffset.left

  const right = notificationOffset.right

  return {
    calculatedNotificationWidth,
    top,
    left,
    right,
  }
}
