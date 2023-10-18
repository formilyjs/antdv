import { genStyleHook } from '../__builtins__'

export default genStyleHook('array-table', (token) => {
  const {
    componentCls,
    antCls,
    colorErrorBorder,
    fontSizeSM,
    colorBgBase,
    colorBorder,
    colorBgContainer
  } = token
  const itemCls = `${antCls}-formily-form-item`

  return {
    [componentCls]: {
      [`${componentCls}-pagination`]: {
        display: 'flex',
        justifyContent: 'center',

        [`${componentCls}-status-select.has-error`]: {
          [`${antCls}-select-selector`]: {
            borderColor: `${colorErrorBorder} !important`
          }
        }
      },
      [`${antCls}-table`]: {
        td: {
          visibility: 'visible',
          [`${itemCls}`]: {
            marginBottom: '0 !important',

            [`${itemCls}-help`]: {
              position: 'absolute',
              fontSize: fontSizeSM,
              top: '100%',
              background: colorBgBase,
              width: '100%',
              marginTop: 3,
              padding: 3,
              zIndex: 1,
              borderRadius: 3,
              boxShadow: `0 0 10px ${colorBorder}`,
              animation: 'none',
              transform: 'translateY(0)',
              opacity: 1
            }
          }
        }
      },

      [`${componentCls}-sort-helper`]: {
        background: colorBgContainer,
        border: `1px solid ${colorBorder}`,
        zIndex: 10
      }
    }
  }
})
