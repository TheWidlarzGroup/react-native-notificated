// Thanks to https://stackoverflow.com/a/13403498

export function uuid(prefix?: string) {
  return (
    (prefix ? `${prefix}-` : '') +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}
