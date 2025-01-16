import { expect, test, describe } from "vitest";
import classnames from "../classnames";

describe("classnames", () => {
  test.each([
    [["daler", "aziz"], "daler aziz"],
    [["daler"], "daler"],
    [[null, "daler", undefined], "daler"],
    [[{ foo: false, bar: true }], "bar"],
    [[{ foo: true, bar: false }], "foo"],
    [["hello", { foo: true, bar: false }, null, "world", undefined], "hello foo world"],
  ])("%o -> %s", (args, expected) => {
    expect(classnames(...args)).toBe(expected);
  });
});
