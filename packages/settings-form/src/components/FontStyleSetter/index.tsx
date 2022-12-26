import { usePrefix, IconWidget } from '@formily/antdv-designable'
import { observer } from '@formily/reactive-vue'
import { useField, Field, FragmentComponent } from '@formily/vue'
import { Radio, InputNumber } from '@formily/antdv'
import cls from 'classnames'
import { defineComponent, unref } from 'vue-demi'
import { FoldItem } from '../FoldItem'
import { InputItems } from '../InputItems'
import { SizeInput } from '../SizeInput'
import { ColorInput } from '../ColorInput'
import { Select } from './select'

// export interface IFontStyleSetterProps {}

const createFontFamilyOptions = (fonts: string[]) => {
  return fonts.map((font) => {
    const splited = font.split('=')
    const label = splited?.[0]
    const value = splited?.[1]
    return {
      component: () => {
        return <span style={{ fontFamily: value }}>{label}</span>
      },
      label: label,
      value,
    }
  })
}
const FontFamilyOptions = createFontFamilyOptions([
  '宋体=SimSun',
  '微软雅黑=Microsoft Yahei',
  '苹方=PingFang SC',
  'Andale Mono=andale mono,monospace',
  'Arial=arial,helvetica,sans-serif',
  'Arial Black=arial black,sans-serif',
  'Book Antiqua=book antiqua,palatino,serif',
  'Comic Sans MS=comic sans ms,sans-serif',
  'Courier New=courier new,courier,monospace',
  'Georgia=georgia,palatino,serif',
  'Helvetica Neue=Helvetica Neue',
  'Helvetica=helvetica,arial,sans-serif',
  'Impact=impact,sans-serif',
  'Symbol=symbol',
  'Tahoma=tahoma,arial,helvetica,sans-serif',
  'Terminal=terminal,monaco,monospace',
  'Times New Roman=times new roman,times,serif',
  'Trebuchet MS=trebuchet ms,geneva,sans-serif',
  'Verdana=verdana,geneva,sans-serif',
])

export const FontStyleSetter = observer(
  defineComponent({
    setup() {
      const fieldRef = useField()
      const prefixRef = usePrefix('font-style-setter')
      return () => {
        const prefix = prefixRef.value
        const field = unref(fieldRef)
        return (
          <FoldItem
            label={field.title}
            class={cls(prefix)}
            scopedSlots={{
              base: () => (
                <Field
                  name="fontFamily"
                  basePath={field.address.parent()}
                  component={[
                    Select,
                    { style: { width: '100%' }, placeholder: 'Helvetica Neue' },
                  ]}
                  dataSource={FontFamilyOptions}
                />
              ),
              extra: () => (
                <InputItems>
                  <InputItems.Item icon="FontWeight" width="50%">
                    <Field
                      name="fontWeight"
                      basePath={field.address.parent()}
                      component={[
                        InputNumber,
                        { placeholder: '400', size: 'small' },
                      ]}
                    />
                  </InputItems.Item>
                  <InputItems.Item icon="FontStyle" width="50%">
                    <Field
                      name="fontStyle"
                      basePath={field.address.parent()}
                      dataSource={[
                        {
                          infer: 'NormalFontStyle',
                          label: ({ option }) => {
                            return <IconWidget props={option} />
                          },
                          value: 'normal',
                        },
                        {
                          infer: 'ItalicFontStyle',
                          label: ({ option }) => {
                            return <IconWidget props={option} />
                          },
                          value: 'italic',
                        },
                      ]}
                      component={[
                        Radio.Group,
                        { optionType: 'button', size: 'small' },
                      ]}
                    />
                  </InputItems.Item>
                  <InputItems.Item icon="FontColor" width="100%">
                    <Field
                      name="color"
                      basePath={field.address.parent()}
                      component={[ColorInput]}
                    />
                  </InputItems.Item>
                  <InputItems.Item icon="FontSize" width="50%">
                    <Field
                      name="fontSize"
                      basePath={field.address.parent()}
                      component={[SizeInput, { exclude: ['auto'] }]}
                    />
                  </InputItems.Item>
                  <InputItems.Item icon="LineHeight" width="50%">
                    <Field
                      name="lineHeight"
                      basePath={field.address.parent()}
                      component={[SizeInput, { exclude: ['auto'] }]}
                    />
                  </InputItems.Item>
                  <InputItems.Item icon="TextAlign">
                    <Field
                      name="textAlign"
                      basePath={field.address.parent()}
                      dataSource={[
                        {
                          infer: 'TextAlignLeft',
                          label: ({ option }) => {
                            return <IconWidget props={option} />
                          },
                          value: 'left',
                        },
                        {
                          infer: 'TextAlignCenter',
                          label: ({ option }) => {
                            return <IconWidget props={option} />
                          },
                          value: 'center',
                        },
                        {
                          infer: 'TextAlignRight',
                          label: ({ option }) => {
                            return <IconWidget props={option} />
                          },
                          value: 'right',
                        },
                        {
                          infer: 'TextAlignJustify',
                          label: ({ option }) => {
                            return <IconWidget props={option} />
                          },
                          value: 'justify',
                        },
                      ]}
                      component={[
                        Radio.Group,
                        { optionType: 'button', size: 'small' },
                      ]}
                    />
                  </InputItems.Item>
                  <InputItems.Item icon="TextDecoration">
                    <Field
                      name="textDecoration"
                      basePath={field.address.parent()}
                      dataSource={[
                        {
                          label: '--',
                          value: 'none',
                        },
                        {
                          infer: 'TextUnderline',
                          label: ({ option }) => {
                            return <IconWidget props={option} />
                          },
                          value: 'underline',
                        },
                        {
                          infer: 'TextLineThrough',
                          label: ({ option }) => {
                            return <IconWidget props={option} />
                          },
                          value: 'line-through',
                        },
                      ]}
                      component={[
                        Radio.Group,
                        { optionType: 'button', size: 'small' },
                      ]}
                    />
                  </InputItems.Item>
                </InputItems>
              ),
            }}
          ></FoldItem>
        )
      }
    },
  })
)
