### Leetcode 2636 (Medium): Promise Pool [Practice](https://leetcode.com/problems/promise-pool)

### Description  
Design a function `promisePool` that receives an array of async functions (`functions`) and an integer `n` representing the maximum number of concurrent executions (the “pool limit”).  
At any time, no more than `n` functions should be executing. As soon as one finishes, a new one (if available) should start.  
The function should return a promise that resolves when all functions have finished.  
All async functions are guaranteed **not to reject**.

### Examples  

**Example 1:**  
Input:  
functions = [  
  () => new Promise(res => setTimeout(res, 300)),  
  () => new Promise(res => setTimeout(res, 400)),  
  () => new Promise(res => setTimeout(res, 200))  
]  
n = 2  
Output:  
No specific value returned (problem only requires all to finish; timing for each: 300ᵐˢ, 400ᵐˢ, 500ᵐˢ).  
*Explanation: At t=0, two tasks start (taking 300ms & 400ms). When the first (300ms) finishes, the 3rd starts (200ms); it finishes at t=500ms. Everything is done by t=500ms.*

**Example 2:**  
Input:  
functions = []  
n = 3  
Output:  
Promise immediately resolves.  
*Explanation: No functions to run. Resolves instantly.*

**Example 3:**  
Input:  
functions = [() => new Promise(res => setTimeout(res, 1000))]  
n = 1  
Output:  
Resolves after 1 second.  
*Explanation: Only one function and one slot. Runs and finishes at t=1000ms.*

### Thought Process (as if you’re the interviewee)  
- The brute force/naive approach could run each function one after the other (sequentially), but the point is to utilize concurrency up to `n`.
- Ideal: At all times, up to `n` concurrent executions. When any finishes, start another, until all are scheduled.
- The main challenge is managing concurrency and using async/await properly.
- One way is to have a recursive worker function that pulls from the queue of functions and starts new work as soon as a worker is available.
- We must “schedule” up to `n` workers at once, and when a worker finishes, trigger the next pending function if there is any left.
- All promises returned by the async functions should be awaited, and resolve when all have finished.
- No error handling is needed (no rejections).
- Preferable to solve it without any external JS helpers (like Promise.allSettled).

### Corner cases to consider  
- functions is empty: should resolve immediately.
- n > functions.length: don’t exceed available functions.
- Each function may take different times to finish.
- n = 1: should run strictly in serial.
- All functions async but instantaneous: no overlap, quick finish.

### Solution

```python
from typing import List, Callable
import asyncio

async def promisePool(functions: List[Callable[[], 'Awaitable']], n: int) -> None:
    # Index of next function to start
    idx = 0
    # Total number of functions
    total = len(functions)
    
    # Define the worker function
    async def worker():
        nonlocal idx
        while idx < total:
            cur_idx = idx
            idx += 1
            # Await the function at the current index
            await functions[cur_idx]()
    
    # Launch up to n workers (or less if not that many functions)
    await asyncio.gather(*(worker() for _ in range(min(n, total))))
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(T), where T is the time taken by the slowest possible schedule (not number of functions), since all functions must complete and up to n can run in parallel. Actual runtime ≈ total wall-clock time ≈ sum of the longest `ceil(len(functions)/n)` tasks.
- **Space Complexity:**  
  O(n), for at most n concurrent stack frames (from awaited coroutines), plus input storage (O(len(functions)) for references).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle and propagate errors if one of the functions could reject?  
  *Hint: Think about error handling strategies for promises and which ones to propagate/retry.*

- How could you return the results of each function (not just when all are complete)?  
  *Hint: Consider returning/gathering a list of outputs, mapping to original order.*

- How would you throttle or add delays between function executions (not just concurrency limit)?  
  *Hint: Think about a scheduler with added delay logic, timers, or batched waves.*

### Summary
This problem is a classic example of the “async concurrency/pool worker” pattern.  
The main technique is using parallel workers to maximize throughput under a concurrency constraint, and is applicable to rate-limited APIs, batch jobs, task schedulers, and more.  
It's well-suited for scenarios where you want maximum parallelism without exceeding a resource or API quota.  
Patterns used: semaphore/workers, async scheduling, dynamic task assignment.