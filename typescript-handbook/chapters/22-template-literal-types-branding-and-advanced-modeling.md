# 22. Template Literal Types, Branding, and Advanced Modeling

This chapter covers several advanced modeling techniques used in real TypeScript codebases.

## Template literal types

Template literal types build new string literal types from existing ones.

```ts
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<"click">;
```

`ClickEvent` becomes `"onClick"`.

## Step by step

1. Start with a string literal type like `"click"`.
2. Embed it in a template literal type.
3. Optionally use helpers like `Capitalize<T>`.
4. TypeScript produces a new string literal type.

## Combining unions with template literals

```ts
type Vertical = "top" | "bottom";
type Horizontal = "left" | "right";
type Position = `${Vertical}-${Horizontal}`;
```

`Position` becomes:

- `"top-left"`
- `"top-right"`
- `"bottom-left"`
- `"bottom-right"`

## Branded types

Sometimes two values are both strings at runtime but mean different things.

```ts
type UserId = string & { readonly __brand: "UserId" };
type OrderId = string & { readonly __brand: "OrderId" };
```

This pattern creates stronger separation at the type level.

## Step by step for branding

1. Start with a base primitive like `string`.
2. Intersect it with a marker object.
3. Treat the result as a distinct semantic type.
4. Use helper functions to construct values carefully.

```ts
function makeUserId(value: string): UserId {
  return value as UserId;
}

const userId = makeUserId("u1");
console.log(userId);
```

> Output: `u1`

## Modeling finite string protocols

Template literal types are useful for event names, route names, cache keys, and CSS-like tokens.

```ts
type Entity = "user" | "order";
type Action = "created" | "deleted";
type AuditEvent = `${Entity}:${Action}`;

const event: AuditEvent = "user:created";
console.log(event);
```

> Output: `user:created`

## Practical caution

These patterns are powerful, but can become hard to read. Use them when they make invalid values impossible or significantly reduce duplication.

## Exercises

1. Build a template literal type for positions like `"top-left"`.
2. Create a branded `EmailAddress` type and a constructor helper.
3. Model event names from two unions using a template literal type.
4. Explain when branding is worth the extra complexity.

## Solution hints

1. Start with two small unions and combine them using `${A}-${B}`.
2. Use `string & { readonly __brand: "EmailAddress" }` as a starting shape.
3. Use a pattern like `${Entity}:${Action}`.
4. Branding helps when two values share the same runtime type but must not be mixed semantically.
