const types = Object.freeze({
  null: null,
  undefined: undefined,
  boolean: true,
  number: 1,
  bigint: BigInt(Number.MAX_SAFE_INTEGER),
  string: "string",
  symbol: Symbol("symbol"),
  array: [],
  record: {},
  function: () => {},
});

export function EXCLUDE_TYPES(exclude: Array<keyof typeof types>) {
  return Object.keys(types)
    .filter((key) => {
      return !exclude.includes(key as keyof typeof types);
    })
    .map((key) => (types as any)[key]) as unknown[];
}

export const NOT_NULL_TYPES = EXCLUDE_TYPES(["null"]);
export const NOT_UNDEFINED_TYPES = EXCLUDE_TYPES(["undefined"]);
export const NOT_BOOLEAN_TYPES = EXCLUDE_TYPES(["boolean"]);
export const NOT_NUMBER_TYPES = EXCLUDE_TYPES(["number"]);
export const NOT_BIGINT_TYPES = EXCLUDE_TYPES(["bigint"]);
export const NOT_STRING_TYPES = EXCLUDE_TYPES(["string"]);
export const NOT_SYMBOL_TYPES = EXCLUDE_TYPES(["symbol"]);
export const NOT_RECORD_TYPES = EXCLUDE_TYPES(["record"]);
export const NOT_FUNCTION_TYPES = EXCLUDE_TYPES(["function"]);
export const NOT_ARRAY_TYPES = EXCLUDE_TYPES(["array"]);
export const ALL_TYPES = EXCLUDE_TYPES([]);
