import { Constants } from '../config'
import type { NotificationsConfig, Variant, VariantsMap } from '../../types'
import type { EmitParam } from '../services/types'
import type { KeyType } from '../../types/misc'
import type { VariantKeys } from '../../defaultConfig/types'

export const getTopOffset = (
  globalConfig: NotificationsConfig<VariantsMap>,
  notificationHeight: number
) => {
  const isNotch = globalConfig.isNotch
  const extraSpace = 50
  const topPosition = isNotch ? extraSpace : 10
  const notificationPosition = globalConfig.notificationPosition

  switch (notificationPosition) {
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
  const name = String(notificationEvent?.notificationType)
  const variantName: keyof VariantKeys = (name + 'Config') as keyof VariantKeys
  const variantConfig = globalConfig.defaultStylesSettings?.[variantName]

  return { ...globalConfig, ...variantConfig, ...notificationEvent?.config }
}
