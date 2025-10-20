### Leetcode 2776 (Medium): Convert Callback Based Function to Promise Based Function [Practice](https://leetcode.com/problems/convert-callback-based-function-to-promise-based-function)

### Description  
Given a conventional **callback-based function** (i.e., a function where the first argument is a callback accepting either a result or an error), write a higher-order function that *wraps* it and returns a **promise-based version**.  
- In the original function:  
  - The callback is the first parameter (`callback, ...args`).  
  - The callback is called as `callback(result)` for success, or `callback(undefined, error)` for failure.
- The returned function should accept the same parameters (minus the callback), and return a Promise which:
  - **resolves** with the result if successful
  - **rejects** with the error if failed

This transformation allows you to use old callback APIs with modern async/await or `.then().catch()`.

### Examples  

**Example 1:**  
Input:  
A callback-style `sum` function:
```javascript
function sum(callback, a, b) {
    if (a < 0 || b < 0) {
        callback(undefined, Error('a and b must be positive'));
    } else {
        callback(a + b);
    }
}
const promisedSum = promisify(sum);
```
`promisedSum(2, 3).then(console.log)`  
Output:  
`5`  
Explanation. The numbers are positive, so the promise resolves with 5.

**Example 2:**  
Input:  
`promisedSum(-1, 5).catch(err => console.log(err.message))`  
Output:  
`a and b must be positive`  
Explanation. Since one input is negative, it calls callback with an error, so the promise rejects and error is caught.

**Example 3:**  
Input:  
Suppose a callback-style `fetchUser` function:
```javascript
function fetchUser(callback, id) {
    if (id === 0) callback({ username: "admin" });
    else callback(undefined, Error('User not found'));
}
const promisedFetchUser = promisify(fetchUser);
```
Call: `promisedFetchUser(0).then(user => console.log(user.username))`  
Output:  
`admin`  
Explanation. The user is found when id = 0, so the promise resolves with the user object.

### Thought Process (as if you’re the interviewee)  

First, I need to understand how callback APIs signal success and error. Here, *success* is `callback(result)` (error param is undefined), and *failure* is `callback(undefined, error)` (error is set).  
My job is to wrap such a function, so it instead returns a promise, by handling the callback inside the promise executor:

- The wrapper function should **return a new function** taking the same arguments as the original (except for the callback), and returning a Promise.
- In that Promise's executor, call the original function, pass a new callback:  
  - If error is present, call `reject(error)`.
  - Otherwise, call `resolve(result)`.

There is no need for complex data structures—just need to handle closure, rest/spread args, and proper error/result mapping to Promise API.

The only tricky bit: *Argument order*. The wrapper should pass the arguments after the callback to the original function.

### Corner cases to consider  
- The callback might be called synchronously or asynchronously.
- The callback might never be called (functions that never trigger the callback).
- Error can be any value (object, string).
- Callback may get called with both `undefined, error` or just `error` (be clear on callback signature).
- Input with no arguments.
- Underlying function may throw synchronously (should catch and reject).

### Solution

```python
# Promisify: convert callback-based function to a promise-based function
def promisify(fn):
    # Returns a function that accepts all the same args except callback
    def promised_fn(*args):
        import asyncio

        async def _promise():
            loop = asyncio.get_event_loop()
            future = loop.create_future()

            def callback(result=None, error=None):
                # If error, reject the future
                if error is not None:
                    future.set_exception(error)
                else:
                    future.set_result(result)
            try:
                # Call original function: callback goes first, then args
                fn(callback, *args)
            except Exception as exc:
                future.set_exception(exc)
            return await future
        return _promise()
    return promised_fn

# Usage:
# async def test():
#     async_sum = promisify(sum_callback_style)
#     try:
#         res = await async_sum(3, 5)
#         print(res)
#     except Exception as e:
#         print(e)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) - The wrapper adds constant time overhead; core work depends solely on the original function's runtime.
- **Space Complexity:** O(1) - Only minimal extra space for the closure and future; does not scale with input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle functions where the callback is in a different position than first?  
  *Hint: Accept a parameter to indicate the callback index and adjust argument splitting accordingly.*

- Can you promisify functions that return multiple results in the callback?  
  *Hint: Support resolving with a tuple/list or a dictionary of results depending on params.*

- How would you handle promisifying Node.js-style callbacks (e.g., callback(error, result))?  
  *Hint: Detect if the first param is error, second is data, and map to promise reject/resolve appropriately.*

### Summary
This approach applies the **promisify** pattern—a common technique in converting callback-based code to promises, which drastically improves code readability and allows use of async/await. The pattern is widely reused in JavaScript (Node.js), and is key for legacy-to-modern async API transitions, and for writing clean, composable async code.


### Flashcard
Return a new function that wraps the callback-based API and returns a Promise, resolving on callback(result) and rejecting on callback(undefined, error).

### Tags

### Similar Problems
