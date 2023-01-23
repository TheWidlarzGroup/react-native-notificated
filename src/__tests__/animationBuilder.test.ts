import { mergeStylesFunctions } from 'src/core/hooks/useAnimationAPI'
import {
  AnimationBuilder,
  FadeInFadeOut,
  MoveDownAnimation,
  MoveUpAnimation,
  RotateZIn,
  SlideInLeftAnimation,
  CrazyAnimationConfig,
} from 'src/core/utils/generateAnimationConfig'

describe('props merger tests', function () {
  it('should make an instance from class', () => {
    const MoveDown = new AnimationBuilder(MoveDownAnimation)

    expect(MoveDown).toMatchObject(MoveDownAnimation)
  })

  it('should merge styles properly with add method', () => {
    const MoveDown = new AnimationBuilder(MoveDownAnimation)
    const MoveDownFadeInFadeOut = FadeInFadeOut.add(MoveDown).transitionInStylesQueue
    const styles = mergeStylesFunctions(MoveDownFadeInFadeOut, { value: 1 })

    expect(styles).toMatchObject({
      opacity: 1,
      transform: [{ translateY: 0 }, { translateX: 0 }, { translateX: 0 }, { translateY: 0 }],
    })
  })
  it('should merge animationConfigIn properly with add method outstyles', () => {
    const SlideInLeft = new AnimationBuilder(SlideInLeftAnimation)
    const SlideInLeftCrazy = SlideInLeft.add(CrazyAnimationConfig).animationConfigIn

    const configIn = CrazyAnimationConfig.animationConfigIn

    expect(SlideInLeftCrazy).toMatchObject(configIn)
  })
  it('should merge styles properly with add method outstyles', () => {
    const MoveUp = new AnimationBuilder(MoveUpAnimation)
    const MoveUpRotateZIn = RotateZIn.add(MoveUp).transitionOutStylesQueue
    const styles = mergeStylesFunctions(MoveUpRotateZIn, { value: 1 })

    expect(styles).toMatchObject({
      opacity: 1,
      transform: [{ translateY: 0 }, { translateX: 0 }, { translateY: 0 }],
    })
  })
})
