import { buildRootStyle } from '@formily/template/lib/build/build-root-style'
import { buildLibrary } from './build-library'
import { buildUmd } from './build-umd'

async function build() {
  await buildRootStyle()
  await buildLibrary()
  await buildUmd()
}

build()
