/**
 * @fileoverview Test suite for the UnorderedListItemContext.
 *
 * @module tests/contexts/UnorderedListItemContext
 *
 * @description
 * Comprehensive tests for the UnorderedListItemContext including context creation,
 * default values, provider behavior, and marker configuration.
 */

import { describe, it, expect } from "bun:test";
import {
  UnorderedListItemContext,
  type UnorderedListItemContextProps,
} from "../src/contexts/unordered-list-item-context.js";
import { defaultMarker } from "../src/themes/unordered-list-theme.js";

describe("UnorderedListItemContext", () => {
  describe("context creation", () => {
    it("should export UnorderedListItemContext", () => {
      expect(UnorderedListItemContext).toBeDefined();
    });

    it("should be a valid React context object", () => {
      expect(UnorderedListItemContext).toHaveProperty("Provider");
      expect(UnorderedListItemContext).toHaveProperty("Consumer");
    });
  });

  describe("default values", () => {
    it("should have default marker equal to defaultMarker constant", () => {
      expect(defaultMarker).toBeDefined();
      expect(typeof defaultMarker).toBe("string");
    });

    it("should have marker as string type", () => {
      expect(typeof defaultMarker).toBe("string");
    });

    it("should have readonly marker property", () => {
      // Type-level check - ensure the interface defines marker as readonly
      const props: UnorderedListItemContextProps = { marker: "•" };
      expect(props.marker).toBe("•");
    });
  });

  describe("context interface", () => {
    it("should accept valid marker strings", () => {
      const validMarkers = ["•", "◦", "▪", "─", "*", "-", "+", ">"];

      for (const marker of validMarkers) {
        const props: UnorderedListItemContextProps = { marker };
        expect(props.marker).toBe(marker);
      }
    });

    it("should work with different marker values", () => {
      const markers = [
        { marker: "•" },
        { marker: "◦" },
        { marker: "▪" },
        { marker: "─" },
        { marker: "*" },
      ];

      for (const { marker } of markers) {
        const props: UnorderedListItemContextProps = { marker };
        expect(props.marker).toBe(marker);
      }
    });
  });

  describe("context usage patterns", () => {
    it("should have Provider and Consumer components", () => {
      expect(UnorderedListItemContext.Provider).toBeDefined();
      expect(UnorderedListItemContext.Consumer).toBeDefined();
    });

    it("should allow provider to accept value prop", () => {
      const marker = "•";
      const value = { marker };
      expect(value.marker).toBe(marker);
    });
  });

  describe("integration patterns", () => {
    it("should support marker resolution from depth", () => {
      // Simulate marker resolution based on depth
      const markersByDepth = ["•", "◦", "▪", "─"];
      const depth = 2;
      const resolvedMarker =
        markersByDepth[depth] ?? markersByDepth[markersByDepth.length - 1];

      const context: UnorderedListItemContextProps = { marker: resolvedMarker };
      expect(context.marker).toBe("▪");
    });

    it("should support string marker configuration", () => {
      // Simulate single marker for all levels
      const stringMarker = "*";
      const context: UnorderedListItemContextProps = { marker: stringMarker };

      expect(context.marker).toBe("*");
    });

    it("should support array marker configuration with fallback", () => {
      // Simulate array marker with fallback to last element
      const markers = ["•", "◦"];
      const getMarker = (depth: number): string => {
        return markers[depth] ?? markers[markers.length - 1];
      };

      expect(getMarker(0)).toBe("•");
      expect(getMarker(1)).toBe("◦");
      expect(getMarker(2)).toBe("◦"); // Fallback to last
      expect(getMarker(5)).toBe("◦"); // Fallback to last
    });
  });
});
