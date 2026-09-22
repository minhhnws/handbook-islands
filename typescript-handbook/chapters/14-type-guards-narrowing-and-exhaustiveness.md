# 14. Type Guards, Narrowing, and Exhaustiveness

Narrowing is how TypeScript turns broad types into specific ones based on runtime evidence.

## `typeof`

```ts
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(0));
  }
}

printId("ab12");
printId(42);
```

> Output:
>
> ```text
> AB12
> 42
> ```

## `instanceof`

```ts
function formatValue(value: Date | string): string {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return value.toUpperCase();
}

console.log(formatValue("hello"));
```

> Output: `HELLO`

## `in`

```ts
type Dog = { bark: () => void };
type Cat = { meow: () => void };

function speak(animal: Dog | Cat) {
  if ("bark" in animal) {
    animal.bark();
  } else {
    animal.meow();
  }
}
```

## Equality narrowing

```ts
function compare(a: string | number, b: string) {
  if (a === b) {
    console.log(a.toUpperCase());
  }
}

compare("abc", "abc");
```

> Output: `ABC`

## User-defined type guards

```ts
type Admin = { role: "admin"; permissions: string[] };
type Member = { role: "member" };

function isAdmin(user: Admin | Member): user is Admin {
  return user.role === "admin";
}

function printPermissions(user: Admin | Member) {
  if (isAdmin(user)) {
    console.log(user.permissions.join(", "));
  } else {
    console.log("No admin permissions");
  }
}

printPermissions({ role: "admin", permissions: ["read", "write"] });
```

> Output: `read, write`

## Exhaustive checking with `never`

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
```

This pattern helps the compiler tell you when a new union member has not been handled.

## Exercises

1. Write a user-defined type guard for `Teacher | Student`.
2. Create a discriminated union for shapes with three variants and handle them in a `switch`.
3. Write an example using `instanceof` and one using `in`.
4. Add a new variant to a union and observe how an exhaustive `never` check helps you update the code.

## Solution hints

1. Give one branch a distinctive property such as `subject` or `studentId`.
2. Use a shared `kind` field and handle each case explicitly.
3. `instanceof Date` and `"bark" in animal` are classic starter examples.
4. After adding the new variant, the `never` assignment should fail until you add a new branch.
