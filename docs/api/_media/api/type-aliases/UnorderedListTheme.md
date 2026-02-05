[**tinky-unordered-list**](../README.md)

---

[tinky-unordered-list](../globals.md) / UnorderedListTheme

# Type Alias: UnorderedListTheme

> **UnorderedListTheme** = _typeof_ [`unorderedListTheme`](../variables/unorderedListTheme.md)

Type definition for the UnorderedList theme.

## Example

Creating a custom theme that extends the base:

```typescript
import type { UnorderedListTheme } from "tinky-unordered-list";
import type { ComponentTheme } from "tinky-theme";

const customTheme: UnorderedListTheme = {
  ...unorderedListTheme,
  styles: {
    ...unorderedListTheme.styles,
    listItem: () => ({
      gap: 2, // Increased spacing
    }),
  },
  config: () => ({
    marker: ["•", "◦", "▪"], // Custom markers
  }),
};
```

## See

- [unorderedListTheme](../variables/unorderedListTheme.md)
- [UnorderedListThemeConfig](../interfaces/UnorderedListThemeConfig.md)
- [ComponentTheme](#)
