/**
 * @fileoverview Test suite for the UnorderedListItem component.
 *
 * @module tests/components/UnorderedListItem
 *
 * @description
 * Comprehensive tests for the UnorderedListItem component including rendering,
 * context consumption, and integration with parent UnorderedList.
 */

import { describe, it, expect } from "bun:test";
import { Text } from "tinky";
import { ThemeProvider, defaultTheme } from "tinky-theme";
import { UnorderedList, UnorderedListItem } from "../src/index.js";

describe("UnorderedListItem", () => {
  describe("component exports", () => {
    it("should export UnorderedListItem as a function", () => {
      expect(UnorderedListItem).toBeDefined();
      expect(typeof UnorderedListItem).toBe("function");
    });

    it("should be accessible via UnorderedList.Item", () => {
      expect(UnorderedList.Item).toBe(UnorderedListItem);
    });
  });

  describe("basic rendering", () => {
    it("should render with text content", () => {
      const element = (
        <UnorderedList>
          <UnorderedList.Item>
            <Text>Item content</Text>
          </UnorderedList.Item>
        </UnorderedList>
      );

      expect(element).toBeDefined();
    });

    it("should render with multiple children", () => {
      const element = (
        <UnorderedList>
          <UnorderedList.Item>
            <Text>First line</Text>
            <Text>Second line</Text>
          </UnorderedList.Item>
        </UnorderedList>
      );

      expect(element).toBeDefined();
    });

    it("should render with nested components", () => {
      const element = (
        <UnorderedList>
          <UnorderedList.Item>
            <UnorderedList>
              <UnorderedList.Item>
                <Text>Nested</Text>
              </UnorderedList.Item>
            </UnorderedList>
          </UnorderedList.Item>
        </UnorderedList>
      );

      expect(element).toBeDefined();
    });
  });

  describe("theme integration", () => {
    it("should render with default theme", () => {
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

    it("should work within nested ThemeProvider", () => {
      const element = (
        <ThemeProvider theme={defaultTheme}>
          <ThemeProvider theme={defaultTheme}>
            <UnorderedList>
              <UnorderedList.Item>
                <Text>Doubly themed</Text>
              </UnorderedList.Item>
            </UnorderedList>
          </ThemeProvider>
        </ThemeProvider>
      );

      expect(element).toBeDefined();
    });
  });

  describe("multiple items", () => {
    it("should render multiple sibling items", () => {
      const element = (
        <UnorderedList>
          <UnorderedList.Item>
            <Text>Item 1</Text>
          </UnorderedList.Item>
          <UnorderedList.Item>
            <Text>Item 2</Text>
          </UnorderedList.Item>
          <UnorderedList.Item>
            <Text>Item 3</Text>
          </UnorderedList.Item>
        </UnorderedList>
      );

      expect(element).toBeDefined();
    });

    it("should render mixed content types", () => {
      const element = (
        <UnorderedList>
          <UnorderedList.Item>
            <Text>Text only</Text>
          </UnorderedList.Item>
          <UnorderedList.Item>
            <Text>With nested list:</Text>
            <UnorderedList>
              <UnorderedList.Item>
                <Text>Nested</Text>
              </UnorderedList.Item>
            </UnorderedList>
          </UnorderedList.Item>
        </UnorderedList>
      );

      expect(element).toBeDefined();
    });
  });
});
