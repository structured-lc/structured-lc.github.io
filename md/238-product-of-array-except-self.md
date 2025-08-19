### Leetcode 238 (Medium): Product of Array Except Self [Practice](https://leetcode.com/problems/product-of-array-except-self)

### Description  
Given an integer array `nums`, construct a new array where each element at index `i` is the product of all the numbers in `nums` except `nums[i]`, **without using division** and in **O(n)** time. The result must fit in a 32-bit integer, and you should ideally solve it using only constant extra space (beyond the output array).

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4]`,  
Output: `[24,12,8,6]`  
*Explanation: For each index:  
- 1: 2\*3\*4=24  
- 2: 1\*3\*4=12  
- 3: 1\*2\*4=8  
- 4: 1\*2\*3=6*

**Example 2:**  
Input: `nums = [2,3,4,5]`,  
Output: `[60,40,30,24]`  
*Explanation:  
- 2: 3\*4\*5=60  
- 3: 2\*4\*5=40  
- 4: 2\*3\*5=30  
- 5: 2\*3\*4=24*

**Example 3:**  
Input: `nums = [0,1,2,3]`,  
Output: `[6,0,0,0]`  
*Explanation: The product except index 0 is 1\*2\*3=6. For all other indices, zero is included in the product so the result is zero.*

### Thought Process (as if you’re the interviewee)  
- **Naive brute-force:** For each index, multiply all other elements, resulting in O(n²) time. This is too slow for large arrays and can be improved[2][1].
- **O(n) with division (NOT allowed):** Multiply all numbers. For each position, the result is `product/nums[i]`. **However, division is forbidden.**
- **Prefix/Suffix Product Approach:**  
  - Build an output array where for each position, you multiply:
    - The product of all numbers to the **left** of `i`.
    - The product of all numbers to the **right** of `i`.
  - You can do this in two passes:
    1. Go left-to-right, for each index store the product of all numbers to its left.
    2. Go right-to-left, multiply each entry by the product of all numbers to its right.
  - This approach achieves **O(n)** time and **O(1)** extra space (not counting the output array).

**Why this approach?**  
It avoids division, works for zeros, and is optimal for time and space.

### Corner cases to consider  
- Arrays containing zero(s) (single/multiple)
- All elements the same
- Only one element (should return `[1]`)
- Very large/small numbers (test for overflow, but the problem says it fits 32-bit int)
- Empty array (behavior can be defined as `[]`)
- Negative numbers

### Solution

```python
def productExceptSelf(nums):
    n = len(nums)
    output = [1] * n

    # Calculate prefix products
    prefix = 1
    for i in range(n):
        output[i] = prefix
        prefix *= nums[i]

    # Calculate suffix products and multiply
    suffix = 1
    for i in range(n - 1, -1, -1):
        output[i] *= suffix
        suffix *= nums[i]

    return output
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input. There are two passes: one for prefix products, one for suffix[1][4].
- **Space Complexity:** O(1) extra space (excluding the result array); we use only a few variables regardless of input size[4].

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array is extremely large (e.g., cannot fit into memory)?
  *Hint: Can you compute products in a streaming fashion—process subarrays and combine results?*

- How would you modify your approach if the array can contain more than one zero?
  *Hint: What happens to the product if multiple zeros are present?*

- Can you solve this problem for a circular array?
  *Hint: The products should "wrap around" the edges.*

### Summary
This uses the **prefix and suffix product pattern**, a fundamental approach whenever you need to compute aggregate results for each element while excluding the element itself. This "all except self" aggregate is common, and prefix/suffix techniques generalize to sums, min/max, logical AND/OR, and more. This problem reinforces **in-place array computation** and **constant-space pass** techniques.

### Tags
Array(#array), Prefix Sum(#prefix-sum)

### Similar Problems
- Trapping Rain Water(trapping-rain-water) (Hard)
- Maximum Product Subarray(maximum-product-subarray) (Medium)
- Paint House II(paint-house-ii) (Hard)
- Minimum Difference in Sums After Removal of Elements(minimum-difference-in-sums-after-removal-of-elements) (Hard)
- Construct Product Matrix(construct-product-matrix) (Medium)
- Find Sum of Array Product of Magical Sequences(find-sum-of-array-product-of-magical-sequences) (Hard)