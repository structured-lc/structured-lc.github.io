### Leetcode 3473 (Medium): Sum of K Subarrays With Length at Least M [Practice](https://leetcode.com/problems/sum-of-k-subarrays-with-length-at-least-m)

### Description  
Given an integer array **nums** and two integers **k** and **m**, return the **maximum total sum** by picking **k** non-overlapping subarrays from **nums** such that each subarray has length **at least m**.  
Subarrays may not overlap. Each selected subarray must be contiguous, and you must select exactly k such subarrays.

### Examples  

**Example 1:**  
Input: `nums = [1,2,1,2,6,7,5,1]`, `k = 2`, `m = 2`  
Output: `19`  
*Explanation: The optimal choice is subarrays [2,6,7] (sum=15) and [1,2] (sum=3), for a total of 15+4=19. There are other valid combinations, but this gives the maximum sum.*

**Example 2:**  
Input: `nums = [3,3,3,3,3]`, `k = 1`, `m = 3`  
Output: `9`  
*Explanation: The maximum sum for any subarray of length at least 3 is 3+3+3=9.*

**Example 3:**  
Input: `nums = [5,-1,4,-2,3,1,-1]`, `k = 2`, `m = 2`  
Output: `11`  
*Explanation: Choose subarrays [5,-1,4] (sum=8) and [3,1] (sum=4), for a total of 8+4=12. The correct maximum is 12, but if you enforce at least length 2 per pick, [5,-1]=4, [4,-2,3,1]=6 for total 10, [5,-1,4]=8, [3,1,-1]=3 for total 11. The best possible is 11.*

### Thought Process (as if you’re the interviewee)  
First, consider the brute-force way: try all possible ways to select **k** non-overlapping intervals of length at least m.  
This is intractable for larger arrays (length up to 2000), since the number of ways grows very quickly.

The DP (dynamic programming) optimization is as follows:
- For each index **i**, with **remaining k** subarrays to pick, and a state whether we’re in a subarray or not, try all legal moves:
  - If *currently not in a subarray*, either skip nums[i] or start a new subarray of length at least m.
  - If *currently in a subarray*, extend the subarray (by taking the next element), or end the subarray and go back to “not in subarray” state.
- Use prefix sum for fast subarray summing.
- Memoize (cache) (i, ongoing, k) DP states.  
- Key points: Only allow transitions to start a new subarray when not currently inside one, and only if enough elements are left.

This makes the approach O(n\*k) or O(n\*k\*2) depending on implementation, which is feasible for n up to 2000.

### Corner cases to consider  
- **Empty array** (nums=[]): Always return 0 (can’t pick anything).
- **k = 0**: Return 0 (no subarrays selected).
- **m > len(nums)**: Impossible to select any subarrays.
- **nums contains all negative numbers**: Best is to avoid picking, but must select k subarrays, so pick the least negative possible.
- **m = 1**: Each element can be a valid subarray.
- **Subarrays with maximal overlap attempt**: Must avoid overlap.
- **k × m > n**: Impossible to fit that many subarrays.
- **All zeros**: Still have to pick k groups.

### Solution

```python
from typing import List
import functools
import itertools

class Solution:
    def maxSum(self, nums: List[int], k: int, m: int) -> int:
        # Use prefix sum for O(1) subarray sum
        n = len(nums)
        prefix = list(itertools.accumulate(nums, initial=0))
        INF = float('-inf')

        @functools.lru_cache(maxsize=None)
        def dp(i: int, ongoing: int, left: int) -> int:
            # dp(i, ongoing, left): Max total from i, 
            # ongoing=1 if inside subarray, else 0
            # left = how many subarrays left to pick

            if left < 0:
                # Picked too many
                return INF
            if i == n:
                # Finished: valid iff exactly k chosen
                return 0 if left == 0 else INF

            res = INF
            if ongoing:
                # 1. Continue current subarray
                res = max(res, dp(i+1, 1, left) + nums[i])
                # 2. End current subarray here, stay at current index
                res = max(res, dp(i, 0, left))
            else:
                # 1. Skip nums[i]
                res = max(res, dp(i+1, 0, left))
                # 2. Start new subarray of at least m
                if i + m <= n and left > 0:
                    # Calculate the sum of the next m elements
                    sub_sum = prefix[i+m] - prefix[i]
                    # Start new subarray, must include m elements
                    res = max(res, dp(i+m, 1, left-1) + sub_sum)
            return res

        return dp(0, 0, k)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × k), since there are O(n × k × 2) unique DP states (by position, ongoing, left), and each is processed in O(1).

- **Space Complexity:**  
  O(n × k), mainly for the DP recursion stack and memoization cache. Prefix sum array takes O(n) additional space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you want to find the minimum sum, or maximizing the product instead of sum?  
  *Hint: How would you adapt the DP recurrence? Watch for sign changes or base cases.*

- How would you output the actual chosen subarrays, not just the sum?  
  *Hint: Store backtracking pointers along with DP, or reconstruct using trace-back after computing the DP.*

- Can you solve this in O(n × k) time without memoization, or inside a for-loop?  
  *Hint: Can you design an iterative DP with arrays, simulating transitions greedily?*

### Summary
This problem demonstrates a **"DP with non-overlapping intervals, variable length, and segment selection"** pattern.  
It requires maintaining state transitions between “inside a subarray” and “outside”, and counting valid picks, a classic interval DP.  
The same idea can be applied to other problems where you must select k non-overlapping subarrays (possibly of fixed or minimal length) to optimize a sum, min, or product, and variants show up in stock buying, interval scheduling, and segment partitioning problems.