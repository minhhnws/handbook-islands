# 03. Runtime Rules: Truthiness, Equality, and Comparison

TypeScript does not replace JavaScript runtime behavior. To write correct TypeScript, you still need to understand JavaScript comparison rules.

## Truthy and falsy values

Falsy values in JavaScript are:

- `false`
- `0`
- `-0`
- `0n`
- `""`
- `null`
- `undefined`
- `NaN`

Everything else is truthy.

```ts
function printValue(value: string | null) {
  if (value) {
    console.log(value.toUpperCase());
  } else {
    console.log("No value");
  }
}

printValue("hello");
printValue(null);
```

> Output:
>
> ```text
> HELLO
> No value
> ```

## Truthiness pitfall

```ts
function showCount(count: number | null) {
  if (count) {
    console.log(`Count: ${count}`);
  } else {
    console.log("Missing count");
  }
}

showCount(0);
showCount(3);
```

> Output:
>
> ```text
> Missing count
> Count: 3
> ```

If `0` is valid, a truthy check is too broad.

```ts
function showSafeCount(count: number | null) {
  if (count !== null) {
    console.log(`Count: ${count}`);
  } else {
    console.log("Missing count");
  }
}

showSafeCount(0);
```

> Output: `Count: 0`

## Equality operators

### Loose equality: `==`

```ts
console.log(5 == "5");
console.log(false == 0);
```

> Output:
>
> ```text
> true
> true
> ```

Loose equality performs coercion. It is often surprising.

### Strict equality: `===`

```ts
console.log(5 === "5");
console.log(false === 0);
console.log(5 === 5);
```

> Output:
>
> ```text
> false
> false
> true
> ```

Prefer `===` and `!==` almost always.

## Equality vs identity vs deep equality

This is often where people mean different things by "compare".

### Value equality for primitives

```ts
console.log("a" === "a");
console.log(10 === 10);
```

> Output:
>
> ```text
> true
> true
> ```

### Reference identity for objects

```ts
const a = { count: 1 };
const b = { count: 1 };
const c = a;

console.log(a === b);
console.log(a === c);
```

> Output:
>
> ```text
> false
> true
> ```

Objects compare by reference with `===`, not by content.

### Deep equality

JavaScript does not provide built-in deep equality with `===`.

```ts
const left = { name: "A", tags: ["x"] };
const right = { name: "A", tags: ["x"] };

console.log(left === right);
```

> Output: `false`

If you need structural comparison, you must implement or use a deep-compare utility.

## `Object.is`

`Object.is` is almost like `===`, but differs in a few cases.

```ts
console.log(Object.is(NaN, NaN));
console.log(NaN === NaN);
console.log(Object.is(-0, 0));
console.log(-0 === 0);
```

> Output:
>
> ```text
> true
> false
> false
> true
> ```

## Relational comparison

```ts
console.log(3 > 2);
console.log("b" > "a");
console.log("10" > "2");
```

> Output:
>
> ```text
> true
> true
> false
> ```

String comparisons are lexicographic, not numeric.

## Nullish coalescing `??`

Use `??` only for `null` and `undefined` fallbacks.

```ts
function displayName(name: string | null): string {
  return name ?? "Anonymous";
}

console.log(displayName(null));
console.log(displayName("Minh"));
```

> Output:
>
> ```text
> Anonymous
> Minh
> ```

Compare this with `||`:

```ts
console.log("" || "fallback");
console.log("" ?? "fallback");
```

> Output:
>
> ```text
> fallback
> 
> ```

The second line keeps the empty string because it is not nullish.

## Optional chaining `?.`

```ts
const user = { profile: { email: "a@example.com" } };
console.log(user.profile?.email);
```

> Output: `a@example.com`

## Type narrowing with runtime checks

### `typeof`

```ts
function logId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(0));
  }
}

logId("ab12");
logId(42);
```

> Output:
>
> ```text
> AB12
> 42
> ```

### `in`

```ts
type Dog = { bark: () => string };
type Cat = { meow: () => string };

function speak(animal: Dog | Cat): string {
  if ("bark" in animal) {
    return animal.bark();
  }
  return animal.meow();
}

console.log(speak({ bark: () => "woof" }));
```

> Output: `woof`

## A practical comparison rule set

1. Use `===` and `!==` by default.
2. Use `== null` only if you intentionally want to match both `null` and `undefined`.
3. Avoid truthy checks when `0`, `false`, or `""` are meaningful values.
4. Remember that objects compare by reference.
5. Use deep comparison only when you truly need structural equality.

## Exercises

1. Write a function that accepts `number | null` and prints different messages for `null`, `0`, and positive numbers.
2. Compare two separate objects with the same fields and explain why `===` returns `false`.
3. Demonstrate the difference between `||` and `??` using an empty string and the value `null`.
4. Write a short example using `typeof` to narrow `string | number`.

## Solution hints

1. Use precise checks like `value === null` and `value === 0`; avoid relying only on truthiness.
2. Create two literals like `{ id: 1 }` and compare them; then assign one variable to another and compare again.
3. `||` treats `""` as falsy, while `??` only falls back for `null` or `undefined`.
4. Inside the `typeof value === "string"` branch, call a string method; in the other branch, call a number method.
