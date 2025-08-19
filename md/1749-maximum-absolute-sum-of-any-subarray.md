### Leetcode 1749 (Medium): Maximum Absolute Sum of Any Subarray [Practice](https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray)

### Description  
Given an array of integers `nums`, find the **maximum absolute sum** of any subarray.  
A *subarray* is a contiguous subset of the array, and its sum is the sum of all elements within it.  
The *absolute sum* means if a subarray's sum is negative, consider its positive value (modulus).  
Your task: among all possible subarrays, return the largest value of `|sum(subarray)|`.  

### Examples  

**Example 1:**  
Input: `nums = [1, -3, 2, 3, -4]`  
Output: `5`  
Explanation:  
- The subarray `[2, 3]` has sum `5`; absolute sum is also `5`.  
- Subarray `[-3, 2, 3]` sums to `2`; `[-3, 2, 3, -4]` sums to `-2` (absolute value: `2`).
- The largest absolute sum is `5` for subarray `[2, 3]` or `[1, -3, 2, 3]`.

**Example 2:**  
Input: `nums = [2, -5, 1, -4, 3, 0]`  
Output: `8`  
Explanation:  
- Consider subarray `[2, -5, 1, -4]` which sums to `-6` (absolute `6`).
- Even better, subarray `[-5, 1, -4, 3]` sums to `-5` (absolute `5`), but the full subarray `[2, -5, 1, -4, 3, 0]` sums to `-3`.
- The best is subarray `[-5, 1, -4, 3, 0]` sum `-5`; but `[2, -5, 1, -4, 3]` sum `-3`;  
  Absolute max is `8` for subarray `[2, -5, 1, -4, 3]`.

**Example 3:**  
Input: `nums = [3, -1, -1, -1, 5]`  
Output: `7`  
Explanation:  
- Subarray `[3, -1, -1, -1, 5]` sum is `5`.  
- Subarray `[3, -1, -1, -1]` sum is `0`.  
- Subarray `[-1, -1, -1, 5]` sum is `2`.  
- Subarray `[3]` is `3`, `[5]` is `5`.  
- Subarray `[-1, -1, -1]` sum is `-3` (abs `3`).  
- The best is subarray `[3, -1, -1, -1, 5]`, from which max abs sum is `7` for `[3, -1, -1, -1, 5]`.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For every possible subarray, compute its sum and take absolute value; track the maximum.  
  Two nested loops: start index `i` from 0 to n-1, for each `i`, loop `j` from `i` to n-1.
  This method is O(n²) and too slow for large arrays.

- **Optimization:**  
  Use the idea that the maximum absolute subarray sum must either be:
  - the largest **positive** subarray sum,
  - or the largest (absolute value of) **negative** subarray sum.

  The largest positive subarray sum can be found using **Kadane's algorithm** (for max subarray sum).  
  To get the most negative (i.e. minimal) subarray sum, use Kadane's on `-nums` or just modify the algorithm to track minimum.

  Finally, answer is `max(max_sub_sum, abs(min_sub_sum))`.  
  This approach is O(n) and efficient.

### Corner cases to consider  
- Array with all positives (max sum = sum of whole array).
- Array with all negatives (max abs sum = |sum of whole array|).
- Array with one element (should work for n = 1).
- Array with zeros.
- Min/max subarray sum is 0 (all zeros or subarrays that sum to 0).
- Empty array (problem constraints: not allowed, but be wary).
- Alternating signs, e.g. `[1,-1,1,-1,...]`.

### Solution

```python
def max_absolute_sum(nums):
    # Current maximum and minimum subarray sums
    max_ending_here = 0
    min_ending_here = 0
    max_sum = 0
    min_sum = 0

    for num in nums:
        # Max subarray sum ending here -- standard Kadane's step
        max_ending_here = max(num, max_ending_here + num)
        max_sum = max(max_sum, max_ending_here)
        
        # Min subarray sum ending here -- invert Kadane's
        min_ending_here = min(num, min_ending_here + num)
        min_sum = min(min_sum, min_ending_here)
    
    # Return maximum absolute value among all possible subarray sums
    return max(max_sum, abs(min_sum))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of `nums`.  
  Walks array once, constant work per element.
- **Space Complexity:** O(1), only uses a fixed number of variables regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you modify this if asked for the indices or subarray itself, not just its sum?  
  *Hint: Track start and end indices while updating max/min.*

- What if elements can be very large (risk of overflow in some languages)?  
  *Hint: Consider integer overflow/underflow handling in languages like C++ or Java.*

- How would you adapt this approach for a circular array (the subarray can wrap around the end)?  
  *Hint: Think about combining Kadane’s for both non-wrap and wrap-around subarrays.*

### Summary
This problem is a direct modification of the **Maximum Subarray Sum** (Kadane’s algorithm) pattern.  
To solve, scan for both max and min subarray sums in one pass, then take the highest absolute value.  
This dual-Kadane trick appears in several problems dealing with ranges or circularity, and efficiently solves all absolute-sum questions for subarrays in O(n) time.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Maximum Subarray(maximum-subarray) (Medium)