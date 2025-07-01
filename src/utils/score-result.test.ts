import { describe, test, expect } from "vitest";
import { calculateBonusPoints } from "./score-result";

describe("ウマとオカを計算する関数のテスト", () => {
  test("ウマが10-30の場合の計算が正しい", () => {
    const initialPoint = 25000;
    const returnPoint = 30000;
    const bonusPoint = "10-30";

    const result = calculateBonusPoints(initialPoint, returnPoint, bonusPoint);

    expect(result).toEqual([50, 10, -10, -30]);
  });

  test("ウマが05-10の場合の計算が正しい", () => {
    const initialPoint = 25000;
    const returnPoint = 30000;
    const bonusPoint = "05-10";

    const result = calculateBonusPoints(initialPoint, returnPoint, bonusPoint);

    expect(result).toEqual([30, 5, -5, -10]);
  });

  test("ウマがなしの場合の計算が正しい", () => {
    const initialPoint = 25000;
    const returnPoint = 30000;
    const bonusPoint = "00-00";

    const result = calculateBonusPoints(initialPoint, returnPoint, bonusPoint);

    expect(result).toEqual([20, 0, -0, -0]);
  });

  test("オカがなしの場合の計算が正しい", () => {
    const initialPoint = 30000;
    const returnPoint = 30000;
    const bonusPoint = "00-00";

    const result = calculateBonusPoints(initialPoint, returnPoint, bonusPoint);

    expect(result).toEqual([0, 0, -0, -0]);
  });

  test("オカが大き時の場合の計算が正しい", () => {
    const initialPoint = 25000;
    const returnPoint = 45000;
    const bonusPoint = "00-00";

    const result = calculateBonusPoints(initialPoint, returnPoint, bonusPoint);

    expect(result).toEqual([80, 0, -0, -0]);
  });

  test("オカがマイナス時の場合の計算が正しい", () => {
    const initialPoint = 30000;
    const returnPoint = 25000;
    const bonusPoint = "00-00";

    const result = calculateBonusPoints(initialPoint, returnPoint, bonusPoint);

    expect(result).toEqual([-20, 0, -0, -0]);
  });
});
