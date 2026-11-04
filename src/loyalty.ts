import type { CustomerType } from "./types";
import { randomInt } from "node:crypto";

export function loyaltyHeaders(): Record<string, string> {
  const password = process.env.LOYALTY_PASSWORD;

  if (!password) {
    throw new Error("LOYALTY_PASSWORD is not configured");
  }

  const credentials = Buffer.from(`loyalty:${password}`);
  return { Authorization: `Basic ${credentials.toString("base64")}` };
}

export function calculatePoints(
  total: number,
  customerType: CustomerType,
): number {
  if (customerType === "vip") {
    return Math.floor(total) * 3;
  }

  if (customerType === "member") {
    return Math.floor(total) * 2;
  }

  return Math.floor(total);
}

export function generateRedeemCode(): string {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return Array.from(
    { length: 8 },
    () => characters[randomInt(characters.length)],
  ).join("");
}
