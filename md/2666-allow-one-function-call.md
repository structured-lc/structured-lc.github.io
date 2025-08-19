### Leetcode 2666 (Easy): Allow One Function Call [Practice](https://leetcode.com/problems/allow-one-function-call)

### Description  
Given a function `fn`, return a new function that allows `fn` to be called **only once**.  
- On the *first* call, invoke `fn` with provided arguments and return its result.  
- On subsequent calls, return `None` (Python's `None`) and *do not* invoke `fn` again.  
This is useful for scenarios like one-time initialization, singleton instantiation, or preventing accidental double submissions.  
Think of the returned function as a “once-only” wrapper around the original.

### Examples  

**Example 1:**  
Input: `fn = lambda x: x + 3; callCount = 0; once_fn = allow_one_function_call(fn)`  
`once_fn(4)`  
Output: `7`  
*Explanation: First call runs fn(4) = 7. Call count is incremented.*

`once_fn(5)`  
Output: `None`  
*Explanation: Function is not called again, so result is None.*

**Example 2:**  
Input: `fn = lambda a, b: a * b; callCount = 0; once_fn = allow_one_function_call(fn)`  
`once_fn(2, 6)`  
Output: `12`  
*Explanation: Calls original function with arguments, returns 12.*

`once_fn(1, 9)`  
Output: `None`  
*Explanation: Ignored; fn not called after the first time.*

**Example 3:**  
Input: `fn = lambda: "start"; once_fn = allow_one_function_call(fn)`  
`once_fn()`  
Output: `"start"`  
*Explanation: Invokes function with no arguments.*

`once_fn()`  
Output: `None`  
*Explanation: Does not run again, returns None.*

### Thought Process (as if you’re the interviewee)  
- My first idea is to use a **flag** that tracks whether the function has already been called.
- I’ll wrap the function `fn` inside another function, and have the “outer” function keep state.
- Closures in Python can *capture variables* from the enclosing scope, which is perfect here.
- On the first call, I'll run `fn()` (with args), set the flag, and return the result.  
- On subsequent calls, check the flag and return None without calling.
- This "once" pattern is common for enforcing side effects only once, e.g., initialization.

### Corner cases to consider  
- The original function returns None (should be distinguishable from “not called again” semantics).
- Function is never called (should not error).
- Function with 0 arguments (should still work).
- Function with arbitrary arguments (`*args`, `**kwargs`)—must support them.
- Thread safety (out of scope unless specified).

### Solution

```python
def allow_one_function_call(fn):
    """
    Returns a function that calls fn once.
    Subsequent calls return None.
    """
    called = False

    def wrapper(*args, **kwargs):
        nonlocal called
        if not called:
            called = True       # Mark as called
            return fn(*args, **kwargs)
        # Already called: return None
        return None

    return wrapper
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) per call. Only a constant-time check and possibly a single function invocation.
- **Space Complexity:** O(1) for the closure variable (`called` flag). No data grows with input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle thread safety if this function could be called from multiple threads?
  *Hint: Consider using locks or thread-safe primitives to check/set the `called` flag.*

- Can you generalize the solution to allow up to N calls instead of just once?
  *Hint: Replace the boolean flag with a counter; decrement or increment it on every call.*

- How would you test that the function is really only being called once?
  *Hint: Use a side-effect in an external variable or mock to assert call count before and after.*

### Summary
This problem uses the **closure** pattern to encapsulate state across function calls, implementing a classic “once”/singleton invocation decorator.  
The solution is related to patterns like memoization, singleton, and idempotent wrappers, and generalizes well (with small changes) to “allow up to N calls,” debounce, or throttle. It is broadly applicable for managing side-effectful actions in APIs and event handling.

### Tags

### Similar Problems
