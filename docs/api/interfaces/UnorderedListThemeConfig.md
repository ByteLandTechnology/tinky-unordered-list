[**tinky-unordered-list**](../README.md)

---

[tinky-unordered-list](../globals.md) / UnorderedListThemeConfig

# Interface: UnorderedListThemeConfig

Configuration interface for UnorderedList theme markers.

UnorderedListThemeConfig

## Examples

Single marker configuration:

```typescript
import type { UnorderedListThemeConfig } from "tinky-unordered-list";

const singleMarkerConfig: UnorderedListThemeConfig = {
  marker: "•",
};

// All items use "•"
// Root: └• Item 1
// Nest: └• Item 2
```

Array marker configuration:

```typescript
import type { UnorderedListThemeConfig } from "tinky-unordered-list";

const arrayMarkerConfig: UnorderedListThemeConfig = {
  marker: ["•", "◦", "▪", "─"],
};

// Different markers at each level
// Depth 0: └• Item 1
// Depth 1:   └◦ Nested item 1
// Depth 2:     └▪ Deeply nested item
// Depth 3+:     └─ Fallback to last marker
```

Creating a custom theme with array markers:

```tsx
import { extendTheme } from "tinky-theme";
import type { UnorderedListThemeConfig } from "tinky-unordered-list";

const customTheme = extendTheme(defaultTheme, {
  components: {
    UnorderedList: {
      config: (): UnorderedListThemeConfig => ({
        marker: ["▸", "└", " "├"]
      })
    }
  }
});
```

## See

- [defaultMarker](../variables/defaultMarker.md)
- [unorderedListTheme](../variables/unorderedListTheme.md)
- [UnorderedList](../functions/UnorderedList.md)

## Extends

- `Record`\<`string`, `unknown`\>

## Indexable

\[`key`: `string`\]: `unknown`

## Properties

### marker

> **marker**: `string` \| `string`[]

The marker configuration for list items.

Marker configuration options:

**Single marker (string)**:

- All list items use the same marker character
- Example: `{ marker: "•" }` uses bullet points at all levels
- Example: `{ marker: "-" }` uses hyphens at all levels

**Array of markers (string[])**:

- Different markers for different nesting levels
- The depth index determines which marker to use
- If depth exceeds array length, the last marker is reused

Array-based marker resolution:

- Depth 0: `markers[0]`
- Depth 1: `markers[1]`
- Depth 2: `markers[2]`
- Depth N (where N >= length): `markers[length - 1]`

Common marker characters:

- `"•"` - Bullet point (●)
- `"◦"` - White bullet (○)
- `"▪"` - Small black square (■)
- `"─"` - Horizontal line (default)
- `"*"` - Asterisk
- `"-"` - Hyphen
- `">"` - Greater-than (right arrow)
- `"→"` - Right arrow
