### Leetcode 715 (Hard): Range Module [Practice](https://leetcode.com/problems/range-module)

### Description  
Design a data structure to track ranges of numbers as half-open intervals [left, right). You need to efficiently support:
- **addRange(left, right):** Add the interval [left, right) — merging overlapping/adjacent intervals.
- **removeRange(left, right):** Remove all numbers in [left, right) — splitting existing intervals if necessary.
- **queryRange(left, right):** Return True if every number in [left, right) is covered by at least one existing range, else False.

Key challenges:
- Ranges can be extremely large (up to 10⁹).
- Up to 10⁴ operations.
- Efficient merge, split, and query for interval containment.

### Examples  

**Example 1:**  
Input:  
```
["RangeModule","addRange","removeRange","queryRange","queryRange","queryRange"]
[[],          [10,20],     [14,16],         [10,14],      [13,15],     [16,17]]
```
Output:  
```
[null,null,null,true,false,true]
```
Explanation:  
addRange(10,20): adds [10,20)  
removeRange(14,16): splits to [10,14) and [16,20)  
queryRange(10,14): True — [10,14) is covered  
queryRange(13,15): False — 14 is *not* covered  
queryRange(16,17): True — [16,17) is covered

**Example 2:**  
Input:  
```
["RangeModule", "addRange", "removeRange", "queryRange"]
[[], [5,10], [6,7], [5,10]]
```
Output:  
```
[null, null, null, false]
```
Explanation:  
addRange(5,10): adds [5,10)  
removeRange(6,7): leaves [5,6) and [7,10)  
queryRange(5,10): False — gap at [6,7), so not fully covered

**Example 3:**  
Input:  
```
["RangeModule", "addRange", "addRange", "queryRange", "removeRange", "queryRange"]
[[], [1,5], [5,10], [1,10], [3,8], [1,10]]
```
Output:  
```
[null, null, null, true, null, false]
```
Explanation:  
addRange(1,5): adds [1,5)  
addRange(5,10): merge to [1,10)  
queryRange(1,10): True  
removeRange(3,8): splits into [1,3), [8,10)  
queryRange(1,10): False

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Could track every individual element with a set, adding/removing as per operation. This is infeasible for huge ranges (up to 10⁹).

- **Optimized:**  
  Store intervals as a sorted list of non-overlapping intervals.  
  - For **addRange**: Merge with overlapping/adjacent intervals.
  - For **queryRange**: Check if [left, right) is within any interval.
  - For **removeRange**: Remove, split if necessary.

  Use binary search to quickly find affected intervals for each operation.  
  When adding, merge intervals that overlap or touch.  
  Removing may split intervals.  
  Querying simply verifies if a single interval covers the query.

- **Why not Segment Tree?**  
  For very large coordinate ranges and relatively few operations, explicit interval management is easier and more space-efficient than classic segment tree.

### Corner cases to consider  
- Remove or query a range that does not overlap anything.
- Add or remove that starts or ends inside an interval.
- Remove splitting an interval into two ("inside" remove).
- Query a completely uncovered interval.
- Adding two adjacent ranges.
- Left/right equal or outside of all intervals.

### Solution

```python
class RangeModule:

    def __init__(self):
        # Store intervals as a sorted list of [start, end)
        self.intervals = []

    def addRange(self, left: int, right: int) -> None:
        res = []
        placed = False
        for l, r in self.intervals:
            if r < left:
                res.append([l, r])
            elif right < l:
                if not placed:
                    res.append([left, right])
                    placed = True
                res.append([l, r])
            else:
                # Overlapping intervals; merge
                left = min(left, l)
                right = max(right, r)
        if not placed:
            res.append([left, right])
        self.intervals = res

    def queryRange(self, left: int, right: int) -> bool:
        # Binary search to find if [left, right) is fully inside some [l, r)
        from bisect import bisect_right
        idx = bisect_right(self.intervals, [left, float('inf')])
        if idx == 0:
            return False
        l, r = self.intervals[idx-1]
        return l <= left and right <= r

    def removeRange(self, left: int, right: int) -> None:
        res = []
        for l, r in self.intervals:
            if r <= left or l >= right:
                res.append([l, r])
            else:
                # Non-trivial removal, may need to split
                if l < left:
                    res.append([l, left])
                if r > right:
                    res.append([right, r])
        self.intervals = res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Each operation is O(n), where n is the number of stored intervals (worst case). Binary search cuts queryRange to O(log n). For up to 1e4 intervals, this is efficient.

- **Space Complexity:**  
  O(n) intervals stored, where n is the number of non-overlapping intervals in use (never exceeds the operation count, so O(ops)).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle much more frequent updates (say, 10⁷ operations)?
  *Hint: Can you make use of lazy propagation or a dynamic segment tree?*

- How would you optimize space if most of the range is covered?
  *Hint: Consider implicit data structures or using intervals only for uncovered gaps.*

- Can you make everything thread-safe for concurrent operations?
  *Hint: Use locks or concurrent data structures when modifying interval storage.*

### Summary
This problem uses the **interval merging pattern**, maintaining a sorted list of intervals and modifying/removing efficiently. It's a classic approach for **range manipulation**, overlap problems, memory segments, and is commonly seen in interval scheduling and sweep line algorithms.

### Tags
Design(#design), Segment Tree(#segment-tree), Ordered Set(#ordered-set)

### Similar Problems
- Merge Intervals(merge-intervals) (Medium)
- Insert Interval(insert-interval) (Medium)
- Data Stream as Disjoint Intervals(data-stream-as-disjoint-intervals) (Hard)