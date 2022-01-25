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

The source of these styles comes from the **animation config** that is generated wih `generateAnimationConfig` function and is used internally by the library to generate the animations. You can also use it yourself to cretae whatever transition you desiere.

Summarizing, there are *4 properties* that can controll the transtion. They all are handled by `generateAnimationConfig` and go as follows:

- `animationConfigIn` - spring / timing configuration for trannsition in. **REQUIRED**
- `animationConfigOut` - spring / timing configuration for transition out. **Not required**, fallbacks to `animationConfigIn` when not provided
- `transitionInStyles` - a _worklet_ function that takes in the animated **progress** value. It has to return the animated styles. For transitionIn
- `transitionOutStyles` - same as above but for transition out. Not required, fallbacks to ^

Return type of this function (`generateAnimationConfig`) is `CustomAnimationConfig` which you can then use when changing animation types in e.g. `createNotification` or `notify` call.

### Generating transition config with `generateAnimationConfig`

<!-- BELOW IS WIP -->

The `generateAnimationConfig` takes in a config object as a property
