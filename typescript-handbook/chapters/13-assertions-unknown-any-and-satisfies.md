# 13. Assertions, `unknown`, `any`, and `satisfies`

This chapter covers four related tools that are easy to misuse.

## Type assertions

A type assertion tells TypeScript to trust your claim about a value.

```ts
const input = document.getElementById("email") as HTMLInputElement | null;
console.log(input?.value);
```

> Output: depends on the DOM at runtime

Assertions do not transform or validate the value.

## Prefer narrowing before asserting

```ts
const element = document.getElementById("submit");

if (element instanceof HTMLButtonElement) {
  console.log(element.disabled);
}
```

This is safer because the runtime check proves the assumption.

## `unknown`

`unknown` is the safe type for uncertain data.

```ts
function parseJson(text: string): unknown {
  return JSON.parse(text);
}

const result = parseJson('{"name":"Alice"}');

if (typeof result === "object" && result !== null && "name" in result) {
  console.log((result as { name: string }).name);
}
```

> Output: `Alice`

## `any`

`any` disables most type checking.

```ts
function unsafe(value: any) {
  return value.notARealMethod();
}
```

This can compile and still fail at runtime.

## Double assertions

```ts
const value = "123" as unknown as number;
```

This should be rare. It usually signals a modeling problem.

## The `satisfies` operator

`satisfies` checks that a value conforms to a type while preserving the value's more specific inferred type.

```ts
type Config = {
  mode: "dev" | "prod";
  port: number;
};

const config = {
  mode: "dev",
  port: 3000,
} satisfies Config;

console.log(config.mode);
```

> Output: `dev`

This is often better than a direct annotation when you want validation without losing literal precision.

## Choosing between them

- Use `unknown` for untrusted values.
- Use narrowing to prove facts.
- Use `satisfies` to validate object shapes while keeping precise inference.
- Use `any` only as a last resort.
- Use assertions only when you know something the compiler cannot infer.

## Exercises

1. Parse JSON into `unknown`, then narrow it safely before reading a property.
2. Rewrite one `as SomeType` example into a safer runtime-checked form.
3. Create an object that `satisfies` a config type with a string-literal field.
4. Explain why `any` is more dangerous than `unknown`.

## Solution hints

1. After `JSON.parse`, check for `typeof result === "object"`, `result !== null`, and property existence.
2. DOM examples are a good place to replace an assertion with `instanceof`.
3. Use a config field like `mode: "dev" | "prod"` to see why literal preservation matters.
4. `unknown` blocks unsafe usage until you check it; `any` allows almost anything immediately.
