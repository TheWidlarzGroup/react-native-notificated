import { useCallback } from 'react'
import NotificationEmitterApi from '../core/services/NotificationEmitterApi'
import { useVariantsRendererContext } from '../core/renderers/VariantsRenderer'

export const useNotificationController = () => {
  const context = useVariantsRendererContext()

  const remove = useCallback(
    (id?: string) => {
      NotificationEmitterApi.remove(id ?? context?.id ?? '')
    },
    [context?.id]
  )

  return { remove }
}
