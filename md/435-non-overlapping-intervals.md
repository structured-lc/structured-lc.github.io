### Leetcode 435 (Medium): Non-overlapping Intervals [Practice](https://leetcode.com/problems/non-overlapping-intervals)

### Description  
Given a collection of intervals where each interval has a **start** and an **end**, your task is to determine the **minimum number of intervals you need to remove** so that the remaining intervals are non-overlapping. Two intervals overlap if they share any portion of their ranges. The goal is to make all intervals in the result mutually non-overlapping with as few removals as possible.

### Examples  

**Example 1:**  
Input: `intervals = [[1,2],[2,3],[3,4],[1,3]]`  
Output: `1`  
*Explanation: Removing `[1,3]` leaves `[[1,2],[2,3],[3,4]]`, which do not overlap.*

**Example 2:**  
Input: `intervals = [[1,2],[1,2],[1,2]]`  
Output: `2`  
*Explanation: We need to remove any two intervals to have just one left with no overlap.*

**Example 3:**  
Input: `intervals = [[1,2],[2,3]]`  
Output: `0`  
*Explanation: Already non-overlapping: no removals are necessary.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try all possible combinations of removing intervals and check for non-overlapping sets. However, with n intervals, this approach is exponential (\(2^n\)) and infeasible for large input.

- **Optimization:**  
  The **greedy strategy** is to always keep the interval that ends first, which leaves more space for subsequent intervals and reduces chances of overlap.  
  1. Sort intervals by their **end value** in ascending order.
  2. Maintain a variable `end` to track the end of the last chosen (non-overlapping) interval.
  3. Iterate through the intervals:  
     - If current interval's start ≥ `end`, it does not overlap; include it, update `end`.
     - Else (they overlap), this interval must be removed: increment removal count.
  This approach minimizes removals because keeping the earliest finishing interval maximizes available space for others.

- **Trade-off:**  
  Sorting costs \(O(n \log n)\), but iteration is \(O(n)\), overall efficient.

### Corner cases to consider  
- Empty list: `[]` → Output: `0`
- Single interval: `[[x, y]]` → Output: `0` (nothing overlaps)
- All intervals completely overlap: need to remove all but one
- No intervals overlap from the start: output is `0`
- Intervals with same start or end time

### Solution

```python
def eraseOverlapIntervals(intervals):
    if not intervals:
        return 0

    # Sort intervals by their end times to maximize the count of non-overlapping intervals
    intervals.sort(key=lambda x: x[1])

    # `end` represents the end of the last included interval
    end = intervals[0][1]
    remove_count = 0

    # Start from the second interval
    for i in range(1, len(intervals)):
        # If current interval overlaps, remove it (increment count)
        if intervals[i][0] < end:
            remove_count += 1
        else:
            # No overlap, update end to current interval's end
            end = intervals[i][1]

    return remove_count
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  \(O(n \log n)\) due to sorting the intervals, plus \(O(n)\) for iteration, so overall \(O(n \log n)\).

- **Space Complexity:**  
  \(O(1)\) extra space (ignoring input), as only a few variables are used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to **return the intervals to be removed**, not just their count?  
  *Hint: Record indices or intervals during iteration when an overlap is found.*

- How would you **generalize this to higher dimensions**, e.g., 2D rectangles?  
  *Hint: Interval scheduling and intersection gets more complex in 2D or higher dimensions.*

- Can you solve this **without sorting** if intervals are already sorted by end time?  
  *Hint: You can skip the sort and proceed with the greedy selection directly.*

### Summary
This problem is a classic example of the **greedy interval scheduling** pattern: maximize the number of non-overlapping intervals (or minimize removals for non-overlap). The same pattern applies in scenarios like meeting room allocation, activity selection, and event scheduling. Key intuition: always keep intervals that finish earliest to maximize subsequent opportunities.