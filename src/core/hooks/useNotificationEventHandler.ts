import { useEffect } from 'react'
import { emitter } from '../services/NotificationEmitter'
import type { NotificationState } from './useNotificationsStates'
import type { AnimationAPI } from './useAnimationAPI'
import type { EmitParam, ModifiedEmitParam, RemoveEmitParam } from '../services/types'

type Props = Pick<NotificationState, 'dispatch' | 'notificationsQueue' | 'notificationEvent'> &
  Pick<AnimationAPI, 'dismiss' | 'present'>

export const useNotificationEventHandler = ({
  dismiss,
  notificationEvent,
  notificationsQueue,
  present,
  dispatch,
}: Props) => {
  useEffect(() => {
    if (notificationEvent?.id) {
      present()
    }
  }, [notificationEvent?.id, present])

  useEffect(() => {
    const removeListener = emitter.addListener('add_notification', (config: EmitParam<unknown>) => {
      dispatch({ type: 'add', payload: config })
    })

    return removeListener
  }, [dispatch])

  useEffect(() => {
    const modifyNotification = (modifiedConfig: ModifiedEmitParam<unknown>) => {
      dispatch({ type: 'modify', payload: modifiedConfig })
    }

    const removeListener = emitter.addListener('modify_notification', modifyNotification)

    return removeListener
  }, [dispatch])

  useEffect(() => {
    const removeListener = emitter.addListener('pop_notification', (id?: string) => {
      dispatch({ type: 'pop', payload: id })
    })

    return removeListener
  }, [dispatch])

  useEffect(() => {
    const removeNotification = ({ id }: RemoveEmitParam<unknown>) => {
      dispatch({ type: 'remove', payload: id, onActiveNotification: dismiss })
    }

    const removeListener = emitter.addListener('remove_notification', removeNotification)
    return removeListener
  }, [dismiss, dispatch, notificationsQueue])
}
