/**
 * @fileoverview Test suite for the unordered-list-theme module.
 *
 * @module tests/themes/unordered-list-theme
 *
 * @description
 * Comprehensive tests for the theme configuration including style functions,
 * marker configuration, and type definitions.
 */

import { describe, it, expect } from "bun:test";
import {
  defaultMarker,
  unorderedListTheme,
  type UnorderedListThemeConfig,
} from "../src/themes/unordered-list-theme.js";

describe("unordered-list-theme", () => {
  describe("defaultMarker export", () => {
    it("should export defaultMarker as a string", () => {
      expect(defaultMarker).toBeDefined();
      expect(typeof defaultMarker).toBe("string");
    });

    it("should have a non-empty marker value", () => {
      expect(defaultMarker.length).toBeGreaterThan(0);
    });

    it("should be a single character", () => {
      expect([...defaultMarker].length).toBe(1);
    });
  });

  describe("unorderedListTheme export", () => {
    it("should export unorderedListTheme as an object", () => {
      expect(unorderedListTheme).toBeDefined();
      expect(typeof unorderedListTheme).toBe("object");
    });

    it("should have styles property", () => {
      expect(unorderedListTheme).toHaveProperty("styles");
      expect(typeof unorderedListTheme.styles).toBe("object");
    });

    it("should have config property", () => {
      expect(unorderedListTheme).toHaveProperty("config");
      expect(typeof unorderedListTheme.config).toBe("function");
    });
  });

  describe("theme styles", () => {
    describe("list style", () => {
      it("should export list style function", () => {
        expect(typeof unorderedListTheme.styles.list).toBe("function");
      });

      it("should return BoxProps with column flexDirection", () => {
        const styles = unorderedListTheme.styles.list();
        expect(styles).toHaveProperty("flexDirection", "column");
      });

      it("should return an object", () => {
        const styles = unorderedListTheme.styles.list();
        expect(typeof styles).toBe("object");
      });
    });

    describe("listItem style", () => {
      it("should export listItem style function", () => {
        expect(typeof unorderedListTheme.styles.listItem).toBe("function");
      });

      it("should return BoxProps with gap", () => {
        const styles = unorderedListTheme.styles.listItem();
        expect(styles).toHaveProperty("gap", 1);
      });

      it("should return an object", () => {
        const styles = unorderedListTheme.styles.listItem();
        expect(typeof styles).toBe("object");
      });
    });

    describe("marker style", () => {
      it("should export marker style function", () => {
        expect(typeof unorderedListTheme.styles.marker).toBe("function");
      });

      it("should return TextProps with dimColor", () => {
        const styles = unorderedListTheme.styles.marker();
        expect(styles).toHaveProperty("dimColor", true);
      });

      it("should return an object", () => {
        const styles = unorderedListTheme.styles.marker();
        expect(typeof styles).toBe("object");
      });
    });

    describe("content style", () => {
      it("should export content style function", () => {
        expect(typeof unorderedListTheme.styles.content).toBe("function");
      });

      it("should return BoxProps with column flexDirection", () => {
        const styles = unorderedListTheme.styles.content();
        expect(styles).toHaveProperty("flexDirection", "column");
      });

      it("should return an object", () => {
        const styles = unorderedListTheme.styles.content();
        expect(typeof styles).toBe("object");
      });
    });
  });

  describe("theme config", () => {
    it("should return UnorderedListThemeConfig object", () => {
      const config = unorderedListTheme.config();
      expect(typeof config).toBe("object");
    });

    it("should have marker property", () => {
      const config = unorderedListTheme.config();
      expect(config).toHaveProperty("marker");
    });

    it("should have string marker by default", () => {
      const config = unorderedListTheme.config();
      expect(typeof config.marker).toBe("string");
    });

    it("should use defaultMarker as the marker value", () => {
      const config = unorderedListTheme.config();
      expect(config.marker).toBe(defaultMarker);
    });
  });

  describe("UnorderedListThemeConfig type", () => {
    it("should accept string marker", () => {
      const config: UnorderedListThemeConfig = {
        marker: "•",
      };
      expect(config.marker).toBe("•");
    });

    it("should accept array marker", () => {
      const config: UnorderedListThemeConfig = {
        marker: ["•", "◦", "▪"],
      };
      expect(Array.isArray(config.marker)).toBe(true);
    });

    it("should accept various marker characters", () => {
      const markers = ["•", "◦", "▪", "─", "*", "-", "+", ">", "→"];

      for (const marker of markers) {
        const config: UnorderedListThemeConfig = { marker };
        expect(config.marker).toBe(marker);
      }
    });
  });

  describe("theme type constraints", () => {
    it("should satisfy ComponentTheme interface", () => {
      // The theme uses `satisfies` operator, which validates at compile time
      // At runtime, we verify the structure
      expect(unorderedListTheme).toHaveProperty("styles");
      expect(unorderedListTheme).toHaveProperty("config");
      expect(typeof unorderedListTheme.styles).toBe("object");
      expect(typeof unorderedListTheme.config).toBe("function");
    });

    it("should have all required style functions", () => {
      const requiredStyles = ["list", "listItem", "marker", "content"];

      for (const style of requiredStyles) {
        expect(unorderedListTheme.styles).toHaveProperty(style);
        expect(
          typeof (
            unorderedListTheme.styles as Record<
              string,
              (...args: unknown[]) => unknown
            >
          )[style],
        ).toBe("function");
      }
    });
  });
});
