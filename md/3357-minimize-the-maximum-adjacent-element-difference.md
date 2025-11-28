### Leetcode 3357 (Hard): Minimize the Maximum Adjacent Element Difference [Practice](https://leetcode.com/problems/minimize-the-maximum-adjacent-element-difference)

### Description  
You’re given an array of integers `nums`, where some elements may be `-1` representing empty spots. You can replace every `-1` with any integer you choose. Your goal is to fill all the `-1`s so that the *maximum* absolute difference between any two adjacent elements is **minimized**. Return this minimum possible value.

### Examples  

**Example 1:**  
Input: `nums = [4, -1, -1, 10]`  
Output: `3`  
*Explanation:  
Replace `-1`s with `7` and `7` → `[4, 7, 7, 10]`. The adjacent differences are \|4−7\|=3, \|7−7\|=0, \|7−10\|=3. The maximum difference is 3, which is minimized.*

**Example 2:**  
Input: `nums = [-1, 3, -1]`  
Output: `0`  
*Explanation:  
Choose `3` for both `-1`s: `[3, 3, 3]`. All adjacent differences are 0.*

**Example 3:**  
Input: `nums = [-1, -1, -1]`  
Output: `0`  
*Explanation:  
All elements are `-1`, so choose any single number (e.g., `[7,7,7]`). Adjacent differences are 0, which is the smallest possible.*

### Thought Process (as if you’re the interviewee)  
1. **Brute-force:**  
   - Try all possible values for each `-1` and compute resulting maximum difference.  
   - Since the range of possible values is huge, this is infeasible.

2. **Optimization:**  
   - The answer is driven by “how small can we make the largest difference D after filling in the -1s?”.  
   - Binary search is a good fit to minimize the *maximum* of something over a set of choices.
   - If we can check, for a candidate D, whether it’s possible to fill in `-1`s such that all adjacent differences ≤ D, we can binary search for the minimal such D.

3. **How to check if a D is possible:**  
   - Identify all positions where `-1`s are adjacent to non-`-1`s. For each unknown that’s adjacent to a known, it must be within D of that known value.
   - Maintain the min and max possible value for all the `-1`s, by intersecting intervals derived from each non-`-1` neighbor.
   - After getting the intersection, choose a single value within this range to fill all `-1`s, ensuring max difference for all transitions is ≤ D.

4. **Binary Search:**  
   - Left (l) = 0, right (r) = the maximum range in nums (e.g., max - min of knowns, or up to 10⁹).
   - Use the helper check as above for each mid value.

5. **Edge cases:**  
   - No unknowns: the answer is max absolute diff in input.
   - All unknowns: answer is 0.

### Corner cases to consider  
- All elements are `-1`: answer is 0.
- No `-1`s: answer is maximal adjacent absolute diff.
- Consecutive blocks of `-1`s at start/end/middle.
- Single element array (with or without `-1`).
- All knowns are same value.

### Solution

```python
def minimizeMaxDiff(nums):
    n = len(nums)
    
    # Get all known numbers adjacent to -1s
    known_adj = []
    for i, v in enumerate(nums):
        if v == -1:
            if i > 0 and nums[i - 1] != -1:
                known_adj.append(nums[i - 1])
            if i < n - 1 and nums[i + 1] != -1:
                known_adj.append(nums[i + 1])
    
    if not known_adj:
        # No non--1 neighbors, so all numbers can be same
        return 0
    
    min_known = min(known_adj)
    max_known = max(known_adj)
    
    # The optimal fill value is between min_known and max_known,
    # Any D ≥ ⌈(max_known - min_known)/2⌉ works; D must also at least match the max diff between knowns.
    max_existing_gap = 0
    for i in range(1, n):
        if nums[i] != -1 and nums[i-1] != -1:
            max_existing_gap = max(max_existing_gap, abs(nums[i] - nums[i-1]))
    
    # D = max(ceiling((max_known - min_known)/2), max_existing_gap)
    best_D = max((max_known - min_known + 1) // 2, max_existing_gap)
    return best_D
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of nums.  
  We do one pass to collect relevant info, another pass to compute max gap, and constant extra work.
- **Space Complexity:** O(1) extra, apart from input; we only track min/max and a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the values to fill in must come from a given range [a, b]?  
  *Hint: Intersect all possible intervals for each -1 with [a, b], then choose within the overlap.*

- What if there are k different fill values and each `-1` can only be assigned one of them?  
  *Hint: Try all k options for each block, or DP.*

- How would this change if more than one value could be used to fill -1? (Not all -1s must be the same.)  
  *Hint: Still binary search D, but for each -1, track the feasible value interval.*

### Summary
We applied a “binary search on the answer”/“tightest interval” pattern, common for minimizing the maximal difference after filling gaps or assigning values while respecting adjacency constraints. Intervals are intersected to ensure all constraints are met, making the greedy fill optimal. This pattern is general for sequence adjustment under global-optimum and local-adjacency cost rules.


### Flashcard
Binary search on the maximum adjacent difference D; for each D, greedily fill −1s to check if it's achievable.

### Tags
Array(#array), Binary Search(#binary-search), Greedy(#greedy)

### Similar Problems
- Minimum Absolute Sum Difference(minimum-absolute-sum-difference) (Medium)
- Minimize the Maximum Adjacent Element Difference(minimize-the-maximum-adjacent-element-difference) (Hard)