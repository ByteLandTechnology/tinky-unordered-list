[**tinky-unordered-list**](../README.md)

---

[tinky-unordered-list](../globals.md) / defaultMarker

# Variable: defaultMarker

> `const` **defaultMarker**: `string` = `figures.line`

Default marker character for unordered list items.

This marker is used when no custom marker is configured in the theme.
The default marker is the box drawing line character (─) from the figures library.

Default marker characteristics:

- Character: `figures.line` (typically "─" or "─")
- Visual style: Horizontal line figure
- Usage: Suitable for terminal UIs with box drawing support

The default marker was chosen because:

- Works well in most terminal environments
- Creates clean visual separation
- Compatible with monospaced fonts
- Less visually intrusive than bullet points in some terminals

## Examples

```typescript
import { defaultMarker } from "tinky-unordered-list";

console.log(defaultMarker); // Output: "─"
```

Using default marker in custom context:

```tsx
import { defaultMarker } from "tinky-unordered-list";
import { UnorderedListItemContext } from "./contexts/unordered-list-item-context.js";

<UnorderedListItemContext.Provider value={{ marker: defaultMarker }}>
  <UnorderedList.Item>Item with default marker</UnorderedList.Item>
</UnorderedListItemContext.Provider>;
```

## See

- [UnorderedListThemeConfig](../interfaces/UnorderedListThemeConfig.md)
- [unorderedListTheme](unorderedListTheme.md)
