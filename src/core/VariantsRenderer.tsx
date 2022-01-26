import React, { createContext, PropsWithChildren, useContext } from 'react'
import type { EmitParam, NotificationsConfig, Variant } from '../types'

type Props = {
  config: NotificationsConfig<any>
  notificationConfig: EmitParam<any>
}

export const VariantsRenderer = (props: Props) => {
  const variant = pickVariant(props.config, props.notificationConfig.notificationType as string)

  const Component = variant.component

  return (
    <VariantsRendererProvider id={props.notificationConfig.id}>
      <Component {...props.notificationConfig.params} />
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

interface VariantsRendererContextProps {
  id: string
}

const VariantsRendererContext = createContext<VariantsRendererContextProps | undefined>(undefined)

const VariantsRendererProvider = ({
  children,
  id,
}: PropsWithChildren<VariantsRendererContextProps>) => {
  const value = {
    id,
  }
  return (
    <VariantsRendererContext.Provider value={value}>{children}</VariantsRendererContext.Provider>
  )
}

export const useVariantsRendererContext = () => {
  return useContext(VariantsRendererContext)
}
