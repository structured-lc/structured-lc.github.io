### Leetcode 3205 (Medium): Maximum Array Hopping Score I [Practice](https://leetcode.com/problems/maximum-array-hopping-score-i)

### Description  
Given an array `nums`, you start at index 0. At each step, you can "hop" from index i to any index j such that j > i.  
Each hop from i to j earns you a score of (j - i) × nums[j].  
Your goal is to determine the **maximum total score** you can accumulate by hopping until you reach the end of the array (i.e., index n−1).

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3]`  
Output: `4`  
*Explanation:*
- Start at index 0.
- Hop from 0 → 2: (2 - 0) × 3 = 6.
- No further hops possible, but need sum of ALL hops, also considering optimal path.
- If hop from 0 → 1: (1 - 0) × 2 = 2, then from 1 → 2: (2 - 1) × 3 = 3. Total = 2 + 3 = 5, which is better.
- The actual max score is 5.

**Example 2:**  
Input: `nums = [5, 1, 1, 1, 10]`  
Output: `36`
*Explanation:*
- Start at 0.
- Hop 0 → 4: (4 - 0) × 10 = 40.
- That's highest possible score.

**Example 3:**  
Input: `nums = [1, 1, 1, 1]`  
Output: `3`
*Explanation:*
- Hop 0 → 1: (1 - 0) × 1 = 1
- Hop 1 → 2: (2 - 1) × 1 = 1
- Hop 2 → 3: (3 - 2) × 1 = 1
- Total = 1 + 1 + 1 = 3

### Thought Process (as if you’re the interviewee)  
- First, let's consider brute force:  
  At every position, we can hop to any next index, and at each such option, we recursively try every future hop. This would give us all possible hop sequences, so try all paths, sum up the scores, and return the maximum.  
  But this is clearly too slow since each choice fans out exponentially.

- Let's use **Dynamic Programming**.  
  Define dp[i] as the maximum score achievable starting from index i. Our subproblem is:
  - For each i, consider all j with i < j < n, calculate hop_score = (j - i) × nums[j] + dp[j].
  - Take the maximum among all choices of j.

- This gives an O(n²) time, O(n) space solution, which is fine for small n but could TLE for large arrays.

- Can we do better?  
  For this problem, given the constraints, O(n²) is often acceptable, but if nums has special properties (e.g., monotonic values), sometimes a greedy or monotonic stack might help — but not in the general case here.

- Memoization (Top-down DP) or Tabulation (Bottom-up DP) both fit here.  
  - Use memoization with recursion, or iterative DP filling dp[] from the end to the front.

### Corner cases to consider  
- Array with only one element: trivial, score is 0.
- Array where all elements are equal.
- Array where the best move is a single long hop at the start.
- Large input size (so O(n²) must be justified).
- All nums are negative.
- All zeros.

### Solution

```python
def maximumHoppingScore(nums):
    n = len(nums)
    # dp[i]: max score to reach end from i
    dp = [0] * n
    # Start from the last index, dp[n-1] = 0 (since it's the end, no further hops)
    for i in range(n - 2, -1, -1):
        max_score = 0
        # Try hopping from i to every possible j > i
        for j in range(i + 1, n):
            hop = (j - i) * nums[j] + dp[j]
            if hop > max_score:
                max_score = hop
        dp[i] = max_score
    return dp[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  For each index i (from 0 to n-2), must scan all possible j (from i+1 to n-1), so total number of operations is about n²/2 = O(n²).

- **Space Complexity:** O(n)  
  We use a dp array of length n; no extra structures, no recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize the time complexity below O(n²)?  
  *Hint: Consider if certain properties of nums (monotonicity, bounds, etc.) allow skipping/compressing state.*

- How would you adapt your solution if you can only hop up to k indices ahead?  
  *Hint: Sliding window max or deque-based optimization.*

- Can you reconstruct the path that produces the maximum score, not just the value?  
  *Hint: Track the argmax jump at each index during DP fill, walk from 0.*

### Summary
This problem is a classic **DP with state: "What is my best outcome starting from i?"**  
The core pattern is looking ahead to all possible options (i.e., “try all jumps”) and caching solutions for overlapping subproblems — a familiar pattern in "hopping/jump game" style DP.  
Such problems frequently arise in game theory, "choose your own adventure" scoring, or even multi-stage scheduling with cost-to-go.  
The O(n²) table-filling solution is easy to implement and debug, and the pattern is common in interview DP questions. If further constraints were given, monotonic stack or greedy may further optimize.