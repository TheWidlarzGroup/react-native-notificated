import type { DefaultVariantsConfig, NotificationsConfig } from '../types'
import type { _DefaultVariants } from '../defaultConfig/defaultConfig'
import { DEVICE_HEIGHT } from '../utils/deviceInfo'
import type { Config } from './Notifications'

export const getTopOffset = (
  notificationsConfigs: Omit<DefaultVariantsConfig, 'variants'> &
    NotificationsConfig<_DefaultVariants>,
  notificationConfig: Config,
  notificationHeight: number
) => {
  const isNotch = notificationsConfigs.isNotch
  const extraSpace = 50
  const topPosition = isNotch ? extraSpace : 10
  const notificationFinalPosition =
    notificationConfig?.config?.notificationPosition ?? notificationsConfigs?.notificationPosition

  switch (notificationFinalPosition) {
    case 'top':
      return topPosition
    case 'center':
      return DEVICE_HEIGHT / 2 - (notificationHeight ? notificationHeight - extraSpace : 75)
    case 'bottom':
      return DEVICE_HEIGHT - (notificationHeight ? notificationHeight + extraSpace : 150)
    default:
      return topPosition
  }
}
