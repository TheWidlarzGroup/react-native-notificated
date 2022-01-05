import React from 'react'
import { NotificationBase } from './NotificationBase'
import { themeBase } from './theme'
import { useNotificationConfig } from '../../core/useNotificationConfig'
import type { NotificationProps } from '../../types'

export const ErrorNotification = ({
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
  const { defaultGlobalConfig, defaultErrorConfig } = useNotificationConfig()

  return (
    <NotificationBase
      title={title ?? defaultErrorConfig?.title ?? defaultGlobalConfig?.title}
      description={
        description ?? defaultErrorConfig?.description ?? defaultGlobalConfig?.description
      }
      theme={theme ?? defaultErrorConfig?.theme ?? defaultGlobalConfig?.theme}
      titleSize={titleSize ?? defaultErrorConfig?.titleSize ?? defaultGlobalConfig?.titleSize}
      titleColor={titleColor ?? defaultErrorConfig?.titleColor ?? defaultGlobalConfig?.titleColor}
      descriptionColor={
        descriptionColor ??
        defaultErrorConfig?.descriptionColor ??
        defaultGlobalConfig?.descriptionColor
      }
      descriptionSize={
        descriptionSize ??
        defaultErrorConfig?.descriptionSize ??
        defaultGlobalConfig?.descriptionSize
      }
      bgColor={bgColor ?? defaultErrorConfig?.bgColor ?? defaultGlobalConfig?.bgColor}
      borderRadius={
        borderRadius ??
        defaultErrorConfig?.borderRadius ??
        (defaultGlobalConfig?.borderRadius || themeBase.borderRadius.default)
      }
      borderColor={
        borderColor ??
        defaultErrorConfig?.borderColor ??
        (defaultGlobalConfig?.borderColor || themeBase.color.success)
      }
      borderWidth={
        borderWidth ?? defaultErrorConfig?.borderWidth ?? defaultGlobalConfig?.borderWidth
      }
      // icon={icon}
      multiline={multiline ?? defaultErrorConfig?.multiline ?? defaultGlobalConfig?.multiline}
    />
  )
}
