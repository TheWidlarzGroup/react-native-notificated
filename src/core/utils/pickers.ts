import { Constants } from '../config'
import type { NotificationsConfig, Variant, VariantsMap } from '../../types'
import type { _DefaultVariants } from '../../defaultConfig/defaultConfig'
import type { EmitParam } from '../services/types'
import type { KeyType } from '../../types/misc'

export const getTopOffset = (
  notificationsConfigs: NotificationsConfig<_DefaultVariants>,
  notificationEvent: EmitParam,
  notificationHeight: number
) => {
  const isNotch = notificationsConfigs.isNotch
  const extraSpace = 50
  const topPosition = isNotch ? extraSpace : 10
  const notificationFinalPosition =
    notificationEvent?.config?.notificationPosition ?? notificationsConfigs?.notificationPosition

  switch (notificationFinalPosition) {
    case 'top':
      return topPosition
    case 'center':
      return Constants.height / 2 - (notificationHeight ? notificationHeight - extraSpace : 75)
    case 'bottom':
      return Constants.height - (notificationHeight ? notificationHeight + extraSpace : 150)
    default:
      return topPosition
  }
}

export const pickVariant = (
  config: NotificationsConfig<VariantsMap>,
  variantKey: KeyType | undefined,
  strict = false
): Variant<any> => {
  const convertedVariantKey = String(variantKey)
  const variant = config.variants[convertedVariantKey]

  if (!variant && strict) {
    throw Error(`${convertedVariantKey} doesn't exists`)
  }

  return variant
}

export const mergeConfigs = (
  globalConfig: NotificationsConfig<VariantsMap>,
  notificationEvent: EmitParam | undefined
): NotificationsConfig<VariantsMap> => {
  const variantConfig = pickVariant(globalConfig, notificationEvent?.notificationType)?.config

  return { ...globalConfig, ...variantConfig, ...notificationEvent }
}
