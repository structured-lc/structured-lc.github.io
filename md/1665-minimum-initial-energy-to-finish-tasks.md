### Leetcode 1665 (Hard): Minimum Initial Energy to Finish Tasks [Practice](https://leetcode.com/problems/minimum-initial-energy-to-finish-tasks)

### Description  
You have n tasks. Each task[i] = [actualᵢ, minimumᵢ] means it takes `actualᵢ` energy to complete, and you must have at least `minimumᵢ` energy before starting the task. Find the minimum initial energy required to finish all tasks in any order.

### Examples  

**Example 1:**  
Input: `tasks = [[1,2],[2,4],[4,8]]`  
Output: `8`  
*Explanation: Start with 8 energy:
- Do [4,8]: 8 → 4;
- Do [2,4]: 4 → 2;
- Do [1,2]: 2 → 1.*

**Example 2:**  
Input: `tasks = [[1,3],[2,4],[10,11],[10,12],[8,9]]`  
Output: `32`  
*Explanation: Order the tasks as [10,12], [10,11], [8,9], [2,4], [1,3], initial energy 32 suffices.*

**Example 3:**  
Input: `tasks = [[1,7],[2,8],[3,8]]`  
Output: `8`  
*Explanation: Start with 8, order doesn't matter, sufficient.*

### Thought Process (as if you’re the interviewee)  
If you perform a task, your energy drops by `actual` but must be at least `minimum` at the start of the task.
- The main idea is that **tasks with a high gap between minimum and actual should be done earlier**, since if done later, you'd have to reserve more energy.
- Sort tasks in descending order by `minimum - actual`.
- Then, try tasks in that order, simulating the energy.
- Use greedy: find minimal initial energy so at each step, remaining energy ≥ `minimum` required for the next task.

### Corner cases to consider  
- All minimums are equal to actual (trivial case)
- Only one task
- Tasks where `minimum` is much higher than `actual`
- Tasks are already sorted optimally

### Solution

```python
def minimumEffort(tasks):
    # Sort by (minimum - actual), descending
    tasks.sort(key=lambda x: x[1] - x[0], reverse=True)
    total = 0  # Accumulated energy used
    res = 0  # Initial energy required
    for actual, minimum in tasks:
        # After spending total, need at least minimum left
        res = max(res, total + minimum)
        total += actual
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log n) due to sorting.
- **Space Complexity:** O(1) extra space, aside from input sorting.

### Potential follow-up questions (as if you’re the interviewer)  

- What if tasks must be done in a given order?  
  *Hint: Just simulate in given order and compute minimal needed energy.*

- Could you implement this with a priority queue while processing tasks dynamically?  
  *Hint: Yes, for online variants with new tasks arriving.*

- If all minimum ≥ sum of all actuals, what then?  
  *Hint: Start with minimum of max(minimum, sum of actuals).*  

### Summary
This solution uses **greedy sorting** by (minimum - actual) to minimize the "reserve" needed at every step, ensuring all tasks can be completed in some order. It's a classic greedy + prefix sum pattern.