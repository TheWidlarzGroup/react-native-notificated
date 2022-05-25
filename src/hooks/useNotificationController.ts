import { useCallback } from 'react'
import NotificationEmitterApi from '../core/services/NotificationEmitterApi'
import { useVariantsRendererContext } from '../core/renderers/VariantsRenderer'
import type { ModifiedEmitParam } from 'src/core/services/types'

export const useNotificationController = () => {
  const context = useVariantsRendererContext()

  const remove = useCallback(
    (id?: string) => {
      NotificationEmitterApi.remove(id ?? context?.id ?? '')
    },
    [context?.id]
  )

  const modify = useCallback(
    (id?: string, params: Partial<ModifiedEmitParam> = {}) => {
      NotificationEmitterApi.modify(id ?? context?.id ?? '', params)
    },
    [context?.id]
  )

  return { remove, modify }
}
