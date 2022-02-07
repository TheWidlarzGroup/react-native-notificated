import type { Range } from '../types/misc'

/**
 * Checks if value is in range. To remove limit, set it to `undefined` | `Infinity(+/-)`.
 * @param v `Number` to check if is in range
 * @param d Range of `[min, max]` or single number d representing range with `[-d, d]`
 * @returns `true` if value is in range, `false` otherwise
 */
export const isValueInRange = (v: number, d?: Range | number) => {
  if (!Array.isArray(d)) {
    return Math.abs(v) < (d ?? Infinity)
  }
  const [min, max] = d
  return v > (min ?? -Infinity) && v < (max ?? Infinity)
}
