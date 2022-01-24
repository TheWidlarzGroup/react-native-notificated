---
sidebar_position: 1
---

# Default Variants

At the start, you receive from us default styling for all 4 types of notifications (`success` / `error` / `warning` / `info`). <br/>
If you just trigger the notification, like in the example below (we trigger the `error` here, but of course it can be any notification):
#
```jsx
import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { createNotifications } from 'react-native-notification'
import { styles } from './styles'

const { useNotifications, NotificationsProvider } = createNotifications()

export const GlobalConfigExamples = () => {
  const { notify } = useNotifications()

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsProvider />
      <Text
        onPress={() =>
          notify('error', {
            description: 'This is where the toast text goes. ',
            title: 'Error',
          })
        }>
        Emit error
      </Text>
    </SafeAreaView>
  )
}

```
#
You will get the basic styling with the `borderType` set for the `'border'` value, the `darkMode` set to `false`, and the `defaultIconType` for the `color` value. <br/>
(TO CHECK `borderType` AND OTHER STYLE PROPS GO TO THE [GLOBAL STYLES SETTINGS](./global-config.md) OR [SINGLE NOTIFICATION CONFIG](./props-config.md)).
Below you will find all the default combinations. You can get them just by changing 3 settings:

- `darkMode`
- `borderType`
- `defaultIconType`

| NotificationType  | `darkMode`         | `borderType`       | `defaultIconType`    | Visualisation
| ----------------- | ------------------ | ------------------ | -----------------    | -----------------
| Success           | `false`            | `'border'`         | `'color'`            | ![Border](../../assets/border.png)
| Success           | `false`            | `'accent'`         | `'color'`            | ![Border](../../assets/success-accent-color.png)
| Success           | `false`            | `'no-border'`      | `'color'`            | ![Border](../../assets/success-no-border-color.png)
| Success           | `false`            | `'no-border'`      | `'monochromatic'`    | ![Border](../../assets/success-no-border-monochromtic.png)
| Success           | `false`            | `'border'`         | `'no-icon'`          | ![Border](../../assets/success-border-no-icon.png)
| Success           | `true`             | `'border'`         | `'color'`            | ![Border](../../assets/success-darkMode-border-color.png)
| Success           | `true`             | `'accent'`         | `'color'`            | ![Border](../../assets/success-darkMode-accent-color.png)
| Success           | `true`             | `'no-border'`      | `'color'`            | ![Border](../../assets/success-darkMode-no-border-color.png)
| Success           | `true`             | `'no-border'`      | `'monochromatic'`    | ![Border](../../assets/success-darkMode-no-border-monochromatic.png)
| Success           | `true`             | `'border'`         | `'no-icon'`          | ![Border](../../assets/success-darkMode-border-no-icon.png)
|                   |                    |                    |                      |
| Error             | `false`            | `'border'`         | `'color'`            | ![Border](../../assets/border.png)
| Error             | `false`            | `'accent'`         | `'color'`            | ![Border](../../assets/border.png)
| Error             | `false`            | `'no-border'`      | `'color'`            | ![Border](../../assets/border.png)
| Error             | `false`            | `'border'`         | `'monochromatic'`    | ![Border](../../assets/border.png)
| Error             | `false`            | `'border'`         | `'no-icon'`          | ![Border](../../assets/border.png)
| Error             | `true`             | `'border'`         | `'color'`            | ![Border](../../assets/border.png)
| Error             | `true`             | `'accent'`         | `'color'`            | ![Border](../../assets/border.png)
| Error             | `true`             | `'no-border'`      | `'color'`            | ![Border](../../assets/border.png)
| Error             | `true`             | `'border'`         | `'monochromatic'`    | ![Border](../../assets/border.png)
| Error             | `true`             | `'border'`         | `'no-icon'`          | ![Border](../../assets/border.png)
|                   |                    |                    |                      |
| Warning           | `false`            | `'border'`         | `'color'`            | ![Border](../../assets/border.png)
| Warning           | `false`            | `'accent'`         | `'color'`            | ![Border](../../assets/border.png)
| Warning           | `false`            | `'no-border'`      | `'color'`            | ![Border](../../assets/border.png)
| Warning           | `false`            | `'border'`         | `'monochromatic'`    | ![Border](../../assets/border.png)
| Warning           | `false`            | `'border'`         | `'no-icon'`          | ![Border](../../assets/border.png)
| Warning           | `true`             | `'border'`         | `'color'`            | ![Border](../../assets/border.png)
| Warning           | `true`             | `'accent'`         | `'color'`            | ![Border](../../assets/border.png)
| Warning           | `true`             | `'no-border'`      | `'color'`            | ![Border](../../assets/border.png)
| Warning           | `true`             | `'border'`         | `'monochromatic'`    | ![Border](../../assets/border.png)
| Warning           | `true`             | `'border'`         | `'no-icon'`          | ![Border](../../assets/border.png)
|                   |                    |                    |                      |
| Info              | `false`            | `'border'`         | `'color'`            | ![Border](../../assets/border.png)
| Info              | `false`            | `'accent'`         | `'color'`            | ![Border](../../assets/border.png)
| Info              | `false`            | `'no-border'`      | `'color'`            | ![Border](../../assets/border.png)
| Info              | `false`            | `'border'`         | `'monochromatic'`    | ![Border](../../assets/border.png)
| Info              | `false`            | `'border'`         | `'no-icon'`          | ![Border](../../assets/border.png)
| Info              | `true`             | `'border'`         | `'color'`            | ![Border](../../assets/border.png)
| Info              | `true`             | `'accent'`         | `'color'`            | ![Border](../../assets/border.png)
| Info              | `true`             | `'no-border'`      | `'color'`            | ![Border](../../assets/border.png)
| Info              | `true`             | `'border'`         | `'monochromatic'`    | ![Border](../../assets/border.png)
| Info              | `true`             | `'border'`         | `'no-icon'`          | ![Border](../../assets/border.png)
