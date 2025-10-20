### Leetcode 2632 (Medium): Curry [Practice](https://leetcode.com/problems/curry)

### Description  
Given a function that takes multiple arguments, *implement a "curried" version of it*:  
A curried function lets you break down the argument list, calling it multiple times with some or all arguments each time.  
- When the curried function is called with enough arguments, it evaluates the original function.  
- Otherwise, it returns a new function expecting more arguments, until all parameters are provided.  
- Arguments can be passed in any grouping: all at once, or a few at a time, or even none at a call—just as long as, after all calls, argument count matches the original function's.  

### Examples  

**Example 1:**  
Input: `fn = lambda a, b: a + b`, inputs = `[[1],[2]]`  
Output: `3`  
*Explanation: curriedFn(1)(2) calls fn(1,2) → 3*

**Example 2:**  
Input: `fn = lambda a, b, c: a + b + c`, inputs = `[[1,2],[3]]`  
Output: `6`  
*Explanation: curriedFn(1, 2)(3) calls fn(1,2,3) → 6*

**Example 3:**  
Input: `fn = lambda a, b, c: a + b + c`, inputs = `[[],[],[1,2,3]]`  
Output: `6`  
*Explanation: curriedFn()()([1,2,3]) calls fn(1,2,3) → 6*


### Thought Process (as if you’re the interviewee)  
- The core idea is to accumulate function arguments until their count matches the original function's parameter count.  
- Each call to the curried function may supply any number of arguments (even zero).  
- If after appending new arguments, we still need more, return a function that will keep accumulating.  
- Once we have enough, call the original function with the full argument list and return the result.
- We need to **maintain state** of previously passed arguments.  
- Python makes this harder than JS (no .length for *args), but we can use closure to store each "accumulated args" array.

**Key challenge:** Detecting when enough parameters have been supplied.

### Corner cases to consider  
- Zero-argument functions (should evaluate immediately, even if called as curriedFn())  
- Calls with 0 arguments: curriedFn()()  
- Arguments supplied all at once, or one at a time  
- More arguments than needed: ignore extras beyond the required count  
- Functions with default parameters (assume not required here unless specified)


### Solution

```python
def curry(fn):
    # arg_len: expected number of arguments
    arg_len = fn.__code__.co_argcount

    def curried(*args_so_far):
        # If enough args, call the function
        if len(args_so_far) >= arg_len:
            # Call with only the first arg_len arguments, in case of extra
            return fn(*args_so_far[:arg_len])
        # Otherwise, return a function that accepts more arguments
        return lambda *next_args: curried(*(args_so_far + next_args))
    return curried
```

### Time and Space complexity Analysis  

- **Time Complexity:** Each call does O(1) work except the final call, which calls the target function, so total time is O(1) plus the original function's time.
- **Space Complexity:** O(n) where n is the total number of arguments because each unfulfilled call in the curry chain creates a stack frame holding accumulated arguments.

### Potential follow-up questions (as if you’re the interviewer)

- How would you handle functions that accept optional (default) parameters?  
  *Hint: Check how many required arguments the function actually needs, not total.*

- How could this be extended to support keyword arguments?  
  *Hint: Accept \*\*kwargs at each layer of currying and merge along the chain.*

- What happens if an argument is supplied after the full set was already provided?  
  *Hint: Should extra arguments be ignored, cause error, or be passed along?*


### Summary
This is a classic **closure and partial application** (currying) functional programming pattern.  
It shows up anywhere you want to delay evaluation, enable dependency injection, or create partially applied utility methods.  
Closures, recursion, and argument accumulation are the central strategies applied here.


### Flashcard
Curry a function by accumulating arguments until the full set is collected, then applying the original function.

### Tags

### Similar Problems
- Memoize(memoize) (Medium)
- Memoize II(memoize-ii) (Hard)