export interface UISidebarProps {
    name: string
    width?: number
    minWidth: number
    maxWidth: number
}
export class UISidebar {
    name: string
    constructor(props: UISidebarProps) {
        this.name = props.name
    }
}
