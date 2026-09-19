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
  COMPACT_BREAKPOINT: () => COMPACT_BREAKPOINT,
  COMPACT_BREAKPOINT_MAX: () => COMPACT_BREAKPOINT_MAX,
  COMPACT_BREAKPOINT_MIN: () => COMPACT_BREAKPOINT_MIN,
  COMPACT_PORTRAIT_RATIO: () => COMPACT_PORTRAIT_RATIO,
  apply: () => apply,
  inject: () => inject,
  isCompactViewport: () => isCompactViewport
});
module.exports = __toCommonJS(client_exports);
var import_react = require("react");

// src/styles.css
var styles_default = ".dsh-mobile-layout-host {\r\n  position: absolute;\r\n  inset: 0;\r\n  pointer-events: none;\r\n}\r\n\r\n[data-dsh-mobile-compact] {\r\n  display: block !important;\r\n  grid-template-columns: 0 minmax(0, 1fr) 0 !important;\r\n}\r\n\r\n[data-dsh-mobile-compact] > [data-dsh-mobile-sidebar] {\r\n  position: absolute;\r\n  inset: 0 auto 0 0;\r\n  z-index: 31;\r\n  width: var(--dsh-mobile-drawer-width) !important;\r\n  min-width: 0;\r\n  overflow: hidden;\r\n  transform: translateX(-100%);\r\n  border-right: 1px solid var(--dsw-alias-border-l1);\r\n  box-shadow: 12px 0 36px rgb(0 0 0 / 22%);\r\n  transition: transform 220ms var(--ds-ease-in-out);\r\n}\r\n\r\n[data-dsh-mobile-compact][data-dsh-mobile-drawer-open] > [data-dsh-mobile-sidebar] {\r\n  transform: translateX(0);\r\n}\r\n\r\n[data-dsh-mobile-compact][data-dsh-mobile-settings-open] > [data-dsh-mobile-sidebar] {\r\n  inset: 0;\r\n  width: 100% !important;\r\n  transform: none !important;\r\n  border-right: 0;\r\n  box-shadow: none;\r\n}\r\n\r\n[data-dsh-mobile-compact] [data-dsh-mobile-settings-open] .dsh-mobile-layout-topbar,\r\n[data-dsh-mobile-compact] [data-dsh-mobile-settings-open] .dsh-mobile-layout-top-button {\r\n  display: none;\r\n}\r\n\r\n[data-dsh-mobile-compact] > [data-dsh-mobile-conversation] {\r\n  position: absolute;\r\n  inset: calc(48px + env(safe-area-inset-top)) 0 0;\r\n  min-width: 0;\r\n  overflow: hidden;\r\n}\r\n\r\n[data-dsh-mobile-compact] > [data-dsh-mobile-details] {\r\n  display: none !important;\r\n}\r\n\r\n[data-dsh-mobile-compact] > [data-dsh-mobile-handle] {\r\n  display: none !important;\r\n}\r\n\r\n[data-dsh-mobile-compact] [data-dsh-mobile-session-header] {\r\n  display: none !important;\r\n}\r\n\r\n[data-dsh-mobile-compact] [data-dsh-mobile-settings-dialog] {\r\n  width: calc(100% - 16px) !important;\r\n  height: calc(100% - 16px) !important;\r\n  max-width: none !important;\r\n  max-height: none !important;\r\n  margin: 8px;\r\n  flex-direction: column !important;\r\n}\r\n\r\n[data-dsh-mobile-compact] [data-dsh-mobile-settings-nav] {\r\n  width: 100% !important;\r\n  height: auto !important;\r\n  flex: none !important;\r\n  border-right: 0 !important;\r\n  border-bottom: 1px solid var(--dsw-alias-border-l1);\r\n}\r\n\r\n[data-dsh-mobile-compact] [data-dsh-mobile-settings-nav-list] {\r\n  display: flex !important;\r\n  flex-direction: row !important;\r\n  gap: 4px;\r\n  width: 100%;\r\n  overflow-x: auto !important;\r\n  overflow-y: hidden !important;\r\n  padding: 4px 12px 10px !important;\r\n  box-sizing: border-box;\r\n  scrollbar-width: none;\r\n}\r\n\r\n[data-dsh-mobile-compact] [data-dsh-mobile-settings-nav-list]::-webkit-scrollbar {\r\n  display: none;\r\n}\r\n\r\n[data-dsh-mobile-compact] [data-dsh-mobile-settings-nav-list] > * {\r\n  flex: none !important;\r\n  width: auto !important;\r\n  min-width: max-content;\r\n  white-space: nowrap;\r\n}\r\n\r\n[data-dsh-mobile-compact] [data-dsh-mobile-settings-content] {\r\n  width: 100% !important;\r\n  min-width: 0 !important;\r\n  min-height: 0 !important;\r\n  flex: 1 !important;\r\n}\r\n\r\n.dsh-mobile-layout-topbar {\r\n  position: absolute;\r\n  inset: 0 0 auto;\r\n  z-index: 12;\r\n  height: calc(48px + env(safe-area-inset-top));\r\n  box-sizing: border-box;\r\n  background: var(--dsw-alias-bg-base);\r\n  border-bottom: 1px solid var(--dsw-alias-border-l1);\r\n}\r\n\r\n.dsh-mobile-layout-top-button {\r\n  position: absolute;\r\n  top: calc(env(safe-area-inset-top) + 2px);\r\n  z-index: 42;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 44px;\r\n  height: 44px;\r\n  padding: 0;\r\n  border: 0;\r\n  border-radius: 12px;\r\n  color: inherit;\r\n  background: transparent;\r\n  cursor: pointer;\r\n  pointer-events: auto;\r\n  touch-action: manipulation;\r\n}\r\n\r\n.dsh-mobile-layout-top-button:active,\r\n.dsh-mobile-layout-top-button[aria-expanded='true'] {\r\n  background: var(--dsw-alias-interactive-bg-hover);\r\n}\r\n\r\n.dsh-mobile-layout-menu-button {\r\n  left: max(6px, env(safe-area-inset-left));\r\n}\r\n\r\n.dsh-mobile-layout-more-button {\r\n  right: max(6px, env(safe-area-inset-right));\r\n}\r\n\r\n.dsh-mobile-layout-more-menu {\r\n  position: absolute;\r\n  top: calc(env(safe-area-inset-top) + 50px);\r\n  right: max(8px, env(safe-area-inset-right));\r\n  z-index: 42;\r\n  width: min(280px, calc(100vw - 16px));\r\n  max-height: min(70vh, 520px);\r\n  overflow: auto;\r\n  padding: 6px;\r\n  box-sizing: border-box;\r\n  border: 1px solid var(--dsw-alias-border-l2);\r\n  border-radius: 14px;\r\n  background: var(--dsw-alias-bg-elevated, var(--dsw-alias-bg-base));\r\n  box-shadow: 0 12px 36px rgb(0 0 0 / 24%);\r\n  pointer-events: auto;\r\n}\r\n\r\n.dsh-mobile-layout-more-item,\r\n.dsh-mobile-layout-more-info {\r\n  display: flex;\r\n  width: 100%;\r\n  min-height: 44px;\r\n  align-items: center;\r\n  gap: 10px;\r\n  padding: 10px 12px;\r\n  box-sizing: border-box;\r\n  border: 0;\r\n  border-radius: 10px;\r\n  color: var(--dsw-alias-label-primary);\r\n  background: transparent;\r\n  font: inherit;\r\n  text-align: left;\r\n}\r\n\r\n.dsh-mobile-layout-more-item {\r\n  cursor: pointer;\r\n}\r\n\r\n.dsh-mobile-layout-more-item:active {\r\n  background: var(--dsw-alias-interactive-bg-hover);\r\n}\r\n\r\n.dsh-mobile-layout-more-info {\r\n  color: var(--dsw-alias-label-secondary);\r\n}\r\n\r\n.dsh-mobile-layout-more-check {\r\n  flex: none;\r\n  width: 16px;\r\n  color: var(--dsw-alias-state-business-primary);\r\n}\r\n\r\n.dsh-mobile-layout-more-label {\r\n  min-width: 0;\r\n  flex: 1;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n}\r\n\r\n.dsh-mobile-layout-scrim {\r\n  position: absolute;\r\n  inset: 0;\r\n  z-index: 30;\r\n  padding: 0;\r\n  border: 0;\r\n  background: rgb(0 0 0 / 48%);\r\n  cursor: default;\r\n  pointer-events: auto;\r\n  animation: dsh-mobile-layout-fade-in 160ms ease-out;\r\n}\r\n\r\n@keyframes dsh-mobile-layout-fade-in {\r\n  from { opacity: 0; }\r\n}\r\n\r\n@media (prefers-reduced-motion: reduce) {\r\n  [data-dsh-mobile-compact] > [data-dsh-mobile-sidebar],\r\n  .dsh-mobile-layout-scrim {\r\n    transition: none;\r\n    animation: none;\r\n  }\r\n}\r\n";

// src/client.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var COMPACT_BREAKPOINT = 1280;
var COMPACT_BREAKPOINT_MIN = 720;
var COMPACT_BREAKPOINT_MAX = 1440;
var COMPACT_PORTRAIT_RATIO = 0.75;
var STYLE_ID = "dsh-mobile-layout/client.css";
var NS = "mobile-layout";
var zh = {
  "menu.open": "\u6253\u5F00\u83DC\u5355",
  "menu.close": "\u5173\u95ED\u83DC\u5355",
  "more.open": "\u66F4\u591A",
  "more.close": "\u5173\u95ED\u66F4\u591A\u83DC\u5355"
};
var en = {
  "menu.open": "Open menu",
  "menu.close": "Close menu",
  "more.open": "More",
  "more.close": "Close more menu"
};
function isCompactViewport(width, height = width) {
  const proportionalBreakpoint = Math.min(
    COMPACT_BREAKPOINT_MAX,
    Math.max(COMPACT_BREAKPOINT_MIN, Math.round(height * COMPACT_PORTRAIT_RATIO))
  );
  return width <= COMPACT_BREAKPOINT || width <= proportionalBreakpoint;
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
function MenuIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 7h16M4 12h16M4 17h16", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }) });
}
function MoreIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "5", cy: "12", r: "1.6", fill: "currentColor" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "1.6", fill: "currentColor" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "19", cy: "12", r: "1.6", fill: "currentColor" })
  ] });
}
function annotateFrame(frame) {
  const children = Array.from(frame.children);
  const sidebar = children[0];
  sidebar?.setAttribute("data-dsh-mobile-sidebar", "");
  children[1]?.setAttribute("data-dsh-mobile-conversation", "");
  children[2]?.setAttribute("data-dsh-mobile-details", "");
  for (const child of children) {
    if (child.hasAttribute("data-side")) child.setAttribute("data-dsh-mobile-handle", "");
  }
  const settingsDialog = sidebar?.querySelector('[role="dialog"][aria-modal="true"]') ?? null;
  frame.toggleAttribute("data-dsh-mobile-settings-open", settingsDialog !== null);
  if (settingsDialog !== null) {
    settingsDialog.dataset.dshMobileSettingsDialog = "";
    settingsDialog.children[0]?.setAttribute("data-dsh-mobile-settings-nav", "");
    settingsDialog.children[1]?.setAttribute("data-dsh-mobile-settings-content", "");
    settingsDialog.children[0]?.children[1]?.setAttribute("data-dsh-mobile-settings-nav-list", "");
  }
  const header = frame.querySelector('[data-dsh-mobile-conversation] [data-slot="conversation.session.header"] > header');
  if (header === null) return;
  header.dataset.dshMobileSessionHeader = "";
  const titleRow = header.firstElementChild;
  const titleCluster = titleRow?.firstElementChild;
  const actions = titleCluster?.lastElementChild;
  const utilities = titleRow?.lastElementChild;
  if (actions !== null && actions !== void 0) actions.dataset.dshMobileHeaderActions = "";
  if (utilities !== null && utilities !== void 0 && utilities !== titleCluster) utilities.dataset.dshMobileHeaderUtilities = "";
  const tabs = header.querySelector('[role="tablist"]');
  if (tabs !== null) tabs.dataset.dshMobileViewTabs = "";
}
function CompactOverlay({ toggleSidebar, t, useSessions }) {
  const hostRef = (0, import_react.useRef)(null);
  const frameRef = (0, import_react.useRef)(null);
  const expandedForDrawer = (0, import_react.useRef)(false);
  const [compact, setCompact] = (0, import_react.useState)(false);
  const [drawerOpen, setDrawerOpen] = (0, import_react.useState)(false);
  const [moreOpen, setMoreOpen] = (0, import_react.useState)(false);
  const [revision, setRevision] = (0, import_react.useState)(0);
  const currentSession = useSessions((state) => state.current);
  const previousSession = (0, import_react.useRef)(currentSession);
  const closeDrawer = (0, import_react.useCallback)(() => {
    setDrawerOpen(false);
    if (expandedForDrawer.current) {
      expandedForDrawer.current = false;
      toggleSidebar();
    }
  }, [toggleSidebar]);
  (0, import_react.useEffect)(() => {
    const overlay = hostRef.current?.closest("[data-shell-overlay]");
    const frame = overlay?.parentElement;
    if (frame === null || frame === void 0) return;
    frameRef.current = frame;
    const refresh = () => {
      const rect = frame.getBoundingClientRect();
      const nextCompact = rect.width > 0 && rect.height > 0 && isCompactViewport(rect.width, rect.height);
      setCompact(nextCompact);
      frame.toggleAttribute("data-dsh-mobile-compact", nextCompact);
      frame.style.setProperty("--dsh-mobile-drawer-width", `${Math.max(0, Math.round(Math.min(rect.width * 0.86, rect.width - 48)))}px`);
      annotateFrame(frame);
      setRevision((value) => value + 1);
    };
    refresh();
    const resizeObserver = new ResizeObserver(refresh);
    const mutationObserver = new MutationObserver(refresh);
    resizeObserver.observe(frame);
    mutationObserver.observe(frame, { childList: true, subtree: true });
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      frame.removeAttribute("data-dsh-mobile-compact");
      frame.removeAttribute("data-dsh-mobile-drawer-open");
      frame.removeAttribute("data-dsh-mobile-settings-open");
      frame.style.removeProperty("--dsh-mobile-drawer-width");
      frameRef.current = null;
    };
  }, []);
  (0, import_react.useEffect)(() => {
    const frame = frameRef.current;
    if (frame === null) return;
    frame.toggleAttribute("data-dsh-mobile-drawer-open", compact && drawerOpen);
    if (!compact && drawerOpen) closeDrawer();
  }, [closeDrawer, compact, drawerOpen]);
  (0, import_react.useEffect)(() => {
    if (previousSession.current !== currentSession && drawerOpen) closeDrawer();
    previousSession.current = currentSession;
  }, [closeDrawer, currentSession, drawerOpen]);
  (0, import_react.useEffect)(() => {
    if (!drawerOpen && !moreOpen) return;
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (moreOpen) setMoreOpen(false);
      else closeDrawer();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeDrawer, drawerOpen, moreOpen]);
  if (!compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: hostRef, className: "dsh-mobile-layout-host" });
  const menu = collectMobileMenuItems(frameRef.current);
  const hasMore = menu.items.length > 0 || menu.info.length > 0;
  void revision;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: hostRef, className: "dsh-mobile-layout-host", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-mobile-layout-topbar", "aria-hidden": "true" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        type: "button",
        className: "dsh-mobile-layout-top-button dsh-mobile-layout-menu-button",
        "aria-label": drawerOpen ? t("menu.close") : t("menu.open"),
        "aria-expanded": drawerOpen,
        onClick: () => {
          setMoreOpen(false);
          if (drawerOpen) {
            closeDrawer();
            return;
          }
          const frame = frameRef.current;
          if (frame?.hasAttribute("data-sidebar-collapsed")) {
            expandedForDrawer.current = true;
            toggleSidebar();
          }
          setDrawerOpen(true);
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuIcon, {})
      }
    ),
    hasMore && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { "data-dsh-mobile-more": true, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          type: "button",
          className: "dsh-mobile-layout-top-button dsh-mobile-layout-more-button",
          "aria-label": moreOpen ? t("more.close") : t("more.open"),
          "aria-expanded": moreOpen,
          onClick: () => {
            closeDrawer();
            setMoreOpen((open) => !open);
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoreIcon, {})
        }
      ),
      moreOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-mobile-layout-more-menu", role: "menu", children: [
        menu.info.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-mobile-layout-more-info", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsh-mobile-layout-more-check" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsh-mobile-layout-more-label", children: label })
        ] }, `info-${index}`)),
        menu.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            type: "button",
            className: "dsh-mobile-layout-more-item",
            role: "menuitem",
            onClick: () => {
              item.activate();
              setMoreOpen(false);
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsh-mobile-layout-more-check", children: item.selected ? "\u2713" : "" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsh-mobile-layout-more-label", children: item.label })
            ]
          },
          item.id
        ))
      ] })
    ] }),
    drawerOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "dsh-mobile-layout-scrim", "aria-label": t("menu.close"), onClick: closeDrawer })
  ] });
}
var inject = ["slots", "locale", "layout"];
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
  ctx.slots.inject("shell.overlay", () => ctx.slots.register({
    name: "shell.overlay",
    id: "mobile-layout",
    order: -100,
    locale: NS,
    inject: () => ({ toggleSidebar: () => {
      ctx.layout.toggleSidebar();
    } })
  }, CompactOverlay));
}

    return module.exports
  },
})
