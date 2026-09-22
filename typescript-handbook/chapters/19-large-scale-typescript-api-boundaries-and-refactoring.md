# 19. Large-Scale TypeScript: API Boundaries and Refactoring

As projects grow, the quality of type boundaries matters more than isolated syntax knowledge.

## Public vs private types

Not every type should be exported.

```ts
// good-example.ts
export interface User {
  id: number;
  name: string;
}

type InternalCacheEntry = {
  user: User;
  fetchedAt: Date;
};
```

Keep internal details private unless callers truly need them.

## Stable module boundaries

A strong boundary:

- hides implementation details
- exposes a small, clear public API
- gives names to important domain concepts

```ts
export interface UserRepository {
  getById(id: number): Promise<User | undefined>;
}
```

## Type-first API design

Before implementation, ask:

- What values enter this function?
- What can come back?
- How are failures represented?
- Which states are valid?

```ts
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };
```

## Refactoring with types

Types make safer refactors possible.

Example strategy:

1. add or tighten the target type
2. let compiler errors reveal impacted code
3. update each call site deliberately
4. rerun tests

## Avoid leaking transport shapes everywhere

Do not let raw API payloads become your domain model in every layer.

```ts
interface UserDto {
  id: number;
  full_name: string;
}

interface User {
  id: number;
  name: string;
}
```

Convert at the boundary.

## Refactoring rule of thumb

If a type is reused in many unrelated places, confirm that it represents a real domain concept and not just accidental coupling.

## Exercises

1. Separate one exported public type from one internal helper type in a sample module.
2. Design a repository interface for a small domain such as books, orders, or tasks.
3. Create a DTO type and a domain type, then write a mapper function between them.
4. Refactor a function signature so failures are represented by a typed result instead of unclear return values.

## Solution hints

1. Export the domain type, but keep cache entries or transport helpers private to the module.
2. Repository methods like `getById`, `getAll`, or `save` are good starting points.
3. Use one transport-oriented field name like `full_name` and map it to a cleaner domain field like `name`.
4. Replace ambiguous values like `null` or `false` with a union such as `{ ok: true, value } | { ok: false, error }`.
