import { describe, test, expect } from "vitest";
import { getAllScores } from "./mahjong-calculation";

describe("飜数と符数に応じた点数を計算する関数のテスト", () => {
  test("テスト１", () => {
    const han = 2;
    const fu = 40;

    const result = getAllScores(han, fu);

    expect(result).toEqual({
      oyaRon: "3900",
      oyaTsumo: "1300オール",
      coRon: "2600",
      coTsumo: "1300/700",
      han: 2,
      fu: 40,
      isValid: true,
    });
  });
});
