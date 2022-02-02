import { generateNotificationId } from '../utils/uuid'
import { emitter } from '../core/useNotificationConfig'
import type {
  EmitParam,
  ModifiedEmitParam,
  NotificationConfigBase,
  RequiredProps,
  VariantsMap,
} from '../types'
import type { DefaultVariants } from '../defaultConfig/types'

export const remove = (id: string) => emitter.emit('remove_notification', { id })
export const modify = <T>({ id, params }: ModifiedEmitParam<T>) =>
  emitter.emit('modify_notification', { id, params })

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

export default NotificationEmitterApi
