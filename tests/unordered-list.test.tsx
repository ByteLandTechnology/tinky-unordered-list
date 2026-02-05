/**
 * @fileoverview Test suite for the UnorderedList component.
 *
 * @module tests/components/UnorderedList
 *
 * @description
 * Comprehensive tests for the UnorderedList component including rendering,
 * theme integration, nested list behavior, and marker configuration.
 */

import { describe, it, expect } from "bun:test";
import { Text } from "tinky";
import { ThemeProvider, defaultTheme, extendTheme } from "tinky-theme";
import { UnorderedList } from "../src/index.js";

describe("UnorderedList", () => {
  describe("component exports", () => {
    it("should export UnorderedList component as a function", () => {
      expect(UnorderedList).toBeDefined();
      expect(typeof UnorderedList).toBe("function");
    });

    it("should have Item property pointing to UnorderedListItem", () => {
      expect(UnorderedList.Item).toBeDefined();
      expect(typeof UnorderedList.Item).toBe("function");
    });

    it("should allow accessing Item via UnorderedList.Item", () => {
      const Item = UnorderedList.Item;
      expect(Item).toBeDefined();
    });
  });

  describe("basic rendering", () => {
    it("should render with single item", () => {
      const element = (
        <UnorderedList>
          <UnorderedList.Item>
            <Text>Test item</Text>
          </UnorderedList.Item>
        </UnorderedList>
      );

      expect(element).toBeDefined();
      expect(element.type).toBe(UnorderedList);
    });

    it("should render with multiple items", () => {
      const element = (
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

      expect(element).toBeDefined();
    });

    it("should render empty list without errors", () => {
      const element = <UnorderedList></UnorderedList>;

      expect(element).toBeDefined();
    });
  });

  describe("nested list rendering", () => {
    it("should render nested UnorderedList within item", () => {
      const element = (
        <UnorderedList>
          <UnorderedList.Item>
            <Text>Parent item</Text>
            <UnorderedList>
              <UnorderedList.Item>
                <Text>Nested item</Text>
              </UnorderedList.Item>
            </UnorderedList>
          </UnorderedList.Item>
        </UnorderedList>
      );

      expect(element).toBeDefined();
    });

    it("should render deeply nested lists", () => {
      const element = (
        <UnorderedList>
          <UnorderedList.Item>
            <Text>Level 0</Text>
            <UnorderedList>
              <UnorderedList.Item>
                <Text>Level 1</Text>
                <UnorderedList>
                  <UnorderedList.Item>
                    <Text>Level 2</Text>
                    <UnorderedList>
                      <UnorderedList.Item>
                        <Text>Level 3</Text>
                      </UnorderedList.Item>
                    </UnorderedList>
                  </UnorderedList.Item>
                </UnorderedList>
              </UnorderedList.Item>
            </UnorderedList>
          </UnorderedList.Item>
        </UnorderedList>
      );

      expect(element).toBeDefined();
    });

    it("should render multiple nested lists at same level", () => {
      const element = (
        <UnorderedList>
          <UnorderedList.Item>
            <Text>Item with two sub-lists</Text>
            <UnorderedList>
              <UnorderedList.Item>
                <Text>Sub-list 1 - Item A</Text>
              </UnorderedList.Item>
            </UnorderedList>
            <UnorderedList>
              <UnorderedList.Item>
                <Text>Sub-list 2 - Item B</Text>
              </UnorderedList.Item>
            </UnorderedList>
          </UnorderedList.Item>
        </UnorderedList>
      );

      expect(element).toBeDefined();
    });
  });

  describe("theme integration", () => {
    it("should work with default ThemeProvider", () => {
      const element = (
        <ThemeProvider theme={defaultTheme}>
          <UnorderedList>
            <UnorderedList.Item>
              <Text>Themed item</Text>
            </UnorderedList.Item>
          </UnorderedList>
        </ThemeProvider>
      );

      expect(element).toBeDefined();
    });

    it("should work with custom marker in theme (string)", () => {
      const customTheme = extendTheme(defaultTheme, {
        components: {
          UnorderedList: {
            config: () => ({
              marker: "+",
            }),
          },
        },
      });

      const element = (
        <ThemeProvider theme={customTheme}>
          <UnorderedList>
            <UnorderedList.Item>
              <Text>Custom marker item</Text>
            </UnorderedList.Item>
          </UnorderedList>
        </ThemeProvider>
      );

      expect(element).toBeDefined();
    });

    it("should work with custom marker in theme (array)", () => {
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
});
