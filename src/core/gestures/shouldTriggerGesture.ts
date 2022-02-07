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
        !isValueInRange(gesture.distance[1], config.activationDistances) ||
        !isValueInRange(gesture.velocity[1], config.activationVelocities)
      )
    case 'y':
      return (
        !isValueInRange(gesture.distance[0], config.activationDistances) ||
        !isValueInRange(gesture.velocity[0], config.activationVelocities)
      )
    case 'none':
    default:
      return false
  }
}
