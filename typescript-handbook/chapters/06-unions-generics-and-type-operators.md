# 06. Unions, Generics, and Type Operators

## Union types

```ts
let id: string | number;
id = "abc";
console.log(id);
id = 123;
console.log(id);
```

> Output:
>
> ```text
> abc
> 123
> ```

## Literal types

```ts
type Theme = "light" | "dark";

function setTheme(theme: Theme) {
  console.log(`Theme set to ${theme}`);
}

setTheme("dark");
```

> Output: `Theme set to dark`

## Intersection types

```ts
type Timestamped = { createdAt: Date };
type Named = { name: string };

type NamedRecord = Timestamped & Named;

const record: NamedRecord = {
  name: "Report",
  createdAt: new Date("2024-01-01T00:00:00.000Z"),
};

console.log(record.name, record.createdAt.toISOString());
```

> Output: `Report 2024-01-01T00:00:00.000Z`

## Discriminated unions

```ts
type LoadState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; error: string };

function renderState(state: LoadState): string {
  switch (state.status) {
    case "idle":
      return "Idle";
    case "loading":
      return "Loading...";
    case "success":
      return state.data.join(", ");
    case "error":
      return state.error;
  }
}

console.log(renderState({ status: "success", data: ["A", "B"] }));
```

> Output: `A, B`

## Exhaustiveness checking

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.size ** 2;
    default: {
      const _exhaustive: never = shape;
      return _exhaustive;
    }
  }
}

console.log(area({ kind: "square", size: 4 }));
```

> Output: `16`

## Generic functions

```ts
function identity<T>(value: T): T {
  return value;
}

console.log(identity("hello"));
console.log(identity(123));
```

> Output:
>
> ```text
> hello
> 123
> ```

## Generic interfaces

```ts
interface ApiResponse<T> {
  data: T;
  success: boolean;
}

const response: ApiResponse<{ id: number; name: string }> = {
  data: { id: 1, name: "Alice" },
  success: true,
};

console.log(response.data.name);
```

> Output: `Alice`

## Generic constraints

```ts
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

console.log(getLength("hello"));
console.log(getLength([1, 2, 3]));
```

> Output:
>
> ```text
> 5
> 3
> ```

## `keyof`

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const product = { id: 1, title: "Book", price: 10 };
console.log(getProperty(product, "title"));
```

> Output: `Book`

## `typeof` in a type position

```ts
const settings = {
  darkMode: true,
  version: 1,
};

type Settings = typeof settings;

const next: Settings = { darkMode: false, version: 2 };
console.log(next);
```

> Output: `{ darkMode: false, version: 2 }`

## Indexed access types

```ts
type User = {
  id: number;
  profile: { email: string };
};

type Email = User["profile"]["email"];

const email: Email = "a@example.com";
console.log(email);
```

> Output: `a@example.com`

## Conditional types

```ts
type IsString<T> = T extends string ? true : false;
```

At the type level:

- `IsString<string>` becomes `true`
- `IsString<number>` becomes `false`

## `infer`

```ts
type ArrayElement<T> = T extends (infer U)[] ? U : never;
```

At the type level:

- `ArrayElement<number[]>` becomes `number`

## Generics guidelines

1. Use generics to preserve information, not to show off.
2. Prefer meaningful names like `TItem` when `T` is too vague.
3. Add constraints when operations require structure.
4. Avoid over-abstracting small one-off code.

## Exercises

1. Create a discriminated union for request states: `idle`, `loading`, `success`, and `error`.
2. Write a generic `first<T>(items: T[]): T | undefined` function.
3. Create a helper using `keyof` that safely returns a property from an object.
4. Write a union plus exhaustive `switch` and add a `never` check in the default branch.

## Solution hints

1. Use a shared field like `status` and give each variant a different literal value.
2. Return `items[0]`; the generic type should flow from the array element type.
3. Start from `function getProp<T, K extends keyof T>(obj: T, key: K): T[K]`.
4. In the `default` branch, assign the value to a `const _exhaustive: never = value` variable.
