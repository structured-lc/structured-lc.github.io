### Leetcode 2723 (Easy): Add Two Promises [Practice](https://leetcode.com/problems/add-two-promises)

### Description  
Given two **Promise** objects, `promise1` and `promise2`, each resolving to a number, implement a function that returns a new Promise which resolves to the sum of the resolved values of both promises. The new promise resolves only after both `promise1` and `promise2` have resolved.

### Examples  

**Example 1:**  
Input: `promise1 = Promise resolves to 2`, `promise2 = Promise resolves to 5`  
Output: `7`  
*Explanation: Both promises resolve to 2 and 5. The returned promise resolves to 2 + 5 = 7.*

**Example 2:**  
Input: `promise1 = Promise resolves to 0`, `promise2 = Promise resolves to 0`  
Output: `0`  
*Explanation: Both promises resolve to 0. The sum is 0.*

**Example 3:**  
Input: `promise1 = Promise resolves to 13`, `promise2 = Promise resolves to 17`  
Output: `30`  
*Explanation: The two promises resolve to 13 and 17, so the final resolved value is 13 + 17 = 30.*

### Thought Process (as if you’re the interviewee)  
- At first glance, we want a function that takes two promises and returns a new promise that resolves only after both are finished.
- The naive way is to use `.then` for each, but we must wait until **both** are resolved to compute their sum.
- This classic pattern fits nicely with `Promise.all`, which takes an array of promises and returns a new promise that resolves when all inputs do, yielding their resolved values.
- When they both resolve, we sum their results and resolve that sum from our new promise.
- In terms of error handling: If either input promise rejects, `Promise.all` will reject immediately. This matches the problem expectation.
- Alternatively, with `async`/`await`, we can await them both and return their sum. This also wraps the result in a Promise due to the `async` keyword.

### Corner cases to consider  
- Both promises resolve at different times (the sum must be correct and never premature).
- One or both promises take a long time (function must truly await both).
- Either promise rejects (should reject as well).
- The input promises do not resolve to numbers (could cause unexpected sum; but per the problem promise, they always do).
- Both promises resolve to negative numbers or zero.

### Solution

```python
# Function to add the results of two input promises once both are resolved.
async def addTwoPromises(promise1, promise2):
    # Wait for promise1 to resolve and store the result
    value1 = await promise1
    # Wait for promise2 to resolve and store the result
    value2 = await promise2
    # Return the sum; because the function is async, returns a promise that resolves to the sum
    return value1 + value2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) not including the asynchronous wait time for the promises. The function does not perform any operations whose total time depends on the value of the input—just two awaits and a sum.
- **Space Complexity:** O(1); uses constant extra space to store the two numbers before summing.

### Potential follow-up questions (as if you’re the interviewer)  

- If one promise rejects, what should happen?  
  *Hint: What does `await` do on a rejected promise?*

- Can you generalize this to add an array of promises?  
  *Hint: How can you aggregate results from many promises?*

- What if the promises resolved to non-numeric types? How would you handle validation or errors?  
  *Hint: Type check before summing—what if you need to throw custom errors?*

### Summary
This problem illustrates the **Promise coordination** pattern, common in asynchronous programming: wait for multiple asynchronous results before combining them. The most idiomatic solution uses `async/await` or `Promise.all` to synchronize resolution, a crucial pattern for concurrent tasks in JavaScript. Similar approaches are broadly used when aggregating values from multiple asynchronous sources, such as fetching data in parallel or combining results from multiple APIs.