---
sidebar_position: 2
---

# 💫 Custom transitions

### 👩🏽‍How the animations work under the hood

Our library is dependent on the `react-native-reanimated` (v2) with which we animate the wrapper around the notification components.

To thoroughly understand how animations work, you can also take a look in to the documentation for aforementioned [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

Our animation system is designed in such a way, that is recognizes two kinds of transitions:

1. **transition in**
2. **transition out**

and is based on one animated value, that represents these transitions and animates from `0` to `1`.

Its range should be self-explanatory, `0` represents the beginning of the **transition in** animation, whereas `1` stands for the starting point for **transition out** kind of animation.

When notification is about to show up, the value is animated from `0` to `1`. When the notification is about to dissapear, it goes from `1` to `0`.

Every time a notification is about to be shown, the library renders the UI part wrapped with an `<Animated.View />` and applies **animated styles** to it so it knows how it should animate.

The source of these styles comes from the **animation config** that is generated with `AnimationBuilder` class or `generateAnimationConfig` function and is used internally by the library to generate the animations. You can also use it yourself to create whatever transition you desiere.

Summarizing, there are _4 properties_ that can controll the transtion. They all are handled by `AnimationBuilder` or `generateAnimationConfig` and go as follows:

- `animationConfigIn` - spring / timing configuration for trannsition in. **REQUIRED**
- `animationConfigOut` - spring / timing configuration for transition out. **Not required**, fallbacks to `animationConfigIn` when not provided
- `transitionInStyles` - a _worklet_ function that takes in the animated **progress** value. It has to return the animated styles. For transitionIn
- `transitionOutStyles` - same as above but for transition out. Not required, fallbacks to ^

Return type of this function (`generateAnimationConfig`) is `CustomAnimationConfig` which you can then use when changing animation types in e.g. `createNotification` or `notify` call.

### Generating transition config with `AnimationBuilder`

The `AnimationBuilder` takes in a config object as a property with which you can define the animation.

Below code snippets should give an idea how it works:

**Example 1**

```typescript
export const MoveDown = new AnimationBuilder({
  animationConfigIn: {
    type: 'timing',
    config: {
      duration: 400,
    },
  },
  transitionInStyles: (progress) => {
    'worklet'
    const translateY = interpolate(progress.value, [0, 1], [-100, 0])
    return {
      opacity: progress.value,
      transform: [{ translateY }],
    }
  },
  transitionOutStyles: (progress) => {
    'worklet'
    const translateY = interpolate(progress.value, [0, 1], [100, 0])
    return {
      opacity: progress.value,
      transform: [{ translateY }],
    }
  },
})
```

**Example 2**

```typescript
export const RotateIn = generateAnimationConfig({
  animationConfigIn: {
    type: 'timing',
    config: {
      duration: 700,
      easing: Easing.out(Easing.exp),
    },
  },
  transitionInStyles: (progress) => {
    'worklet'

    const rotate = interpolate(progress.value, [0, 1], [-360, 0])

    return {
      transform: [{ rotate: `${rotate}deg` }, { scale: progress.value }],
      opacity: progress.value,
    }
  },
})
```

**Example 3**

```typescript
export const MoveDownRotateIn = MoveDown.add(RotateIn)
```

### Generating transition config with `generateAnimationConfig`

:::caution

generateAnimation config is `deprecated`. Please use Animation builder which allows your animations to be more customizable.

:::

The `generateAnimationConfig` takes in a config object as a property with which you can define the animation.

Below code snippets should give an idea how it works:

**Example 1**

```typescript
export const Example1 = generateAnimationConfig({
  animationConfigIn: {
    type: 'timing',
    config: {
      duration: 400,
      easing: Easing.inOut(Easing.sin),
    },
  },
  transitionInStyles: (progress) => {
    'worklet'

    const scale = interpolate(progress.value, [0, 1], [0.8, 1])
    const translateY = interpolate(progress.value, [0, 1], [-100, 0])

    return {
      opacity: progress.value,
      transform: [{ scale }, { translateY }],
    }
  },
})
```

**Example 2**

```typescript
export const Example2 = generateAnimationConfig({
  animationConfigIn: {
    type: 'timing',
    config: {
      duration: 300,
    },
  },
  animationConfigOut: {
    type: 'spring',
    config: {
      damping: 4,
      mass: 0.8,
    },
  },
  transitionInStyles: (progress) => {
    'worklet'

    const scale = interpolate(progress.value, [0, 1], [0.8, 1])
    const translateY = interpolate(progress.value, [0, 1], [-100, 0])

    return {
      opacity: progress.value,
      transform: [{ scale }, { translateY }],
    }
  },
  transitionOutStyles: (progress) => {
    'worklet'

    const scale = interpolate(progress.value, [0, 1], [0.8, 1])
    const translateY = interpolate(progress.value, [0, 1], [100, 0])

    return {
      opacity: progress.value,
      transform: [{ scale }, { translateY }],
    }
  },
})
```

As you can see in the above examples, you have a full control over styles and animation configs for both kind of transitions - **in** and **out** ones.

### `animationConfigIn` and `animationConfigOut`

The type of `animationConfigIn` and `animationConfigOut`:

```typescript
{
  type: "timing" | "spring",
  config: WithSpringConfig | WithTimingConfig // -> Reanimated type declarations
}
```

### `transitionInStyles` and `transitionOutStyles`

The type of `transitionInStyles` and `transitionOutStyles` is the
following function (must be a `worklet`):

```typescript
type TransistionStylesConfigFunction = (progress: SharedValue<number>) => AnimatedStylesType
```
