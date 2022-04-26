import { Icon } from '../../less/fonts/Icons'
import { IconSize } from '../Enums/IconSize'
import { Tag } from '../Enums/Tag'

import { UIElementProps, UIElement } from './UIElement'

export interface UIButtonProps extends UIElementProps {
    onClick?: (e: MouseEvent) => void
    icon: Icon
    size?: IconSize
}

export class UIButton extends UIElement {
    onClick: (e: MouseEvent) => void

    button: HTMLSpanElement

    constructor(props: UIButtonProps) {
        props.type = 'button'
        super(props)

        this.button = this.createSub({ suffix: 'icon', tag: Tag.span })
        this.button.classList.add(
            'material-icons-round',
            'md-inactive',
            'md-light',
            `md-${props.size ?? IconSize.Normal}`
        )

        this.icon = props.icon
        this.flexBasisPX = props.size ?? IconSize.Normal
        this.base.style.margin = '5px'

        this.onClick = props.onClick ?? ((e: MouseEvent) => {})

        this.base.onclick = this._onClick
    }

    private _onClick = (e: MouseEvent) => {
        e.preventDefault()

        this.onClick(e)
    }

    get size() {
        return this.button.style.fontSize
    }

    get icon() {
        return this.button.innerText
    }

    set icon(v) {
        this.button.innerText = v
    }

    static fromElement(element: HTMLElement) {
        const foundElement = UIElement.getObject(element)
        return foundElement instanceof UIButton ? foundElement : undefined
    }
}
