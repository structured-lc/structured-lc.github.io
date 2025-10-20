### Leetcode 252 (Easy): Meeting Rooms [Practice](https://leetcode.com/problems/meeting-rooms)

### Description  
You are given an array of meeting time intervals where each interval is represented as `[start, end]`. Determine if a person can attend **all meetings**; that is, there should not be any overlapping meetings. If any two meetings overlap (one starts before another ends), then the answer is `False`. Otherwise, return `True`.

### Examples  

**Example 1:**  
Input: `[[0,30],[5,10],[15,20]]`  
Output: `False`  
*Explanation: The meeting at [5,10] overlaps with [0,30]. So, the person cannot attend both meetings.*

**Example 2:**  
Input: `[[7,10],[2,4]]`  
Output: `True`  
*Explanation: The meetings [2,4] and [7,10] do not overlap and can both be attended.*

**Example 3:**  
Input: `[[0,3],[5,10],[15,20]]`  
Output: `True`  
*Explanation: All meetings are sequential and non-overlapping.*

### Thought Process (as if you’re the interviewee)  
- First, let’s clarify: Overlap means if one meeting starts before the previous one ends, there’s a conflict.
- **Brute-force approach:** For every pair of intervals, check if they overlap. This would require two nested loops and runs in O(n²), which is inefficient for large input.
- **Optimized approach:** Realize that you only need to compare adjacent intervals *if sorted by start time*. So, sort the list of intervals by their start time and check if any interval’s start is **less** than the previous interval’s end. If so, return False as there is an overlap. This approach improves our time complexity since sorting dominates at O(n log n) and the rest is just one linear pass.
- **Why this works:** After sorting, any potential conflicts are now next to each other, so only adjacent intervals need to be checked rather than all pairs.
- **Trade-offs:** Sorting adds overhead, but it’s necessary to ensure we check all possible overlaps efficiently and not miss any pair.

### Corner cases to consider  
- Empty interval list: Should return True (no meetings, so no overlap).
- Single meeting: Should return True (no other meeting to overlap with).
- Intervals with same start or end times.
- Intervals that touch at endpoints: [1,2] and [2,3] (should not be considered overlap).
- Large intervals completely containing others: [1,10], [2,3].
- Unsorted input.

### Solution

```python
def canAttendMeetings(intervals):
    # No meetings means no conflicts
    if not intervals:
        return True
    
    # Sort intervals by start time
    intervals.sort(key=lambda x: x[0])
    
    # Check each interval with the one before it after sorting
    for i in range(1, len(intervals)):
        # If previous meeting ends after the current one starts, there's an overlap
        if intervals[i][0] < intervals[i-1][1]:
            return False
    
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) due to the sorting step; the subsequent pass is O(n).
- **Space Complexity:** O(1) extra space if sorting in-place, otherwise O(n) if you need to allocate extra space for sorting.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the intervals are extremely large—can you do this without sorting?
  *Hint: Think about constraints—are input intervals already sorted? If sorted, you could skip sorting and optimize further.*
- **How would you handle allocating meeting rooms for all meetings (number of rooms needed)?**
  *Hint: This is a common follow-up (Leetcode 253), often solved with a min-heap.*
- **Suppose meetings arrive one by one in a stream—can you still detect overlap?**
  *Hint: Maintaining a running sorted list or a heap of current meetings may be necessary.*

### Summary
This problem uses the **Intervals & Sorting** pattern, which appears frequently in scheduling and calendar problems (e.g., Meeting Rooms II, Merge Intervals, Insert Interval). Sorting the intervals upfront simplifies overlap detection and brings the problem to a single pass. This method is efficient, robust, and commonly used for interval overlap checks.


### Flashcard
Meeting Rooms

### Tags
Array(#array), Sorting(#sorting)

### Similar Problems
- Merge Intervals(merge-intervals) (Medium)
- Meeting Rooms II(meeting-rooms-ii) (Medium)
- Meeting Rooms III(meeting-rooms-iii) (Hard)
- Points That Intersect With Cars(points-that-intersect-with-cars) (Easy)