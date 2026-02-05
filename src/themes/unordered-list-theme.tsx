/**
 * @fileoverview Theme configuration and styling for UnorderedList components.
 *
 * @module themes/UnorderedListTheme
 *
 * @description
 * This module provides the default theme configuration for UnorderedList components,
 * including marker characters, style functions, and theme configuration options.
 *
 * The theme system supports:
 * - Customizable marker characters for list items
 * - Array-based markers for different nesting levels
 * - Consistent styling across all list elements
 * - Integration with the tinky-theme system
 *
 * The module exports:
 * 1. `defaultMarker` - The default marker character
 * 2. `UnorderedListThemeConfig` - Configuration interface for custom markers
 * 3. `unorderedListTheme` - Complete theme with styles and config
 * 4. `UnorderedListTheme` - Type definition of the theme
 *
 * @example
 * Using the default theme:
 * ```tsx
 * import { UnorderedList, unorderedListTheme } from "tinky-unordered-list";
 * import { ThemeProvider } from "tinky-theme";
 *
 * <ThemeProvider theme={{ components: { UnorderedList: unorderedListTheme } }}>
 *   <UnorderedList>
 *     <UnorderedList.Item>First item</UnorderedList.Item>
 *   </UnorderedList>
 * </ThemeProvider>
 * ```
 *
 * @example
 * Customizing markers via theme config:
 * ```tsx
 * import { extendTheme } from "tinky-theme";
 * import { unorderedListTheme } from "tinky-unordered-list";
 *
 * const customTheme = extendTheme(defaultTheme, {
 *   components: {
 *     UnorderedList: {
 *       config: () => ({
 *         marker: ["•", "◦", "▪", "─"]
 *       })
 *     }
 *   }
 * });
 * ```
 *
 * @see {@link defaultMarker}
 * @see {@link UnorderedListThemeConfig}
 * @see {@link unorderedListTheme}
 * @see {@link UnorderedList}
 */

import { type BoxProps, type TextProps } from "tinky";
import figures from "figures";
import { type ComponentTheme } from "tinky-theme";

/**
 * Default marker character for unordered list items.
 *
 * This marker is used when no custom marker is configured in the theme.
 * The default marker is the box drawing line character (─) from the figures library.
 *
 * Default marker characteristics:
 * - Character: `figures.line` (typically "─" or "─")
 * - Visual style: Horizontal line figure
 * - Usage: Suitable for terminal UIs with box drawing support
 *
 * The default marker was chosen because:
 * - Works well in most terminal environments
 * - Creates clean visual separation
 * - Compatible with monospaced fonts
 * - Less visually intrusive than bullet points in some terminals
 *
 * @example
 * ```typescript
 * import { defaultMarker } from "tinky-unordered-list";
 *
 * console.log(defaultMarker); // Output: "─"
 * ```
 *
 * @example
 * Using default marker in custom context:
 * ```tsx
 * import { defaultMarker } from "tinky-unordered-list";
 * import { UnorderedListItemContext } from "./contexts/unordered-list-item-context.js";
 *
 * <UnorderedListItemContext.Provider value={{ marker: defaultMarker }}>
 *   <UnorderedList.Item>Item with default marker</UnorderedList.Item>
 * </UnorderedListItemContext.Provider>
 * ```
 *
 * @see {@link UnorderedListThemeConfig}
 * @see {@link unorderedListTheme}
 */
export const defaultMarker = figures.line;

/**
 * Configuration interface for UnorderedList theme markers.
 *
 * @interface UnorderedListThemeConfig
 *
 * @property {string | string[]} marker - The marker configuration for list items.
 *
 * Marker configuration options:
 *
 * **Single marker (string)**:
 * - All list items use the same marker character
 * - Example: `{ marker: "•" }` uses bullet points at all levels
 * - Example: `{ marker: "-" }` uses hyphens at all levels
 *
 * **Array of markers (string[])**:
 * - Different markers for different nesting levels
 * - The depth index determines which marker to use
 * - If depth exceeds array length, the last marker is reused
 *
 * Array-based marker resolution:
 * - Depth 0: `markers[0]`
 * - Depth 1: `markers[1]`
 * - Depth 2: `markers[2]`
 * - Depth N (where N >= length): `markers[length - 1]`
 *
 * Common marker characters:
 * - `"•"` - Bullet point (●)
 * - `"◦"` - White bullet (○)
 * - `"▪"` - Small black square (■)
 * - `"─"` - Horizontal line (default)
 * - `"*"` - Asterisk
 * - `"-"` - Hyphen
 * - `">"` - Greater-than (right arrow)
 * - `"→"` - Right arrow
 *
 * @example
 * Single marker configuration:
 * ```typescript
 * import type { UnorderedListThemeConfig } from "tinky-unordered-list";
 *
 * const singleMarkerConfig: UnorderedListThemeConfig = {
 *   marker: "•"
 * };
 *
 * // All items use "•"
 * // Root: └• Item 1
 * // Nest: └• Item 2
 * ```
 *
 * @example
 * Array marker configuration:
 * ```typescript
 * import type { UnorderedListThemeConfig } from "tinky-unordered-list";
 *
 * const arrayMarkerConfig: UnorderedListThemeConfig = {
 *   marker: ["•", "◦", "▪", "─"]
 * };
 *
 * // Different markers at each level
 * // Depth 0: └• Item 1
 * // Depth 1:   └◦ Nested item 1
 * // Depth 2:     └▪ Deeply nested item
 * // Depth 3+:     └─ Fallback to last marker
 * ```
 *
 * @example
 * Creating a custom theme with array markers:
 * ```tsx
 * import { extendTheme } from "tinky-theme";
 * import type { UnorderedListThemeConfig } from "tinky-unordered-list";
 *
 * const customTheme = extendTheme(defaultTheme, {
 *   components: {
 *     UnorderedList: {
 *       config: (): UnorderedListThemeConfig => ({
 *         marker: ["▸", "└", " "├"]
 *       })
 *     }
 *   }
 * });
 * ```
 *
 * @see {@link defaultMarker}
 * @see {@link unorderedListTheme}
 * @see {@link UnorderedList}
 */
export interface UnorderedListThemeConfig extends Record<string, unknown> {
  marker: string | string[];
}

/**
 * Default theme configuration for UnorderedList components.
 *
 * This theme provides all necessary style functions and configuration for rendering
 * UnorderedList components in terminal UIs. It follows the tinky-theme
 * ComponentTheme interface for seamless integration with the theme system.
 *
 * Theme structure:
 * - `styles` - Style functions for each component element
 * - `config` - Configuration function returning theme options
 *
 * Style functions:
 * Each style function returns props for the corresponding component:
 * - `styles.list()` - BoxProps for the container list
 * - `styles.listItem()` - BoxProps for individual list items
 * - `styles.marker()` - TextProps for the marker text
 * - `styles.content()` - BoxProps for the item content
 *
 * Configuration:
 * - `config()` - Returns UnorderedListThemeConfig with marker settings
 *
 * @example
 * Using the theme directly:
 * ```tsx
 * import { unorderedListTheme } from "tinky-unordered-list";
 *
 * const { styles } = unorderedListTheme;
 * const listProps = styles.list();
 * // listProps === { flexDirection: "column" }
 * ```
 *
 * @example
 * Integrating with theme provider:
 * ```tsx
 * import { ThemeProvider } from "tinky-theme";
 * import { unorderedListTheme } from "tinky-unordered-list";
 *
 * <ThemeProvider theme={{
 *   components: {
 *     UnorderedList: unorderedListTheme
 *   }
 * }}>
 *   <UnorderedList>
 *     <UnorderedList.Item>Item 1</UnorderedList.Item>
 *   </UnorderedList>
 * </ThemeProvider>
 * ```
 *
 * @see {@link UnorderedListTheme}
 * @see {@link UnorderedListThemeConfig}
 * @see {@link defaultMarker}
 */
export const unorderedListTheme = {
  styles: {
    /**
     * Style function for the list container.
     *
     * @returns {BoxProps} Props for rendering the list container
     *
     * The list container uses a column flex layout to stack list items vertically.
     *
     * Applied styles:
     * - `flexDirection: "column"` - Stacks items top-to-bottom
     *
     * @example
     * ```typescript
     * import { unorderedListTheme } from "tinky-unordered-list";
     *
     * const listStyles = unorderedListTheme.styles.list();
     * // Returns: { flexDirection: "column" }
     *
     * <Box {...listStyles}>
     *   <UnorderedList.Item>Item 1</UnorderedList.Item>
     * </Box>
     * ```
     */
    list: (): BoxProps => ({
      flexDirection: "column",
    }),

    /**
     * Style function for individual list items.
     *
     * @returns {BoxProps} Props for rendering each list item
     *
     * Each list item is a flex container that includes the marker and content.
     *
     * Applied styles:
     * - `gap: 1` - Adds spacing between marker and content
     *
     * @example
     * ```typescript
     * import { unorderedListTheme } from "tinky-unordered-list";
     *
     * const itemStyles = unorderedListTheme.styles.listItem();
     * // Returns: { gap: 1 }
     *
     * <Box {...itemStyles}>
     *   <Text>•</Text>
     *   <Text>Item content</Text>
     * </Box>
     * ```
     */
    listItem: (): BoxProps => ({
      gap: 1,
    }),

    /**
     * Style function for the marker text element.
     *
     * @returns {TextProps} Props for rendering the marker character
     *
     * The marker is typically a bullet point or similar character.
     *
     * Applied styles:
     * - `dimColor: true` - Renders marker in dimmed color for visual hierarchy
     *
     * Dimming the marker creates a visual distinction between the marker
     * and the content, making the list easier to scan.
     *
     * @example
     * ```typescript
     * import { unorderedListTheme } from "tinky-unordered-list";
     *
     * const markerStyles = unorderedListTheme.styles.marker();
     * // Returns: { dimColor: true }
     *
     * <Text {...markerStyles}>•</Text>
     * ```
     */
    marker: (): TextProps => ({
      dimColor: true,
    }),

    /**
     * Style function for the item content container.
     *
     * @returns {BoxProps} Props for rendering item content
     *
     * The content container holds the actual item text/elements.
     *
     * Applied styles:
     * - `flexDirection: "column"` - Stacks content elements vertically
     *
     * This allows items to contain multiple elements (text, nested lists, etc.)
     * while maintaining proper layout.
     *
     * @example
     * ```typescript
     * import { unorderedListTheme } from "tinky-unordered-list";
     *
     * const contentStyles = unorderedListTheme.styles.content();
     * // Returns: { flexDirection: "column" }
     *
     * <Box {...contentStyles}>
     *   <Text>Primary content</Text>
     *   <Text>Secondary content</Text>
     * </Box>
     * ```
     */
    content: (): BoxProps => ({
      flexDirection: "column",
    }),
  },

  /**
   * Configuration function for the UnorderedList theme.
   *
   * @returns {UnorderedListThemeConfig} Theme configuration object with marker settings
   *
   * This function returns the default marker configuration for the theme.
   * The marker can be overridden by providing a custom theme configuration.
   *
   * Default configuration:
   * - `marker: figures.line` - Uses the line figure as the default marker
   *
   * @example
   * ```typescript
   * import { unorderedListTheme } from "tinky-unordered-list";
   *
   * const config = unorderedListTheme.config();
   * // Returns: { marker: "─" }
   * ```
   *
   * @example
   * Customizing via theme extension:
   * ```tsx
   * import { extendTheme } from "tinky-theme";
   * import { unorderedListTheme } from "tinky-unordered-list";
   *
   * const customTheme = extendTheme(defaultTheme, {
   *   components: {
   *     UnorderedList: {
   *       config: () => ({
   *         marker: ["•", "◦", "▪"]
   *       })
   *     }
   *   }
   * });
   * ```
   */
  config: (): UnorderedListThemeConfig => ({
    marker: figures.line,
  }),
} satisfies ComponentTheme;

/**
 * Type definition for the UnorderedList theme.
 *
 * @type {typeof unorderedListTheme}
 *
 * This type represents the complete theme structure for UnorderedList components,
 * including all style functions and the configuration function.
 *
 * Type structure:
 * ```typescript
 * type UnorderedListTheme = {
 *   styles: {
 *     list: () => BoxProps;
 *     listItem: () => BoxProps;
 *     marker: () => TextProps;
 *     content: () => BoxProps;
 *   };
 *   config: () => UnorderedListThemeConfig;
 * }
 * ```
 *
 * @example
 * Creating a custom theme that extends the base:
 * ```typescript
 * import type { UnorderedListTheme } from "tinky-unordered-list";
 * import type { ComponentTheme } from "tinky-theme";
 *
 * const customTheme: UnorderedListTheme = {
 *   ...unorderedListTheme,
 *   styles: {
 *     ...unorderedListTheme.styles,
 *     listItem: () => ({
 *       gap: 2  // Increased spacing
 *     })
 *   },
 *   config: () => ({
 *     marker: ["•", "◦", "▪"]  // Custom markers
 *   })
 * };
 * ```
 *
 * @see {@link unorderedListTheme}
 * @see {@link UnorderedListThemeConfig}
 * @see {@link ComponentTheme}
 */
export type UnorderedListTheme = typeof unorderedListTheme;
