import { describe, test, expect } from "vitest";
import { getSanmaAllScores, getLimitName } from "./sanma-mahjong-calculation";

describe("3人麻雀の翻数と符数に応じた点数を計算する関数のテスト", () => {
  test("テスト1: 2翻40符（通常の計算）", () => {
    const [han, fu] = [2, 40];
    const result = getSanmaAllScores(han, fu);

    expect(result).toEqual({
      oyaRon: "3900",
      oyaTsumo: "2000 All",
      coRon: "2600",
      coTsumo: "1700 / 1100",
    });
  });

  test("テスト2: 2翻25符（七対子）", () => {
    const [han, fu] = [2, 25];
    const result = getSanmaAllScores(han, fu);

    expect(result).toEqual({
      oyaRon: "2400",
      oyaTsumo: "null",
      coRon: "1600",
      coTsumo: "null",
    });
  });

  test("テスト3: 3翻20符（平和ツモ）", () => {
    const [han, fu] = [3, 20];
    const result = getSanmaAllScores(han, fu);

    expect(result).toEqual({
      oyaRon: "3900",
      oyaTsumo: "2000 All",
      coRon: "2600",
      coTsumo: "1700 / 1100",
    });
  });

  test("テスト4: 5翻（満貫・符数関係なし）", () => {
    const [han, fu] = [5, 20];
    const result = getSanmaAllScores(han, fu);
    const limitName = getLimitName(han);

    expect(result).toEqual({
      oyaRon: "12000",
      oyaTsumo: "6000 All",
      coRon: "8000",
      coTsumo: "5000 / 3000",
    });
    expect(limitName).toBe("満貫");
  });

  test("テスト5: 13翻（数え役満）", () => {
    const [han, fu] = [13, 0];
    const result = getSanmaAllScores(han, fu);
    const limitName = getLimitName(han);

    expect(result).toEqual({
      oyaRon: "48000",
      oyaTsumo: "24000 All",
      coRon: "32000",
      coTsumo: "20000 / 12000",
    });
    expect(limitName).toBe("数え役満");
  });

  test("テスト6: 0翻（無効なケース）", () => {
    const [han, fu] = [0, 30];
    const result = getSanmaAllScores(han, fu);
    const limitName = getLimitName(han);

    expect(result).toEqual({
      oyaRon: "0",
      oyaTsumo: "0",
      coRon: "0",
      coTsumo: "0",
    });
    expect(limitName).toBe("");
  });

  test("テスト7: 4翻30符（満貫手前）", () => {
    const [han, fu] = [4, 30];
    const result = getSanmaAllScores(han, fu);

    expect(result).toEqual({
      oyaRon: "12000",
      oyaTsumo: "6000 All",
      coRon: "8000",
      coTsumo: "5000 / 3000",
    });
  });

  test("テスト8: 符数の自動調整（35符 → 40符）", () => {
    const [han, fu] = [1, 35];
    const result = getSanmaAllScores(han, fu);

    // 35符は40符に調整されるため、1翻40符の点数になる
    expect(result).toEqual({
      oyaRon: "2000",
      oyaTsumo: "1100 All",
      coRon: "1300",
      coTsumo: "900 / 600",
    });
  });

  test("テスト9: 6翻（跳満）", () => {
    const [han, fu] = [6, 25];
    const result = getSanmaAllScores(han, fu);
    const limitName = getLimitName(han);

    expect(result).toEqual({
      oyaRon: "18000",
      oyaTsumo: "9000 All",
      coRon: "12000",
      coTsumo: "7500 / 4500",
    });
    expect(limitName).toBe("跳満");
  });

  test("テスト10: 8翻（倍満）", () => {
    const [han, fu] = [8, 10];
    const result = getSanmaAllScores(han, fu);
    const limitName = getLimitName(han);

    expect(result).toEqual({
      oyaRon: "24000",
      oyaTsumo: "12000 All",
      coRon: "16000",
      coTsumo: "10000 / 6000",
    });
    expect(limitName).toBe("倍満");
  });
});
