# 18. Advanced Classes, `this`, and Composition

This chapter extends the object-oriented material with patterns that show up in larger codebases.

## Typing `this` in functions

```ts
function printName(this: { name: string }) {
  console.log(this.name);
}

printName.call({ name: "Typed this" });
```

> Output: `Typed this`

## Fluent APIs

Methods that return `this` enable chaining.

```ts
class Builder {
  private parts: string[] = [];

  add(value: string): this {
    this.parts.push(value);
    return this;
  }

  build(): string {
    return this.parts.join("-");
  }
}

const built = new Builder().add("a").add("b").build();
console.log(built);
```

> Output: `a-b`

## Static members

```ts
class Counter {
  static created = 0;

  constructor() {
    Counter.created += 1;
  }
}

new Counter();
new Counter();
console.log(Counter.created);
```

> Output: `2`

## Composition over inheritance

Instead of deep hierarchies, combine focused objects.

```ts
class Logger {
  log(message: string): void {
    console.log(message);
  }
}

class UserService {
  constructor(private logger: Logger) {}

  createUser(name: string): void {
    this.logger.log(`Creating ${name}`);
  }
}

const service = new UserService(new Logger());
service.createUser("Alice");
```

> Output: `Creating Alice`

## Interface-driven design

```ts
interface LoggerLike {
  log(message: string): void;
}

class ConsoleLogger implements LoggerLike {
  log(message: string): void {
    console.log(message);
  }
}
```

This keeps consumers dependent on behavior, not concrete implementation.

## Rules

1. Keep classes small and cohesive.
2. Prefer interfaces for dependencies.
3. Prefer composition over inheritance.
4. Return `this` only when a fluent API is truly helpful.

## Exercises

1. Write a small builder class with two chainable methods.
2. Add a static counter to a class and print the number of created instances.
3. Refactor an inheritance example into composition.
4. Add an interface for a dependency and inject it into a service class.

## Solution hints

1. Return `this` from each builder method to support chaining.
2. Increment a `static created = 0` field inside the constructor.
3. Extract shared behavior into a separate helper object instead of a base class.
4. Define an interface like `LoggerLike` and accept it in the constructor.
