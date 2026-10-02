# TypeScript Handbook

A more complete, official-style TypeScript handbook organized into chapters.

## Structure

- [01. Introduction and Setup](./chapters/01-introduction-and-setup.md)
- [02. Core Types and Inference](./chapters/02-core-types-and-inference.md)
- [03. Runtime Rules: Operators, Truthiness, Equality, and Comparison](./chapters/03-runtime-rules-truthiness-and-comparison.md)
- [04. Functions and Higher-Order Functions](./chapters/04-functions-and-higher-order-functions.md)
- [05. Objects, Interfaces, and Object-Oriented Programming](./chapters/05-objects-interfaces-and-oop.md)
- [06. Unions, Generics, and Type Operators](./chapters/06-unions-generics-and-type-operators.md)
- [07. Async Code, Errors, and Modules](./chapters/07-async-errors-and-modules.md)
- [08. tsconfig, Style Rules, and Zen of TypeScript Principles](./chapters/08-tsconfig-style-and-zen.md)
- [09. TypeScript Dictionary / Glossary](./chapters/09-typescript-dictionary.md)
- [10. Utility Types in Practice](./chapters/10-utility-types-in-practice.md)
- [11. Mapped Types and Key Transformations](./chapters/11-mapped-types-and-key-transformations.md)
- [12. Conditional Types, `infer`, and Distributivity](./chapters/12-conditional-types-infer-and-distributivity.md)
- [13. Assertions, `unknown`, `any`, and `satisfies`](./chapters/13-assertions-unknown-any-and-satisfies.md)
- [14. Type Guards, Narrowing, and Exhaustiveness](./chapters/14-type-guards-narrowing-and-exhaustiveness.md)
- [15. Records, Dictionaries, and Index Signatures](./chapters/15-records-dictionaries-and-index-signatures.md)
- [16. DOM, Events, and Browser APIs](./chapters/16-dom-events-and-browser-apis.md)
- [17. Declaration Files and JavaScript Libraries](./chapters/17-declaration-files-and-javascript-libraries.md)
- [18. Advanced Classes, `this`, and Composition](./chapters/18-advanced-classes-this-and-composition.md)
- [19. Large-Scale TypeScript: API Boundaries and Refactoring](./chapters/19-large-scale-typescript-api-boundaries-and-refactoring.md)
- [20. Technical Keywords and Core Patterns](./chapters/20-technical-keywords-and-core-patterns.md)
- [21. Generators, Iterables, and Async Iteration](./chapters/21-generators-iterables-and-async-iteration.md)
- [22. Template Literal Types, Branding, and Advanced Modeling](./chapters/22-template-literal-types-branding-and-advanced-modeling.md)
- [23. Decorators, Module Augmentation, and Legacy Features](./chapters/23-decorators-module-augmentation-and-legacy-features.md)

## Knowledge map

### Chapters 01-04: Foundations

Learn the basics of the language:

- setup
- primitive types
- inference
- runtime rules, operators, and arithmetic
- functions
- higher-order functions

### Chapters 05-08: Everyday application design

Learn how to model and organize real code:

- objects and interfaces
- OOP
- unions and generics
- modules
- async code
- errors
- project rules and consistency

### Chapter 09: Dictionary / glossary

Use this as a quick lookup chapter whenever a technical term is unfamiliar.

### Chapters 10-15: Type-system depth

Learn the stronger type-modeling tools:

- utility types
- mapped types
- conditional types
- `infer`
- `satisfies`
- type guards
- records and index signatures

### Chapters 16-19: Platform and architecture

Learn how TypeScript applies in larger systems:

- browser and DOM typing
- declaration files
- advanced class composition
- public API boundaries
- refactoring strategy

### Chapters 20-23: Advanced technical vocabulary

Learn the important TypeScript technical names and advanced patterns:

- `keyof`, `typeof`, `in`, `as`, `infer`
- call signatures and construct signatures
- parameter properties and access modifiers
- generators and async iteration
- template literal types and branding
- decorators and module augmentation

## Reading order

If you are new to TypeScript, read in order from 01 to 23.

## Learning workflows

### 1. Complete beginner workflow

Read:

1. Chapter 01
2. Chapter 02
3. Chapter 03
4. Chapter 04
5. Chapter 05
6. Chapter 06
7. Chapter 07
8. Chapter 08

Knowledge gained:

- basic TypeScript syntax
- runtime vs compile-time thinking
- common types
- functions and objects
- enough structure to start small projects

### 2. Practical app developer workflow

Read:

1. Chapters 01-08
2. Chapter 13
3. Chapter 14
4. Chapter 15
5. Chapter 16
6. Chapter 19

Knowledge gained:

- safe app code
- narrowing and runtime validation habits
- dictionary and record modeling
- browser typing
- cleaner module and API boundaries

### 3. Type-system deep-dive workflow

Read:

1. Chapter 06
2. Chapter 10
3. Chapter 11
4. Chapter 12
5. Chapter 13
6. Chapter 14
7. Chapter 20
8. Chapter 22

Knowledge gained:

- generics
- utility types
- mapped and conditional types
- `infer`
- advanced modeling patterns

### 4. Library and framework workflow

Read:

1. Chapter 10
2. Chapter 11
3. Chapter 12
4. Chapter 17
5. Chapter 20
6. Chapter 22
7. Chapter 23

Knowledge gained:

- reusable public types
- declaration files
- module augmentation
- advanced type composition
- specialized TypeScript language features

### 5. Architecture and refactoring workflow

Read:

1. Chapter 05
2. Chapter 07
3. Chapter 08
4. Chapter 18
5. Chapter 19

Knowledge gained:

- object modeling
- async and error boundaries
- codebase consistency rules
- composition over inheritance
- stable APIs and safer refactors

### 6. Fast review workflow

Read:

1. Chapter 03
2. Chapter 06
3. Chapter 08
4. Chapter 14
5. Chapter 20

Knowledge gained:

- the most important runtime rules
- unions and generics
- consistency rules
- narrowing and technical keywords

## Notes

- Examples are intentionally small and practical.
- Many code blocks include expected output.
- Every chapter now ends with exercises.
- Most chapters now also include solution hints.
- TypeScript checks types at compile time; JavaScript behavior still happens at runtime.
