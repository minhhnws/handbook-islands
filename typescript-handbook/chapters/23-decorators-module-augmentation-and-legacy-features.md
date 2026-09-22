# 23. Decorators, Module Augmentation, and Legacy Features

This chapter covers advanced or specialized TypeScript features that you may encounter in frameworks, older codebases, or library work.

## Decorators

A decorator is a function-like construct applied with `@...` syntax to a class or class member.

> Important: decorator support and behavior depend on current TypeScript and JavaScript proposal status. Treat decorators as an advanced feature and confirm project configuration before using them.

### Conceptual example

```ts
function sealed<T extends { new (...args: any[]): object }>(constructor: T): T {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
  return constructor;
}

@sealed
class UserService {}
```

### Step by step

1. Write a decorator function.
2. It receives metadata about the decorated target.
3. It can wrap, annotate, or alter behavior depending on decorator kind.
4. Apply it with `@decoratorName`.

Decorators are common in some frameworks, but many codebases do not need them.

## Module augmentation

Module augmentation extends types from an existing module.

```ts
declare module "some-library" {
  interface Config {
    debug?: boolean;
  }
}
```

### Step by step

1. Start with a module that already exports a type.
2. Reopen the module with `declare module`.
3. Extend the existing interface or declaration.
4. TypeScript merges the declarations.

## Declaration merging

Interfaces with the same name can merge.

```ts
interface Settings {
  theme: string;
}

interface Settings {
  language: string;
}
```

The final `Settings` interface contains both properties.

## Namespaces

Namespaces are an older TypeScript organization feature.

```ts
namespace MathTools {
  export function add(a: number, b: number): number {
    return a + b;
  }
}

console.log(MathTools.add(2, 3));
```

> Output: `5`

Modern code usually prefers ES modules instead of namespaces.

## When these features appear

You are likely to see them in:

- Angular-style codebases
- legacy TypeScript projects
- library typing work
- module augmentation for third-party integrations

## Guidance

1. Prefer modern ES modules over namespaces.
2. Use decorators only when a framework or architecture clearly benefits from them.
3. Keep augmentations minimal and documented.
4. Be careful when modifying library types globally.

## Exercises

1. Write a conceptual class decorator that logs or seals a class.
2. Show an example of declaration merging with an interface.
3. Write a small namespace example, then rewrite it as ES-module-style code.
4. Explain one realistic use case for module augmentation.

## Solution hints

1. Start with a function that accepts a constructor and returns it.
2. Re-declare the same interface name twice with different fields.
3. In the rewrite, export a function from one file and import it from another.
4. A common use case is extending a third-party library's config or request object typing.
