import type { GestureConfig, GestureProps } from '../../types/gestures'
import { isValueInRange } from '../../utils/math'

export const shouldTriggerGesture = (config: GestureConfig, gesture: GestureProps) => {
  switch (config.direction) {
    case 'full': {
      return (
        !isValueInRange(gesture.distance[0], config.x.activationDistances) ||
        !isValueInRange(gesture.velocity[0], config.x.activationVelocities) ||
        !isValueInRange(gesture.distance[1], config.y.activationDistances) ||
        !isValueInRange(gesture.velocity[1], config.y.activationVelocities)
      )
    }
    case 'x':
      return (
        // fallback value if config gets only 'direction' param; values reflect FullGestureConfig.x in defualtGestureConfig
        !isValueInRange(gesture.distance[0], config.activationDistances ?? 100) ||
        !isValueInRange(gesture.velocity[0], config.activationVelocities ?? 2000)
      )
    case 'y':
      return (
        // fallback value if config gets only 'direction' param; values reflect FullGestureConfig.y in defualtGestureConfig
        !isValueInRange(gesture.distance[1], config.activationDistances ?? 100) ||
        !isValueInRange(gesture.velocity[1], config.activationVelocities ?? 1000)
      )
    case 'none':
    default:
      return false
  }
}
