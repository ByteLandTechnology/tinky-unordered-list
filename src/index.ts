/**
 * @packageDocumentation
 *
 * @module tinky-unordered-list
 *
 * @description
 * A React-like library for building CLI applications with unordered list support.
 * This package provides themed, nestable unordered list components for terminal UIs,
 * built on top of the tinky framework and tinky-theme styling system.
 *
 * @example
 * ```tsx
 * import { UnorderedList } from "tinky-unordered-list";
 * import { Text } from "tinky";
 *
 * <UnorderedList>
 *   <UnorderedList.Item>
 *     <Text>First item</Text>
 *   </UnorderedList.Item>
 *   <UnorderedList.Item>
 *     <Text>Second item</Text>
 *   </UnorderedList.Item>
 * </UnorderedList>
 * ```
 *
 * @remarks
 * The package uses React Context API to manage list depth tracking and marker
 * propagation for nested lists. It supports custom theming through the
 * tinky-theme system.
 *
 * @license MIT
 */

/**
 * UnorderedList component for rendering bullet lists in terminal UIs.
 *
 * @remarks
 * This is the main component export. It includes a nested Item component
 * accessible via {@link UnorderedList.Item}.
 */
export {
  UnorderedList,
  type UnorderedListProps,
} from "./components/UnorderedList.js";

/**
 * UnorderedListItem component for individual list items.
 *
 * @remarks
 * Usually accessed via {@link UnorderedList.Item} rather than imported directly.
 */
export {
  UnorderedListItem,
  type UnorderedListItemProps,
} from "./components/UnorderedListItem.js";

/**
 * React Context and props interface for managing list depth state.
 *
 * @remarks
 * The context tracks the nesting depth of unordered lists to enable
 * different markers at different nesting levels.
 */
export {
  /** React Context for tracking list depth in nested lists. */
  UnorderedListContext,
  /** Props interface for UnorderedListContext. */
  type UnorderedListContextProps,
} from "./contexts/unordered-list-context.js";

/**
 * React Context and props interface for list item marker configuration.
 *
 * @remarks
 * The context provides marker configuration (bullet character) to
 * individual list items based on the current nesting depth.
 */
export {
  /** React Context for providing marker configuration to list items. */
  UnorderedListItemContext,
  /** Props interface for UnorderedListItemContext. */
  type UnorderedListItemContextProps,
} from "./contexts/unordered-list-item-context.js";

/**
 * Theme configuration exports for customizing list appearance.
 *
 * @remarks
 * The theme system allows customization of list markers, styles, and behavior.
 * Supports both single markers and arrays for different nesting levels.
 */
export {
  /** Default marker character (line figure). */
  defaultMarker,
  /** Default theme configuration for UnorderedList components. */
  unorderedListTheme,
  /** Type definition for the UnorderedList theme. */
  type UnorderedListTheme,
  /** Type definition for theme configuration options. */
  type UnorderedListThemeConfig,
} from "./themes/unordered-list-theme.js";
