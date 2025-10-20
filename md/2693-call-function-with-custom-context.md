### Leetcode 2693 (Medium): Call Function with Custom Context [Practice](https://leetcode.com/problems/call-function-with-custom-context)

### Description  
Given a function, sometimes you want to invoke it with a specific context (the value of `this`) instead of its default object. This problem asks you to implement a method `callPolyfill` which, when attached to Function's prototype, behaves exactly like JavaScript's built-in `Function.call`.  
- The method should invoke the function with a provided context object as `this` and any number of arguments.
- You must not use the built-in `Function.call` or `Function.apply`.

Example use-case: Given an object `{value: 5}` and a function that logs `this.value`, if you call `func.callPolyfill(obj)`, the function should log `5`.

### Examples  

**Example 1:**  
Input:  
```js
function add(y) { return this.x + y; }
const obj = {x: 2};
add.callPolyfill(obj, 3);
```
Output: `5`  
*Explanation: `this` inside `add` points to `obj`, so it returns 2 + 3 = 5.*

**Example 2:**  
Input:  
```js
function greet(greeting, punctuation) {
  return greeting + ', ' + this.name + punctuation;
}
const person = {name: 'Alice'};
greet.callPolyfill(person, 'Hello', '!');
```
Output: `"Hello, Alice!"`  
*Explanation: `this.name` uses `person` as context; rest args are passed through.*

**Example 3:**  
Input:  
```js
function noArgs() { return this.a; }
const obj = {a: 42};
noArgs.callPolyfill(obj);
```
Output: `42`  
*Explanation: No arguments are passed, only a new context. Returns obj.a.*

### Thought Process (as if you’re the interviewee)  
First, understand that the built-in `Function.call` allows us to set `this` inside a function. Since using it is not allowed, we need to simulate this behavior.  
A function in JavaScript can be called as a property of any object, in which case `this` refers to that object. Therefore, we can temporarily attach the function to the provided context object, invoke it, then remove it.  
Steps:  
- Add the current function to the context object as a temporary property.
- Call that property function (so `this` will be set properly).
- Remove the property to restore the context object.

Alternative: We must be careful if the context is `null` or `undefined` (we should default to a global object), and handle primitive contexts as well (though in practice, that's rarely needed in interviews). Also, avoid property name collision by using a Symbol or a sufficiently unique string.

Chose this method because it's direct, safe, and does not rely on native polyfills.

### Corner cases to consider  
- Context is `null` or `undefined` (should default to global object in actual JS, but for the problem, assume an object is always passed).
- Context object already has a property with the temporary function name (use a Symbol to prevent collision).
- Function returns undefined.
- No extra arguments are given.
- Function throws an error (should not be swallowed by polyfill).
- Primitive context values (`42`, `'str'`, `true`)—not likely tested here but notable in real JS.
- Shared context objects used in parallel (might be a stretch for this problem).

### Solution

```python
# Since this is a JS-specific question, code shown in Pythonic pseudocode for the pattern.
# In JavaScript, we'd attach to Function.prototype.

def callPolyfill(func, context, *args):
    # In JS: Use a Symbol to avoid overwriting existing properties
    # We'll simulate with a unique property for Python illustration.

    # If context is None, use a global object
    if context is None:
        context = globals()
    unique_key = "__temp_func__"

    # Attach 'func' to context as a method
    context[unique_key] = func

    # Call the function with the provided arguments
    result = context[unique_key](*args)

    # Clean up by deleting temp property
    del context[unique_key]

    return result

# For JS, the actual implementation would be:
# Function.prototype.callPolyfill = function(context, ...args) {
#   const sym = Symbol();
#   context = context || globalThis;
#   context[sym] = this;
#   const result = context[sym](...args);
#   delete context[sym];
#   return result;
# };
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1),  
  Each operation (property assignment, function call, property deletion) is constant time, not dependent on input size.
- **Space Complexity:** O(1),  
  Marginal extra space used for one Symbol/temp property and argument unpacking, not dependent on arguments' size.

### Potential follow-up questions  

- What if `context` is a primitive value instead of an object?  
  *Hint: In JS, primitives are automatically boxed to their object equivalents.*

- How would you handle context being `null` or `undefined`?  
  *Hint: The default `this` in non-strict mode is the global object.*

- What if the context object already has a property with the name you select?  
  *Hint: Use a `Symbol` as the temporary property key to avoid collisions.*

### Summary
This approach leverages a common JS technique: temporarily attaching a method to an object to invoke it with the correct `this`, then cleaning up. This pattern is frequently used for polyfilling or implementing custom call/apply/bind behaviors and can be generalized to other programming languages that allow dynamic modification of objects (duck typing). It illustrates how JavaScript’s object model and `this` work, as well as safe property handling using Symbols/unique keys.


### Flashcard
Temporarily assign the function to context object as a unique property, call it with arguments, then delete the property and return result (simulates call without using built-in call/apply).

### Tags

### Similar Problems
