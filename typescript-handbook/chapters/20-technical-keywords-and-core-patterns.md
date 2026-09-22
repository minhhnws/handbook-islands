# 20. Technical Keywords and Core Patterns in TypeScript

This chapter collects many of the most important TypeScript-specific and TypeScript-heavy keywords and patterns in one place.

TypeScript has its own recurring technical vocabulary:

- `type`
- `interface`
- `extends`
- `keyof`
- `typeof`
- `in`
- `as`
- `infer`
- `readonly`
- `satisfies`
- `as const`
- `enum`
- `declare`
- unions and intersections
- discriminated unions
- index signatures
- call signatures
- construct signatures
- indexed access types
- mapped types
- utility types
- conditional types
- template literal types
- parameter properties
- access modifiers
- generators and async generators

The goal here is not just to define them, but to show step by step how they work.

## `type`

A `type` alias gives a name to a type expression.

### Step by step

1. Start with a shape or type expression.
2. Give it a reusable name.
3. Use the alias wherever that type is needed.

```ts
type UserId = string | number;

function printUserId(id: UserId) {
  console.log(id);
}

printUserId("u1");
printUserId(42);
```

> Output:
>
> ```text
> u1
> 42
> ```

## `interface`

An `interface` describes the shape of an object or class contract.

### Step by step

1. Define the required fields.
2. Use the interface to constrain values.
3. Rely on structural typing: matching shape is enough.

```ts
interface User {
  id: number;
  name: string;
}

const user: User = { id: 1, name: "Alice" };
console.log(user.name);
```

> Output: `Alice`

## `extends`

`extends` has multiple roles in TypeScript.

### 1. Interface inheritance

```ts
interface Person {
  name: string;
}

interface Employee extends Person {
  title: string;
}

const employee: Employee = { name: "Minh", title: "Engineer" };
console.log(employee.title);
```

> Output: `Engineer`

### 2. Generic constraints

### Step by step

1. Write a generic type parameter.
2. Add `extends` to require certain structure.
3. Use the guaranteed property safely.

```ts
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

console.log(getLength("hello"));
```

> Output: `5`

### 3. Conditional types

```ts
type IsString<T> = T extends string ? true : false;
```

Here, `extends` means “is assignable to” at the type level.

## `keyof`

`keyof` turns an object type into a union of its keys.

### Step by step

1. Start with an object type.
2. Apply `keyof`.
3. The result becomes a union of property names.

```ts
type Product = {
  id: number;
  title: string;
  price: number;
};

type ProductKey = keyof Product;

const key: ProductKey = "title";
console.log(key);
```

> Output: `title`

## `typeof`

`typeof` has a runtime meaning in JavaScript and a type-position meaning in TypeScript.

### Runtime `typeof`

```ts
console.log(typeof "hello");
console.log(typeof 42);
```

> Output:
>
> ```text
> string
> number
> ```

### Type-position `typeof`

### Step by step

1. Create a value.
2. Use `typeof` in a type position.
3. Reuse that inferred shape as a type.

```ts
const config = {
  mode: "dev",
  port: 3000,
};

type Config = typeof config;

const next: Config = { mode: "dev", port: 4000 };
console.log(next.port);
```

> Output: `4000`

## `in`

`in` also has runtime and type-level uses.

### Runtime `in`

```ts
type Dog = { bark: () => string };
type Cat = { meow: () => string };

function speak(animal: Dog | Cat) {
  if ("bark" in animal) {
    return animal.bark();
  }
  return animal.meow();
}

console.log(speak({ bark: () => "woof" }));
```

> Output: `woof`

### Type-level `in` for mapped types

```ts
type Flags<T> = {
  [K in keyof T]: boolean;
};
```

Step by step:

1. Take each key `K` in `keyof T`.
2. Rebuild an object type.
3. Set every property value to `boolean`.

## `as`

`as` is a type assertion operator.

```ts
const input = document.getElementById("email") as HTMLInputElement | null;
console.log(input?.value);
```

> Output: depends on the page

Step by step:

1. The compiler sees a broad type.
2. You assert a narrower type.
3. TypeScript trusts you.
4. Runtime behavior does not change.

Use carefully.

## `infer`

`infer` extracts part of a type inside a conditional type.

### Step by step

1. Write a conditional type.
2. Mark a portion with `infer`.
3. Reuse the captured type variable.

```ts
type ArrayElement<T> = T extends (infer U)[] ? U : never;
```

- `ArrayElement<string[]>` becomes `string`
- `ArrayElement<number[]>` becomes `number`

## `readonly`

`readonly` prevents mutation through a type.

```ts
type Settings = {
  readonly mode: string;
};

const settings: Settings = { mode: "dark" };
console.log(settings.mode);
```

> Output: `dark`

Step by step:

1. Mark a property as `readonly`.
2. Initialization is allowed.
3. Reassignment through that type is rejected.

## `satisfies`

`satisfies` checks conformance without erasing specific inference.

### Step by step

1. Write a value.
2. Add `satisfies SomeType`.
3. TypeScript verifies required structure.
4. The original literal precision is preserved.

```ts
type AppConfig = {
  mode: "dev" | "prod";
  port: number;
};

const appConfig = {
  mode: "dev",
  port: 3000,
} satisfies AppConfig;

console.log(appConfig.mode);
```

> Output: `dev`

## `as const`

`as const` freezes a literal expression into the narrowest readonly form.

### Step by step

1. Start with a literal value.
2. Add `as const`.
3. Strings stay literal strings.
4. Arrays become readonly tuples.
5. Object properties become readonly literals.

```ts
const roles = ["admin", "member"] as const;
console.log(roles[0]);
```

> Output: `admin`

## Union types

A union means a value can be one of several types.

```ts
type Id = string | number;

function printId(id: Id) {
  console.log(id);
}
```

Step by step:

1. Combine alternatives with `|`.
2. At first, only shared operations are safe.
3. Narrow before using type-specific behavior.

## Intersection types

An intersection combines requirements.

```ts
type Named = { name: string };
type Timestamped = { createdAt: Date };

type NamedRecord = Named & Timestamped;
```

Step by step:

1. Start with two object-like types.
2. Combine them with `&`.
3. The result must satisfy both.

## Discriminated unions

A discriminated union uses a shared tag field.

### Step by step

1. Give each variant a common field like `kind` or `status`.
2. Give each variant a different literal value for that field.
3. Narrow with `switch` or `if`.

```ts
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

function printResult(result: Result<number>) {
  if (result.ok) {
    console.log(result.value);
  } else {
    console.log(result.error);
  }
}

printResult({ ok: true, value: 10 });
```

> Output: `10`

## Mapped types

Mapped types transform every property of another type.

```ts
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
```

Step by step:

1. Iterate over all keys.
2. Rebuild the object.
3. Transform each property type.

## Conditional types

Conditional types let you branch at the type level.

```ts
type ToArray<T> = T extends any ? T[] : never;
```

Step by step:

1. Check whether `T` matches a condition.
2. Return one type for true.
3. Return another type for false.

## Template literal types

These build string types from other string pieces.

```ts
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<"click">;
```

`ClickEvent` becomes `"onClick"`.

## Generators

TypeScript types generator functions and yielded values.

```ts
function* countUpTo(limit: number): Generator<number, void, unknown> {
  for (let i = 1; i <= limit; i++) {
    yield i;
  }
}

for (const n of countUpTo(3)) {
  console.log(n);
}
```

> Output:
>
> ```text
> 1
> 2
> 3
> ```

## `enum`

An `enum` gives names to related constant values.

### Step by step

1. Declare the enum members.
2. TypeScript assigns values or uses the ones you provide.
3. Use the enum name as both a runtime object and a type.

```ts
enum Status {
  Pending,
  Active,
  Done,
}

const current: Status = Status.Active;
console.log(current);
console.log(Status[1]);
```

> Output:
>
> ```text
> 1
> Active
> ```

## `declare`

`declare` tells TypeScript that something exists at runtime even though the implementation is not in the current file.

### Step by step

1. Describe the shape of a runtime value.
2. Prefix it with `declare`.
3. TypeScript uses the type information without emitting implementation code.

```ts
declare const APP_VERSION: string;
```

This is common in declaration files and integration boundaries.

## Type predicates

A type predicate is the return form used in a custom type guard.

### Step by step

1. Write a function that performs a runtime check.
2. Return a special type form: `value is SomeType`.
3. TypeScript narrows the value when the function returns `true`.

```ts
type Admin = { role: "admin"; permissions: string[] };
type Member = { role: "member" };

function isAdmin(user: Admin | Member): user is Admin {
  return user.role === "admin";
}

const user: Admin | Member = { role: "admin", permissions: ["read"] };

if (isAdmin(user)) {
  console.log(user.permissions[0]);
}
```

> Output: `read`

## Index signatures

An index signature describes objects with dynamic keys.

### Step by step

1. Choose the key type, usually `string`.
2. Choose the value type.
3. Use bracket syntax in the type definition.

```ts
type ScoreMap = {
  [player: string]: number;
};

const scores: ScoreMap = { alice: 10, bob: 20 };
console.log(scores.alice);
```

> Output: `10`

## Call signatures

A call signature describes a callable shape.

### Step by step

1. Create an object-like type.
2. Put function syntax inside it.
3. Use the type for functions or callable objects.

```ts
type Formatter = {
  (value: string): string;
};

const upper: Formatter = (value) => value.toUpperCase();
console.log(upper("hello"));
```

> Output: `HELLO`

## Construct signatures

A construct signature describes something you can call with `new`.

### Step by step

1. Define a type with `new (...)` syntax.
2. Specify the instance type returned.
3. Accept classes or constructor-like values safely.

```ts
type PersonInstance = { name: string };
type PersonConstructor = new (name: string) => PersonInstance;

class Person {
  constructor(public name: string) {}
}

function createPerson(Ctor: PersonConstructor): PersonInstance {
  return new Ctor("Linh");
}

console.log(createPerson(Person).name);
```

> Output: `Linh`

## Parameter properties

Parameter properties are a class shorthand.

### Step by step

1. Write a constructor parameter.
2. Add `public`, `private`, `protected`, or `readonly`.
3. TypeScript creates and initializes the property automatically.

```ts
class UserService {
  constructor(private apiUrl: string, public name: string) {}

  print(): void {
    console.log(this.name, this.apiUrl);
  }
}

new UserService("/api", "main").print();
```

> Output: `main /api`

## Access modifiers

Access modifiers control visibility in classes.

### Step by step

1. Use `public` for normal access.
2. Use `private` for class-only access.
3. Use `protected` for class-and-subclass access.
4. Use `readonly` when mutation should be blocked after initialization.

```ts
class Account {
  constructor(public id: number, private balance: number) {}

  getBalance(): number {
    return this.balance;
  }
}

const account = new Account(1, 100);
console.log(account.id);
console.log(account.getBalance());
```

> Output:
>
> ```text
> 1
> 100
> ```

## Indexed access types

Indexed access types pull a property type out of another type.

### Step by step

1. Start with an object type.
2. Index into it using `Type["key"]`.
3. Reuse the extracted type elsewhere.

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

## Function overloads

Overloads let one function support multiple call shapes.

### Step by step

1. Write one or more overload signatures.
2. Write one implementation that handles all supported cases.
3. Narrow inside the implementation.

```ts
function format(value: number): string;
function format(value: Date): string;
function format(value: number | Date): string {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return value.toFixed(2);
}

console.log(format(12.3));
```

> Output: `12.30`

## Utility types

Utility types are built-in type transformers such as `Partial<T>`, `Readonly<T>`, `Pick<T, K>`, and `Record<K, T>`.

### Step by step

1. Start with an existing type.
2. Apply a utility type.
3. Get a derived type without rewriting the whole shape.

```ts
interface Todo {
  title: string;
  done: boolean;
}

const patch: Partial<Todo> = { done: true };
console.log(patch);
```

> Output: `{ done: true }`

## Technical keyword summary table

| Term | Main purpose |
|---|---|
| `type` | name a type expression |
| `interface` | describe object/class shape |
| `extends` | constrain, inherit, or test assignability |
| `keyof` | get property-name union |
| `typeof` | inspect runtime type or capture value shape |
| `in` | check properties or map over keys |
| `as` | assert a type |
| `infer` | extract a type inside a conditional |
| `readonly` | prevent mutation through a type |
| `satisfies` | validate shape while preserving inference |
| `as const` | keep the narrowest literal form |
| `enum` | group named constant values |
| `declare` | describe existing runtime values or modules |
| `type predicate` | power custom type guards |
| `index signature` | model objects with dynamic keys |
| `call signature` | describe callable shapes |
| `construct signature` | describe values usable with `new` |
| `parameter property` | declare and initialize class fields in the constructor |
| `access modifier` | control property/method visibility |
| `indexed access type` | extract nested property types |
| `function overload` | support multiple call signatures |
| `utility type` | derive new types from existing ones |

## Exercises

1. Write one example each for `keyof`, `typeof`, `in`, and `satisfies`.
2. Create a discriminated union with three variants and narrow it step by step.
3. Write a mapped type that makes every property optional and nullable.
4. Explain the difference between `as` and `satisfies` in your own words.

## Solution hints

1. Start with a small object like `{ id: 1, name: "A" }` so each keyword is easy to demonstrate.
2. Use a shared field like `status` or `kind`; then narrow with `switch`.
3. Combine a mapped type with both `?` and `| null`.
4. `as` tells the compiler to trust you; `satisfies` asks the compiler to verify your object against a target shape.
