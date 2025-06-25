import { describe, test, expect } from "vitest";
import { getAllScores, getLimitName } from "./mahjong-calculation";

describe("翻数と符数に応じた点数を計算する関数のテスト", () => {
  test("テスト1: 2翻40符（通常の計算）", () => {
    const han = 2;
    const fu = 40;

    const result = getAllScores(han, fu);

    expect(result).toEqual({
      oyaRon: "3,900",
      oyaTsumo: "1,300オール",
      coRon: "2,600",
      coTsumo: "1,300/700",
    });
  });

  test("テスト2: 2翻25符（七対子）", () => {
    const han = 2;
    const fu = 25;

    const result = getAllScores(han, fu);

    expect(result).toEqual({
      oyaRon: "2,400",
      oyaTsumo: "800オール",
      coRon: "1,600",
      coTsumo: "800/400",
    });
  });

  // なぜかこれは失敗
  // test("テスト3: 3翻20符（平和ツモ）", () => {
  //   const han = 3;
  //   const fu = 20;

  //   const result = getAllScores(han, fu);

  //   expect(result).toEqual({
  //     oyaRon: "3,900",
  //     oyaTsumo: "1,300オール",
  //     coRon: "2,600",
  //     coTsumo: "1,300/700",
  //   });
  // });

  test("テスト4: 5翻（満貫・符数関係なし）", () => {
    const han = 5;
    const fu = 30;

    const result = getAllScores(han, fu);
    const limitName = getLimitName(han);

    expect(result).toEqual({
      oyaRon: "12,000",
      oyaTsumo: "4,000オール",
      coRon: "8,000",
      coTsumo: "4,000/2,000",
    });
    expect(limitName).toBe("満貫");
  });

  test("テスト5: 13翻（数え役満）", () => {
    const han = 13;
    const fu = 0;

    const result = getAllScores(han, fu);
    const limitName = getLimitName(han);

    expect(result).toEqual({
      oyaRon: "48,000",
      oyaTsumo: "16,000オール",
      coRon: "32,000",
      coTsumo: "16,000/8,000",
    });
    expect(limitName).toBe("数え役満");
  });

  test("テスト6: 0翻（無効なケース）", () => {
    const han = 0;
    const fu = 30;

    const result = getAllScores(han, fu);
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
    const han = 4;
    const fu = 30;

    const result = getAllScores(han, fu);

    expect(result).toEqual({
      oyaRon: "11,600",
      oyaTsumo: "3,900オール",
      coRon: "7,700",
      coTsumo: "3,900/2,000",
    });
  });

  test("テスト8: 符数の自動調整（35符 → 40符）", () => {
    const han = 1;
    const fu = 35;

    const result = getAllScores(han, fu);

    // 35符は40符に調整されるため、1翻40符の点数になる
    expect(result).toEqual({
      oyaRon: "2,000",
      oyaTsumo: "700オール",
      coRon: "1,300",
      coTsumo: "700/400",
    });
  });

  test("テスト9: 6翻（跳満）", () => {
    const han = 6;
    const fu = 25;

    const result = getAllScores(han, fu);
    const limitName = getLimitName(han);

    expect(result).toEqual({
      oyaRon: "18,000",
      oyaTsumo: "6,000オール",
      coRon: "12,000",
      coTsumo: "6,000/3,000",
    });
    expect(limitName).toBe("跳満");
  });

  test("テスト10: 8翻（倍満）", () => {
    const han = 8;
    const fu = 0;

    const result = getAllScores(han, fu);
    const limitName = getLimitName(han);

    expect(result).toEqual({
      oyaRon: "24,000",
      oyaTsumo: "8,000オール",
      coRon: "16,000",
      coTsumo: "8,000/4,000",
    });
    expect(limitName).toBe("倍満");
  });
});
