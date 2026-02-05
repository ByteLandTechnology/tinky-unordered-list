[**tinky-unordered-list**](../README.md)

---

[tinky-unordered-list](../globals.md) / UnorderedListItemProps

# Interface: UnorderedListItemProps

Props for the UnorderedListItem component.

UnorderedListItemProps

## Example

```tsx
<UnorderedList.Item>
  <Text>Simple text content</Text>
</UnorderedList.Item>

<UnorderedList.Item>
  <Box>
    <Text>Complex</Text>
    <Text>Multi-line content</Text>
  </Box>
</UnorderedList.Item>
```

## Properties

### children

> `readonly` **children**: `ReactNode`

The content to render within the list item.
Can be any valid ReactNode including text, elements, or nested components.
The content is rendered to the right of the marker character.
