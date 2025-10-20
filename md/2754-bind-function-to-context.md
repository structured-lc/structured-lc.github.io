### Leetcode 2754 (Medium): Bind Function to Context [Practice](https://leetcode.com/problems/bind-function-to-context)

### Description  
Implement a custom method, `bindPolyfill`, for all JavaScript functions that enables you to "bind" a function to a specific `this` context object. When you call `bindPolyfill` on a function with an object as its argument, it returns a new function that, when called, will set `this` inside the function to the object provided—even if used outside the object itself. You should not use the built-in `Function.prototype.bind`.

### Examples  

**Example 1:**  
Input:  
```js
function greet() { return "Hello " + this.name; }
const obj = { name: "Alice" };
const boundGreet = greet.bindPolyfill(obj);
boundGreet();
```
Output:  
`"Hello Alice"`
*Explanation: bindPolyfill sets the context of greet to obj, so this.name is "Alice".*

**Example 2:**  
Input:  
```js
function add(a, b) { return this.base + a + b; }
const obj = { base: 10 };
const boundAdd = add.bindPolyfill(obj);
boundAdd(3, 7);
```
Output:  
`20`
*Explanation: Executes add in the context of obj, so this.base + 3 + 7 = 10 + 3 + 7 = 20.*

**Example 3:**  
Input:  
```js
function showContext() { return "Context: " + (this ? this.ctx : "undefined"); }
const plain = showContext();
const bound = showContext.bindPolyfill({ ctx: "bound!" })();
```
Output:  
plain=`"Context: undefined"`,  
bound=`"Context: bound!"`
*Explanation: Without binding, this is undefined. With bindPolyfill and an object, this is set to that object.*

### Thought Process (as if you’re the interviewee)  
The problem is essentially to mimic JavaScript's native `bind` method.  
- The brute-force idea is to define a method (`bindPolyfill`) that takes a context object and returns a new function.
- When the returned function is called, it should invoke the original function but with `this` forced to the provided context.
- One can leverage JavaScript's `.apply()` method to set `this` explicitly.
- Need to ensure arguments are preserved and passed through correctly.
- Arrow functions won't work for the main logic, because their `this` is lexically scoped—so we should use a normal function for the returned closure.

Final approach:
- Define `bindPolyfill` on `Function.prototype` to make it available on all functions.
- Return a new function that uses `.apply()` to invoke the original function with the chosen `this`.
- Do not use `Function.prototype.bind`.

### Corner cases to consider  
- Function takes no arguments.
- Function takes arguments: ensure they're forwarded correctly.
- Function expects no `this` (e.g., arrow functions): should still work.
- Context object is `null` or `undefined`: what should `this` be? (Mimic JavaScript: fallback to global object or `undefined` in strict mode.)
- Multiple bindings: `f.bindPolyfill(obj1).bindPolyfill(obj2)` (should ignore second binding, as native does).
- Using with constructors (not usually supported with manual bind implementations).

### Solution

```python
# Since this is a JavaScript prototype augmentation, here's the equivalent code with explanation!

# Add bindPolyfill to Function.prototype
Function.prototype.bindPolyfill = function (context) {
    // Save the original function reference
    const fn = this;
    // Return a function that always calls fn with context as 'this'
    return function (...args) {
        // Use 'apply' to set 'this' and forward arguments
        return fn.apply(context, args);
    };
};

# Example usage:
# function greet() { return "Hello " + this.name; }
# const obj = { name: "Alice" };
# const boundGreet = greet.bindPolyfill(obj);
# boundGreet(); // "Hello Alice"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) to create the bound function (just a function wrapper). Each invocation also just calls `.apply`, so O(m) where m = number of arguments.
- **Space Complexity:** O(1) for the wrapper per bind call. No extra copy of args; just a function closure capturing `fn` and `context`.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the situation where someone tries to bind the same function multiple times?
  *Hint: What does the native `Function.bind` do in this case? Should the last bind override or should the original be preserved?*

- How would you imitate the native bind behavior with regard to using the function as a constructor?
  *Hint: What happens when bound functions are called with `new`? Can you make your polyfill work similarly?*

- Can you support partial application—pre-filling some arguments, just like the native bind allows?
  *Hint: Pass initial arguments to `bindPolyfill` and forward them together with call-time arguments.*

### Summary
This problem tests knowledge of function context binding—a common pattern in JavaScript for ensuring a function executes with a specific `this`. The core is creating a closure and using `apply` to forward both the context and the arguments. This pattern occurs frequently in callback management, event handling, and object-oriented JS code. The approach is concise, idiomatic, and demonstrates understanding of advanced JavaScript features without relying on built-in short-cuts.


### Flashcard
Return a function that uses apply() or call() to invoke the original function with the provided context as this.

### Tags

### Similar Problems
