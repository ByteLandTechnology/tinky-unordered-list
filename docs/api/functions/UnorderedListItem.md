[**tinky-unordered-list**](../README.md)

---

[tinky-unordered-list](../globals.md) / UnorderedListItem

# Function: UnorderedListItem()

> **UnorderedListItem**(`props`): `Element`

UnorderedListItem component for rendering individual list items.

## Parameters

### props

[`UnorderedListItemProps`](../interfaces/UnorderedListItemProps.md)

Component props

## Returns

`Element`

The rendered list item component

This component renders an individual item within an UnorderedList. It:

- Consumes marker configuration from UnorderedListItemContext
- Applies theme-based styling via tinky-theme
- Renders a marker character followed by the item content
- Uses Box and Text components from tinky for layout

The component layout consists of:

1. A marker Text element (the bullet character)
2. A content Box containing the children

Both elements are wrapped in a flex container with appropriate spacing.

## Example

Basic usage:

```tsx
<UnorderedList.Item>
  <Text>List item content</Text>
</UnorderedList.Item>
```

## See

- [UnorderedListItemProps](../interfaces/UnorderedListItemProps.md)
- [UnorderedList](UnorderedList.md)
- [UnorderedListItemContext](../variables/UnorderedListItemContext.md)
