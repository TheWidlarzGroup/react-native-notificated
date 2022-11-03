import { generateNotificationId } from '../utils/uuid'
import type { Modify, Notify, Remove, UseNotification } from '../../types'
import { emitter } from './NotificationEmitter'

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

export const useNotifications: UseNotification = () => NotificationEmitterApi
