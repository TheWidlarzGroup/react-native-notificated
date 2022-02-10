import type { NotificationConfigBase } from '../../types'
import type { KeyType } from '../../types/misc'

export type EmitParam<T = unknown> = {
  notificationType: KeyType
  params: T
  id: string
  config?: Partial<NotificationConfigBase>
}
export type ModifiedEmitParam<T> = Omit<EmitParam<T>, 'notificationType'>
export type RemoveEmitParam<T> = Pick<EmitParam<T>, 'id'>
