import { Tag } from '../Enums/Tag'
import { UIElementProps, UIElement } from './UIElement'

export interface UIPanelContainerProps extends UIElementProps {}

export class UIPanelContainer extends UIElement {
    constructor(props: UIPanelContainerProps) {
        props.type = 'panelContainer'
        props.maxHeight = props.maxHeight ?? '700px'
        super(props)

        this.createSub({ suffix: 'innerFlex', classes: 'flexVertical', tag: Tag.div })
    }

    static fromElement(element: HTMLElement) {
        const foundElement = UIElement.getObject(element)
        return foundElement instanceof UIPanelContainer ? foundElement : undefined
    }
}
