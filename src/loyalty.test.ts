
import { describe, expect, test } from "vitest";
import {
  calculatePoints,
  generateRedeemCode,
  loyaltyHeaders ,
} from "./loyalty";

describe("calculatePoints", () => {
  test("gives regular customers one point per full euro", () => {
    expect(calculatePoints(10.99, "regular")).toBe(10);
  });

  test("gives members two points per full euro", () => {
    expect(calculatePoints(10.99, "member")).toBe(20);
  });

  test("gives VIP customers three points per full euro", () => {
    expect(calculatePoints(10.99, "vip")).toBe(30);
  });

  test("returns zero for an amount below one euro", () => {
    expect(calculatePoints(0.99, "regular")).toBe(0);
  });
});

describe("generateRedeemCode", () => {
  test("generates an eight-character uppercase alphanumeric code", () => {
    const code = generateRedeemCode();

    expect(code).toMatch(/^[0-9A-Z]{8}$/);
  });
});

test("creates a Basic authorization header when password is configured", () => {
  const originalPassword = process.env.LOYALTY_PASSWORD;

  try {
    process.env.LOYALTY_PASSWORD = "test-password";

    const headers = loyaltyHeaders();
    const expected = Buffer.from("loyalty:test-password").toString("base64");

    expect(headers.Authorization).toBe(`Basic ${expected}`);
  } finally {
    if (originalPassword === undefined) {
      delete process.env.LOYALTY_PASSWORD;
    } else {
      process.env.LOYALTY_PASSWORD = originalPassword;
    }
  }
});
  test("throws when the password is missing", () => {
    const originalPassword = process.env.LOYALTY_PASSWORD;
    delete process.env.LOYALTY_PASSWORD;

    try {
      expect(() => loyaltyHeaders()).toThrow(
        "LOYALTY_PASSWORD is not configured",
      );
    } finally {
      if (originalPassword !== undefined) {
        process.env.LOYALTY_PASSWORD = originalPassword;
      }
    }
  });

