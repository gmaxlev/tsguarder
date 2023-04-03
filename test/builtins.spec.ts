import {
  EXCLUDE_TYPES,
  NOT_BIGINT_TYPES,
  NOT_BOOLEAN_TYPES,
  NOT_FUNCTION_TYPES,
  NOT_NULL_TYPES,
  NOT_NUMBER_TYPES,
  NOT_RECORD_TYPES,
  NOT_STRING_TYPES,
  NOT_SYMBOL_TYPES,
  NOT_UNDEFINED_TYPES,
} from "./utils";
import {
  isString,
  isBigInt,
  isNumber,
  isBoolean,
  isNull,
  isUndefined,
  isSymbol,
  isObject,
  isRecord,
  isFunction,
} from "../src/builtins";

describe("builtins.ts", () => {
  describe("isString()", () => {
    test("Should return true if a value is a string", () => {
      const result = isString("");
      expect(result).toBe(true);
    });
    test("Should return false if a value is not a string", () => {
      for (const notString of NOT_STRING_TYPES) {
        const result = isString(notString);
        expect(result).toBe(false);
      }
    });
    test("Should throw the correct error if the assertion fails", () => {
      for (const notString of NOT_STRING_TYPES) {
        const act = () => isString.assert(notString);
        expect(act).toThrowError("value: must be a string");
      }
    });
  });

  describe("isBigInt()", () => {
    test("Should return true if a value is bigint", () => {
      const result = isBigInt(BigInt(Number.MAX_SAFE_INTEGER));
      expect(result).toBe(true);
    });
    test("Should return false if a value is not bigint", () => {
      for (const notBigint of NOT_BIGINT_TYPES) {
        const result = isBigInt(notBigint);
        expect(result).toBe(false);
      }
    });
    test("Should throw the correct error if the assertion fails", () => {
      for (const notBigint of NOT_BIGINT_TYPES) {
        const act = () => isBigInt.assert(notBigint);
        expect(act).toThrowError("value: must be a bigint");
      }
    });
  });

  describe("isNumber()", () => {
    test("Should return true if a value is a number", () => {
      const result = isNumber(0);
      expect(result).toBe(true);
    });
    test("Should return false if a value is not a number", () => {
      for (const notNumber of NOT_NUMBER_TYPES) {
        const result = isNumber(notNumber);
        expect(result).toBe(false);
      }
    });

    test("Should throw the correct error if the assertion fails", () => {
      for (const notNumber of NOT_NUMBER_TYPES) {
        const act = () => isNumber.assert(notNumber);
        expect(act).toThrowError("value: must be a number");
      }
    });
  });

  describe("isBoolean()", () => {
    test("Should return true if a value is boolean", () => {
      const result = isBoolean(false);
      expect(result).toBe(true);
    });
    test("Should return false if a value is not boolean", () => {
      for (const botBoolean of NOT_BOOLEAN_TYPES) {
        const result = isBoolean(botBoolean);
        expect(result).toBe(false);
      }
    });

    test("Should throw the correct error if the assertion fails", () => {
      for (const botBoolean of NOT_BOOLEAN_TYPES) {
        const act = () => isBoolean.assert(botBoolean);
        expect(act).toThrowError("value: must be boolean");
      }
    });
  });

  describe("isNull()", () => {
    test("Should return true if a value is null", () => {
      const result = isNull(null);
      expect(result).toBe(true);
    });
    test("Should return false if a value is not null", () => {
      for (const notNull of NOT_NULL_TYPES) {
        const result = isNull(notNull);
        expect(result).toBe(false);
      }
    });

    test("Should throw the correct error if the assertion fails", () => {
      for (const notNull of NOT_NULL_TYPES) {
        const act = () => isNull.assert(notNull);
        expect(act).toThrowError("value: must be null");
      }
    });
  });

  describe("isUndefined()", () => {
    test("Should return true if a value is undefined", () => {
      const result = isUndefined(undefined);
      expect(result).toBe(true);
    });
    test("Should return false if a value is not undefined", () => {
      for (const notUndefined of NOT_UNDEFINED_TYPES) {
        const result = isUndefined(notUndefined);
        expect(result).toBe(false);
      }
    });

    test("Should throw the correct error if the assertion fails", () => {
      for (const notUndefined of NOT_UNDEFINED_TYPES) {
        const act = () => isUndefined.assert(notUndefined);
        expect(act).toThrowError("value: must be undefined");
      }
    });
  });

  describe("isSymbol()", () => {
    test("Should return true if a value is a symbol", () => {
      const result = isSymbol(Symbol("symbol"));
      expect(result).toBe(true);
    });
    test("Should return false if a value is not a symbol", () => {
      for (const notSymbol of NOT_SYMBOL_TYPES) {
        const result = isSymbol(notSymbol);
        expect(result).toBe(false);
      }
    });

    test("Should throw the correct error if the assertion fails", () => {
      for (const notSymbol of NOT_SYMBOL_TYPES) {
        const act = () => isSymbol.assert(notSymbol);
        expect(act).toThrowError("value: must be a symbol");
      }
    });
  });

  describe("isObject()", () => {
    test("Should return true if a value is an object", () => {
      const result1 = isObject(null);
      const result2 = isObject({});
      expect(result1).toBe(true);
      expect(result2).toBe(true);
    });
    test("Should return false if a value is not an object", () => {
      for (const notObject of EXCLUDE_TYPES(["record", "null", "array"])) {
        const result = isObject(notObject);
        expect(result).toBe(false);
      }
    });

    test("Should throw the correct error if the assertion fails", () => {
      for (const notObject of EXCLUDE_TYPES(["record", "null", "array"])) {
        const act = () => isObject.assert(notObject);
        expect(act).toThrowError("value: must be an object");
      }
    });
  });

  describe("isRecord()", () => {
    test("Should return true if a value is a record", () => {
      const result = isRecord({});
      expect(result).toBe(true);
    });

    test("Should return false if a value is not a record", () => {
      for (const notRecord of NOT_RECORD_TYPES) {
        const result = isRecord(notRecord);
        expect(result).toBe(false);
      }
    });

    test("Should throw the correct error if the assertion fails", () => {
      for (const notRecord of NOT_RECORD_TYPES) {
        const act = () => isRecord.assert(notRecord);
        expect(act).toThrowError("value: must be a record");
      }
    });
  });

  describe("isFunction()", () => {
    test("Should return true if a value is a function", () => {
      const result = isFunction(() => false);
      expect(result).toBe(true);
    });

    test("Should return false if a value is not a function", () => {
      for (const notFunction of NOT_FUNCTION_TYPES) {
        const result = isFunction(notFunction);
        expect(result).toBe(false);
      }
    });

    test("Should throw the correct error if the assertion fails", () => {
      for (const notFunction of NOT_FUNCTION_TYPES) {
        const act = () => isFunction.assert(notFunction);
        expect(act).toThrowError("value: must be a function");
      }
    });
  });
});
