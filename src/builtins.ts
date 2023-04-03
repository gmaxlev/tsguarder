import type { TypeGuard } from "./types";
import { createTypeGuard } from "./lib";

export const isNumber: TypeGuard<number> = createTypeGuard(
  "must be a number",
  (value: unknown): value is number => typeof value === "number"
);

export const isBigInt: TypeGuard<bigint> = createTypeGuard(
  "must be a bigint",
  (value: unknown): value is bigint => typeof value === "bigint"
);

export const isString: TypeGuard<string> = createTypeGuard(
  "must be a string",
  (value: unknown): value is string => typeof value === "string"
);

export const isBoolean: TypeGuard<boolean> = createTypeGuard(
  "must be boolean",
  (value: unknown): value is boolean => typeof value === "boolean"
);

export const isNull: TypeGuard<null> = createTypeGuard(
  "must be null",
  (value: unknown): value is null => value === null
);

export const isUndefined: TypeGuard<undefined> = createTypeGuard(
  "must be undefined",
  (value: unknown): value is undefined => typeof value === "undefined"
);

export const isSymbol: TypeGuard<symbol> = createTypeGuard(
  "must be a symbol",
  (value: unknown): value is symbol => typeof value === "symbol"
);

export const isObject: TypeGuard<object> = createTypeGuard(
  "must be an object",
  (value: unknown): value is object => typeof value === "object"
);

export const isRecord: TypeGuard<Record<PropertyKey, unknown>> =
  createTypeGuard(
    "must be a record",
    (value: unknown): value is Record<PropertyKey, unknown> => {
      return (
        typeof value === "object" && value !== null && !Array.isArray(value)
      );
    }
  );

export const isFunction: TypeGuard<Function> = createTypeGuard(
  "must be a function",
  (value: unknown): value is Function => typeof value === "function"
);

export const isArray: TypeGuard<unknown[]> = createTypeGuard(
  "must be an array",
  (value: unknown): value is unknown[] => Array.isArray(value)
);
