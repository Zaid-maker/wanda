import { TypeTypes } from "./types.js";

/**
 * Checks if current type is a Number
 * @param {import("./types").Type} type
 * @returns {boolean}
 */
export const isAny = (type) => {
  return type.kind === TypeTypes.Any;
};

/**
 * Checks if current type is a Number
 * @param {import("./types").Type} type
 * @returns {boolean}
 */
export const isNumber = (type) => {
  return type.kind === TypeTypes.Number;
};

/**
 * Checks if current type is a String
 * @param {import("./types").Type} type
 * @returns {boolean}
 */
export const isString = (type) => {
  return type.kind === TypeTypes.String;
};

/**
 * Checks if current type is a Boolean
 * @param {import("./types").Type} type
 * @returns {boolean}
 */
export const isBoolean = (type) => {
  return type.kind === TypeTypes.Boolean;
};

/**
 * Checks if current type is a Keyword
 * @param {import("./types").Type} type
 * @returns {boolean}
 */
export const isKeyword = (type) => {
  return type.kind === TypeTypes.Keyword;
};

/**
 * Checks if current type is a Nil
 * @param {import("./types").Type} type
 * @returns {boolean}
 */
export const isNil = (type) => {
  return type.kind === TypeTypes.Nil;
};

/**
 * Checks if current type is a function type
 * @param {import("./types.js").Type} type
 * @returns {boolean}
 */
export const isFunctionType = (type) => {
  return type.kind === TypeTypes.FunctionType;
};

/**
 * Checks if current type is a type alias
 * @param {import("./types").Type} type
 * @returns {boolean}
 */
export const isTypeAlias = (type) => {
  return type.kind === TypeTypes.TypeAlias;
};

/**
 * Checks if current type is a list
 * @param {import("./types").Type} type
 * @returns {boolean}
 */
export const isList = (type) => {
  return type.kind === TypeTypes.List;
};

/**
 * Checks if current type is a vector
 * @param {import("./types").Type} type
 * @returns {boolean}
 */
export const isVector = (type) => {
  return type.kind === TypeTypes.Vector;
};
