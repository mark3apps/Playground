import { UISidebar } from './SidebarElement'

export class UI {
    private static instance?: UI

    static getInstance() {
        if (!UI.instance) UI.instance = new UI()
        return UI.instance
    }

    sidebars: { [name: string]: UISidebar }

    private constructor() {
        //
    }
}
