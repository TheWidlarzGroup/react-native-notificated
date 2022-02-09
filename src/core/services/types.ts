import type { NotificationConfigBase } from '../../types'

export type EmitParam<T = unknown> = {
  notificationType: unknown
  params: T
  id: string
  config?: Partial<NotificationConfigBase>
}
export type ModifiedEmitParam<T> = Omit<EmitParam<T>, 'notificationType'>
export type RemoveEmitParam<T> = Pick<EmitParam<T>, 'id'>
