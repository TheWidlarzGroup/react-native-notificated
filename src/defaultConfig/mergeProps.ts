import type { ImageSourcePropType } from 'react-native'
import { themeBase } from './components/theme'
import { chooseDefaultAccentColor } from './stylesUtils'
import { chooseDefaultIcon } from './choseDefaultIcon'
import type {
  MergedNotificationStyleConfig,
  NotificationProps,
  NotificationStyleConfig,
  NotificationVariants,
} from './types'

export const mergeProps = (
  props: NotificationProps,
  notificationType: NotificationVariants,
  darkMode: boolean,
  defaultGlobalConfig?: NotificationStyleConfig,
  defaultNotificationTypeConfig?: NotificationStyleConfig
): NotificationProps & MergedNotificationStyleConfig => {
  const customIconSource: ImageSourcePropType | undefined =
    props.style?.leftIconSource ??
    defaultNotificationTypeConfig?.leftIconSource ??
    defaultGlobalConfig?.leftIconSource

  const chooseProps = <Property extends keyof NotificationStyleConfig>(
    property: Property
  ): NotificationStyleConfig[Property] => {
    return (
      props.style?.[property] ??
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
      props.style?.borderRadius ??
      defaultNotificationTypeConfig?.borderRadius ??
      (defaultGlobalConfig?.borderRadius || themeBase.borderRadius.regular),
    accentColor:
      props.style?.accentColor ??
      defaultNotificationTypeConfig?.accentColor ??
      (defaultGlobalConfig?.accentColor || chooseDefaultAccentColor(notificationType)),
    leftIconSource:
      customIconSource ??
      chooseDefaultIcon(
        notificationType,
        darkMode,
        props.style?.defaultIconType ??
          defaultNotificationTypeConfig?.defaultIconType ??
          defaultGlobalConfig?.defaultIconType
      ),
    onPress: props.onPress ?? undefined,
  }
}
