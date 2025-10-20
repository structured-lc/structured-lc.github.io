### Leetcode 1696 (Medium): Jump Game VI [Practice](https://leetcode.com/problems/jump-game-vi)

### Description  
Given an integer array nums and an integer k, start at index 0 and each step you can move forward up to k steps. The score at each step is the sum of visited elements. What's the maximum score to reach the last index?
- Each move can be to any index i + 1, i + 2, ..., i + k (≤ n-1).
- At each position, you must choose your next jump within the following k positions.
- Find the path from 0 to n-1 that maximizes total score.

### Examples  

**Example 1:**  
Input: `nums = [1,-1,-2,4,-7,3], k = 2`  
Output: `7`  
*Explanation: 1 → -1 → 4 → 3 (score: 1-1+4+3=7)*

**Example 2:**  
Input: `nums = [10,-5,-2,4,0,3], k = 3`  
Output: `17`  
*Explanation: 10 → 4 → 3 (10+4+3=17)*

**Example 3:**  
Input: `nums = [1,-5,-20,4,-1,3,-6,-3,5,0,1], k = 2`
Output: `0`
*Explanation: 1 → -5 → 4 → -1 → 3 → -3 → 5 → 1 = 0*

### Thought Process (as if you’re the interviewee)  
- The key is to, at each index, take the maximum score possible from the last k indices.
- Brute-force: For each i, check all k positions before i. Too slow (O(nk)).
- Optimize: Use a deque (monotonic queue) to keep track of the max dp in the last k steps as we fill dp[i].
- At each i, pop indices out of range, set dp[i] = nums[i] + max(dp[queue]), and maintain deque decreasing.

### Corner cases to consider  
- k >= n (can jump straight to the end)
- All negative numbers
- Single element array
- k == 1 (simple walk)

### Solution

```python
from collections import deque

def maxResult(nums, k):
    n = len(nums)
    dp = [0]*n
    dp[0] = nums[0]
    dq = deque([0])
    for i in range(1, n):
        # remove indices out of window (i - k)
        while dq and dq[0] < i - k:
            dq.popleft()
        # dp[i] is nums[i] + max in window
        dp[i] = nums[i] + dp[dq[0]]
        # maintain deque: remove from back if worse than dp[i]
        while dq and dp[i] >= dp[dq[-1]]:
            dq.pop()
        dq.append(i)
    return dp[-1]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) — each index is added/removed to deque at most once.
- **Space Complexity:** O(n) for dp and the deque.

### Potential follow-up questions (as if you’re the interviewer)  
- If you want to return the path, not just the score?  
  *Hint: Track predecessors in dp.*

- What if k and n are huge? Can you do it faster?  
  *Hint: Still O(n) — it's optimal, but you could use less memory with rolling arrays.*

- How would you adapt if you could jump either to the left or right up to k?  
  *Hint: Rework window for both directions.*

### Summary
Monotonic queue / sliding window maximum pattern, combining DP and deque. Very common for max-in-range sliding window problems.


### Flashcard
Jump Game VI

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Queue(#queue), Heap (Priority Queue)(#heap-priority-queue), Monotonic Queue(#monotonic-queue)

### Similar Problems
- Sliding Window Maximum(sliding-window-maximum) (Hard)
- Jump Game VII(jump-game-vii) (Medium)
- Jump Game VIII(jump-game-viii) (Medium)
- Maximize Value of Function in a Ball Passing Game(maximize-value-of-function-in-a-ball-passing-game) (Hard)