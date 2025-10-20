### Leetcode 1099 (Easy): Two Sum Less Than K [Practice](https://leetcode.com/problems/two-sum-less-than-k)

### Description  
Given an array of integers **nums** and an integer **k**, find the **maximum possible sum** of any two distinct elements such that the sum is **less than k**. Return that sum, or **-1** if no valid pair exists.  
- Each element can only be used once per pair.
- If there’s no such pair, return -1.  
This differs from classic Two Sum because you want the **largest sum less than k** among all possible pairs, not just one pair adding to *exactly* k.

### Examples  

**Example 1:**  
Input: `nums = [34,23,1,24,75,33,54,8]`, `k = 60`  
Output: `58`  
Explanation. The largest sum of any two distinct numbers less than 60 is 34+24=58.

**Example 2:**  
Input: `nums = [10,20,30]`, `k = 15`  
Output: `-1`  
Explanation. No two numbers sum to less than 15, so return -1.

**Example 3:**  
Input: `nums = [1,2,3,4,5]`, `k = 10`  
Output: `9`  
Explanation. 4+5=9 is the largest pair sum less than 10.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Loop through every pair (i, j) (where i < j) and check if their sum is less than k; keep track of the maximum valid sum. This is O(n²) time, which works for small arrays but will be slow with large inputs.
- **Optimized:** Sort the array, then use a **two-pointer approach**. Set one pointer at the start (left), one at the end (right):
  - If nums[left] + nums[right] < k, this is a possible result; since we want the largest, record the sum and move left pointer right to try a potentially higher sum.
  - If nums[left] + nums[right] ≥ k, the sum is too large: move the right pointer left to decrease the sum.
  - Continue while left < right.  
This approach works in O(n log n) time (sort), with O(1) space, and is much faster for larger arrays. Sorting helps us decipher the potential sums more directly and prune impossible combinations early[1][3].

### Corner cases to consider  
- Empty array or array of size < 2 (cannot form a pair)
- All numbers are the same
- All pairs have a sum ≥ k (should return -1)
- Negative numbers or zeros
- k ≤ min possible sum in the array (no pair)
- Large k (sum of biggest two is still less)

### Solution

```python
def twoSumLessThanK(nums, k):
    # Sort the list to enable two-pointer traversal
    nums.sort()
    left = 0
    right = len(nums) - 1
    max_sum = -1

    while left < right:
        total = nums[left] + nums[right]
        if total < k:
            # Found a sum less than k, try to maximize
            if total > max_sum:
                max_sum = total
            # Move left pointer right to try bigger sum
            left += 1
        else:
            # Sum too large or equal, move right pointer left
            right -= 1

    return max_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) because of sorting. The two-pointer scan is O(n), which is dominated by the sort step.
- **Space Complexity:** O(1) for extra variables (if sorting in-place is allowed); otherwise, O(n) for the sorting step (depends on sort implementation, but usually ignored for interview settings).

### Potential follow-up questions (as if you’re the interviewer)  

- What if I need the indices of the two numbers, not just the sum?  
  *Hint: Maintain a sorted copy of indices, or track original indices when sorting.*

- How would you handle the case where elements can be used multiple times?  
  *Hint: Do not move the pointers as aggressively; allow revisiting elements.*

- What if the array is huge, and you want to minimize memory usage?  
  *Hint: Can you solve with counting sort or frequency buckets if the values are within a small range?*

### Summary
This problem uses the **two-pointer** and **sorting** patterns to maximize pair sums under a limit — a classic variant of "Two Sum." The two-pointer method is efficient for sorted arrays and appears in many array/pair problems, especially in combination-style questions or those involving boundaries. This approach generalizes well to related "find k closest" or "min/max sum under constraint" tasks.


### Flashcard
Sort array, use two pointers (left=0, right=n-1)—if sum < k record it and move left++, else move right--; return maximum recorded sum or -1 if none found.

### Tags
Array(#array), Two Pointers(#two-pointers), Binary Search(#binary-search), Sorting(#sorting)

### Similar Problems
- Two Sum(two-sum) (Easy)
- Two Sum II - Input Array Is Sorted(two-sum-ii-input-array-is-sorted) (Medium)
- 3Sum Smaller(3sum-smaller) (Medium)
- Subarray Product Less Than K(subarray-product-less-than-k) (Medium)