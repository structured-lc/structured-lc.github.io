### Leetcode 2742 (Hard): Painting the Walls [Practice](https://leetcode.com/problems/painting-the-walls)

### Description  
You are given two painters to paint `n` walls.  
- The **paid painter** can paint any wall `i` in `cost[i]` money and takes `time[i]` units of time.
- The **free painter** charges nothing and paints any wall in 1 unit of time, but can only work *while* the paid painter is painting.
  
Multiple walls can be painted in parallel:  
- In every time unit that the paid painter is busy, the free painter can work on one wall (different from the paid painter’s wall).  
- You can assign each wall to either painter as you choose.
- The goal: **Paint all `n` walls at the minimum total paid cost.**
  
Choose an optimal mix of paid vs. free painter usage to minimize out-of-pocket expense.

### Examples  

**Example 1:**  
Input: `cost = [1,2,3], time = [1,1,1]`  
Output: `4`  
*Explanation: Paid painter paints wall 2 (cost 3, takes 1), in that time the free painter can paint wall 0. Then paid painter paints wall 1 (cost 2, takes 1), while the free painter finishes wall 1. Picking two paid jobs (walls 1 and 2) so every wall gets covered, total cost = 2+3 = 5. But with optimal assignments, cost can be minimized to 4.*

**Example 2:**  
Input: `cost = [2,3,4], time = [1,2,1]`  
Output: `5`  
*Explanation: Paint wall 1 (cost 3, time 2): in those 2 units free painter does two other (walls 0 and 2). All covered for cost 3.*

**Example 3:**  
Input: `cost = [5,3,1], time = [2,1,1]`  
Output: `4`  
*Explanation: Use paid painter on wall 2 (cost 1, time 1), free painter paints wall 0; then paid painter on wall 1 (cost 3, time 1), all walls covered with total cost 4.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try all possible assignments of who paints each wall; this is 2ⁿ combinations (exponential), too slow.
- **Observation:** The **free painter** is "unlocked" for `time[i]` units whenever the paid painter works on wall `i`. For each unit of paid work, the free painter concurrently works on another wall (not the current one).  
- **Dynamic Programming Approach:**  
  - At each wall, make a choice: (1) pay to have the paid painter paint it (cost increases, but gives "free time" for the free painter), or (2) skip to the next wall (maybe assigning it to the free painter during another paid painter task).
  - Track the minimum cost to paint all walls. Key subproblem: **How many walls remain to be painted, and how many "free units" do we have?**
- The state: (current index, number of walls left to paint)  
- The transition:  
  - **Pick:** Pay for current wall (cost[i]), get time[i] units of "free painter" work; so next DP state is (i+1, walls_left - time[i] - 1).
  - **Skip:** Don't use paid painter on this wall, consider next wall.
- Base case: If walls left ≤ 0, done (cost 0); if run out of walls and still need to paint more, impossible (return ∞).
- Trade-offs:  
  - Simple DP with memoization (since n ≤ 500).
  - Greedy is insufficient; need to carefully track overlapping parallelism.

### Corner cases to consider  
- Empty `cost` and `time` arrays (n=0).
- Walls with cost=0 (should always use paid painter?).
- Very large `time[i]` (free painter can finish many remaining walls).
- All `time[i]=0` or all `cost[i]=0`.
- Only one wall.
- Free painter can't be used without paid painter working.

### Solution

```python
import functools
import math

def paintWalls(cost, time):
    n = len(cost)

    @functools.lru_cache(maxsize=None)
    def dp(i, walls_left):
        # If all walls are painted
        if walls_left <= 0:
            return 0
        # If out of walls, but still some left unpainted: impossible
        if i == n:
            return math.inf

        # Option 1: Use paid painter on current wall i
        # This takes time[i] units: during that time, free painter can
        # paint time[i] other walls. So total walls_left decreases by (time[i]+1)
        pick = cost[i] + dp(i + 1, walls_left - time[i] - 1)

        # Option 2: Skip current wall
        skip = dp(i + 1, walls_left)

        return min(pick, skip)

    # Start from first wall, need to cover all n
    return dp(0, n)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), where n is the number of walls.  
  For each wall (n), we may try up to n possible walls_left. Each (i, walls_left) state is memoized.
- **Space Complexity:** O(n²) for DP/memoization table, plus recursion stack up to n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the free painter could work for any fixed number of units (not just 1 per time unit)?
  *Hint: Change parallelism math in DP state.*

- Suppose some walls must only be painted with the paid painter (i.e., free painter can’t do them)?
  *Hint: Add a constraint to force paid assignment on those indices.*

- What if multiple paid painters are available and can work in parallel?
  *Hint: Model concurrent paid jobs; increases complexity, requires scheduling logic.*

### Summary
This problem is a classic **DP scheduling pattern** with resource parallelism: decide at each step whether to spend money (and unlock free painter time), or save, tracking residual work.  
Pattern is common in "resource optimization with workers" problems (pick/skip state, minimizing cost).  
Key is modeling *what the free resource truly enables* per paid action—a pattern used in job scheduling, project management, and bandwidth allocation problems.