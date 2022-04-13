import { generateNotificationId } from '../utils/uuid'
import type { NotificationConfigBase, RequiredProps, VariantsMap } from '../../types'
import type { DefaultVariants } from '../../defaultConfig/types'
import { emitter } from './NotificationEmitter'
import type { EmitParam, ModifiedEmitParam } from './types'

export const remove = (id: string) => emitter.emit('remove_notification', { id })

export const modify = <T>(
  id: string,
  { params, config }: Partial<Omit<ModifiedEmitParam<T>, 'id'>>
) => emitter.emit('modify_notification', { id, params, config })

export const notify = <
  Variant extends keyof Variants,
  Variants extends VariantsMap = DefaultVariants
>(
  notificationType: Variant,
  setup: { params: RequiredProps<Variants[Variant]>; config?: Partial<NotificationConfigBase> }
) => {
  const id = generateNotificationId(notificationType.toString())
  emitter.emit<EmitParam<typeof setup['params']>>('add_notification', {
    notificationType,
    id,
    ...setup,
  })
  return {
    id,
  }
}

const NotificationEmitterApi = {
  remove,
  modify,
  notify,
}

export type Modify = (id: string, params: Partial<ModifiedEmitParam<unknown>>) => void
export type Remove = (id: string) => void
export type Notify<Variants extends VariantsMap = DefaultVariants> = <
  Variant extends keyof Variants
>(
  notificationType: Variant,
  setup: { params: RequiredProps<Variants[Variant]>; config?: Partial<NotificationConfigBase> }
) => { id: string }

export const useNotifications = () => NotificationEmitterApi

export default NotificationEmitterApi
