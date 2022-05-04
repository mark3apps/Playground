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
import { UIButtonSpacer } from './UIButtonSpacer'
import { UIButtonText } from './UIButtonText'

const buttonClick = (e: MouseEvent) => {}

export class UIMain {
    private static instance?: UIMain

    static getInstance() {
        if (!UIMain.instance) UIMain.instance = new UIMain()
        return UIMain.instance
    }

    app: UIFlexVertical
    titleBar: UIBar

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

        // Title Bar
        this.titleBar = this.createTitleBar()

        // Button Bar
        const buttonBarSpacerProps = { verticalLine: true, flexBasis: 20, margin: 8 }
        this.buttonBar = this.app.addChild(new UIBar({ name: 'top', flexBasis: 40, flexDirection: 'row' }))
        this.buttonBar.addChild(new UIButton({ name: 'New', icon: Icon.Description, size: IconSize.Normal, onClick: buttonClick }))
        this.buttonBar.addChild(new UIButton({ name: 'Open', icon: Icon.FolderOpen, size: IconSize.Normal, onClick: buttonClick }))
        this.buttonBar.addChild(new UIButton({ name: 'Save', icon: Icon.Save, size: IconSize.Normal, onClick: buttonClick }))
        this.buttonBar.addChild(new UIButtonSpacer({ name: 'spacer1', ...buttonBarSpacerProps }))

        this.buttonBar.addChild(new UIButton({ name: 'Undo', icon: Icon.Undo, size: IconSize.Normal, onClick: buttonClick }))
        this.buttonBar.addChild(new UIButton({ name: 'Redo', icon: Icon.Redo, size: IconSize.Normal, onClick: buttonClick }))
        this.buttonBar.addChild(new UIButtonSpacer({ name: 'spacer2', ...buttonBarSpacerProps }))

        this.buttonBar.addChild(new UIButton({ name: 'Select', icon: Icon.TouchApp, size: IconSize.Normal, onClick: buttonClick }))
        this.buttonBar.addChild(new UIButton({ name: 'Pan/Zoom', icon: Icon.PanTool, size: IconSize.Normal, onClick: buttonClick }))
        this.buttonBar.addChild(new UIButtonSpacer({ name: 'spacer2', ...buttonBarSpacerProps }))

        this.buttonBar.addChild(new UIButton({ name: 'Export', icon: Icon.FileDownload, size: IconSize.Normal, onClick: buttonClick }))

        this.buttonBar.addChild(new UIFlexHorizontal({ name: 'centerLeft' }))
        this.buttonBar.addChild(new UIButton({ name: 'Export', icon: Icon.Settings, size: IconSize.Normal, onClick: buttonClick }))

        // Set up the Main Workspace
        this.workspace = this.app.addChild(new UIFlexHorizontal({ name: 'workspace' }))

        // Set up the Left Sidebar
        this.leftPanel = this.workspace.addChild(new UIPanel({ name: 'left', flexBasis: '200px' }))
        const elements = this.leftPanel.addChild(new UIPanelContainer({ name: 'element', maxHeight: 'inherit' }))
        elements.addChild(new UIPanelHeader({ name: 'elements', title: 'Element Library' }))
        elements.addChild(new UIPanelSection({ name: 'elements' }))

        elements.childUI[1].addChild(
            new UIButtonText({ name: 'customButton', icon: Icon.SelectAll, size: IconSize.Normal, label: 'Custom Button', onClick: buttonClick })
        )
        elements.childUI[1].addChild(
            new UIButtonText({ name: 'blackTextButton', icon: Icon.SelectAll, size: IconSize.Normal, label: 'Black Text Button', onClick: buttonClick })
        )
        elements.childUI[1].addChild(
            new UIButtonText({ name: 'blueTextButton', icon: Icon.SelectAll, size: IconSize.Normal, label: 'Blue Text Button', onClick: buttonClick })
        )
        elements.childUI[1].addChild(
            new UIButtonText({ name: 'invisibleButton', icon: Icon.SelectAll, size: IconSize.Normal, label: 'Invisible Button', onClick: buttonClick })
        )
        elements.childUI[1].addChild(new UIButtonText({ name: 'Select', icon: Icon.Layers, size: IconSize.Normal, label: 'Custom Backdrop', onClick: buttonClick }))
        elements.childUI[1].addChild(
            new UIButtonText({ name: 'Select', icon: Icon.Layers, size: IconSize.Normal, label: 'Semi Transparent + Border', onClick: buttonClick })
        )
        elements.childUI[1].addChild(new UIButtonText({ name: 'Select', icon: Icon.Layers, size: IconSize.Normal, label: 'Black Box + Arrow', onClick: buttonClick }))
        elements.childUI[1].addChild(new UIButtonText({ name: 'Select', icon: Icon.Layers, size: IconSize.Normal, label: 'Black Backdrop', onClick: buttonClick }))
        elements.childUI[1].addChild(new UIButtonText({ name: 'Select', icon: Icon.Layers, size: IconSize.Normal, label: 'Grey Backdrop', onClick: buttonClick }))
        elements.childUI[1].addChild(new UIButtonText({ name: 'Select', icon: Icon.Layers, size: IconSize.Normal, label: 'Very Black Backdrop', onClick: buttonClick }))
        elements.childUI[1].addChild(
            new UIButtonText({ name: 'Select', icon: Icon.Layers, size: IconSize.Normal, label: 'Default Menus Backdrop', onClick: buttonClick })
        )
        elements.childUI[1].addChild(new UIButtonText({ name: 'Select', icon: Icon.TextFields, size: IconSize.Normal, label: 'Text Frame', onClick: buttonClick }))
        elements.childUI[1].addChild(new UIButtonText({ name: 'Select', icon: Icon.TextFields, size: IconSize.Normal, label: 'Text Area', onClick: buttonClick }))
        elements.childUI[1].addChild(new UIButtonText({ name: 'Select', icon: Icon.TextFields, size: IconSize.Normal, label: 'Text Field', onClick: buttonClick }))
        elements.childUI[1].addChild(
            new UIButtonText({ name: 'Select', icon: Icon.IndeterminateCheckBox, size: IconSize.Normal, label: 'Check Box', onClick: buttonClick })
        )
        elements.childUI[1].addChild(new UIButtonText({ name: 'Select', icon: Icon.Crop_16_9, size: IconSize.Normal, label: 'Progress Bar', onClick: buttonClick }))

        elements.childUI[1].addChild(new UIButtonText({ name: 'Select', icon: Icon.Crop_16_9, size: IconSize.Normal, label: 'Progress Bar + BG', onClick: buttonClick }))
        elements.childUI[1].addChild(
            new UIButtonText({ name: 'Select', icon: Icon.Crop_16_9, size: IconSize.Normal, label: 'Progress Bar + Text', onClick: buttonClick })
        )
        elements.childUI[1].addChild(
            new UIButtonText({ name: 'Select', icon: Icon.Crop_16_9, size: IconSize.Normal, label: 'Progress Bar + Text + BG', onClick: buttonClick })
        )

        // elements.childUI[1].addChild(new UIElement({ name: 'testDiv', width: '100%', height: '2500px' }))

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
        this.rightPanel = this.workspace.addChild(new UIPanel({ name: 'right', flexBasis: 300 }))
        const parameters = this.rightPanel.addChild(new UIPanelContainer({ name: 'parameters', minHeight: 250, maxHeight: 500 }))
        parameters.base.style.flexGrow = '0'
        parameters.addChild(new UIPanelHeader({ name: 'parameters', title: 'Parameters' }))
        const para = parameters.addChild(new UIPanelSection({ name: 'parameters' }))
        para.addChild(new UIElement({ name: 'testDiv', width: '100%', height: '2500px' }))

        this.rightPanel.addChild(new UIPanelSliderHorizontal({ name: 'rightPanel', slide: false }))
        this.rightPanel.addChild(this.createLayersSection())

        // Bottom Bar
        this.bottomBar = this.createBottomBar()
    }

    createTitleBar = () => {
        const titleBar = this.app.addChild(new UIBar({ name: 'titlebar', backgroundColor: '#444', flexBasis: 25, flexDirection: 'row' }))
        titleBar.classList.add('drag-region')
        titleBar.addChild(new UIMenu({ name: 'file', title: 'File', flexBasis: 40 }))
        titleBar.addChild(new UIMenu({ name: 'edit', title: 'Edit', flexBasis: 40 }))
        titleBar.addChild(new UIMenu({ name: 'view', title: 'View', flexBasis: 40 }))
        titleBar.addChild(new UIFlexHorizontal({ name: 'dragTitlebar' }))

        // These get assigned their on-clicks in the preload
        // DON'T CHANGE NAMES //
        titleBar.addChild(new UIButton({ name: 'minimize', icon: Icon.Minimize, size: IconSize.Small }))
        titleBar.addChild(new UIButton({ name: 'maximize', icon: Icon.CheckBoxOutlineBlank, size: IconSize.Small }))
        titleBar.addChild(new UIButton({ name: 'close', icon: Icon.Close, size: IconSize.Small }))

        return titleBar
    }

    createLayersSection = () => {
        const layersSection = new UIPanelContainer({ name: 'layers', height: '0px', minHeight: '200px', maxHeight: 'inherit' })
        const LayersFlex = layersSection.addChild(new UIFlexVertical({ name: 'containerFlex' }))
        LayersFlex.addChild(new UIPanelHeader({ name: 'layers', title: 'Layers' }))
        const layersInner = LayersFlex.addChild(new UIPanelSection({ name: 'layers' }))
        layersInner.addChild(new UIElement({ name: 'testDiv', width: '100%', height: '2500px' }))
        return layersSection
    }

    createBottomBar = () => {
        const bottomBar = this.app.addChild(new UIBar({ name: 'top', flexBasis: '25px', backgroundColor: '#a04425', flexDirection: 'row' }))
        bottomBar.addChild(new UIFlexHorizontal({ name: 'centerLeft' }))

        bottomBar.addChild(new UIButton({ name: 'Check', icon: Icon.SelectAll, size: IconSize.Small, onClick: buttonClick }))
        bottomBar.addChild(new UIButton({ name: 'Check', icon: Icon.Deselect, size: IconSize.Small, onClick: buttonClick }))

        bottomBar.addChild(new UIButton({ name: 'Check', icon: Icon.Remove, size: IconSize.Small, onClick: buttonClick }))
        bottomBar.addChild(new UIButton({ name: 'Check', icon: Icon.Add, size: IconSize.Small, onClick: buttonClick }))

        return bottomBar
    }
}
