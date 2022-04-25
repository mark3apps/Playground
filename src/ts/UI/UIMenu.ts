import { Tag } from '../Enums/Tag'
import { UIElementProps, UIElement } from './UIElement'

export interface UIMenuProps extends UIElementProps {
    title: string
}
export class UIMenu extends UIElement {
    menuText: HTMLHeadingElement

    constructor(props: UIMenuProps) {
        props.type = 'menu'
        super(props)
        this.createSub({ suffix: 'inner', tag: Tag.div })
        this.menuText = this.createSub({ suffix: 'title', tag: Tag.h4 })
        this.menuText.innerText = props.title
    }
}
