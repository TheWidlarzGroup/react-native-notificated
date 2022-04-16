import type {
  NotificationConfigBase,
  RequiredProps,
  Variant,
  Variants,
  VariantsMap,
} from '../../types'

export type EmitParam<T extends VariantsMap = Variants> = {
  notificationType: keyof T
  params: RequiredProps<T[keyof T]>
  id: string
  config?: Partial<NotificationConfigBase>
}

export type ModifiedEmitParam<T extends Variant<any> = Variant<any>> = {
  id: string
  notificationType: keyof T
  params: Partial<RequiredProps<T>>
  config?: Partial<NotificationConfigBase>
}

export type RemoveEmitParam<T extends VariantsMap = Variants> = Pick<EmitParam<T>, 'id'>
