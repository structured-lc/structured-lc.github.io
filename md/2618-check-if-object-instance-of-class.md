### Leetcode 2618 (Medium): Check if Object Instance of Class [Practice](https://leetcode.com/problems/check-if-object-instance-of-class)

### Description  
Given an object and a class constructor (which could be undefined or null), determine if the object is an instance of that class or any superclass in its prototype chain.  
Do *not* use the built-in `instanceof` operator for this check.  
The function should work correctly for objects, primitives, `null`, and take into account edge cases where constructor is null or undefined.  
Essentially, you’re asked to implement the equivalent of JavaScript’s `instanceof` logic manually.

### Examples  

**Example 1:**  
Input: `obj = new Date()`, `classFunc = Date`  
Output: `True`  
*Explanation: The object is directly constructed from Date; its prototype chain includes Date.prototype.*

**Example 2:**  
Input: `obj = 5`, `classFunc = Number`  
Output: `True`  
*Explanation: Although 5 is a primitive, JavaScript treats it as an instance of Number when checked using instanceof. Its prototype chain, when boxed, points to Number.prototype.*

**Example 3:**  
Input: `obj = {}, classFunc = Array`  
Output: `False`  
*Explanation: {} is a plain object; its prototype chain does not contain Array.prototype.*

### Thought Process (as if you’re the interviewee)  
- The problem feels like testing if an object’s prototype chain contains the `.prototype` of the given class constructor.
- The brute-force solution is to repeatedly call `Object.getPrototypeOf(obj)` and compare the result to `classFunc.prototype` at every step.
- Edge Cases: If `classFunc` is null or undefined, it should immediately return False. If `obj` is null or undefined, its prototype chain is empty.
- **Why avoid `instanceof`?** It’s either forbidden or the interviewer wants to test understanding of prototype chains.
- *Primitives*: Even numbers or strings can be checked against their respective constructors since JavaScript internally boxes them (Number, String, etc.).
- Between approaches (object boxing, comparing constructors, comparing prototypes), the cleanest is to walk the prototype chain and check strictly for prototype equality. This works for subclasses as well because the prototype chain includes all ancestors.
- Time/space tradeoff: No deep recursion needed, just a simple loop up the prototype chain. Space is O(1).

### Corner cases to consider  
- `obj` is `null` or `undefined` → should return `False`
- `classFunc` is `null` or `undefined` → should return `False`
- `obj` is a primitive (number, string, boolean, symbol, bigint) but a classFunc that boxes that type (Number, String, etc.): should return `True` for correct pair, `False` otherwise
- `obj` and `classFunc` don’t match (e.g. `{}` and `Array`)
- `obj` and `classFunc` are the same function (edge: function considered instance of Function)
- Inheritance: subclass instances vs parent class functions

### Solution

```python
def check_if_instance_of(obj, classFunc):
    # If classFunc is None or undefined, return False immediately
    if classFunc is None:
        return False

    # When obj is None or undefined, JS prototype chain is done
    while obj is not None:
        # Get object's prototype using __proto__ or Object.getPrototypeOf equivalent in JS
        # For primitives in JS, they are *boxed* when accessed, so simulate via type(obj)
        # In Python, obj.__class__ is not the same as a JS prototype, so use type(obj) workaround.
        # But since this is a simulation for JS, we use obj.__class__ for illustration only.

        # Simulate the JS: Object.getPrototypeOf(obj)
        # For class-like objects in Python, next prototype is type(obj).
        try:
            # All Python objects have __class__, but to mimic JS more closely:
            proto = getattr(obj, "__proto__", None)
        except Exception:
            proto = None

        # For JS, this is: Object.getPrototypeOf(obj)
        # Here, we simplify: type(obj) is roughly similar to prototype
        # Compare prototype with classFunc.prototype (simulate as regular Python class)
        try:
            # Simulate classFunc.prototype: in JS, prototype itself, in Python not directly applicable
            # We'll mimic by comparing type(obj) to classFunc if possible. For illustration.
            if hasattr(classFunc, "prototype") and proto == classFunc.prototype:
                return True
            elif hasattr(obj, "__class__") and obj.__class__ == classFunc:
                return True
            elif type(obj) == classFunc:
                return True
        except Exception:
            pass

        # Move up the prototype chain
        try:
            obj = getattr(obj, "__proto__", None)
        except Exception:
            obj = None

    return False
```

**Note:** In JavaScript, this would look like:

```javascript
function checkIfInstanceOf(obj, classFunc) {
    if (classFunc == null) return false;
    while (obj != null) {
        if (Object.getPrototypeOf(obj) === classFunc.prototype) {
            return true;
        }
        obj = Object.getPrototypeOf(obj);
    }
    return false;
}
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(height of the prototype chain) – in practice, O(1) because the chains are very shallow in JS (rarely >3-4).
- **Space Complexity:** O(1) – no extra data structures, only a couple of variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle scenarios where the `classFunc` is not a function (e.g. passing a string)?  
  *Hint: Add type checking to ensure classFunc is callable or a constructor.*

- What if you want your function to handle custom inheritance scenarios, such as manually assigned prototypes?  
  *Hint: Consider prototype assignment via `Object.setPrototypeOf` or `Object.create`.*

- Can this logic be written as a *recursive* function instead of a loop?  
  *Hint: Recurse with Object.getPrototypeOf(obj) at each step.*

### Summary
This problem focuses on understanding **prototype chains** in JavaScript and how instance relationships are defined.  
The solution implements a classic **"prototype traversal"** pattern to manually check if an object derives from a certain prototype, similar to the built-in `instanceof` operator.  
This pattern is foundational in JS interviews and can be applied wherever type, class, or inheritance relationships need to be verified without native language shortcuts.


### Flashcard
Traverse the prototype chain of the object, checking if any prototype matches the given class’s prototype.

### Tags

### Similar Problems
