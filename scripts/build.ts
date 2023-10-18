import { buildLibrary } from './build-library'
// import { buildUmd } from './build-umd'

async function build() {
  await buildLibrary()
  // await buildUmd()
}

build()
