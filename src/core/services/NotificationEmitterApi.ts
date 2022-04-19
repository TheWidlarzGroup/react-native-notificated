import { generateNotificationId } from '../utils/uuid'
import type { NotificationConfigBase, RequiredProps, Variants, VariantsMap } from '../../types'
import { emitter } from './NotificationEmitter'
import type { EmitParam, ModifiedEmitParam } from './types'

export const remove: Remove = (id) => emitter.emit('remove_notification', { id })

export const modify: Modify = (id: string, { params, config }) =>
  emitter.emit('modify_notification', { id, params, config })

export const notify: Notify = (notificationType, setup) => {
  const id = generateNotificationId(notificationType.toString())
  emitter.emit<EmitParam>('add_notification', {
    notificationType,
    id,
    ...setup,
  })
  return {
    id,
  }
}

const NotificationEmitterApi = {
  remove,
  modify,
  notify,
}

export const createEmitterApi = <T extends VariantsMap>() =>
  NotificationEmitterApi as unknown as Operations<T>

export type Modify<V extends VariantsMap = Variants> = <K extends keyof V>(
  id: string,
  params: Partial<ModifiedEmitParam<V[K]>>
) => void

export type Remove = (id: string) => void
export type Notify<V extends VariantsMap = Variants> = <Variant extends keyof V>(
  notificationType: Variant,
  setup: { params: RequiredProps<V[Variant]>; config?: Partial<NotificationConfigBase> }
) => { id: string }

export type Operations<T extends VariantsMap> = {
  modify: Modify<T>
  remove: Remove
  notify: Notify<T>
}

export const useNotifications = () => NotificationEmitterApi

export default NotificationEmitterApi
