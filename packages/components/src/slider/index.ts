import { connect, mapProps } from '@formily/vue'
import { Slider as AntdSlider } from 'ant-design-vue'

export const Slider = connect(AntdSlider, mapProps({}))

export default Slider
