import type { CustomAnimationConfig } from './types/animations'
import type { DefaultLayoutConfig, DefaultVariants } from './defaultConfig/types'
import type { NotificationPosition } from './types/config'
import type { GestureConfig } from './types/gestures'
import type { ComponentProps, VFC } from 'react'
import type { ModifiedEmitParam } from './core/services/types'

declare global {
  namespace Notificated {
    interface CustomVariants {}
  }
}

export type RequiredProps<T extends Variant<VFC<any>>> = ComponentProps<T['component']>

export type Variant<T> = {
  component: T
  config?: Partial<Omit<NotificationConfigBase, 'isNotch'>>
}

export type VariantsMap = Record<string, Variant<VFC<any>>>

type CustomVariants = Notificated.CustomVariants

export type Variants = CustomVariants[keyof CustomVariants] extends never
  ? DefaultVariants
  : CustomVariants

export type NotificationConfigBase = {
  duration: number
  notificationPosition: NotificationPosition
  animationConfig: CustomAnimationConfig
  gestureConfig: GestureConfig
  isNotch?: boolean
  onClose?: () => void
}

export type NotificationsConfig<Variants> = {
  variants: Variants
} & NotificationConfigBase &
  DefaultLayoutConfig

export type { CustomAnimationConfig }

export type Modify = (id: string, params: Partial<ModifiedEmitParam>) => void

export type Remove = (id: string) => void

export type Notify<V extends VariantsMap = Variants> = <Variant extends keyof V>(
  notificationType: Variant,
  setup: { params: RequiredProps<V[Variant]>; config?: Partial<NotificationConfigBase> }
) => { id: string }

export type UseNotification<V extends VariantsMap = Variants> = () => {
  modify: Modify
  remove: Remove
  notify: Notify<V>
}
