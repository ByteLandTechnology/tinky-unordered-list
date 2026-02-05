[**tinky-unordered-list**](../README.md)

---

[tinky-unordered-list](../globals.md) / UnorderedListContextProps

# Interface: UnorderedListContextProps

Props interface for the UnorderedListContext.

UnorderedListContextProps

## Example

```typescript
// Root level
const rootContext: UnorderedListContextProps = { depth: 0 };

// First nesting level
const nestedContext: UnorderedListContextProps = { depth: 1 };

// Second nesting level
const deeplyNestedContext: UnorderedListContextProps = { depth: 2 };
```

## See

- [UnorderedListContext](../variables/UnorderedListContext.md)
- [UnorderedListItemContext](../variables/UnorderedListItemContext.md)

## Properties

### depth

> **depth**: `number`

The nesting depth of the current unordered list in the hierarchy.

- Root lists have depth `0`
- Each nested list increments depth by 1
- Depth is used to determine the appropriate marker character

Depth progression example:

```
Root list (depth 0)
  ├─ Item 1
  ├─ Item 2
  │  └─ Nested list (depth 1)
  │     ├─ Nested item 1
  │     └─ Nested item 2
  └─ Item 3
```

The depth is automatically managed by the UnorderedList component:

- When an UnorderedList renders, it reads the current depth from context
- Increments the depth for its own Provider
- Children within this list see the incremented depth
- Nested UnorderedLists further increment the depth
