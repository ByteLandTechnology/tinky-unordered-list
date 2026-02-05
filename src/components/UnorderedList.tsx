/**
 * @fileoverview UnorderedList component implementation for terminal UI applications.
 *
 * @module components/UnorderedList
 *
 * @description
 * This module provides the UnorderedList component, a container for rendering
 * unordered (bulleted) lists in terminal interfaces. The component manages
 * list depth tracking through React Context to support nested lists with
 * different markers at different nesting levels.
 *
 * Key features:
 * - Automatic depth tracking for nested lists
 * - Configurable markers (single character or array for different levels)
 * - Integration with tinky-theme for consistent styling
 * - React Context-based state management for clean composition
 *
 * @example
 * Basic usage:
 * ```tsx
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
 * @example
 * Nested lists with different markers:
 * ```tsx
 * <UnorderedList>
 *   <UnorderedList.Item>
 *     <Text>Parent item</Text>
 *     <UnorderedList>
 *       <UnorderedList.Item>
 *         <Text>Nested item</Text>
 *       </UnorderedList.Item>
 *     </UnorderedList>
 *   </UnorderedList.Item>
 * </UnorderedList>
 * ```
 */

import { Box } from "tinky";
import { useMemo, type ReactNode, useContext, JSX } from "react";
import { useComponentTheme } from "tinky-theme";
import {
  unorderedListTheme,
  defaultMarker,
} from "../themes/unordered-list-theme.js";
import { UnorderedListItem } from "./UnorderedListItem.js";
import { UnorderedListContext } from "../contexts/unordered-list-context.js";
import { UnorderedListItemContext } from "../contexts/unordered-list-item-context.js";

/**
 * Props for the UnorderedList component.
 *
 * @interface UnorderedListProps
 *
 * @property {ReactNode} children - The list items to render within the unordered list.
 *   Can include UnorderedList.Item components or other valid React children.
 *   Must be a valid ReactNode (components, elements, strings, numbers, etc.).
 *
 * @example
 * ```tsx
 * <UnorderedList>
 *   <UnorderedList.Item>Item 1</UnorderedList.Item>
 *   <UnorderedList.Item>Item 2</UnorderedList.Item>
 * </UnorderedList>
 * ```
 */
export interface UnorderedListProps {
  /**
   * The list items to render within the unordered list.
   * When not provided, the list will render as empty.
   */
  readonly children?: ReactNode;
}

/**
 * UnorderedList component for rendering bulleted lists in terminal UIs.
 *
 * @param {UnorderedListProps} props - Component props
 * @param {ReactNode} props.children - List items to render
 *
 * @returns {JSX.Element} The rendered unordered list component
 *
 * This is the main list container component that manages:
 * - List depth tracking through React Context
 * - Theme configuration via tinky-theme
 * - Marker resolution for different nesting levels
 * - Nested list support with automatic depth increment
 *
 * The component uses two React Contexts:
 * 1. UnorderedListContext - Tracks the current nesting depth
 * 2. UnorderedListItemContext - Provides the marker character to items
 *
 * Marker resolution logic:
 * - If config.marker is a string, all items use that marker
 * - If config.marker is an array, markers are selected by depth index
 * - If no marker is found at the current depth, the last array element is used
 * - Falls back to defaultMarker if no valid marker is configured
 *
 * @example
 * Basic usage:
 * ```tsx
 * <UnorderedList>
 *   <UnorderedList.Item>
 *     <Text>First item</Text>
 *   </UnorderedList.Item>
 * </UnorderedList>
 * ```
 *
 * @example
 * With custom marker via theme:
 * ```tsx
 * const customTheme = extendTheme(defaultTheme, {
 *   components: {
 *     UnorderedList: {
 *       config: () => ({ marker: "•" })
 *     }
 *   }
 * });
 *
 * <ThemeProvider theme={customTheme}>
 *   <UnorderedList>...</UnorderedList>
 * </ThemeProvider>
 * ```
 *
 * @see {@link UnorderedListProps}
 * @see {@link UnorderedListItem}
 * @see {@link unorderedListTheme}
 */
export function UnorderedList({ children }: UnorderedListProps): JSX.Element {
  const { depth } = useContext(UnorderedListContext);
  const props = { children };
  const { styles, config } = useComponentTheme(
    "UnorderedList",
    unorderedListTheme,
    props,
  );

  const listContext = useMemo(
    () => ({
      depth: depth + 1,
    }),
    [depth],
  );

  const listItemContext = useMemo(() => {
    const resolvedConfig =
      typeof config === "function" ? config(props) : config;
    const marker = resolvedConfig?.marker as string | string[] | undefined;

    if (typeof marker === "string") {
      return { marker };
    }

    if (Array.isArray(marker)) {
      return {
        marker: marker[depth] ?? marker.at(-1) ?? defaultMarker,
      };
    }

    return {
      marker: defaultMarker,
    };
  }, [config, depth]);

  return (
    <UnorderedListContext.Provider value={listContext}>
      <UnorderedListItemContext.Provider value={listItemContext}>
        <Box {...styles.list}>{children}</Box>
      </UnorderedListItemContext.Provider>
    </UnorderedListContext.Provider>
  );
}

/**
 * Attached Item component for convenient access via UnorderedList.Item.
 *
 * @remarks
 * This pattern allows for a more natural JSX structure:
 * `<UnorderedList><UnorderedList.Item>...</UnorderedList.Item></UnorderedList>`
 *
 * @see {@link UnorderedListItem}
 */
UnorderedList.Item = UnorderedListItem;
