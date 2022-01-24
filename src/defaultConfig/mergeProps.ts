import type { MergedNotificationStyleConfig, NotificationProps } from '../types'
import type { ImageSourcePropType } from 'react-native'
import { themeBase } from './components/theme'
import { chooseDefaultAccentColor } from './stylesUtils'
import { chooseDefaultIcon } from './choseDefaultIcon'
import type { NotificationStyleConfig, NotificationVariants } from './types'
import type { NotificationPosition } from '../types/config'

export const mergeProps = (
  props: NotificationProps,
  notificationType: NotificationVariants,
  darkMode: boolean,
  defaultGlobalConfig?: NotificationStyleConfig,
  defaultNotificationTypeConfig?: NotificationStyleConfig,
  defaultNotificationPosition?: NotificationPosition
): NotificationProps & MergedNotificationStyleConfig => {
  const customIconSource: ImageSourcePropType | undefined =
    props.leftIconSource ??
    defaultNotificationTypeConfig?.leftIconSource ??
    defaultGlobalConfig?.leftIconSource

  const chooseProps = (
    property: keyof NotificationStyleConfig
  ): NotificationStyleConfig[typeof property] => {
    return (
      props[property] ??
      defaultNotificationTypeConfig?.[property] ??
      defaultGlobalConfig?.[property] ??
      undefined
    )
  }

  return {
    title: props.title ?? '',
    description: props.description ?? '',
    theme: darkMode ? 'dark' : 'regular',
    titleSize: chooseProps('titleSize'),
    titleColor: chooseProps('titleColor'),
    descriptionColor: chooseProps('descriptionColor'),
    descriptionSize: chooseProps('descriptionSize'),
    bgColor: chooseProps('bgColor'),
    borderWidth: chooseProps('borderWidth') ?? 1,
    multiline: chooseProps('multiline'),
    defaultIconType: chooseProps('defaultIconType'),
    borderType: chooseProps('borderType') ?? 'border',
    borderRadius:
      props.borderRadius ??
      defaultNotificationTypeConfig?.borderRadius ??
      (defaultGlobalConfig?.borderRadius || themeBase.borderRadius.regular),
    accentColor:
      props.accentColor ??
      defaultNotificationTypeConfig?.accentColor ??
      (defaultGlobalConfig?.accentColor || chooseDefaultAccentColor(notificationType)),
    leftIconSource:
      customIconSource ??
      chooseDefaultIcon(
        notificationType,
        darkMode,
        props.defaultIconType ??
          defaultNotificationTypeConfig?.defaultIconType ??
          defaultGlobalConfig?.defaultIconType
      ),
    notificationType: notificationType,
    notificationPosition: defaultNotificationPosition,
    onPress: props.onPress ?? undefined,
  }
}
