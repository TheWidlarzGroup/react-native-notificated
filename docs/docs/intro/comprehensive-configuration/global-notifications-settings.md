---
sidebar_position: 1
---

# ⚙️ Global notifications settings

<br/>

The react-native-notificated library gives you a lot of possibilities to change the default configuration.

In the beginning, you can set the configuration for all the notifications used in the app.

Let's take a look at what exactly can we set globally:

| Name                  |            Type             |         Default          | Description                                                                                                                                                                                                                                                                                                                      |
| --------------------- | :-------------------------: | :----------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| duration              |           Number            |           3000           | Use this property to set how long the notifications should be displayed on the screen. Value expressed in milliseconds                                                                                                                                                                                                           |
| notificationPosition  | 'top' / 'center' / 'bottom' |          'top'           | Set where the notifications should appear on the screen. You can choose one of three default options: top / center / bottom. To read more about the notification position please go to the [NOTIFICATION POSITION](../default-variants-config/position) section.                                                                 |
| animationConfig       |           Object            | SlideInLeftSlideOutRight | Property responsible for the notification animation. You can set one of the animations prepared by us, or make your own config. To read more about the animation settings please go to the [ANIMATIONS SETTINGS](../animations/changing-transitions) section.                                                                    |
| isNotch               |           Boolean           |          false           | Property responsible for read if the device has notch. You can use one of the libraries (for example 'react-native-device-info') to read if the specific device has Notch and pass the value here.                                                                                                                               |
| defaultStylesSettings |           Object            |            -             | Object responsible for setting global styles for the notifications. You can also set here styles, for all the notifications of the specific type. For example for the error notifications. To read more about global style settings please go to the [GLOBAL STYLES SETTINGS](../default-variants-config/global-config) section. |

<br/>

Here we can see the global notifications settings in their basic form with default settings: <br/>

<br/>

```jsx
const { useNotifications, NotificationsProvider } = createNotifications({
  duration: 300,
  notificationPosition: 'top',
  animationConfig: SlideInLeftSlideOutRight,
  isNotch: undefined,
  defaultStylesSettings: {},
})
```

## Notch handling

If not defined by developers, the library automatically handles detecting whether a device has a notch or not. Please make sure that `NotificationsProvider` is used in the root of your app and is NOT wrapped with `SafeAreaView`, otherwise you may enocounter rendering additional space with notifications positioned on top of the screen. However, if you decide to initialize notification config within the `SafeAreaView`, explicitly set `isNotch: false` in the global settings.

You still have the possibility to handle detecting notch on your own, by using for example `react-native-device-info`.
