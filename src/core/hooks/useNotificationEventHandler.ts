import { useEffect } from 'react'
import { emitter } from '../services/NotificationEmitter'
import type { NotificationState } from './useNotificationsStates'
import type { AnimationAPI } from './useAnimationAPI'
import type { EmitParam, ModifiedEmitParam, RemoveEmitParam } from '../services/types'

type Props = Pick<
  NotificationState,
  'setNotificationsQueue' | 'notificationsQueue' | 'notificationEvent'
> &
  Pick<AnimationAPI, 'dismiss' | 'present'>

export const useNotificationEventHandler = ({
  dismiss,
  notificationEvent,
  notificationsQueue,
  present,
  setNotificationsQueue,
}: Props) => {
  useEffect(() => {
    if (notificationEvent?.id) {
      present()
    }
  }, [notificationEvent?.id, present])

  useEffect(() => {
    const removeListener = emitter.addListener('add_notification', (config: EmitParam<unknown>) => {
      setNotificationsQueue((prev) => {
        return [...prev, config]
      })
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
    let lastId: string | undefined

    const removeListener = emitter.addListener('pop_notification', (id?: string) => {
      if (lastId && lastId === id) {
        return
      }

      setNotificationsQueue((prevState) => {
        if (id) {
          return prevState.filter((notification) => notification.id !== id)
        }

        return prevState.filter((_, index: number) => index !== 0)
      })

      lastId = id
    })

    return removeListener
  }, [setNotificationsQueue])

  useEffect(() => {
    const removeNotification = ({ id }: RemoveEmitParam<unknown>) => {
      setNotificationsQueue((prevState) => {
        // if notification is currently displayed animate it back
        if (prevState[0]?.id === id) {
          dismiss(id)
          return prevState
        }

        return prevState.filter((notification) => notification.id !== id)
      })
    }

    const removeListener = emitter.addListener('remove_notification', removeNotification)
    return removeListener
  }, [dismiss, notificationsQueue, setNotificationsQueue])
}
