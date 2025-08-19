### Leetcode 2721 (Medium): Execute Asynchronous Functions in Parallel [Practice](https://leetcode.com/problems/execute-asynchronous-functions-in-parallel)

### Description  
Given an array of asynchronous functions, each accepting no arguments and returning a promise, implement behavior equivalent to `Promise.all`. Execute all functions in parallel and return a new promise that:
- **Resolves** with an array of resolved values (same order as the functions array) if all succeed.
- **Rejects** with the error from the **first** rejected promise, stopping further processing.

You cannot use `Promise.all` or similar built-ins.

### Examples  

**Example 1:**  
Input: `functions = [fn1, fn2, fn3] // fn1 resolves with "a" after 50ms, fn2 "b" after 100ms, fn3 "c" after 70ms`  
Output: `["a", "b", "c"]`  
*Explanation: All functions start together. Each resolves at its own timing, but final output preserves input order.*

**Example 2:**  
Input: `functions = [fn1, fn2, fn3] // fn1 resolves with 1, fn2 rejects with "error", fn3 resolves with 3`  
Output: `Promise rejected with "error"`  
*Explanation: As soon as any function rejects, the returned promise rejects, even if other promises might eventually resolve.*

**Example 3:**  
Input: `functions = []`  
Output: `[]`  
*Explanation: No functions to run; resolve immediately with an empty array.*

### Thought Process (as if you’re the interviewee)  
The brute-force way is to call all functions, store their returned promises, and use `Promise.all` to gather the results.  
But since we **cannot** use built-ins, we have to manage the results and error handling manually:

- Start all functions immediately and collect the promises.
- Use an array to store each resolved value according to function index.
- Track how many promises resolved successfully.
- On any rejection, immediately reject the overall promise.
- When all are resolved, resolve with the results.

Key optimization: We must preserve the original function order in the result array, regardless of the order in which promises resolve.

### Corner cases to consider  
- Input array empty: should resolve with `[]` immediately.
- Any promise rejects: overall promise must reject immediately.
- Multiple functions resolve at different speeds: must keep order.
- Functions returning *already-resolved* or *already-rejected* promises.
- Functions not returning valid promises (undefined or invalid).

### Solution

```python
from typing import List, Callable, Any

def promise_all(functions: List[Callable[[], "Promise"]]):
    """
    Replicates Promise.all for an array of no-argument async functions.
    """
    def wrapper(resolve, reject):
        n = len(functions)
        results = [None] * n
        resolved_count = 0

        if n == 0:
            resolve([])
            return

        def on_resolve(i, value):
            nonlocal resolved_count
            results[i] = value
            resolved_count += 1
            if resolved_count == n:
                resolve(results)

        for idx, fn in enumerate(functions):
            try:
                promise = fn()
                promise.then(lambda val, i=idx: on_resolve(i, val)) \
                       .catch(lambda err: reject(err))
            except Exception as e:
                reject(e)

    # In Python, we can use a generic promise-style class for demonstration,
    # but actual interview would be JS-like. This is structure only!
    return Promise(wrapper)  # Assume a Promise class exists
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) to kick off n functions in parallel. Overall completion time equals the slowest function's completion time.
- **Space Complexity:** O(n) for storing the results array and tracking counters for n functions.

### Potential follow-up questions (as if you’re the interviewer)  

- What if one of the functions throws synchronously before returning a promise?  
  *Hint: Should handle exceptions thrown before the promise is created.*

- How to timeout the whole operation if not all functions resolve in X ms?  
  *Hint: Wrap the main promise with a race to a timeout promise.*

- How does this differ from running functions *sequentially* instead of in parallel?  
  *Hint: Running in series would require each function to start after the previous resolves; very different implementation.*

### Summary
This problem illustrates a **parallel asynchronous execution pattern** commonly encountered in JS interviews. Instead of using `Promise.all`, we manually synchronize multiple parallel async tasks:
- **Key pattern:** Tracking completion count and order mapping, plus early rejection.
- Useful for implementing concurrency primitives, network batching, or custom resource managers.  
Understanding this helps sharpen async handling, error propagation, and index management in real-world async workflows.

### Tags

### Similar Problems
