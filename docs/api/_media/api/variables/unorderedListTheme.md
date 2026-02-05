[**tinky-unordered-list**](../README.md)

---

[tinky-unordered-list](../globals.md) / unorderedListTheme

# Variable: unorderedListTheme

> `const` **unorderedListTheme**: `object`

Default theme configuration for UnorderedList components.

This theme provides all necessary style functions and configuration for rendering
UnorderedList components in terminal UIs. It follows the tinky-theme
ComponentTheme interface for seamless integration with the theme system.

Theme structure:

- `styles` - Style functions for each component element
- `config` - Configuration function returning theme options

Style functions:
Each style function returns props for the corresponding component:

- `styles.list()` - BoxProps for the container list
- `styles.listItem()` - BoxProps for individual list items
- `styles.marker()` - TextProps for the marker text
- `styles.content()` - BoxProps for the item content

Configuration:

- `config()` - Returns UnorderedListThemeConfig with marker settings

## Type Declaration

### config()

> **config**: () => [`UnorderedListThemeConfig`](../interfaces/UnorderedListThemeConfig.md)

Configuration function for the UnorderedList theme.

#### Returns

[`UnorderedListThemeConfig`](../interfaces/UnorderedListThemeConfig.md)

Theme configuration object with marker settings

This function returns the default marker configuration for the theme.
The marker can be overridden by providing a custom theme configuration.

Default configuration:

- `marker: figures.line` - Uses the line figure as the default marker

#### Examples

```typescript
import { unorderedListTheme } from "tinky-unordered-list";

const config = unorderedListTheme.config();
// Returns: { marker: "─" }
```

Customizing via theme extension:

```tsx
import { extendTheme } from "tinky-theme";
import { unorderedListTheme } from "tinky-unordered-list";

const customTheme = extendTheme(defaultTheme, {
  components: {
    UnorderedList: {
      config: () => ({
        marker: ["•", "◦", "▪"],
      }),
    },
  },
});
```

### styles

> **styles**: `object`

#### styles.content()

> **content**: () => [`BoxProps`](#)

Style function for the item content container.

##### Returns

[`BoxProps`](#)

Props for rendering item content

The content container holds the actual item text/elements.

Applied styles:

- `flexDirection: "column"` - Stacks content elements vertically

This allows items to contain multiple elements (text, nested lists, etc.)
while maintaining proper layout.

##### Example

```typescript
import { unorderedListTheme } from "tinky-unordered-list";

const contentStyles = unorderedListTheme.styles.content();
// Returns: { flexDirection: "column" }

<Box {...contentStyles}>
  <Text>Primary content</Text>
  <Text>Secondary content</Text>
</Box>
```

#### styles.list()

> **list**: () => [`BoxProps`](#)

Style function for the list container.

##### Returns

[`BoxProps`](#)

Props for rendering the list container

The list container uses a column flex layout to stack list items vertically.

Applied styles:

- `flexDirection: "column"` - Stacks items top-to-bottom

##### Example

```typescript
import { unorderedListTheme } from "tinky-unordered-list";

const listStyles = unorderedListTheme.styles.list();
// Returns: { flexDirection: "column" }

<Box {...listStyles}>
  <UnorderedList.Item>Item 1</UnorderedList.Item>
</Box>
```

#### styles.listItem()

> **listItem**: () => [`BoxProps`](#)

Style function for individual list items.

##### Returns

[`BoxProps`](#)

Props for rendering each list item

Each list item is a flex container that includes the marker and content.

Applied styles:

- `gap: 1` - Adds spacing between marker and content

##### Example

```typescript
import { unorderedListTheme } from "tinky-unordered-list";

const itemStyles = unorderedListTheme.styles.listItem();
// Returns: { gap: 1 }

<Box {...itemStyles}>
  <Text>•</Text>
  <Text>Item content</Text>
</Box>
```

#### styles.marker()

> **marker**: () => [`TextProps`](#)

Style function for the marker text element.

##### Returns

[`TextProps`](#)

Props for rendering the marker character

The marker is typically a bullet point or similar character.

Applied styles:

- `dimColor: true` - Renders marker in dimmed color for visual hierarchy

Dimming the marker creates a visual distinction between the marker
and the content, making the list easier to scan.

##### Example

```typescript
import { unorderedListTheme } from "tinky-unordered-list";

const markerStyles = unorderedListTheme.styles.marker();
// Returns: { dimColor: true }

<Text {...markerStyles}>•</Text>
```

## Examples

Using the theme directly:

```tsx
import { unorderedListTheme } from "tinky-unordered-list";

const { styles } = unorderedListTheme;
const listProps = styles.list();
// listProps === { flexDirection: "column" }
```

Integrating with theme provider:

```tsx
import { ThemeProvider } from "tinky-theme";
import { unorderedListTheme } from "tinky-unordered-list";

<ThemeProvider
  theme={{
    components: {
      UnorderedList: unorderedListTheme,
    },
  }}
>
  <UnorderedList>
    <UnorderedList.Item>Item 1</UnorderedList.Item>
  </UnorderedList>
</ThemeProvider>;
```

## See

- [UnorderedListTheme](../type-aliases/UnorderedListTheme.md)
- [UnorderedListThemeConfig](../interfaces/UnorderedListThemeConfig.md)
- [defaultMarker](defaultMarker.md)
