### Leetcode 1288 (Medium): Remove Covered Intervals [Practice](https://leetcode.com/problems/remove-covered-intervals)

### Description  
Given a list of intervals, remove all intervals that are **completely covered** by another interval. An interval `[a, b]` is covered by `[c, d]` if `c ≤ a` and `b ≤ d`.
Return the number of remaining intervals after removal.

### Examples  

**Example 1:**  
Input: `[[1,4],[3,6],[2,8]]`  
Output: `2`  
*Explanation: [1,4] is covered by [2,8], so remove it. Remaining: [3,6], [2,8].*

**Example 2:**  
Input: `[[1,4],[2,3]]`  
Output: `1`  
*Explanation: [2,3] is covered by [1,4]. Only [1,4] remains.*

**Example 3:**  
Input: `[[0,10],[5,12]]`  
Output: `2`  
*Explanation: No interval is covered by another, so both remain.*

### Thought Process (as if you’re the interviewee)  
To efficiently find and remove covered intervals, sort intervals first. If two intervals start at the same point, sort by decreasing end so the larger can cover the smaller.

After sorting, iterate and keep track of the maximum `end` seen so far. If an interval's end is less than or equal to the max end, it's covered. Otherwise, it's not covered and update max.

Sorting by (start asc, end desc) allows linear pass with O(1) memory after sort.

### Corner cases to consider  
- Overlaps but not covered
- Identical intervals
- One interval, no removal
- Nested covers chain

### Solution

```python
def removeCoveredIntervals(intervals):
    # Sort by start asc, then end desc
    intervals.sort(key=lambda x: (x[0], -x[1]))
    count = 0
    max_end = 0
    for start, end in intervals:
        if end > max_end:
            count += 1
            max_end = end  # Update max_end to current
        # else: covered, do not count
    return count
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log n) for sorting, O(n) for scan, so overall O(n log n).
- **Space Complexity:** O(1) extra, as only scalars are used.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you return the list of uncovered intervals instead of the count?  
  *Hint: Store intervals in a result list when not covered*

- How would this change if intervals could overlap but not fully cover?  
  *Hint: Think about tracking overlap logic instead of cover logic only*

- How to solve if intervals aren't sorted at all and can't be sorted due to constraints?  
  *Hint: Consider alternative interval tree or segment tree structures*

### Summary
This solution uses the **sort and linear scan/greedy** pattern, common for interval problems. This approach works for all cover/overlap/merge-type interview problems, provided some pre-sorting of intervals.

### Tags
Array(#array), Sorting(#sorting)

### Similar Problems
