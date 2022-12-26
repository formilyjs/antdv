import type { ExtractPropTypes, PropType, Ref } from 'vue-demi'

export const monacoContainerProps = {
  width: {
    type: [Number, String],
    required: true as const,
  },

  height: {
    type: [Number, String],
    required: true as const,
  },

  isEditorReady: {
    type: Boolean,
    required: true as const,
  },

  className: String,

  setContainerRef: Function as PropType<(ref: Ref<HTMLElement | null>) => void>,
}

export type MonacoContainerProps = ExtractPropTypes<typeof monacoContainerProps>
