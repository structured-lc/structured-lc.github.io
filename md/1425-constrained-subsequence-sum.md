### Leetcode 1425 (Hard): Constrained Subsequence Sum [Practice](https://leetcode.com/problems/constrained-subsequence-sum)

### Description  
Given an integer array **nums** and an integer **k**, return the maximum sum of a non-empty subsequence such that **for every two consecutive elements in the subsequence, their indices in the original array are at most k apart**.  
You may pick any elements as long as each selected element’s index is no more than **k** after the previous selected index.

### Examples  

**Example 1:**  
Input: `nums = [10,2,-10,5,20], k = 2`  
Output: `37`  
*Explanation: Select 10, 5, 20 (indices 0, 3, 4) — all ≤ 2 indices apart. Sum = 10 + 5 + 20 = 35. But better: 10, 2, 5, 20 (indices 0, 1, 3, 4), sum = 10 + 2 + 5 + 20 = 37.*

**Example 2:**  
Input: `nums = [-1,-2,-3], k = 1`  
Output: `-1`  
*Explanation: All values are negative. The best we can do is pick a single element: -1.*

**Example 3:**  
Input: `nums = [10,-2,-10,-5,20], k = 2`  
Output: `23`  
*Explanation: Pick 10, -2, -5, 20 (indices 0, 1, 3, 4). Satisfies distance ≤ 2.  
Sum = 10 - 2 - 5 + 20 = 23.*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach is to try all subsequences respecting the distance constraint, summing their elements and returning the maximum. But this is exponential time.
- Instead, use **dynamic programming**:  
  Let **dp[i]** be the maximum sum of a valid subsequence ending at index *i*.  
  For **each index i**, the last element added is nums[i], and the previous element can be at most k indices before i.
- So,  
  **dp[i] = nums[i] + max(dp[j]) for all j in [i-k, i-1] or 0 if no such j exists**
- Naively, for each i, look at up to k dp values → **O(n\*k)**, which is slow for large k.
- **Optimization:** Maintain a sliding window **max** for dp[i-k]...dp[i-1] using a **deque** (monotonic queue), so each value is inserted and removed at most once. This brings complexity to **O(n)**.
- This is a classic DP + deque (sliding window max) problem pattern.

### Corner cases to consider  
- Single-element arrays.
- All negative numbers.
- k ≥ n (distance constraint isn’t binding).
- k = 1 (can only pick consecutive elements).
- Large k vs. small k.
- Empty nums (not in constraints, but consider).
- nums contains zero.

### Solution

```python
from collections import deque

def constrainedSubsetSum(nums, k):
    n = len(nums)
    dp = [0] * n           # dp[i]: max sum of subsequence ending at i
    dp[0] = nums[0]
    deq = deque([0])       # Holds indices, decreasing order of dp[...]
    res = nums[0]

    for i in range(1, n):
        # If deque head is out of the k-window, remove it
        while deq and deq[0] < i - k:
            deq.popleft()
        # DP: current element + best sum (could be 0 if max is negative)
        dp[i] = nums[i] + max(0, dp[deq[0]])
        res = max(res, dp[i])

        # Maintain decreasing order in deque for dp[...]
        while deq and dp[i] >= dp[deq[-1]]:
            deq.pop()
        deq.append(i)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
   - Each index is added and removed from the deque at most once.
   - All operations inside the main loop are O(1) amortized.
- **Space Complexity:** O(n)  
   - For the dp array of size n, and deque holds at most k indices.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle updates or queries dynamically (online scenario)?  
  *Hint: Consider segment trees or balanced BST for dynamic sliding window max.*

- What if you have to print the actual subsequence, not just its sum?  
  *Hint: Track back-pointers while filling dp to reconstruct the path.*

- Can this idea be adapted to multi-dimensional arrays or grids?  
  *Hint: Think in terms of constrained path DP with grid directions.*

### Summary
This problem is a classic application of **dynamic programming with a sliding window maximum**, efficiently implemented with a deque (monotonic queue). The core pattern is applicable to constrained subproblems where each state depends on a window of previous states, and maximizing/minimizing such segment intervals.  
Other problems that use this technique include **Sliding Window Maximum**, **Max Subarray Sum with Constraints**, or even more general grid DP with constrained steps.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Queue(#queue), Sliding Window(#sliding-window), Heap (Priority Queue)(#heap-priority-queue), Monotonic Queue(#monotonic-queue)

### Similar Problems
- Maximum Element-Sum of a Complete Subset of Indices(maximum-element-sum-of-a-complete-subset-of-indices) (Hard)