import type { AnimationTypeConfig, CustomAnimationConfig } from '../../types/animations'

class AnimationBuilder {
  animationConfigIn: AnimationTypeConfig
  animationConfigOut?: AnimationTypeConfig
  transitionInStyles: any
  transitionOutStyles: any

  stylesFuncsQueue: any[] = []

  constructor(config: CustomAnimationConfig) {
    this.animationConfigIn = config.animationConfigIn
    this.animationConfigOut = config.animationConfigOut
    this.transitionInStyles = config.transitionInStyles
    this.transitionOutStyles = config.transitionOutStyles
  }

  add(configToPipe: AnimationBuilder) {
    this.animationConfigIn = configToPipe.animationConfigIn
    this.animationConfigOut = configToPipe.animationConfigOut

    this.stylesFuncsQueue.push(configToPipe.transitionInStyles)
  }
}

export const MyNewConfig = new AnimationBuilder({
  animationConfigIn: { type: 'timing', config: {} },
  animationConfigOut: { type: 'timing', config: {} },
  transitionInStyles: (progress) => {
    return { opacity: progress.value }
  },
  transitionOutStyles: (progress) => {
    return { opacity: progress.value }
  },
})

export const generateAnimationConfig = (_config: CustomAnimationConfig) => {
  return MyNewConfig
}
