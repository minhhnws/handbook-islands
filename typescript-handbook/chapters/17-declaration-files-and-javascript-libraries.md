# 17. Declaration Files and JavaScript Libraries

TypeScript can type-check code even when the runtime library is plain JavaScript.

## What a declaration file is

A declaration file usually ends in `.d.ts` and describes types without providing runtime implementation.

Example idea:

```ts
declare function greet(name: string): string;
```

This tells TypeScript the shape of `greet`, but it does not implement `greet`.

## Why declaration files matter

They allow TypeScript to:

- understand JavaScript libraries
- type-check your code against those libraries
- power editor autocomplete

## Installing community types

Many libraries ship their own types. If not, the community often publishes types under `@types/...`.

```bash
npm install -D @types/node
```

## Declaring a small module

```ts
declare module "math-tools" {
  export function add(a: number, b: number): number;
}
```

This can help during migration or when integrating an untyped package.

## `declare` for globals

```ts
declare const APP_VERSION: string;
```

This says a global exists at runtime.

## Practical rules

1. Prefer official types from the library itself.
2. Add local declarations only when necessary.
3. Keep custom declarations minimal and accurate.
4. Do not lie in declaration files; incorrect declarations create false confidence.

## Exercises

1. Write a `.d.ts` snippet for a global `API_BASE_URL: string`.
2. Declare a small module with one exported function and one exported type.
3. Explain the difference between implementation code and declaration code.
4. Install one `@types/...` package in a sample project and inspect what problem it solves.

## Solution hints

1. Use `declare const API_BASE_URL: string;`.
2. Start with `declare module "..." { ... }` and place both exports inside it.
3. Declaration code describes shapes; implementation code runs at runtime.
4. `@types/node` or DOM-related types are good starting examples.
