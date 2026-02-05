[**tinky-unordered-list**](../README.md)

---

[tinky-unordered-list](../globals.md) / UnorderedList

# Function: UnorderedList()

> **UnorderedList**(`props`): `Element`

UnorderedList component for rendering bulleted lists in terminal UIs.

## Parameters

### props

[`UnorderedListProps`](../interfaces/UnorderedListProps.md)

Component props

## Returns

`Element`

The rendered unordered list component

This is the main list container component that manages:

- List depth tracking through React Context
- Theme configuration via tinky-theme
- Marker resolution for different nesting levels
- Nested list support with automatic depth increment

The component uses two React Contexts:

1. UnorderedListContext - Tracks the current nesting depth
2. UnorderedListItemContext - Provides the marker character to items

Marker resolution logic:

- If config.marker is a string, all items use that marker
- If config.marker is an array, markers are selected by depth index
- If no marker is found at the current depth, the last array element is used
- Falls back to defaultMarker if no valid marker is configured

## Examples

Basic usage:

```tsx
<UnorderedList>
  <UnorderedList.Item>
    <Text>First item</Text>
  </UnorderedList.Item>
</UnorderedList>
```

With custom marker via theme:

```tsx
const customTheme = extendTheme(defaultTheme, {
  components: {
    UnorderedList: {
      config: () => ({ marker: "•" }),
    },
  },
});

<ThemeProvider theme={customTheme}>
  <UnorderedList>...</UnorderedList>
</ThemeProvider>;
```

## See

- [UnorderedListProps](../interfaces/UnorderedListProps.md)
- [UnorderedListItem](UnorderedListItem.md)
- [unorderedListTheme](../variables/unorderedListTheme.md)
