### Leetcode 1340 (Hard): Jump Game V [Practice](https://leetcode.com/problems/jump-game-v)

### Description  
Given an integer array `arr` and an integer `d`, you start at any index and can jump to a new index `j` within distance `d` (i.e., `i-d ≤ j ≤ i+d`, `i ≠ j`). You can only jump from index `i` to index `j` if `arr[j] < arr[i]` (the value lands must be strictly lower) and all the positions between `i` and `j` are strictly lower than `arr[i]`. You can keep jumping as long as possible. Find the maximum number of indices you can visit in total (including the starting one) after any possible starting point, using optimal jumps.

### Examples  

**Example 1:**  
Input: `arr = [6,4,14,6,8,13,9,7,10,6,12]`, `d = 2`  
Output: `4`  
*Explanation: From index 2 (14), jump to 5 (13), then 4 (8) or 6 (9), then to 7 (7) or 9 (6), totaling 4 points.*

**Example 2:**  
Input: `arr = [3,3,3,3,3]`, `d = 3`  
Output: `1`  
*Explanation: No jump possible as all elements equal.*

**Example 3:**  
Input: `arr = [7,6,5,4,3,2,1]`, `d = 1`  
Output: `7`  
*Explanation: Each step left or right is a valid downhill jump, visiting all.*

### Thought Process (as if you’re the interviewee)  
- The optimal substructure: From each index, the answer is 1 + max(jump from any valid reachable index j).
- Use DP with memoization: For each i, compute the maximum indices you can reach, considering all jumps left and right up to distance d.
- For j to the left (`i-1` to `i-d`), stop early if a higher/equal bar blocks the jump.
- For jumps to the right, do the same.
- DFS + memoization is natural, as values can overlap.
- Try all starting indices, take the maximum.

### Corner cases to consider  
- All elements same (no jumps)
- d larger than length
- d = 1 (can only jump to direct neighbors)
- Very large input size
- Plateaus (equal values block)

### Solution

```python
from typing import List

def maxJumps(arr: List[int], d: int) -> int:
    n = len(arr)
    dp = [0] * n  # store the max number of steps starting from i
    
    def dfs(i):
        if dp[i]:
            return dp[i]
        res = 1
        # Jump left
        for j in range(i-1, max(i-d-1, -1), -1):
            if arr[j] >= arr[i]:
                break
            res = max(res, 1 + dfs(j))
        # Jump right
        for j in range(i+1, min(i+d+1, n)):
            if arr[j] >= arr[i]:
                break
            res = max(res, 1 + dfs(j))
        dp[i] = res
        return res
    
    return max(dfs(i) for i in range(n))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × d). Each cell looked at most d times (left/right look ahead), memoized.
- **Space Complexity:** O(n), for DP table and recursion stack

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can jump to higher places?  
  *Hint: Remove the strictly-lower condition in your checks.*
- Can you compute reachable indices for all start points?  
  *Hint: Store the path for each i.*
- How to optimize for very large arr and d?  
  *Hint: Iterative DP or segment tree for max jump chains.*

### Summary
This is a classic memoized DFS/DP on intervals. The recursion tree is pruned by the strictly-lower and breaking rules, and DP memoization avoids recomputation. Patterns here appear in runnable-path, jump-game, and longest-nondecreasing-path problems.