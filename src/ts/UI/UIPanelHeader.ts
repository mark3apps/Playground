import html from 'plain-tag'
import { UIElementProps, UIElement } from './UIElement'

export interface UIPanelHeaderProps extends UIElementProps {
    title: string
}

export class UIPanelHeader extends UIElement {
    constructor(props: UIPanelHeaderProps) {
        props.type = 'panelHeader'
        super(props)

        this.title = props.title
        this.innerHTML = html`<h3>${this.title}</h3>`
    }

    get title() {
        return this.base.dataset.title as string
    }

    set title(value) {
        this.base.dataset.title = value
    }

    static fromElement(element: HTMLElement) {
        const foundElement = UIElement.getObject(element)
        return foundElement instanceof UIPanelHeader ? foundElement : undefined
    }
}
