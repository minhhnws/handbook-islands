# 10. Utility Types in Practice

TypeScript ships with several built-in utility types that transform existing types into new ones.

## `Partial<T>`

Makes every property optional.

```ts
interface Todo {
  title: string;
  done: boolean;
}

const patch: Partial<Todo> = { done: true };
console.log(patch);
```

> Output: `{ done: true }`

Use `Partial<T>` for patch-style updates, not full entities.

## `Required<T>`

Makes every property required.

```ts
type FullTodo = Required<Todo>;
const todo: FullTodo = { title: "Study", done: false };
console.log(todo);
```

> Output: `{ title: 'Study', done: false }`

## `Readonly<T>`

Marks properties as readonly.

```ts
const config: Readonly<Todo> = {
  title: "Read",
  done: false,
};

console.log(config.title);
```

> Output: `Read`

## `Pick<T, K>`

Creates a type with a selected subset of properties.

```ts
type TodoPreview = Pick<Todo, "title">;
const preview: TodoPreview = { title: "Draft" };
console.log(preview);
```

> Output: `{ title: 'Draft' }`

## `Omit<T, K>`

Creates a type without certain properties.

```ts
type TodoInput = Omit<Todo, "done">;
const todoInput: TodoInput = { title: "Write" };
console.log(todoInput);
```

> Output: `{ title: 'Write' }`

## `Record<K, T>`

Useful for dictionaries keyed by strings, numbers, or literal unions.

```ts
type UserMap = Record<string, { id: number; name: string }>;

const users: UserMap = {
  a: { id: 1, name: "Alice" },
  b: { id: 2, name: "Bob" },
};

console.log(users.a.name);
```

> Output: `Alice`

## `ReturnType<T>`

Gets the return type of a function type.

```ts
function makeUser() {
  return { id: 1, name: "Alice" };
}

type MadeUser = ReturnType<typeof makeUser>;

const built: MadeUser = { id: 2, name: "Bob" };
console.log(built);
```

> Output: `{ id: 2, name: 'Bob' }`

## `Parameters<T>`

Extracts a tuple of parameter types.

```ts
function saveUser(id: number, active: boolean) {
  return `${id}:${active}`;
}

type SaveUserParams = Parameters<typeof saveUser>;

const params: SaveUserParams = [1, true];
console.log(params);
```

> Output: `[ 1, true ]`

## `Awaited<T>`

Unwraps a promise-like type.

```ts
type UserPromise = Promise<{ id: number; name: string }>;
type UserValue = Awaited<UserPromise>;

const user: UserValue = { id: 1, name: "Alice" };
console.log(user.name);
```

> Output: `Alice`

## Guidelines

1. Prefer utility types over rewriting near-duplicate types.
2. Do not stack many utilities until the result becomes unreadable.
3. Name transformed types clearly when they are part of the public API.

## Exercises

1. Model an `UpdateUserInput` type from a `User` interface using `Partial<T>`.
2. Create a `UserSummary` type using `Pick<T, K>`.
3. Use `Record<K, T>` to model a dictionary of products keyed by SKU.
4. Write one example each for `ReturnType<T>` and `Parameters<T>`.

## Solution hints

1. Start with a full `User` interface and imagine a PATCH request where every field is optional.
2. Pick only 1-2 display fields such as `id` and `name`.
3. `Record<string, Product>` is a good first version if SKUs are arbitrary strings.
4. Use `typeof someFunction` inside both utility types.
