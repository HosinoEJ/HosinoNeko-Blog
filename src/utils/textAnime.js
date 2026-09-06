import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

export function useTextAnime(selector = '.textAnime') {
    let split = null
    let animation = null

    // 初始化 SplitText
    function setup() {
        animation?.revert()
        split?.revert()

        split = SplitText.create(selector, {
            type: 'chars,words,lines'
        })
    }

    // Characters
    function animateChars() {
        if (!split) return

        animation?.revert()

        animation = gsap.from(split.chars, {
            x: 150,
            opacity: 0,
            duration: 0.7,
            ease: 'power4',
            stagger: 0.04
        })
    }

    // Words
    function animateWords() {
        if (!split) return

        animation?.revert()

        animation = gsap.from(split.words, {
            y: -100,
            opacity: 0,
            rotation: 'random(-80, 80)',
            duration: 0.7,
            ease: 'back',
            stagger: 0.15
        })
    }

    // Lines
    function animateLines() {
        if (!split) return

        animation?.revert()

        animation = gsap.from(split.lines, {
            rotationX: -100,
            transformOrigin: '50% 50% -160px',
            opacity: 0,
            duration: 0.8,
            ease: 'power3',
            stagger: 0.25
        })
    }

    // 销毁
    function destroy() {
        animation?.revert()
        split?.revert()

        animation = null
        split = null
    }

    return {
        setup,
        animateChars,
        animateWords,
        animateLines,
        destroy
    }
}