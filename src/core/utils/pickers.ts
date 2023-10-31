import type { NotificationsConfig, Variant, VariantsMap } from '../../types'
import type { EmitParam } from '../services/types'
import type { DefaultKeys, DefaultStylesConfigs } from '../../defaultConfig/types'
import type { KeyType } from '../../types/misc'
import { Constants } from '../config'

type GetNotificationOffsetProps = {
  globalConfig: NotificationsConfig<VariantsMap>
  notificationHeight: number
  isPortraitMode: boolean
  windowHeight: number
  statusBarHeight: number
}

export const getNotificationOffset = ({
  globalConfig,
  notificationHeight,
  isPortraitMode,
  windowHeight,
  statusBarHeight,
}: GetNotificationOffsetProps) => {
  const isNotch = globalConfig.isNotch
  const extraSpace = statusBarHeight + 10

  const shouldRenderExtraSpace = isNotch ?? (isPortraitMode && !Constants.isAndroid)
  const topPosition = shouldRenderExtraSpace ? extraSpace : 10
  const notificationPosition = globalConfig.notificationPosition

  let topOffset, leftOffset, rightOffset

  switch (notificationPosition) {
    case 'top':
      topOffset = topPosition
      break
    case 'top-left':
      topOffset = topPosition
      leftOffset = Constants.notificationSideMargin
      break
    case 'top-right':
      topOffset = topPosition
      rightOffset = Constants.notificationSideMargin
      break
    case 'center':
      topOffset = windowHeight / 2 - (notificationHeight ? notificationHeight / 2 + 10 : 75)
      break
    case 'bottom':
      topOffset = windowHeight - (notificationHeight ? notificationHeight + extraSpace : 150)
      break
    case 'bottom-left':
      topOffset = windowHeight - (notificationHeight ? notificationHeight + extraSpace : 150)
      leftOffset = Constants.notificationSideMargin
      break
    case 'bottom-right':
      topOffset = windowHeight - (notificationHeight ? notificationHeight + extraSpace : 150)
      rightOffset = Constants.notificationSideMargin
      break
    default:
      topOffset = topPosition
      break
  }

  return { top: topOffset, left: leftOffset, right: rightOffset }
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
