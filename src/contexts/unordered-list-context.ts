/**
 * @fileoverview React Context for tracking list depth in nested unordered lists.
 *
 * @module contexts/UnorderedListContext
 *
 * @description
 * This module provides the UnorderedListContext and its associated props interface
 * for tracking the nesting depth of unordered lists within a hierarchy.
 *
 * The depth tracking enables:
 * - Dynamic marker selection at different nesting levels
 * - Proper indentation or visual hierarchy in terminal UIs
 * - Context-aware theming based on nesting depth
 * - Prevention of infinite nesting loops
 *
 * The context value is incremented by each nested UnorderedList and decremented
 * when exiting, providing the current depth to all children within the hierarchy.
 *
 * This context is used in conjunction with UnorderedListItemContext:
 * - UnorderedListContext: Tracks the depth (numeric level)
 * - UnorderedListItemContext: Provides the marker character based on depth
 *
 * @example
 * Context usage in a custom component:
 * ```tsx
 * import { useContext } from "react";
 * import { UnorderedListContext } from "./contexts/unordered-list-context.js";
 *
 * function DepthIndicator() {
 *   const { depth } = useContext(UnorderedListContext);
 *   return <Text>Current depth: {depth}</Text>;
 * }
 * ```
 *
 * @example
 * Nested list depth progression:
 * ```tsx
 * // Depth 0 (root list)
 * <UnorderedList>
 *   <UnorderedList.Item>Item 1</UnorderedList.Item>
 *   <UnorderedList.Item>
 *     Item 2
 *     <UnorderedList>  // Depth 1 (nested)
 *       <UnorderedList.Item>Nested item 1</UnorderedList.Item>
 *     </UnorderedList>
 *   </UnorderedList.Item>
 * </UnorderedList>
 * ```
 *
 * @see {@link UnorderedListContextProps}
 * @see {@link UnorderedList}
 * @see {@link UnorderedListItemContext}
 */

import { createContext } from "react";

/**
 * Props interface for the UnorderedListContext.
 *
 * @interface UnorderedListContextProps
 *
 * @property {number} depth - The nesting depth of the current unordered list in the hierarchy.
 *   - Root lists have depth `0`
 *   - Each nested list increments depth by 1
 *   - Depth is used to determine the appropriate marker character
 *
 * Depth progression example:
 * ```
 * Root list (depth 0)
 *   ├─ Item 1
 *   ├─ Item 2
 *   │  └─ Nested list (depth 1)
 *   │     ├─ Nested item 1
 *   │     └─ Nested item 2
 *   └─ Item 3
 * ```
 *
 * The depth is automatically managed by the UnorderedList component:
 * - When an UnorderedList renders, it reads the current depth from context
 * - Increments the depth for its own Provider
 * - Children within this list see the incremented depth
 * - Nested UnorderedLists further increment the depth
 *
 * @example
 * ```typescript
 * // Root level
 * const rootContext: UnorderedListContextProps = { depth: 0 };
 *
 * // First nesting level
 * const nestedContext: UnorderedListContextProps = { depth: 1 };
 *
 * // Second nesting level
 * const deeplyNestedContext: UnorderedListContextProps = { depth: 2 };
 * ```
 *
 * @see {@link UnorderedListContext}
 * @see {@link UnorderedListItemContext}
 */
export interface UnorderedListContextProps {
  depth: number;
}

/**
 * React Context for tracking list depth in nested unordered lists.
 *
 * @type {React.Context<UnorderedListContextProps>}
 *
 * The UnorderedListContext provides the current nesting depth to all child
 * UnorderedList and UnorderedListItem components within the hierarchy.
 *
 * How depth tracking works:
 * 1. Root UnorderedList creates a Provider with depth `0`
 * 2. When another UnorderedList is nested, it increments the depth
 * 3. Each UnorderedListItem reads the depth to determine its marker
 * 4. The depth is automatically managed - no manual intervention needed
 *
 * Default value:
 * - depth: `0` (root level)
 *
 * Usage pattern:
 * - UnorderedList component wraps children with Provider
 * - Provider value includes incremented depth from parent context
 * - Child components consume the context via useContext or custom hooks
 * - Depth is used to resolve markers from theme configuration
 *
 * @example
 * Consuming the context:
 * ```tsx
 * import { useContext } from "react";
 * import { UnorderedListContext } from "./contexts/unordered-list-context.js";
 *
 * function ListItem({ children }) {
 *   const { depth } = useContext(UnorderedListContext);
 *   return <Box>Depth: {depth} - {children}</Box>;
 * }
 * ```
 *
 * @example
 * Providing context in the UnorderedList component:
 * ```tsx
 * function UnorderedList({ children }) {
 *   const { depth } = useContext(UnorderedListContext);
 *   const nextDepth = depth + 1;
 *
 *   return (
 *     <UnorderedListContext.Provider value={{ depth: nextDepth }}>
 *       {children}
 *     </UnorderedListContext.Provider>
 *   );
 * }
 * ```
 *
 * @see {@link UnorderedListContextProps}
 * @see {@link UnorderedListItemContext}
 * @see {@link https://react.dev/reference/react/createContext React Context}
 */
export const UnorderedListContext: React.Context<UnorderedListContextProps> =
  createContext<UnorderedListContextProps>({
    depth: 0,
  });
