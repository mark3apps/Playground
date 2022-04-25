import { MouseListener } from '../Classes/MouseListener/MouseListener'
import { UIElementProps, UIElement } from './UIElement'

export interface UISliderProps extends UIElementProps {
    hSlide: boolean
    vSlide: boolean
}
export class UISlider extends UIElement {
    horizontalSlide: boolean
    verticalSlide: boolean

    listener: MouseListener

    constructor(props: UISliderProps) {
        super(props)
        this.horizontalSlide = props.hSlide
        this.verticalSlide = props.vSlide

        this.listener = new MouseListener({
            listenElement: this,
            onMouseDown: this.onMouseDown,
            onMouseUp: this.onMouseUp,
            onMouseMove: this.onMouseMove,
        })
        this.listener.start()
    }

    onMouseDown = (event: MouseEvent) => {
        if (this.horizontalSlide && this.verticalSlide) {
            document.body.style.cursor = 'grabbing'
        } else if (this.horizontalSlide) {
            document.body.style.cursor = 'resize-ew'
        } else if (this.verticalSlide) {
            document.body.style.cursor = 'resize-ns'
        }
    }
    onMouseUp = (event: MouseEvent) => {
        const prevElement = this.getPreviousElement()
        const nextElement = this.getNextElement()

        // if (this.verticalSlide) {
        //     if (prevElement && prevElement.flexBasisPX < prevElement.minHeightPX) {
        //         const difference = prevElement.minHeightPX - prevElement.flexBasisPX
        //         prevElement.flexBasis = prevElement.minHeight
        //         if (nextElement) nextElement.flexBasisPX -= difference
        //     }
        //     if (nextElement && nextElement.flexBasisPX < nextElement.minHeightPX)
        //         nextElement.flexBasis = nextElement.minHeight
        // }

        // if (this.horizontalSlide) {
        // }
    }

    onMouseMove = (event: MouseEvent) => {
        const prevElement = this.getPreviousElement()
        const nextElement = this.getNextElement()

        if (this.horizontalSlide) {
            if (prevElement) prevElement.flexBasisPX += this.listener.moveSpeed.x
            if (nextElement) nextElement.flexBasisPX -= this.listener.moveSpeed.x
        }

        if (this.verticalSlide) {
            if (prevElement) prevElement.flexBasisPX += this.listener.moveSpeed.y
            if (nextElement) nextElement.flexBasisPX -= this.listener.moveSpeed.y
        }

        console.log(nextElement?.maxWidth)
        console.log(nextElement?.fullName)
        if (
            (prevElement && prevElement.minWidthPX > prevElement.base.offsetWidth + this.listener.moveSpeed.x) ||
            (nextElement && nextElement.minWidthPX > nextElement.base.offsetWidth - this.listener.moveSpeed.x) ||
            (prevElement &&
                prevElement.maxWidthPX > 0 &&
                prevElement.maxWidthPX < prevElement.base.offsetWidth + this.listener.moveSpeed.x) ||
            (nextElement &&
                nextElement.maxWidthPX > 0 &&
                nextElement.maxWidthPX < nextElement.base.offsetWidth - this.listener.moveSpeed.x)
        )
            this.listener.endEvent()

        if (
            (prevElement && prevElement.minHeightPX > prevElement.base.offsetHeight + this.listener.moveSpeed.y) ||
            (nextElement && nextElement.minHeightPX > nextElement.base.offsetHeight - this.listener.moveSpeed.y) ||
            (prevElement &&
                prevElement.maxHeightPX > 0 &&
                prevElement.maxHeightPX < prevElement.base.offsetHeight + this.listener.moveSpeed.y) ||
            (nextElement &&
                nextElement.maxHeightPX > 0 &&
                nextElement.maxHeightPX < nextElement.base.offsetHeight - this.listener.moveSpeed.y)
        )
            this.listener.endEvent()
    }

    getPreviousElement() {
        const parent = this.parent

        if (parent) {
            const index = parent.childUI.indexOf(this)
            if (index > -1) {
                for (let i = 1; i <= index; i++) {
                    const curElement = parent.childUI[index - i]
                    if (curElement.visible) return curElement
                }
            }
        }
    }

    getNextElement = () => {
        const parent = this.parent
        if (parent) {
            const index = parent.childUI.indexOf(this)
            if (index > -1) {
                for (let i = 1; i <= parent.childUI.length - index; i++) {
                    const curElement = parent.childUI[index + i]
                    if (curElement.visible) return curElement
                }
            }
        }
    }
}
