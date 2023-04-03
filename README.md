# tsguarder

A quite simple tool for creating TypeScript **guards** including **assertions** with several built-in guards for runtime type checking. A type guard can be used to check the runtime type of a variable and narrow its type accordingly.

Read more about [guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) and [assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions) from the official TypeScript documentation.

## Installation

```bash
npm install tsguarder
```

## Usage

Create a type guard:

```ts
import { createTypeGuard, TypeGuard } from "tsguarder";

const isPositiveNumber: TypeGuard<number> = createTypeGuard(
  "must be a positive number", // optional
  (value: unknown): value is number => {
    return typeof value === "number" && value > 0;
  }
);
```

Use as a **type guard**:

```ts
function doSomething(value: number | string) {
  if (isPositiveNumber(value)) {
    // do something with a number
    const result = value.toFixed(2);
  }
  // do something with a number or a string
}
```

Use as an **assertion**:

```ts
function calculateFactorial(num: number) {
  // the second argument is optional
  isPositiveNumber.assert(num, "num argument");
}

calculateFactorial(100); // works
calculateFactorial("This is not a number"); // throws an error

console.log("This will not be printed");
```

If the type assertion fails, meaning the variable's type is not what was expected, TypeScript throws an error with the value name and the message provided in the guard.

```
TypeError: num argument: must be a positive number
```

## An Explicit Type Annotation

⚠️ Note that we have used TypeGuard<number> as the type annotation for the guard. This is because TypeScript requires an explicit type annotation to enable the use of type assertions. It concerns only assertions.

This does not work:

```ts
import { createTypeGuard } from "tsguarder";

const isString = createTypeGuard(
    (value): value is string =>  typeof value === "string";
);

// ⛔️ TypeScript error:
// Assertions require every name in the call target to be
// declared with an explicit type annotation.ts(2775)
isString.assert('Hello, World!')
```

Read more about assertions in the [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions).

## Built-in guards

The tool comes with several built-in guards:

#### `isString`

Equivalent to `typeof value === "string"`

#### `isNumber`

Equivalent to `typeof value === "number"`

#### `isBoolean`

Equivalent to `typeof value === "boolean"`

#### `isSymbol`

Equivalent to `typeof value === "symbol"`

#### `isUndefined`

Equivalent to `typeof value === "undefined"`

#### `isNull`

Equivalent to `value === null`

#### `isBigInt`

Equivalent to `typeof value === "bigint"`

#### `isFunction`

Equivalent to `typeof value === "function"`

#### `isObject`

Equivalent to `typeof value === "object"`

#### `isArray`

Equivalent to `Array.isArray(value)`

#### `isRecord`

Equivalent to `typeof value === "object" && value !== null && !Array.isArray(value)`

## License

[MIT](https://choosealicense.com/licenses/mit/)
