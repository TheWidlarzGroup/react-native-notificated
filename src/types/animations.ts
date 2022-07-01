import type { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import type {
  AnimatedStyleProp,
  SharedValue,
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated'

export type TransitionStylesConfigFunction = (
  progress: SharedValue<number>
) => AnimatedStyleProp<ViewStyle | TextStyle | ImageStyle>

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
