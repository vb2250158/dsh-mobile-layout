# dsh-mobile-layout

## 0.2.7：聊天更新不再触发布局测量

仅页头、设置对话框和外层结构变更触发布局刷新；窗口变化与同一帧内的 DOM 变化合并处理。聊天流和侧栏任务状态更新不再触发整页测量，卸载时取消待执行刷新。

Refresh compact layout only for header, settings dialog, shell structure, or size changes. Coalesce refreshes within one frame and cancel pending work on disposal; transcript and sidebar activity no longer force layout measurements.


Ratio-aware compact shell layer for DeepSeek Harness Web.

## Behavior

- Wide landscape screens keep the complete standard DSH layout unchanged.
- Compact mode covers container widths up to and including 1280 CSS px, including common tablet landscape sizes. Taller portrait screens also use compact mode when their width is at most 75% of their height, capped at 1440 px; wider landscape screens keep the desktop layout.
- The desktop session header is replaced by one 48 px mobile bar with no second row.
- The far-left menu button turns the existing DSH sidebar into a proportional overlay drawer; it does not duplicate or replace sidebar content.
- The far-right overflow button contains view switching, Session log, mode information, and other header actions.
- The drawer closes from its own sidebar toggle, the backdrop, `Escape`, or after switching sessions.
- Tool details open as a full-width mobile overlay instead of squeezing the conversation.
- Existing sidebar, workspace, conversation, settings, layout service, and overlay plugins remain mounted because this plugin extends `shell.overlay` instead of replacing the official layout module.

## Install

Add the package as a Web profile bundle and restart DSH. Its `cordis.patch.yml` inserts one adapter row after the official Web bundle; the official `ui-layout` row must remain enabled.

## Development

```powershell
npm install
npm run check
```

Settings layout overrides apply only inside the compact layout. Desktop uses the official centered dialog; compact screens retain the edge-fitting dialog and horizontal settings navigation.
