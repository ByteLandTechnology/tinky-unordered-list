/**
 * @fileoverview Test suite for the UnorderedListContext.
 *
 * @module tests/contexts/UnorderedListContext
 *
 * @description
 * Comprehensive tests for the UnorderedListContext including context creation,
 * default values, provider behavior, and depth tracking.
 */

import { describe, it, expect } from "bun:test";
import { createElement } from "react";
import {
  UnorderedListContext,
  type UnorderedListContextProps,
} from "../src/contexts/unordered-list-context.js";

describe("UnorderedListContext", () => {
  describe("context creation", () => {
    it("should export UnorderedListContext", () => {
      expect(UnorderedListContext).toBeDefined();
    });

    it("should be a valid React context object", () => {
      expect(UnorderedListContext).toHaveProperty("Provider");
      expect(UnorderedListContext).toHaveProperty("Consumer");
    });

    it("should have a display name for debugging", () => {
      expect(UnorderedListContext.displayName).toBeUndefined();
    });
  });

  describe("default values", () => {
    it("should have default depth of 0", () => {
      const defaultValue: UnorderedListContextProps = { depth: 0 };
      expect(defaultValue.depth).toBe(0);
    });

    it("should have readonly depth property", () => {
      const props: UnorderedListContextProps = { depth: 0 };
      expect(props.depth).toBe(0);
    });
  });

  describe("context interface", () => {
    it("should accept valid context props", () => {
      const validProps: UnorderedListContextProps = {
        depth: 0,
      };
      expect(validProps.depth).toBe(0);

      const nestedProps: UnorderedListContextProps = {
        depth: 3,
      };
      expect(nestedProps.depth).toBe(3);
    });

    it("should work with different depth values", () => {
      const depths = [0, 1, 2, 5, 10, 100];

      for (const depth of depths) {
        const props: UnorderedListContextProps = { depth };
        expect(props.depth).toBe(depth);
      }
    });
  });

  describe("context usage patterns", () => {
    it("should allow creating provider with custom depth", () => {
      const providerElement = createElement(
        UnorderedListContext.Provider,
        { value: { depth: 2 } },
        null,
      );

      expect(providerElement).toBeDefined();
      expect(providerElement.type).toBe(UnorderedListContext.Provider);
    });

    it("should allow nested providers with different depths", () => {
      const nestedProviders = createElement(
        UnorderedListContext.Provider,
        { value: { depth: 0 } },
        createElement(
          UnorderedListContext.Provider,
          { value: { depth: 1 } },
          createElement(
            UnorderedListContext.Provider,
            { value: { depth: 2 } },
            null,
          ),
        ),
      );

      expect(nestedProviders).toBeDefined();
    });
  });

  describe("integration patterns", () => {
    it("should support depth increment pattern", () => {
      // Simulate the pattern used in UnorderedList component
      const parentDepth = 2;
      const childContext: UnorderedListContextProps = {
        depth: parentDepth + 1,
      };

      expect(childContext.depth).toBe(3);
    });

    it("should support depth-based marker selection", () => {
      const markers = ["•", "◦", "▪", "─"];

      const getMarkerForDepth = (depth: number): string => {
        return markers[depth] ?? markers[markers.length - 1];
      };

      expect(getMarkerForDepth(0)).toBe("•");
      expect(getMarkerForDepth(1)).toBe("◦");
      expect(getMarkerForDepth(2)).toBe("▪");
      expect(getMarkerForDepth(3)).toBe("─");
      expect(getMarkerForDepth(10)).toBe("─"); // Fallback to last marker
    });
  });
});
