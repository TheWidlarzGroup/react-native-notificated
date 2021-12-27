import React from 'react'
import type { EmitParam } from './createNotifications'
import type { NotificationsConfig, Variant } from '../types'

type Props = {
  config: NotificationsConfig<any>
  notificationConfig: EmitParam<any>
}

export const VariantsRenderer = (props: Props) => {
  const variant = pickVariant(props.config, props.notificationConfig.notificationType as string)

  const Component = variant.component

  return (
    <>
      <Component {...{ ...variant.defaultProps, ...props.notificationConfig.params }} />
    </>
  )
}

const pickVariant = (config: NotificationsConfig<any>, variantKey: string): Variant<any> => {
  const variant = config.variants[variantKey]

  if (variant) {
    return variant
  }

  throw Error(`${variantKey} doesn't exists`)
}
