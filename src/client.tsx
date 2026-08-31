import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent, ReactNode, RefObject } from 'react'
import { defineStore } from '@deepseek-ai/dsh-client-runtime/client'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type { PropsLocale, PropsRenderSlots, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
import type { ThemeSnapshot } from '@deepseek-ai/dsh-client-ui-theme/client'
import STYLES from './styles.css'

export const MOBILE_BREAKPOINT = 768
export const MOBILE_BREAKPOINT_MIN = 720
export const MOBILE_BREAKPOINT_MAX = 920
export const MOBILE_PORTRAIT_RATIO = 0.75
export const SIDEBAR_DEFAULT = 280
export const SIDEBAR_MIN = 264
export const SIDEBAR_MAX = 420
export const SIDEBAR_COLLAPSED = 56
export const DETAILS_DEFAULT = 360
export const DETAILS_MIN = 300
export const DETAILS_MAX = 520
export const CENTER_MIN = 640

const STYLE_ID = 'dsh-mobile-layout/client.css'
const DARK_ATTRIBUTE = 'data-ds-dark-theme'
const NS = 'mobile-layout'

const zh = {
  'menu.open': '打开菜单',
  'menu.close': '关闭菜单',
  'menu.title': '导航菜单',
  'more.open': '更多',
  'more.close': '关闭更多菜单',
} as const

const en = {
  'menu.open': 'Open menu',
  'menu.close': 'Close menu',
  'menu.title': 'Navigation menu',
  'more.open': 'More',
  'more.close': 'Close more menu',
} as const

type LocaleKey = keyof typeof zh

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    'mobile-layout': LocaleKey
  }
  interface SlotMap {
    'sidebar': { kind: 'single'; scope: 'root'; owner: SidebarOwnerProps }
    'conversation': { kind: 'single'; scope: 'session-maybe'; owner: Record<never, never> }
    'details': { kind: 'single'; scope: 'session'; owner: Record<never, never> }
    'shell.overlay': { kind: 'list'; scope: 'root' }
  }
}

declare module '@deepseek-ai/cordis' {
  interface Context {
    layout: LayoutController
  }
}

export interface SidebarOwnerProps {
  collapsed: boolean
  width: number
}

interface LayoutState {
  sidebar: number
  details: number
  mobile: boolean
  mobileMenuOpen: boolean
}

interface LayoutActions {
  setSidebar: (draft: LayoutState, width: number) => void
  setDetails: (draft: LayoutState, width: number) => void
  setMobile: (draft: LayoutState, mobile: boolean) => void
  toggleSidebar: (draft: LayoutState) => void
  closeMobileMenu: (draft: LayoutState) => void
  openDetails: (draft: LayoutState) => void
  closeDetails: (draft: LayoutState) => void
}

export function isMobileViewport(width: number, height = width): boolean {
  const proportionalBreakpoint = Math.min(
    MOBILE_BREAKPOINT_MAX,
    Math.max(MOBILE_BREAKPOINT_MIN, Math.round(height * MOBILE_PORTRAIT_RATIO)),
  )
  return width < MOBILE_BREAKPOINT || width <= proportionalBreakpoint
}

function clampWidth(width: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, Math.round(width)))
}

export function computeDesktopColumns(viewport: number, sidebar: number, details: number) {
  const sidebarWidth = sidebar === 0 ? SIDEBAR_COLLAPSED : clampWidth(sidebar, SIDEBAR_MIN, SIDEBAR_MAX)
  const preferredDetails = details === 0 ? 0 : clampWidth(details, DETAILS_MIN, DETAILS_MAX)
  if (sidebarWidth + preferredDetails + CENTER_MIN <= viewport) {
    return { sidebar: sidebarWidth, center: viewport - sidebarWidth - preferredDetails, details: preferredDetails }
  }
  const reducedDetails = preferredDetails === 0 ? 0 : Math.max(DETAILS_MIN, viewport - sidebarWidth - CENTER_MIN)
  if (sidebarWidth + reducedDetails + CENTER_MIN <= viewport) {
    return { sidebar: sidebarWidth, center: CENTER_MIN, details: reducedDetails }
  }
  return { sidebar: sidebarWidth, center: Math.max(0, viewport - sidebarWidth), details: 0 }
}

function createLayoutStore() {
  return defineStore<LayoutState, LayoutActions>({
    init: () => ({ sidebar: SIDEBAR_DEFAULT, details: 0, mobile: false, mobileMenuOpen: false }),
    actions: {
      setSidebar: (draft, width) => { draft.sidebar = clampWidth(width, SIDEBAR_MIN, SIDEBAR_MAX) },
      setDetails: (draft, width) => { draft.details = clampWidth(width, DETAILS_MIN, DETAILS_MAX) },
      setMobile: (draft, mobile) => {
        if (draft.mobile === mobile) return
        draft.mobile = mobile
        draft.mobileMenuOpen = false
      },
      toggleSidebar: (draft) => {
        if (draft.mobile) draft.mobileMenuOpen = !draft.mobileMenuOpen
        else draft.sidebar = draft.sidebar === 0 ? SIDEBAR_DEFAULT : 0
      },
      closeMobileMenu: (draft) => { draft.mobileMenuOpen = false },
      openDetails: (draft) => { if (draft.details === 0) draft.details = DETAILS_DEFAULT },
      closeDetails: (draft) => { draft.details = 0 },
    },
  })
}

type BoundLayoutActions = {
  setSidebar(width: number): void
  setDetails(width: number): void
  setMobile(mobile: boolean): void
  toggleSidebar(): void
  closeMobileMenu(): void
  openDetails(): void
  closeDetails(): void
}

export class LayoutController {
  private actions: BoundLayoutActions | undefined

  attach(actions: BoundLayoutActions): void {
    this.actions = actions
  }

  toggleSidebar(): void { this.requireActions().toggleSidebar() }
  openDetails(): void { this.requireActions().openDetails() }
  closeDetails(): void { this.requireActions().closeDetails() }

  private requireActions(): BoundLayoutActions {
    if (this.actions === undefined) throw new Error('mobile layout actions are not attached')
    return this.actions
  }
}

class ThemePresenter {
  private appliedTokens: string[] = []
  private readonly themeColorMeta: HTMLMetaElement

  constructor() {
    this.themeColorMeta = document.createElement('meta')
    this.themeColorMeta.name = 'theme-color'
  }

  apply(snapshot: ThemeSnapshot): void {
    const scheme = snapshot.active.colorScheme
    document.documentElement.style.colorScheme = scheme
    const body = document.body
    if (scheme === 'dark') body.setAttribute(DARK_ATTRIBUTE, '')
    else body.removeAttribute(DARK_ATTRIBUTE)
    for (const name of this.appliedTokens) body.style.removeProperty(name)
    this.appliedTokens = []
    for (const [name, value] of Object.entries(snapshot.active.tokens)) {
      body.style.setProperty(name, value)
      this.appliedTokens.push(name)
    }
    this.themeColorMeta.content = getComputedStyle(body).backgroundColor
    if (!this.themeColorMeta.isConnected) document.head.append(this.themeColorMeta)
  }

  dispose(): void {
    document.documentElement.style.removeProperty('color-scheme')
    document.body.removeAttribute(DARK_ATTRIBUTE)
    for (const name of this.appliedTokens) document.body.style.removeProperty(name)
    this.appliedTokens = []
    this.themeColorMeta.remove()
  }
}

function CenterColumn({ children }: { children?: ReactNode }) {
  return <div className="dsh-mobile-layout-center">{children}</div>
}

function DetailsColumn({ children }: { children?: ReactNode }) {
  return <div className="dsh-mobile-layout-details">{children}</div>
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

interface MobileMenuItem {
  id: string
  label: string
  selected: boolean
  activate: () => void
}

function textLabel(element: Element): string {
  return element.getAttribute('aria-label')?.trim() || element.textContent?.trim() || ''
}

function collectMobileMenuItems(frame: HTMLDivElement | null): { items: MobileMenuItem[]; info: string[] } {
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

function MobileTopControls({
  frameRef,
  drawerOpen,
  toggleDrawer,
  closeDrawer,
  t,
}: {
  frameRef: RefObject<HTMLDivElement>
  drawerOpen: boolean
  toggleDrawer: () => void
  closeDrawer: () => void
  t: ResponsiveFrameProps['t']
}) {
  const [moreOpen, setMoreOpen] = useState(false)
  const [revision, setRevision] = useState(0)

  useEffect(() => {
    const frame = frameRef.current
    if (frame === null) return
    const annotate = (): void => {
      const header = frame.querySelector<HTMLElement>('.dsh-mobile-layout-mobile-content > [data-phase] > header')
      if (header === null) return
      header.dataset.dshMobileSessionHeader = ''
      const titleRow = header.firstElementChild as HTMLElement | null
      if (titleRow !== null) {
        titleRow.dataset.dshMobileTitleRow = ''
        const titleCluster = titleRow.firstElementChild as HTMLElement | null
        if (titleCluster !== null) {
          titleCluster.dataset.dshMobileTitleCluster = ''
          const actions = titleCluster.lastElementChild as HTMLElement | null
          if (actions !== null) actions.dataset.dshMobileHeaderActions = ''
        }
        const utilities = titleRow.lastElementChild as HTMLElement | null
        if (utilities !== null && utilities !== titleCluster) utilities.dataset.dshMobileHeaderUtilities = ''
      }
      const tabs = header.querySelector<HTMLElement>('[role="tablist"]')
      if (tabs !== null) tabs.dataset.dshMobileViewTabs = ''
      setRevision(value => value + 1)
    }
    annotate()
    const observer = new MutationObserver(annotate)
    observer.observe(frame, { childList: true, subtree: true })
    return () => { observer.disconnect() }
  }, [frameRef])

  useEffect(() => {
    if (!moreOpen) return
    const onPointerDown = (event: PointerEvent): void => {
      const target = event.target
      if (target instanceof Element && target.closest('[data-dsh-mobile-more]') !== null) return
      setMoreOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setMoreOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [moreOpen])

  const menu = collectMobileMenuItems(frameRef.current)
  const hasMore = menu.items.length > 0 || menu.info.length > 0
  void revision

  return (
    <>
      <button
        type="button"
        className="dsh-mobile-layout-top-button dsh-mobile-layout-menu-button"
        aria-label={drawerOpen ? t('menu.close') : t('menu.open')}
        aria-expanded={drawerOpen}
        onClick={() => {
          setMoreOpen(false)
          toggleDrawer()
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
    </>
  )
}

function DragHandle(props: {
  side: 'sidebar' | 'details'
  left: number
  onStart: () => void
  onDrag: (delta: number) => void
  onEnd: () => void
}) {
  const [dragging, setDragging] = useState(false)
  const origin = useRef(0)
  const latest = useRef(0)
  const frame = useRef<number | null>(null)
  const callbacks = useRef({ onStart: props.onStart, onDrag: props.onDrag, onEnd: props.onEnd })
  callbacks.current = { onStart: props.onStart, onDrag: props.onDrag, onEnd: props.onEnd }

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    origin.current = event.clientX
    latest.current = event.clientX
    callbacks.current.onStart()
    setDragging(true)
  }, [])
  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
    latest.current = event.clientX
    frame.current ??= requestAnimationFrame(() => {
      frame.current = null
      callbacks.current.onDrag(latest.current - origin.current)
    })
  }, [])
  const onPointerUp = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
    event.currentTarget.releasePointerCapture(event.pointerId)
    if (frame.current !== null) cancelAnimationFrame(frame.current)
    frame.current = null
    callbacks.current.onDrag(latest.current - origin.current)
    setDragging(false)
    callbacks.current.onEnd()
  }, [])

  return (
    <div
      className="dsh-mobile-layout-handle"
      style={{ left: props.left }}
      data-side={props.side}
      data-dragging={dragging || undefined}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    />
  )
}

type LayoutStore = ReturnType<typeof createLayoutStore>
type ResponsiveFrameProps = PropsRuntime<'root'>
  & PropsRenderSlots<'sidebar' | 'conversation' | 'details' | 'shell.overlay'>
  & PropsStore<LayoutStore>
  & PropsLocale<'mobile-layout'>

export function ResponsiveFrame({ useStore, useSessions, actions, renderSlot, t }: ResponsiveFrameProps) {
  const panels = useStore(state => state)
  const currentSession = useSessions(state => state.current)
  const detailsSession = useSessions(state => {
    const current = state.current
    return current !== undefined && state.byId[current]?.blank === false ? current : undefined
  })
  const frameRef = useRef<HTMLDivElement | null>(null)
  const [viewport, setViewport] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }))

  useEffect(() => {
    const element = frameRef.current
    if (element === null) return
    let animationFrame: number | null = null
    const observer = new ResizeObserver(() => {
      animationFrame ??= requestAnimationFrame(() => {
        animationFrame = null
        const rect = element.getBoundingClientRect()
        if (rect.width > 0 && rect.height > 0) setViewport({ width: rect.width, height: rect.height })
      })
    })
    observer.observe(element)
    return () => {
      observer.disconnect()
      if (animationFrame !== null) cancelAnimationFrame(animationFrame)
    }
  }, [])

  const mobile = isMobileViewport(viewport.width, viewport.height)
  useEffect(() => { actions.setMobile(mobile) }, [actions, mobile])

  const previousSession = useRef(currentSession)
  useEffect(() => {
    if (mobile && previousSession.current !== currentSession) actions.closeMobileMenu()
    previousSession.current = currentSession
  }, [actions, currentSession, mobile])

  const lastDetailsSession = useRef(detailsSession)
  useLayoutEffect(() => {
    if (detailsSession === undefined) return
    if (lastDetailsSession.current !== undefined && lastDetailsSession.current !== detailsSession) actions.closeDetails()
    lastDetailsSession.current = detailsSession
  }, [actions, detailsSession])

  useEffect(() => {
    if (!mobile || (!panels.mobileMenuOpen && panels.details === 0)) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (panels.mobileMenuOpen) actions.closeMobileMenu()
      else actions.closeDetails()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => { document.removeEventListener('keydown', onKeyDown) }
  }, [actions, mobile, panels.details, panels.mobileMenuOpen])

  const sidebarCollapsed = panels.sidebar === 0
  const columns = computeDesktopColumns(viewport.width, panels.sidebar, detailsSession === undefined ? 0 : panels.details)
  const columnsRef = useRef(columns)
  columnsRef.current = columns
  const sidebarBase = useRef(0)
  const detailsBase = useRef(0)
  const [dragging, setDragging] = useState(false)

  if (mobile) {
    const drawerWidth = Math.max(0, Math.round(Math.min(viewport.width * 0.86, viewport.width - 48)))
    return (
      <div ref={frameRef} className="dsh-mobile-layout-frame" data-mobile>
        <div className="dsh-mobile-layout-mobile-topbar" aria-hidden="true" />
        <div className="dsh-mobile-layout-mobile-content">
          {renderSlot('conversation', {})}
        </div>
        <MobileTopControls
          frameRef={frameRef}
          drawerOpen={panels.mobileMenuOpen}
          toggleDrawer={() => { actions.toggleSidebar() }}
          closeDrawer={() => { actions.closeMobileMenu() }}
          t={t}
        />
        {detailsSession !== undefined && panels.details > 0 && (
          <section className="dsh-mobile-layout-mobile-details">
            {renderSlot('details', {})}
          </section>
        )}
        {panels.mobileMenuOpen && (
          <>
            <button
              type="button"
              className="dsh-mobile-layout-scrim"
              aria-label={t('menu.close')}
              onClick={() => { actions.closeMobileMenu() }}
            />
            <aside
              className="dsh-mobile-layout-drawer"
              style={{ width: drawerWidth }}
              role="dialog"
              aria-modal="true"
              aria-label={t('menu.title')}
            >
              {renderSlot('sidebar', { collapsed: false, width: drawerWidth })}
            </aside>
          </>
        )}
        <div className="dsh-mobile-layout-overlay" data-shell-overlay>
          {renderSlot('shell.overlay', {})}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={frameRef}
      className="dsh-mobile-layout-frame"
      style={{ gridTemplateColumns: `${columns.sidebar}px minmax(0, 1fr) ${columns.details}px` }}
      data-sidebar-collapsed={sidebarCollapsed || undefined}
      data-details-collapsed={columns.details === 0 || undefined}
      data-dragging={dragging || undefined}
    >
      <div className="dsh-mobile-layout-sidebar">
        {renderSlot('sidebar', { collapsed: sidebarCollapsed, width: columns.sidebar })}
      </div>
      <CenterColumn>{renderSlot('conversation', {})}</CenterColumn>
      <DetailsColumn>{renderSlot('details', {})}</DetailsColumn>
      <div className="dsh-mobile-layout-overlay" data-shell-overlay>
        {renderSlot('shell.overlay', {})}
      </div>
      {!sidebarCollapsed && (
        <DragHandle
          side="sidebar"
          left={columns.sidebar}
          onStart={() => { sidebarBase.current = columnsRef.current.sidebar; setDragging(true) }}
          onDrag={(delta) => { actions.setSidebar(sidebarBase.current + delta) }}
          onEnd={() => { setDragging(false) }}
        />
      )}
      {columns.details > 0 && (
        <DragHandle
          side="details"
          left={viewport.width - columns.details}
          onStart={() => { detailsBase.current = columnsRef.current.details; setDragging(true) }}
          onDrag={(delta) => { actions.setDetails(detailsBase.current - delta) }}
          onEnd={() => { setDragging(false) }}
        />
      )}
    </div>
  )
}

export const inject = ['slots', 'theme', 'locale']

export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'mobile-layout: dictionaries')
  ctx.effect(() => {
    const tag = document.createElement('style')
    tag.dataset.pluginCss = STYLE_ID
    tag.textContent = STYLES
    document.head.append(tag)
    return () => { tag.remove() }
  }, 'mobile-layout: stylesheet')

  const layout = new LayoutController()
  ctx.effect(() => {
    const disposeService = ctx.reflect.provide('layout', layout)
    const disposeRegistration = ctx.slots.register({
      name: 'root',
      children: {
        'sidebar': { kind: 'single', scope: 'root' },
        'conversation': { kind: 'single', scope: 'session-maybe' },
        'details': { kind: 'single', scope: 'session' },
        'shell.overlay': { kind: 'list', scope: 'root' },
      },
      store: createLayoutStore,
      locale: NS,
      inject: (actions: BoundLayoutActions) => {
        layout.attach(actions)
        return {}
      },
    }, ResponsiveFrame)
    return () => {
      disposeRegistration()
      void disposeService()
    }
  }, 'mobile-layout: service and root')

  ctx.effect(() => {
    const presenter = new ThemePresenter()
    presenter.apply(ctx.theme.getTheme())
    const off = ctx.on('theme/change', snapshot => { presenter.apply(snapshot) })
    return () => {
      off()
      presenter.dispose()
    }
  }, 'mobile-layout: theme presenter')
}
