import { Constants } from '../core/config'
import type { GestureConfig } from '../types/gestures'

export const AndroidGestureConfig: GestureConfig = {
  direction: 'x',
  activationDistances: Constants.width * 0.4,
  activationVelocities: 2000,
}

export const IosGestureConfig: GestureConfig = {
  direction: 'y',
  activationDistances: 50,
  activationVelocities: 300,
}

export const FrozenGestureConfig: GestureConfig = {
  direction: 'none',
}

export const FullGestureConfig: GestureConfig = {
  direction: 'full',
  x: {
    activationDistances: 100,
    activationVelocities: 2000,
  },
  y: {
    activationDistances: 100,
    activationVelocities: 1000,
  },
}
