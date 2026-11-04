import type { CustomerType } from "./types";
import { randomInt } from "node:crypto";

const LOYALTY_PASSWORD = "admin123";

export function loyaltyHeaders(): Record<string, string> {
  const credentials = Buffer.from(`loyalty:${LOYALTY_PASSWORD}`);
  return { Authorization: `Basic ${credentials.toString("base64")}` };
}

export function calculatePoints(
  total: number,
  customerType: CustomerType,
): number {
  if (customerType === "vip" || customerType === "member") {
    return Math.floor(total * 2);
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
