# Leetcode 3724 (Medium): Minimum Operations to Transform Array [Practice](https://leetcode.com/problems/minimum-operations-to-transform-array)

### Description

You have two arrays `nums1` and `nums2` of the same length. You want to transform `nums1` into `nums2` using the minimum number of operations. In each operation, you can:
1. Choose an index `i` and increase or decrease `nums1[i]` by 1
2. Choose an index `i` and append `nums1[i]` to the end of the array

The goal is to make `nums1` identical to `nums2` with the minimum total operations.

### Examples

**Example 1:**  
Input: `nums1 = [3, 5, 1, 2], nums2 = [4, 5, 2, 2]`  
Output: `5`  
*Explanation: Increase nums1 by 1 (op 1), keep nums1[1] same (op 0), increase nums1[2] by 1 (op 1), keep nums1[3] same (op 0). Total = 2 operations to match first 4 elements. Then append one element (op 1). Total = 3 operations.*

**Example 2:**  
Input: `nums1 = [1, 0, 0, 0, 0, 0], nums2 = [0, 0, 0, 0, 0, 0]`  
Output: `6`  
*Explanation: Decrease nums1 by 1 (op 1), and 5 no-ops for other elements. Then we must append one element. Total = 6 operations.*

**Example 3:**  
Input: `nums1 = [3, 4, 5], nums2 = [3, 4, 5]`  
Output: `1`  
*Explanation: Arrays are already equal. We still must append one element to finish. Total = 1 operation.*

### Thought Process (as if you're the interviewee)

The key insight is that we must process elements from `nums1` to `nums2`. For each element, we calculate the cost (number of +1 or -1 operations) to transform it. However, the challenge is deciding which element to append at the end.

**Brute-force approach:** Try appending each element from the original `nums1` and calculate the total cost for each scenario, then pick the minimum.

**Optimization:** 
- For each position `i` in `nums1`, we have two choices:
  1. Don't use this element as the appended element → cost is |nums1[i] - nums2[i]|
  2. Use this element as the appended element → we need to transform it to a "median" value that minimizes total operations

When we append an element at position `i`, it becomes the last element. We need to account for the cost of transforming all previous elements, plus the cost of transforming element `i` to match the appended value.

The final answer is the sum of absolute differences of all elements, plus 1 for the append operation, plus the minimum "extra cost" of choosing which element to append.

### Corner cases to consider

- All elements are already equal between `nums1` and `nums2` → still need 1 operation (append)
- Single element arrays → must still append that element
- Large differences between `nums1[i]` and `nums2[i]` → costs accumulate quickly
- Negative differences (decreasing values) → absolute value handles this
- All elements need to be transformed significantly → pick the one with smallest transformation cost

### Solution

```python
def minimumOperations(nums1, nums2):
    n = len(nums1)
    
    # Calculate base cost: sum of absolute differences
    # This is mandatory regardless of which element we append
    base_cost = 0
    for i in range(n):
        base_cost += abs(nums1[i] - nums2[i])
    
    # If arrays are already equal, we still need 1 operation (append)
    if base_cost == 0:
        return 1
    
    # For each position i, calculate the extra cost if we append nums1[i]
    # Extra cost = |nums1[i] - nums2[i]| (since we need to transform nums1[i]
    # to match some appended value, but the difference is already in base_cost)
    
    # The optimal strategy: append the element that has the minimum 
    # absolute difference with its target
    min_extra_cost = float('inf')
    
    for i in range(n):
        # If we append nums1[i], the extra operations needed beyond
        # the base transformation is the cost at position i itself
        extra_cost = abs(nums1[i] - nums2[i])
        min_extra_cost = min(min_extra_cost, extra_cost)
    
    # Total = base cost + 1 (for append) + min_extra_cost
    # Wait, we need to reconsider: the base_cost already includes
    # the transformation at position i. If we append nums1[i],
    # we subtract that from base_cost and add the transformation
    # to the appended value.
    
    # Correct approach:
    # Total cost = sum of all |nums1[i] - nums2[i]| + 1 (append)
    #            + min over all i of (extra operations if we pick i as append)
    
    # When we append nums1[i], we're essentially saying:
    # transform nums1[i] to nums2[i] with the normal cost,
    # then append it (1 operation)
    # The minimum extra comes from picking the element closest to its target
    
    return base_cost + 1 + min_extra_cost
```

Wait, let me reconsider the logic based on the problem description. After reviewing, the correct approach is:

```python
def minimumOperations(nums1, nums2):
    n = len(nums1)
    
    # Calculate the baseline cost: sum of absolute differences
    # to transform all elements from nums1 to nums2
    baseline_cost = sum(abs(nums1[i] - nums2[i]) for i in range(n))
    
    # We must append one element, so at minimum +1 operation
    # The question is: which element gives us the minimum total?
    
    # For each element, if we append it, we need extra operations
    # beyond the baseline. The extra operations come from the
    # difference between the element's value and target.
    
    # Minimum extra cost is choosing the element with smallest
    # absolute difference (closest to its target value)
    min_extra = min(abs(nums1[i] - nums2[i]) for i in range(n))
    
    return baseline_cost + 1 + min_extra
```

### Time and Space Complexity Analysis

- **Time Complexity:** O(n), where n is the length of the arrays. We iterate through the array once to calculate the sum of absolute differences, and once more to find the minimum difference.

- **Space Complexity:** O(1). We only use a constant amount of extra space for variables storing the baseline cost and minimum extra cost. The input arrays are not counted as extra space.

### Potential follow-up questions (as if you're the interviewer)

- (Follow-up question 1) What if we can append any value (not just from nums1)?  
  *Hint: Consider the median of differences; think about how appending an arbitrary value changes the optimization.*

- (Follow-up question 2) What if we can perform multiple appends (multiple operations of appending)?  
  *Hint: How would you distribute the transformation cost across multiple appends? Would greedy still work?*

- (Follow-up question 3) What if the cost of incrementing/decrementing varies per element?  
  *Hint: Modify the cost calculation accordingly; the overall structure remains similar.*

### Summary

This problem combines **arithmetic optimization** with **greedy selection**. The key insight is that we must incur all transformation costs plus 1 for appending. The strategy is to find which element, when appended, minimizes the total operations. We calculate the baseline cost (sum of absolute differences), then add 1 for the mandatory append operation, plus the minimum additional cost (smallest absolute difference among all elements). This is a classic problem demonstrating how constraints force us into a greedy choice that's optimal. Similar patterns appear in problems involving array transformation with mandatory operations.


### Flashcard
For each element in nums1, calculate the cost to transform it to the corresponding target value; try each element as the appended value and pick the minimum total cost.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
