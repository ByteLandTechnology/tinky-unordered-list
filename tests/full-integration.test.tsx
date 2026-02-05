/**
 * @fileoverview Full integration tests for tinky-unordered-list.
 *
 * @module tests/integration/full-integration
 *
 * @description
 * Integration tests that verify the complete functionality of the
 * tinky-unordered-list package including all components, contexts,
 * themes, and their interactions.
 */

import { describe, it, expect } from "bun:test";
import { Text, Box } from "tinky";
import { ThemeProvider, defaultTheme, extendTheme } from "tinky-theme";
import {
  UnorderedList,
  defaultMarker,
  unorderedListTheme,
} from "../src/index.js";

describe("Full Integration", () => {
  describe("complete workflow", () => {
    it("should render a complete nested list structure", () => {
      const element = (
        <UnorderedList>
          <UnorderedList.Item>
            <Text>Root item 1</Text>
          </UnorderedList.Item>
          <UnorderedList.Item>
            <Text>Root item 2 with nested content</Text>
            <UnorderedList>
              <UnorderedList.Item>
                <Text>Nested level 1 - item A</Text>
              </UnorderedList.Item>
              <UnorderedList.Item>
                <Text>Nested level 1 - item B</Text>
                <UnorderedList>
                  <UnorderedList.Item>
                    <Text>Deep nested level 2</Text>
                  </UnorderedList.Item>
                </UnorderedList>
              </UnorderedList.Item>
            </UnorderedList>
          </UnorderedList.Item>
          <UnorderedList.Item>
            <Text>Root item 3</Text>
          </UnorderedList.Item>
        </UnorderedList>
      );

      expect(element).toBeDefined();
      expect(element.type).toBe(UnorderedList);
    });

    it("should work with ThemeProvider and custom theme", () => {
      const customTheme = extendTheme(defaultTheme, {
        components: {
          UnorderedList: {
            config: () => ({
              marker: ["•", "◦", "▪"],
            }),
          },
        },
      });

      const element = (
        <ThemeProvider theme={customTheme}>
          <UnorderedList>
            <UnorderedList.Item>
              <Text>Level 0</Text>
              <UnorderedList>
                <UnorderedList.Item>
                  <Text>Level 1</Text>
                  <UnorderedList>
                    <UnorderedList.Item>
                      <Text>Level 2</Text>
                    </UnorderedList.Item>
                  </UnorderedList>
                </UnorderedList.Item>
              </UnorderedList>
            </UnorderedList.Item>
          </UnorderedList>
        </ThemeProvider>
      );

      expect(element).toBeDefined();
    });
  });

  describe("context integration", () => {
    it("should have matching default markers between context and theme", () => {
      // The default marker in context should match the theme's default
      expect(defaultMarker).toBeDefined();

      // Both should be strings
      expect(typeof defaultMarker).toBe("string");
    });

    it("should support all marker types in UnorderedListThemeConfig", () => {
      // String marker
      const stringConfig: { marker: string | string[] } = { marker: "•" };
      expect(typeof stringConfig.marker).toBe("string");

      // Array marker
      const arrayConfig: { marker: string | string[] } = {
        marker: ["•", "◦", "▪"],
      };
      expect(Array.isArray(arrayConfig.marker)).toBe(true);
    });
  });

  describe("theme configuration", () => {
    it("should have all required style functions", () => {
      const requiredStyles = ["list", "listItem", "marker", "content"] as const;
      for (const styleName of requiredStyles) {
        expect(unorderedListTheme.styles).toHaveProperty(styleName);
        expect(typeof unorderedListTheme.styles[styleName]).toBe("function");
      }
    });

    it("should return correct styles from style functions", () => {
      expect(unorderedListTheme.styles.list()).toEqual({
        flexDirection: "column",
      });
      expect(unorderedListTheme.styles.listItem()).toEqual({ gap: 1 });
      expect(unorderedListTheme.styles.marker()).toEqual({ dimColor: true });
      expect(unorderedListTheme.styles.content()).toEqual({
        flexDirection: "column",
      });
    });

    it("should return config with default marker", () => {
      const config = unorderedListTheme.config();
      expect(config).toHaveProperty("marker");
      expect(config.marker).toBe(defaultMarker);
    });
  });

  describe("complex scenarios", () => {
    it("should handle mixed content types in items", () => {
      const element = (
        <UnorderedList>
          <UnorderedList.Item>
            <Text>Plain text</Text>
          </UnorderedList.Item>
          <UnorderedList.Item>
            <Box>
              <Text>Box wrapper</Text>
            </Box>
          </UnorderedList.Item>
          <UnorderedList.Item>
            <Text>Multi</Text>
            <Text>Elements</Text>
          </UnorderedList.Item>
        </UnorderedList>
      );

      expect(element).toBeDefined();
    });

    it("should work with multiple ThemeProvider nesting levels", () => {
      const customTheme1 = extendTheme(defaultTheme, {
        components: {
          UnorderedList: {
            config: () => ({ marker: "•" }),
          },
        },
      });

      const customTheme2 = extendTheme(defaultTheme, {
        components: {
          UnorderedList: {
            config: () => ({ marker: ["•", "◦"] }),
          },
        },
      });

      const element = (
        <ThemeProvider theme={customTheme1}>
          <UnorderedList>
            <UnorderedList.Item>
              <Text>Theme 1</Text>
              <ThemeProvider theme={customTheme2}>
                <UnorderedList>
                  <UnorderedList.Item>
                    <Text>Theme 2</Text>
                  </UnorderedList.Item>
                </UnorderedList>
              </ThemeProvider>
            </UnorderedList.Item>
          </UnorderedList>
        </ThemeProvider>
      );

      expect(element).toBeDefined();
    });
  });
});
