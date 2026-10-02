# 02. Core Types and Inference

## Primitive types

### `string`

```ts
const username: string = "alice";
console.log(username.toUpperCase());
```

> Output: `ALICE`

### `number`

TypeScript's `number` type represents 64-bit floating-point numbers. It supports decimal, floating-point, hexadecimal (`0x`), octal (`0o`), and **binary** (`0b`) representations:

```ts
const price: number = 19.99;
const count: number = 42;
const binaryByte: number = 0b1010_0110; // Binary literal (166 in decimal)
const hexColor: number = 0xff;          // Hexadecimal literal (255)

console.log(price.toFixed(2));
console.log(binaryByte);
```

> Output:
>
> ```text
> 19.99
> 166
> ```

### `boolean`

```ts
const isActive: boolean = true;
console.log(isActive);
```

> Output: `true`

### `null` and `undefined`

```ts
const emptyValue: null = null;
const missingValue: undefined = undefined;
console.log(emptyValue, missingValue);
```

> Output: `null undefined`

### `bigint`

```ts
const large: bigint = 9007199254740991n;
console.log(large + 1n);
```

> Output: `9007199254740992n`

### `symbol`

```ts
const id: symbol = Symbol("id");
console.log(typeof id);
```

> Output: `symbol`

## Special types

### `any`

```ts
let loose: any = 10;
loose = "hello";
console.log(loose);
```

> Output: `hello`

`any` turns off safety. Use it sparingly.

### `unknown`

```ts
let value: unknown = "hello";

if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

> Output: `HELLO`

Prefer `unknown` over `any` for uncertain values.

### `void`

```ts
function logMessage(message: string): void {
  console.log(message);
}

logMessage("saved");
```

> Output: `saved`

### `never`

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

> Output: throws an error

## Inference

TypeScript can infer types from values.

```ts
let city = "Hanoi";
let year = 2025;
let published = true;

console.log(city, year, published);
```

> Output: `Hanoi 2025 true`

Inferred types:

- `city` -> `string`
- `year` -> `number`
- `published` -> `boolean`

## When to annotate explicitly

Annotate types when:

- exporting functions
- defining public APIs
- writing reusable library code
- the type is not obvious

```ts
export function add(a: number, b: number): number {
  return a + b;
}
```

## `const` and `let`

Prefer `const` by default.

```ts
const appName = "Docs";
let counter = 0;
counter += 1;
console.log(appName, counter);
```

> Output: `Docs 1`

## Arrays

```ts
const tags: string[] = ["ts", "js"];
console.log(tags.join(", "));
```

> Output: `ts, js`

## Tuples

```ts
const point: [number, number] = [10, 20];
console.log(point[0] + point[1]);
```

> Output: `30`

## Readonly data

```ts
const names: readonly string[] = ["A", "B"];
console.log(names[0]);
```

> Output: `A`

## Literals and widening

```ts
let theme = "dark";
const mode = "dark";
```

- `theme` widens to `string`
- `mode` stays as the literal type `"dark"`

Use `as const` when you want exact literals preserved.

```ts
const roles = ["admin", "member"] as const;
console.log(roles[0]);
```

> Output: `admin`

## Exercises

1. Declare one variable for each primitive type covered in this chapter and print each value.
2. Write a function that accepts `unknown`, checks whether it is a string, and returns the uppercased result or `null`.
3. Create an array of numbers, a readonly array of strings, and a tuple like `[string, number]`, then explain when each is appropriate.
4. Demonstrate the difference between `let theme = "dark"` and `const theme = "dark"` in terms of inferred types.

## Solution hints

1. Cover at least `string`, `number`, `boolean`, `null`, and `undefined`; adding `bigint` and `symbol` is even better.
2. Use `typeof value === "string"` before calling `.toUpperCase()`.
3. A normal array is variable-length, a readonly array prevents mutation, and a tuple fixes both order and type positions.
4. `let` usually widens to `string`, while `const` keeps the literal type `"dark"`.
