---
sidebar_position: 2
---

# ✏️ Order of overwriting settings

<br/>

In the React Native Notifications library, we can pass some settings on different levels. <br/>
When we go deeper and the range of the settings is narrower, the importance of the setting is higher. <br/>
For example, we can set the `titleColor` of the notification in the: <br/>

- global range (for all notifications)
- notification type range (for example for all errors)
- instance range (for the single notification)

Instance range overwrites notification type range and global range. Notification type range overwrites global range.<br/>

Let's consider the case where we set all possible options for single `success` notification on all depth levels: <br/>
(all the props for other notifications are the same)<br/>

```jsx
import React from 'react'
import { SafeAreaView } from 'react-native'
import { createNotifications, SlideInLeftSlideOutRight } from 'react-native-notificated'
import { styles } from './styles'
import { SuccessButton } from '../components/basicExamples/SuccessButton'

const { useNotifications, NotificationsProvider } = createNotifications({
  isNotch: true,
  duration: 3000,
  notificationPosition: 'top',
  animationConfig: SlideInLeftSlideOutRight,
  defaultStylesSettings: {
    darkMode: false,
    globalConfig: {
      titleSize: 20,
      titleColor: '#4B0082',
      descriptionSize: 12,
      descriptionColor: '#4B0082',
      bgColor: '#FFFFF0',
      borderType: 'accent',
      borderRadius: 25,
      accentColor: '#B0E0E6',
      borderWidth: 3,
      multiline: 5,
      defaultIconType: 'color',
      leftIconSource: require('../../assets/custom-icon.png'),
    },
    successConfig: {
      titleSize: 16,
      titleColor: '#4C0',
      descriptionSize: 11,
      descriptionColor: '#4C0',
      bgColor: '#FFFFF0',
      borderType: 'accent',
      borderRadius: 25,
      accentColor: '#B0E0E6',
      borderWidth: 3,
      multiline: 5,
      defaultIconType: 'color',
      leftIconSource: require('../../assets/custom-icon.png'),
    },
  },
})

export const Example = () => {
  const { notify } = useNotifications()

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />
      <SuccessButton
        onPress={() =>
          notify('success', {
            params: {
              description: 'This is where the toast text goes',
              title: 'Success',
              style: {
                titleSize: 24,
                titleColor: '#4B0082',
                descriptionSize: 20,
                descriptionColor: '#4B0082',
                bgColor: '#FFFFF0',
                borderType: 'border',
                borderRadius: 15,
                accentColor: '#B0E0E6',
                borderWidth: 1,
                multiline: 3,
                defaultIconType: 'monochromatic',
                leftIconSource: require('../../assets/custom-icon.png'),
              },
            },
            config: {
              notificationPosition: 'center',
              animationConfig: SlideInLeftSlideOutRight,
              duration: 100,
            },
          })
        }
      />
    </SafeAreaView>
  )
}
```

We can divide them as above for the three depth levels. Let's take a look at what properties can we pass at different levels:

## Global range (for all notifications):

```jsx
const { useNotifications, NotificationsProvider } = createNotifications({
  isNotch: true,
  duration: 30,
  notificationPosition: 'top',
  animationConfig: SlideInLeftSlideOutRight,
  defaultStylesSettings: {
    darkMode: false,
    globalConfig: {
      titleSize: 20,
      titleColor: '#4B0082',
      descriptionSize: 12,
      descriptionColor: '#4B0082',
      bgColor: '#FFFFF0',
      borderType: 'accent',
      borderRadius: 25,
      accentColor: '#B0E0E6',
      borderWidth: 3,
      multiline: 5,
      defaultIconType: 'color',
      leftIconSource: require('../../assets/custom-icon.png'),
    },
  },
})
```

All those properties:

- isNotch
- duration
- notificationPosition
- animationConfig

(defaultStylesSettings)

- darkMode
- globalConfig (with all the styles properties)

Can be set up for all notifications in the app. Some of them can be set up only here:

- isNotch
- darkMode

The rest can be overwritten at lower levels - notification type range (for example, for all errors) and instance range (for the single notification).

## Notification type range (for example for all success notifications):

```jsx
const { useNotifications, NotificationsProvider } = createNotifications({
  defaultStylesSettings: {
    successConfig: {
      titleSize: 16,
      titleColor: '#4C0',
      descriptionSize: 11,
      descriptionColor: '#4C0',
      bgColor: '#FFFFF0',
      borderType: 'accent',
      borderRadius: 25,
      accentColor: '#B0E0E6',
      borderWidth: 3,
      multiline: 5,
      defaultIconType: 'color',
      leftIconSource: require('../../assets/custom-icon.png'),
    },
    errorConfig: {},
    warningConfig: {},
    infoConfig: {},
  },
})
```

On the second level we can set only style properties for the different notification types:

(defaultStylesSettings)

- successConfig
- errorConfig
- warningConfig
- infoConfig

Properties set in these `configs` will affect all notifications of a given type. All of them have the same properties inside.<br/>
This level overwrites only style properties previously set at the global range. You cannot overwrite here other global properties. <br/>
Please notice that, if you set `globalConfig` styles (for all notifications), and then you set `successConfig`, then all `success` type notifications will take style config from the `successConfig`, but other notification types will take it from the `globalConfig`(unless you set their notification type style config for them).<br/>
As you can see Notification types have a smaller range than global, but they are more important overall.

## Instance range (for the single notification):

```jsx
<SuccessButton
  onPress={() =>
    notify('success', {
      params: {
        description: 'This is where the toast text goes',
        title: 'Success',
        style: {
          titleSize: 24,
          titleColor: '#4B0082',
          descriptionSize: 20,
          descriptionColor: '#4B0082',
          bgColor: '#FFFFF0',
          borderType: 'border',
          borderRadius: 15,
          accentColor: '#B0E0E6',
          borderWidth: 1,
          multiline: 3,
          defaultIconType: 'monochromatic',
          leftIconSource: require('../../assets/custom-icon.png'),
        },
      },
      config: {
        notificationPosition: 'center',
        animationConfig: SlideInLeftSlideOutRight,
        duration: 100,
      },
    })
  }
/>
```

All those properties:

(params)

- description
- title
- style

(config)

- notificationPosition
- animationConfig
- duration

Can be set up for one single notification when we initiate it. Some of them can be set only here:

- description
- title

What makes sense, because every notification should have its reason. <br/>
If we set some property here, it has the highest level of importance (overwrites the same property in the Global range and Notification type range), but only for this single notification.

## Conclusion

**In other words, if the President says something, it affects all the people in the country.**

But seriously, we can listen to him, but the president of our town can easily change his opinion and then his words will probably be more valuable for us.

**If the president of our city says something, that will affect all the people in the city (smaller range, stronger attention).**

But then again, if our mother challenges the President’s opinion, then the latter become irrelevant :)

**Truth be told, your mother probably has an impact on nobody else but yourself, but she definitely attracts your greatest attention! **.
