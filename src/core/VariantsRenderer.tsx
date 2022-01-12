import React from 'react'
import type { EmitParam, NotificationsConfig, Variant } from '../types'
import { VariantsRendererProvider } from './VariantsRendererContex'

type Props = {
  config: NotificationsConfig<any>
  notificationConfig: EmitParam<any>
}

export const VariantsRenderer = (props: Props) => {
  const variant = pickVariant(props.config, props.notificationConfig.notificationType as string)

  const Component = variant.component

  return (
    <VariantsRendererProvider id={props.notificationConfig.id}>
      <Component {...{ ...variant.defaultProps, ...props.notificationConfig.params }} />
    </VariantsRendererProvider>
  )
}

const pickVariant = (config: NotificationsConfig<any>, variantKey: string): Variant<any> => {
  const variant = config.variants[variantKey]

  if (variant) {
    return variant
  }

  throw Error(`${variantKey} doesn't exists`)
}
