[**tinky-unordered-list**](../README.md)

---

[tinky-unordered-list](../globals.md) / UnorderedListItemContextProps

# Interface: UnorderedListItemContextProps

Props interface for the UnorderedListItemContext.

UnorderedListItemContextProps

## Example

```typescript
// Default marker (line figure)
const defaultContext: UnorderedListItemContextProps = { marker: "─" };

// Bullet point marker
const bulletContext: UnorderedListItemContextProps = { marker: "•" };

// Custom marker
const customContext: UnorderedListItemContextProps = { marker: "*" };
```

## See

- [defaultMarker](../variables/defaultMarker.md)
- [UnorderedListThemeConfig](UnorderedListThemeConfig.md)

## Properties

### marker

> `readonly` **marker**: `string`

The marker character (bullet) to display before the list item content.
This is typically a single character like:

- "•" (bullet point)
- "◦" (white bullet)
- "▪" (small black square)
- "─" (box drawing line, default)
- "\*" (asterisk)
- "-" (hyphen)

The marker is determined by the parent UnorderedList component based on:

- The current nesting depth
- The theme configuration (single marker or array of markers)
- Fallback to defaultMarker if not configured
