### Leetcode 3660 (Medium): Jump Game IX [Practice](https://leetcode.com/problems/jump-game-ix)

### Description  
Given an array of non-negative integers where each element represents the maximum jump length from that position, determine if you can reach the last index starting from the first index.  
You are initially positioned at index 0, and you may jump up to nums[i] steps from index i.  
Return True if you can reach the last index of the array, otherwise False.

### Examples  

**Example 1:**  
Input: `[2,3,1,1,4]`  
Output: `True`  
*Explanation: Start at 0. Jump to 1 (nums=2 allows up to 2 steps). From 1, jump to 4 directly (nums[1]=3). Reached last index.*

**Example 2:**  
Input: `[3,2,1,0,4]`  
Output: `False`  
*Explanation: Start at 0 (max jump 3). Can reach 1, 2, or 3, but nums[3]=0 blocks further progress. Cannot reach final index.*

**Example 3:**  
Input: ``  
Output: `True`  
*Explanation: Already at the last (only) index, so it's reachable.*

### Thought Process (as if you’re the interviewee)  

First, I’d consider a brute-force approach: recursively try every possible jump from each index, checking if any path reaches the end. However, this would have exponential time, as each index may branch to several others.

To optimize, I’d think about **dynamic programming (DP)** to avoid recomputation, but this is still not ideal for large inputs.

Instead, a **greedy** approach works best here. As we scan the array left to right, keep track of the furthest index we can reach at any point (maxReach).  
- At each position i, if i > maxReach, we’re stuck and return False.
- If maxReach reaches or passes the last index, return True.

This approach is efficient (O(n) time, O(1) space), simple, and avoids the recursion/DP overhead.

### Corner cases to consider  
- Array of length 1 (``) — should return True.
- Array starts with 0 but length > 1 — unreachable.
- All entries are zeros except the first (if not enough length, not reachable).
- Jumps that go *exactly* to last index.
- Large arrays (performance, avoid stack overflow).

### Solution

```python
def canJump(nums):
    # Keep track of the furthest index we can reach so far
    max_reach = 0
    n = len(nums)
    
    for i in range(n):
        # If current index is not reachable, we can't proceed
        if i > max_reach:
            return False
        # Update the furthest index we can reach
        max_reach = max(max_reach, i + nums[i])
        # If we can reach or pass the last index, return True early
        if max_reach >= n - 1:
            return True
    return True  # For cases like [0] or already reached

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each position is visited at most once as we scan from left to right and update maxReach.
- **Space Complexity:** O(1) — Only a couple of variables are used for tracking; no extra storage proportional to input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to find the minimum number of jumps to reach the last index rather than just feasibility?  
  *Hint: Track the number of jumps and when you run out of steps to force a jump.*

- Can this be solved using recursion or DP?  
  *Hint: Memoize states, but think about time/space trade-offs.*

- What if negative numbers were allowed in the array?  
  *Hint: Watch for loops and revisiting indices — could require more complex checks.*

### Summary
This is a classic greedy approach problem. The core pattern is **range extension** — continuously tracking the furthest index that can be reached.  
This strategy is commonly applicable to similar jump/interval coverage problems and is a standard part of interview prep for optimizations over brute-force and DP.

### Tags


### Similar Problems
