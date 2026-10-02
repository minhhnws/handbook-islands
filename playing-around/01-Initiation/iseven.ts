/**
 * Check if the given number is even or not. Your function should return true if the number is even, and false if the number is odd.

Input: A number.

Output: Logic value (boolean).

Examples:
isEven(2) == true
isEven(3) == false
 */

import assert from "assert";

function isEven(num: number): boolean {
    if (num === 0 || (num & 1) === 0) {
        return true;
    };
    return false;
}

// function isEven(num: number): boolean {
//     return !(num % 2)
// }

// var isEven = x =>  x & 1 ^ 1;

console.log("Example:");
console.log(isEven(2));

// These "asserts" are used for self-checking
assert.strictEqual(isEven(2), true);
assert.strictEqual(isEven(5), false);
assert.strictEqual(isEven(0), true);

console.log("Coding complete? Click 'Check Solution' to earn rewards!");
