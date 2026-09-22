# 15. Records, Dictionaries, and Index Signatures

Many applications need key-value collections that are not fixed ahead of time.

## Index signatures

```ts
type Scores = {
  [player: string]: number;
};

const scores: Scores = {
  alice: 10,
  bob: 12,
};

console.log(scores.alice);
```

> Output: `10`

Index signatures are flexible, but broad.

## `Record<K, T>`

`Record<K, T>` is often a cleaner way to express dictionaries.

```ts
type Status = "pending" | "done";
type StatusLabels = Record<Status, string>;

const labels: StatusLabels = {
  pending: "Waiting",
  done: "Completed",
};

console.log(labels.done);
```

> Output: `Completed`

## When to choose which

Use an index signature when:

- keys are open-ended
- keys are not known in advance

Use `Record<K, T>` when:

- keys come from a known union
- you want completeness enforced

## Dictionary lookups and `undefined`

A missing key may produce `undefined` at runtime.

```ts
const stock: Record<string, number> = { book: 5 };
console.log(stock["pen"]);
```

> Output: `undefined`

With strict options like `noUncheckedIndexedAccess`, TypeScript helps make this visible.

## Nested dictionaries

```ts
type Inventory = Record<string, Record<string, number>>;

const inventory: Inventory = {
  books: { ts: 3, js: 5 },
};

console.log(inventory.books.ts);
```

> Output: `3`

## Practical rules

1. Prefer `Record<K, T>` for closed sets of keys.
2. Prefer explicit object types when the shape is stable and small.
3. Be careful with unchecked key access.
4. Use maps only when you need true `Map` behavior, not just objects.

## Exercises

1. Model a dictionary of translation strings by locale code.
2. Create a `Record<"small" | "medium" | "large", number>`.
3. Write a function that safely reads from a dictionary and returns a fallback if the key is missing.
4. Compare an index-signature type with a `Record<K, T>` type and explain which is stricter.

## Solution hints

1. `Record<string, string>` is a simple start for locale-to-message mapping.
2. Fill in all three keys to satisfy the closed union.
3. Read the key and use `??` to fall back when the lookup returns `undefined`.
4. `Record<K, T>` is stricter when `K` is a finite union because all keys must be present.
