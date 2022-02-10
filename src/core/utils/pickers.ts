import { Constants } from '../config'
import type { NotificationsConfig, Variant, VariantsMap } from '../../types'
import type { _DefaultVariants } from '../../defaultConfig/defaultConfig'
import type { EmitParam } from '../services/types'

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
      return Constants.height / 2 - (notificationHeight ? notificationHeight - extraSpace : 75)
    case 'bottom':
      return Constants.height - (notificationHeight ? notificationHeight + extraSpace : 150)
    default:
      return topPosition
  }
}

export const pickVariant = (
  config: NotificationsConfig<VariantsMap>,
  variantKey: string | undefined,
  strict = false
): Variant<any> => {
  const variant = config.variants[variantKey || '']

  if (!variant && strict) {
    throw Error(`${variantKey} doesn't exists`)
  }

  return variant
}
