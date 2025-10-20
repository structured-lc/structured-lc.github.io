### Leetcode 1272 (Medium): Remove Interval [Practice](https://leetcode.com/problems/remove-interval)

### Description  
Given a list of non-overlapping intervals (sorted by start), and a new interval to *remove* (not add), return the list after removing the overlapping portion of the removal interval from each interval, splitting intervals as necessary so that the final list still contains only non-overlapping intervals.

Each interval is 
[ start_i, end_i )  (end is exclusive). Removal interval is also [ rem_start, rem_end ).

### Examples  

**Example 1:**  
Input: `intervals = [[0,2],[3,4],[5,7]]`,  `toBeRemoved = [1,6]`  
Output: `[[0,1],[6,7]]`  
*Explanation: [0,2] → [0,1] after removal; [5,7] → [6,7] after removal. [3,4] is entirely inside remove, so fully removed.*

**Example 2:**  
Input: `intervals = [[0,5]]`,  `toBeRemoved = [2,3]`  
Output: `[[0,2],[3,5]]`  
*Explanation: Split into two; remove [2,3] from [0,5]: get [0,2] and [3,5].*

**Example 3:**  
Input: `intervals = [[0,100]]`,  `toBeRemoved = [50,60]`  
Output: `[[0,50],[60,100]]`  
*Explanation: Single interval split on both sides of remove interval.*

### Thought Process (as if you’re the interviewee)  

For each interval, check if it overlaps with toBeRemoved. There are a few possible cases:
- No overlap: add interval as-is.
- Partial overlap: add non-overlapping parts only.
- Covered completely: skip.

For each affected interval, yield at most two intervals:
- If part before remove: [start_i, max(start_i, remove_start))
- If part after remove: [min(end_i, remove_end), end_i)
Skip if max(start_i, remove_start) == min(end_i, remove_end).

### Corner cases to consider  
- No intervals overlap with removal: return original input.
- All intervals are removed: return [].
- Partial interval remains (split into two).
- Input intervals can touch but never overlap.
- Remove interval entirely outside all intervals.

### Solution

```python
def removeInterval(intervals, toBeRemoved):
    remove_start, remove_end = toBeRemoved
    result = []
    for start, end in intervals:
        # Part before removal
        if start < remove_start < end:
            result.append([start, min(remove_start, end)])
        # Part after removal
        if start < remove_end < end:
            result.append([max(remove_end, start), end])
        # Entirely outside removal
        if end <= remove_start or start >= remove_end:
            result.append([start, end])
        # Overlap: skip the in-between
        # (already handled above)
    # Remove duplicates caused by both before & after branch
    # Only add if interval is within original interval
    output = []
    for iv in result:
        if iv[0] < iv[1]:
            output.append(iv)
    return output
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N), process each interval once.
- **Space Complexity:** O(N), output proportional to number of intervals.

### Potential follow-up questions (as if you’re the interviewer)  

- How do you generalize for removing multiple intervals at once?  
  *Hint: Merge the toBeRemoved intervals and process efficiently.*

- How does the code change if intervals can overlap?  
  *Hint: Merge input intervals first or handle merges on-the-fly.*

- Can this be done in place?  
  *Hint: Yes, if careful with indexing, but output may grow in size.*

### Summary
This is classic interval manipulation: scanning and splitting intervals by a removal range. Common in scheduling problems, video timeline cuts, and range updates.


### Flashcard
For each interval, output non-overlapping parts before and after toBeRemoved; skip intervals fully covered by toBeRemoved.

### Tags
Array(#array)

### Similar Problems
