# 11. Mapped Types and Key Transformations

Mapped types generate new object types by iterating over existing keys.

## Basic mapped type

```ts
type OptionsFlags<T> = {
  [K in keyof T]: boolean;
};

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureFlags = OptionsFlags<Features>;

const flags: FeatureFlags = {
  darkMode: true,
  newUserProfile: false,
};

console.log(flags);
```

> Output: `{ darkMode: true, newUserProfile: false }`

## Adding `readonly`

```ts
type ReadonlyMapped<T> = {
  readonly [K in keyof T]: T[K];
};
```

## Removing optionality with `-?`

```ts
type RequiredMapped<T> = {
  [K in keyof T]-?: T[K];
};
```

## Adding optionality with `?`

```ts
type PartialMapped<T> = {
  [K in keyof T]?: T[K];
};
```

These patterns help explain how built-in utilities like `Partial<T>` and `Readonly<T>` work.

## Key remapping with `as`

Mapped types can rename keys.

```ts
type PrefixKeys<T> = {
  [K in keyof T as `app_${string & K}`]: T[K];
};

type Env = {
  port: number;
  mode: string;
};

type PrefixedEnv = PrefixKeys<Env>;

const env: PrefixedEnv = {
  app_port: 3000,
  app_mode: "dev",
};

console.log(env.app_mode);
```

> Output: `dev`

## Filtering keys with `never`

A remapped key of `never` is omitted.

```ts
type RemoveKind<T> = {
  [K in keyof T as Exclude<K, "kind">]: T[K];
};

type Shape = { kind: "circle"; radius: number };
type ShapeData = RemoveKind<Shape>;

const shape: ShapeData = { radius: 10 };
console.log(shape.radius);
```

> Output: `10`

## When to use mapped types

Use them when:

- many types follow the same transformation rule
- you want consistency across multiple shapes
- hand-written duplicates would drift over time

Avoid them when a plain explicit interface would be clearer.

## Exercises

1. Implement your own `MyReadonly<T>` mapped type.
2. Create a mapped type that turns every property into `string | null`.
3. Build a key-remapping type that prefixes all keys with `db_`.
4. Remove one property from a type using key remapping with `never`.

## Solution hints

1. Use `[K in keyof T]` and prepend `readonly` to the property declaration.
2. Rebuild each property as `string | null`, even if the original type was different.
3. Use key remapping with a template literal type like `` `db_${string & K}` ``.
4. In the `as` clause, map the unwanted key to `never`.
