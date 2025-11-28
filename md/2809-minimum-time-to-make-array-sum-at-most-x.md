### Leetcode 2809 (Hard): Minimum Time to Make Array Sum At Most x [Practice](https://leetcode.com/problems/minimum-time-to-make-array-sum-at-most-x)

### Description  
Given two 0-indexed integer arrays **nums1** and **nums2** of equal length, every second each element nums1[i] is increased by nums2[i]. After this step, once each second, you can reset any nums1[i] to 0 (you are allowed to do this for each i at most once in total — that is, each index at most once across all seconds, not per second). Find the **minimum number of seconds** so that after doing these increments and possible resets, the sum of nums1 is ≤ x. If it is impossible, return -1.

### Examples  

**Example 1:**  
Input: `nums1 = [1,2,3], nums2 = [1,2,3], x = 4`  
Output: `3`  
Explanation:  
Every second, each nums1[i] increases by nums2[i].  
After 1 second: nums1 = [2,4,6] (sum=12).  
After 2 seconds: nums1 = [3,6,9] (sum = 18).  
After 3 seconds: nums1 = [4,8,12]. Reset all: [0,0,0].  
Now sum = 0 ≤ 4, minimal seconds is 3.

**Example 2:**  
Input: `nums1 = [5,2,1], nums2 = [1,2,3], x = 6`  
Output: `2`  
Explanation:  
After 1 second: [6,4,4]. Can reset 5,2, or 1, but sum cannot go ≤ 6.  
After 2 seconds: [7,6,7]. If we reset index 0 (originally 5), then [0,6,7], sum = 13.  
If we reset index 2, [7,6,0], sum = 13.  
If we reset index 1, [7,0,7], sum = 14.  
But if we reset both index 0 and 2 (allowed since each only once): [0,6,0], sum=6.  
So minimal seconds is 2.

**Example 3:**  
Input: `nums1 = [0,0,0], nums2 = [1,1,1], x = 0`  
Output: `0`  
Explanation:  
Sum is already 0 at the start, which is ≤ x. No time needed.

### Thought Process (as if you’re the interviewee)  

- **Brute force idea:**  
  For each second t = 0, 1, ..., try all possible subsets of indices to reset (at any second, but at most once per i), and check if the sum after incrementing and zeroing is ≤ x.  
  The number of possibilities grows exponentially (since resetting can be done in any order), so this is not feasible for n up to 1000.

- **Optimization:**  
  Think about a way to prioritize which indices to reset and when.  
  Since each reset gives you a "refund" of nums1[i] + t × nums2[i] at the moment you do it, you want to maximize this effect.  
  It turns out for a given total number of resets (k out of n), you want to reset the k indices which provide the biggest reductions in the sum.  
  Use **dynamic programming** to determine, for each t (time step), the maximal sum you can "zero" by selecting up to k indices at the right moment.  

- **Algorithm:**  
  - For each number of resets (from 0 up to n), keep the DP of best sum you can "remove" using any k resets up to time t.  
  - For each possible t (the "answer"), check if after t seconds and the optimal resetting, the total sum ≤ x.
  - Binary search on possible t (from 0 up to some reasonable max, based on constraints), or try each t one by one (since n is small).

- **Why dynamic programming:**  
  For every item, you can choose to reset or not at a particular time. For each choice, you calculate the gain (zeroing that element after t seconds) and combine best choices.  
  Sorting by nums2 importance often helps, but the DP ensures we never skip a more optimal subset.

### Corner cases to consider  
- Empty arrays ⇒ trivial, sum is 0
- All elements 0, x = 0 ⇒ answer is 0  
- x < 0, or initial sum > x but cannot be lowered ⇒ answer -1  
- Very large nums2 (sum grows rapidly, you may need to reset sooner)
- Resetting the same index multiple times (not allowed)
- x is so large sum never needs to drop — return 0

### Solution

```python
from typing import List

def minimumTime(nums1: List[int], nums2: List[int], x: int) -> int:
    n = len(nums1)
    # dp[j]: maximum sum we can "remove" (by resetting up to j elements at this step)
    dp = [0] + [-float('inf')] * n

    zipped = list(zip(nums1, nums2))
    # Sort by nums2 ascending, so that we maximize the effect for larger nums2
    zipped.sort(key=lambda z: z[1])

    for a, b in zipped:
        # Reverse update DP (like knapsack)
        for j in range(n, 0, -1):
            # If we reset this at "time j" (i.e., after j increments), gain is a + b × j
            dp[j] = max(dp[j], dp[j-1] + a + b * j)

    sum1 = sum(nums1)
    sum2 = sum(nums2)

    # Try all possible seconds (from 0 to n), check if possible
    for t in range(n+1):
        # After t seconds, each nums1[i] has increased by nums2[i] * t
        # We subtract the best we can "remove" using up to t resets: dp[t]
        total = sum1 + sum2 * t - dp[t]
        if total <= x:
            return t
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), since for each of n elements, we update dp for n possible reset counts.
- **Space Complexity:** O(n), only the dp table of size n+1 is maintained.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the resets can be used on the same index multiple times?  
  *Hint: Think about how the effect and state changes if resets aren't once per index.*

- What if, instead of setting to zero, the reset sets nums1[i] to another specified value?  
  *Hint: Adjust the gain calculation for each reset.*

- Can you solve it if the allowed number of resets is limited to k < n?  
  *Hint: Only consider up to k resets, choose most valuable.*

### Summary

This problem is a variant of **dynamic programming / knapsack** with a twist—each reset is like a "pick once" item, with its reward growing with the time step. The solution involves sorting for greedy opportunities and using DP to cover all options for the number of resets.  
This pattern—"optimize selection of at most k resets/actions where order matters"—is common in problems involving scheduling, greedy plus DP, and resource allocation.


### Flashcard
Sort indices by `nums1[i] / nums2[i]` (efficiency of reset), greedily reset highest-efficiency indices first; use DP or greedy to find minimum resets needed.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Sorting(#sorting)

### Similar Problems
