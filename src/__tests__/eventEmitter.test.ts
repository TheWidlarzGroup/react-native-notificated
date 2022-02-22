import { createNotificationsEmitter } from '../core/services/NotificationEmitter'
import type { EventType } from '../types/config'

describe('event emiter tests', () => {
  it.each([
    'add_notification',
    'pop_notification',
    'remove_notification',
    'modify_notification',
  ] as EventType[])('should emmit events for %s', function (eventType) {
    const emitter = createNotificationsEmitter()

    const payload = { a: 1, b: 2 }

    const stub = jest.fn()

    emitter.addListener(eventType, stub)
    emitter.emit(eventType, payload)

    expect(stub).toBeCalledWith(payload)
  })

  it.each([
    'add_notification',
    'pop_notification',
    'remove_notification',
    'modify_notification',
  ] as EventType[])('should return callback to remove listener', function (eventType) {
    const emitter = createNotificationsEmitter()

    const payload = { a: 1, b: 2 }

    const stub = jest.fn()

    const remove = emitter.addListener(eventType, stub)
    remove()
    emitter.emit(eventType, payload)

    expect(stub).toBeCalledTimes(0)
  })

  it.each([
    'add_notification',
    'pop_notification',
    'remove_notification',
    'modify_notification',
  ] as EventType[])('should remove every listener of type %s', function (eventType) {
    const emitter = createNotificationsEmitter()

    const payload = { a: 1, b: 2 }

    const stub1 = jest.fn()
    const stub2 = jest.fn()

    emitter.addListener(eventType, stub1)
    emitter.addListener(eventType, stub2)

    emitter.removeEvent(eventType)

    emitter.emit(eventType, payload)

    expect(stub1).toBeCalledTimes(0)
    expect(stub2).toBeCalledTimes(0)
  })
})
