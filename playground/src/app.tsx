import { GlobalRegistry, createDesigner } from '@pind/designable-core'
import {
  ComponentTreeWidget,
  CompositePanel,
  Designer,
  DesignerToolsWidget,
  HistoryWidget,
  OutlineTreeWidget,
  ResourceWidget,
  SettingsPanel,
  StudioPanel,
  ToolbarPanel,
  ViewPanel,
  ViewToolsWidget,
  ViewportPanel,
  Workbench,
  WorkspacePanel
} from '@formily/antdv-designable'
import {
  ArrayCards,
  ArrayItems,
  ArrayTable,
  Card,
  Cascader,
  Checkbox,
  DatePicker,
  Field,
  Form,
  FormCollapse,
  FormGrid,
  FormLayout,
  FormTab,
  Input,
  InputNumber,
  ObjectContainer,
  Password,
  Radio,
  Select,
  Space,
  Switch,
  Text,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload
} from '@formily/antdv-prototypes'
import { SettingsForm } from '@formily/antdv-settings-form'
import { defineComponent } from 'vue'
import ActionsWidget from './widgets/actions-widget'
import LogoWidget from './widgets/logo-widget'
import PreviewWidget from './widgets/preview-widget'
import SchemaEditorWidget from './widgets/schema-editor-widget'

GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: '输入控件',
      Layouts: '布局组件',
      Arrays: '自增组件',
      Displays: '展示组件'
    }
  },
  'en-US': {
    sources: {
      Inputs: 'Inputs',
      Layouts: 'Layouts',
      Arrays: 'Arrays',
      Displays: 'Displays'
    }
  }
})
export const App = defineComponent({
  setup() {
    const engine = createDesigner({
      shortcuts: [],
      rootComponentName: 'Form'
    })
    const sources = {
      Inputs: [
        Input,
        Password,
        InputNumber,
        Switch,
        Checkbox,
        Radio,
        DatePicker,
        TimePicker,
        Select,
        TreeSelect,
        Cascader,
        Transfer,
        Upload,
        ObjectContainer
      ],
      Layouts: [FormGrid, FormTab, FormLayout, FormCollapse, Space],
      Arrays: [ArrayCards, ArrayItems, ArrayTable],
      Displays: [Text]
    }
    const components = {
      Form,
      Field,
      Input,
      Select,
      TreeSelect,
      Cascader,
      Radio,
      Checkbox,
      Transfer,
      Password,
      DatePicker,
      TimePicker,
      Upload,
      Switch,
      InputNumber,
      Text,
      FormGrid,
      Card,
      Space,
      FormCollapse,
      FormTab,
      FormLayout,
      ArrayCards,
      ArrayTable,
      ArrayItems,
      ObjectContainer
    }
    return () => {
      return (
        <Designer engine={engine}>
          <Workbench>
            <StudioPanel logo={<LogoWidget />} actions={<ActionsWidget />}>
              <CompositePanel>
                <CompositePanel.Item title="panels.Component" icon="Component">
                  <ResourceWidget title="sources.Inputs" sources={sources.Inputs} />
                  <ResourceWidget title="sources.Layouts" sources={sources.Layouts} />
                  <ResourceWidget title="sources.Arrays" sources={sources.Arrays} />
                  <ResourceWidget title="sources.Displays" sources={sources.Displays} />
                </CompositePanel.Item>
                <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
                  <OutlineTreeWidget />
                </CompositePanel.Item>
                <CompositePanel.Item title="panels.History" icon="History">
                  <HistoryWidget />
                </CompositePanel.Item>
              </CompositePanel>
              <WorkspacePanel>
                <ToolbarPanel>
                  <DesignerToolsWidget></DesignerToolsWidget>
                  <ViewToolsWidget use={['DESIGNABLE', 'JSONTREE', 'PREVIEW']} />
                </ToolbarPanel>
                <ViewportPanel>
                  <ViewPanel type="DESIGNABLE">
                    <ComponentTreeWidget components={components}></ComponentTreeWidget>
                  </ViewPanel>
                  <ViewPanel type="JSONTREE" scrollable={false}>
                    {{
                      default: (tree, onChange) => (
                        <SchemaEditorWidget tree={tree} onChange={onChange}></SchemaEditorWidget>
                      )
                    }}
                  </ViewPanel>
                  <ViewPanel type="PREVIEW" scrollable={false}>
                    {(tree: any) => <PreviewWidget tree={tree}></PreviewWidget>}
                  </ViewPanel>
                </ViewportPanel>
              </WorkspacePanel>
              <SettingsPanel title="panels.PropertySettings">
                <SettingsForm
                  uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  headers={{}}
                ></SettingsForm>
              </SettingsPanel>
            </StudioPanel>
          </Workbench>
        </Designer>
      )
    }
  }
})
export default App
