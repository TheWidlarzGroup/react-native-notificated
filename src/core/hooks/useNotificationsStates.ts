import {useNotificationConfig} from './useNotificationConfig'
import {useReducer, useRef, useState} from 'react'
import {getTopOffset, mergeConfigs} from '../utils/pickers'
import type {EmitParam, ModifiedEmitParam} from '../services/types'

export const useNotificationsStates = () => {
  const panHandlerRef = useRef(null)
  const longPressHandlerRef = useRef(null)
  const globalConfig = useNotificationConfig()
  const [notificationsQueue, dispatch] = useReducer(queueReducer, [])
  const [notificationHeight, setNotificationHeight] = useState(0)

  console.log(notificationsQueue.map((el) => el.id))

  const notificationEvent = notificationsQueue[0]
  const config = mergeConfigs(globalConfig, notificationEvent)

  const topOffset = getTopOffset(config, notificationHeight)

  return {
    config,
    dispatch,
    topOffset,
    panHandlerRef,
    notificationEvent,
    notificationsQueue,
    longPressHandlerRef,
    setNotificationHeight,
  }
}

type Actions = Add | Remove | Modify | Pop

type Add = { type: 'add'; payload: EmitParam }
type Remove = { type: 'remove'; payload: EmitParam['id']; callback: (id: EmitParam['id']) => void }
type Modify = { type: 'modify'; payload: ModifiedEmitParam<unknown> }
type Pop = { type: 'pop'; payload?: EmitParam['id'] }

const modify = (state: EmitParam[], action: Modify) => {
  return state.map((notification) => {
    if (notification.id !== action.payload.id) return notification
    return {
      ...notification,
      params: { ...(notification.params as any), ...(action.payload.params as any) },
    }
  })
}

const add = (state: EmitParam[], action: Add) => {
  return [...state, action.payload]
}

const pop = (state: EmitParam[], action: Pop) => {
  if (action.payload) {
    return state.filter((notification) => notification.id !== action.payload)
  }
  return state.filter((_, index: number) => index !== 0)
}

const remove = (state: EmitParam[], action: Remove) => {
  if (state[0].id === action.payload) {
    action.callback(action.payload)
    return state
  }

  return state.filter((el) => el.id !== action.payload)
}

const queueReducer = (state: EmitParam[], action: Actions) => {
  switch (action.type) {
    case 'modify':
      return modify(state, action)
    case 'pop':
      return pop(state, action)
    case 'add':
      return add(state, action)
    case 'remove':
      return remove(state, action)
    default:
      return state
  }
}

export type NotificationState = ReturnType<typeof useNotificationsStates>
