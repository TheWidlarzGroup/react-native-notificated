import { themeBase } from './components/theme'
import type { PropsConfig, DefaultStylesConfig } from '../types'
import { chooseDefaultIcon } from './choseDefaultIcon'
import type { NotificationVariants } from '../types'
import { chooseDefaultAccentColor } from './stylesUtils'

export const mergeProps = (
  props: Partial<PropsConfig>,
  notificationType: NotificationVariants,
  darkMode: boolean,
  defaultGlobalConfig?: DefaultStylesConfig,
  defaultNotificationTypeConfig?: DefaultStylesConfig
): PropsConfig => {
  const customIconSource =
    props.leftIconSource ??
    defaultNotificationTypeConfig?.leftIconSource ??
    defaultGlobalConfig?.leftIconSource

  return {
    title: props.title ?? '',
    description: props.description ?? 'Description',
    theme: darkMode ? 'dark' : 'regular',
    titleSize:
      props.titleSize ?? defaultNotificationTypeConfig?.titleSize ?? defaultGlobalConfig?.titleSize,
    titleColor:
      props.titleColor ??
      defaultNotificationTypeConfig?.titleColor ??
      defaultGlobalConfig?.titleColor,
    descriptionColor:
      props.descriptionColor ??
      defaultNotificationTypeConfig?.descriptionColor ??
      defaultGlobalConfig?.descriptionColor,
    descriptionSize:
      props.descriptionSize ??
      defaultNotificationTypeConfig?.descriptionSize ??
      defaultGlobalConfig?.descriptionSize,
    bgColor:
      props.bgColor ?? defaultNotificationTypeConfig?.bgColor ?? defaultGlobalConfig?.bgColor,
    borderRadius:
      props.borderRadius ??
      defaultNotificationTypeConfig?.borderRadius ??
      (defaultGlobalConfig?.borderRadius || themeBase.borderRadius.regular),
    accentColor:
      props.accentColor ??
      defaultNotificationTypeConfig?.accentColor ??
      (defaultGlobalConfig?.accentColor || chooseDefaultAccentColor(notificationType)),
    borderWidth:
      props.borderWidth ??
      defaultNotificationTypeConfig?.borderWidth ??
      defaultGlobalConfig?.borderWidth ??
      1,
    multiline:
      props.multiline ?? defaultNotificationTypeConfig?.multiline ?? defaultGlobalConfig?.multiline,
    defaultIconType:
      props.defaultIconType ??
      defaultNotificationTypeConfig?.defaultIconType ??
      defaultGlobalConfig?.defaultIconType,
    leftIconSource:
      customIconSource ??
      chooseDefaultIcon(
        notificationType,
        darkMode,
        props.defaultIconType ??
          defaultNotificationTypeConfig?.defaultIconType ??
          defaultGlobalConfig?.defaultIconType
      ),
    borderType:
      props.borderType ??
      defaultNotificationTypeConfig?.borderType ??
      defaultGlobalConfig?.borderType ??
      'border',
  }
}
