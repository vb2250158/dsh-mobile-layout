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

test('bundle patch replaces the official layout row', async () => {
  const patch = await readFile(new URL('../cordis.patch.yml', import.meta.url), 'utf8')
  assert.equal(patch, '- id: ui-layout\n  name: dsh-mobile-layout\n')
})

test('client exports the mobile breakpoint and preserves desktop column behavior', async () => {
  const client = await loadClient()
  assert.deepEqual(client.inject, ['slots', 'theme', 'locale'])
  assert.equal(client.isMobileViewport(767), true)
  assert.equal(client.isMobileViewport(768), false)
  assert.deepEqual(client.computeDesktopColumns(1440, 280, 360), {
    sidebar: 280,
    center: 800,
    details: 360,
  })
})

test('client bundle contains the single-row controls, drawer, overflow menu, and mobile details surface', async () => {
  const bundle = await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')
  assert.match(bundle, /dsh-mobile-layout-top-button/)
  assert.match(bundle, /dsh-mobile-layout-drawer/)
  assert.match(bundle, /dsh-mobile-layout-scrim/)
  assert.match(bundle, /dsh-mobile-layout-more-menu/)
  assert.match(bundle, /data-dsh-mobile-view-tabs/)
  assert.match(bundle, /dsh-mobile-layout-mobile-details/)
  assert.match(bundle, /aria-modal/)
})
