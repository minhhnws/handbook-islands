# 12. Conditional Types, `infer`, and Distributivity

Conditional types let you express type-level branching.

## Basic conditional type

```ts
type IsString<T> = T extends string ? true : false;
```

At the type level:

- `IsString<string>` becomes `true`
- `IsString<number>` becomes `false`

## Conditional extraction

```ts
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

type EmailMessage = MessageOf<{ message: string }>;
```

`EmailMessage` becomes `string`.

## Using `infer`

`infer` lets TypeScript capture part of a type into a temporary type variable.

```ts
type ArrayElement<T> = T extends (infer U)[] ? U : never;
```

At the type level:

- `ArrayElement<number[]>` becomes `number`

## Inferring function return types

```ts
type MyReturnType<T> = T extends (...args: never[]) => infer R ? R : never;

type NameResult = MyReturnType<() => string>;
```

`NameResult` becomes `string`.

## Distributive conditional types

Conditional types distribute over unions by default.

```ts
type Wrap<T> = T extends string ? { value: T } : never;

type Wrapped = Wrap<"a" | "b">;
```

`Wrapped` becomes:

```ts
type Wrapped = { value: "a" } | { value: "b" };
```

## Preventing distributivity

Wrap the checked type in a tuple.

```ts
type NonDistributed<T> = [T] extends [string] ? true : false;
```

Now the union is checked as a whole.

## Practical guideline

Conditional types are powerful, but they become hard to read quickly. Use them when they simplify a repeated type rule, not as a puzzle.

## Exercises

1. Write a conditional type `IsNumber<T>`.
2. Write a type `PromiseValue<T>` that extracts the resolved value of `Promise<T>`.
3. Demonstrate distributivity with a union of string literals.
4. Explain in your own words why `infer` is useful.

## Solution hints

1. Follow the same pattern as `IsString<T>` but check against `number`.
2. Use `T extends Promise<infer U> ? U : T` as a starting idea.
3. Try a union like `"a" | "b"` and wrap each member in an object type.
4. `infer` is useful when you want to capture a type nested inside another type without writing it manually.
