---
sidebar_position: 1
title: API
---

# ⚙️ API Reference

Below you will find a brief description of all the methods and properties that the library exposes.
All entries are sorted alphabetically.

---

### `animationConfig`

A parameter used to configure the animation. It can be set up for the entire app or selectively for a particular notification.
Below is the global configuration:

```tsx
import { createNotifications, RotateInRotateOut } from 'react-native-notificated'

const { NotificationsProvider } = createNotifications({
  animationConfig: RotateInRotateOut,
})
```

It can also be overwritten in the local scope when calling the notification:

```tsx
import { SlideInLeftSlideOutRight } from 'react-native-notificated'

[...]

notify('success', {
  params: {
    title: 'Success',
    description: 'This is where the toast text goes',
  },
  config: {
    animationConfig: SlideInLeftSlideOutRight,
  },
})
```

We've prepared a couple of ready-to-use animations for you (just import them from the library):

- `RotateZIn`
- `ZoomInDownZoomOutUp`
- `ZoomInDownZoomOutDown`
- `RotateInRotateOut`
- `SlideInLeftSlideOutRight`
- `ZoomInZoomOut`
- `MoveUp`
- `MoveDown`
- `SlideInLeft`
- `FadeInFadeOut`
- `VeryCustomTransition`
- `DiagonalSlideInLeftSlideOutRight`

---

### `createNotifications()`

API used to initialize the library in the project.

```tsx
import { createNotifications } from 'react-native-notificated'

const { NotificationsProvider } = createNotifications()
```

The `createNotifications()` invoked without any configuration, as in the above example, is fairly enough to use the library on its basic level.
Here is an example of all available parameters that can be adjusted in `createNotifications()`:

```tsx
const { NotificationsProvider } = createNotifications({
  duration: number // -> default 3000
  notificationPosition: NotificationPosition
  animationConfig: CustomAnimationConfig
  gestureConfig: GestureConfig
  isNotch?: boolean
  defaultStylesSettings: {
    darkMode: false,
    globalConfig: StyleProps
    successConfig: StyleProps
    errorConfig: StyleProps
    warningConfig: StyleProps
    infoConfig: StyleProps
  },
  variants: CustomVariants
})
```

Check out [`StyleProps`](https://thewidlarzgroup.github.io/react-native-notificated/docs/api/types#styleprops)

The `defaultStylesSettings` provides styles for all default notifications. `globalConfig` is on the top of the hierarchy and distributes styles for all types of build-in notifications: success, error, warning, and info. For example, `successConfig` (if provided) will overwrite `globalConfig` styles only for 'success' notifications. `successConfig` styles can be overwritten on the lowest level when calling a 'success' notification using `notify()`. Check out [`Order of settings overwriting`](https://thewidlarzgroup.github.io/react-native-notificated/docs/comprehensive-configuration/order-of-settings-overwriting) for more details.

---

### `generateAnimationConfig()`

This method allows to set up custom animations.

```tsx
generateAnimationConfig(config: CustomAnimationConfig)
```

Check out [`CustomAnimationConfig`](https://thewidlarzgroup.github.io/react-native-notificated/docs/api/types#customanimationconfig) and [`Custom transitions`](https://thewidlarzgroup.github.io/react-native-notificated/docs/animations/custom-transitions)

It takes four properties:

- `animationConfigIn` // -> REQUIRED
- `animationConfigOut`
- `transitionInStyles` // -> REQUIRED
- `transitionOutStyles`

```tsx
import { generateAnimationConfig } from 'react-native-notificated'

const myCustomAnimation = generateAnimationConfig({
  animationConfigIn: {
    type: "timing" | "spring",
    config: WithSpringConfig | WithTimingConfig // -> Reanimated type declarations
  },
  animationConfigOut: {
    type: "timing" | "spring",
    config: WithSpringConfig | WithTimingConfig // -> Reanimated type declarations
  },
  transitionInStyles: (progress: SharedValue<number>) => AnimatedStylesType // -> must be a worklet / Reanimated type declarations
  transitionOutStyles: (progress: SharedValue<number>) => AnimatedStylesType // -> must be a worklet / Reanimated type declarations
})
```

---

### `modify()`

Method returned from `useNotifications()` and `useNotificationsController()` hooks.
This method is very similar to notify.
The main difference is that you have the opportunity to change the existing notifications.

```tsx
modify(id: string, setup: { params: NotificationParams; config?: NotificationConfigParams }): void
```

Jump to [`NotificationParams`](https://thewidlarzgroup.github.io/react-native-notificated/docs/api/types#notificationparams) and [`NotificationConfigParams`](https://thewidlarzgroup.github.io/react-native-notificated/docs/api/types#notificationconfigparams)

The sample code below shows how the method should be implemented:

```tsx
import { useNotifications } from 'react-native-notificated'

const SomeFunctionComponent = () => {
    const [id, setId] = useState('')
    const { modify, notify } = useNotifications()

    return (
      <View>
        <Button
          title='launch notification'
          onPress={() =>
            setId(
              notify('success', {
                params: {
                  description: 'This is where the toast text goes',
                  title: 'Success',
                },
              }).id
            )
          }
        />
        <Button
          title='modify notification'
          onPress={() =>
            modify(id, {
              params: {
                title: 'Hello',
                description: 'Wow, that was easy',
              },
            })
          }
          >
      </View>
    )
}
```

---

### `NotificationsProvider`

A provider, which acts as the notifications root. Depending on where you mount it, this is where the notifications will get rendered in your component tree.

```tsx
return (
  <>
    <App />
    <NotificationsProvider />
  </>
)
```

---

### `notify()`

This method is responsible for launching notification (default or custom, if implemented).
Returned from the `useNotifications()` hook.

```tsx
notify(notificationType: string, setup: { params: NotificationParams; config?: NotificationConfigParams }): string
```

Jump to [`NotificationParams`](https://thewidlarzgroup.github.io/react-native-notificated/docs/api/types#notificationparams) and [`NotificationConfigParams`](https://thewidlarzgroup.github.io/react-native-notificated/docs/api/types#notificationconfigparams)

The sample code below shows how it should be implemented:

```tsx
import { useNotifications } from 'react-native-notificated'

const SomeFunctionComponent = () => {
  const { notify } = useNotifications()

  const notificationMetadata = notify('success', {
    params: {
      title: 'Hello',
      description: 'Wow, that was easy',
    },
  })
}
```

The `notify()` returns the notification id.
The ID can be later used to manipulate this particular notification (to remove or update content).

```tsx
[...]
    const notificationID = notify('success', {
      params: {
        title: 'Hello',
        description: 'Wow, that was easy',
      },
    }).id
[...]
```

---

### `remove()`

This method removes the notification. It is returned from the `useNotifications()` and `useNotificationsController()` hooks.

```tsx
remove(id: string): void
```

The sample code below shows how it works:

```tsx
import { useNotifications } from 'react-native-notificated'

const SomeFunctionComponent = () => {
    const [id, setId] = useState('')
    const { remove, notify } = useNotifications()

    return (
      <View>
        <Button
          title='launch notification'
          onPress={() =>
            setId(
              notify('success', {
                params: {
                  description: 'This is where the toast text goes',
                  title: 'Success',
                },
              }).id
            )
          }
        />
        <Button
          title='remove notification'
          onPress={() => remove(id)}
          >
      </View>
    )
}
```

---

### `useNotifications()`

The hook is imported from 'react-native-notificated' and can be used only inside the function component.

```tsx
import { useNotifications } from 'react-native-notificated'

const SomeFunctionComponent = () => {
    const { notify, modify, remove } = useNotifications()

    [...]
}
```

The `useNotifications()` provides three methods: notify, modify, and remove - described separately.

---

### `useNotificationsController()`

The hook is imported from 'react-native-notificated' and can be used only inside the function component.

```tsx
import { useNotificationsController } from 'react-native-notificated'

const SomeFunctionComponent = () => {
    const { modify, remove } = useNotificationsController()

    [...]
}
```

The `useNotificationsController()` provides two methods: modify and remove - described separately.

---
