import type {
  DefaultVariants,
  NotificationsConfig,
  RequiredProps,
  VariantsMap,
} from './defaultConfig'

const createNotification = <Variants extends VariantsMap = DefaultVariants>(
  config?: Partial<NotificationsConfig<Variants>>
) => {
  const notify = <Variant extends keyof Variants>(
    notificationType: Variant,
    params: RequiredProps<Variants[Variant]>
  ) => {}

  return { notify }
}

const { notify } = createNotification()

// notify('success', { title: 'jii', message: 'yep' })
// notify('warning', { title: 'jii', message: 'yep' })
// notify('undo', { title: 'jii', message: 'yep', onPress: console.log })
// notify('undo', { title: 'jii', message: 'yep' })
// notify('undo', { title: 'jii', message: 'yep' })
