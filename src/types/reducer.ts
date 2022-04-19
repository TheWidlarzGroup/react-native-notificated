import type { EmitParam, ModifiedEmitParam } from '../core/services/types'

export type Actions = Add | Remove | Modify | Pop
export type Add = { type: 'add'; payload: EmitParam }
export type Remove = {
  type: 'remove'
  payload: EmitParam['id']
  onActiveNotification: (id: EmitParam['id']) => void
}
export type Modify = { type: 'modify'; payload: ModifiedEmitParam }
export type Pop = { type: 'pop'; payload?: EmitParam['id'] }
