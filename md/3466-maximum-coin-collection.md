### Leetcode 3466 (Medium): Maximum Coin Collection  [Practice](https://leetcode.com/problems/maximum-coin-collection)

### Description  
You are given two integer arrays, `lane1` and `lane2`, each of length n. These represent the coins Mario earns (or loses, if negative) at each mile on two parallel freeway lanes. Mario:
- May start entering the freeway at any position (i.e., any starting mile index).
- Must start in **lane 1** and must travel at least one mile before exiting.
- Can switch to the other lane, at most **twice** (so at most 2 lane switches total during the whole trip).
- The goal is to collect as many coins as possible, considering the coins he gains or loses at each passed mile. 

What is the maximum number of coins Mario can collect, by choosing the optimal entry point and switch pattern, traveling at least one mile before exiting?

### Examples  

**Example 1:**  
Input: `lane1 = [1,2,3], lane2 = [3,2,1]`  
Output: `6`  
*Explanation: If Mario enters at mile 0 in lane 1, he gets 1 (lane1). Stay lane1[1]=2, lane1[2]=3. No switches needed. 1+2+3=6.*

**Example 2:**  
Input: `lane1 = [-1,9,1], lane2 = [9,-1,1]`  
Output: `10`  
*Explanation: Start at mile 0 in lane 1: -1, switch to lane2 at mile 1 for 9, then lane2[2]=1. -1+9+1=9.  
OR, start at mile 1 in lane 1: 9, lane1[2]=1. 9+1=10.*

**Example 3:**  
Input: `lane1 = [2,-1,4,-2], lane2 = [-3,3,1,5]`  
Output: `8`  
*Explanation: Start at mile 1 in lane 1: -1, switch to lane 2 at mile 1 (after entry), collect 3, 1, 5. -1+3+1+5=8.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**: Try every possible entry index, and for each, simulate all possible paths with at most 2 lane switches. For n positions and 2 choices at each mile, that's exponential — not efficient.
- **Optimize:** By noticing that switches are bounded (at most 2) and constraints on start/end, we can use **DP (Dynamic Programming)** or **DFS with memoization**.
- Design a recursive function:
    - `dfs(i, lane, switches_left)` — the max coins collectable starting at mile `i`, on `lane`, with `switches_left` allowed.
    - For each state:
        1. Take current coin (from current lane and position).
        2. Either stay in the same lane (move to i+1), or, if switches are left, try switching to the other lane (move to i+1 and decrement switches).
    - Since Mario may enter at *any* position as long as his first step is on lane1, try all possible starting indices and pick maximum.
- **Trade-offs:** Since we only have 2 remaining switches and two lanes, states per position is small. Memoization table size is `n × 2 × 3` (pos × lane × switches_left), which is feasible.

### Corner cases to consider  
- Arrays of length 1 (test single-mile highway).
- All negative entries.
- Both lanes have equal or identical values.
- Optimal path involves not switching at all.
- Must test for starting at any index (not always mile 0).
- Multiple optimal solutions.

### Solution

```python
def maxCoins(lane1, lane2):
    n = len(lane1)
    from functools import lru_cache

    @lru_cache(maxsize=None)
    def dfs(i, lane, switches_left):
        if i >= n:
            return 0
        cur_coin = lane1[i] if lane == 0 else lane2[i]
        # Option 1: Stay in the same lane
        best = cur_coin + dfs(i + 1, lane, switches_left)
        # Option 2: Switch lanes, if allowed
        if switches_left > 0:
            best = max(best, cur_coin + dfs(i + 1, 1 - lane, switches_left - 1))
        return best

    result = float('-inf')
    for start in range(n):
        result = max(result, dfs(start, 0, 2))  # Must start in lane 1
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). For each starting index, the number of (lane, switches_left) combinations is constant (2 lanes × 3 switches). So O(n × 2 × 3) = O(n).
- **Space Complexity:** O(n). The memoization stores up to n × 2 × 3 entries.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the maximum allowed switches is *k* (not just 2)?
  *Hint: Generalize DP state: use a 3rd dimension up to k, code is almost identical.*

- If Mario can start on either lane?
  *Hint: Try starting at each position on both lanes, and compare all such runs.*

- How to output the actual path (not just the max coins)?
  *Hint: Add decision pointers for reconstructing the best path after DP completes.*

### Summary
The solution uses the **DP/DFS with memoization** pattern, managing a small fixed set of state variables (position, lane, remaining switches). The idea of bounding a complex traversal by the number of switches is a recurring technique in constrained movement/grid problems. This problem resembles "**stateful path DP**" frequently used in grid, robot, or multi-lane optimization problems.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
