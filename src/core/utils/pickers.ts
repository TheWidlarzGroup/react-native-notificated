import { Constants } from '../config'
import type { NotificationsConfig, Variant, VariantsMap } from '../../types'
import type { EmitParam } from '../services/types'
import type { DefaultKeys } from '../../defaultConfig/defaultConfig'
import type { DefaultStylesConfigs } from '../../defaultConfig/types'
import type { KeyType } from '../../types/misc'
import { hasNotch } from 'react-native-device-info'

export const getTopOffset = (
  globalConfig: NotificationsConfig<VariantsMap>,
  notificationHeight: number
) => {
  const isNotch = typeof globalConfig.isNotch === 'undefined' ? hasNotch() : globalConfig.isNotch
  const extraSpace = 50
  const topPosition = isNotch ? extraSpace : 10
  const notificationPosition = globalConfig.notificationPosition

  switch (notificationPosition) {
    case 'top':
      return topPosition
    case 'center':
      return Constants.height / 2 - (notificationHeight ? notificationHeight / 2 : 75)
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

const pickDefaultVariantConfig = (
  config: NotificationsConfig<VariantsMap>,
  variantKey: string
): Partial<NotificationsConfig<VariantsMap>> => {
  const checkIsDefaultConfig = (globalConfig: any, variant: string): variant is DefaultKeys => {
    return Boolean(globalConfig?.variants?.[variant]?.config?.__isDefault)
  }

  if (checkIsDefaultConfig(config, variantKey)) {
    const variantName: keyof DefaultStylesConfigs = `${variantKey}Config`
    const defaultConfig = config.defaultStylesSettings?.[variantName]

    if (defaultConfig?.notificationPosition) {
      return { notificationPosition: defaultConfig.notificationPosition }
    }
  }

  return {}
}

export const mergeConfigs = (
  globalConfig: NotificationsConfig<VariantsMap>,
  notificationEvent: EmitParam | undefined
) => {
  const name = String(notificationEvent?.notificationType)

  const defaultVariantConfig = pickDefaultVariantConfig(globalConfig, name)
  const variantConfig = pickVariant(globalConfig, name)?.config

  return {
    ...globalConfig,
    ...variantConfig,
    ...defaultVariantConfig,
    ...notificationEvent?.config,
  }
}
