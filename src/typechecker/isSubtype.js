import { Type } from "./Type.js";
import { propType } from "./propType.js";

/**
 * Checks if type1 is a subtype of type2
 * @param {import("./types").Type} type1
 * @param {import("./types").Type} type2
 * @returns {boolean}
 */
export const isSubtype = (type1, type2) => {
  if (Type.isAny(type1) || Type.isAny(type2)) return true;
  if (Type.isNumber(type1) && Type.isNumber(type2)) return true;
  if (Type.isString(type1) && Type.isString(type2)) return true;
  if (Type.isBoolean(type1) && Type.isBoolean(type2)) return true;
  if (Type.isKeyword(type1) && Type.isKeyword(type2)) return true;
  if (Type.isNil(type1) && Type.isNil(type2)) return true;

  if (Type.isTypeAlias(type1) && Type.isTypeAlias(type2)) {
    return isSubtype(type1.base, type2.base);
  }

  if (Type.isTypeAlias(type1) && !Type.isTypeAlias(type2)) {
    return isSubtype(type1.base, type2);
  }

  if (Type.isTypeAlias(type2) && !Type.isTypeAlias(type1)) {
    return isSubtype(type1, type2.base);
  }

  if (Type.isList(type1) && Type.isList(type2)) {
    return isSubtype(type1.listType, type2.listType);
  }

  if (Type.isVector(type1) && Type.isVector(type2)) {
    return isSubtype(type1.vectorType, type2.vectorType);
  }

  if (Type.isObject(type1) && Type.isObject(type2)) {
    return type2.properties.every(({ name: type2name, type: type2type }) => {
      const type1type = propType(type1, type2name);
      if (!type1type) return false;
      else return isSubtype(type1type, type2type);
    });
  }

  // a type should only be undefined on the first pass through the checker
  if (Type.isUndefined(type1) || Type.isUndefined(type2)) return true;

  if (Type.isFunctionType(type1) && Type.isFunctionType(type2)) {
    return (
      type1.params.length === type2.params.length &&
      a.params.every((a, i) => isSubtype(b.params[i], a)) &&
      isSubtype(a.ret, b.ret)
    );
  }

  return false;
};