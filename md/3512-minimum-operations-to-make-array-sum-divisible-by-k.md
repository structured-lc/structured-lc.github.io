### Leetcode 3512 (Easy): Minimum Operations to Make Array Sum Divisible by K [Practice](https://leetcode.com/problems/minimum-operations-to-make-array-sum-divisible-by-k)

### Description  
Given an integer array **nums** and an integer **k**, you can repeatedly select any index and decrease that element by 1 (replace nums[i] with nums[i]−1).  
Return the **minimum number of operations** needed so that the sum of nums is divisible by k.

Put differently: How many times must you subtract 1 (from any elements in nums, as many times as you like) so that the final array’s sum is divisible by k?

### Examples  

**Example 1:**  
Input: `nums = [3,9,7], k = 5`  
Output: `4`  
*Explanation: The sum is 3+9+7=19. 19 mod 5 = 4, so subtract 1 a total of 4 times (from any elements, or distributed) to reach 15, which is divisible by 5.*

**Example 2:**  
Input: `nums = [2,6,4], k = 5`  
Output: `2`  
*Explanation: Sum is 2+6+4=12. 12 mod 5 = 2, so subtract 1 twice (from any elements) to make the sum 10. 10 is divisible by 5.*

**Example 3:**  
Input: `nums = [5,5,5], k = 5`  
Output: `0`  
*Explanation: The array sum is 15. Since 15 is already divisible by 5, no operation is needed.*

### Thought Process (as if you’re the interviewee)  
- First instinct: try decrementing elements individually, test all combinations. But since we can decrement any number, at any index, and each operation reduces the sum by 1, it doesn’t matter which elements are changed—the total decrease is what counts.
- Therefore, we only care about **how far the current sum is from the next lowest multiple of k. If s = sum(nums), do s % k to get the remainder r:**  
  - If r = 0, already divisible → **answer is 0**.
  - If r ≠ 0, we need r operations to make s − r divisible by k (**subtract 1 exactly r times, wherever**).
- This is a direct application of **modulo math**.
- Final optimized approach: **return sum(nums) % k**.

### Corner cases to consider  
- nums = [] (empty array): sum is 0, so result is always 0 for any k ≠ 0.
- k = 1: Any integer is divisible by 1 → always return 0.
- Large values in nums, but logic doesn’t change.
- All zeroes in nums: still, sum is 0, so always divisible.
- k > sum(nums): result is sum(nums) % k = sum itself (since sum < k).
- Negative numbers: Allowed, but sum’s mod with k still works consistently.

### Solution

```python
def minOperations(nums, k):
    # Calculate the sum of all elements in nums
    s = sum(nums)
    # The minimum operations needed is simply s % k
    return s % k
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We compute sum(nums), which requires one pass over the n values.
- **Space Complexity:** O(1) — No extra storage beyond a simple sum and trivial variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can only decrement each element a limited number of times (say up to m times)?
  *Hint: Track the total possible decrement, and check if you can reach the target with the given limits.*

- What if the operation allowed is to increase elements by 1 instead of decrease?
  *Hint: Now you need (k - s % k) % k additional increments for divisibility.*

- How would your answer change if you could only decrement a single specific index each time?
  *Hint: Check if possible to achieve the needed decrease with only one element—otherwise, not always possible. Consider element minimum value as well.*

### Summary
The approach uses a **simple math and greedy counting pattern**. Since every decrement simply moves the sum toward a multiple of k, we compute sum(nums) % k to determine the minimum needed. This pattern (reduce a sum by repeated identical operations to reach divisibility) is common in array-manipulation and greedy math problems, e.g., in coin change, modular arithmetic, or batch processing tasks.