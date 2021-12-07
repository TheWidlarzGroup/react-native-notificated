import type { ArgsFunc, EventType } from './types'

interface NotificationListener {
  eventType: EventType
  callback: ArgsFunc
}

export namespace NotificationsEmitter {
  const listeners = new Set<NotificationListener>()

  const removeListener = (listener: NotificationListener) => {
    listeners.delete(listener)
  }

  export const addListener = (eventType: EventType, callback: ArgsFunc) => {
    const listener = { eventType, callback }
    listeners.add(listener)

    // Maybe we should return just listener? idk -> leave it for further investigation
    return () => removeListener(listener)
  }

  export const removeEvent = (eventType: EventType) => {
    const listenersValues = listeners.values()
    listeners.clear()
    for (const value of listenersValues) {
      if (value.eventType !== eventType) {
        listeners.add(value)
      }
    }
  }

  export const emit = (eventType: EventType, ...args: any) => {
    listeners.forEach((listener) => listener.eventType === eventType && listener.callback(args))
  }
}
