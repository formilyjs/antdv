import 'vue'

declare module 'vue' {
  export interface ComponentCustomProps {
    attrs?: { [key: string]: any }
    props?: { [key: string]: any }
    on?: { [key: string]: any }
  }
}
