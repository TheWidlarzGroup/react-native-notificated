import { useEffect } from 'react'
import { emitter } from '../services/NotificationEmitter'
import type { ModifiedEmitParam, RemoveEmitParam } from '../../types'
import type { NotificationState } from './useNotificationsStates'
import type { EmitParam } from '../../types'
import type { AnimationAPI } from './useAnimationControl'

type Props = Pick<AnimationAPI, 'dismiss' | 'present'> &
  Pick<NotificationState, 'setNotificationsQueue' | 'notificationsQueue' | 'notificationConfig'>

export const useNotificationEventHandler = ({
  dismiss,
  notificationConfig,
  notificationsQueue,
  present,
  setNotificationsQueue,
}: Props) => {
  useEffect(() => {
    if (notificationConfig) {
      present()
    }
  }, [notificationConfig, present])

  useEffect(() => {
    const removeListener = emitter.addListener('add_notification', (config: EmitParam<unknown>) => {
      setNotificationsQueue((prev) => {
        return [...prev, config]
      })
    })

    return removeListener
  }, [setNotificationsQueue])

  useEffect(() => {
    const removeListener = emitter.addListener('pop_notification', () => {
      setNotificationsQueue((prev) => prev.filter((_, index: number) => index !== 0))
    })

    return removeListener
  }, [setNotificationsQueue])

  useEffect(() => {
    const modifyNotification = ({ id, params }: ModifiedEmitParam<unknown>) => {
      setNotificationsQueue((prevState) =>
        prevState.map((notification) => {
          if (notification.id !== id) return notification
          return {
            ...notification,
            params: { ...(notification.params as any), ...(params as any) },
          }
        })
      )
    }

    const removeListener = emitter.addListener('modify_notification', modifyNotification)

    return removeListener
  }, [setNotificationsQueue])

  useEffect(() => {
    const removeNotification = ({ id }: RemoveEmitParam<unknown>) => {
      const [firstNotification] = notificationsQueue
      // if notification is currently displayed animate it back
      if (firstNotification?.id === id) return dismiss()
      setNotificationsQueue((prevState) =>
        prevState.filter((notification) => notification.id !== id)
      )
    }

    const removeListener = emitter.addListener('remove_notification', removeNotification)
    return removeListener
  }, [dismiss, notificationsQueue, setNotificationsQueue])
}