# dsh-mobile-layout

Responsive shell replacement for DeepSeek Harness Web.

## Behavior

- Desktop screens keep the standard three-column layout, collapsed sidebar rail, details panel, and draggable dividers.
- Screens narrower than `768px` use a single full-width conversation surface.
- The desktop session header is replaced by one 48 px mobile bar with no second row.
- The far-left menu button opens the existing DSH sidebar as a modal navigation drawer.
- The far-right overflow button contains view switching, Session log, mode information, and other header actions.
- The drawer closes from its own sidebar toggle, the backdrop, `Escape`, or after switching sessions.
- Tool details open as a full-width mobile overlay instead of squeezing the conversation.
- Existing sidebar, workspace, conversation, settings, and overlay plugins remain unchanged because this plugin only replaces the `ui-layout` composition row.

## Install

Add the package as a Web profile bundle and restart DSH. Its `cordis.patch.yml` replaces the `ui-layout` row with this package; do not load the official layout row beside it.

## Development

```powershell
npm install
npm run check
```
