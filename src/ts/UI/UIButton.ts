import { Icon } from '../../less/fonts/Icons'
import { IconSize } from '../Enums/IconSize'
import { Tag } from '../Enums/Tag'

import { UIElementProps, UIElement } from './UIElement'

export enum MaterialIconVariation {
    Main = '',
    Outlined = '-outlined',
    Rounded = '-round',
}

export interface UIButtonProps extends UIElementProps {
    onClick?: (e: MouseEvent) => void
    icon: Icon
    size?: IconSize
    iconVariation?: MaterialIconVariation
    padding?: string | number
}

export class UIButton extends UIElement {
    onClick: (e: MouseEvent) => void

    button: HTMLSpanElement

    constructor(props: UIButtonProps) {
        props.type = 'button'
        props.iconVariation = props.iconVariation ?? MaterialIconVariation.Outlined
        super(props)

        this.button = this.createSub({ suffix: 'icon', tag: Tag.span })
        this.button.classList.add(
            `material-icons${props.iconVariation}`,
            'md-inactive',
            'md-light',
            `md-${props.size ?? IconSize.Normal}`
        )

        this.icon = props.icon
        this.flexBasisPX = props.size ?? IconSize.Normal
        this.button.style.paddingLeft = props.padding
            ? typeof props.padding === 'string'
                ? props.padding
                : `${props.padding}px`
            : '5px'
        this.button.style.paddingRight = props.padding
            ? typeof props.padding === 'string'
                ? props.padding
                : `${props.padding}px`
            : '5px'

        this.base.style.display = 'table'
        this.button.style.display = 'table-cell'
        this.button.style.verticalAlign = 'middle'

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
