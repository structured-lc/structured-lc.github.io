### Leetcode 2071 (Hard): Maximum Number of Tasks You Can Assign [Practice](https://leetcode.com/problems/maximum-number-of-tasks-you-can-assign)

### Description  
You are given arrays **tasks** and **workers**. Each element in **tasks** represents the minimum strength required to do that task. Each element in **workers** represents a worker's current strength.  
You also have a fixed number of **pills**. Giving a worker a pill increases their strength by **strength** for one task (each worker can get at most one pill).  
Assign each task to one worker such that the worker's (possibly increased) strength is at least the task's requirement, and each worker is used at most once.  
Return the **maximum number of tasks** that can be completed.

### Examples  

**Example 1:**  
Input:  
tasks = `[3,2,1]`,  
workers = `[0,3,3]`,  
pills = `1`,  
strength = `1`  
Output: `3`  
*Explanation:  
- Give the pill to the weakest worker (`0`), increasing their strength to `1`. Assign them to task `1` (strength 1).
- Remaining workers (`3`, `3`) can directly do tasks `2` and `3`.
- All tasks assigned (maximum = 3).*

**Example 2:**  
Input:  
tasks = `[5,4]`,  
workers = `[0,0,0]`,  
pills = `3`,  
strength = `1`  
Output: `0`  
*Explanation:  
- After giving a pill, all workers have strength `1` (still cannot do any task). So, 0 tasks can be assigned.*

**Example 3:**  
Input:  
tasks = `[10,15,20]`,  
workers = `[10,13,17,20]`,  
pills = `2`,  
strength = `10`  
Output: `3`  
*Explanation:  
- Assign task 20 to worker 20 (no pill needed).
- Assign task 15 to worker 13 (give pill → 23, enough).
- Assign task 10 to worker 10 (no pill needed).
- All tasks assigned (maximum = 3).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Generate all possible assignments of workers to tasks, applying pills in different ways. This is exponential (factorial) and not feasible for large inputs.
- **Optimization:**  
  - Notice that for any fixed number of tasks \( k \), we can try to check if it's possible to assign \( k \) tasks with given workers, pills, and strength.
  - **Greedy:** Sort both **tasks** and **workers** (ascending). For a given \( k \), try to assign the \( k \) hardest tasks to the \( k \) strongest workers.
  - Workers should use pills only when strictly needed (i.e., assign easiest task needing a pill to the weakest worker who benefits most from the pill; save strong workers for strong tasks).
- **Binary search:**  
  - The answer lies between `0` and `min(len(tasks), len(workers))`.
  - For each `mid`, check: can we assign `mid` tasks with given number of pills and strength increase?
  - If possible, try higher; if not, try lower.
- **Why this works:**  
  - Monotonic property: if it's possible to assign `k` tasks, it's possible to assign fewer, but impossible to assign more than the result for the given limit.
  - This allows binary search for efficiency (overall O(n·log n)).

### Corner cases to consider  
- No pills or pill strength is 0.
- All workers weaker than tasks (cannot assign any).
- More pills than tasks/workers.
- Duplicate values in **tasks** or **workers**.
- Some **workers** can do all **tasks** unboosted.
- Fewer **tasks** than **workers**, or vice versa.
- **Empty arrays** or arrays of size 1.
- Largest pill strength not sufficient for hardest task.

### Solution

```python
def maxTaskAssign(tasks, workers, pills, strength):
    # Sort tasks and workers to maximize greedy assignment
    tasks.sort()
    workers.sort()

    def check(k):
        # Can we complete 'k' hardest tasks with 'k' strongest workers and pills?
        import collections
        from bisect import bisect_left

        # Take k hardest tasks, k strongest workers
        selected_tasks = tasks[:k]
        selected_workers = workers[-k:]

        # Use deque for available workers, to allow efficient popping from both ends
        workers_deque = collections.deque(selected_workers)
        pills_left = pills

        for task in reversed(selected_tasks):
            # If the strongest worker >= task requirement, assign directly
            if workers_deque and workers_deque[-1] >= task:
                workers_deque.pop()
            # Otherwise, use a pill on the weakest worker that can reach the task after boost
            elif pills_left > 0 and workers_deque and workers_deque[0] + strength >= task:
                workers_deque.popleft()
                pills_left -= 1
            else:
                # Can't assign this task
                return False
        return True

    # Binary search for max number of assignable tasks
    left, right, res = 0, min(len(tasks), len(workers)), 0
    while left <= right:
        mid = (left + right) // 2
        if check(mid):
            res = mid
            left = mid + 1
        else:
            right = mid - 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Sorting **tasks** and **workers**: O(n \* log n + m \* log m).
  - Binary search over k: O(log n), where n = min(#tasks, #workers).
  - For each binary search check, the check function iterates up to n (worst); using deque, popping is O(1).
  - Overall: **O((n + m) \* log(n + m) + n \* log n)**

- **Space Complexity:**  
  - O(n) for temporary arrays and deques when checking.
  - No recursion or additional complex structures.
  - So, **O(n + m)**.

### Potential follow-up questions (as if you’re the interviewer)  

- What if each worker could receive any number of pills, not just one?  
  *Hint: Dynamic programming or greedy with multiple boosts per worker.*

- What if the strength boosts differ for each worker or task?  
  *Hint: Model this as assignment with weights/costs, possibly min-cost matching algorithms.*

- How would you find not just the max number, but an actual valid assignment of workers to tasks?  
  *Hint: Track assignments in the check function, possibly using arrays for backtracking.*

### Summary
This problem uses the **Binary Search + Greedy** assignment pattern: binary search on the answer, and greedy task-worker pairing with minimal pill usage in each scenario. This pattern commonly appears in resource allocation, scheduling, and assignment problems (like Minimum Number of Days to Make m Bouquets, or Assign Cookies). Sorting plus two-pointer/deque management is often used for optimal pairing under constraints.