### Leetcode 1567 (Medium): Maximum Length of Subarray With Positive Product [Practice](https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product)

### Description  
Given an array of integers, find the length of the longest contiguous subarray where the product of all its elements is positive. The elements can be negative, zero, or positive, and zeros split the array (since multiplying by zero restarts the product at zero). For each subarray, count only if the product (after multiplying all elements) is strictly greater than zero.

### Examples  

**Example 1:**  
Input: `[1, -2, -3, 4]`  
Output: `4`  
*Explanation: The entire array [1, -2, -3, 4] has a product of 1 × -2 × -3 × 4 = 24, which is positive. So the maximal length is 4.*

**Example 2:**  
Input: `[0, 1, -2, -3, -4]`  
Output: `3`  
*Explanation: Ignore the subarray before the 0. The subarray [1, -2, -3] (indices 1 to 3) has product 1 × -2 × -3 = 6 (positive), length 3. The subarray [-2, -3, -4] has negative product. The longest valid subarray is length 3.*

**Example 3:**  
Input: `[-1, -2, -3, 0, 1]`  
Output: `2`  
*Explanation: The longest subarray with a positive product after the 0 is [1], but before the 0, [-1, -2] (indices 0,1) and [-2, -3] (indices 1,2) both have positive product, but their lengths are 2, so the answer is 2.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**:  
  For every subarray (all possible start and end indices), compute the product. Record the lengths where the product is positive. This takes O(n²) time and is not efficient for large input.

- **Optimized idea**:  
  Notice that multiplying by zero resets any subarray.  
  For non-zero segments, the product is positive if there is an even number of negative numbers.  
  We can iterate through the array, tracking:
    - `pos`: Length of the current subarray ending at i with positive product.
    - `neg`: Length of the current subarray ending at i with negative product.
  
  At each element:
    - If `nums[i] == 0`, reset both `pos` and `neg` to 0.
    - If positive, increment `pos` by 1; if `neg` > 0, also increment `neg` by 1.
    - If negative, swap `pos` and `neg`, then increment:
      1. If swapped `pos` > 0, `pos = neg + 1`; else `pos = 0`.
      2. `neg = old_pos + 1`.
    - Keep updating the result with the maximum `pos`.
  This greedy O(n) approach lets us avoid checking every subarray explicitly.

- I choose the final approach because it is optimal for both time (O(n)) and space (O(1) if we only store the lengths and a result).

### Corner cases to consider  
- All elements are zero.
- No positive product exists (e.g., only zeros or single negatives).
- Array contains only one element (positive, negative, or zero).
- Multiple zeros that split the array into segments.
- Arrays with all positive numbers.
- Arrays with all negatives, even or odd length.

### Solution

```python
def getMaxLen(nums):
    # pos: length of subarray ending here with positive product
    # neg: length of subarray ending here with negative product
    pos = neg = result = 0

    for num in nums:
        if num == 0:
            # Zero resets subarray
            pos = 0
            neg = 0
        elif num > 0:
            # Positive number extends positive subarray
            pos += 1
            # Negative subarray extends if it exists
            neg = neg + 1 if neg > 0 else 0
        else:
            # num < 0, swap pos and neg because sign reverses
            pos, neg = neg, pos
            # Positive subarray only extends if there was a negative before
            pos = pos + 1 if pos > 0 else 0
            # Negative subarray always extends by including this negative
            neg = neg + 1
        # Track max positive subarray length
        result = max(result, pos)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We make a single pass through the array, updating counts for each element.
- **Space Complexity:** O(1) — Only a few variables are used regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we need to return the actual subarray, not just its length?  
  *Hint: Store start indices or track the current valid window as you iterate.*

- How do you modify the solution if you want the maximum product itself, not just positive?  
  *Hint: Consider dynamic programming with tracking both max and min products at each step (like Maximum Product Subarray).*

- Can this be solved in parallel for large arrays?  
  *Hint: Consider segment boundaries (zeros) and merge the results from different segments.*

### Summary
This problem uses the **prefix dynamic state & greedy** sliding segment pattern. It efficiently tracks the length of valid subarrays, leveraging properties of products and the effect of zeros and negatives. This pattern is recurring in problems involving subarrays with certain sign or value properties, and relates to variations like Maximum Product Subarray. The state swap and update logic is commonly useful whenever an operation (like negation) inverts the "goodness" of a running segment.


### Flashcard
Track positive/negative subarray lengths separately; reset at zeros; positive if even count of negatives, swap lengths when encountering negative number.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Greedy(#greedy)

### Similar Problems
