import { UIElementProps, UIElement } from './UIElement'

export interface UIFlexVerticalProps extends UIElementProps {}
export class UIFlexVertical extends UIElement {
    constructor(props: UIFlexVerticalProps) {
        props.type = 'flexVertical'
        super(props)
    }
}
