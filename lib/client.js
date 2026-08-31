window.__ModuleLoader__.load({
  id: 'dsh-mobile-layout',
  factory: (require) => {
    var module = { exports: {} }
    var exports = module.exports
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client.tsx
var client_exports = {};
__export(client_exports, {
  CENTER_MIN: () => CENTER_MIN,
  DETAILS_DEFAULT: () => DETAILS_DEFAULT,
  DETAILS_MAX: () => DETAILS_MAX,
  DETAILS_MIN: () => DETAILS_MIN,
  LayoutController: () => LayoutController,
  MOBILE_BREAKPOINT: () => MOBILE_BREAKPOINT,
  MOBILE_BREAKPOINT_MAX: () => MOBILE_BREAKPOINT_MAX,
  MOBILE_BREAKPOINT_MIN: () => MOBILE_BREAKPOINT_MIN,
  MOBILE_PORTRAIT_RATIO: () => MOBILE_PORTRAIT_RATIO,
  ResponsiveFrame: () => ResponsiveFrame,
  SIDEBAR_COLLAPSED: () => SIDEBAR_COLLAPSED,
  SIDEBAR_DEFAULT: () => SIDEBAR_DEFAULT,
  SIDEBAR_MAX: () => SIDEBAR_MAX,
  SIDEBAR_MIN: () => SIDEBAR_MIN,
  apply: () => apply,
  computeDesktopColumns: () => computeDesktopColumns,
  inject: () => inject,
  isMobileViewport: () => isMobileViewport
});
module.exports = __toCommonJS(client_exports);
var import_react = require("react");
var import_client = require("@deepseek-ai/dsh-client-runtime/client");

// src/styles.css
var styles_default = ".dsh-mobile-layout-frame {\n  position: relative;\n  display: grid;\n  grid-template-rows: 100%;\n  height: 100%;\n  overflow: hidden;\n  background: var(--dsw-alias-bg-base);\n  transition: grid-template-columns var(--ds-transition-duration-slow) var(--ds-ease-in-out);\n}\n\n.dsh-mobile-layout-frame[data-dragging] {\n  transition: none;\n}\n\n.dsh-mobile-layout-sidebar {\n  min-width: 0;\n  overflow: hidden;\n  background: var(--dsw-specific-sidebar-fill);\n  border-right: 1px solid var(--dsw-alias-border-l1);\n}\n\n.dsh-mobile-layout-center {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n\n.dsh-mobile-layout-details {\n  min-width: 0;\n  overflow: hidden;\n  border-left: 1px solid var(--dsw-alias-border-l2);\n}\n\n.dsh-mobile-layout-frame[data-details-collapsed] .dsh-mobile-layout-details {\n  border-left: none;\n}\n\n.dsh-mobile-layout-handle {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 8px;\n  margin-left: -4px;\n  cursor: col-resize;\n  z-index: 2;\n  touch-action: none;\n  transition: left var(--ds-transition-duration-slow) var(--ds-ease-in-out);\n}\n\n.dsh-mobile-layout-frame[data-dragging] .dsh-mobile-layout-handle {\n  transition: none;\n}\n\n.dsh-mobile-layout-handle[data-side='details']::after {\n  content: '';\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 12px;\n  height: 32px;\n  border-radius: 10px;\n  box-sizing: border-box;\n  background: var(--dsw-alias-button-floating-fill);\n  border: 1px solid var(--dsw-alias-border-l2-darkmode-thin);\n  opacity: 0;\n  transition: opacity var(--ds-transition-duration-slow) var(--ds-ease-in-out);\n}\n\n.dsh-mobile-layout-details:hover ~ .dsh-mobile-layout-handle[data-side='details']::after,\n.dsh-mobile-layout-handle[data-side='details']:hover::after,\n.dsh-mobile-layout-handle[data-side='details'][data-dragging='true']::after {\n  opacity: 1;\n}\n\n.dsh-mobile-layout-overlay {\n  position: absolute;\n  inset: 0;\n  z-index: 50;\n  pointer-events: none;\n}\n\n.dsh-mobile-layout-overlay > * {\n  pointer-events: auto;\n}\n\n.dsh-mobile-layout-frame[data-mobile] {\n  display: flex;\n  flex-direction: column;\n}\n\n.dsh-mobile-layout-mobile-topbar {\n  position: relative;\n  z-index: 12;\n  flex: none;\n  height: calc(48px + env(safe-area-inset-top));\n  box-sizing: border-box;\n  background: var(--dsw-alias-bg-base);\n  border-bottom: 1px solid var(--dsw-alias-border-l1);\n}\n\n.dsh-mobile-layout-top-button {\n  position: absolute;\n  top: calc(env(safe-area-inset-top) + 4px);\n  z-index: 14;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  padding: 0;\n  border: 0;\n  border-radius: 12px;\n  color: inherit;\n  background: transparent;\n  cursor: pointer;\n  touch-action: manipulation;\n}\n\n.dsh-mobile-layout-top-button:active,\n.dsh-mobile-layout-top-button[aria-expanded='true'] {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.dsh-mobile-layout-menu-button {\n  left: max(6px, env(safe-area-inset-left));\n}\n\n.dsh-mobile-layout-more-button {\n  right: max(6px, env(safe-area-inset-right));\n}\n\n.dsh-mobile-layout-mobile-content {\n  min-height: 0;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n\n[data-dsh-mobile-session-header] {\n  display: none !important;\n}\n\n[data-dsh-mobile-header-actions],\n[data-dsh-mobile-header-utilities],\n[data-dsh-mobile-view-tabs] {\n  display: none !important;\n}\n\n.dsh-mobile-layout-more-menu {\n  position: absolute;\n  top: calc(env(safe-area-inset-top) + 50px);\n  right: max(8px, env(safe-area-inset-right));\n  z-index: 42;\n  width: min(280px, calc(100vw - 16px));\n  max-height: min(70vh, 520px);\n  overflow: auto;\n  padding: 6px;\n  box-sizing: border-box;\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 14px;\n  background: var(--dsw-alias-bg-elevated, var(--dsw-alias-bg-base));\n  box-shadow: 0 12px 36px rgb(0 0 0 / 24%);\n}\n\n.dsh-mobile-layout-more-item,\n.dsh-mobile-layout-more-info {\n  display: flex;\n  width: 100%;\n  min-height: 44px;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 12px;\n  box-sizing: border-box;\n  border: 0;\n  border-radius: 10px;\n  color: var(--dsw-alias-label-primary);\n  background: transparent;\n  font: inherit;\n  text-align: left;\n}\n\n.dsh-mobile-layout-more-item {\n  cursor: pointer;\n}\n\n.dsh-mobile-layout-more-item:active {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.dsh-mobile-layout-more-info {\n  color: var(--dsw-alias-label-secondary);\n}\n\n.dsh-mobile-layout-more-check {\n  flex: none;\n  width: 16px;\n  color: var(--dsw-alias-state-business-primary);\n}\n\n.dsh-mobile-layout-more-label {\n  min-width: 0;\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.dsh-mobile-layout-scrim {\n  position: absolute;\n  inset: 0;\n  z-index: 30;\n  padding: 0;\n  border: 0;\n  background: rgb(0 0 0 / 48%);\n  cursor: default;\n  animation: dsh-mobile-layout-fade-in 160ms ease-out;\n}\n\n.dsh-mobile-layout-drawer {\n  position: absolute;\n  inset: 0 auto 0 0;\n  z-index: 31;\n  overflow: hidden;\n  background: var(--dsw-specific-sidebar-fill);\n  border-right: 1px solid var(--dsw-alias-border-l1);\n  box-shadow: 12px 0 36px rgb(0 0 0 / 22%);\n  animation: dsh-mobile-layout-drawer-in 220ms var(--ds-ease-in-out);\n}\n\n.dsh-mobile-layout-drawer > * {\n  width: 100% !important;\n}\n\n.dsh-mobile-layout-mobile-details {\n  position: absolute;\n  inset: calc(48px + env(safe-area-inset-top)) 0 0;\n  z-index: 20;\n  overflow: hidden;\n  background: var(--dsw-alias-bg-base);\n}\n\n@keyframes dsh-mobile-layout-fade-in {\n  from { opacity: 0; }\n}\n\n@keyframes dsh-mobile-layout-drawer-in {\n  from { transform: translateX(-100%); }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .dsh-mobile-layout-frame,\n  .dsh-mobile-layout-handle,\n  .dsh-mobile-layout-scrim,\n  .dsh-mobile-layout-drawer {\n    transition: none;\n    animation: none;\n  }\n}\n";

// src/client.tsx
var MOBILE_BREAKPOINT = 768;
var MOBILE_BREAKPOINT_MIN = 720;
var MOBILE_BREAKPOINT_MAX = 920;
var MOBILE_PORTRAIT_RATIO = 0.75;
var SIDEBAR_DEFAULT = 280;
var SIDEBAR_MIN = 264;
var SIDEBAR_MAX = 420;
var SIDEBAR_COLLAPSED = 56;
var DETAILS_DEFAULT = 360;
var DETAILS_MIN = 300;
var DETAILS_MAX = 520;
var CENTER_MIN = 640;
var STYLE_ID = "dsh-mobile-layout/client.css";
var DARK_ATTRIBUTE = "data-ds-dark-theme";
var NS = "mobile-layout";
var zh = {
  "menu.open": "\u6253\u5F00\u83DC\u5355",
  "menu.close": "\u5173\u95ED\u83DC\u5355",
  "menu.title": "\u5BFC\u822A\u83DC\u5355",
  "more.open": "\u66F4\u591A",
  "more.close": "\u5173\u95ED\u66F4\u591A\u83DC\u5355"
};
var en = {
  "menu.open": "Open menu",
  "menu.close": "Close menu",
  "menu.title": "Navigation menu",
  "more.open": "More",
  "more.close": "Close more menu"
};
function isMobileViewport(width, height = width) {
  const proportionalBreakpoint = Math.min(
    MOBILE_BREAKPOINT_MAX,
    Math.max(MOBILE_BREAKPOINT_MIN, Math.round(height * MOBILE_PORTRAIT_RATIO))
  );
  return width < MOBILE_BREAKPOINT || width <= proportionalBreakpoint;
}
function clampWidth(width, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, Math.round(width)));
}
function computeDesktopColumns(viewport, sidebar, details) {
  const sidebarWidth = sidebar === 0 ? SIDEBAR_COLLAPSED : clampWidth(sidebar, SIDEBAR_MIN, SIDEBAR_MAX);
  const preferredDetails = details === 0 ? 0 : clampWidth(details, DETAILS_MIN, DETAILS_MAX);
  if (sidebarWidth + preferredDetails + CENTER_MIN <= viewport) {
    return { sidebar: sidebarWidth, center: viewport - sidebarWidth - preferredDetails, details: preferredDetails };
  }
  const reducedDetails = preferredDetails === 0 ? 0 : Math.max(DETAILS_MIN, viewport - sidebarWidth - CENTER_MIN);
  if (sidebarWidth + reducedDetails + CENTER_MIN <= viewport) {
    return { sidebar: sidebarWidth, center: CENTER_MIN, details: reducedDetails };
  }
  return { sidebar: sidebarWidth, center: Math.max(0, viewport - sidebarWidth), details: 0 };
}
function createLayoutStore() {
  return (0, import_client.defineStore)({
    init: () => ({ sidebar: SIDEBAR_DEFAULT, details: 0, mobile: false, mobileMenuOpen: false }),
    actions: {
      setSidebar: (draft, width) => {
        draft.sidebar = clampWidth(width, SIDEBAR_MIN, SIDEBAR_MAX);
      },
      setDetails: (draft, width) => {
        draft.details = clampWidth(width, DETAILS_MIN, DETAILS_MAX);
      },
      setMobile: (draft, mobile) => {
        if (draft.mobile === mobile) return;
        draft.mobile = mobile;
        draft.mobileMenuOpen = false;
      },
      toggleSidebar: (draft) => {
        if (draft.mobile) draft.mobileMenuOpen = !draft.mobileMenuOpen;
        else draft.sidebar = draft.sidebar === 0 ? SIDEBAR_DEFAULT : 0;
      },
      closeMobileMenu: (draft) => {
        draft.mobileMenuOpen = false;
      },
      openDetails: (draft) => {
        if (draft.details === 0) draft.details = DETAILS_DEFAULT;
      },
      closeDetails: (draft) => {
        draft.details = 0;
      }
    }
  });
}
var LayoutController = class {
  actions;
  attach(actions) {
    this.actions = actions;
  }
  toggleSidebar() {
    this.requireActions().toggleSidebar();
  }
  openDetails() {
    this.requireActions().openDetails();
  }
  closeDetails() {
    this.requireActions().closeDetails();
  }
  requireActions() {
    if (this.actions === void 0) throw new Error("mobile layout actions are not attached");
    return this.actions;
  }
};
var ThemePresenter = class {
  appliedTokens = [];
  themeColorMeta;
  constructor() {
    this.themeColorMeta = document.createElement("meta");
    this.themeColorMeta.name = "theme-color";
  }
  apply(snapshot) {
    const scheme = snapshot.active.colorScheme;
    document.documentElement.style.colorScheme = scheme;
    const body = document.body;
    if (scheme === "dark") body.setAttribute(DARK_ATTRIBUTE, "");
    else body.removeAttribute(DARK_ATTRIBUTE);
    for (const name of this.appliedTokens) body.style.removeProperty(name);
    this.appliedTokens = [];
    for (const [name, value] of Object.entries(snapshot.active.tokens)) {
      body.style.setProperty(name, value);
      this.appliedTokens.push(name);
    }
    this.themeColorMeta.content = getComputedStyle(body).backgroundColor;
    if (!this.themeColorMeta.isConnected) document.head.append(this.themeColorMeta);
  }
  dispose() {
    document.documentElement.style.removeProperty("color-scheme");
    document.body.removeAttribute(DARK_ATTRIBUTE);
    for (const name of this.appliedTokens) document.body.style.removeProperty(name);
    this.appliedTokens = [];
    this.themeColorMeta.remove();
  }
};
function CenterColumn({ children }) {
  return /* @__PURE__ */ React.createElement("div", { className: "dsh-mobile-layout-center" }, children);
}
function DetailsColumn({ children }) {
  return /* @__PURE__ */ React.createElement("div", { className: "dsh-mobile-layout-details" }, children);
}
function MenuIcon() {
  return /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M4 7h16M4 12h16M4 17h16", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }));
}
function MoreIcon() {
  return /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("circle", { cx: "5", cy: "12", r: "1.6", fill: "currentColor" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "1.6", fill: "currentColor" }), /* @__PURE__ */ React.createElement("circle", { cx: "19", cy: "12", r: "1.6", fill: "currentColor" }));
}
function textLabel(element) {
  return element.getAttribute("aria-label")?.trim() || element.textContent?.trim() || "";
}
function collectMobileMenuItems(frame) {
  if (frame === null) return { items: [], info: [] };
  const items = [];
  const labels = /* @__PURE__ */ new Set();
  const addButton = (button, id, selected = false) => {
    const label = textLabel(button);
    if (label === "" || labels.has(label)) return;
    labels.add(label);
    items.push({ id, label, selected, activate: () => {
      button.click();
    } });
  };
  frame.querySelectorAll('[data-dsh-mobile-view-tabs] button[role="tab"]').forEach((button, index) => {
    addButton(button, `view-${index}`, button.getAttribute("aria-selected") === "true");
  });
  frame.querySelectorAll("[data-dsh-mobile-header-actions] button, [data-dsh-mobile-header-utilities] button").forEach((button, index) => {
    addButton(button, `action-${index}`);
  });
  const info = Array.from(frame.querySelectorAll("[data-dsh-mobile-header-actions] > :not(button)")).map(textLabel).filter((label) => label !== "" && !labels.has(label));
  return { items, info };
}
function MobileTopControls({
  frameRef,
  drawerOpen,
  toggleDrawer,
  closeDrawer,
  t
}) {
  const [moreOpen, setMoreOpen] = (0, import_react.useState)(false);
  const [revision, setRevision] = (0, import_react.useState)(0);
  (0, import_react.useEffect)(() => {
    const frame = frameRef.current;
    if (frame === null) return;
    const annotate = () => {
      const header = frame.querySelector(".dsh-mobile-layout-mobile-content > [data-phase] > header");
      if (header === null) return;
      header.dataset.dshMobileSessionHeader = "";
      const titleRow = header.firstElementChild;
      if (titleRow !== null) {
        titleRow.dataset.dshMobileTitleRow = "";
        const titleCluster = titleRow.firstElementChild;
        if (titleCluster !== null) {
          titleCluster.dataset.dshMobileTitleCluster = "";
          const actions = titleCluster.lastElementChild;
          if (actions !== null) actions.dataset.dshMobileHeaderActions = "";
        }
        const utilities = titleRow.lastElementChild;
        if (utilities !== null && utilities !== titleCluster) utilities.dataset.dshMobileHeaderUtilities = "";
      }
      const tabs = header.querySelector('[role="tablist"]');
      if (tabs !== null) tabs.dataset.dshMobileViewTabs = "";
      setRevision((value) => value + 1);
    };
    annotate();
    const observer = new MutationObserver(annotate);
    observer.observe(frame, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
    };
  }, [frameRef]);
  (0, import_react.useEffect)(() => {
    if (!moreOpen) return;
    const onPointerDown = (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-dsh-mobile-more]") !== null) return;
      setMoreOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);
  const menu = collectMobileMenuItems(frameRef.current);
  const hasMore = menu.items.length > 0 || menu.info.length > 0;
  void revision;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: "dsh-mobile-layout-top-button dsh-mobile-layout-menu-button",
      "aria-label": drawerOpen ? t("menu.close") : t("menu.open"),
      "aria-expanded": drawerOpen,
      onClick: () => {
        setMoreOpen(false);
        toggleDrawer();
      }
    },
    /* @__PURE__ */ React.createElement(MenuIcon, null)
  ), hasMore && /* @__PURE__ */ React.createElement("div", { "data-dsh-mobile-more": true }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: "dsh-mobile-layout-top-button dsh-mobile-layout-more-button",
      "aria-label": moreOpen ? t("more.close") : t("more.open"),
      "aria-expanded": moreOpen,
      onClick: () => {
        closeDrawer();
        setMoreOpen((open) => !open);
      }
    },
    /* @__PURE__ */ React.createElement(MoreIcon, null)
  ), moreOpen && /* @__PURE__ */ React.createElement("div", { className: "dsh-mobile-layout-more-menu", role: "menu" }, menu.info.map((label, index) => /* @__PURE__ */ React.createElement("div", { key: `info-${index}`, className: "dsh-mobile-layout-more-info" }, /* @__PURE__ */ React.createElement("span", { className: "dsh-mobile-layout-more-check" }), /* @__PURE__ */ React.createElement("span", { className: "dsh-mobile-layout-more-label" }, label))), menu.items.map((item) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: item.id,
      type: "button",
      className: "dsh-mobile-layout-more-item",
      role: "menuitem",
      onClick: () => {
        item.activate();
        setMoreOpen(false);
      }
    },
    /* @__PURE__ */ React.createElement("span", { className: "dsh-mobile-layout-more-check" }, item.selected ? "\u2713" : ""),
    /* @__PURE__ */ React.createElement("span", { className: "dsh-mobile-layout-more-label" }, item.label)
  )))));
}
function DragHandle(props) {
  const [dragging, setDragging] = (0, import_react.useState)(false);
  const origin = (0, import_react.useRef)(0);
  const latest = (0, import_react.useRef)(0);
  const frame = (0, import_react.useRef)(null);
  const callbacks = (0, import_react.useRef)({ onStart: props.onStart, onDrag: props.onDrag, onEnd: props.onEnd });
  callbacks.current = { onStart: props.onStart, onDrag: props.onDrag, onEnd: props.onEnd };
  const onPointerDown = (0, import_react.useCallback)((event) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    origin.current = event.clientX;
    latest.current = event.clientX;
    callbacks.current.onStart();
    setDragging(true);
  }, []);
  const onPointerMove = (0, import_react.useCallback)((event) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    latest.current = event.clientX;
    frame.current ??= requestAnimationFrame(() => {
      frame.current = null;
      callbacks.current.onDrag(latest.current - origin.current);
    });
  }, []);
  const onPointerUp = (0, import_react.useCallback)((event) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    callbacks.current.onDrag(latest.current - origin.current);
    setDragging(false);
    callbacks.current.onEnd();
  }, []);
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "dsh-mobile-layout-handle",
      style: { left: props.left },
      "data-side": props.side,
      "data-dragging": dragging || void 0,
      onPointerDown,
      onPointerMove,
      onPointerUp
    }
  );
}
function ResponsiveFrame({ useStore, useSessions, actions, renderSlot, t }) {
  const panels = useStore((state) => state);
  const currentSession = useSessions((state) => state.current);
  const detailsSession = useSessions((state) => {
    const current = state.current;
    return current !== void 0 && state.byId[current]?.blank === false ? current : void 0;
  });
  const frameRef = (0, import_react.useRef)(null);
  const [viewport, setViewport] = (0, import_react.useState)(() => ({ width: window.innerWidth, height: window.innerHeight }));
  (0, import_react.useEffect)(() => {
    const element = frameRef.current;
    if (element === null) return;
    let animationFrame = null;
    const observer = new ResizeObserver(() => {
      animationFrame ??= requestAnimationFrame(() => {
        animationFrame = null;
        const rect = element.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) setViewport({ width: rect.width, height: rect.height });
      });
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    };
  }, []);
  const mobile = isMobileViewport(viewport.width, viewport.height);
  (0, import_react.useEffect)(() => {
    actions.setMobile(mobile);
  }, [actions, mobile]);
  const previousSession = (0, import_react.useRef)(currentSession);
  (0, import_react.useEffect)(() => {
    if (mobile && previousSession.current !== currentSession) actions.closeMobileMenu();
    previousSession.current = currentSession;
  }, [actions, currentSession, mobile]);
  const lastDetailsSession = (0, import_react.useRef)(detailsSession);
  (0, import_react.useLayoutEffect)(() => {
    if (detailsSession === void 0) return;
    if (lastDetailsSession.current !== void 0 && lastDetailsSession.current !== detailsSession) actions.closeDetails();
    lastDetailsSession.current = detailsSession;
  }, [actions, detailsSession]);
  (0, import_react.useEffect)(() => {
    if (!mobile || !panels.mobileMenuOpen && panels.details === 0) return;
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (panels.mobileMenuOpen) actions.closeMobileMenu();
      else actions.closeDetails();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [actions, mobile, panels.details, panels.mobileMenuOpen]);
  const sidebarCollapsed = panels.sidebar === 0;
  const columns = computeDesktopColumns(viewport.width, panels.sidebar, detailsSession === void 0 ? 0 : panels.details);
  const columnsRef = (0, import_react.useRef)(columns);
  columnsRef.current = columns;
  const sidebarBase = (0, import_react.useRef)(0);
  const detailsBase = (0, import_react.useRef)(0);
  const [dragging, setDragging] = (0, import_react.useState)(false);
  if (mobile) {
    const drawerWidth = Math.max(0, Math.round(Math.min(viewport.width * 0.86, viewport.width - 48)));
    return /* @__PURE__ */ React.createElement("div", { ref: frameRef, className: "dsh-mobile-layout-frame", "data-mobile": true }, /* @__PURE__ */ React.createElement("div", { className: "dsh-mobile-layout-mobile-topbar", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("div", { className: "dsh-mobile-layout-mobile-content" }, renderSlot("conversation", {})), /* @__PURE__ */ React.createElement(
      MobileTopControls,
      {
        frameRef,
        drawerOpen: panels.mobileMenuOpen,
        toggleDrawer: () => {
          actions.toggleSidebar();
        },
        closeDrawer: () => {
          actions.closeMobileMenu();
        },
        t
      }
    ), detailsSession !== void 0 && panels.details > 0 && /* @__PURE__ */ React.createElement("section", { className: "dsh-mobile-layout-mobile-details" }, renderSlot("details", {})), panels.mobileMenuOpen && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "dsh-mobile-layout-scrim",
        "aria-label": t("menu.close"),
        onClick: () => {
          actions.closeMobileMenu();
        }
      }
    ), /* @__PURE__ */ React.createElement(
      "aside",
      {
        className: "dsh-mobile-layout-drawer",
        style: { width: drawerWidth },
        role: "dialog",
        "aria-modal": "true",
        "aria-label": t("menu.title")
      },
      renderSlot("sidebar", { collapsed: false, width: drawerWidth })
    )), /* @__PURE__ */ React.createElement("div", { className: "dsh-mobile-layout-overlay", "data-shell-overlay": true }, renderSlot("shell.overlay", {})));
  }
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      ref: frameRef,
      className: "dsh-mobile-layout-frame",
      style: { gridTemplateColumns: `${columns.sidebar}px minmax(0, 1fr) ${columns.details}px` },
      "data-sidebar-collapsed": sidebarCollapsed || void 0,
      "data-details-collapsed": columns.details === 0 || void 0,
      "data-dragging": dragging || void 0
    },
    /* @__PURE__ */ React.createElement("div", { className: "dsh-mobile-layout-sidebar" }, renderSlot("sidebar", { collapsed: sidebarCollapsed, width: columns.sidebar })),
    /* @__PURE__ */ React.createElement(CenterColumn, null, renderSlot("conversation", {})),
    /* @__PURE__ */ React.createElement(DetailsColumn, null, renderSlot("details", {})),
    /* @__PURE__ */ React.createElement("div", { className: "dsh-mobile-layout-overlay", "data-shell-overlay": true }, renderSlot("shell.overlay", {})),
    !sidebarCollapsed && /* @__PURE__ */ React.createElement(
      DragHandle,
      {
        side: "sidebar",
        left: columns.sidebar,
        onStart: () => {
          sidebarBase.current = columnsRef.current.sidebar;
          setDragging(true);
        },
        onDrag: (delta) => {
          actions.setSidebar(sidebarBase.current + delta);
        },
        onEnd: () => {
          setDragging(false);
        }
      }
    ),
    columns.details > 0 && /* @__PURE__ */ React.createElement(
      DragHandle,
      {
        side: "details",
        left: viewport.width - columns.details,
        onStart: () => {
          detailsBase.current = columnsRef.current.details;
          setDragging(true);
        },
        onDrag: (delta) => {
          actions.setDetails(detailsBase.current - delta);
        },
        onEnd: () => {
          setDragging(false);
        }
      }
    )
  );
}
var inject = ["slots", "theme", "locale"];
function apply(ctx) {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "mobile-layout: dictionaries");
  ctx.effect(() => {
    const tag = document.createElement("style");
    tag.dataset.pluginCss = STYLE_ID;
    tag.textContent = styles_default;
    document.head.append(tag);
    return () => {
      tag.remove();
    };
  }, "mobile-layout: stylesheet");
  const layout = new LayoutController();
  ctx.effect(() => {
    const disposeService = ctx.reflect.provide("layout", layout);
    const disposeRegistration = ctx.slots.register({
      name: "root",
      children: {
        "sidebar": { kind: "single", scope: "root" },
        "conversation": { kind: "single", scope: "session-maybe" },
        "details": { kind: "single", scope: "session" },
        "shell.overlay": { kind: "list", scope: "root" }
      },
      store: createLayoutStore,
      locale: NS,
      inject: (actions) => {
        layout.attach(actions);
        return {};
      }
    }, ResponsiveFrame);
    return () => {
      disposeRegistration();
      void disposeService();
    };
  }, "mobile-layout: service and root");
  ctx.effect(() => {
    const presenter = new ThemePresenter();
    presenter.apply(ctx.theme.getTheme());
    const off = ctx.on("theme/change", (snapshot) => {
      presenter.apply(snapshot);
    });
    return () => {
      off();
      presenter.dispose();
    };
  }, "mobile-layout: theme presenter");
}

    return module.exports
  },
})
