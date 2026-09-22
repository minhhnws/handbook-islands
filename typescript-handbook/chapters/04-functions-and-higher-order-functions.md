# 04. Functions and Higher-Order Functions

Functions are one of the most important places to write explicit and readable types.

## Basic function typing

```ts
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(2, 3));
```

> Output: `5`

## Function expressions

```ts
const subtract = function (a: number, b: number): number {
  return a - b;
};

console.log(subtract(7, 4));
```

> Output: `3`

## Arrow functions

```ts
const square = (n: number): number => n * n;
console.log(square(6));
```

> Output: `36`

## Optional parameters

```ts
function buildName(first: string, last?: string): string {
  return last ? `${first} ${last}` : first;
}

console.log(buildName("Ada"));
console.log(buildName("Ada", "Lovelace"));
```

> Output:
>
> ```text
> Ada
> Ada Lovelace
> ```

## Default parameters

```ts
function multiply(value: number, factor = 2): number {
  return value * factor;
}

console.log(multiply(5));
console.log(multiply(5, 3));
```

> Output:
>
> ```text
> 10
> 15
> ```

## Rest parameters

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3, 4));
```

> Output: `10`

## Function types

```ts
type MathOperation = (a: number, b: number) => number;

const divide: MathOperation = (a, b) => a / b;
console.log(divide(8, 2));
```

> Output: `4`

## Overloads

```ts
function format(value: number): string;
function format(value: Date): string;
function format(value: number | Date): string {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return value.toFixed(2);
}

console.log(format(12.345));
console.log(format(new Date("2024-01-01T00:00:00.000Z")));
```

> Output:
>
> ```text
> 12.35
> 2024-01-01T00:00:00.000Z
> ```

## Callbacks

```ts
function repeat(times: number, action: (index: number) => void): void {
  for (let i = 0; i < times; i++) {
    action(i);
  }
}

repeat(3, (i) => console.log(`Run ${i}`));
```

> Output:
>
> ```text
> Run 0
> Run 1
> Run 2
> ```

## Higher-order functions

A higher-order function either:

- accepts another function, or
- returns a function

### Accepting a function

```ts
function applyTwice(value: number, fn: (n: number) => number): number {
  return fn(fn(value));
}

const increment = (n: number) => n + 1;
console.log(applyTwice(3, increment));
```

> Output: `5`

### Returning a function

```ts
function makeMultiplier(factor: number) {
  return (value: number) => value * factor;
}

const double = makeMultiplier(2);
console.log(double(6));
```

> Output: `12`

## Functional programming basics

### `map`

```ts
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2);
console.log(doubled);
```

> Output: `[ 2, 4, 6 ]`

### `filter`

```ts
const mixed = [1, 2, 3, 4, 5];
const even = mixed.filter((n) => n % 2 === 0);
console.log(even);
```

> Output: `[ 2, 4 ]`

### `reduce`

```ts
const total = [1, 2, 3, 4].reduce((sum, n) => sum + n, 0);
console.log(total);
```

> Output: `10`

## Pure functions

A pure function:

- returns the same output for the same input
- does not cause side effects

```ts
function pureAdd(a: number, b: number): number {
  return a + b;
}

console.log(pureAdd(2, 2));
```

> Output: `4`

## Side effects

```ts
function logAndAdd(a: number, b: number): number {
  console.log("Adding numbers");
  return a + b;
}

console.log(logAndAdd(2, 3));
```

> Output:
>
> ```text
> Adding numbers
> 5
> ```

## Functional style guidelines

1. Prefer pure functions for business logic.
2. Keep side effects at the edges.
3. Prefer transforming arrays over mutating them in place.
4. Type callbacks clearly when reused.
5. Keep function signatures small and focused.

## Exercises

1. Write a `sum(...numbers: number[])` function and show its output for at least two calls.
2. Create a higher-order function that accepts a formatter function and applies it to a string.
3. Use `map`, `filter`, and `reduce` on an array of numbers and explain the result of each step.
4. Rewrite an impure function into a pure one by removing direct logging or shared mutation.

## Solution hints

1. Use a rest parameter plus `reduce((total, n) => total + n, 0)`.
2. A formatter can be typed as `(value: string) => string`.
3. Try: double numbers with `map`, keep even ones with `filter`, then sum them with `reduce`.
4. Instead of writing to external state, return the computed value from the function.
