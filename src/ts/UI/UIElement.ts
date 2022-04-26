export interface UIElementProps {
    name: string
    type?: string
    width?: string | number
    minWidth?: string | number
    maxWidth?: string | number
    height?: string | number
    minHeight?: string | number
    maxHeight?: string | number
    backgroundColor?: string
    flexBasis?: string | number
}

export class UIElement {
    base: HTMLDivElement
    divs: HTMLElement[]
    parent?: UIElement
    childUI: UIElement[]

    private _width?: number
    private _height?: number

    static map: Map<string, unknown> = new Map()

    constructor(props: UIElementProps) {
        this.divs = []
        this.childUI = []
        this.base = document.createElement('div')

        // Set Required Object Variables
        this.type = props.type ?? 'basic'
        this.base.dataset.name = props.name
        this.base.id = this.fullName

        this.base.classList.add(this.type)
        if (props.width) this.width = typeof props.width == 'number' ? `${props.width}px` : props.width
        if (props.minWidth) this.minWidth = typeof props.minWidth == 'number' ? `${props.minWidth}px` : props.minWidth
        if (props.maxWidth) this.maxWidth = typeof props.maxWidth == 'number' ? `${props.maxWidth}px` : props.maxWidth

        if (props.height) this.height = typeof props.height == 'number' ? `${props.height}px` : props.height
        if (props.minHeight)
            this.minHeight = typeof props.minHeight == 'number' ? `${props.minHeight}px` : props.minHeight
        if (props.maxHeight)
            this.maxHeight = typeof props.maxHeight == 'number' ? `${props.maxHeight}px` : props.maxHeight

        if (props.backgroundColor) this.backgroundColor = props.backgroundColor

        if (props.flexBasis)
            this.flexBasis = typeof props.flexBasis == 'number' ? `${props.flexBasis}px` : props.flexBasis

        this.divs.push(this.base)

        UIElement.map.set(this.fullName, this)
    }

    // Getters and Setters
    get type() {
        return this.base.dataset.type as string
    }
    set type(v) {
        this.base.dataset.type = v
    }

    get minWidth() {
        return this.base.style.minWidth
    }
    set minWidth(v) {
        this.base.style.minWidth = v
    }

    get minWidthPX() {
        const minWidth = parseInt(this.base.style.minWidth, 10)
        return minWidth ? minWidth : 0
    }
    set minWidthPX(v) {
        this.base.style.minWidth = `${v}px`
    }

    get minHeight() {
        return this.base.style.minHeight
    }
    set minHeight(v) {
        this.base.style.minHeight = v
    }

    get minHeightPX() {
        const minHeight = parseInt(this.base.style.minHeight, 10)
        return minHeight ? minHeight : 0
    }
    set minHeightPX(v) {
        this.base.style.minHeight = `${v}px`
    }

    get maxWidth() {
        return this.base.style.maxWidth
    }
    set maxWidth(v) {
        this.base.style.maxWidth = v
    }

    get maxWidthPX() {
        const maxWidth = parseInt(this.maxWidth, 10)
        return maxWidth ? maxWidth : 0
    }
    set maxWidthPX(v) {
        this.maxWidth = `${v}px`
    }

    get maxHeight() {
        return this.base.style.maxHeight
    }
    set maxHeight(v) {
        this.base.style.maxHeight = v
    }

    get maxHeightPX() {
        const maxHeight = parseInt(this.base.style.maxHeight, 10)
        return maxHeight ? maxHeight : 0
    }
    set maxHeightPX(v) {
        this.base.style.maxHeight = `${v}px`
    }

    get width() {
        return this.base.style.width
    }
    set width(v) {
        this.base.style.width = v
    }

    get widthPX() {
        const width = parseInt(this.base.style.width, 10)
        return width ? width : 0
    }
    set widthPX(v) {
        this.width = `${v}px`
    }

    get heightPX() {
        const height = parseInt(this.base.style.height, 10)
        return height ? height : 0
    }
    set heightPX(v) {
        this.height = `${v}px`
    }

    get flexBasisPX() {
        const flexBasis = parseInt(this.base.style.flexBasis, 10)
        return flexBasis ? flexBasis : 0
    }
    set flexBasisPX(v) {
        this.flexBasis = `${v}px`
    }

    get height() {
        return this.base.style.height
    }
    set height(v) {
        this.base.style.height = v
    }

    get classList() {
        return this.base.classList
    }
    set classList(v) {
        this.base.classList
    }

    get name() {
        return this.base.dataset.name as string
    }
    set name(v: string) {
        this.base.dataset.name = v
        this.base.id = this.fullName
    }

    get backgroundColor() {
        return this.base.style.backgroundColor
    }
    set backgroundColor(v: string) {
        this.base.style.backgroundColor = v
    }

    get flexBasis() {
        return this.base.style.flexBasis
    }
    set flexBasis(v) {
        this.base.style.flexBasis = v
    }

    get innerHTML() {
        return this.base.innerHTML
    }
    set innerHTML(v) {
        this.base.innerHTML = v
    }

    // Getters Only
    get fullName() {
        return this.name + '-' + this.type
    }

    get visible() {
        return this.base.style.display !== 'none'
    }

    set visible(v: boolean) {
        v ? (this.base.style.display = 'inherit') : (this.base.style.display = 'none')
    }

    addChild = <T extends UIElement>(element: T) => {
        this.childUI.push(element)
        element.parent = this
        if (element.base) this.divs.at(-1)?.appendChild(element.base)

        return element
    }

    setParent = <T extends UIElement>(element: T) => {
        if (!this.parent) {
            element.childUI.push(this)
        } else {
            const index = this.parent.childUI.indexOf(this)
            if (index > -1) {
                this.parent.childUI.splice(index, 1)
            }
        }

        element.divs.at(-1)?.appendChild(this.base)
    }

    protected createSub<T extends keyof HTMLElementTagNameMap>(props: {
        suffix: string
        tag: T
        classes?: string[] | string
        parent?: HTMLElement
    }): HTMLElementTagNameMap[T] {
        const element = document.createElement(props.tag ?? 'div')
        element.dataset.suffix = props.suffix
        element.dataset.type = this.type
        element.id = this.fullName + '-' + props.suffix
        element.classList.add(this.type + '-' + props.suffix)

        if (typeof props.classes === 'string') {
            element.classList.add(props.classes)
        } else if (props.classes) {
            props.classes.forEach((curClass) => {
                element.classList.add(curClass)
            })
        }

        this.divs.at(-1)?.appendChild(element)

        this.divs.push(element)

        return element
    }

    get html() {
        return ``
    }

    protected static hasObject(obj: HTMLElement) {
        return UIElement.map.has(obj.id)
    }
    protected static getObject = (obj: HTMLElement) => {
        return UIElement.map.get(obj.id)
    }
}
