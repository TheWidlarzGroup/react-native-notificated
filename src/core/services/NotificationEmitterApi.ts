import { generateNotificationId } from '../utils/uuid'
import type { Emmiter, Modify, Notify, Remove, UseNotification, VariantsMap } from '../../types'
import { emitter } from './NotificationEmitter'
import type { Variants } from '../../../lib/typescript/types'

export const remove: Remove = (id) => emitter.emit('remove_notification', { id })

export const modify: Modify = (id: string, { params, config }) =>
  emitter.emit('modify_notification', { id, params, config })

export const notify: Notify = (notificationType, setup) => {
  const id = generateNotificationId(notificationType.toString())
  emitter.emit('add_notification', {
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

export const getNotificationEmmiter = <V extends VariantsMap = Variants>(): Emmiter<V> => {
  return NotificationEmitterApi as unknown as Emmiter<V>
}

export const useNotifications: UseNotification<Variants> = () => NotificationEmitterApi

export default NotificationEmitterApi
