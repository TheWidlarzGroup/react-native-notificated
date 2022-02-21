import { AnimationCallback, runOnJS } from 'react-native-reanimated'

export const withAnimationCallbackJSThread = (
  finishedAnimationCallback?: () => void,
  notFinishedAnimationCallback?: () => void
): AnimationCallback => {
  const fcb = () => finishedAnimationCallback?.()
  const nfcb = () => notFinishedAnimationCallback?.()

  return (finished) => {
    'worklet'

    if (finished) {
      runOnJS(fcb)()
    } else {
      runOnJS(nfcb)()
    }
  }
}
