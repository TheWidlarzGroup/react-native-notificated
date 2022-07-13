import { Easing, interpolate, SharedValue } from 'react-native-reanimated'
import type {
  AnimationTypeConfig,
  CustomAnimationConfig,
  TransitionStylesConfigFunction,
} from '../../types/animations'

// TODO:
// [ ] cleanup
// ------- 1. remove `..XTest` animation configs
// ------- 2. rewrite existing animation configs with new api
// ------- 3. exports from lib
// [ ] add tests for AnimationBuilder
// [ ] TS in useAnimationAPI
// [ ] docs - 1. describe new API, 2. make sure to note that old `generateAnimationConfig` is still working

export class AnimationBuilder {
  animationConfigIn: AnimationTypeConfig
  animationConfigOut?: AnimationTypeConfig

  transitionInStylesQueue: TransitionStylesConfigFunction[] = [] // stores stacked styles functions after merging animation configs
  transitionOutStylesQueue: TransitionStylesConfigFunction[] = [] // stores stacked styles functions after merging animation configs

  transitionInStyles: TransitionStylesConfigFunction // helper field for handling style funcs merging
  transitionOutStyles?: TransitionStylesConfigFunction // helper field for handling style funcs merging

  constructor(config: CustomAnimationConfig) {
    this.transitionInStylesQueue = []
    this.transitionOutStylesQueue = []
    this.animationConfigIn = config.animationConfigIn
    this.animationConfigOut = config.animationConfigOut

    this.transitionInStyles = config.transitionInStyles

    if (config.transitionOutStyles) {
      this.transitionOutStyles = config.transitionOutStyles
    }

    this.transitionInStylesQueue.push(config.transitionInStyles)
    config.transitionOutStyles && this.transitionOutStylesQueue?.push(config.transitionOutStyles)
    
  }

  add(configToPipe: AnimationBuilder) {
    this.animationConfigIn = configToPipe.animationConfigIn

    if (configToPipe.animationConfigOut) {
      this.animationConfigOut = configToPipe.animationConfigOut
    }

    this.transitionInStyles = configToPipe.transitionInStyles

    if (configToPipe.transitionOutStyles) {
      this.transitionOutStyles = configToPipe.transitionOutStyles
    }

    this.transitionInStylesQueue.push(configToPipe.transitionInStyles)

    configToPipe.transitionOutStyles &&
      this.transitionOutStylesQueue?.push(configToPipe.transitionOutStyles)

    return this
  }
}
const ZoomInAnimation : CustomAnimationConfig = {
  animationConfigIn: {
    type: 'timing',
    config: {
      duration: 1000,
    },
  },
  transitionInStyles: (progress: SharedValue<number>) => {
    'worklet'
    const scale = interpolate(progress.value, [0, 1], [0.8, 1])
    return {
      transform: [{ scale }],
    }
  },
}

export const MoveDownAnimation :CustomAnimationConfig = {
    animationConfigIn: {
      type: 'timing',
      config: {
        duration: 400
      },
    },
    transitionInStyles: (progress) => {
      'worklet'
      const translateY = interpolate(progress.value, [0, 1], [-100, 0])
      return {
        opacity: progress.value,
        transform: [ { translateY }],
      }
    },
    transitionOutStyles: (progress) => {
      'worklet'
      const translateY = interpolate(progress.value, [0, 1], [100, 0])
      return {
        opacity: progress.value,
        transform: [ { translateY }],
      }
    }
}

const MoveUpAnimation :CustomAnimationConfig = {
    animationConfigIn: {
      type: 'timing',
      config: {
        duration: 400
      },
    },
    transitionInStyles: (progress) => {
      'worklet'
      const translateY = interpolate(progress.value, [0, 1], [-100, 0])
      return {
        opacity: progress.value,
        transform: [ { translateY }],
      }
    },
    transitionOutStyles: (progress) => {
      'worklet'
      const translateY = interpolate(progress.value, [0, 1], [-100, 0])
      return {
        transform: [ { translateY }],
      }
    }
}

const RotateZInAnimation : CustomAnimationConfig = {
  animationConfigIn: {
    type: 'timing',
    config: {
      duration: 2000,
      easing: Easing.out(Easing.exp),
    },
  },
  transitionInStyles: (progress) => {
    'worklet'

    const rotateZ = interpolate(progress.value, [0, 1], [-140, 0])
    const rotateX = interpolate(progress.value, [0, 1], [200, 20])
    const rotateY = interpolate(progress.value, [0, 1], [-40, 5])

    return {
      transform: [
        { rotateZ: `${rotateZ}deg` },
        { rotateX: `${rotateX}deg` },
        { rotateY: `${rotateY}deg` },
        { scale: progress.value },
        { perspective: 1500 },
      ],
      opacity: progress.value,
    }
  },
}

const SlideInLeftAnimation : CustomAnimationConfig = {
  animationConfigIn: {
    type: 'timing',
    config: {
      duration: 400,
      easing: Easing.inOut(Easing.sin),
    },
  },
  transitionInStyles: (progress) => {
    'worklet'

    const translateX = interpolate(progress.value, [0, 1], [-100, 0])

    return {
      // opacity: progress.value,
      transform: [{ translateX }],
    }
  },
}

const SlideInLeftSlideOutRightAnimation : CustomAnimationConfig = {
  animationConfigIn: {
    type: 'timing',
    config: {
      duration: 400,
      easing: Easing.inOut(Easing.sin),
    },
  },
  transitionInStyles: (progress) => {
    'worklet'

    const translateX = interpolate(progress.value, [0, 1], [-100, 0])

    return {
      opacity: progress.value,
      transform: [{ translateX }],
    }
  },
  transitionOutStyles: (progress) => {
    'worklet'

    const translateX = interpolate(progress.value, [0, 1], [100, 0])

    return {
      opacity: progress.value,
      transform: [{ translateX }],
    }
  },
}

const FadeInFadeOut : CustomAnimationConfig = {
  animationConfigIn: {
    type: 'timing',
    config: {
      duration: 500,
    },
  },
  transitionInStyles: (progress) => {
    'worklet'

    const translateX = 0

    return {
      opacity: progress.value,
      transform: [{ translateX }],
    }
  },
  transitionOutStyles: (progress) => {
    'worklet'

    const translateX = 0

    return {
      opacity: progress.value,
      transform: [{ translateX }],
    }
  },
}



export const MoveDown = new AnimationBuilder(MoveDownAnimation)
export const MoveUp = new AnimationBuilder(MoveUpAnimation)
export const ZoomIn = new AnimationBuilder(ZoomInAnimation)
export const SlideInLeft = new AnimationBuilder(SlideInLeftAnimation)
export const SlideInLeftSlideOutRight = new AnimationBuilder(SlideInLeftSlideOutRightAnimation)
export const RotateZIn = new AnimationBuilder(RotateZInAnimation)
export const FadeIn = new AnimationBuilder(FadeInFadeOut)
export const ZoomInDownZoomOutDown = new AnimationBuilder(ZoomInAnimation).add(MoveDown)
export const ZoomInDownZoomOutUp = new AnimationBuilder(ZoomIn).add(MoveUp)




export const generateAnimationConfig = (config: CustomAnimationConfig): CustomAnimationConfig => {
  return config
}
