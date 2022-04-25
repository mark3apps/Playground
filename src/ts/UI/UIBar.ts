import { Tag } from '../Enums/Tag'
import { UIElementProps, UIElement } from './UIElement'

export interface UIBarProps extends UIElementProps {
    flexDirection: string
}

export class UIBar extends UIElement {
    constructor(props: UIBarProps) {
        props.type = 'bar'
        super(props)

        this.createSub({ suffix: 'inner', tag: Tag.div }).style.flexDirection = props.flexDirection
    }

    static fromElement(element: HTMLElement) {
        const foundElement = UIElement.getObject(element)
        return foundElement instanceof UIBar ? foundElement : undefined
    }
}
