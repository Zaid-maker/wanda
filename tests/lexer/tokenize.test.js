import { tokenize as t } from "../../src/lexer/tokenize.js";

const tokenize = (input) => t(input, "test-input");

test("should correctly tokenize an integer", () => {
  const input = "15";
  const tokens = tokenize(input);

  expect(tokens.reduce((_, tok) => tok.type, "")).toEqual("Number");
  expect(tokens.reduce((_, tok) => tok.value, "")).toEqual("15");
});

test("should correctly tokenize a decimal number", () => {
  const input = "3.14";
  const tokens = tokenize(input);

  expect(tokens.reduce((_, tok) => tok.type, "")).toEqual("Number");
  expect(tokens.reduce((_, tok) => tok.value, "")).toEqual("3.14");
});

test("should throw a SyntaxException on invalid numeric input", () => {
  const input = "3.13.14";

  expect(() => tokenize(input)).toThrow();
});

test("should correctly tokenize boolean literals", () => {
  const input1 = "true";
  const input2 = "false";
  const tokens1 = tokenize(input1);
  const tokens2 = tokenize(input2);

  expect(tokens1.reduce((_, tok) => tok.type, "")).toEqual("Boolean");
  expect(tokens2.reduce((_, tok) => tok.type, "")).toEqual("Boolean");
  expect(tokens1.reduce((_, tok) => tok.value, "")).toEqual("true");
  expect(tokens2.reduce((_, tok) => tok.value, "")).toEqual("false");
});
