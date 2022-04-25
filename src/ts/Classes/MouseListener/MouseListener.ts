import { Mouse } from '../../Enums/Mouse'
import { UIElement } from '../../UI/UIElement'

export class Coordinate {
    x = 0
    y = 0
}

export enum Position {
    TOP = 'top',
    BOTTOM = 'bottom',
    LEFT = 'left',
    RIGHT = 'right',
    TOP_LEFT = 'topLeft',
    TOP_RIGHT = 'topRight',
    BOTTOM_LEFT = 'bottomLeft',
    BOTTOM_RIGHT = 'bottomRight',
}

export enum ListenType {
    Shift,
    Adjust,
}

export interface MouseListenerProps {
    listenElement: UIElement
    onMouseDown?: (event: MouseEvent) => void
    onMouseMove?: (event: MouseEvent) => void
    onMouseUp?: (event: MouseEvent) => void
}

export class MouseListener {
    listenObject: UIElement
    startCoordinate: Coordinate
    endCoordinate: Coordinate
    moveSpeed: Coordinate

    private lastCoordinate?: Coordinate

    onMouseDown?: (event: MouseEvent) => void
    onMouseMove?: (event: MouseEvent) => void
    onMouseUp?: (event: MouseEvent) => void

    constructor(props: MouseListenerProps) {
        this.listenObject = props.listenElement
        this.startCoordinate = new Coordinate()
        this.endCoordinate = new Coordinate()
        this.moveSpeed = new Coordinate()

        if (props.onMouseDown) this.onMouseDown = props.onMouseDown
        if (props.onMouseMove) this.onMouseMove = props.onMouseMove
        if (props.onMouseUp) this.onMouseUp = props.onMouseUp
    }

    start = () => {
        this.listenObject.base.addEventListener(Mouse.Down, this._onMouseDown)
    }

    stop = () => {
        this.endEvent()
        this.listenObject.base.removeEventListener(Mouse.Down, this._onMouseDown)
    }

    endEvent = () => {
        this._onMouseUp()
    }

    private _onMouseDown = (event: MouseEvent) => {
        document.addEventListener(Mouse.Move, this._onMouseMove)
        document.addEventListener(Mouse.Up, this._onMouseUp)
        this.startCoordinate = {
            x: event.clientX,
            y: event.clientY,
        }

        event.preventDefault()

        if (this.onMouseDown) this.onMouseDown(event)
    }

    private _onMouseMove = (event: MouseEvent) => {
        if (this.lastCoordinate) {
            this.moveSpeed = {
                x: event.clientX - this.lastCoordinate.x,
                y: event.clientY - this.lastCoordinate.y,
            }
            this.lastCoordinate = {
                x: event.clientX,
                y: event.clientY,
            }
        } else {
            this.lastCoordinate = {
                x: event.clientX,
                y: event.clientY,
            }
            this.moveSpeed = { x: 0, y: 0 }
        }

        if (this.onMouseMove) this.onMouseMove(event)
    }

    private _onMouseUp = (event?: MouseEvent) => {
        document.removeEventListener(Mouse.Move, this._onMouseMove)
        document.removeEventListener(Mouse.Up, this._onMouseUp)
        this.lastCoordinate = undefined

        if (event) {
            this.endCoordinate = {
                x: event.clientX,
                y: event.clientY,
            }

            // Reset Values

            if (this.onMouseUp) this.onMouseUp(event)
        }
    }
}

// const Slide = new UISlider({ name: 'Test', vSlide: true, hSlide: false })
// Slide.mouseListener = new MouseListener({ listenElement: Slide })
