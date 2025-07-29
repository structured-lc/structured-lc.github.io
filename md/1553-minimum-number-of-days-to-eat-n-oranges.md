### Leetcode 1553 (Hard): Minimum Number of Days to Eat N Oranges [Practice](https://leetcode.com/problems/minimum-number-of-days-to-eat-n-oranges)

### Description  
Given `n` oranges, you can eat:
- 1 orange per day
- If n is divisible by 2, eat n/2 oranges in one day
- If n is divisible by 3, eat 2×(n/3) oranges in one day
Find the minimum number of days to eat all n oranges.

### Examples  

**Example 1:**  
Input: `n = 10`  
Output: `4`  
*Explanation: 10→9 (eat1), 9→6 (eat3), 6→2 (eat2), 2→0 (eat2).*

**Example 2:**  
Input: `n = 6`  
Output: `3`  
*Explanation: 6→2 (eat2), 2→0 (eat2), 0 done.*

**Example 3:**  
Input: `n = 1`  
Output: `1`  
*Explanation: Eat 1 orange, done.*

### Thought Process (as if you’re the interviewee)  
Straightforward recursion: At every n, try all three options. But brute force leads to exponential time.
Use memoization to cache solutions for each n.
For each state, the options are:
- Eat one, then dp(n-1)
- Eat until divisible by 2, eat n//2, then dp(n//2) + (n % 2 ops to reach divisible)
- Eat until divisible by 3, eat 2×(n//3), then dp(n//3) + (n % 3 ops to reach divisible)
Pick the minimum among these.
Use LRU cache or explicit dictionary.

### Corner cases to consider  
- n = 0 (should be 0)
- n = 1 (should be 1)
- Large n (memoization needed)

### Solution

```python
from functools import lru_cache

def minDays(n):
    @lru_cache(None)
    def dp(x):
        if x <= 1:  # 0 or 1
            return x
        return 1 + min(
            x % 2 + dp(x // 2),
            x % 3 + dp(x // 3)
        )
    return dp(n)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n). For each n, at most O(log n) different dp states due to division.
- **Space Complexity:** O(log n) for memoization stack + cache.

### Potential follow-up questions (as if you’re the interviewer)  
- What if the allowed eating factors changed (e.g. 5)?  
  *Hint: Generalize the factor handling in the dp step.*

- What if only division by 2 or only division by 3 allowed?  
  *Hint: Remove one branch, see how it simplifies.*

- Can you do it iteratively?  
  *Hint: Try a bottom-up approach, may be space-costly.*

### Summary
Dynamic programming + memoization on n. Classic min-steps DP pattern where states can branch. Rarely possible with pure greedy, usually best with memoized recursion.