import type { defaultVariants } from './defaultConfig'
import type { NotificationPosition } from '../types/config'
import type { ImageSourcePropType } from 'react-native'

export type DefaultVariants = typeof defaultVariants
export type NotificationVariants = keyof DefaultVariants
export type IconVisualStyle = 'color' | 'monochromatic' | 'no-icon'
export type Theme = 'regular' | 'dark'
export type BorderType = 'border' | 'accent' | 'no-border'

export type IconsLinksTypes = {
  success: {
    color: ImageSourcePropType
    white: ImageSourcePropType
    black: ImageSourcePropType
  }
  error: {
    color: ImageSourcePropType
    white: ImageSourcePropType
    black: ImageSourcePropType
  }
  warning: {
    color: ImageSourcePropType
    white: ImageSourcePropType
    black: ImageSourcePropType
  }
  info: {
    color: ImageSourcePropType
    white: ImageSourcePropType
    black: ImageSourcePropType
  }
}

export type NotificationOwnProps = {
  title: string
  description: string
  icon?: string
  onPress?: () => void | undefined
}

export type NotificationStyleConfig = Partial<{
  icon?: string
  theme: Theme
  titleSize: number
  titleColor: string
  descriptionSize: number
  descriptionColor: string
  bgColor: string
  borderRadius: number
  accentColor: any
  borderWidth: number
  multiline: number
  defaultIconType: IconVisualStyle
  leftIconSource: ImageSourcePropType
  borderType: BorderType
  notificationType: NotificationVariants
  notificationPosition: NotificationPosition
}>
