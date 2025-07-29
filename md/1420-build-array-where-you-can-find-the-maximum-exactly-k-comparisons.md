### Leetcode 1420 (Hard): Build Array Where You Can Find The Maximum Exactly K Comparisons [Practice](https://leetcode.com/problems/build-array-where-you-can-find-the-maximum-exactly-k-comparisons)

### Description  
Given three integers n, m, k, find the number of arrays of length n where each element is between 1 and m (inclusive), and exactly k times during a scan from left to right, you find a new maximum value. Two arrays are different if at least one element is different. Return the count modulo 10⁹ + 7.

### Examples  
**Example 1:**  
Input: `n = 2, m = 3, k = 1`  
Output: `6`  
*Explanation: (Arrays where only the first element is the max, so [1,x],[2,x],[3,x]). For each first element, second can be ≤ first.*

**Example 2:**  
Input: `n = 5, m = 2, k = 3`  
Output: `0`  
*Explanation: Not enough space to find 3 new maxima in 5-length array with max 2.*

**Example 3:**  
Input: `n = 3, m = 3, k = 2`  
Output: `6`  
*Explanation: There are a total of 6 arrays of length 3 with 2 times a new maximum is found.*


### Thought Process (as if you’re the interviewee)  
- This is a DP-on-arrays combinatorial construction problem. 
- Key: At each index, either place a value ≤ current max, which does not increase comparison count, or place a new max, increasing the comparison count.
- Let dp[n][m][k]: number of arrays of length n, maximum value m, and exactly k searches (new maxima found).
- State reduction: Actually, dp[pos][curr_max][curr_k]: number of arrays of length pos, with curr_max and curr_k new maximums so far.
- Base case: pos==n and curr_k==k return 1 else 0.
- Transition: For each candidate number from 1 to m. If candidate > curr_max, increase curr_k and set curr_max = candidate, else curr_max unchanged.
- DP with memoization, or bottom-up, as n and m can be up to 50, so feasible.
- Be careful about modulo for large answers.

### Corner cases to consider  
- n, m, k = 0
- k > n (impossible)
- k = 1 (max seen only at start)
- m = 1
- Large n, small m and vice versa

### Solution

```python
MOD = 10**9+7
from functools import lru_cache

def numOfArrays(n, m, k):
    @lru_cache(None)
    def dp(pos, curr_max, curr_k):
        if pos == n:
            return 1 if curr_k == k else 0
        ans = 0
        for num in range(1, m+1):
            if num > curr_max:
                if curr_k + 1 <= k:
                    ans = (ans + dp(pos+1, num, curr_k+1)) % MOD
            else:
                ans = (ans + dp(pos+1, curr_max, curr_k)) % MOD
        return ans
    return dp(0, 0, 0)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n × m × k × m) = O(n × m² × k), but with memoization, state space is O(n × m × k), acceptable with constraints.
- **Space Complexity:** O(n × m × k), due to DP state storage.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you optimize this solution further if n and m were much larger?  
  *Hint: Can you use iterative DP or space reduction techniques?*
- Can you reconstruct one of the valid output arrays?  
  *Hint: Backtrack from DP states.*
- What happens if we ask for arrays where maximum is exactly at the last position?  
  *Hint: Restrict DP transitions so last index is new max.*

### Summary
Classic combinatorics DP: at each step, choose to increase the current maximum (new comparison) or pick a value ≤ current max. This coding pattern of DP with position and parameterized states applies to several "build arrays with constraints" style problems.