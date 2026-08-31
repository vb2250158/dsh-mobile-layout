import { useCallback, useEffect, useRef, useState } from 'react'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import STYLES from './styles.css'

export const COMPACT_BREAKPOINT = 768
export const COMPACT_BREAKPOINT_MIN = 720
export const COMPACT_BREAKPOINT_MAX = 920
export const COMPACT_PORTRAIT_RATIO = 0.75

const STYLE_ID = 'dsh-mobile-layout/client.css'
const NS = 'mobile-layout'

const zh = {
  'menu.open': '打开菜单',
  'menu.close': '关闭菜单',
  'more.open': '更多',
  'more.close': '关闭更多菜单',
} as const

const en = {
  'menu.open': 'Open menu',
  'menu.close': 'Close menu',
  'more.open': 'More',
  'more.close': 'Close more menu',
} as const

type LocaleKey = keyof typeof zh

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    'mobile-layout': LocaleKey
  }
}

export function isCompactViewport(width: number, height = width): boolean {
  const proportionalBreakpoint = Math.min(
    COMPACT_BREAKPOINT_MAX,
    Math.max(COMPACT_BREAKPOINT_MIN, Math.round(height * COMPACT_PORTRAIT_RATIO)),
  )
  return width < COMPACT_BREAKPOINT || width <= proportionalBreakpoint
}

interface MobileMenuItem {
  id: string
  label: string
  selected: boolean
  activate: () => void
}

function textLabel(element: Element): string {
  return element.getAttribute('aria-label')?.trim() || element.textContent?.trim() || ''
}

function collectMobileMenuItems(frame: HTMLElement | null): { items: MobileMenuItem[]; info: string[] } {
  if (frame === null) return { items: [], info: [] }
  const items: MobileMenuItem[] = []
  const labels = new Set<string>()
  const addButton = (button: HTMLButtonElement, id: string, selected = false): void => {
    const label = textLabel(button)
    if (label === '' || labels.has(label)) return
    labels.add(label)
    items.push({ id, label, selected, activate: () => { button.click() } })
  }

  frame.querySelectorAll<HTMLButtonElement>('[data-dsh-mobile-view-tabs] button[role="tab"]').forEach((button, index) => {
    addButton(button, `view-${index}`, button.getAttribute('aria-selected') === 'true')
  })
  frame.querySelectorAll<HTMLButtonElement>('[data-dsh-mobile-header-actions] button, [data-dsh-mobile-header-utilities] button').forEach((button, index) => {
    addButton(button, `action-${index}`)
  })

  const info = Array.from(frame.querySelectorAll<HTMLElement>('[data-dsh-mobile-header-actions] > :not(button)'))
    .map(textLabel)
    .filter(label => label !== '' && !labels.has(label))
  return { items, info }
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function MoreIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="5" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="19" cy="12" r="1.6" fill="currentColor" />
    </svg>
  )
}

function annotateFrame(frame: HTMLElement): void {
  const children = Array.from(frame.children)
  const sidebar = children[0] as HTMLElement | undefined
  sidebar?.setAttribute('data-dsh-mobile-sidebar', '')
  children[1]?.setAttribute('data-dsh-mobile-conversation', '')
  children[2]?.setAttribute('data-dsh-mobile-details', '')
  for (const child of children) {
    if (child.hasAttribute('data-side')) child.setAttribute('data-dsh-mobile-handle', '')
  }

  const settingsDialog = sidebar?.querySelector<HTMLElement>('[role="dialog"][aria-modal="true"]') ?? null
  frame.toggleAttribute('data-dsh-mobile-settings-open', settingsDialog !== null)
  if (settingsDialog !== null) {
    settingsDialog.dataset.dshMobileSettingsDialog = ''
    settingsDialog.children[0]?.setAttribute('data-dsh-mobile-settingsNav', '')
    settingsDialog.children[1]?.setAttribute('data-dsh-mobile-settingsContent', '')
    settingsDialog.children[0]?.children[1]?.setAttribute('data-dsh-mobile-settingsNavList', '')
  }

  const header = frame.querySelector<HTMLElement>('[data-dsh-mobile-conversation] [data-slot="conversation.session.header"] > header')
  if (header === null) return
  header.dataset.dshMobileSessionHeader = ''
  const titleRow = header.firstElementChild as HTMLElement | null
  const titleCluster = titleRow?.firstElementChild as HTMLElement | null
  const actions = titleCluster?.lastElementChild as HTMLElement | null
  const utilities = titleRow?.lastElementChild as HTMLElement | null
  if (actions !== null && actions !== undefined) actions.dataset.dshMobileHeaderActions = ''
  if (utilities !== null && utilities !== undefined && utilities !== titleCluster) utilities.dataset.dshMobileHeaderUtilities = ''
  const tabs = header.querySelector<HTMLElement>('[role="tablist"]')
  if (tabs !== null) tabs.dataset.dshMobileViewTabs = ''
}

type CompactOverlayProps = PropsRuntime<'shell.overlay'> & PropsLocale<'mobile-layout'> & {
  toggleSidebar: () => void
}

function CompactOverlay({ toggleSidebar, t, useSessions }: CompactOverlayProps) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<HTMLElement | null>(null)
  const expandedForDrawer = useRef(false)
  const [compact, setCompact] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [revision, setRevision] = useState(0)
  const currentSession = useSessions(state => state.current)
  const previousSession = useRef(currentSession)

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
    if (expandedForDrawer.current) {
      expandedForDrawer.current = false
      toggleSidebar()
    }
  }, [toggleSidebar])

  useEffect(() => {
    const overlay = hostRef.current?.closest<HTMLElement>('[data-shell-overlay]')
    const frame = overlay?.parentElement
    if (frame === null || frame === undefined) return
    frameRef.current = frame

    const refresh = (): void => {
      const rect = frame.getBoundingClientRect()
      const nextCompact = rect.width > 0 && rect.height > 0 && isCompactViewport(rect.width, rect.height)
      setCompact(nextCompact)
      frame.toggleAttribute('data-dsh-mobile-compact', nextCompact)
      frame.style.setProperty('--dsh-mobile-drawer-width', `${Math.max(0, Math.round(Math.min(rect.width * 0.86, rect.width - 48)))}px`)
      annotateFrame(frame)
      setRevision(value => value + 1)
    }

    refresh()
    const resizeObserver = new ResizeObserver(refresh)
    const mutationObserver = new MutationObserver(refresh)
    resizeObserver.observe(frame)
    mutationObserver.observe(frame, { childList: true, subtree: true })
    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      frame.removeAttribute('data-dsh-mobile-compact')
      frame.removeAttribute('data-dsh-mobile-drawer-open')
      frame.removeAttribute('data-dsh-mobile-settings-open')
      frame.style.removeProperty('--dsh-mobile-drawer-width')
      frameRef.current = null
    }
  }, [])

  useEffect(() => {
    const frame = frameRef.current
    if (frame === null) return
    frame.toggleAttribute('data-dsh-mobile-drawer-open', compact && drawerOpen)
    if (!compact && drawerOpen) closeDrawer()
  }, [closeDrawer, compact, drawerOpen])

  useEffect(() => {
    if (previousSession.current !== currentSession && drawerOpen) closeDrawer()
    previousSession.current = currentSession
  }, [closeDrawer, currentSession, drawerOpen])

  useEffect(() => {
    if (!drawerOpen && !moreOpen) return
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape') return
      if (moreOpen) setMoreOpen(false)
      else closeDrawer()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => { document.removeEventListener('keydown', onKeyDown) }
  }, [closeDrawer, drawerOpen, moreOpen])

  if (!compact) return <div ref={hostRef} className="dsh-mobile-layout-host" />

  const menu = collectMobileMenuItems(frameRef.current)
  const hasMore = menu.items.length > 0 || menu.info.length > 0
  void revision

  return (
    <div ref={hostRef} className="dsh-mobile-layout-host">
      <div className="dsh-mobile-layout-topbar" aria-hidden="true" />
      <button
        type="button"
        className="dsh-mobile-layout-top-button dsh-mobile-layout-menu-button"
        aria-label={drawerOpen ? t('menu.close') : t('menu.open')}
        aria-expanded={drawerOpen}
        onClick={() => {
          setMoreOpen(false)
          if (drawerOpen) {
            closeDrawer()
            return
          }
          const frame = frameRef.current
          if (frame?.hasAttribute('data-sidebar-collapsed')) {
            expandedForDrawer.current = true
            toggleSidebar()
          }
          setDrawerOpen(true)
        }}
      >
        <MenuIcon />
      </button>
      {hasMore && (
        <div data-dsh-mobile-more>
          <button
            type="button"
            className="dsh-mobile-layout-top-button dsh-mobile-layout-more-button"
            aria-label={moreOpen ? t('more.close') : t('more.open')}
            aria-expanded={moreOpen}
            onClick={() => {
              closeDrawer()
              setMoreOpen(open => !open)
            }}
          >
            <MoreIcon />
          </button>
          {moreOpen && (
            <div className="dsh-mobile-layout-more-menu" role="menu">
              {menu.info.map((label, index) => (
                <div key={`info-${index}`} className="dsh-mobile-layout-more-info">
                  <span className="dsh-mobile-layout-more-check" />
                  <span className="dsh-mobile-layout-more-label">{label}</span>
                </div>
              ))}
              {menu.items.map(item => (
                <button
                  key={item.id}
                  type="button"
                  className="dsh-mobile-layout-more-item"
                  role="menuitem"
                  onClick={() => {
                    item.activate()
                    setMoreOpen(false)
                  }}
                >
                  <span className="dsh-mobile-layout-more-check">{item.selected ? '✓' : ''}</span>
                  <span className="dsh-mobile-layout-more-label">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {drawerOpen && (
        <button type="button" className="dsh-mobile-layout-scrim" aria-label={t('menu.close')} onClick={closeDrawer} />
      )}
    </div>
  )
}

export const inject = ['slots', 'locale', 'layout']

export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'mobile-layout: dictionaries')
  ctx.effect(() => {
    const tag = document.createElement('style')
    tag.dataset.pluginCss = STYLE_ID
    tag.textContent = STYLES
    document.head.append(tag)
    return () => { tag.remove() }
  }, 'mobile-layout: stylesheet')

  ctx.slots.inject('shell.overlay', () => ctx.slots.register({
    name: 'shell.overlay',
    id: 'mobile-layout',
    order: -100,
    locale: NS,
    inject: () => ({ toggleSidebar: () => { ctx.layout.toggleSidebar() } }),
  }, CompactOverlay))
}
