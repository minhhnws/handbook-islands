# 05. Objects, Interfaces, and Object-Oriented Programming

## Object types

```ts
const user: { id: number; name: string } = {
  id: 1,
  name: "Alice",
};

console.log(user.name);
```

> Output: `Alice`

## Optional properties

```ts
const profile: { name: string; email?: string } = {
  name: "Linh",
};

console.log(profile.email);
```

> Output: `undefined`

## Readonly properties

```ts
type Config = {
  readonly apiUrl: string;
};

const config: Config = { apiUrl: "https://api.example.com" };
console.log(config.apiUrl);
```

> Output: `https://api.example.com`

## Interfaces

```ts
interface User {
  id: number;
  name: string;
  email?: string;
}

const user2: User = { id: 1, name: "Mai" };
console.log(user2);
```

> Output: `{ id: 1, name: 'Mai' }`

## Type aliases

```ts
type Role = "admin" | "member";

type Account = {
  id: number;
  role: Role;
};

const account: Account = { id: 1, role: "admin" };
console.log(account.role);
```

> Output: `admin`

## Interface extension

```ts
interface Person {
  name: string;
}

interface Employee extends Person {
  title: string;
}

const employee: Employee = { name: "An", title: "Engineer" };
console.log(employee.title);
```

> Output: `Engineer`

## Declaration merging

```ts
interface Settings {
  theme: string;
}

interface Settings {
  language: string;
}

const settings: Settings = {
  theme: "dark",
  language: "en",
};

console.log(settings);
```

> Output: `{ theme: 'dark', language: 'en' }`

## Interface vs type

Use `interface` when:

- defining object contracts
- extension is likely
- declaration merging is useful

Use `type` when:

- creating unions
- aliasing tuples or functions
- composing advanced types

## Classes

### Basic class

```ts
class PersonClass {
  constructor(public name: string, private age: number) {}

  greet(): string {
    return `Hi, I am ${this.name}`;
  }

  getAge(): number {
    return this.age;
  }
}

const person = new PersonClass("Linh", 25);
console.log(person.greet());
console.log(person.getAge());
```

> Output:
>
> ```text
> Hi, I am Linh
> 25
> ```

### Access modifiers

- `public`
- `private`
- `protected`
- `readonly`

```ts
class AccountClass {
  readonly id: number;
  private balance: number;

  constructor(id: number, balance: number) {
    this.id = id;
    this.balance = balance;
  }

  getBalance(): number {
    return this.balance;
  }
}

const acc = new AccountClass(1, 100);
console.log(acc.id);
console.log(acc.getBalance());
```

> Output:
>
> ```text
> 1
> 100
> ```

### Inheritance

```ts
class Animal {
  constructor(protected name: string) {}

  move(): string {
    return `${this.name} moves`;
  }
}

class Dog extends Animal {
  bark(): string {
    return `${this.name} barks`;
  }
}

const dog = new Dog("Milo");
console.log(dog.move());
console.log(dog.bark());
```

> Output:
>
> ```text
> Milo moves
> Milo barks
> ```

### Implementing interfaces

```ts
interface Payable {
  pay(amount: number): string;
}

class Wallet implements Payable {
  pay(amount: number): string {
    return `Paid ${amount}`;
  }
}

const wallet = new Wallet();
console.log(wallet.pay(50));
```

> Output: `Paid 50`

### Abstract classes

```ts
abstract class Shape {
  abstract area(): number;

  describe(): string {
    return `Area is ${this.area()}`;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  area(): number {
    return this.width * this.height;
  }
}

const rectangle = new Rectangle(4, 5);
console.log(rectangle.describe());
```

> Output: `Area is 20`

## OOP rules of thumb

Use OOP when:

- state and identity matter
- you need encapsulated mutation
- your domain maps naturally to entities

Prefer plain objects and functions when:

- data is simple
- behavior is stateless
- inheritance would be unnecessary complexity

Prefer composition over deep inheritance.

## Exercises

1. Define an interface for `Product` and create two values that satisfy it.
2. Create a class with one public property, one private property, and one method that exposes safe behavior.
3. Model a `User` plus `AdminUser` relationship using either interface extension or a class hierarchy, then explain why you chose that design.
4. Refactor one example from a class-based style to a plain-object-and-function style and compare the trade-offs.

## Solution hints

1. Start with fields like `id`, `name`, and `price`.
2. A bank-account-like example works well: expose `deposit()` or `getBalance()` instead of the raw private field.
3. If the difference is mostly data shape, interface extension is often enough; use classes when identity and behavior matter.
4. Compare encapsulation and stateful methods against simpler data plus pure helper functions.
