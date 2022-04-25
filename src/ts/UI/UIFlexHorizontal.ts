import { Tag } from '../Enums/Tag'
import { UIElementProps, UIElement } from './UIElement'

export interface UIFlexHorizontalProps extends UIElementProps {}
export class UIFlexHorizontal extends UIElement {
    constructor(props: UIFlexHorizontalProps) {
        props.type = 'flexHorizontal'
        super(props)

        this.createSub({ suffix: 'inner', tag: Tag.div })
    }
}
