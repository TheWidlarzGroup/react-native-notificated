import { generateNotificationId } from '../utils/uuid'
import type { EmitParam, ModifiedEmitParam, RequiredProps, VariantsMap } from '../types'
import type { DefaultVariants } from '../defaultConfig/types'
import { emitter } from './NotificationEmitter'

export const remove = (id: string) => emitter.emit('remove_notification', { id })
export const modify = <T>({ id, params }: ModifiedEmitParam<T>) =>
  emitter.emit('modify_notification', { id, params })

export const notify = <
  Variant extends keyof Variants,
  Variants extends VariantsMap = DefaultVariants
>(
  notificationType: Variant,
  params: RequiredProps<Variants[Variant]>
) => {
  const id = generateNotificationId(notificationType.toString())
  emitter.emit<EmitParam<typeof params>>('add_notification', {
    notificationType,
    params,
    id,
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

export default NotificationEmitterApi
