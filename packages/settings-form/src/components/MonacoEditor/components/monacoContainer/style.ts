import type { CSSProperties } from 'vue/types/jsx'

const styles: Record<'wrapper' | 'fullWidth' | 'hide', CSSProperties> = {
  wrapper: {
    display: 'flex',
    position: 'relative',
    textAlign: 'initial'
  },
  fullWidth: {
    width: '100%'
  },
  hide: {
    display: 'none'
  }
}

export default styles
