/**
 * @fileoverview UnorderedListItem component implementation for terminal UI applications.
 *
 * @module components/UnorderedListItem
 *
 * @description
 * This module provides the UnorderedListItem component for rendering individual
 * list items within an UnorderedList. Each item displays a marker character
 * (bullet) followed by the item content. The marker is determined by the parent
 * UnorderedList based on the current nesting depth and theme configuration.
 *
 * Key features:
 * - Marker display via React Context from parent UnorderedList
 * - Theme-based styling integration
 * - Flexible content rendering (any ReactNode)
 * - Consistent layout with marker and content separation
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
 * With nested content:
 * ```tsx
 * <UnorderedList.Item>
 *   <Text>Parent item</Text>
 *   <UnorderedList>
 *     <UnorderedList.Item>
 *       <Text>Nested child item</Text>
 *     </UnorderedList.Item>
 *   </UnorderedList>
 * </UnorderedList.Item>
 * ```
 */

import { Box, Text } from "tinky";
import { JSX, useContext, type ReactNode } from "react";
import { useComponentTheme } from "tinky-theme";
import { unorderedListTheme } from "../themes/unordered-list-theme.js";
import { UnorderedListItemContext } from "../contexts/unordered-list-item-context.js";

/**
 * Props for the UnorderedListItem component.
 *
 * @interface UnorderedListItemProps
 *
 * @property {ReactNode} children - The content to render within the list item.
 *   Can be any valid ReactNode including text, elements, or nested components.
 *   The content is rendered to the right of the marker character.
 *
 * @example
 * ```tsx
 * <UnorderedList.Item>
 *   <Text>Simple text content</Text>
 * </UnorderedList.Item>
 *
 * <UnorderedList.Item>
 *   <Box>
 *     <Text>Complex</Text>
 *     <Text>Multi-line content</Text>
 *   </Box>
 * </UnorderedList.Item>
 * ```
 */
export interface UnorderedListItemProps {
  readonly children: ReactNode;
}

/**
 * UnorderedListItem component for rendering individual list items.
 *
 * @param {UnorderedListItemProps} props - Component props
 * @param {ReactNode} props.children - Content to render within the item
 *
 * @returns {JSX.Element} The rendered list item component
 *
 * This component renders an individual item within an UnorderedList. It:
 * - Consumes marker configuration from UnorderedListItemContext
 * - Applies theme-based styling via tinky-theme
 * - Renders a marker character followed by the item content
 * - Uses Box and Text components from tinky for layout
 *
 * The component layout consists of:
 * 1. A marker Text element (the bullet character)
 * 2. A content Box containing the children
 *
 * Both elements are wrapped in a flex container with appropriate spacing.
 *
 * @example
 * Basic usage:
 * ```tsx
 * <UnorderedList.Item>
 *   <Text>List item content</Text>
 * </UnorderedList.Item>
 * ```
 *
 * @see {@link UnorderedListItemProps}
 * @see {@link UnorderedList}
 * @see {@link UnorderedListItemContext}
 */
export function UnorderedListItem({
  children,
}: UnorderedListItemProps): JSX.Element {
  const { marker } = useContext(UnorderedListItemContext);
  const props = { children };
  const { styles } = useComponentTheme(
    "UnorderedList",
    unorderedListTheme,
    props,
  );

  return (
    <Box {...styles.listItem}>
      <Text {...styles.marker}>{marker}</Text>
      <Box {...styles.content}>{children}</Box>
    </Box>
  );
}
