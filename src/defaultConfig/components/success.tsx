import React from 'react'
import { themeBase } from './theme'
import { NotificationBase } from './NotificationBase'
import type { NotificationProps } from '../../types'
import { useNotificationConfig } from '../../core/useNotificationConfig'

export const SuccessNotification = ({
  title,
  description,
  theme,
  titleSize,
  titleColor,
  descriptionColor,
  descriptionSize,
  bgColor,
  borderRadius,
  borderColor,
  borderWidth,
  icon,
  multiline,
}: NotificationProps) => {
  const { defaultGlobalConfig, defaultSuccessConfig } = useNotificationConfig()

  return (
    <NotificationBase
      title={title ?? defaultSuccessConfig?.title ?? defaultGlobalConfig?.title}
      description={
        description ?? defaultSuccessConfig?.description ?? defaultGlobalConfig?.description
      }
      theme={theme ?? defaultSuccessConfig?.theme ?? defaultGlobalConfig?.theme}
      titleSize={titleSize ?? defaultSuccessConfig?.titleSize ?? defaultGlobalConfig?.titleSize}
      titleColor={titleColor ?? defaultSuccessConfig?.titleColor ?? defaultGlobalConfig?.titleColor}
      descriptionColor={
        descriptionColor ??
        defaultSuccessConfig?.descriptionColor ??
        defaultGlobalConfig?.descriptionColor
      }
      descriptionSize={
        descriptionSize ??
        defaultSuccessConfig?.descriptionSize ??
        defaultGlobalConfig?.descriptionSize
      }
      bgColor={bgColor ?? defaultSuccessConfig?.bgColor ?? defaultGlobalConfig?.bgColor}
      borderRadius={
        borderRadius ??
        defaultSuccessConfig?.borderRadius ??
        (defaultGlobalConfig?.borderRadius || themeBase.borderRadius.default)
      }
      borderColor={
        borderColor ??
        defaultSuccessConfig?.borderColor ??
        (defaultGlobalConfig?.borderColor || themeBase.color.success)
      }
      borderWidth={
        borderWidth ?? defaultSuccessConfig?.borderWidth ?? defaultGlobalConfig?.borderWidth
      }
      // icon={icon}
      multiline={multiline ?? defaultSuccessConfig?.multiline ?? defaultGlobalConfig?.multiline}
    />
  )
}
