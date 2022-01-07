import { themeBase } from './components/theme'
import type { PropsConfig, DefaultStylesConfig } from '../types'

export const mergeProps = (
  props: Partial<PropsConfig>,
  baseColor: string,
  darkMode: boolean,
  defaultGlobalConfig?: DefaultStylesConfig,
  defaultNotificationTypeConfig?: DefaultStylesConfig
): PropsConfig => {
  const visualVariant = 'color'
  const notificationType = 'error'
  const chooseIcon = () => {
    switch (notificationType) {
      case 'error':
        switch (visualVariant) {
          case 'color':
            return require('../assets/images/success.png')
        }
    }
  }

  return {
    title: props.title ?? 'Title',
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
      (defaultGlobalConfig?.borderRadius || themeBase.borderRadius.default),
    borderColor:
      props.borderColor ??
      defaultNotificationTypeConfig?.borderColor ??
      (defaultGlobalConfig?.borderColor || baseColor),
    borderWidth:
      props.borderWidth ??
      defaultNotificationTypeConfig?.borderWidth ??
      defaultGlobalConfig?.borderWidth ??
      1,
    multiline:
      props.multiline ?? defaultNotificationTypeConfig?.multiline ?? defaultGlobalConfig?.multiline,
    leftIconSource: chooseIcon(),
  }
}
