import type { EmitParam } from '../services/types'
import type { Actions, Add, Modify, Pop, Remove } from '../../types/reducer'

export const queueReducer = (state: EmitParam[], action: Actions) => {
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
  // fallback to exit animation when notification to remove is active
  if (state[0].id === action.payload) {
    action.onActiveNotification(action.payload)
    return state
  }

  return state.filter((el) => el.id !== action.payload)
}

const modify = (state: EmitParam[], action: Modify) => {
  return state.map((notification) => {
    if (notification.id !== action.payload.id) return notification
    return {
      ...notification,
      params: { ...(notification.params as any), ...(action.payload.params as any) },
    }
  })
}
