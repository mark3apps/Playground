import { Tag } from '../Enums/Tag'
import { UIElementProps, UIElement } from './UIElement'

export interface UIPanelSectionProps extends UIElementProps {}

export class UIPanelSection extends UIElement {
    constructor(props: UIPanelSectionProps) {
        props.type = 'panelSection'
        super(props)

        this.classList.add('scroll')
        this.createSub({ suffix: 'inner', tag: Tag.div })
        this.createSub({ suffix: 'props', tag: Tag.div })
    }

    static fromElement(element: HTMLElement) {
        const foundElement = UIElement.getObject(element)
        return foundElement instanceof UIPanelSection ? foundElement : undefined
    }
}
