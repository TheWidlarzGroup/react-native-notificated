export type NotificationsType = 'default' | 'success' | 'warning' | 'error'
export type NotificationPosition = 'top' | 'center' | 'bottom'

export interface NotificationConfig {
  type: NotificationsType
  withButton?: boolean
  time?: number
  msg?: string
  title: string
  id?: string
  position?: NotificationPosition
  onPress?: () => void
}

export type EventType =
  | 'add_notification'
  | 'pop_notification'
  | 'remove_notification'
  | 'modify_notification'

export type EventCallback = (payload?: any) => void
