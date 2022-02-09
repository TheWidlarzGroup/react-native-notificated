import type { EmitParam, NotificationsConfig, Variant, VariantsMap } from '../../types'
import type { _DefaultVariants } from '../../defaultConfig/defaultConfig'
import { DEVICE_HEIGHT } from './deviceInfo'

export const getTopOffset = (
  notificationsConfigs: NotificationsConfig<_DefaultVariants>,
  notificationConfig: EmitParam,
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
export const getConfigTime = (
  notificationConfig: EmitParam,
  globalConfig: NotificationsConfig<VariantsMap>
) => {
  return (
    notificationConfig.config?.defaultNotificationTime ??
    globalConfig?.variants[notificationConfig.notificationType as string]?.config
      ?.defaultNotificationTime ??
    globalConfig.defaultNotificationTime
  )
}

export const pickVariant = (
  config: NotificationsConfig<VariantsMap>,
  variantKey: string
): Variant<any> => {
  const variant = config.variants[variantKey]

  if (variant) {
    return variant
  }

  throw Error(`${variantKey} doesn't exists`)
}
