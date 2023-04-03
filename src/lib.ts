import type { TypeGuard } from "./types";

export function createTypeGuard<T>(
  guard: (value: unknown) => value is T
): TypeGuard<T>;
export function createTypeGuard<T>(
  description: string,
  guard: (value: unknown) => value is T
): TypeGuard<T>;
export function createTypeGuard<T>(
  descriptionOrGuard: string | ((value: unknown) => value is T),
  guard?: (value: unknown) => value is T
): TypeGuard<T> {
  const normalizedDescription =
    arguments.length < 2 ? undefined : (descriptionOrGuard as string);

  const normalizedGuard = (
    arguments.length < 2 ? descriptionOrGuard : guard
  ) as (value: unknown) => value is T;

  if (typeof normalizedGuard !== "function") {
    throw new TypeError("Guard should be a function");
  }

  if (
    typeof normalizedDescription !== "string" &&
    typeof normalizedDescription !== "undefined"
  ) {
    throw new TypeError("Description should be a string");
  }

  function guarder(value: unknown) {
    const guardResult = normalizedGuard(value);
    const typeResult = typeof guardResult;

    if (typeResult !== "boolean") {
      console.warn(
        `Type guard should return a boolean, but returned ${typeResult}`
      );
    }

    return !!guardResult;
  }

  guarder.assert = function assert(
    value: unknown,
    name?: string
  ): asserts value is T {
    if (!guarder(value)) {
      const typeDescription = normalizedDescription || normalizedGuard.name;
      const nameNormalized = name ? name : "value";
      const message = `${nameNormalized}: ${typeDescription}`;
      throw new TypeError(message);
    }
  };

  return guarder as TypeGuard<T>;
}
