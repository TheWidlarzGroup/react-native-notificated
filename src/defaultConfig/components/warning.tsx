import React from 'react'
import { themeBase } from './theme'
import { NotificationBase } from './NotificationBase'
import type { NotificationProps } from '../../types'
import { useNotificationConfig } from '../../core/useNotificationConfig'

export const WarningNotification = ({
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
  const { defaultGlobalConfig, defaultWarningConfig } = useNotificationConfig()

  return (
    <NotificationBase
      title={title ?? defaultWarningConfig?.title ?? defaultGlobalConfig?.title}
      description={
        description ?? defaultWarningConfig?.description ?? defaultGlobalConfig?.description
      }
      theme={theme ?? defaultWarningConfig?.theme ?? defaultGlobalConfig?.theme}
      titleSize={titleSize ?? defaultWarningConfig?.titleSize ?? defaultGlobalConfig?.titleSize}
      titleColor={titleColor ?? defaultWarningConfig?.titleColor ?? defaultGlobalConfig?.titleColor}
      descriptionColor={
        descriptionColor ??
        defaultWarningConfig?.descriptionColor ??
        defaultGlobalConfig?.descriptionColor
      }
      descriptionSize={
        descriptionSize ??
        defaultWarningConfig?.descriptionSize ??
        defaultGlobalConfig?.descriptionSize
      }
      bgColor={bgColor ?? defaultWarningConfig?.bgColor ?? defaultGlobalConfig?.bgColor}
      borderRadius={
        borderRadius ??
        defaultWarningConfig?.borderRadius ??
        (defaultGlobalConfig?.borderRadius || themeBase.borderRadius.default)
      }
      borderColor={
        borderColor ??
        defaultWarningConfig?.borderColor ??
        (defaultGlobalConfig?.borderColor || themeBase.color.success)
      }
      borderWidth={
        borderWidth ?? defaultWarningConfig?.borderWidth ?? defaultGlobalConfig?.borderWidth
      }
      // icon={icon}
      multiline={multiline ?? defaultWarningConfig?.multiline ?? defaultGlobalConfig?.multiline}
    />
  )
}
