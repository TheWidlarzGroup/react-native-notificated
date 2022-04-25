import React, { createContext, PropsWithChildren, useContext } from 'react'
import type { NotificationsConfig, VariantsMap } from '../../types'
import { pickVariant } from '../utils/pickers'
import type { EmitParam } from '../services/types'

type Props = {
  config: NotificationsConfig<VariantsMap>
  notificationEvent: EmitParam
}

type VariantsRendererContextProps = {
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

export const VariantsRenderer = (props: Props) => {
  const variant = pickVariant(props.config, props.notificationEvent.notificationType, true)

  const Component = variant.component

  return (
    <VariantsRendererProvider id={props.notificationEvent.id}>
      <Component {...props.notificationEvent.params} />
    </VariantsRendererProvider>
  )
}
