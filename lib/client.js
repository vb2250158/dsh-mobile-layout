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
var styles_default = ".dsh-mobile-layout-host {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n}\n\n[data-dsh-mobile-compact] {\n  display: block !important;\n  grid-template-columns: 0 minmax(0, 1fr) 0 !important;\n}\n\n[data-dsh-mobile-compact] > [data-dsh-mobile-sidebar] {\n  position: absolute;\n  inset: 0 auto 0 0;\n  z-index: 31;\n  width: var(--dsh-mobile-drawer-width) !important;\n  min-width: 0;\n  overflow: hidden;\n  transform: translateX(-100%);\n  border-right: 1px solid var(--dsw-alias-border-l1);\n  box-shadow: 12px 0 36px rgb(0 0 0 / 22%);\n  transition: transform 220ms var(--ds-ease-in-out);\n}\n\n[data-dsh-mobile-compact][data-dsh-mobile-drawer-open] > [data-dsh-mobile-sidebar] {\n  transform: translateX(0);\n}\n\n[data-dsh-mobile-compact] > [data-dsh-mobile-conversation] {\n  position: absolute;\n  inset: calc(48px + env(safe-area-inset-top)) 0 0;\n  min-width: 0;\n  overflow: hidden;\n}\n\n[data-dsh-mobile-compact] > [data-dsh-mobile-details] {\n  display: none !important;\n}\n\n[data-dsh-mobile-compact] > [data-dsh-mobile-handle] {\n  display: none !important;\n}\n\n[data-dsh-mobile-compact] [data-dsh-mobile-session-header] {\n  display: none !important;\n}\n\n.dsh-mobile-layout-topbar {\n  position: absolute;\n  inset: 0 0 auto;\n  z-index: 12;\n  height: calc(48px + env(safe-area-inset-top));\n  box-sizing: border-box;\n  background: var(--dsw-alias-bg-base);\n  border-bottom: 1px solid var(--dsw-alias-border-l1);\n}\n\n.dsh-mobile-layout-top-button {\n  position: absolute;\n  top: calc(env(safe-area-inset-top) + 2px);\n  z-index: 42;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  padding: 0;\n  border: 0;\n  border-radius: 12px;\n  color: inherit;\n  background: transparent;\n  cursor: pointer;\n  pointer-events: auto;\n  touch-action: manipulation;\n}\n\n.dsh-mobile-layout-top-button:active,\n.dsh-mobile-layout-top-button[aria-expanded='true'] {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.dsh-mobile-layout-menu-button {\n  left: max(6px, env(safe-area-inset-left));\n}\n\n.dsh-mobile-layout-more-button {\n  right: max(6px, env(safe-area-inset-right));\n}\n\n.dsh-mobile-layout-more-menu {\n  position: absolute;\n  top: calc(env(safe-area-inset-top) + 50px);\n  right: max(8px, env(safe-area-inset-right));\n  z-index: 42;\n  width: min(280px, calc(100vw - 16px));\n  max-height: min(70vh, 520px);\n  overflow: auto;\n  padding: 6px;\n  box-sizing: border-box;\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 14px;\n  background: var(--dsw-alias-bg-elevated, var(--dsw-alias-bg-base));\n  box-shadow: 0 12px 36px rgb(0 0 0 / 24%);\n  pointer-events: auto;\n}\n\n.dsh-mobile-layout-more-item,\n.dsh-mobile-layout-more-info {\n  display: flex;\n  width: 100%;\n  min-height: 44px;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 12px;\n  box-sizing: border-box;\n  border: 0;\n  border-radius: 10px;\n  color: var(--dsw-alias-label-primary);\n  background: transparent;\n  font: inherit;\n  text-align: left;\n}\n\n.dsh-mobile-layout-more-item {\n  cursor: pointer;\n}\n\n.dsh-mobile-layout-more-item:active {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.dsh-mobile-layout-more-info {\n  color: var(--dsw-alias-label-secondary);\n}\n\n.dsh-mobile-layout-more-check {\n  flex: none;\n  width: 16px;\n  color: var(--dsw-alias-state-business-primary);\n}\n\n.dsh-mobile-layout-more-label {\n  min-width: 0;\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.dsh-mobile-layout-scrim {\n  position: absolute;\n  inset: 0;\n  z-index: 30;\n  padding: 0;\n  border: 0;\n  background: rgb(0 0 0 / 48%);\n  cursor: default;\n  pointer-events: auto;\n  animation: dsh-mobile-layout-fade-in 160ms ease-out;\n}\n\n@keyframes dsh-mobile-layout-fade-in {\n  from { opacity: 0; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  [data-dsh-mobile-compact] > [data-dsh-mobile-sidebar],\n  .dsh-mobile-layout-scrim {\n    transition: none;\n    animation: none;\n  }\n}\n";

// src/client.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var COMPACT_BREAKPOINT = 768;
var COMPACT_BREAKPOINT_MIN = 720;
var COMPACT_BREAKPOINT_MAX = 920;
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
  return width < COMPACT_BREAKPOINT || width <= proportionalBreakpoint;
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
  children[0]?.setAttribute("data-dsh-mobile-sidebar", "");
  children[1]?.setAttribute("data-dsh-mobile-conversation", "");
  children[2]?.setAttribute("data-dsh-mobile-details", "");
  for (const child of children) {
    if (child.hasAttribute("data-side")) child.setAttribute("data-dsh-mobile-handle", "");
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
