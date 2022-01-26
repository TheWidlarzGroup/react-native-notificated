---
sidebar_position: 2
---

# 🪄 Notification position

### 🎛 Changing position

You can change the position of the notifications displayed on the screen. There are three default options to pick: `top`, `center`, `bottom`.

Depending on whether you want to change notification position for the whole app or only change it for a certain notification, you can either:

1. Change the animation **defaultNotificationPosition** in the config object of `createNotification`:

```typescript
import { createNotifications } from 'react-native-notification'
const { NotificationsProvider, useNotifications } = createNotifications({
  defaultNotificationPosition: 'center',
})
```

2. Use `notificationPosition` property in the **payload** of `notify` function:

```typescript
import { createNotifications } from 'react-native-notification'
const { useNotifications } = createNotifications()

const { notify } = useNotifications()
notify('success', {
  title: 'Success',
  description: 'This is where the toast text goes',
  notificationPosition: 'center',
})
```

3. Change the animation **type** in the config object of a certain `variant` in the config object of `createNotification`:

```typescript
import { createNotifications } from 'react-native-notification'
import { InfoNotification } from '../../src/defaultConfig/components/info'

const { NotificationsProvider, useNotifications } = createNotifications({
  variants: {
    infoCenter: {
      component: InfoNotification,
      config: {
        notificationPosition: 'center',
      },
    },
  },
})
```

### 🔦 Position config priority

For each subsequent notification, the library looks for a notification position in the following order:

1. First, it looks for a config defined in `notify` payload
2. Secondly, it checks for an animation config for a given `variant` which can be defined in `createNotification`
3. Next, it looks for a global config from `createNotification`
4. At last, when no config is found, it uses the default behaviour, which is `top`
