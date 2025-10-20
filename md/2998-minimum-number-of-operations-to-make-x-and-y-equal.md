### Leetcode 2998 (Medium): Minimum Number of Operations to Make X and Y Equal [Practice](https://leetcode.com/problems/minimum-number-of-operations-to-make-x-and-y-equal)

### Description  
Given two positive integers, **x** and **y**, determine the **minimum number of operations** required to make x equal to y. In each operation, you can:
- Increment x by 1 (**x += 1**)
- Decrement x by 1 (**x -= 1**)
- If x is divisible by 5, divide x by 5 (**x //= 5**)
- If x is divisible by 11, divide x by 11 (**x //= 11**)

Your goal is to return the smallest number of operations to make x exactly equal to y.

### Examples  

**Example 1:**  
Input: `x=26, y=1`  
Output: `3`  
*Explanation: Decrement by 1 (26→25), divide by 5 (25→5), divide by 5 (5→1).*

**Example 2:**  
Input: `x=20, y=2`  
Output: `2`  
*Explanation: Divide by 5 (20→4), decrement by 1 twice (4→2). But better: divide by 5 (20→4), decrement by 1 (4→3), decrement by 1 (3→2), which is 3 operations. Oops, shorter: divide by 5 (20→4), divide by 2 not allowed, so needs decrement. Shortest path is 3.*

**Example 3:**  
Input: `x=13, y=13`  
Output: `0`  
*Explanation: x is already equal to y, so no operations are needed.*

### Thought Process (as if you’re the interviewee)  
Let's consider brute force: for every operation, try all possible paths and see which sequence leads to y with minimum steps. This is exponential.

Next, notice that increment/decrement can always reach the target in at least abs(x-y) steps. However, divisions by 5 or 11 can reduce x rapidly, so optimal path may involve a mix of division and adjustment. Since x and y can be as large as 10⁹, we need to avoid recomputation.

Dynamic programming (or BFS/DFS with memoization) is suitable. For each state (x), the minimal number of steps to reach y can be calculated recursively, caching results to avoid redundant work.  
- If x ≤ y, only increment is possible so answer is y - x.
- For x > y, I can recursively try dividing x by 5 or 11 (if divisible), or decrement/increment by 1, and take the minimum total steps.

Trade-off: BFS guarantees shortest path with less risk of stack overflow, but recursion with memoization is easier to write. Both will work because search space shrinks on division.

### Corner cases to consider  
- x == y (should return 0)
- x < y (should return y - x by incrementing)
- x one off from y (requires only 1 operation)
- x is not divisible by 5/11, needs to decrement before division
- Large inputs that could cause stack overflow
- Small y, large x, forcing repeated divisions

### Solution

```python
def minimumOperationsToMakeEqual(x: int, y: int) -> int:
    # Use memoization to store computed results
    from functools import lru_cache

    @lru_cache(maxsize=None)
    def dfs(curr):
        # Base case: if curr ≤ y, only increment allowed
        if curr <= y:
            return y - curr
        
        # Option 1: Decrement by 1
        res = curr - y  # brute force decrement/increment only

        # Option 2: Divide by 5 if possible
        if curr % 5 == 0:
            res = min(res, 1 + dfs(curr // 5))
        else:
            # Try to reduce to a multiple of 5 in the fewest steps and divide
            nearest = curr // 5 * 5
            # First decrement to nearest lower multiple of 5, then divide
            res = min(res, (curr - nearest) + 1 + dfs(nearest // 5))
            # Or, if curr is closer to the next higher multiple: increment up then divide (for completeness)
            higher = ((curr + 4) // 5) * 5
            res = min(res, (higher - curr) + 1 + dfs(higher // 5))

        # Option 3: Divide by 11 if possible
        if curr % 11 == 0:
            res = min(res, 1 + dfs(curr // 11))
        else:
            nearest = curr // 11 * 11
            res = min(res, (curr - nearest) + 1 + dfs(nearest // 11))
            higher = ((curr + 10) // 11) * 11
            res = min(res, (higher - curr) + 1 + dfs(higher // 11))

        return res

    return dfs(x)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log₅x + log₁₁x). Since divisions rapidly decrease x, and each state is only computed once via memoization, the total number of recursive states is proportional to the logarithm of x to the base 5 and 11. Some increments/decrements may be needed, but path is dominated by division steps.
- **Space Complexity:** O(log x) for the recursion stack and O(number of unique x states) for memoization storage (i.e., up to O(x-y) in the worst adjust-only scenario, but typically much less due to divisions).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the allowed divisors (5, 11) change or are given as an array?
  *Hint: Generalize handling of divisors via a loop or configuration.*

- What if instead of just x, you start with many values and have to process each in a batch?
  *Hint: Precompute minimum steps for all x up to max(x) and answer via lookup table.*

- Could you find not just the number of minimum operations, but also the actual sequence of steps?
  *Hint: Store previous states or reconstruct path from memoization.*

### Summary
This problem demonstrates a classic **recursion with memoization / dynamic programming** approach to minimize operations by exploring all permitted manipulations at each state. It’s a variation of shortest-path-to-transform-type problems, commonly solved by BFS, DP, or DFS+cache. Such patterns frequently arise in problems with a small set of operations and transformations, such as integer-breaking, coin change or reduction-to-target puzzles.


### Flashcard
Use BFS or memoized DFS where each state is current value. From x, try four operations: increment, decrement, divide by 11 (if divisible), divide by 5 (if divisible). Return minimum steps to reach y using level-order traversal.

### Tags
Dynamic Programming(#dynamic-programming), Breadth-First Search(#breadth-first-search), Memoization(#memoization)

### Similar Problems
- Shortest Bridge(shortest-bridge) (Medium)
- Minimum Moves to Spread Stones Over Grid(minimum-moves-to-spread-stones-over-grid) (Medium)