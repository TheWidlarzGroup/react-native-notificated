import type { ImageSourcePropType } from 'react-native'
import { themeBase } from './components/theme'
import { chooseDefaultAccentColor } from './stylesUtils'
import { chooseDefaultIcon } from './choseDefaultIcon'
import type {
  DefaultKeys,
  MergedNotificationStyleConfig,
  NotificationProps,
  NotificationStyleConfig,
} from './types'

export const mergeProps = (
  props: NotificationProps,
  notificationType: DefaultKeys,
  darkMode: boolean,
  defaultGlobalConfig?: NotificationStyleConfig,
  defaultNotificationTypeConfig?: NotificationStyleConfig
): NotificationProps & MergedNotificationStyleConfig => {
  const customIconSource: ImageSourcePropType | undefined | JSX.Element =
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
    hideCloseButton: props.hideCloseButton,
    theme: darkMode ? 'dark' : 'regular',
    titleSize: chooseProps('titleSize'),
    titleColor: chooseProps('titleColor'),
    titleFamily: chooseProps("titleFamily"),
    titleWeight: chooseProps("titleWeight"),
    descriptionColor: chooseProps('descriptionColor'),
    descriptionSize: chooseProps('descriptionSize'),
    descriptionFamily: chooseProps("descriptionFamily"),
    descriptionWeight: chooseProps("descriptionWeight"),
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
    imageStyle: chooseProps('imageStyle'),
  }
}
