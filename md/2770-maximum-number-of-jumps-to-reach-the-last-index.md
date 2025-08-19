### Leetcode 2770 (Medium): Maximum Number of Jumps to Reach the Last Index [Practice](https://leetcode.com/problems/maximum-number-of-jumps-to-reach-the-last-index)

### Description  
Given an array of integers **nums** (of length n) and an integer **target**, you start at index 0 and want to reach the last index (n-1). From any position i, you can jump to any position j (where i < j < n) **if and only if** the absolute difference between nums[i] and nums[j] is less than or equal to target (|nums[j] - nums[i]| ≤ target).  
The goal is to **find the maximum number of jumps** you can make from index 0 to reach index n-1 under these rules. If you cannot reach the last index, return -1.


### Examples  

**Example 1:**  
Input: [1,3,6,4,1,2], target=2  
Output: 3  
*Explanation: Jump index 0→1 (|3-1|=2), 1→3 (|4-3|=1), 3→5 (|2-4|=2). Max jumps is 3 to reach n-1.*

**Example 2:**  
Input: [1,3,6,4,1,2], target=3  
Output: 4  
*Explanation: 0→1 (|3-1|=2), 1→2 (|6-3|=3), 2→4 (|1-6|=5 not allowed), but 2→3 (|4-6|=2), 3→4 (|1-4|=3), 4→5 (|2-1|=1). Sequence: 0→1→2→3→4→5, for 4 jumps.*

**Example 3:**  
Input: [1,3,6,4,1,2], target=0  
Output: -1  
*Explanation: All jumps need |nums[j] - nums[i]| ≤ 0. Since no two different nums are equal, cannot jump anywhere. It's impossible to reach the last index.*

### Thought Process (as if you’re the interviewee)  
I need to maximize the number of jumps from 0 to n-1, given jump constraints.  
- **Brute-force:** Try every possible path using DFS from 0 to n-1 and count all jump sequences, returning the one with the most jumps. But with n ≤ 1000, this is too slow (O(2ⁿ) in worst case).
- **DP optimization:** Let dp[i] be the maximum number of jumps to reach index i. Initialize dp=0 (since starting point, 0 jumps yet). For every i from 1 to n-1, check all j<i:  
  - If |nums[i] - nums[j]| ≤ target and dp[j] ≠ -1, set dp[i]=max(dp[i], dp[j]+1).  
- **Why this works:** Each position only depends on reachable earlier positions. It's like a variant of longest path with edge constraints.
- Tradeoffs: This O(n²) DP works since n ≤ 1000. If n were bigger, would need extra optimization (like sparse table or graph pruning).

### Corner cases to consider  
- Empty array or single-element array (what to return? Single element — 0 jumps, OK.)
- Large target (can jump to any position).
- Zero target (can only jump to same value).
- No valid path to n-1.
- Multiple possible jump sequences; need the one with maximum jumps.
- Negative nums, or target=0.
- Duplicates in nums.

### Solution

```python
def maximumJumps(nums, target):
    n = len(nums)
    # dp[i]: max number of jumps to reach i, or -1 if unreachable
    dp = [-1] * n
    dp[0] = 0  # Start at index 0 with 0 jumps

    # For each i, check all j < i for reachable jumps
    for i in range(1, n):
        for j in range(i):
            # Can we jump from j to i?
            if abs(nums[i] - nums[j]) <= target and dp[j] != -1:
                dp[i] = max(dp[i], dp[j] + 1)
    return dp[n-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), since for each i (1 to n-1), we look at all previous j (≤i). Each comparison is constant time.
- **Space Complexity:** O(n) for the dp array of size n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n becomes very large (ex: n=10⁵)?  
  *Hint: Would need to use data structures to quickly find possible jumps, possibly with segment trees or value bucketing.*

- Can you find the path that gives the maximum number of jumps, not just the count?  
  *Hint: Store a parent pointer during dp updates.*

- How would you solve for minimum number of jumps instead of maximum?  
  *Hint: Flip DP logic: minimize dp[i], initialize with 'inf', always choose smaller jump counts.*

### Summary
This problem demonstrates the classic **1D DP over prefixes** pattern with a quadratic nested loop, similar to the "Longest Increasing Subsequence" (LIS) DP pattern but adapted for a custom jump condition. It highlights the use of dp[i] to track optimal solutions for subproblems and is applicable to other problems with similar "from any j<i to i if reachable" constraints.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Jump Game II(jump-game-ii) (Medium)
- Frog Jump(frog-jump) (Hard)
- Jump Game III(jump-game-iii) (Medium)
- Jump Game IV(jump-game-iv) (Hard)
- Minimum Jumps to Reach Home(minimum-jumps-to-reach-home) (Medium)
- Jump Game VII(jump-game-vii) (Medium)