import type { Range } from './misc'

export type DragDirection = 'y' | 'x' | 'full' | 'none'

export interface GestureProps {
  distance: Range
  velocity: Range
}

export interface GestureConfigProps {
  activationDistances?: Range | number
  activationVelocities?: Range | number
}

export interface NoneGestureConfig {
  direction: Extract<DragDirection, 'none'>
}

export interface OneDimensionalGestureConfig extends GestureConfigProps {
  direction: Extract<DragDirection, 'x' | 'y'>
}

export interface TwoDimensionalGestureConfig {
  direction: Extract<DragDirection, 'full'>
  x: GestureConfigProps
  y: GestureConfigProps
}

export type GestureConfig =
  | NoneGestureConfig
  | OneDimensionalGestureConfig
  | TwoDimensionalGestureConfig
