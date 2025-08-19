### Leetcode 2708 (Medium): Maximum Strength of a Group [Practice](https://leetcode.com/problems/maximum-strength-of-a-group)

### Description  
You are given a 0-indexed integer array `nums`, representing the scores of students in an exam. The "strength" of a group is defined as the product of the scores for any non-empty subset of `nums`. Your task is to select at least one student (subset of size ≥ 1) such that the product of their scores is **maximized**, and return that value.

### Examples  

**Example 1:**  
Input: `nums = [3,-1,-5,2,5,-9]`  
Output: `1350`  
*Explanation: Choose indices [0,2,3,4,5]: product is 3 × (−5) × 2 × 5 × (−9) = 1350 (which is maximal).*

**Example 2:**  
Input: `nums = [-4,-5,-4]`  
Output: `20`  
*Explanation: Pick indices [0,1]: (−4) × (−5) = 20 (which is maximal). Adding another negative would reduce the product.*

**Example 3:**  
Input: `nums = [0,7]`  
Output: `7`  
*Explanation: Either pick [1] (which is 7), or [0,1] (0). The maximal is 7.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force**: Try every possible non-empty subset of `nums` and compute the product for each. For `n` elements, there are 2ⁿ − 1 possible non-empty subsets. This is feasible only when `n` is very small (constraint here: n ≤ 13, so up to ~8,000 subsets).

- **Optimizing**:
    - Negative numbers: Even count of negatives gives a positive product, odd count gives negative.
    - Zeros: Including zero will cause the product to be zero.
    - To maximize product:
        - Use all non-zero numbers if there are even number of negatives.
        - If odd negatives, exclude the one with the smallest absolute value (the "least negative" number).
        - If all numbers are zeros, answer is 0.
        - If only one negative and zeros, consider picking the negative alone.
        - If all numbers are negative, pick one or all negatives (even number if possible).
    - Special care for single-element arrays.

- **Trade-offs**: Since n is small, brute-force is okay, but a greedy-style approach is faster and clearer. I would count negatives, multiply positives, and decide which negative (if any) to drop.

### Corner cases to consider  
- All zeros: `[0,0,0]`
- Only one negative: `[-3]`
- Mix of negatives and zeros: `[-2,0]`
- All positives: `[2,3,5]`
- Odd number of negatives, with/without zeros
- Only one element in the array
- All elements are negative and their count is odd/even

### Solution

```python
def maxStrength(nums):
    # Remove all zeros since they will zero out the product
    non_zero = [x for x in nums if x != 0]

    # Edge case: if only one element, return it
    if len(nums) == 1:
        return nums[0]

    # If no non-zero elements, must return 0 (all zeros)
    if not non_zero:
        return 0

    negatives = [x for x in non_zero if x < 0]
    positives = [x for x in non_zero if x > 0]
    
    # If odd number of negatives, drop the largest (least negative)
    if len(negatives) % 2 == 1:
        # Drop the negative with the smallest absolute value (i.e., largest among negatives)
        drop = max(negatives)
        non_zero.remove(drop)

    # If after dropping, nothing left (only negative and zeros), pick the max element
    if not non_zero:
        # There must have been at least one zero in nums, so best you can do is 0 or the least negative
        return 0 if 0 in nums else max(nums)

    # Multiply all remaining numbers
    result = 1
    for x in non_zero:
        result *= x
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of `nums`. Each number is processed at most a couple of times: filtering, splitting into positives/negatives, product calculation.
- **Space Complexity:** O(n) in the worst case (for storing filtered lists). No extra space is used for recursion or complex data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if `nums` can be of any size up to 10⁵ – how would you handle performance?
  *Hint: You can't enumerate all subsets; must use the greedy logic based on analysis of signs and zeros.*

- If you are allowed to remove at most one element, does the answer change compared to maximizing the product as before?
  *Hint: Yes, could be useful to drop a single negative in some distributions.*

- Can you compute the number of different groups (subsets) that achieve the maximum product?
  *Hint: Consider duplicates and which subsets lead to the same product.*

### Summary
This problem uses the classical "maximum product subset" pattern, balancing positive, negative, and zero elements. It's related to the greedy-logic problems about maximizing or minimizing products in arrays with both signs. The key is to consider sign parity and avoid zeroing products unless forced. This approach is common in problems like finding the maximum product of a subset or subarray, often appearing in interview settings.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Backtracking(#backtracking), Greedy(#greedy), Bit Manipulation(#bit-manipulation), Sorting(#sorting), Enumeration(#enumeration)

### Similar Problems
- Maximum Strength of K Disjoint Subarrays(maximum-strength-of-k-disjoint-subarrays) (Hard)