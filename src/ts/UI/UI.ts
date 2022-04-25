import { UIFlexHorizontal } from './UIFlexHorizontal'
import { UICanvas } from './UICanvas'
import { UIPanelHeader } from './UIPanelHeader'
import { UIPanel } from './UIPanel'
import { UIPanelSection } from './UIPanelSection'
import { UIBar } from './UIBar'
import { UIFlexVertical } from './UIFlexVertical'
import { UIPanelSliderHorizontal } from './UIPanelSliderHorizontal'
import { UIPanelSliderVertical } from './UIPanelSliderVertical'
import { UIElement } from './UIElement'
import { UIPanelContainer } from './UIPanelContainer'
import { UIButton } from './UIButton'
import { IconSize } from '../Enums/IconSize'
import { Icon } from '../../less/fonts/Icons'
import { UIMenu } from './UIMenu'

// import { ipcRenderer } from 'electron'

const buttonClick = (e: MouseEvent) => {}

const maximize = (e: MouseEvent) => {}

const minimize = (e: MouseEvent) => {}

const close = () => {}

// ipc.on('delete', close)

export class UIMain {
    private static instance?: UIMain

    static getInstance() {
        if (!UIMain.instance) UIMain.instance = new UIMain()
        return UIMain.instance
    }

    app: UIFlexVertical
    topBar: UIBar

    workspace: UIFlexHorizontal

    buttonBar: UIBar
    bottomBar: UIBar

    leftPanel: UIPanel
    canvas: UICanvas

    optionsPanel: UIPanel
    rightPanel: UIPanel

    private constructor() {
        this.app = new UIFlexVertical({ name: 'app' })
        document.getElementById('appWrapper')?.appendChild(this.app.base)

        //
        this.topBar = this.app.addChild(new UIBar({ name: 'titlebar', backgroundColor: '#444', flexBasis: 25, flexDirection: 'row' }))
        this.topBar.classList.add('drag-region')
        this.topBar.addChild(new UIMenu({ name: 'file', title: 'File', flexBasis: 40 }))
        this.topBar.addChild(new UIMenu({ name: 'edit', title: 'Edit', flexBasis: 40 }))
        this.topBar.addChild(new UIMenu({ name: 'view', title: 'View', flexBasis: 40 }))
        this.topBar.addChild(new UIFlexHorizontal({ name: 'dragTitlebar' }))
        this.topBar.addChild(new UIButton({ name: 'minimize', icon: Icon.Minimize, size: IconSize.Small, onClick: maximize }))
        this.topBar.addChild(new UIButton({ name: 'maximize', icon: Icon.CheckBoxOutlineBlank, size: IconSize.Small, onClick: buttonClick }))
        this.topBar.addChild(new UIButton({ name: 'close', icon: Icon.Close, size: IconSize.Small, onClick: close }))

        //
        this.buttonBar = this.app.addChild(new UIBar({ name: 'top', flexBasis: 28, flexDirection: 'row' }))
        this.buttonBar.addChild(new UIButton({ name: 'new', icon: Icon.HighlightAlt, size: IconSize.Normal, onClick: buttonClick }))
        this.buttonBar.addChild(new UIButton({ name: 'Check', icon: Icon.ZoomOutMap, size: IconSize.Normal, onClick: buttonClick }))

        // Set up the Main Workspace
        this.workspace = this.app.addChild(new UIFlexHorizontal({ name: 'workspace' }))

        // Set up the Left Sidebar
        this.leftPanel = this.workspace.addChild(new UIPanel({ name: 'left', flexBasis: '200px' }))
        const elements = this.leftPanel.addChild(new UIPanelContainer({ name: 'element', maxHeight: 'inherit' }))
        elements.addChild(new UIPanelHeader({ name: 'elements', title: 'Elements' }))
        elements.addChild(new UIPanelSection({ name: 'elements' }))
        elements.childUI[1].addChild(new UIElement({ name: 'testDiv', width: '100%', height: '2500px' }))

        this.workspace.addChild(new UIPanelSliderVertical({ name: 'left' }))

        // Setup the Canvas
        this.canvas = this.workspace.addChild(new UICanvas({ name: 'canvas' }))
        this.canvas.addChild(new UIElement({ name: 'testDiv', width: '100%', height: '100%' }))

        this.workspace.addChild(new UIPanelSliderVertical({ name: 'right' }))

        // Set up the Options Panel
        this.optionsPanel = this.workspace.addChild(new UIPanel({ name: 'left', flexBasis: '300px' }))
        const options = this.optionsPanel.addChild(new UIPanelContainer({ name: 'options', maxHeight: 'inherit' }))
        options.addChild(new UIPanelHeader({ name: 'options', title: 'Options' }))
        options.addChild(new UIPanelSection({ name: 'options' }))
        options.childUI[1].addChild(new UIElement({ name: 'testDiv', width: '100%', height: '2500px' }))

        this.workspace.addChild(new UIPanelSliderVertical({ name: 'right' }))

        // this.optionsPanel.base.style.display = 'none'

        // Set up the Right Panel
        this.rightPanel = this.workspace.addChild(new UIPanel({ name: 'right', flexBasis: '300px' }))
        const parameters = this.rightPanel.addChild(new UIPanelContainer({ name: 'parameters', minHeight: 250, maxHeight: 500, flexBasis: 400 }))
        parameters.addChild(new UIPanelHeader({ name: 'parameters', title: 'Parameters' }))
        const para = parameters.addChild(new UIPanelSection({ name: 'parameters' }))
        para.addChild(new UIElement({ name: 'testDiv', width: '100%', height: '2500px' }))

        this.rightPanel.addChild(new UIPanelSliderHorizontal({ name: 'rightPanel' }))

        const layers = this.rightPanel.addChild(new UIPanelContainer({ name: 'layers', height: '0px', minHeight: '200px', flexBasis: '500px', maxHeight: 'inherit' }))
        const LayersFlex = layers.addChild(new UIFlexVertical({ name: 'containerFlex' }))
        LayersFlex.addChild(new UIPanelHeader({ name: 'layers', title: 'Layers' }))
        const layersInner = LayersFlex.addChild(new UIPanelSection({ name: 'layers' }))
        layersInner.addChild(new UIElement({ name: 'testDiv', width: '100%', height: '2500px' }))

        // Bottom Bar
        this.bottomBar = this.app.addChild(new UIBar({ name: 'top', height: '20px', flexBasis: '23px', backgroundColor: '#a04425', flexDirection: 'column' }))
    }
}
