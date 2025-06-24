import { describe, test, expect } from "vitest";
import { isUUID } from "./uuid-check";

describe("UUIDをチェック関数のテスト", () => {
  test("UUIDが正しい", () => {
    const testId = "5fcb6736-5829-49ef-b8a3-4a0f7393892f";
    const uuid = isUUID(testId);

    expect(uuid).toEqual(true);
  });

  test("UUIDが間違っている", () => {
    const testId = "5fcb6736";
    const uuid = isUUID(testId);

    expect(uuid).toEqual(false);
  });
});
