**tinky-unordered-list**

---

# tinky-unordered-list

> A React-like unordered list component library for building beautiful terminal UIs.

![npm](https://img.shields.io/npm/v/tinky-unordered-list)
![license](https://img.shields.io/npm/l/tinky-unordered-list)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)

`tinky-unordered-list` provides a fully-featured unordered list component for terminal applications built with the [tinky](https://github.com/ByteLandTechnology/tinky) framework. It supports nested lists, customizable markers, and seamless theme integration.

## Features

- **📝 Simple API** - Intuitive JSX-based syntax for building lists
- **🎨 Themeable** - Full integration with [tinky-theme](https://github.com/ByteLandTechnology/tinky-theme)
- **🔀 Nested Lists** - Automatic depth tracking for multi-level hierarchies
- **✨ Custom Markers** - Support for single characters or array-based markers at different levels
- **🎯 Type Safe** - Built with TypeScript for excellent developer experience
- **🧪 Well Tested** - Comprehensive test coverage with unit and integration tests
- **📚 Documented** - Complete API documentation generated with TypeDoc

## Installation

```bash
npm install tinky-unordered-list
# or
bun add tinky-unordered-list
# or
yarn add tinky-unordered-list
```

## Quick Start

```tsx
import { render } from "tinky";
import { UnorderedList } from "tinky-unordered-list";
import { Text } from "tinky";

function App() {
  return (
    <UnorderedList>
      <UnorderedList.Item>
        <Text>First item</Text>
      </UnorderedList.Item>
      <UnorderedList.Item>
        <Text>Second item</Text>
      </UnorderedList.Item>
      <UnorderedList.Item>
        <Text>Third item</Text>
      </UnorderedList.Item>
    </UnorderedList>
  );
}

render(<App />);
```

## Usage

### Basic List

Create a simple bulleted list:

```tsx
import { UnorderedList } from "tinky-unordered-list";
import { Text } from "tinky";

<UnorderedList>
  <UnorderedList.Item>
    <Text>Learn React</Text>
  </UnorderedList.Item>
  <UnorderedList.Item>
    <Text>Build CLI apps</Text>
  </UnorderedList.Item>
  <UnorderedList.Item>
    <Text>Deploy to production</Text>
  </UnorderedList.Item>
</UnorderedList>;
```

### Nested Lists

Create hierarchical lists with automatic depth tracking:

```tsx
<UnorderedList>
  <UnorderedList.Item>
    <Text>Frontend</Text>
    <UnorderedList>
      <UnorderedList.Item>
        <Text>React</Text>
      </UnorderedList.Item>
      <UnorderedList.Item>
        <Text>Vue</Text>
      </UnorderedList.Item>
    </UnorderedList>
  </UnorderedList.Item>
  <UnorderedList.Item>
    <Text>Backend</Text>
    <UnorderedList.Item>
      <Text>Node.js</Text>
    </UnorderedList.Item>
  </UnorderedList.Item>
</UnorderedList>
```

### Custom Markers via Theme

Customize markers at different nesting levels using theme configuration:

```tsx
import { extendTheme, ThemeProvider, defaultTheme } from "tinky-theme";
import { UnorderedList } from "tinky-unordered-list";

const customTheme = extendTheme(defaultTheme, {
  components: {
    UnorderedList: {
      config: () => ({
        marker: ["●", "○", "■", "▪"], // Different markers for each level
      }),
    },
  },
});

<ThemeProvider theme={customTheme}>
  <UnorderedList>
    <UnorderedList.Item>
      <Text>Level 1 item</Text>
    </UnorderedList.Item>
    <UnorderedList.Item>
      <Text>Level 1 with nested</Text>
      <UnorderedList>
        <UnorderedList.Item>
          <Text>Level 2 item</Text>
        </UnorderedList.Item>
      </UnorderedList>
    </UnorderedList.Item>
  </UnorderedList>
</ThemeProvider>;
```

### Single Marker

Use the same marker for all levels:

```tsx
const bulletTheme = extendTheme(defaultTheme, {
  components: {
    UnorderedList: {
      config: () => ({
        marker: "•", // Bullet point for all items
      }),
    },
  },
});
```

## API Documentation

For complete API documentation, type definitions, and usage examples, visit the [API Docs](_media/api).

### Components

#### `UnorderedList`

The main list container component.

**Props:**

| Property   | Type        | Required | Description          |
| ---------- | ----------- | -------- | -------------------- |
| `children` | `ReactNode` | No       | List items to render |

**Example:**

```tsx
<UnorderedList>
  <UnorderedList.Item>Item 1</UnorderedList.Item>
  <UnorderedList.Item>Item 2</UnorderedList.Item>
</UnorderedList>
```

#### `UnorderedListItem` (via `UnorderedList.Item`)

Individual list item component.

**Props:**

| Property   | Type        | Required | Description                       |
| ---------- | ----------- | -------- | --------------------------------- |
| `children` | `ReactNode` | Yes      | Content to render within the item |

**Example:**

```tsx
<UnorderedList.Item>
  <Text>Item content</Text>
</UnorderedList.Item>
```

### Contexts

#### `UnorderedListContext`

Tracks the nesting depth of unordered lists in the hierarchy.

**Type:** `React.Context<{ depth: number }>`

**Example:**

```tsx
import { useContext } from "react";
import { UnorderedListContext } from "tinky-unordered-list";

function DepthDisplay() {
  const { depth } = useContext(UnorderedListContext);
  return <Text>Current depth: {depth}</Text>;
}
```

#### `UnorderedListItemContext`

Provides marker configuration to list items.

**Type:** `React.Context<{ marker: string }>`

**Example:**

```tsx
import { useContext } from "react";
import { UnorderedListItemContext } from "tinky-unordered-list";

function MarkerDisplay() {
  const { marker } = useContext(UnorderedListItemContext);
  return <Text>Current marker: {marker}</Text>;
}
```

### Theme Configuration

#### `UnorderedListThemeConfig`

Interface for theme configuration options.

**Properties:**

| Property | Type                 | Description                                            |
| -------- | -------------------- | ------------------------------------------------------ |
| `marker` | `string \| string[]` | Single marker or array of markers for different levels |

#### `unorderedListTheme`

Default theme configuration object.

**Structure:**

```typescript
{
  styles: {
    list: () => BoxProps,
    listItem: () => BoxProps,
    marker: () => TextProps,
    content: () => BoxProps,
  },
  config: () => UnorderedListThemeConfig,
}
```

#### `defaultMarker`

Default marker character (box drawing line `─`).

**Example:**

```tsx
import { defaultMarker } from "tinky-unordered-list";

console.log(defaultMarker); // "─"
```

## Marker Resolution

The component uses a deterministic algorithm to select the appropriate marker:

1. **Single marker (string)**: All items use the same marker
2. **Array of markers (string[])**: Markers selected by depth index
   - `markers[0]` for depth 0
   - `markers[1]` for depth 1
   - `markers[n]` for depth n
   - `markers[length - 1]` for depths beyond array length
3. **Fallback**: Use `defaultMarker` if no valid configuration exists

**Example with array markers:**

```typescript
const markers = ["●", "○", "■", "▪"];

// Depth 0: ●
// Depth 1: ○
// Depth 2: ■
// Depth 3: ▪
// Depth 4+: ▪ (reuses last element)
```

## Development

### Setup

```bash
# Install dependencies
bun install

# Run tests
bun test

# Build the project
bun run build

# Lint code
bun run lint

# Generate documentation
bun run docs
```

## Related Packages

- [tinky](https://github.com/ByteLandTechnology/tinky) - React for CLIs
- [tinky-theme](https://github.com/ByteLandTechnology/tinky-theme) - Theme system for tinky
- [tinky-test](https://github.com/ByteLandTechnology/tinky-test) - Testing utilities for tinky

## Acknowledgments

- [ink-ui](https://github.com/vadimdemedes/ink-ui) - Inspiration for UnorderedList component by Vadim Demedes

## License

MIT © [ByteLand Technology Limited](https://github.com/ByteLandTechnology)
