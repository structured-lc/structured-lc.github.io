### Leetcode 2256 (Medium): Minimum Average Difference [Practice](https://leetcode.com/problems/minimum-average-difference)

### Description  
Given an integer array, find the index that **minimizes the absolute difference** between the average of the first part (from start to index) and the average of the second part (from index+1 to end). The averages are **rounded down (floor)**, and if there are multiple indices with the same minimal difference, **return the smallest index**.  
If the right segment (elements after the chosen index) is empty, its average is considered as 0.

### Examples  

**Example 1:**  
Input: `[2,5,3,9,5,3]`  
Output: `3`  
*Explanation: For i=3,  
Left: (2+5+3+9) / 4 = 19/4 = 4  
Right: (5+3) / 2 = 8/2 = 4  
Difference = |4 - 4| = 0 (minimum possible)*

**Example 2:**  
Input: ``  
Output: `0`  
*Explanation: Only one element.  
Left average = 0, Right average = 0 (empty segment).  
|0 - 0| = 0*

**Example 3:**  
Input: `[4,2,0]`  
Output: `2`  
*Explanation:  
i=0: Left avg = 4, Right avg = (2+0)/2 = 1, diff = 3  
i=1: Left avg = (4+2)/2 = 3, Right avg = 0, diff = 3  
i=2: Left avg = (4+2+0)/3 = 2, Right = 0, diff = 2 (minimum)*


### Thought Process (as if you’re the interviewee)  

1. **Brute-force:**
   - For every index i, calculate the average of `nums[0..i]` and `nums[i+1..n-1]`.
   - Compute their absolute difference and track the index with the smallest value.
   - Each average would require summing segments repeatedly, leading to O(n²) time.

2. **Optimization with Prefix Sum:**
   - Precompute total sum of the array.
   - Loop through the array once, maintaining the running prefix sum.
   - At index i:
     - Left avg = prefix_sum // (i+1)
     - Right sum = total_sum - prefix_sum
     - Right avg = (right_sum // (n-i-1)), (if n-i-1 ≠ 0, else 0)
     - Track the minimum absolute difference and its index.
   - This brings time down to O(n) and space to O(1) if we do it in-place.

3. **Why finalize this approach:**
   - O(n) is the best possible. Avoids unnecessary computation.
   - Correctly handles edge cases (single element, empty right part).
   - Simple and robust for implementation.


### Corner cases to consider  
- Single element: ``, ``.
- All elements equal: `[3,3,3,3]`.
- Decreasing/increasing arrays.
- Large input size and large values (to check overflow).
- When multiple indices tie for minimum, return the smallest one.


### Solution

```python
def minimumAverageDifference(nums):
    n = len(nums)
    total_sum = sum(nums)
    prefix_sum = 0
    min_diff = float('inf')
    answer = -1

    for i in range(n):
        prefix_sum += nums[i]
        # Left average: floor division
        left_avg = prefix_sum // (i + 1)
        # Right average: if right is empty, avg = 0
        if i != n - 1:
            right_sum = total_sum - prefix_sum
            right_avg = right_sum // (n - i - 1)
        else:
            right_avg = 0

        diff = abs(left_avg - right_avg)
        if diff < min_diff:
            min_diff = diff
            answer = i

    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
    - Single pass for sum; single pass for checking differences.
- **Space Complexity:** O(1) (besides input array)
    - Only a few integer variables are used; no extra arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the **averages were not floored**, but floating-point?  
  *Hint: How would handling floating point errors or math.ceil/floor affect answer?*

- Can you solve this with **a single pass** instead of two (precompute sum and check differences)?  
  *Hint: Try accumulating running sums, and subtract from total as you proceed.*

- How would the solution change for a **circular array** (wraps around)?  
  *Hint: You might want to use prefix sum + modulo thinking*


### Summary
The problem leverages the **prefix sum** pattern. Calculating running segment sums on-the-fly reduces repeated work — allowing an O(n) approach. This style appears in many subarray average/difference split problems (like "partition array", "max diff between parts", etc.). Prefix sum tricks are broadly useful for any scenario involving repeated range-sum queries.

### Tags
Array(#array), Prefix Sum(#prefix-sum)

### Similar Problems
- Split Array With Same Average(split-array-with-same-average) (Hard)
- Number of Ways to Split Array(number-of-ways-to-split-array) (Medium)