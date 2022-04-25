import { UIElementProps, UIElement } from './UIElement'

export interface UICanvasProps extends UIElementProps {}
export class UICanvas extends UIElement {
    constructor(props: UICanvasProps) {
        props.type = 'canvas'
        props.minWidth = props.minWidth ?? 150

        super(props)
    }

    static fromElement(element: HTMLElement) {
        const foundElement = UIElement.getObject(element)
        return foundElement instanceof UICanvas ? foundElement : undefined
    }
}
