<template>
  <Form :form="form" :label-col="4" :wrapper-col="10">
    <SchemaField :schema="schema" />
    <FormButtonGroup align-form-item>
      <Submit @submit="onSubmit">提交</Submit>
    </FormButtonGroup>
  </Form>
</template>

<script lang="tsx">
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, FormItem, Upload, Submit, FormButtonGroup } from '@formily/antdv'
import { Button } from 'ant-design-vue'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons-vue'

const UploadButton = () => {
  return <Button>上传图片</Button>
}
const NormalUpload = (props, { attrs }) => {
  return (
    <Upload
      {...props}
      {...attrs}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers={{
        authorization: 'authorization-text'
      }}
    >
      <Button>
        <UploadOutlined />
        上传文件{' '}
      </Button>
    </Upload>
  )
}

const CardUpload = (props, { attrs }) => {
  return (
    <Upload
      {...props}
      {...attrs}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture-card"
      headers={{
        authorization: 'authorization-text'
      }}
    >
      <UploadOutlined style={{ fontSize: 20 }} />
    </Upload>
  )
}

const DraggerUpload = (props, { attrs }) => {
  return (
    <Upload.Dragger {...props} {...attrs} action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
      <p class="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
      <p class="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </Upload.Dragger>
  )
}

const schema = {
  type: 'object',
  properties: {
    base: {
      type: 'array',
      title: '上传',
      'x-decorator': 'FormItem',
      'x-component': 'NormalUpload',
      required: true
    },
    card: {
      type: 'array',
      title: '卡片上传',
      'x-decorator': 'FormItem',
      'x-component': 'CardUpload',
      required: true
    },
    drag: {
      type: 'array',
      title: '拖拽上传',
      'x-decorator': 'FormItem',
      'x-component': 'DraggerUpload',
      required: true
    }
  }
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    NormalUpload,
    CardUpload,
    DraggerUpload,
    FormItem
  }
})

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Form, SchemaField, Submit, FormButtonGroup },
  data() {
    return {
      form,
      schema
    }
  },
  methods: {
    onSubmit(value) {
      console.log(value)
    }
  }
}
</script>
