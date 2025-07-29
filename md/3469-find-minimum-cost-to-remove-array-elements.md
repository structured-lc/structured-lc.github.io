### Leetcode 3469 (Medium): Find Minimum Cost to Remove Array Elements [Practice](https://leetcode.com/problems/find-minimum-cost-to-remove-array-elements)

### Description  
You are given an integer array nums. At each step, you can remove any two elements from the **first three elements** of the array. The cost of each such operation is the **maximum** of the two elements you remove. If fewer than three elements remain, remove them all in one step, and the cost is the maximum of those remaining elements. The goal is to remove all elements from the array with **minimum total cost**. Return that minimum cost.

### Examples  

**Example 1:**  
Input: `nums = [6, 2, 8, 4]`  
Output: `12`  
*Explanation:  
- Remove 8 and 4 from the first three elements (choose indices 2 and 3). Cost: max(8,4)=8. Array becomes [6,2].  
- Remove 6 and 2. Cost: max(6,2)=6.  
- The *total cost* is 8+6=14, but let's check optimal:  
- Remove 6 and 2 first (max=6), [8,4] remaining. Then, remove 8 and 4 (max=8).  
- Total cost is 6+8=14.  
- Try removing 6 and 8 first (max=8), [2,4] left. Remove 2 and 4 (max=4). 8+4=12.  
- Optimal total cost is 12.*

**Example 2:**  
Input: `nums = [1, 3, 2]`  
Output: `3`  
*Explanation:  
Remove 3 and 2, cost=3. One element left (1), cost=1.  
Total cost = 3+1=4, but:  
Remove 1 and 2, cost=2. One left (3), cost=3.  
Total cost = 2+3=5;  
Remove 1 and 3, cost=3. One left (2), cost=2.  
Total cost = 3+2=5.  
Wait, the best is:  
Remove 1 and 3, cost=3. Remove last (2), cost=2.  
So, answer is 3+2=5.*

**Example 3:**  
Input: `nums = [5]`  
Output: `5`  
*Explanation:  
Only one element, remove it directly. Cost is 5.*


### Thought Process (as if you’re the interviewee)  
First, the brute-force would be to try all possible ways of removing pairs from the first three elements until the array is empty, summing costs along each path and taking the minimum. This is exponential in time, as each state can branch in multiple ways.

By noticing overlapping subproblems, we realize this is a classic dynamic programming (DP) scenario; the state can be the current "list of numbers". Since array sizes can be large, we need to optimize the state.  
Instead of the full array, we can track our position in the array and which previous element remains after a removal.  
DP approach:
- At each step, if ≥3 elements left, try all ways to pick two of the first three, recursively remove, and add the cost.
- Use memoization to store subproblem results.
  
**Trade-offs:**  
- Brute-force: O(3ⁿ) — infeasible.
- DP with proper memoization: O(n²) — acceptable for n up to a few thousands.


### Corner cases to consider  
- Empty array (`[]`)  
- Array of size 1 (`[5]`)  
- All elements equal (`[4,4,4,4]`)  
- Large element values  
- Only two elements  
- Choosing the correct pairs for minimum cumulative cost  
- Negative numbers (if allowed, not specified)


### Solution

```python
def minCost(nums):
    n = len(nums)
    from functools import lru_cache

    # dp(last, i): cost to remove from nums[last:] where 
    # last is the index of the single element left after prior removals,
    # i is the current position.
    # At start: last=0 (first element left), i=1
    import sys
    sys.setrecursionlimit(2000)  # Ensure recursion stack is enough

    # Memoization table: (last, i)
    dp_table = {}

    def dp(last, i):
        # Only one element left
        if i == n:
            return nums[last]
        # Two elements left
        if i == n-1:
            return max(nums[last], nums[i])
        key = (last, i)
        if key in dp_table:
            return dp_table[key]

        # Three candidates: pick any two of {nums[last],nums[i],nums[i+1]}
        # and remove them, with their positions shifting accordingly

        # Remove nums[i] and nums[i+1], last stays
        a = max(nums[i], nums[i+1]) + dp(last, i+2)
        # Remove nums[last] and nums[i], new 'left' becoming i+1
        b = max(nums[last], nums[i]) + dp(i+1, i+2)
        # Remove nums[last] and nums[i+1], new 'left' becoming i
        c = max(nums[last], nums[i+1]) + dp(i, i+2)

        answer = min(a, b, c)
        dp_table[key] = answer
        return answer

    return dp(0, 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n²) because at each state (last, i) pair, and there are O(n²) such states.

- **Space Complexity:**  
  O(n²) for the memoization table. Recursion stack depth is O(n).


### Potential follow-up questions (as if you’re the interviewer)  

- What if you could remove any two **adjacent** elements instead?  
  *Hint: Does the greedy strategy work for adjacent pairs?*

- How would the solution change if the operation cost was the **sum** instead of the **maximum** of the two removed?  
  *Hint: Would the optimal substructure still hold?*

- Can you return not just the minimal cost but also the exact sequence of removals that achieves it?  
  *Hint: Add path reconstruction to the DP by passing extra parameters or storing decisions.*


### Summary
This problem is a classic **DP with memoization** challenge, exploiting overlapping subproblems and optimal substructure. The approach relies on recursive choices for the first three array elements and memoizes states to avoid repeated work. This DP pattern appears in problems where ordering and grouping matter, including interval DP, games, and state-space search.