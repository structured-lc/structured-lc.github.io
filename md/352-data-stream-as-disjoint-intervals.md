### Leetcode 352 (Hard): Data Stream as Disjoint Intervals [Practice](https://leetcode.com/problems/data-stream-as-disjoint-intervals)

### Description  
You need to design a class, `SummaryRanges`, that keeps track of a stream of non-negative integers and summarizes the sequence as a sorted list of disjoint (non-overlapping, merged) intervals.  
- Any time a new number arrives, it should be merged into existing intervals if possible.
- At any moment you can query for all the current disjoint intervals (merged wherever the range is consecutive).

The two operations are:  
- `addNum(value)`: Add an integer to the stream.
- `getIntervals()`: Return the sorted list of merged intervals observed so far.

### Examples  

**Example 1:**  
Input:  
```
obj = SummaryRanges()
obj.addNum(1)
obj.getIntervals()
obj.addNum(3)
obj.getIntervals()
obj.addNum(7)
obj.getIntervals()
obj.addNum(2)
obj.getIntervals()
obj.addNum(6)
obj.getIntervals()
```
Output:  
```
[[1,1]]
[[1,1],[3,3]]
[[1,1],[3,3],[7,7]]
[[1,3],[7,7]]
[[1,3],[6,7]]
```
*Explanation: Numbers arrive in order: 1 → [1,1], 3 → [1,1],[3,3], 7 → [1,1],[3,3],[7,7]; adding 2 merges [1,1] and [3,3] into [1,3]; then adding 6 merges with [7,7] into [6,7].*

**Example 2:**  
Input:  
```
obj = SummaryRanges()
obj.addNum(5)
obj.addNum(6)
obj.addNum(7)
obj.getIntervals()
```
Output:  
```
[[5,7]]
```
*Explanation: All values are consecutive, so only one interval.*

**Example 3:**  
Input:  
```
obj = SummaryRanges()
obj.addNum(100)
obj.addNum(4)
obj.addNum(200)
obj.addNum(1)
obj.addNum(3)
obj.addNum(2)
obj.getIntervals()
```
Output:  
```
[[1,4],[100,100],[200,200]]
```
*Explanation: Values [1,2,3,4] merge into [1,4]; 100 and 200 stand alone.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach is to keep an unsorted list of all values, sort it, then scan and merge intervals whenever we call `getIntervals()`. But that's inefficient if there are many queries, since sorting is O(n log n) every time.

A better way is to **maintain the merged intervals as we insert**.  
- Store all current intervals in sorted order (by start).  
- On `addNum`, locate where the new number fits (which intervals it might touch/merge), either:  
  - It extends an existing interval,
  - It merges two intervals,
  - Or, it becomes a new interval by itself.
- Use a data structure with ordered keys (like `SortedList`, `bisect` arrays, or simulate a TreeMap).

This ensures we always maintain O(log k) insertions where k is the number of intervals, instead of O(n).

In Python (which lacks TreeMap), a self-managed list with binary search for the left/right boundaries is efficient, since the list is always sorted by interval start.

### Corner cases to consider  
- Empty input (no intervals)
- Adding duplicate values
- Numbers that fill a gap and connect two intervals (e.g., adding 4 to [1,3] and [5,7])
- Adding values smaller than all, or greater than all existing values
- Only one value in the stream
- Large numbers with big gaps between them

### Solution

```python
class SummaryRanges:
    def __init__(self):
        # Each element is [start, end], sorted by start
        self.intervals = []

    def addNum(self, value: int) -> None:
        # Easy binary search for the correct insert position
        intervals = self.intervals
        n = len(intervals)
        left, right = 0, n

        while left < right:
            mid = (left + right) // 2
            if intervals[mid][0] < value:
                left = mid + 1
            else:
                right = mid

        i = left

        # Check for possible merges with the left and right intervals
        new_start, new_end = value, value
        # Merge left if value is just after or inside left interval
        if i > 0 and intervals[i-1][1] + 1 >= value:
            i -= 1
            new_start = intervals[i][0]
            new_end = max(intervals[i][1], value)
            del intervals[i]
        # Merge right if value is just before right interval
        while i < len(intervals) and intervals[i][0] - 1 <= new_end:
            new_end = max(new_end, intervals[i][1])
            del intervals[i]

        # Insert new/merged interval back
        intervals.insert(i, [new_start, new_end])

    def getIntervals(self):
        return self.intervals
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `addNum`: O(k) in worst case (when merging lots of intervals); expected O(log k) usually due to binary search and at most merging two intervals.
  - `getIntervals`: O(k), where k is the number of disjoint intervals (just returns the list).
- **Space Complexity:**  
  - O(k), only stores the current non-overlapping intervals, not all numbers ever seen.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to support deletions from the data stream?  
  *Hint: Think about re-splitting intervals or marking as inactive.*

- How would you handle negative numbers or very large numbers in the stream?  
  *Hint: Does the data structure/general logic change?*

- Can you optimize for the case where intervals are huge, but merges are rare (e.g., sparse data)?  
  *Hint: Is another structure better than a list? Can you avoid O(k) insertion?*

### Summary
This problem uses the **interval merge** pattern and ordered data structures, such as binary search within a sorted list, to maintain a compact, always-updated set of merged disjoint intervals. This pattern is common in interval scheduling, calendar management, and range queries where endpoints may be dynamically inserted or merged.