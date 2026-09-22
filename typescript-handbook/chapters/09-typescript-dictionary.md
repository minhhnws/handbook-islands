# 09. TypeScript Dictionary / Glossary

A compact dictionary of common TypeScript and JavaScript terms.

## A

### annotation

An explicit type written by the programmer.

```ts
const age: number = 20;
```

### assertion

A way to tell TypeScript to trust a specific type.

```ts
const input = document.getElementById("email") as HTMLInputElement | null;
```

## C

### callback

A function passed to another function.

```ts
[1, 2, 3].map((n) => n * 2);
```

### call signature

A type-level description of something callable like a function.

### class

A template for creating objects with state and behavior.

### coercion

Automatic conversion from one type to another at runtime.

Example: `"5" + 1` becomes `"51"`.

### conditional type

A type-level if/else.

```ts
type IsString<T> = T extends string ? true : false;
```

## D

### declaration merging

A TypeScript feature where some declarations, especially interfaces, can combine.

### declaration file

A `.d.ts` file that provides type information without runtime implementation.

### declare

A keyword used to describe values, globals, modules, or functions that exist at runtime elsewhere.

### decorator

An advanced feature using `@...` syntax to annotate or modify classes and class members, depending on project support and configuration.

### discriminated union

A union where each member has a shared tag field.

```ts
type State =
  | { status: "loading" }
  | { status: "success"; data: string[] };
```

## E

### enum

A TypeScript feature for named constants.

### exact optional property types

A stricter compiler behavior where optional properties are treated more precisely instead of loosely allowing `undefined` in every situation.

### equality

A rule for whether two values are considered the same.

In JavaScript, common equality forms are:

- `==` loose equality with coercion
- `===` strict equality
- `Object.is(...)` special-case equality

### equivalence

A broader concept than strict equality. In application code, two values may be treated as equivalent if they mean the same thing for your domain.

Example: two user objects with the same `id` may be considered equivalent for business logic, even if they are different object instances.

## F

### falsy

A value treated as false in a boolean context.

Examples: `0`, `""`, `null`, `undefined`, `false`, `NaN`.

### function overload

Multiple call signatures for one implementation.

## G

### generic

A reusable type pattern that keeps information about the value flowing through it.

```ts
function identity<T>(value: T): T {
  return value;
}
```

### generator

A function declared with `function*` that yields values lazily over time.

## H

### higher-order function

A function that takes a function or returns a function.

## I

### index signature

A type pattern for objects with dynamic keys, such as dictionaries.

### indexed access type

A type extracted from another type using syntax like `User["id"]`.

### identity

Reference sameness.

```ts
const a = {};
const b = a;
console.log(a === b); // true
```

### inference

TypeScript figuring out a type automatically.

## L

### literal type

An exact value as a type.

```ts
type Theme = "light" | "dark";
```

## M

### mapped type

A type created by transforming another type's properties.

```ts
type Flags<T> = { [K in keyof T]: boolean };
```

### module

A file with imports or exports, used as a code boundary.

### module augmentation

A TypeScript feature for extending the declared types of an existing module.

## N

### namespace

An older TypeScript code organization feature. Modern projects usually prefer ES modules.

### narrowing

Refining a broad type into a more specific type using runtime checks.

### `never`

A type representing a value that should never exist.

### nullish

Specifically `null` or `undefined`.

## O

### object identity

Whether two variables point to the exact same object in memory.

### overload signature

A declared call form for a function before the implementation signature.

## P

### parameter property

A class-constructor shorthand where `public`, `private`, `protected`, or `readonly` on a constructor parameter creates a class property automatically.

### pure function

A function with no side effects that returns the same output for the same input.

## R

### readonly

A property or array that should not be reassigned or mutated through that type.

### record

A utility type, `Record<K, T>`, often used to model dictionaries keyed by a known set of values.

### reference equality

Equality based on object identity, not structure.

## S

### strict null checks

A strict-mode behavior that forces `null` and `undefined` to be handled explicitly.

### satisfies

An operator that checks whether a value conforms to a target type while preserving precise inference.

### structural typing

TypeScript compares types by shape rather than nominal names in most cases.

### strict mode

A collection of compiler checks enabled by `"strict": true`.

## T

### truthy

A value treated as true in a boolean context.

### template literal type

A string-based type built from other string literal types using template-literal syntax.

### type guard

A runtime check that narrows a value to a more specific TypeScript type.

### type parameter

The generic placeholder in a definition such as `<T>`.

### type predicate

A function return form like `value is SomeType` used for custom type guards.

### type query

A type-level use of `typeof` that captures the shape of a runtime value.

A string-based type built from other string literal types using template-literal syntax.

### tuple

A fixed-length array with known positions and types.

## U

### union type

A type that allows one of several possible types.

```ts
let id: string | number;
```

### utility type

A built-in helper type such as `Partial<T>`, `Pick<T, K>`, or `ReturnType<T>`.

### `unknown`

A safe top type that requires checking before use.

## V

### validation

Runtime verification that data actually matches expected rules.

Important: TypeScript types alone do not validate runtime input.

## Exercises

1. Define in your own words the difference between `equality`, `identity`, and `equivalence`.
2. Create one code example each for `generic`, `union type`, `narrowing`, and `readonly`.
3. Pick five glossary terms and write a one-sentence practical rule for each.

## Solution hints

1. Use primitives and objects to contrast value sameness, reference sameness, and domain-level sameness.
2. Keep each example tiny: one generic function, one union alias, one runtime check, one readonly property.
3. Good terms to start with are `unknown`, `narrowing`, `generic`, `readonly`, and `validation`.
