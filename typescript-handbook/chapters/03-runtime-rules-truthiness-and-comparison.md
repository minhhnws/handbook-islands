# 03. Runtime Rules: Operators, Truthiness, Equality, and Comparison

TypeScript does not replace JavaScript runtime behavior. To write correct TypeScript, you still need to understand JavaScript operators, arithmetic rules, coercion, and comparisons.

## Operators overview: Runtime vs. Type-Level

TypeScript deals with two kinds of operators:

1. **Runtime operators (JavaScript standard):** Executed when your program runs (e.g., `+`, `-`, `*`, `/`, `===`, `&&`, `??`, `?.`). These compute values, manipulate data, and govern control flow.
2. **Type-level operators (TypeScript specific):** Erased during compilation and only exist to model types at compile-time (e.g., `keyof`, `typeof`, `|`, `&`, `as`, `satisfies`, mapped type modifiers `+` and `-`).

This chapter covers **runtime operators**, how they behave, and common pitfalls.

## Arithmetic operators

TypeScript supports all standard JavaScript arithmetic operators for numeric computation:

| Operator | Name | Description | Example |
| :--- | :--- | :--- | :--- |
| `+` | Addition | Adds numbers or concatenates strings | `5 + 2` -> `7`, `"a" + "b"` -> `"ab"` |
| `-` | Subtraction | Subtracts numbers or unrolls unary negation | `10 - 4` -> `6`, `-x` |
| `*` | Multiplication | Multiplies two numbers | `3 * 4` -> `12` |
| `/` | Division | Performs floating-point division | `7 / 2` -> `3.5` |
| `%` | Remainder | Computes remainder (modulo) after division | `7 % 3` -> `1` |
| `**` | Exponentiation | Raises base to an exponent | `2 ** 3` -> `8` |
| `++` | Increment | Adds 1 to operand (pre- or postfix) | `count++`, `++count` |
| `--` | Decrement | Subtracts 1 from operand (pre- or postfix) | `count--`, `--count` |

### Arithmetic examples

```ts
const price: number = 20;
const discount: number = 5;
const total: number = price - discount;

console.log(total);
console.log(2 ** 4);
console.log(10 % 3);
```

> Output:
>
> ```text
> 15
> 16
> 1
> ```

### The `//` pitfall (Python vs. TypeScript)

If you have a background in Python, be aware:

* In Python, `//` is the **integer (floor) division operator** (`7 // 2 == 3`).
* In TypeScript / JavaScript, **`//` is NOT an operator** — it starts a **single-line comment**!

Writing `7 // 2` comments out the rest of the line and causes a syntax error:

```ts
// ❌ WRONG: In TypeScript, // is a comment!
// const result = 7 // 2; -> syntax error: unexpected end of statement

// ✅ CORRECT: Standard division is / (returns floating-point number)
const divResult: number = 7 / 2; // 3.5

// ✅ CORRECT: For integer / floor division, use Math.floor() or Math.trunc()
const floorResult: number = Math.floor(7 / 2); // 3
const truncResult: number = Math.trunc(7 / 2); // 3
```

> Output:
>
> ```text
> 3.5
> 3
> 3
> ```

* Use `Math.floor(a / b)` when you want the largest integer less than or equal to the quotient (rounds toward negative infinity).
* Use `Math.trunc(a / b)` when you want to discard the fractional part (rounds toward zero).

### The `+` operator: Addition vs. String concatenation

The `+` operator is overloaded in JavaScript. If either operand is a string, it converts the other operand to a string and concatenates them:

```ts
console.log(5 + 3);      // 8 (number addition)
console.log("5" + 3);    // "53" (string concatenation!)
console.log(+"5" + 3);   // 8 (unary + converts "5" to number first)
```

> Output:
>
> ```text
> 8
> 53
> 8
> ```

TypeScript prevents many common coercion mistakes at compile time:

```ts
const count = 4;
// @ts-expect-error - TypeScript blocks multiplying strings by numbers:
const invalid = "hello" * count;
```

## Assignment operators

JavaScript and TypeScript offer compound assignment operators that combine an operation with assignment:

| Operator | Equivalent to | Example |
| :--- | :--- | :--- |
| `=` | Direct assignment | `x = 10` |
| `+=` | `x = x + y` | `x += 5` |
| `-=` | `x = x - y` | `x -= 5` |
| `*=` | `x = x * y` | `x *= 2` |
| `/=` | `x = x / y` | `x /= 2` |
| `%=` | `x = x % y` | `x %= 3` |
| `**=` | `x = x ** y` | `x **= 2` |
| `&&=` | `x && (x = y)` (assigns if x is truthy) | `x &&= defaultVal` |
| `\|\|=` | `x \|\| (x = y)` (assigns if x is falsy) | `x \|\|= fallback` |
| `??=` | `x ?? (x = y)` (assigns if x is nullish) | `x ??= initialValue` |

```ts
let score = 10;
score += 5; // 15
score *= 2; // 30
console.log(score);

let label: string | null = null;
label ??= "Untitled";
console.log(label);
```

> Output:
>
> ```text
> 30
> Untitled
> ```

## Logical operators

| Operator | Name | Short-circuit rule |
| :--- | :--- | :--- |
| `&&` | Logical AND | Returns the first falsy operand, or the last operand if all are truthy |
| `\|\|` | Logical OR | Returns the first truthy operand, or the last operand if all are falsy |
| `!` | Logical NOT | Converts operand to boolean and negates it |

```ts
console.log(true && "active");
console.log(false && "active");
console.log("" || "default name");
console.log(!0);
```

> Output:
>
> ```text
> active
> false
> default name
> true
> ```

## Truthy and falsy values

Falsy values in JavaScript are:

- `false`
- `0`
- `-0`
- `0n`
- `""`
- `null`
- `undefined`
- `NaN`

Everything else is truthy.

```ts
function printValue(value: string | null) {
  if (value) {
    console.log(value.toUpperCase());
  } else {
    console.log("No value");
  }
}

printValue("hello");
printValue(null);
```

> Output:
>
> ```text
> HELLO
> No value
> ```

## Truthiness pitfall

```ts
function showCount(count: number | null) {
  if (count) {
    console.log(`Count: ${count}`);
  } else {
    console.log("Missing count");
  }
}

showCount(0);
showCount(3);
```

> Output:
>
> ```text
> Missing count
> Count: 3
> ```

If `0` is valid, a truthy check is too broad.

```ts
function showSafeCount(count: number | null) {
  if (count !== null) {
    console.log(`Count: ${count}`);
  } else {
    console.log("Missing count");
  }
}

showSafeCount(0);
```

> Output: `Count: 0`

## Conditional branching: `if`, `else if`, and `else`

The `if / else` statement executes different code blocks based on boolean conditions. In TypeScript, `if / else` is not only a runtime control flow mechanism—it is also the primary way TypeScript performs **control-flow type narrowing**.

### Basic syntax

```ts
function evaluateScore(score: number): string {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else {
    return "Needs improvement";
  }
}

console.log(evaluateScore(95));
console.log(evaluateScore(72));
console.log(evaluateScore(50));
```

> Output:
>
> ```text
> A
> C
> Needs improvement
> ```

### Type narrowing inside `if` / `else`

TypeScript tracks the type of a variable across branches:

```ts
function formatInput(input: string | number | null): string {
  if (input === null) {
    // Inside this block, TypeScript narrows input to `null`
    return "Empty";
  } else if (typeof input === "number") {
    // Inside this block, TypeScript narrows input to `number`
    return input.toFixed(2);
  } else {
    // In this remaining block, input must be `string`
    return input.trim().toUpperCase();
  }
}

console.log(formatInput(null));
console.log(formatInput(42.5));
console.log(formatInput("  hello  "));
```

> Output:
>
> ```text
> Empty
> 42.50
> HELLO
> ```

---

### Best-practice tips for `if / else`

#### Tip 1: Prefer Guard Clauses (Early Return) over Nested `if`s

Deeply nested `if / else` chains create the "pyramid of doom" and make code hard to follow. Check invalid or edge cases first and return early:

```ts
// ❌ Avoid: Deeply nested if / else
function processUserBad(user: { active: boolean; email?: string } | null) {
  if (user !== null) {
    if (user.active) {
      if (user.email) {
        return `Sending email to ${user.email}`;
      } else {
        return "Missing email";
      }
    } else {
      return "User inactive";
    }
  } else {
    return "User not found";
  }
}

// ✅ Recommended: Guard clauses (flat, readable, narrows as you go)
function processUserGood(user: { active: boolean; email?: string } | null) {
  if (!user) return "User not found";
  if (!user.active) return "User inactive";
  if (!user.email) return "Missing email";

  return `Sending email to ${user.email}`;
}

console.log(processUserGood({ active: true, email: "dev@example.com" }));
```

> Output: `Sending email to dev@example.com`

#### Tip 2: Omit redundant `else` after a `return` or `throw`

When an `if` branch exits via `return`, `throw`, or `break`, an `else` block adds unnecessary visual indentation:

```ts
// ❌ Unnecessary else
function getFeeBad(isMember: boolean): number {
  if (isMember) {
    return 0;
  } else {
    return 10;
  }
}

// ✅ Clean and concise
function getFeeGood(isMember: boolean): number {
  if (isMember) {
    return 0;
  }
  return 10;
}
```

#### Tip 3: Use Ternary (`? :`) for values, `if / else` for control flow

If the only goal is to assign or return a value based on a condition, use the ternary operator:

```ts
// Cleaner than a multi-line if-else statement:
const statusMessage = score >= 50 ? "Pass" : "Fail";
```

Keep ternaries to a single level. For multiple conditions, use `if / else` or `switch`.

#### Tip 4: Exhaustiveness checking in the final `else`

When handling discriminated unions, use `never` in the final `else` to catch unhandled cases at compile time:

```ts
type Action = { type: "start" } | { type: "stop" } | { type: "pause" };

function handleAction(action: Action) {
  if (action.type === "start") {
    return "Starting...";
  } else if (action.type === "stop") {
    return "Stopping...";
  } else if (action.type === "pause") {
    return "Pausing...";
  } else {
    // If a new action type is added to `Action` and not handled above,
    // TypeScript will throw a compile-time error right here!
    const _unhandled: never = action;
    throw new Error(`Unhandled action: ${_unhandled}`);
  }
}
```

### Practical example: A binary operator calculator with `if / else`

A "binary operator" is an operator that operates on two operands (left and right). Here is how to implement a type-safe arithmetic calculator that dispatches operators (`+`, `-`, `*`, `/`) using `if / else` with guard clauses and exhaustiveness checks:

```ts
type BinaryArithmeticOperator = "+" | "-" | "*" | "/";

function calculate(
  left: number,
  operator: BinaryArithmeticOperator,
  right: number
): number {
  // Guard clause: prevent runtime division by zero
  if (operator === "/" && right === 0) {
    throw new RangeError("Division by zero is not allowed.");
  }

  if (operator === "+") {
    return left + right;
  } else if (operator === "-") {
    return left - right;
  } else if (operator === "*") {
    return left * right;
  } else if (operator === "/") {
    return left / right;
  } else {
    const _unreachable: never = operator;
    throw new Error(`Unsupported operator: ${_unreachable}`);
  }
}

console.log(calculate(10, "+", 5));
console.log(calculate(10, "-", 3));
console.log(calculate(4, "*", 6));
console.log(calculate(9, "/", 2));
```

> Output:
>
> ```text
> 15
> 7
> 24
> 4.5
> ```

## Binary in TypeScript: Numbers, Operators, and Bitwise Logic

In programming, the term **binary** refers to two concepts:
1. **Binary Operators:** An operator taking two operands (e.g., `a + b`, `a / b`).
2. **Binary Base-2 Representation & Bitwise Operations:** Numbers written in base-2 (bits: 0 and 1) and operators that manipulate individual bits.

### Binary number literals (`0b`)

TypeScript supports binary literals prefixed with `0b` or `0B`. You can use underscores (`_`) as numeric separators for readability:

```ts
const byte1: number = 0b0000_1010; // decimal 10
const byte2: number = 0b0000_0101; // decimal 5

console.log(byte1);
console.log(byte2);
console.log(byte1.toString(2)); // Convert back to binary string
```

> Output:
>
> ```text
> 10
> 5
> 1010
> ```

### Bitwise binary operators

Bitwise operators treat operands as 32-bit integers and operate at the bit level:

| Operator | Name | Description | Example |
| :--- | :--- | :--- | :--- |
| `&` | Bitwise AND | Sets each bit to 1 if both bits are 1 | `0b1100 & 0b1010` -> `0b1000` (8) |
| `\|` | Bitwise OR | Sets each bit to 1 if at least one bit is 1 | `0b1100 \| 0b1010` -> `0b1110` (14) |
| `^` | Bitwise XOR | Sets each bit to 1 if exactly one bit is 1 | `0b1100 ^ 0b1010` -> `0b0110` (6) |
| `~` | Bitwise NOT (unary) | Inverts all bits | `~0b0000` -> `-1` |
| `<<` | Left shift | Shifts bits left, filling with zeros | `0b0001 << 2` -> `0b0100` (4) |
| `>>` | Sign-propagating right shift | Shifts bits right, preserving sign bit | `0b1000 >> 2` -> `0b0010` (2) |
| `>>>` | Zero-fill right shift | Shifts bits right, filling with zeros | `-8 >>> 2` |

### Using `if` with bitwise flags (Permissions mask pattern)

A common use of binary bitwise operators with `if` statements is permission checking:

```ts
// Define permission bitflags using binary literals
const PERM_READ    = 0b0001; // 1
const PERM_WRITE   = 0b0010; // 2
const PERM_EXECUTE = 0b0100; // 4
const PERM_ADMIN   = 0b1000; // 8

// Combine permissions using bitwise OR (|)
const userPermissions = PERM_READ | PERM_WRITE; // 0b0011 (3)

function checkAccess(permissions: number) {
  // Check specific bit using bitwise AND (&) inside if statement
  if ((permissions & PERM_ADMIN) !== 0) {
    console.log("Access: Full Admin");
  } else if ((permissions & PERM_WRITE) !== 0) {
    console.log("Access: Read and Write");
  } else if ((permissions & PERM_READ) !== 0) {
    console.log("Access: Read Only");
  } else {
    console.log("Access: Denied");
  }
}

checkAccess(userPermissions);
checkAccess(PERM_READ);
```

> Output:
>
> ```text
> Access: Read and Write
> Access: Read Only
> ```

## Equality operators

### Loose equality: `==`

```ts
console.log(5 == "5");
console.log(false == 0);
```

> Output:
>
> ```text
> true
> true
> ```

Loose equality performs coercion. It is often surprising.

### Strict equality: `===`

```ts
console.log(5 === "5");
console.log(false === 0);
console.log(5 === 5);
```

> Output:
>
> ```text
> false
> false
> true
> ```

Prefer `===` and `!==` almost always.

## Equality vs identity vs deep equality

This is often where people mean different things by "compare".

### Value equality for primitives

```ts
console.log("a" === "a");
console.log(10 === 10);
```

> Output:
>
> ```text
> true
> true
> ```

### Reference identity for objects

```ts
const a = { count: 1 };
const b = { count: 1 };
const c = a;

console.log(a === b);
console.log(a === c);
```

> Output:
>
> ```text
> false
> true
> ```

Objects compare by reference with `===`, not by content.

### Deep equality

JavaScript does not provide built-in deep equality with `===`.

```ts
const left = { name: "A", tags: ["x"] };
const right = { name: "A", tags: ["x"] };

console.log(left === right);
```

> Output: `false`

If you need structural comparison, you must implement or use a deep-compare utility.

## `Object.is`

`Object.is` is almost like `===`, but differs in a few cases.

```ts
console.log(Object.is(NaN, NaN));
console.log(NaN === NaN);
console.log(Object.is(-0, 0));
console.log(-0 === 0);
```

> Output:
>
> ```text
> true
> false
> false
> true
> ```

## Relational comparison

```ts
console.log(3 > 2);
console.log("b" > "a");
console.log("10" > "2");
```

> Output:
>
> ```text
> true
> true
> false
> ```

String comparisons are lexicographic, not numeric.

## Nullish coalescing `??`

Use `??` only for `null` and `undefined` fallbacks.

```ts
function displayName(name: string | null): string {
  return name ?? "Anonymous";
}

console.log(displayName(null));
console.log(displayName("Minh"));
```

> Output:
>
> ```text
> Anonymous
> Minh
> ```

Compare this with `||`:

```ts
console.log("" || "fallback");
console.log("" ?? "fallback");
```

> Output:
>
> ```text
> fallback
> 
> ```

The second line keeps the empty string because it is not nullish.

## Optional chaining `?.`

```ts
const user = { profile: { email: "a@example.com" } };
console.log(user.profile?.email);
```

> Output: `a@example.com`

## Type narrowing with runtime checks

### `typeof`

```ts
function logId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(0));
  }
}

logId("ab12");
logId(42);
```

> Output:
>
> ```text
> AB12
> 42
> ```

### `in`

```ts
type Dog = { bark: () => string };
type Cat = { meow: () => string };

function speak(animal: Dog | Cat): string {
  if ("bark" in animal) {
    return animal.bark();
  }
  return animal.meow();
}

console.log(speak({ bark: () => "woof" }));
```

> Output: `woof`

## A practical operator and comparison rule set

1. Use `===` and `!==` by default.
2. Use `== null` only if you intentionally want to match both `null` and `undefined`.
3. Avoid truthy checks when `0`, `false`, or `""` are meaningful values.
4. Remember that objects compare by reference.
5. In TypeScript, division is `/`; do not use `//` (which is a comment). Use `Math.floor()` or `Math.trunc()` for integer division.
6. Be careful with `+`: adding a number to a string produces a string (`"5" + 2 === "52"`).
7. Use deep comparison only when you truly need structural equality.

## Exercises

1. Write a function that accepts `number | null` and prints different messages for `null`, `0`, and positive numbers.
2. Compare two separate objects with the same fields and explain why `===` returns `false`.
3. Demonstrate the difference between `||` and `??` using an empty string and the value `null`.
4. Write a short example using `typeof` to narrow `string | number`.
5. Write a function `divideInt(a: number, b: number): number` that performs integer/floor division safely without throwing when `b === 0`.
6. Explain what `"10" + 5` and `+"10" + 5` evaluate to and why.

## Solution hints

1. Use precise checks like `value === null` and `value === 0`; avoid relying only on truthiness.
2. Create two literals like `{ id: 1 }` and compare them; then assign one variable to another and compare again.
3. `||` treats `""` as falsy, while `??` only falls back for `null` or `undefined`.
4. Inside the `typeof value === "string"` branch, call a string method; in the other branch, call a number method.
5. Check if `b === 0` first (or return `Infinity`/throw error); otherwise use `Math.floor(a / b)`. Note that `a // b` is invalid syntax.
6. `"10" + 5` coerces `5` to a string resulting in `"105"`; `+"10" + 5` uses unary `+` to convert `"10"` into number `10`, producing `15`.
