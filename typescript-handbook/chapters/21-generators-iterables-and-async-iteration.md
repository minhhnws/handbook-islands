# 21. Generators, Iterables, and Async Iteration

TypeScript supports generator functions, iterator protocols, and async iteration.

## Generator functions

A generator function uses `function*` and yields values over time.

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

## How a generator works step by step

1. `function*` declares a generator.
2. Calling it does not run the whole body immediately.
3. It returns an iterator object.
4. Each `yield` pauses execution and produces one value.
5. The next call resumes from the paused point.

## Manual iteration with `.next()`

```ts
const iterator = countUpTo(2);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

> Output:
>
> ```text
> { value: 1, done: false }
> { value: 2, done: false }
> { value: undefined, done: true }
> ```

## Iterable objects

Anything usable in `for...of` is iterable.

```ts
const values = ["a", "b", "c"];
for (const value of values) {
  console.log(value);
}
```

> Output:
>
> ```text
> a
> b
> c
> ```

## Generator type parameters

`Generator<Yield, Return, Next>` describes:

- yielded values
- final returned value
- value that can be passed back in with `next(...)`

For most beginner cases, `Generator<number, void, unknown>` is enough.

## Async generators

Async generators yield values over time asynchronously.

```ts
async function* streamValues(): AsyncGenerator<number, void, unknown> {
  yield 1;
  yield 2;
}

async function run() {
  for await (const value of streamValues()) {
    console.log(value);
  }
}

run();
```

> Output:
>
> ```text
> 1
> 2
> ```

## Step by step for async generators

1. Use `async function*`.
2. Yield values that become available asynchronously.
3. Consume them with `for await...of`.
4. Each iteration waits for the next produced value.

## When generators are useful

- lazy sequences
- custom iteration logic
- streaming data
- async event-like pipelines

## When plain arrays are better

Use arrays when:

- the whole collection is already available
- you want simple and obvious code
- laziness is unnecessary

## Exercises

1. Write a generator that yields the first five even numbers.
2. Call `.next()` manually on a generator and explain each result.
3. Write an async generator that yields three strings.
4. Compare `for...of` and `for await...of` in one paragraph.

## Solution hints

1. Use `function*` and `yield`; a simple `for` loop is enough.
2. The result shape is `{ value, done }`; the final call has `done: true`.
3. Start with `async function*` and yield literal strings like `"a"`, `"b"`, `"c"`.
4. `for...of` works with synchronous iterables; `for await...of` waits for asynchronous iteration.
