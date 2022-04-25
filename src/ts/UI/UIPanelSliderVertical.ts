import { UIElementProps } from './UIElement'
import { UISlider } from './UIPanelSlider'

export interface UIPanelSliderVerticalProps extends UIElementProps {}
export class UIPanelSliderVertical extends UISlider {
    constructor(props: UIPanelSliderVerticalProps) {
        props.type = 'sliderVertical'
        super({ ...props, ...{ hSlide: true, vSlide: false } })
    }
}
