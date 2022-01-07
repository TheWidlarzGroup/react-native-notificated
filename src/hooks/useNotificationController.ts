import { useCallback } from 'react'
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

export const useNotificationController = ({ id, ...config }: EmitParam<any>) => {
  const modify = useCallback(
    ({ modifiedParams, modifiedType }: Omit<ModifiedEmitParam<typeof config>, 'id'>) =>
      emitModify({ id, modifiedParams, modifiedType }),
    [id]
  )
  const remove = useCallback(() => emitRemove(id), [id])

  return { remove, modify }
}
