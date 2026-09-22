# 01. Introduction and Setup

## What TypeScript is

TypeScript is JavaScript plus a static type system.

It helps you:

- catch mistakes earlier
- make APIs clearer
- improve autocomplete and refactoring
- model business rules with types

```ts
const language: string = "TypeScript";
console.log(language);
```

> Output: `TypeScript`

## What TypeScript is not

TypeScript is **not**:

- a separate runtime
- a replacement for JavaScript knowledge
- a runtime validator by itself

This type:

```ts
type User = { name: string };
```

exists only at compile time. It does not validate unknown data at runtime.

## Install

```bash
npm install -D typescript
npx tsc --init
```

## Minimal project layout

```text
project/
  src/
    index.ts
  dist/
  package.json
  tsconfig.json
```

## First program

```ts
function greet(name: string): string {
  return `Hello, ${name}`;
}

console.log(greet("Minh"));
```

> Output: `Hello, Minh`

## Compile

```bash
npx tsc src/index.ts
```

## Watch mode

```bash
npx tsc --watch
```

## The core mental model

TypeScript adds a layer of reasoning about values.

- JavaScript decides runtime behavior.
- TypeScript tries to prove correctness before runtime.

That means this is valid JavaScript behavior:

```ts
console.log("5" + 1);
```

> Output: `51`

TypeScript will not change that behavior. It will only help you describe and restrict when such behavior is allowed.

## A good starting mindset

1. Learn JavaScript runtime rules well.
2. Use TypeScript to model intent precisely.
3. Prefer clarity over clever types.
4. Keep `strict` mode on.

## Exercises

1. Create a `hello.ts` file with a `greet(name: string): string` function and print its result.
2. Write a short note explaining why a TypeScript `type` does not validate runtime JSON by itself.
3. Create a tiny project structure with `src/`, `dist/`, and `tsconfig.json`, then compile one file with `tsc`.

## Solution hints

1. Start with `function greet(name: string): string { return ... }` and call it with `console.log(...)`.
2. Focus on the phrase “compile time only”; compare it with runtime parsing of unknown JSON.
3. You only need one `src/index.ts` file and a minimal `tsconfig.json` to complete the exercise.
