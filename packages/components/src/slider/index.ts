import { Slider as AntdSlider } from 'ant-design-vue'
import { connect, mapProps } from '@formily/vue'

export const Slider = connect(AntdSlider, mapProps({}))

export default Slider
