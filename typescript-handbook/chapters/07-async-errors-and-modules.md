# 07. Async Code, Errors, and Modules

## Async functions

```ts
async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  return { id, name: "Alice" };
}

fetchUser(1).then((user) => console.log(user.name));
```

> Output: `Alice`

## `await`

```ts
async function showUser() {
  const user = await fetchUser(2);
  console.log(user);
}

showUser();
```

> Output: `{ id: 2, name: 'Alice' }`

## `Promise.all`

```ts
async function loadMany() {
  const users = await Promise.all([fetchUser(1), fetchUser(2)]);
  console.log(users.map((u) => u.name).join(", "));
}

loadMany();
```

> Output: `Alice, Alice`

## Throwing errors

```ts
function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

console.log(divide(10, 2));
```

> Output: `5`

## `try/catch`

```ts
try {
  console.log(divide(10, 0));
} catch (error) {
  console.log("Handled error");
}
```

> Output: `Handled error`

## Typed result pattern

```ts
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

function parseAge(input: string): Result<number> {
  const age = Number(input);
  if (Number.isNaN(age)) {
    return { ok: false, error: "Invalid number" };
  }
  return { ok: true, value: age };
}

console.log(parseAge("20"));
console.log(parseAge("abc"));
```

> Output:
>
> ```text
> { ok: true, value: 20 }
> { ok: false, error: 'Invalid number' }
> ```

## Modules

### Named exports

```ts
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}
```

```ts
// index.ts
import { add } from "./math";
console.log(add(2, 3));
```

> Output: `5`

### Default exports

```ts
// logger.ts
export default class Logger {
  log(message: string): void {
    console.log(message);
  }
}
```

```ts
import Logger from "./logger";
const logger = new Logger();
logger.log("ready");
```

> Output: `ready`

## Module organization rules

1. Prefer named exports in larger codebases.
2. Keep modules focused.
3. Avoid circular dependencies.
4. Separate domain logic from I/O logic.
5. Export stable public APIs, keep helpers private.

## Exercises

1. Write an async function that returns a typed `Promise` of user data.
2. Rewrite a throwing function so it returns a typed `Result<T>` union instead.
3. Split a tiny program into two modules: one exporting a helper and one importing and using it.
4. Explain when you would choose `Promise.all` and when you would not.

## Solution hints

1. Use `async function fetchUser(...): Promise<User> { ... }`.
2. Represent success and failure as a discriminated union like `{ ok: true, value } | { ok: false, error }`.
3. Make a `math.ts` or `utils.ts` file with a named export and import it into `index.ts`.
4. Choose `Promise.all` when tasks can run in parallel and all results are needed together.
