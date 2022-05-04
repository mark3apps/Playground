import { UIElement, UIElementProps } from './UIElement'

export interface UIButtonSpacerProps extends UIElementProps {
    verticalLine?: boolean
    horizontalLine?: boolean
    color?: string
    margin?: string | number
}
export class UIButtonSpacer extends UIElement {
    constructor(props: UIButtonSpacerProps) {
        props.type = 'iconSpacer'
        super(props)

        this.base.style.flexGrow = '0'
        this.base.style.flexShrink = '0'

        if (props.flexBasis === undefined) {
            this.flexBasisPX = 25
        } else if (typeof props.flexBasis === 'string') {
            this.flexBasis = props.flexBasis
        } else {
            this.flexBasisPX = props.flexBasis
        }

        this.base.style.display = 'flex'

        const left = this.createSub({ suffix: 'left', tag: 'div' })
        const right = this.createSub({ suffix: 'right', tag: 'div', parent: this.base })

        if (typeof props.margin === 'number') {
            props.margin = `${props.margin}px`
        }

        if (props.verticalLine) {
            left.style.width = '50%'
            left.style.height = '100%'

            right.style.width = '50%'
            right.style.height = '100%'

            this.base.style.flexDirection = 'row'
            this.base.style.marginTop = props.margin ?? '5px'
            this.base.style.marginBottom = props.margin ?? '5px'
            left.style.borderRight = `1px ${props.color ?? '#535353'} solid`
        }

        if (props.horizontalLine) {
            left.style.width = '100%'
            left.style.height = '50%'

            right.style.width = '100%'
            right.style.height = '50%'

            this.base.style.flexDirection = 'column'
            this.base.style.marginLeft = props.margin ?? '5px'
            this.base.style.marginRight = props.margin ?? '5px'
            left.style.borderBottom = `1px ${props.color ?? '#535353'} solid`
        }
    }
}
