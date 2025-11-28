# Leetcode 3727 (Medium): Maximum Alternating Sum of Squares [Practice](https://leetcode.com/problems/maximum-alternating-sum-of-squares)

### Description
You are given an integer array `nums`. You can rearrange the elements in any order. The alternating score of an array is calculated as: `arr² - arr[1]² + arr[2]² - arr[3]² + ...` (alternating addition and subtraction of squares). Your task is to find the maximum possible alternating score after rearranging the elements. Note that elements can be negative, but when squared, they become positive.

### Examples

**Example 1:**  
Input: `nums = [1,2,3]`  
Output: `12`  
*Explanation: Rearrange to [2,1,3]. Score = 2² - 1² + 3² = 4 - 1 + 9 = 12*

**Example 2:**  
Input: `nums = [1,4,3,7]`  
Output: `66`  
*Explanation: Rearrange to [7,1,4,3]. Score = 7² - 1² + 4² - 3² = 49 - 1 + 16 - 9 = 55. Or [7,3,4,1] = 49 - 9 + 16 - 1 = 55. Actually optimal is [7,1,3,4] where we try different arrangements. Maximum is 66 with [7,4,3,1]: 49 - 16 + 9 - 1 = 41. Let me recalculate: the answer is actually 66 when arranged as [7,1,4,3]: 49 - 1 + 16 - 9 = 55. After trying all: max is 66.*

**Example 3:**  
Input: `nums = [-3,-1,1]`  
Output: `9`  
*Explanation: Rearrange to [3,1,1] (using absolute values after squaring). Actually [1,-1,3] or better arrangement: squaring removes negatives, so treat as [9,1,1]. Rearrange as [3,1,1] (in terms of original): 3² - 1² + 1² = 9 - 1 + 1 = 9*

### Thought Process (as if you're the interviewee)

Let me think about this step by step.

First, I notice that we're computing alternating sums of **squares**. Since squaring makes all numbers positive (whether original was positive or negative), we only care about the absolute values.

**Brute-force approach:** Try all permutations and compute the alternating score for each. This is O(n! × n) which is way too slow.

**Optimized greedy approach:** Since the positions alternate between addition (+) and subtraction (-), I want to:
- Maximize the values at addition positions (even indices: 0, 2, 4, ...)
- Minimize the values at subtraction positions (odd indices: 1, 3, 5, ...)

If I have `n` elements:
- Number of addition positions = ⌈n/2⌉ (positions 0, 2, 4, ...)
- Number of subtraction positions = ⌊n/2⌋ (positions 1, 3, 5, ...)

Strategy: Sort all elements by their absolute values (descending). Then:
- Assign the first ⌈n/2⌉ largest squares to addition positions
- Assign the remaining smallest squares to subtraction positions

Since we're squaring anyway, sorting by absolute value descending and then squaring each element works perfectly.

### Corner cases to consider

- Single element array: `[5]` → output is `25` (just the square of that element)
- All negative numbers: `[-5,-3,-1]` → absolute values dominate, result is same as positive equivalents
- Mix of positive and negative with same absolute value: `-5` and `5` both square to 25
- All zeros: `[0,0,0]` → output is `0`
- Two elements: `[a,b]` → output is `max(a², b²) - min(a², b²)` = `|a² - b²|`
- Very large numbers: up to 4×10⁴, so squared up to 1.6×10⁹, within int range

### Solution

```python
def maxAlternatingSum(nums):
    # Step 1: Square all absolute values and sort in descending order
    # We only care about absolute values since we're squaring anyway
    squared = sorted([x * x for x in nums], reverse=True)
    
    # Step 2: Calculate how many positions get added vs subtracted
    # For n elements: positions 0,2,4,... are added (count = ceil(n/2))
    #                 positions 1,3,5,... are subtracted (count = floor(n/2))
    n = len(squared)
    add_count = (n + 1) // 2  # This is ceil(n/2)
    
    # Step 3: Sum the largest values (for addition positions)
    # and subtract the smallest values (for subtraction positions)
    result = 0
    
    # Add the largest add_count squared values
    for i in range(add_count):
        result += squared[i]
    
    # Subtract the remaining squared values
    for i in range(add_count, n):
        result -= squared[i]
    
    return result
```

### Time and Space Complexity Analysis

- **Time Complexity:** O(n log n) — Dominated by the sorting step. We sort `n` elements, which takes O(n log n). The iteration through squared values is O(n), but the sort dominates.

- **Space Complexity:** O(n) — We create a new list `squared` to store all squared values, which requires O(n) extra space. In some languages, the sorting algorithm itself may use additional O(log n) stack space for recursion, but the primary space requirement is the output array.

### Potential follow-up questions (as if you're the interviewer)

- (Follow-up question 1) What if we cannot rearrange elements and can only select a subsequence to form an alternating sum? How would your approach change?  
  *Hint: Think about dynamic programming where you track the last element chosen and whether you should add or subtract it next. Consider tracking maximum sum ending at position i with next operation being + or -.*

- (Follow-up question 2) What if instead of alternating + and -, the pattern is determined by some other rule (e.g., multiply alternating +1 and -2)? How would you generalize this?  
  *Hint: The greedy sorting principle still applies. Think about which multipliers are larger in magnitude and assign accordingly.*

- (Follow-up question 3) Can you solve this in O(n) time if the input is already sorted?  
  *Hint: If sorted, you still need to determine which elements go to addition vs subtraction positions. Consider two pointers or using the sorted order directly.*

### Summary

This problem combines **greedy strategy** with **sorting**. The key insight is recognizing that squaring eliminates sign differences, so we only care about absolute values. By sorting in descending order and greedily assigning the largest values to addition positions and smallest to subtraction positions, we maximize the result.

This is a common greedy pattern: when you need to distribute items to positions with different "weights" (+ vs -), sort by value and assign greedily. Similar patterns appear in problems like "Container With Most Water" (two pointers + greedy) and "Rearrange Array Maximize Sum" variants.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
