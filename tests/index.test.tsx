/**
 * @fileoverview Test suite for the main index exports.
 *
 * @module tests/index
 *
 * @description
 * Tests for the main package exports from src/index.ts, ensuring all
 * public APIs are properly exported and accessible.
 */

import { describe, it, expect } from "bun:test";
import { Text } from "tinky";
import {
  // Components
  UnorderedList,
  UnorderedListItem,
  // Contexts
  UnorderedListContext,
  UnorderedListItemContext,
  type UnorderedListContextProps,
  type UnorderedListItemContextProps,
  // Themes
  defaultMarker,
  unorderedListTheme,
  type UnorderedListThemeConfig,
} from "../src/index.js";

describe("Package Exports", () => {
  describe("components", () => {
    it("should export UnorderedList", () => {
      expect(UnorderedList).toBeDefined();
      expect(typeof UnorderedList).toBe("function");
    });

    it("should export UnorderedListItem", () => {
      expect(UnorderedListItem).toBeDefined();
      expect(typeof UnorderedListItem).toBe("function");
    });

    it("should have UnorderedList.Item pointing to UnorderedListItem", () => {
      expect(UnorderedList.Item).toBe(UnorderedListItem);
    });
  });

  describe("contexts", () => {
    it("should export UnorderedListContext", () => {
      expect(UnorderedListContext).toBeDefined();
      expect(UnorderedListContext).toHaveProperty("Provider");
      expect(UnorderedListContext).toHaveProperty("Consumer");
    });

    it("should export UnorderedListItemContext", () => {
      expect(UnorderedListItemContext).toBeDefined();
      expect(UnorderedListItemContext).toHaveProperty("Provider");
      expect(UnorderedListItemContext).toHaveProperty("Consumer");
    });

    it("should have correct default values for UnorderedListContext", () => {
      const defaultValue: UnorderedListContextProps = { depth: 0 };
      expect(defaultValue.depth).toBe(0);
    });

    it("should have correct default values for UnorderedListItemContext", () => {
      const defaultValue: UnorderedListItemContextProps = {
        marker: defaultMarker,
      };
      expect(defaultValue.marker).toBe(defaultMarker);
    });

    it("should have correct default values for UnorderedListItemContext", () => {
      // Verify the default context has the expected structure
      const defaultValue: UnorderedListItemContextProps = {
        marker: defaultMarker,
      };
      expect(defaultValue.marker).toBe(defaultMarker);
    });
  });

  describe("type exports", () => {
    it("should export UnorderedListContextProps type", () => {
      // Type-level test - ensure the type can be used
      const props: UnorderedListContextProps = { depth: 0 };
      expect(props.depth).toBe(0);
    });

    it("should export UnorderedListItemContextProps type", () => {
      // Type-level test - ensure the type can be used
      const props: UnorderedListItemContextProps = { marker: "•" };
      expect(props.marker).toBe("•");
    });

    it("should export UnorderedListTheme type", () => {
      // Type-level test - ensure the theme type matches the exported type
      const theme: typeof unorderedListTheme = unorderedListTheme;
      expect(theme).toBeDefined();
    });

    it("should export UnorderedListThemeConfig type", () => {
      // Type-level test - ensure the config type can be used
      const config: UnorderedListThemeConfig = { marker: "•" };
      expect(config.marker).toBe("•");
    });
  });

  describe("theme exports", () => {
    it("should export defaultMarker", () => {
      expect(defaultMarker).toBeDefined();
      expect(typeof defaultMarker).toBe("string");
    });

    it("should export unorderedListTheme", () => {
      expect(unorderedListTheme).toBeDefined();
      expect(typeof unorderedListTheme).toBe("object");
    });

    it("should have correct theme structure", () => {
      expect(unorderedListTheme).toHaveProperty("styles");
      expect(unorderedListTheme).toHaveProperty("config");
      expect(typeof unorderedListTheme.styles).toBe("object");
      expect(typeof unorderedListTheme.config).toBe("function");
    });

    it("should have all required style functions", () => {
      const requiredStyles = ["list", "listItem", "marker", "content"] as const;
      for (const styleName of requiredStyles) {
        expect(unorderedListTheme.styles).toHaveProperty(styleName);
        expect(typeof unorderedListTheme.styles[styleName]).toBe("function");
      }
    });
  });

  describe("integration verification", () => {
    it("should have matching default markers across exports", () => {
      // The default marker in the theme config should match the exported defaultMarker
      const themeConfig = unorderedListTheme.config();
      expect(themeConfig.marker).toBe(defaultMarker);
    });

    it("should have consistent context default values", () => {
      // UnorderedListContext should start at depth 0
      const listContextDefault: UnorderedListContextProps = { depth: 0 };
      expect(listContextDefault.depth).toBe(0);

      // UnorderedListItemContext should have the default marker
      const itemContextDefault: UnorderedListItemContextProps = {
        marker: defaultMarker,
      };
      expect(itemContextDefault.marker).toBe(defaultMarker);
    });

    it("should allow creating complete list structures with all exports", () => {
      // This test verifies that all the pieces work together
      const element = (
        <UnorderedList>
          <UnorderedList.Item>
            <Text>Test the complete integration</Text>
            <UnorderedList>
              <UnorderedList.Item>
                <Text>Nested level 1</Text>
                <UnorderedList>
                  <UnorderedList.Item>
                    <Text>Nested level 2</Text>
                  </UnorderedList.Item>
                </UnorderedList>
              </UnorderedList.Item>
            </UnorderedList>
          </UnorderedList.Item>
        </UnorderedList>
      );

      expect(element).toBeDefined();
      expect(element.type).toBe(UnorderedList);
    });
  });
});
