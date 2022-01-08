import type { NotificationVariants } from '../types'
import type { IconVisualStyle } from '../types'

export const chooseDefaultIcon = (
  notificationType: NotificationVariants,
  darkMode: boolean,
  defaultIconType?: IconVisualStyle
) => {
  switch (notificationType) {
    case 'success':
      switch (defaultIconType) {
        case 'color':
          return require('../assets/images/success-green.png')
        case 'monochromatic':
          return darkMode
            ? require('../assets/images/success-white.png')
            : require('../assets/images/success-black.png')
        case 'no-icon':
          return ''
        default:
          return require('../assets/images/success-green.png')
      }
    case 'error':
      switch (defaultIconType) {
        case 'color':
          return require('../assets/images/error-red.png')
        case 'monochromatic':
          return darkMode
            ? require('../assets/images/error-white.png')
            : require('../assets/images/error-black.png')
        case 'no-icon':
          return ''
        default:
          return require('../assets/images/error-red.png')
      }
    case 'warning':
      switch (defaultIconType) {
        case 'color':
          return require('../assets/images/warning-yellow.png')
        case 'monochromatic':
          return darkMode
            ? require('../assets/images/warning-white.png')
            : require('../assets/images/warning-black.png')
        case 'no-icon':
          return ''
        default:
          return require('../assets/images/warning-yellow.png')
      }
    case 'undo':
      switch (defaultIconType) {
        case 'color':
          return require('../assets/images/info-blue.png')
        case 'monochromatic':
          return darkMode
            ? require('../assets/images/info-white.png')
            : require('../assets/images/info-black.png')
        case 'no-icon':
          return ''
        default:
          return require('../assets/images/info-blue.png')
      }
  }
}
