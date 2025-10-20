### Leetcode 2780 (Medium): Minimum Index of a Valid Split [Practice](https://leetcode.com/problems/minimum-index-of-a-valid-split)

### Description  
Given an integer array `nums` containing exactly one dominant element (i.e., an element appearing more than half the time in the array), find the **smallest index** where you can split `nums` into two non-empty subarrays such that **both subarrays have the same dominant element** (the original dominant element). 
A dominant element `x` in an array of length `m` satisfies: count(x) × 2 > m.  
If no valid split exists, return `-1`.

### Examples  

**Example 1:**  
Input: `nums = [1,2,2,2]`  
Output: `2`  
*Explanation: Splitting at index 2 gives [1,2,2] and [2]. For [1,2,2], '2' occurs twice, 2×2 > 3. In [2], '2' occurs once, 1×2 > 1. Both have '2' as dominant.*

**Example 2:**  
Input: `nums = [2,1,3,1,1,1,7,1,2,1]`  
Output: `4`  
*Explanation: Split at index 4 gives [2,1,3,1,1] and [1,7,1,2,1]. In [2,1,3,1,1], '1' occurs 2×2=4 > 5. In [1,7,1,2,1], '1' occurs 3×2=6 > 5. Both have '1' as dominant.*

**Example 3:**  
Input: `nums = [2,2,1,2,2]`  
Output: `1`  
*Explanation: Split at index 1 gives [2,2] and [1,2,2]. In both, '2' appears more than half the times.*

### Thought Process (as if you’re the interviewee)  
First, understand we need the **smallest index** where both splits have the same dominant element as the original array.

- **Brute-force idea:** For each index i, check the left and right subarrays individually to see if both have the same dominant element. For each check, count the frequency of all elements. This approach is O(n²) and too slow for large arrays.

- **Optimization:** Since the dominant element is unique and guaranteed, and it must remain dominant in both subarrays, we only need to track its count as we iterate through the array:
  - Count total occurrences of the dominant element `x` in `nums`.
  - As we iterate, keep a running count of how many times we've seen `x` on the left.
    - For index `i`, check:
        - Is `x` dominant in `nums[0...i]`? (left_count × 2 > i + 1)
        - Is `x` dominant in `nums[i+1...n-1]`? ( (total_count - left_count) × 2 > n - i - 1 )
    - The first i that satisfies both criteria is our answer.

This approach is O(n) time, O(1) extra space (besides counters).

### Corner cases to consider  
- All elements are the same (dominant everywhere)
- Dominant element only occurs just enough to satisfy the > half constraint (minimal margin)
- Minimum length arrays (2 elements, must be split at 0)
- No valid split exists (e.g., dominant can only be dominant in the full array, not in subarrays)
- Elements other than the dominant

### Solution

```python
def minimumIndex(nums):
    # Step 1: Find the dominant element in nums
    n = len(nums)
    # First, count the frequency of each number
    freq = {}
    for x in nums:
        freq[x] = freq.get(x, 0) + 1
    # Dominant is the one with count > n // 2
    for key in freq:
        if freq[key] * 2 > n:
            dominant = key
            total_count = freq[key]
            break

    # Step 2: Walk through and track dominant count on left
    left_count = 0
    for i, x in enumerate(nums):
        if x == dominant:
            left_count += 1

        # Left subarray is nums[0:i+1], length i+1
        # Right subarray is nums[i+1:], length n-i-1
        if left_count * 2 > i + 1:
            if (total_count - left_count) * 2 > n - i - 1:
                return i
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  We scan once to count frequencies, then again to find the minimum split index.
- **Space Complexity:** O(1) auxiliary (dictionary for frequencies has limited number of keys, since only counting the most frequent element dominates).

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are two different elements both satisfying the dominance condition in some subarrays?
  *Hint: Consider how dominance is defined and is it possible given input guarantees?*

- How would you adapt this if "dominant" means "at least ⌊m/2⌋+1 times" (i.e., exactly half for even m is allowed)?
  *Hint: Change the strict inequality in the check.*

- Can you do this in a single pass without a frequency count map?
  *Hint: Moore's Voting Algorithm to find the candidate.*

### Summary
This problem uses the **prefix counting** and **dominant frequency check** pattern.  
The key insight is that, since there’s a unique guaranteed dominant, you only need to track it and its running frequency, not recalculate everything at every split.  
This optimized linear scan is common in problems about **majority elements** or **prefix/suffix frequency**, and similar ideas show up in vote-counting, subarray magic-split, and divide-and-conquer frequency problems.


### Flashcard
Track the dominant element and its counts on both sides as you iterate; return the smallest index where it remains dominant in both splits.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting)

### Similar Problems
- Majority Element(majority-element) (Easy)
- Partition Array into Disjoint Intervals(partition-array-into-disjoint-intervals) (Medium)