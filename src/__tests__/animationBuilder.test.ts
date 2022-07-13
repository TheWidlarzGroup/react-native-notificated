import { AnimationBuilder, FadeIn, MoveDown, MoveDownAnimation } from "src/core/utils/generateAnimationConfig"


describe('props merger tests', function () {

    it('should make an instance from class', () => {
        const MoveDown = new AnimationBuilder(MoveDownAnimation)

        expect(MoveDown).toMatchObject(MoveDownAnimation)
    })

    it('should merge styles properly with add method', () => {
        const MoveDownFadeIn = FadeIn.add(MoveDown).transitionInStyles({value: 1})
        expect(MoveDownFadeIn).toMatchObject( {"opacity": 1, "transform": [{"translateY": 0},{"translateX": 0}]} )
    })  
})

