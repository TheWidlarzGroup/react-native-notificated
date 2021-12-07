import { NotificationsEmitter } from 'react-native-notification'

// Here we should consider some config properties
export const useNotifications = () => ({
  addListener: NotificationsEmitter.addListener,
  removeEvent: NotificationsEmitter.removeEvent,
  emit: NotificationsEmitter.emit,
})
