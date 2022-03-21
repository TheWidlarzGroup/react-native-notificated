---
sidebar_position: 1
---

# 🪄 Transitions

### 🎛 Changing transitions

You can change the way in which the notification boxes are animated by simply redeclaring the transition type in the **config** or **payload** objects.

Depending on whether you want to change the default transitions for the whole app or only change it for a certain notification, you can either:

1. Change the animation **type** in the config object of `createNotification`:

```typescript
import { createNotifications, RotateInRotateOut } from 'react-native-notification'

const { useNotifications } = createNotifications({
  animationConfig: RotateInRotateOut,
})
```

2. Use `config.animationConfig` property in the **payload** of a `notify` function:

```typescript
import { createNotifications, SlideInLeftSlideOutRight } from 'react-native-notification'

const { useNotifications } = createNotifications()

const { notify } = useNotifications()

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

3. Change the animation **type** in the config object of a certain `variant` in the config object of `createNotification`:

> _Not yet implemented 😔_

###### ‼️ When changing the transition **type**, you can choose from a variety of pre-made configs that our team prepared for you!

### 🔦 Config priority

For each subsequent notification, the library looks for an animation config in the following order:

1. First, it looks for a config defined in `notify` payload
2. Next, it looks for a global config from `createNotification`
3. At last, when no config is found, it uses the default behaviour, which is platform dependend

### 📦 Pre-made configs:

- `RotateZIn`
- `ZoomInDownZoomOutUp`
- `ZoomInDownZoomOutDown`
- `RotateInRotateOut`
- `SlideInLeftSlideOutRight`

### 🔧 Custom transitions

If you feel like you need a custom transition, fear not, we have got you covered! Go to the next chapter to see how to create your own transition! 💥
