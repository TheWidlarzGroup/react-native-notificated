---
sidebar_position: 2
title: Types
---

# 🪛 Types

Here are all the types referenced in the API section.

---

### `CustomAnimationConfig`

```tsx
animationConfigIn: {
    type: "timing" | "spring",
    config: WithSpringConfig | WithTimingConfig // -> Reanimated type declarations
}
```

```tsx
animationConfigOut?: {
    type: "timing" | "spring",
    config: WithSpringConfig | WithTimingConfig // -> Reanimated type declarations
}
```

```tsx
transitionInStyles: (progress: SharedValue<number>) => AnimatedStylesType // -> must be a worklet / Reanimated type declarations
```

```tsx
transitionOutStyles?: (progress: SharedValue<number>) => AnimatedStylesType // -> must be a worklet / Reanimated type declarations
```

---

### `CustomVariants`

```tsx
{
    key: {
        component: React.FC
    },
    [...]
}

```

---

### `GestureConfig`

```tsx
direction: 'y' | 'x' | 'full' | 'none'
```

---

### `StyleProps`

```tsx
titleSize: number // default 20
```

```tsx
titleColor: string
```

```tsx
descriptionSize: number // default 12
```

```tsx
descriptionColor: string
```

```tsx
bgColor: string
```

```tsx
borderType: 'border' | 'accent' | 'no-border' // default 'accent',
```

```tsx
borderRadius: number // default 25
```

```tsx
accentColor: string
```

```tsx
borderWidth: number // default 3
```

```tsx
multiline: number // default 5
```

```tsx
defaultIconType: 'color' | 'monochromatic' | 'no-icon' // default 'color'
```

```tsx
leftIconSource: ImageSourcePropType // -> React Native type declaration
```

```tsx
imageStyle: ImageStyle // -> React Native type declaration
```

---

### `NotificationConfigParams`

```tsx
config?: {
    duration?: number // default 3000
    notificationPosition: NotificationPosition // default 'top'
    animationConfig: CustomAnimationConfig
}
```

---

### `NotificationParams`

```tsx
params: {
    title?: string
    description?: string
    onPress?: () => void
    style?: StyleProps
    hideCloseButton?: boolean // default false
    customID?: string
}
```

**When used with a custom notification, there is a little difference in the 'title' and 'description'**

```tsx
// when calling custom component:
params: {
    customTitle?: string
    customDescription?: string
    [...]
    // rest is the same
}
```

---

### `NotificationPosition`

```tsx
;'top' | 'center' | 'top'
```

---

### `ModalNotificationProvider`

```tsx
ModalNotificationProvider: React.FC<{ notificationTopPosition?: number }>
```

---
