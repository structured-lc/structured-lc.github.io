### Leetcode 2795 (Medium): Parallel Execution of Promises for Individual Results Retrieval [Practice](https://leetcode.com/problems/parallel-execution-of-promises-for-individual-results-retrieval)

### Description  
Given an array of functions, where each function returns a promise when called, implement a `promiseAllSettled(functions)` function (without using `Promise.allSettled`). `promiseAllSettled` should execute all provided functions in parallel. Return a promise that resolves with an array of results (same order as input):  
- If a promise is fulfilled, its result is `{status: 'fulfilled', value: result}`  
- If a promise is rejected, its result is `{status: 'rejected', reason: error}`  
All results should be reported, regardless of individual rejections.

### Examples  

**Example 1:**  
Input:  
``[() => Promise.resolve(5), () => Promise.reject('err'), () => Promise.resolve(42)]``  
Output:  
``[{"status":"fulfilled","value":5}, {"status":"rejected","reason":"err"}, {"status":"fulfilled","value":42}]``  
*Explanation: The first and last functions resolve, so we record their values as fulfilled; the second rejects, so we record its reason as rejected. All results are retained in input order.*

**Example 2:**  
Input:  
``[() => Promise.reject('foo')]``  
Output:  
``[{"status":"rejected","reason":"foo"}]``  
*Explanation: The single promise is rejected, so we get a single result (status: 'rejected', reason: 'foo').*

**Example 3:**  
Input:  
``[]``  
Output:  
``[]``  
*Explanation: With no input functions, the resulting array is also empty.*

### Thought Process (as if you’re the interviewee)  
First, I need to run all functions in parallel and keep their results in the same order as input, regardless of whether each resolves or rejects. The naive approach is to call each function, attach `.then`/`.catch` to convert their result to the correct object, and then collect all results.  
- **Brute force:** Use a counter to track how many finished, pushing results as each settles, and resolve when all are done. This works but needs careful race handling.  
- **Optimized approach:**  
   - For each function, immediately call it to get its promise.
   - Attach `.then` and `.catch` to each, converting resolve/reject into `{status, value|reason}` object.
   - Store results at the correct index.
   - Use a counter (or check array length) to resolve the final promise only when all are done.  
I choose this because it is as parallel as possible, avoids any race or await issues, and makes sure order is kept.

### Corner cases to consider  
- Empty input array.
- All functions resolve.
- All functions reject.
- Mixed results (some resolve, some reject).
- Promises resolve/reject out-of-order (should not affect the result order).
- Functions that throw synchronously before returning a promise.

### Solution

```python
# Python doesn't have native Promises like JS, but for illustration, assume async functions.
# In JS, implementation would use new Promise, .then, .catch, .finally, etc.
# This is the conceptual JS solution rewritten for clarity.

def promiseAllSettled(functions):
    # Results array, initialized to correct length
    results = [None] * len(functions)
    # Counter for how many have settled
    settled = 0
    # We need a function to resolve the outer "promise" when all are done
    def resolve_fn(final_results):
        # Placeholder for example; in JS, this would be resolve()
        return final_results

    # Function to simulate the outer promise
    def outer_promise():
        nonlocal settled
        for idx, fn in enumerate(functions):
            try:
                promise = fn()
            except Exception as e:
                # If fn throws synchronously, count as a rejection
                results[idx] = {"status": "rejected", "reason": e}
                settled += 1
                if settled == len(functions):
                    return resolve_fn(results)
                continue

            def on_fulfilled(value, idx=idx):
                results[idx] = {"status": "fulfilled", "value": value}
                nonlocal settled
                settled += 1
                if settled == len(functions):
                    return resolve_fn(results)

            def on_rejected(reason, idx=idx):
                results[idx] = {"status": "rejected", "reason": reason}
                nonlocal settled
                settled += 1
                if settled == len(functions):
                    return resolve_fn(results)

            # Attach handlers (pseudo-code for .then/.catch)
            promise.then(lambda val, idx=idx: on_fulfilled(val, idx))\
                   .catch(lambda err, idx=idx: on_rejected(err, idx))

    # Call the simulated outer promise
    return outer_promise()

# In actual JavaScript, the implementation is:
# function promiseAllSettled(functions) {
#   return new Promise(resolve => {
#     const results = Array(functions.length)
#     let settled = 0
#     functions.forEach((fn, idx) => {
#       try {
#         fn().then(
#           v => { results[idx] = {status: 'fulfilled', value: v}; if (++settled === functions.length) resolve(results) },
#           e => { results[idx] = {status: 'rejected', reason: e}; if (++settled === functions.length) resolve(results) }
#         )
#       } catch (e) {
#         results[idx] = {status: 'rejected', reason: e}
#         if (++settled === functions.length) resolve(results)
#       }
#     })
#   })
# }
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since each function is called once and each promise handled individually. Each `.then`/`.catch` is O(1) per promise; all are run in parallel.
- **Space Complexity:** O(n), as we need to store a result for each input function.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you implement a variant that short-circuits and rejects if any promise rejects?
  *Hint: Think about Promise.all vs Promise.allSettled.*

- How to implement a cancellation token, so that if one promise takes too long, you abort all others?
  *Hint: Look up Promise.race and signal patterns.*

- What if functions can throw synchronously—will your solution handle that?
  *Hint: Remember to try/catch when invoking each function.*

### Summary
This problem is a classic parallel asynchronous control pattern, closely related to how `Promise.allSettled` is implemented in JavaScript. The core idea is to start all operations in parallel and use `.then`/`.catch` to collect ordered results, regardless of fulfillment or rejection. Commonly used in asynchronous batch APIs, microservice calls, and test runners. The pattern also appears (with variations) in concurrency primitives and task orchestration frameworks.