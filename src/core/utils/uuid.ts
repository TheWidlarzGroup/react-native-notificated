// Thanks to https://stackoverflow.com/a/13403498

// TODO: Narrow down notificationType and UUID types

export type UUID = string

export function generateNotificationId(
  notificationType: string
): `${typeof notificationType}-${UUID}` {
  return `${notificationType}-${
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }`
}
