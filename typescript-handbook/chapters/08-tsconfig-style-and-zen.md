# 08. tsconfig, Style Rules, and Zen of TypeScript Principles

## Recommended `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "noImplicitAny": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
```

## Important compiler rules

### `strict`

Turn it on. It is the single best default.

### `noImplicitAny`

Prevents accidental untyped parameters and values.

### `noUncheckedIndexedAccess`

Makes indexed access safer by including `undefined` when appropriate.

### `exactOptionalPropertyTypes`

Makes optional properties more precise.

## Style and consistency rules

### 1. Prefer `const`

Use `const` unless reassignment is necessary.

### 2. Type public boundaries explicitly

Annotate:

- exported functions
- public class methods
- API request/response shapes
- reusable utilities

### 3. Let local inference do the small work

Good:

```ts
const total = 10;
```

Usually unnecessary:

```ts
const total: number = 10;
```

### 4. Prefer `unknown` over `any`

`unknown` forces checking.

### 5. Prefer unions for states

Bad:

```ts
type BadState = {
  isLoading: boolean;
  hasError: boolean;
  data?: string[];
};
```

Better:

```ts
type GoodState =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; data: string[] };
```

### 6. Prefer precise checks over vague truthiness

If `0` or `""` are valid values, avoid plain truthy checks.

### 7. Prefer named exports

They are easier to search and refactor.

### 8. Prefer composition over inheritance

Use inheritance only when it reflects a clear domain relationship.

### 9. Keep functions focused

A function should usually do one thing well.

### 10. Use readonly where mutation is not intended

This improves safety and clarity.

### 11. Keep naming consistent

Suggested naming:

- `PascalCase` for types, interfaces, classes, enums
- `camelCase` for variables, functions, methods
- `UPPER_SNAKE_CASE` for project-level constants if your style guide uses it

### 12. Separate pure logic from side effects

Business rules should be easy to test without I/O.

## Zen of TypeScript Principles

A small philosophy for writing maintainable TypeScript.

### 1. Types are for humans first

If a type is technically clever but confusing to readers, it is usually the wrong type.

### 2. Model intent, not implementation accidents

Types should describe what the data means, not just what shape happened to exist.

### 3. Make invalid states hard to represent

Use unions and exact shapes to prevent impossible combinations.

### 4. Narrow before asserting

Prefer runtime checks over `as` when safety matters.

### 5. Use `unknown` at trust boundaries

Data from JSON, APIs, local storage, forms, and users should be treated as uncertain first.

### 6. Prefer explicitness at boundaries, inference inside

Public APIs deserve annotations. Local variables often do not.

### 7. Keep runtime truth in mind

A type does not validate data at runtime by itself.

### 8. Simple types beat magical types

If a plain interface and a union solve the problem, do not reach for advanced type tricks too early.

### 9. Consistency beats cleverness

A predictable codebase is more valuable than individually brilliant files.

### 10. Encode business rules, not just syntax rules

A type system is most useful when it protects real domain constraints.

### 11. Prefer composition in both values and types

Compose small pieces rather than building giant inheritance trees or giant unions without structure.

### 12. If the type is hard to explain, the design may be hard to use

Types are feedback on API quality.

## Practical team rules

1. Keep `strict` on.
2. Ban new `any` unless justified.
3. Review public types like you review code.
4. Add examples for reusable utilities.
5. Prefer boring, stable patterns over novelty.

## Exercises

1. Write a starter `tsconfig.json` for a strict project and explain three options you chose.
2. Take one vague state model with booleans and refactor it into a discriminated union.
3. Find a place where `any` could be replaced with `unknown` and show the required runtime check.
4. Choose three Zen principles from this chapter and give one concrete example of each in real code.

## Solution hints

1. Include `strict: true`, then choose a few safety-oriented flags such as `noImplicitAny` and `noUncheckedIndexedAccess`.
2. Replace combinations like `isLoading` and `hasError` with a single `status` field.
3. API responses, parsed JSON, and form input are good candidates for `unknown`.
4. Pick principles like “narrow before asserting” or “explicit at boundaries, inference inside” and tie them to small examples.
