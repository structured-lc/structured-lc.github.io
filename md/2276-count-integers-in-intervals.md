### Leetcode 2276 (Hard): Count Integers in Intervals [Practice](https://leetcode.com/problems/count-integers-in-intervals)

### Description  
You need to design a data structure that supports two types of operations:
- **add(left, right):** Add the closed interval [left, right] (all integers x such that left ≤ x ≤ right) to the structure. Intervals may overlap, and overlapping parts should not be double-counted.
- **count():** Return the total count of unique integers that are present in at least one added interval.

You must support many add and count operations efficiently, even if ranges are huge and/or intervals overlap or are nested.  
The challenge is to ensure every integer is counted only once, even if it’s covered by multiple overlapping intervals.

### Examples  

**Example 1:**  
Input:  
`CountIntervals()`  
`add(2, 5)`  
`count()`  
Output:  
`4`  
*Explanation: The interval [2,5] adds the numbers 2,3,4,5. Count returns 4.*

**Example 2:**  
Input:  
`CountIntervals()`  
`add(1, 3)`  
`add(5, 7)`  
`add(2, 6)`  
`count()`  
Output:  
`7`  
*Explanation:  
First add [1,3] → covered: {1,2,3}, count=3  
Second add [5,7] → covered: {1,2,3,5,6,7}, count=6  
Third add [2,6]: now [1,3], [5,7], [2,6] merged = [1,7], so all numbers 1..7 are covered, count=7.*

**Example 3:**  
Input:  
`CountIntervals()`  
`add(1, 1000000000)`  
`add(5, 6)`  
`count()`  
Output:  
`1000000000`  
*Explanation:  
First add [1,1000000000] covers all those numbers, so adding [5,6] does nothing new. Count returns 1,000,000,000.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Store all integers in a set, adding every integer in every add(left, right) operation. But this is infeasible for large intervals (ranges up to 1e9), both time and space-wise.

- **Improved idea:**  
  Maintain a sorted list or structure of the non-overlapping intervals.  
  - When adding a new interval, merge it into the list, combining any overlapping/adjacent intervals.
  - To count, sum the sizes of all current intervals.

- **Optimal solution:**  
  Use an ordered map or TreeMap (or in Python, use `SortedDict` from `sortedcontainers`, or simulated via `bisect`). Each key is the start of an interval, value is the end.  
    - For each add, merge all overlapping or adjacent intervals with [left, right].
    - Always keep intervals merged and non-overlapping.
    - Keep a global total `count` of the unique integers. When intervals merge, remove counts for existing intervals, add the merged interval’s length.

  Alternate advanced: Use a dynamic segment tree for gigantic ranges if we have many sparse operations, but in practice a sorted merging interval list suffices.

  The merge technique is relatively easy to code and very efficient in practice.

### Corner cases to consider  
- Adding intervals fully contained in an existing interval (should not double-count).
- Adding a large interval that swallows many existing intervals.
- Very first interval added (empty state).
- Single-point intervals (left==right).
- Adding intervals with left > right (invalid, depending on constraints).
- Massive intervals spanning billions of integers.
- Repeatedly adding the exact same interval.

### Solution

```python
# We'll use built-in bisect module + a custom interval list.
# This version does NOT use external libs like SortedContainers.

from bisect import bisect_left, bisect_right

class CountIntervals:
    def __init__(self):
        # list of intervals: each is [start, end], non-overlapping, sorted by start
        self.intervals = []
        self.total = 0  # total number of unique integers covered

    def add(self, left: int, right: int) -> None:
        # Find where to insert left and right
        # We'll find all intervals overlapping with [left, right]
        i = bisect_left(self.intervals, [left, -float('inf')])  # leftmost interval ending after left
        j = bisect_right(self.intervals, [right, float('inf')]) # rightmost interval starting before right

        # Expand merge boundaries
        merged_left, merged_right = left, right

        # Intervals to be merged are intervals[i:j]
        to_remove = []
        for k in range(i, j):
            s, e = self.intervals[k]
            merged_left = min(merged_left, s)
            merged_right = max(merged_right, e)
            self.total -= (e - s + 1)
            to_remove.append((s, e))

        # Remove merged intervals
        for (s, e) in to_remove:
            self.intervals.remove([s, e])

        # Insert the new merged interval
        # Keep the list sorted
        self.intervals.insert(bisect_left(self.intervals, [merged_left, merged_right]), [merged_left, merged_right])
        self.total += (merged_right - merged_left + 1)

    def count(self) -> int:
        return self.total
```

### Time and Space complexity Analysis  

- **Time Complexity:**
  - `add(left, right)`: O(n) in worst-case (because we may need to scan/merge up to all intervals and delete multiple intervals from the list), but with sparse intervals or small merges, it's close to O(log n) using bisect.
  - `count()`: O(1), as we always keep the unique total up to date.
- **Space Complexity:**
  - O(n), where n = number of non-overlapping intervals currently maintained. Each interval stored uses O(1) space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the interval endpoints and queries could be up to \(10^{18}\), but add() operations are very sparse?  
  *Hint: Consider a dynamic segment tree representation for extremely sparse usage.*

- How do you handle removing intervals or supporting range removal queries?
  *Hint: Reverse the merging logic, and split intervals as needed.*

- Can you support queries like “How many unique integers are present in [a, b]?” (range count queries) efficiently?
  *Hint: You’d need an interval tree or segment tree to quickly sum partial overlaps.*

### Summary
This problem uses the **interval merges and non-overlapping interval maintenance** coding pattern, commonly used in range interval problems like calendar booking, summary ranges, and merge intervals. Key skills are interval handling, sorted insertion, and efficient counting of non-overlapping coverage. The solution is highly reusable for other problems requiring merging and counting over large integer intervals.

### Tags
Design(#design), Segment Tree(#segment-tree), Ordered Set(#ordered-set)

### Similar Problems
- Merge Intervals(merge-intervals) (Medium)
- Insert Interval(insert-interval) (Medium)
- Data Stream as Disjoint Intervals(data-stream-as-disjoint-intervals) (Hard)
- My Calendar III(my-calendar-iii) (Hard)