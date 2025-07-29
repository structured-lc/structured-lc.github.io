### Leetcode 1283 (Medium): Find the Smallest Divisor Given a Threshold [Practice](https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold)

### Description  
Given an array of positive integers `nums` and an integer `threshold`, find the **smallest positive integer divisor** such that when every element in `nums` is divided by it and each result is rounded up to the nearest integer, the sum of all these results is **less than or equal to** `threshold`.  
For example, if a number is 7 and the divisor is 3, the result is ⌈7/3⌉ = 3.

### Examples  

**Example 1:**  
Input: `nums = [1,2,5,9]`, `threshold = 6`  
Output: `5`  
*Explanation:*
Try divisor 5:  
⌈1/5⌉ + ⌈2/5⌉ + ⌈5/5⌉ + ⌈9/5⌉ = 1 + 1 + 1 + 2 = 5 (≤ threshold 6).

Divisor 4:  
⌈1/4⌉ + ⌈2/4⌉ + ⌈5/4⌉ + ⌈9/4⌉ = 1 + 1 + 2 + 3 = 7 (> threshold).  
So, 5 is the smallest divisor.

**Example 2:**  
Input: `nums = [44,22,33,11,1]`, `threshold = 5`  
Output: `44`  
*Explanation:*
Only possible way: divisor 44, sum is  
⌈44/44⌉ + ⌈22/44⌉ + ⌈33/44⌉ + ⌈11/44⌉ + ⌈1/44⌉ = 1 + 1 + 1 + 1 + 1 = 5.

**Example 3:**  
Input: `nums = [4,9,8]`, `threshold = 6`  
Output: `5`  
*Explanation:*
Divisor 5:  
⌈4/5⌉ + ⌈9/5⌉ + ⌈8/5⌉ = 1 + 2 + 2 = 5 (≤ 6).  
Any smaller divisor yields a bigger sum.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try each possible divisor from 1 upwards, calculate the sum for each, stop at first with sum ≤ threshold. But, this is slow since the range may be large (up to max(nums)).
- **Optimize:**  
  - As the divisor increases, the sum strictly decreases; this is a monotonic function.  
  - If the sum is over the threshold, need a larger divisor; if sum ≤ threshold, could try a smaller divisor.
  - This monotonicity allows us to use **binary search** over the divisor range [1, max(nums)].
- **Final approach:** Use binary search to find the minimal divisor where the sum of ⌈nums[i]/divisor⌉ for all i is ≤ threshold.
- **Edge trade-off:**  
  - Brute force: O(n * max(nums)), slow for large max(nums).
  - Binary search: O(n * log(max(nums))) — efficient enough for problem constraints.

### Corner cases to consider  
- nums contains all 1s (max divisor needed is 1)
- threshold equals len(nums)
- nums has one element, threshold is 1
- threshold is much larger than sum of nums (divisor 1 suffices)
- nums contains large numbers or wide value range
- threshold is smaller than len(nums) (impossible, but constraints say always an answer)

### Solution

```python
def smallestDivisor(nums, threshold):
    # Helper to calculate the sum for a given divisor
    def compute_sum(div):
        total = 0
        for num in nums:
            # Equivalent to ceil(num / div) without math.ceil
            total += (num + div - 1) // div
        return total

    left, right = 1, max(nums)  # Divisor range
    while left < right:
        mid = (left + right) // 2
        if compute_sum(mid) <= threshold:
            right = mid  # Try smaller divisor
        else:
            left = mid + 1  # Need bigger divisor
    return left
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log(max(nums))), where n = len(nums). Each binary search step requires O(n) work for sum, and log(max(nums)) steps.
- **Space Complexity:** O(1) extra, since we only use a few pointers/counters; input is not modified.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if the numbers could be negative or zero?  
  *Hint: Consider rules for division and what truncation/rounding means on non-positives.*

- What if you want the largest divisor whose sum is strictly less than the threshold?  
  *Hint: Adapt your binary search stopping/decision logic.*

- Suppose instead of rounding up, you had to round down (floor division)?  
  *Hint: Only change how you compute sum for each candidate divisor.*

### Summary
This problem uses the **binary search over the answer** pattern — not on the array elements themselves, but on the range of a possible answer (divisor). It's well-suited whenever you have a monotonic condition over a numeric space (here: as divisor increases, sum never increases). This coding pattern also appears in questions like *Kth Smallest/Largest, minimizing/maximizing under threshold, and similar divide-to-satisfy problems*.