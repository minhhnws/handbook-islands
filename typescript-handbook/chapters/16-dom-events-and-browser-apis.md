# 16. DOM, Events, and Browser APIs

When working in the browser, TypeScript provides rich built-in types for DOM APIs.

## Selecting elements

```ts
const element = document.getElementById("name");
console.log(element?.id);
```

> Output: depends on the page

Because an element may not exist, many DOM lookups return `null`.

## Element assertions

```ts
const input = document.querySelector("#email") as HTMLInputElement | null;
console.log(input?.value);
```

> Output: depends on the page

Use assertions carefully.

## Safer narrowing with `instanceof`

```ts
const el = document.getElementById("submit");
if (el instanceof HTMLButtonElement) {
  console.log(el.disabled);
}
```

> Output: depends on the page

## Event typing

```ts
function handleClick(event: MouseEvent): void {
  console.log(event.clientX, event.clientY);
}
```

## Input events

```ts
function handleInput(event: Event): void {
  const target = event.target;
  if (target instanceof HTMLInputElement) {
    console.log(target.value);
  }
}
```

> Output: depends on user input

## Form handling rule

Treat DOM values as strings first. Parse them explicitly.

```ts
const ageText = "20";
const age = Number(ageText);
console.log(age + 1);
```

> Output: `21`

## Browser typing guidelines

1. Expect `null` from DOM queries.
2. Narrow elements before using specialized properties.
3. Treat user input as untrusted runtime data.
4. Convert strings to numbers, dates, or booleans explicitly.

## Exercises

1. Type a click handler that reads mouse coordinates.
2. Safely read the value of an input element after narrowing its type.
3. Write a small form example that parses a numeric input from text.
4. Explain why `document.getElementById(...)` often needs a null check.

## Solution hints

1. Start with `function handleClick(event: MouseEvent): void { ... }`.
2. Narrow with `instanceof HTMLInputElement` before reading `.value`.
3. Read a string, convert with `Number(...)`, then validate the result.
4. The DOM lookup can fail at runtime if the element is missing from the page.
