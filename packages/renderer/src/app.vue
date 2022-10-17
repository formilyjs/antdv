<template>
  <Designer :engine="engine">
    <Workbench>
      <StudioPanel>
        <template #logo>
          <!-- <LogoWidget /> -->
        </template>
        <template #actions>
          <actions-widget></actions-widget>
        </template>
        <CompositePanel>
          <CompositePanelItem title="panels.Component" icon="Component">
            <ResourceWidget title="sources.Inputs" :sources="sources.Inputs" />
            <ResourceWidget
              title="sources.Layouts"
              :sources="sources.Layouts"
            />
            <ResourceWidget title="sources.Arrays" :sources="sources.Arrays" />
            <ResourceWidget
              title="sources.Displays"
              :sources="sources.Displays"
            />
          </CompositePanelItem>
          <CompositePanelItem title="panels.OutlinedTree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanelItem>
          <CompositePanelItem title="panels.History" icon="History">
            <HistoryWidget />
          </CompositePanelItem>
        </CompositePanel>
        <WorkspacePanel>
          <ToolbarPanel>
            <DesignerToolsWidget></DesignerToolsWidget>
            <ViewToolsWidget :use="['DESIGNABLE', 'JSONTREE', 'PREVIEW']" />
          </ToolbarPanel>
          <ViewportPanel>
            <ViewPanel type="DESIGNABLE">
              <ComponentTreeWidget
                :components="components"
              ></ComponentTreeWidget>
            </ViewPanel>
            <ViewPanel type="JSONTREE" :scrollable="false">
              <template #default="tree, onChange">
                <SchemaEditorWidget
                  :tree="tree"
                  @change="onChange"
                ></SchemaEditorWidget>
              </template>
            </ViewPanel>
            <ViewPanel type="PREVIEW" :scrollable="false">
              <template #default="tree, onChange">
                <PreviewWidget :tree="tree"></PreviewWidget>
              </template>
            </ViewPanel>
          </ViewportPanel>
        </WorkspacePanel>
        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm
            uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :headers="{}"
          ></SettingsForm>
        </SettingsPanel>
      </StudioPanel>
    </Workbench>
  </Designer>
</template>
<script lnag="ts">
import {
  Designer,
  TextWidget,
  ComponentTreeWidget,
  SettingsPanel,
  ViewToolsWidget,
  Workbench,
  StudioPanel,
  IconWidget,
  CompositePanel,
  WorkspacePanel,
  ResourceWidget,
  ToolbarPanel,
  DesignerToolsWidget,
  ViewportPanel,
  OutlineTreeWidget,
  ViewPanel,
  HistoryWidget,
} from '@formily/antdv-designable'

import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer'
import { defineComponent } from '@vue/composition-api'
import { createDesigner, GlobalRegistry } from '@designable/core'
import { SettingsForm } from '@formily/antdv-settings-form'
import {
  Form,
  Field,
  Input,
  Select,
  Cascader,
  Radio,
  Checkbox,
  Transfer,
  Password,
  DatePicker,
  TimePicker,
  Upload,
  Switch,
  Text,
  Card,
  ArrayCards,
  ObjectContainer,
  ArrayTable,
  Space,
  FormTab,
  FormCollapse,
  FormLayout,
  FormGrid,
  InputNumber,
} from '@formily/antdv-prototypes'
import { Form as FormilyForm } from '@formily/antdv'

GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: '输入控件',
      Layouts: '布局组件',
      Arrays: '自增组件',
      Displays: '展示组件',
    },
  },
  'en-US': {
    sources: {
      Inputs: 'Inputs',
      Layouts: 'Layouts',
      Arrays: 'Arrays',
      Displays: 'Displays',
    },
  },
})

export default defineComponent({
  components: {
    Designer,
    TextWidget,
    Workbench,
    StudioPanel,
    ResourceWidget,
    ViewToolsWidget,
    IconWidget,
    IconWidgetProvider: IconWidget.Provider,
    CompositePanel,
    CompositePanelItem: CompositePanel.Item,
    WorkspacePanel,
    ToolbarPanel,
    DesignerToolsWidget,
    ViewportPanel,
    ViewPanel,
    OutlineTreeWidget,
    HistoryWidget,
    SettingsPanel,
    SettingsForm,
    ComponentTreeWidget,
    FormilyForm,
  },
  setup() {
    const engine = createDesigner({
      shortcuts: [],
      rootComponentName: 'Form',
    })

    return {
      engine,
      components: {
        Form,
        Field,
        Input,
        Select,
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
        ObjectContainer,
        ArrayTable,
      },
      sources: {
        Inputs: [
          Input,
          Password,
          InputNumber,
          Select,
          Cascader,
          Transfer,
          Checkbox,
          Radio,
          DatePicker,
          TimePicker,
          Upload,
          Switch,
          ObjectContainer,
        ],
        Arrays: [ArrayCards, ArrayTable],
        Displays: [Text],
        Layouts: [FormGrid, FormTab, FormLayout, FormCollapse, Space],
      },
    }
  },
})
</script>
