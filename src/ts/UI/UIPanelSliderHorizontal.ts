import { UIElementProps } from './UIElement'
import { UISlider } from './UIPanelSlider'

export interface UIPanelSliderHorizontalProps extends UIElementProps {
    slide?: boolean
}
export class UIPanelSliderHorizontal extends UISlider {
    constructor(props: UIPanelSliderHorizontalProps) {
        props.type = 'sliderHorizontal'

        super({ ...props, ...{ hSlide: false, vSlide: props.slide ?? true } })
    }
}
