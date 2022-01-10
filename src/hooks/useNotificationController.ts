import { useCallback } from 'react'
import { useVariantsRendererContext } from '../core/VariantsRendererContex'
import type { EmitParam } from '../core/createNotifications'
import { emitter } from '../core/useNotificationConfig'

interface ModifiedEmitParam<T> {
  id: string
  modifiedParams?: Partial<EmitParam<T>['params']>
  modifiedType?: EmitParam<any>['notificationType']
}

const emitRemove = (id: string) => emitter.emit('remove_notification', { id })
const emitModify = <T>({ id, modifiedParams, modifiedType }: ModifiedEmitParam<T>) =>
  emitter.emit('modify_notification', { id, modifiedParams, modifiedType })

export const useNotificationController = () => {
  const context = useVariantsRendererContext()

  const modify = useCallback(
    // Would be cool to have some type inferance here in future
    ({ id, modifiedParams, modifiedType }) =>
      emitModify({ id: id ?? context?.id ?? '', modifiedParams, modifiedType }),
    [context?.id]
  )
  const remove = useCallback((id) => emitRemove(id ?? context?.id ?? ''), [context?.id])

  return { remove, modify }
}
