import { describe, test, expect } from "vitest";
import { calculateBonusPoints } from "./score-result";

describe("ウマとオカを計算する関数のテスト", () => {
  test("10-30の場合の計算が正しい", () => {
    const initialPoint = 25000;
    const returnPoint = 30000;
    const bonusPoint = "10-30";

    const result = calculateBonusPoints(initialPoint, returnPoint, bonusPoint);

    expect(result).toEqual([50, 10, -10, -30]);
  });

  test("05-10の場合の計算が正しい", () => {
    const initialPoint = 25000;
    const returnPoint = 30000;
    const bonusPoint = "05-10";

    const result = calculateBonusPoints(initialPoint, returnPoint, bonusPoint);

    expect(result).toEqual([30, 5, -5, -10]);
  });
});
