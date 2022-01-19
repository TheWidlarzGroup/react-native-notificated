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

and one **animated value** which represents these transitions.

When notification shows up, the value is animated from `0` to `1`. When the notification is about to dissapear, it goes from `1` to `0`.

When there is a new notification in the notification queue, the library renders the component. 

It is wrapped with `Animated.View`s which are responsible for handling drag gestures and animations.

To ha ve a full controll over the transitions, you have to take care of two things:

1. Add appropriate **animatedStyles** for transitioning in and out
2. Declare configs for transition animation (whether it should be a `spring` or `timing` animation)

So to allow developers to easily control this, we exposed a `generateAnimationConfig` function with which you can easily declare your own custom animation.

Return type of this function is `CustomAnimationConfig` which you can then use when changing animation types in e.g. `createNotification` or `notify` call.

It takes in a config object, which takes controll over the animations.

Properties:

- `animationConfigIn` - spring / timing configuration for trannsition in. **REQUIRED**
- `animationConfigOut` - spring / timing configuration for transition out. **Not required**, fallbacks to `animationConfigIn` when not provided
- `transitionInStyles` - a *worklet* function that takes in the animated **progress** value. It has to return the animated styles. For transitionIn
- `transitionOutStyles` - same as above but for transition out. Not required, fallbacks to ^
