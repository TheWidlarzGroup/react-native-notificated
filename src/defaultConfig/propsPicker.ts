import type { NotificationProps } from '../types'
import { themeBase } from './components/theme'

export const propsPicker = (
  props: NotificationProps,
  defaultGlobalConfig: NotificationProps | undefined,
  defaultNotificationTypeConfig: NotificationProps | undefined,
  baseColor: string
) => {
  return {
    title: props.title ?? defaultNotificationTypeConfig?.title ?? defaultGlobalConfig?.title,
    description:
      props.description ??
      defaultNotificationTypeConfig?.description ??
      defaultGlobalConfig?.description,
    theme: props.theme ?? defaultNotificationTypeConfig?.theme ?? defaultGlobalConfig?.theme,
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
      (defaultGlobalConfig?.borderRadius || themeBase.borderRadius.default),
    borderColor:
      props.borderColor ??
      defaultNotificationTypeConfig?.borderColor ??
      (defaultGlobalConfig?.borderColor || baseColor),
    borderWidth:
      props.borderWidth ??
      defaultNotificationTypeConfig?.borderWidth ??
      defaultGlobalConfig?.borderWidth,
    multiline:
      props.multiline ?? defaultNotificationTypeConfig?.multiline ?? defaultGlobalConfig?.multiline,
  }
}
