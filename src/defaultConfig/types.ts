import type { NotificationPosition } from '../types/config'
import type { ImageSourcePropType, ImageStyle } from 'react-native'
import type { Variant } from '../types'
import type { SuccessNotification } from './components/success'
import type { ErrorNotification } from './components/error'
import type { WarningNotification } from './components/warning'
import type { InfoNotification } from './components/info'

export type DefaultVariants = {
  success: Variant<typeof SuccessNotification>
  error: Variant<typeof ErrorNotification>
  warning: Variant<typeof WarningNotification>
  info: Variant<typeof InfoNotification>
}

export type DefaultKeys = keyof DefaultVariants

export type IconVisualStyle = 'color' | 'monochromatic' | 'no-icon'
export type Theme = 'regular' | 'dark'
export type BorderType = 'border' | 'accent' | 'no-border'

export type IconsLinksTypes = {
  [key in DefaultKeys]: {
    color: ImageSourcePropType
    white: ImageSourcePropType
    black: ImageSourcePropType
  }
}

export type NotificationOwnProps = {
  hideCloseButton?: boolean
  title: string
  description?: string
  onPress?: () => void
}

export type NotificationStyleConfig = Partial<{
  notificationPosition?: NotificationPosition
  titleSize: number
  titleColor: string
  descriptionSize: number
  descriptionColor: string
  bgColor: string
  borderRadius: number
  accentColor: string
  borderWidth: number
  multiline: number
  defaultIconType: IconVisualStyle
  leftIconSource: ImageSourcePropType | JSX.Element
  borderType: BorderType
  imageStyle: ImageStyle
}>

export type StyleProps = { style?: Partial<NotificationStyleConfig> }
export type NotificationProps = NotificationOwnProps & StyleProps
export type MergedNotificationStyleConfig = NotificationStyleConfig & { theme: Theme }

export type DefaultStylesConfigs = {
  [key in `${DefaultKeys}Config`]?: Partial<NotificationStyleConfig>
}

export type DefaultLayoutConfig = {
  defaultStylesSettings?: {
    darkMode?: boolean
    globalConfig?: Partial<NotificationStyleConfig>
  } & DefaultStylesConfigs
}
