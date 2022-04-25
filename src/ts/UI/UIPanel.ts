import { Tag } from '../Enums/Tag'
import { UIElementProps, UIElement } from './UIElement'

export interface UIPanelProps extends UIElementProps {}

export class UIPanel extends UIElement {
    constructor(props: UIPanelProps) {
        props.type = 'panel'
        // props.width = props.width ?? '150px'
        props.minWidth = props.minWidth ?? '200px'
        props.maxWidth = props.maxWidth ?? '600px'

        super(props)

        this.createSub({ suffix: 'inner', tag: Tag.div })
    }

    static fromElement(element: HTMLElement) {
        const foundElement = UIElement.getObject(element)
        return foundElement instanceof UIPanel ? foundElement : undefined
    }
}
