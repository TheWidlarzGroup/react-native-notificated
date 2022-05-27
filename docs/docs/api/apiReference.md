---
sidebar_position: 1
title: API
---

# ⚙️ API Reference
<br/>

Below you will find a short description of APIs provided by this library.<br/>
All are sorted alphabetically. Check on the right side and find an interesting API on the list.
***
### `animationConfig`

Parameter used to configure animation. Can be set up for the entire app or selectively for a particular notification. <br/>
Below is the global configuration:

```tsx
import { createNotifications, RotateInRotateOut } from 'react-native-notification'

const { NotificationsProvider } = createNotifications({
    animationConfig: RotateInRotateOut
})
```

And can be overwrite in local scope, when calling notification:

```tsx
import { SlideInLeftSlideOutRight } from 'react-native-notification'

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
We've prepared for you a couple of ready-to-use animations (just import them from the library):

- `RotateZIn`
- `ZoomInDownZoomOutUp`
- `ZoomInDownZoomOutDown`
- `RotateInRotateOut`
- `SlideInLeftSlideOutRight`

***
### `createNotifications()`

API is used to initialize the library in the project.

```tsx
import { createNotifications } from 'react-native-notification'

const { NotificationsProvider } = createNotifications()
```
The `createNotifications()` invoked without any configuration, as in the above example, is fairly enough to use the library on its basic level.<br/>
Here is an example of all available parameters, that can be adjusted in `createNotifications()`:

```tsx
const { NotificationsProvider } = createNotifications({
  duration: number // -> default 3000
  notificationPosition: NotificationPosition
  animationConfig: CustomAnimationConfig
  gestureConfig: GestureConfig
  isNotch?: boolean // -> by default uses react-native-device-info
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
Check on [`StyleProps`](http://localhost:3000/react-native-notificated/docs/api/types#styleprops)

The `defaultStylesSettings` provides styles for all default notifications. `globalConfig` is on the top of the hierarchy, and distributes styles for all types of build-in notifications: success, error, warning, and info. For example `successConfig` (if provided) will overwrite `globalConfig` styles only for notifications of type 'success'. `successConfig` styles can be overwritten on the lowest level when calling notification 'success' using a `notify()`. Check on [`Order of settings overwriting`](https://thewidlarzgroup.github.io/react-native-notificated/docs/comprehensive-configuration/order-of-settings-overwriting) for more details.

***
### `generateAnimationConfig()`

This method allows to set up custom animations. <br/>

```tsx
generateAnimationConfig(config: CustomAnimationConfig)
```
Check on [`CustomAnimationConfig`](http://localhost:3000/react-native-notificated/docs/api/types#customanimationconfig)

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
***
### `modify()`

Method imported from hook `useNotifications()` as well as `useNotificationsController()`.<br/>
This method is very similar to notify. <br/>
The main difference is that you have the opportunity to change existing notifications.<br/>

```tsx
modify(id: string, setup: { params: NotificationParams; config?: NotificationConfigParams }): void
```

Jump to [`NotificationParams`](http://localhost:3000/react-native-notificated/docs/api/types#notificationparams) and [`NotificationConfigParams`](http://localhost:3000/react-native-notificated/docs/api/types#notificationconfigparams)

Sample code below shows how the method should be implemented:

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
***
### `NotificationsProvider`

This API is a provider that can be used as follows:

```tsx
return (
  <>
    <App />
    <NotificationsProvider />
  </>
)
```
***
### `notify()`

This method is responsible for launching notification (default or custom, if implemented).<br/>
Is imported from hook `useNotifications()`.

```tsx
notify(notificationType: string, setup: { params: NotificationParams; config?: NotificationConfigParams }): string
```
Jump to [`NotificationParams`](http://localhost:3000/react-native-notificated/docs/api/types#notificationparams) and [`NotificationConfigParams`](http://localhost:3000/react-native-notificated/docs/api/types#notificationconfigparams)

Sample code below shows how should be implemented:

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
The `notify()` returns id as a string. The example below shows how it can be achieved. <br/>
Id can be used later to manipulate that particular notification (remove or update content).

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

***
### `remove()`

This method removes notification. Is imported from hook `useNotifications()` as well as `useNotificationsController()`.<br/>

```tsx
remove(id: string): void
```

Sample code below shows how it works:

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
***
### `useNotifications()`

The hook is imported from 'react-native-notificated' and can be used only inside function component.

```tsx
import { useNotifications } from 'react-native-notificated'

const SomeFunctionComponent = () => {
    const { notify, modify, remove } = useNotifications()

    [...]
}
```
The `useNotifications()` provides three methods: notify, modify and remove - described separately.

***

### `useNotificationsController()`

The hook is imported from 'react-native-notificated' and can be used only inside function component.

```tsx
import { useNotificationsController } from 'react-native-notificated'

const SomeFunctionComponent = () => {
    const { modify, remove } = useNotifications()

    [...]
}
```
The `useNotificationsController()` provides two methods: modify and remove - described separately.

***





