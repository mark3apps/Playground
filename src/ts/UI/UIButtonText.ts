import { Icon } from '../../less/fonts/Icons'
import { IconSize } from '../Enums/IconSize'
import { Tag } from '../Enums/Tag'
import { MaterialIconVariation, UIButton } from './UIButton'
import html from 'plain-tag'

import { UIElementProps, UIElement } from './UIElement'

export interface UIButtonTextProps extends UIElementProps {
    onClick?: (e: MouseEvent) => void
    icon?: Icon
    size?: IconSize
    iconVariation?: MaterialIconVariation
    padding?: string | number
    label: string
}

export class UIButtonText extends UIElement {
    onClick: (e: MouseEvent) => void

    // button: HTMLSpanElement
    iconDiv: HTMLDivElement
    iconInner: HTMLDivElement
    text: HTMLDivElement

    constructor(props: UIButtonTextProps) {
        props.type = 'textButton'
        props.iconVariation = props.iconVariation ?? MaterialIconVariation.Outlined
        super(props)

        // this.button = this.createSub({ suffix: 'button', tag: Tag.div })

        this.iconDiv = this.createSub({ tag: Tag.div, suffix: 'icon', parent: this.base })
        this.iconInner = this.createSub({ suffix: 'iconInner', tag: Tag.div })
        this.iconInner.classList.add(
            `material-icons${props.iconVariation}`,
            'md-inactive',
            'md-light',
            `md-${props.size ?? IconSize.Normal}`
        )
        this.text = this.createSub({ suffix: 'label', tag: Tag.div, parent: this.base })
        this.text.innerHTML = html`<h4>${props.label}</h4>`

        if (props.icon) this.icon = props.icon
        this.flexBasisPX = props.size ?? IconSize.Normal

        // this.base.style.display = 'flex'
        // this.base.style.backgroundColor = '#333'
        // this.base.style.marginRight = '5px'
        // this.base.style.borderRadius = '5px'
        // this.text.style.marginLeft = '5px'
        // this.button.style.display = 'table-cell'
        // this.button.style.verticalAlign = 'middle'

        this.onClick = props.onClick ?? ((e: MouseEvent) => {})

        this.base.onclick = this._onClick
    }

    private _onClick = (e: MouseEvent) => {
        e.preventDefault()

        this.onClick(e)
    }

    get size() {
        return this.base.style.fontSize
    }

    get icon() {
        return this.iconInner.innerText
    }

    set icon(v) {
        this.iconInner.innerText = v
    }

    static fromElement(element: HTMLElement) {
        const foundElement = UIElement.getObject(element)
        return foundElement instanceof UIButton ? foundElement : undefined
    }
}
