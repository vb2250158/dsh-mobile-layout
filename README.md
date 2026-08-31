# dsh-mobile-layout

Ratio-aware compact shell layer for DeepSeek Harness Web.

## Behavior

- Wide landscape screens keep the complete standard DSH layout unchanged.
- Compact mode follows both container width and height: portrait screens switch earlier, while sufficiently wide landscape screens keep the desktop layout.
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
