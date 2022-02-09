import type { EventCallback, EventType } from '../../types/config'

interface NotificationListener {
  eventType: EventType
  callback: EventCallback
}

export const createNotificationsEmitter = () => {
  const listeners = new Set<NotificationListener>()

  const removeListener = (listener: NotificationListener) => {
    listeners.delete(listener)
  }

  const addListener = (eventType: EventType, callback: EventCallback) => {
    const listener = { eventType, callback }
    listeners.add(listener)

    return () => removeListener(listener)
  }

  const removeEvent = (eventType: EventType) => {
    const listenersValues = listeners.values()
    listeners.clear()
    for (const value of listenersValues) {
      if (value.eventType !== eventType) {
        listeners.add(value)
      }
    }
  }

  const emit = <T>(eventType: EventType, payload?: T) => {
    listeners.forEach((listener) => listener.eventType === eventType && listener.callback(payload))
  }

  return {
    addListener,
    removeEvent,
    emit,
  }
}

export const emitter = createNotificationsEmitter()
