### Leetcode 152 (Medium): Maximum Product Subarray [Practice](https://leetcode.com/problems/maximum-product-subarray)

### Description  
Given an integer array, find the contiguous subarray (containing at least one number) that has the largest product and return its product.  
The array can have positive, negative, and zero values.  
Contiguity is required; that is, only subarrays (not subsequences) are allowed.  
Negative numbers are tricky, because multiplying two negative numbers gives a positive, which might yield a higher product than multiplying positive numbers only.  
Example: With the array [-2, 3, -4], although the negatives break up the sequence, -2 × 3 × -4 = 24, which could be the answer.

### Examples  

**Example 1:**  
Input: `[2,3,-2,4]`,  
Output: `6`  
*Explanation: The subarray `[2,3]` yields the product 2 × 3 = 6. That's the largest possible.*

**Example 2:**  
Input: `[-2,0,-1]`,  
Output: `0`  
*Explanation: The largest product comes from the subarray ``, as the others yield -2 and -1 (not larger than zero).*

**Example 3:**  
Input: `[-2,3,-4]`,  
Output: `24`  
*Explanation: The subarray `[ -2, 3, -4 ]` yields -2 × 3 × -4 = 24. Multiplying two negatives flips the sign, which makes the largest product possible.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - Try every possible contiguous subarray, multiply the values, and track the largest product.  
  - This would be O(n²) time (nested loops for start and end indices), and is too slow for longer arrays.

- **Optimization:**  
  - The hard part is dealing with negative numbers. Multiplying by a negative can turn the smallest (most negative) product into the largest (most positive) product.
  - For each position, keep track of **both** the maximum and minimum product ending at that index:
    - Let `max_so_far` be the largest product ending at i.
    - Let `min_so_far` be the smallest product ending at i (in case a negative flips it).
    - At each step, update max/min by considering: the current number, current number × previous max, and current number × previous min.
    - Update a global `result` if `max_so_far` exceeds it on each step.
  - This is a classic sliding window + dynamic programming pattern, making it O(n) time, O(1) extra space.

### Corner cases to consider  
- Array contains only one element (positive, negative, or zero).
- Array contains all zeros.
- Array contains both large negatives and zeros.
- Array contains only negative elements with odd/even length.
- Array contains both positive and negative elements with zeros.
- Arrays with consecutive negatives, which could flip the sign twice.
- Extremely large or small products (check for integer overflow).

### Solution

```python
def maxProduct(nums):
    # Edge case: empty input array
    if not nums:
        return 0

    result = nums[0]
    max_prod = nums[0]
    min_prod = nums[0]

    # Iterate through the array, starting from the 1st index
    for i in range(1, len(nums)):
        num = nums[i]
        # If the current number is negative, swapping max and min
        # because multiplying by negative flips sign
        if num < 0:
            max_prod, min_prod = min_prod, max_prod

        # Either the current number itself OR extend previous subarray
        max_prod = max(num, max_prod * num)
        min_prod = min(num, min_prod * num)

        # Update result if max_prod is larger
        result = max(result, max_prod)

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we only loop through the array once, updating max/min for each position.
- **Space Complexity:** O(1), as we use only constant extra space (`result`, `max_prod`, `min_prod`), regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if zero is not allowed in the array?
  *Hint: Does your logic change when 0 can't break a subarray?*

- Can you return the actual subarray that yields the max product, not just the value?
  *Hint: Think about how to track start and end indices whenever you reset max_prod.*

- How would this algorithm change if the input was a 2D matrix (find max product in any subrectangle)?
  *Hint: Consider how max subarray sum is adapted to 2D, but watch for multiplying negatives and zeros.*

### Summary

This solution uses an optimized dynamic programming approach to track both the maximum and minimum products ending at each position, allowing for sign changes that come from negative numbers. The coding pattern is a "state-variable DP" or "sliding window DP," commonly used for interval/contiguous subarray problems.  
This pattern is also seen in Maximum Subarray (Kadane’s Algorithm), and any problems where local minima/maxima can 'flip' and affect global results due to sign changes (e.g., stock trading, profit/loss intervals, etc).


### Flashcard
Track both max and min products at each index since negatives can flip sign; update running max using these for O(n) time.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Maximum Subarray(maximum-subarray) (Medium)
- House Robber(house-robber) (Medium)
- Product of Array Except Self(product-of-array-except-self) (Medium)
- Maximum Product of Three Numbers(maximum-product-of-three-numbers) (Easy)
- Subarray Product Less Than K(subarray-product-less-than-k) (Medium)