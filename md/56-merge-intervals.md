### Leetcode 56 (Medium): Merge Intervals [Practice](https://leetcode.com/problems/merge-intervals)

### Description  
Given a collection of intervals, merge all overlapping intervals so that the result has only mutually exclusive intervals. Each interval is an array of two integers `[start, end]`, representing the start and end of an interval on the number line.  
For example, if you are given `[[1,3],[2,6],[8,10],[15,18]]`, you should merge intervals that overlap and return the non-overlapping intervals.

### Examples  

**Example 1:**  
Input: `[[1,3],[2,6],[8,10],[15,18]]`  
Output: `[[1,6],[8,10],[15,18]]`  
*Explanation: [1,3] and [2,6] overlap, so merge them into [1,6]. [8,10] and [15,18] do not overlap with others.*

**Example 2:**  
Input: `[[1,4],[4,5]]`  
Output: `[[1,5]]`  
*Explanation: [1,4] and [4,5] are adjacent (ending of the first is equal to starting of the next), so merge into [1,5].*

**Example 3:**  
Input: `[[1,4],[0,4]]`  
Output: `[[0,4]]`  
*Explanation: [1,4] and [0,4] overlap completely, so their union is [0,4].*

### Thought Process (as if you’re the interviewee)  

First, to merge overlapping intervals, two intervals overlap if the start of one is ≤ the end of another. An intuitive approach is:
- For each interval, compare with all others to check for overlaps and merge manually.  
  - This brute-force approach is O(n²), which is inefficient for large arrays.

To optimize, sort all intervals by their starting point. After sorting:
- Iterate through the intervals:
  - If the current interval starts after the end of the last merged interval, there is no overlap—just add it to the merged result.
  - If the current interval overlaps, update the last merged interval's ending boundary to max of its current ending and the current interval's ending.
  
Sorting helps ensure overlaps must be with a prior adjacent interval, not with intervals before it.
- Sorting: O(n log n)
- Linear merge scan: O(n)
Combined time: O(n log n) [optimal for this task][1][2][3].

### Corner cases to consider  
- Empty input array: Output should be []
- Only one interval: Result should be the same interval
- No intervals overlap: Result is the array itself
- All intervals overlap into one: Only one merged interval returned
- Adjacent intervals: e.g., [1,2],[2,3] should merge to [1,3]
- Intervals with same start or end values

### Solution

```python
def merge(intervals):
    # Edge case: empty input
    if not intervals:
        return []
    
    # Step 1: Sort intervals based on the start time
    intervals.sort(key=lambda x: x[0])
    
    # Step 2: Initialize the merged result with the first interval
    merged = [intervals[0]]
    
    # Step 3: Iterate over the remaining intervals
    for current in intervals[1:]:
        last = merged[-1]
        # If current interval starts after the last interval ends, append it (no overlap)
        if current[0] > last[1]:
            merged.append(current)
        else:
            # Overlap: merge the two by updating the end of the last interval
            last[1] = max(last[1], current[1])
    
    return merged
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is the number of intervals.  
  - Justification: Sorting the intervals takes O(n log n). The subsequent single pass through intervals takes O(n).
- **Space Complexity:** O(n) in the worst case, for storing the output merged list.  
  - The input may also be sorted in-place, but the resulting merged intervals may all be stored separately if no overlaps exist.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you cannot use extra space for the output (must merge in-place)?
  *Hint: Consider how to update the input array or use pointer techniques.*

- How would you handle intervals provided as a stream (i.e., one at a time, possibly out of order)?
  *Hint: Consider using trees or linked lists for online merging.*

- Modify the code to return the number of merged intervals, not the intervals themselves.
  *Hint: You can count directly as you merge, without storing intermediate arrays.*

### Summary
This problem uses a classic greedy and interval-merging pattern: sort by start, then iterate, merge overlapping intervals by expanding the current window’s right edge when possible. This is a common technique used in other merging and range queries, such as calendar bookings, interval coverage, and timeline processing.

### Tags
Array(#array), Sorting(#sorting)

### Similar Problems
- Insert Interval(insert-interval) (Medium)
- Meeting Rooms(meeting-rooms) (Easy)
- Meeting Rooms II(meeting-rooms-ii) (Medium)
- Teemo Attacking(teemo-attacking) (Easy)
- Add Bold Tag in String(add-bold-tag-in-string) (Medium)
- Range Module(range-module) (Hard)
- Employee Free Time(employee-free-time) (Hard)
- Partition Labels(partition-labels) (Medium)
- Interval List Intersections(interval-list-intersections) (Medium)
- Amount of New Area Painted Each Day(amount-of-new-area-painted-each-day) (Hard)
- Longest Substring of One Repeating Character(longest-substring-of-one-repeating-character) (Hard)
- Count Integers in Intervals(count-integers-in-intervals) (Hard)
- Divide Intervals Into Minimum Number of Groups(divide-intervals-into-minimum-number-of-groups) (Medium)
- Determine if Two Events Have Conflict(determine-if-two-events-have-conflict) (Easy)
- Count Ways to Group Overlapping Ranges(count-ways-to-group-overlapping-ranges) (Medium)
- Points That Intersect With Cars(points-that-intersect-with-cars) (Easy)
- Count Days Without Meetings(count-days-without-meetings) (Medium)
- Minimize Connected Groups by Inserting Interval(minimize-connected-groups-by-inserting-interval) (Medium)