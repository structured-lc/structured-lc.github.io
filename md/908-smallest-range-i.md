### Leetcode 908 (Easy): Smallest Range I [Practice](https://leetcode.com/problems/smallest-range-i)

### Description  
Given an array of integers `nums` and an integer `k`, you are allowed to add or subtract any integer between `-k` and `k` (inclusive) to each element of `nums`, **at most once per element**. Your task is to return the minimum possible difference between the largest and smallest values in the array after performing these operations.

In simpler terms:  
For each element in the array, you can adjust it by up to `k` in either direction. After all adjustments, what is the *smallest* possible difference between the largest and the smallest element in the array?

### Examples  

**Example 1:**  
Input: `nums = [1], k = 0`  
Output: `0`  
*Explanation: The array contains only one element, so the difference between max and min is 0.*

**Example 2:**  
Input: `nums = [0,10], k = 2`  
Output: `6`  
*Explanation: You can add 2 to 0 (becomes 2), and subtract 2 from 10 (becomes 8). New array: [2,8]. Difference: 8 - 2 = 6.*

**Example 3:**  
Input: `nums = [1,3,6], k = 3`  
Output: `0`  
*Explanation: Add 3 to 1 (becomes 4), subtract 3 from 6 (becomes 3), 3 can remain as is. New array: [4,3,3]. Difference: 4 - 3 = 1.*

  But notice: it's technically possible to adjust so that min and max overlap:  
  - Add 3 to 1: 4  
  - Subtract 3 from 6: 3  
  - You can use some mix, but the **smallest possible difference** is  
  `max(nums) - min(nums) - 2 × k = 6 - 1 - 6 = -1`, which would be negative.  
  But since difference can't be negative, answer is 0.

### Thought Process (as if you’re the interviewee)  
Brute-force would mean, for every configuration of adding or subtracting up to `k` per element, simulate the resultant array, and find the min difference — but that's exponential and infeasible.

Observing the operations, you can move the smallest value up by `k` (at most), and the largest value down by `k` (at most). So, the min gap between any two numbers can be reduced by up to `2 × k`, but never made negative.

Therefore,  
- Compute original range: `max(nums) - min(nums)`
- Calculate reduced range: `max(nums) - min(nums) - 2 × k`
- If the result is negative, return 0 (since you can always "overlap" all elements).
- This is optimal — no need to adjust other elements further.

### Corner cases to consider  
- Array of length 1: difference should always be 0.
- All elements equal: difference is 0, regardless of `k`.
- `k = 0`: no ability to modify, so answer is just original max - min.
- Difference reduced past zero: always clamp answer to 0.
- Very large `k` compared to the range: again, return 0.

### Solution

```python
def smallestRangeI(nums, k):
    # Find max and min elements in nums
    max_num = nums[0]
    min_num = nums[0]
    for num in nums:
        if num > max_num:
            max_num = num
        if num < min_num:
            min_num = num
    
    # Compute reduced range
    reduced_range = max_num - min_num - 2 * k
    # Range cannot be negative. Clamp at zero.
    return reduced_range if reduced_range > 0 else 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — One pass to find min and max in the array.
- **Space Complexity:** O(1) — Only a few integer variables for tracking min and max; no extra storage needed.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your algorithm change if each element could be changed by a different value, i.e., each had its own `kᵢ`?  
  *Hint: Think about tracking per-element possible min/max movement.*

- What if you can apply the operation an unlimited number of times to each element?  
  *Hint: Consider whether the final configuration converges, and if so, to what.*

- How would you solve this if the operation had to be applied exactly once to each element (not necessarily increasing or decreasing)?  
  *Hint: Would the range always get narrower, or could it stay the same?*

### Summary  
This problem uses the **array arithmetic manipulation** and **greedy range minimization** technique. The key insight is to realize that the only way to minimize the difference between the largest and smallest elements is to maximize the overlap by shifting min up and max down as much as allowed. This is an example of the “range compression” pattern — useful wherever you can freely "stretch" or "shrink" min and max by constants. Variants of this pattern appear in other interval and difference minimization problems.


### Flashcard
The smallest possible range is max(0, max(nums) - min(nums) - 2×k) after shifting min up and max down by k.

### Tags
Array(#array), Math(#math)

### Similar Problems
