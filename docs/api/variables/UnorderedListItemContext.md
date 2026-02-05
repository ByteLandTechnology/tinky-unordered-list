[**tinky-unordered-list**](../README.md)

---

[tinky-unordered-list](../globals.md) / UnorderedListItemContext

# Variable: UnorderedListItemContext

> `const` **UnorderedListItemContext**: `React.Context`\<[`UnorderedListItemContextProps`](../interfaces/UnorderedListItemContextProps.md)\>

React Context for providing marker configuration to list items.

## Examples

Consuming the context:

```tsx
import { useContext } from "react";
import { UnorderedListItemContext } from "./contexts/unordered-list-item-context.js";

function MarkerDisplay() {
  const { marker } = useContext(UnorderedListItemContext);
  return <Text>Current marker: {marker}</Text>;
}
```

Providing context in a custom component:

```tsx
function CustomMarkerList({ marker, children }) {
  return (
    <UnorderedListItemContext.Provider value={{ marker }}>
      {children}
    </UnorderedListItemContext.Provider>
  );
}
```

## See

- [UnorderedListItemContextProps](../interfaces/UnorderedListItemContextProps.md)
- [defaultMarker](defaultMarker.md)
- [React Context](https://react.dev/reference/react/createContext)
