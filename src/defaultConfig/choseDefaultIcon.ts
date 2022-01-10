import type { ImageSourcePropType } from 'react-native'
import type {IconsLinksTypes, IconVisualStyle, NotificationVariants} from "./types";

export const chooseDefaultIcon = (
  notificationType: NotificationVariants,
  darkMode: boolean,
  defaultIconType?: IconVisualStyle
): ImageSourcePropType | undefined => {
  const iconLinks: IconsLinksTypes = {
    success: {
      color: require(`../assets/images/success-color.png`),
      white: require(`../assets/images/success-white.png`),
      black: require(`../assets/images/success-black.png`),
    },
    error: {
      color: require(`../assets/images/error-color.png`),
      white: require(`../assets/images/error-white.png`),
      black: require(`../assets/images/error-black.png`),
    },
    warning: {
      color: require(`../assets/images/warning-color.png`),
      white: require(`../assets/images/warning-white.png`),
      black: require(`../assets/images/warning-black.png`),
    },
    info: {
      color: require(`../assets/images/info-color.png`),
      white: require(`../assets/images/info-white.png`),
      black: require(`../assets/images/info-black.png`),
    },
  }

  const renderIcon = (type: NotificationVariants): ImageSourcePropType | undefined => {
    switch (defaultIconType) {
      case 'color':
        return iconLinks[type].color
      case 'monochromatic':
        return darkMode ? iconLinks[type].white : iconLinks[type].black
      case 'no-icon':
        return undefined
      default:
        return iconLinks[type].color
    }
  }

  switch (notificationType) {
    case 'success':
      return renderIcon('success')
    case 'error':
      return renderIcon('error')
    case 'warning':
      return renderIcon('warning')
    case 'info':
      return renderIcon('info')
  }
}
