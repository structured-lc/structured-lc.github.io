### Leetcode 57 (Medium): Insert Interval [Practice](https://leetcode.com/problems/insert-interval)

### Description  
Given a **sorted list of non-overlapping intervals** (each interval in the format `[start, end]`) and a separate `newInterval` to insert, return a new list where:
- The list remains **sorted**.
- There are **no overlapping intervals**—merge intervals as needed.

*Example:*
If the list is `[[1,3],[6,9]]` and newInterval is `[2,5]`, you need to combine/merge all overlapping intervals (here `[1,3]` and `[2,5]` overlap and thus should be merged into `[1,5]`).

### Examples  

**Example 1:**  
Input: `intervals = [[1,3],[6,9]]`, `newInterval = [2,5]`  
Output: `[[1,5],[6,9]]`  
*Explanation: `[1,3]` and `[2,5]` overlap to form `[1,5]`; `[6,9]` does not overlap, so it stays as is.*

**Example 2:**  
Input: `intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]]`, `newInterval = [4,8]`  
Output: `[[1,2],[3,10],[12,16]]`  
*Explanation: `[3,5]`, `[6,7]`, and `[8,10]` all overlap with `[4,8]`. They are merged into `[3,10]`. `[1,2]` and `[12,16]` don't overlap and remain.*

**Example 3:**  
Input: `intervals = []`, `newInterval = [5,7]`  
Output: `[[5,7]]`  
*Explanation: The original list is empty; just return the new interval.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - Add `newInterval` to the end, sort intervals by start, then merge all overlapping intervals from left to right.  
  - This works but sorting is unnecessary since original intervals are sorted.

- **Optimized (linear sweep):**
  - Because intervals are sorted, iterate through the list and:
    - Add intervals **ending before** `newInterval` starts (no overlap).
    - For overlapping intervals, merge by updating start/end values.
    - Once past the overlap, add the merged interval, then the rest.
  - This only requires a single pass (O(n)), using interval properties to avoid unnecessary sorting or extra merges.

- **Why this works:**  
  - Sorted property allows us to determine overlap status in order and minimize logic.

### Corner cases to consider  
- Inserting at the very **beginning** (`newInterval` before all intervals).
- Inserting at the **end** (after all intervals).
- **Overlaps with all intervals**.
- **No overlaps** (should appear as a clean insertion in correct place).
- **Empty input** (no intervals at all).
- All intervals are **contiguous** or **disjoint**.
- **newInterval** is entirely within an existing interval.

### Solution

```python
def insert(intervals, newInterval):
    result = []
    i = 0
    n = len(intervals)
    
    # Add all intervals ending before newInterval starts (no overlap)
    while i < n and intervals[i][1] < newInterval[0]:
        result.append(intervals[i])
        i += 1

    # Merge all overlapping intervals
    while i < n and intervals[i][0] <= newInterval[1]:
        newInterval[0] = min(intervals[i][0], newInterval[0])
        newInterval[1] = max(intervals[i][1], newInterval[1])
        i += 1
    result.append(newInterval)

    # Add remaining intervals (all starting after newInterval ends)
    while i < n:
        result.append(intervals[i])
        i += 1

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n) — each interval is visited at most once in the three while loops.

- **Space Complexity:**  
  O(n) — output list stores up to all input intervals plus newInterval, but no extra structures are used.

### Potential follow-up questions (as if you’re the interviewer)  

- How would this change if intervals were **not sorted**?
  *Hint: You’d have to sort, affecting time complexity to O(n log n).*

- Can you do it **in-place**, reusing the original array?
  *Hint: Focus on pointers and careful overwriting; you may need room for the inserted/merged interval.*

- What if you had to **support many insertions** efficiently?
  *Hint: Consider advanced structures like interval trees or balanced BSTs to speed up multiple insertions/merges.*

### Summary
This approach leverages the sorted nature of the input for an efficient O(n) solution, using the **sweep line** or **interval merging pattern**. This method is common in scheduling, merging calendars, and can be extended to problems like merging meeting times, handling reservations, or any sorted-interval batch insertion.

### Tags
Array(#array)

### Similar Problems
- Merge Intervals(merge-intervals) (Medium)
- Range Module(range-module) (Hard)
- Count Integers in Intervals(count-integers-in-intervals) (Hard)