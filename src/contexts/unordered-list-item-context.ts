/**
 * @fileoverview React Context for providing marker configuration to list items.
 *
 * @module contexts/UnorderedListItemContext
 *
 * @description
 * This module provides the UnorderedListItemContext and its associated props interface
 * for communicating marker configuration (the bullet character) from parent
 * UnorderedList components to their child UnorderedListItem components.
 *
 * The context enables:
 * - Dynamic marker selection based on nesting depth
 * - Theme-based marker configuration
 * - Consistent marker display across all items in a list
 * - Different markers at different nesting levels (via array configuration)
 *
 * Unlike UnorderedListContext which tracks depth, this context provides the
 * actual marker character to display. The marker is determined by the parent
 * UnorderedList based on the current depth and theme configuration.
 *
 * @example
 * Basic context usage:
 * ```tsx
 * import { UnorderedListItemContext } from "./contexts/unordered-list-item-context.js";
 *
 * function CustomItem() {
 *   const { marker } = useContext(UnorderedListItemContext);
 *   return <Text>Marker: {marker}</Text>;
 * }
 * ```
 *
 * @see {@link UnorderedListItemContextProps}
 * @see {@link UnorderedListItem}
 * @see {@link defaultMarker}
 */

import { createContext } from "react";
import { defaultMarker } from "../themes/unordered-list-theme.js";

/**
 * Props interface for the UnorderedListItemContext.
 *
 * @interface UnorderedListItemContextProps
 *
 * @property {string} marker - The marker character (bullet) to display before the list item content.
 *   This is typically a single character like:
 *   - "•" (bullet point)
 *   - "◦" (white bullet)
 *   - "▪" (small black square)
 *   - "─" (box drawing line, default)
 *   - "*" (asterisk)
 *   - "-" (hyphen)
 *
 *   The marker is determined by the parent UnorderedList component based on:
 *   - The current nesting depth
 *   - The theme configuration (single marker or array of markers)
 *   - Fallback to defaultMarker if not configured
 *
 * @example
 * ```typescript
 * // Default marker (line figure)
 * const defaultContext: UnorderedListItemContextProps = { marker: "─" };
 *
 * // Bullet point marker
 * const bulletContext: UnorderedListItemContextProps = { marker: "•" };
 *
 * // Custom marker
 * const customContext: UnorderedListItemContextProps = { marker: "*" };
 * ```
 *
 * @see {@link defaultMarker}
 * @see {@link UnorderedListThemeConfig}
 */
export interface UnorderedListItemContextProps {
  readonly marker: string;
}

/**
 * React Context for providing marker configuration to list items.
 *
 * @type {React.Context<UnorderedListItemContextProps>}
 *
 * The UnorderedListItemContext provides the marker character (bullet) to all
 * child UnorderedListItem components within an UnorderedList hierarchy. This enables:
 *
 * 1. **Consistent markers**: All items in a list use the same marker character
 * 2. **Dynamic marker selection**: Markers can change based on nesting depth
 * 3. **Theme integration**: Marker selection respects the active theme configuration
 * 4. **Array-based markers**: Different markers at different nesting levels
 *
 * Default value:
 * - marker: defaultMarker (figures.line, typically "─")
 *
 * Usage pattern:
 * - Parent UnorderedList determines the appropriate marker
 * - Marker is computed based on depth and theme configuration
 * - Context Provider wraps children with the marker value
 * - Child UnorderedListItem components consume the context
 *
 * @example
 * Consuming the context:
 * ```tsx
 * import { useContext } from "react";
 * import { UnorderedListItemContext } from "./contexts/unordered-list-item-context.js";
 *
 * function MarkerDisplay() {
 *   const { marker } = useContext(UnorderedListItemContext);
 *   return <Text>Current marker: {marker}</Text>;
 * }
 * ```
 *
 * @example
 * Providing context in a custom component:
 * ```tsx
 * function CustomMarkerList({ marker, children }) {
 *   return (
 *     <UnorderedListItemContext.Provider value={{ marker }}>
 *       {children}
 *     </UnorderedListItemContext.Provider>
 *   );
 * }
 * ```
 *
 * @see {@link UnorderedListItemContextProps}
 * @see {@link defaultMarker}
 * @see {@link https://react.dev/reference/react/createContext React Context}
 */
export const UnorderedListItemContext: React.Context<UnorderedListItemContextProps> =
  createContext<UnorderedListItemContextProps>({
    marker: defaultMarker,
  });
