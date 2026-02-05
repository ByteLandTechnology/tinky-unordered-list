[**tinky-unordered-list**](../README.md)

---

[tinky-unordered-list](../globals.md) / UnorderedListContext

# Variable: UnorderedListContext

> `const` **UnorderedListContext**: `React.Context`\<[`UnorderedListContextProps`](../interfaces/UnorderedListContextProps.md)\>

React Context for tracking list depth in nested unordered lists.

## Examples

Consuming the context:

```tsx
import { useContext } from "react";
import { UnorderedListContext } from "./contexts/unordered-list-context.js";

function ListItem({ children }) {
  const { depth } = useContext(UnorderedListContext);
  return (
    <Box>
      Depth: {depth} - {children}
    </Box>
  );
}
```

Providing context in the UnorderedList component:

```tsx
function UnorderedList({ children }) {
  const { depth } = useContext(UnorderedListContext);
  const nextDepth = depth + 1;

  return (
    <UnorderedListContext.Provider value={{ depth: nextDepth }}>
      {children}
    </UnorderedListContext.Provider>
  );
}
```

## See

- [UnorderedListContextProps](../interfaces/UnorderedListContextProps.md)
- [UnorderedListItemContext](UnorderedListItemContext.md)
- [React Context](https://react.dev/reference/react/createContext)
