### Leetcode 2104 (Medium): Sum of Subarray Ranges [Practice](https://leetcode.com/problems/sum-of-subarray-ranges)

### Description  
Given an integer array `nums`, find the sum of the ranges of all subarrays.  
The **range** of a subarray is defined as the difference between the largest and smallest element in that subarray.  
A **subarray** is a contiguous, non-empty sequence of elements within the array.  
Your task is to return the **sum of all subarray ranges**.

### Examples  

**Example 1:**  
Input: `[1,2,3]`  
Output: `4`  
*Explanation: All subarrays and their ranges:  
[1] → 1-1 = 0  
[2] → 2-2 = 0  
[3] → 3-3 = 0  
[1,2] → 2-1 = 1  
[2,3] → 3-2 = 1  
[1,2,3] → 3-1 = 2  
Sum of all ranges = 0+0+0+1+1+2 = 4*

**Example 2:**  
Input: `[1,3,3]`  
Output: `4`  
*Explanation: [1] → 0, [3] → 0, [3] → 0, [1,3] → 2, [3,3] → 0, [1,3,3] → 2  
Sum: 0+0+0+2+0+2 = 4*

**Example 3:**  
Input: `[4,1,2,3]`  
Output: `13`  
*Explanation:  
[4] → 0, [1] → 0, [2] → 0, [3] → 0  
[4,1] → 4-1 = 3, [1,2] → 2-1 = 1, [2,3] → 3-2 = 1  
[4,1,2] → 4-1 = 3, [1,2,3] → 3-1 = 2  
[4,1,2,3] → 4-1 = 3  
Sum: 0+0+0+0+3+1+1+3+2+3 = 13*

### Thought Process (as if you’re the interviewee)  
Start by brute force:  
- For every possible subarray, compute the min and max, subtract to get range, and add up.  
- This would be O(n³): O(n²) subarrays and for each, O(n) to scan min and max.

Can we do O(n²)?  
- For every subarray (start and end), keep track of min and max as we extend to the right. Still too slow for large n.

Any optimizations?  
- Notice that the answer can be written as the sum of all subarray maximums minus the sum of all subarray minimums.
- If we can efficiently compute "for each element, in how many subarrays it is the maximum (or minimum)", we can sum their total contributions.

Monotonic stack allows O(n) computation for each direction:  
- For maximum: For each nums[i], count the number of subarrays where it is the maximum, using next and previous greater elements.  
- For minimum: Likewise, using next and previous smaller elements.

Final answer = sum of contributions as maximum - sum of contributions as minimum.

Chose monotonic stack because it reduces time from O(n²) to O(n).

### Corner cases to consider  
- Single element array (should return 0).
- All identical elements (all subarray ranges are 0).
- Increasing or decreasing arrays.
- Large arrays / max n.
- Negative values.
- Alternating min-max patterns.


### Solution

```python
def subArrayRanges(nums):
    n = len(nums)
    total = 0
    
    # Helper to compute for min or max
    def get_contributions(nums, is_min):
        n = len(nums)
        stack = []
        left = [0] * n  # distance to previous less/greater
        right = [0] * n # distance to next less/greater
        
        for i in range(n):
            # For min, use ascending stack; for max, use descending
            # For equal elements: strictly < for min, <= for max (prevents double count)
            while stack and (nums[stack[-1]] > nums[i] if is_min else nums[stack[-1]] < nums[i]):
                stack.pop()
            left[i] = i - stack[-1] if stack else i + 1
            stack.append(i)
        
        stack.clear()
        for i in range(n-1, -1, -1):
            while stack and (nums[stack[-1]] >= nums[i] if is_min else nums[stack[-1]] <= nums[i]):
                stack.pop()
            right[i] = stack[-1] - i if stack else n - i
            stack.append(i)
        
        return [nums[i] * left[i] * right[i] for i in range(n)]
    
    max_contrib = get_contributions(nums, False)
    min_contrib = get_contributions(nums, True)
    total = sum(max_contrib) - sum(min_contrib)
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each element is pushed/popped at most once in each direction for both min and max contributions.
- **Space Complexity:** O(n). Arrays for left, right, stack, and contributions.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array can be modified by queries?  
  *Hint: Can you support range-min/range-max quickly (e.g., segment tree or RMQ table)?*

- What if you want the sum for only subarrays of at least length k?  
  *Hint: Adjust your counting of valid subarrays accordingly.*

- Can you generalize for other aggregate functions (e.g., sum of subarray products of max and min)?  
  *Hint: Reevaluate how each element’s contribution is computed.*

### Summary
This problem fits the **contribution-counting pattern**—for each element, count the subarrays where it is min or max, and aggregate those contributions.  
The **monotonic stack** approach is useful for many range-based problems: sum of subarray minimums, maximums, etc. This logic is common in problems dealing with spans, ranges, and next/previous less or greater elements.