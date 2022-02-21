import type { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import type {
  AnimatedStyleProp,
  SharedValue,
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated'

type AnimatedStylesType = AnimatedStyleProp<ViewStyle | TextStyle | ImageStyle>

type TransitionStylesConfigFunction = (progress: SharedValue<number>) => AnimatedStylesType

type SpringAnimationConfig = {
  type: 'spring'
  config: WithSpringConfig
}

type TimingAnimationConfig = {
  type: 'timing'
  config: WithTimingConfig
}

export type AnimationTypeConfig = SpringAnimationConfig | TimingAnimationConfig

export type CustomAnimationConfig = {
  transitionInStyles: TransitionStylesConfigFunction
  transitionOutStyles?: TransitionStylesConfigFunction
  animationConfigIn: AnimationTypeConfig
  animationConfigOut?: AnimationTypeConfig
}

export enum AnimationRange {
  START = 1,
  END = 0,
}
