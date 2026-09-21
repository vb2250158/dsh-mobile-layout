import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

async function loadClient() {
  let entry
  const previousWindow = globalThis.window
  globalThis.window = { __ModuleLoader__: { load(value) { entry = value } } }
  try {
    await import(`../lib/client.js?test=${Date.now()}-${Math.random()}`)
    assert.equal(entry.id, 'dsh-mobile-layout')
    return entry.factory((id) => {
      if (id === '@deepseek-ai/dsh-client-runtime/client') return { defineStore: value => value }
      if (id === 'react') return {}
      if (id === 'react/jsx-runtime') return {}
      return {}
    })
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
  }
}

test('bundle patch inserts the compact adapter beside the official layout', async () => {
  const patch = await readFile(new URL('../cordis.patch.yml', import.meta.url), 'utf8')
  assert.equal(patch.replaceAll('\r\n', '\n'), '- insert:\n    - id: mobile-layout\n      name: dsh-mobile-layout\n')
})

test('client selects compact mode from the live container ratio', async () => {
  const client = await loadClient()
  assert.deepEqual(client.inject, ['slots', 'locale', 'layout'])
  assert.equal(client.isCompactViewport(767, 700), true)
  assert.equal(client.isCompactViewport(768, 600), false)
  assert.equal(client.isCompactViewport(834, 1194), true)
  assert.equal(client.isCompactViewport(1024, 768), false)
})

test('client bundle contains the single-row controls, proportional drawer, and overflow menu', async () => {
  const bundle = await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')
  assert.match(bundle, /dsh-mobile-layout-top-button/)
  assert.match(bundle, /data-dsh-mobile-sidebar/)
  assert.match(bundle, /dsh-mobile-layout-scrim/)
  assert.match(bundle, /dsh-mobile-layout-more-menu/)
  assert.match(bundle, /data-dsh-mobile-view-tabs/)
  assert.match(bundle, /conversation\.session\.header/)
  assert.match(bundle, /data-dsh-mobile-settings-open/)
  assert.match(bundle, /data-dsh-mobile-settings-nav-list/)
  assert.match(bundle, /shell\.overlay/)
  assert.doesNotMatch(bundle, /React\.createElement/)
})


test('compact layout ignores transcript and sidebar activity but updates header and dialogs', { skip: !process.env.DSH_SOURCE_ROOT }, async () => {
  const { createRequire } = await import('node:module')
  const { resolve } = await import('node:path')
  const require = createRequire(resolve(process.env.DSH_SOURCE_ROOT, 'packages/client/ui-primitives/package.json'))
  const { JSDOM } = require('jsdom')
  const dom = new JSDOM('<main><aside></aside><section data-slot="conversation.session.header"></section><article><span></span></article></main>')
  const previous = globalThis.Element; globalThis.Element = dom.window.Element
  try {
    const client = await loadClient(), doc = dom.window.document, frame = doc.querySelector('main')
    const record = (target, addedNodes = [], removedNodes = []) => ({ target, addedNodes, removedNodes })
    assert.equal(client.affectsCompactLayout([record(doc.querySelector('article span'))], frame), false)
    assert.equal(client.affectsCompactLayout([record(doc.querySelector('aside'))], frame), false)
    assert.equal(client.affectsCompactLayout([record(doc.querySelector('section'))], frame), true)
    const dialog = doc.createElement('div'); dialog.setAttribute('role', 'dialog'); dialog.setAttribute('aria-modal', 'true')
    assert.equal(client.affectsCompactLayout([record(doc.querySelector('aside'), [dialog])], frame), true)
    assert.equal(client.affectsCompactLayout([record(doc.querySelector('aside'), [], [dialog])], frame), true)
    assert.equal(client.affectsCompactLayout([record(frame)], frame), true)
  } finally { globalThis.Element = previous; dom.window.close() }
})
