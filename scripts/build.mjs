import { build } from 'esbuild'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const clientResult = await build({
  entryPoints: [resolve(root, 'src/client.tsx')],
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: 'es2022',
  write: false,
  loader: { '.css': 'text' },
  external: ['react', 'react/jsx-runtime', '@deepseek-ai/*'],
  legalComments: 'none',
  logLevel: 'silent',
})
const client = clientResult.outputFiles.at(0)
if (client === undefined) throw new Error('Client build produced no output')
const artifact = `window.__ModuleLoader__.load({\n  id: 'dsh-mobile-layout',\n  factory: (require) => {\n    var module = { exports: {} }\n    var exports = module.exports\n${client.text}\n    return module.exports\n  },\n})\n`

await mkdir(resolve(root, 'lib'), { recursive: true })
await writeFile(resolve(root, 'lib/client.js'), artifact)
await build({
  entryPoints: [resolve(root, 'src/index.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node22',
  outfile: resolve(root, 'lib/index.js'),
  external: ['@deepseek-ai/*'],
  legalComments: 'none',
  logLevel: 'silent',
})
