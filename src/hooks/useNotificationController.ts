import { useCallback } from 'react'
import NotificationEmitterApi from '../core/services/NotificationEmitterApi'
import { useVariantsRendererContext } from '../core/renderers/VariantsRenderer'
import type { ModifiedEmitParam } from '../core/services/types'

export const useNotificationController = () => {
  const context = useVariantsRendererContext()

  const modify = useCallback(
    // Would be cool to have some type inference here in future
    <T>(id: string, { params, config }: Partial<Omit<ModifiedEmitParam<T>, 'id'>>) =>
      NotificationEmitterApi.modify(id ?? context?.id ?? '', { params, config }),
    [context?.id]
  )
  const remove = useCallback(
    (id?: string) => {
      NotificationEmitterApi.remove(id ?? context?.id ?? '')
    },
    [context?.id]
  )

  return { remove, modify }
}
