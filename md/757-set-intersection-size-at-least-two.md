### Leetcode 757 (Hard): Set Intersection Size At Least Two [Practice](https://leetcode.com/problems/set-intersection-size-at-least-two)

### Description  
Given a list of intervals, each represented as `[a, b]` (i.e., containing all consecutive integers from a to b inclusive), find the minimum size of a set S such that every interval contains **at least two elements** from S. In other words, for each interval, the intersection of S with that interval must have at least two elements.

### Examples  

**Example 1:**  
Input: `intervals = [[1,3], [1,4], [2,5], [3,5]]`  
Output: `3`  
*Explanation: One possible minimal set is {2, 3, 4}. Every interval contains at least two numbers from this set. For instance, [1,3] contains 2 and 3; [1,4] contains 2 and 3 (or 3 and 4), etc.*

**Example 2:**  
Input: `intervals = [[1,2], [2,3], [2,4], [4,5]]`  
Output: `5`  
*Explanation: You can take the set {1, 2, 3, 4, 5}. Each interval contains at least two elements from this set.*

**Example 3:**  
Input: `intervals = [[0,5], [1,3], [2,7]]`  
Output: `4`  
*Explanation: One minimal possibility is {3, 4, 5, 6}. All intervals contain at least two elements from this set.*

### Thought Process (as if you’re the interviewee)  
Start by thinking about brute-force: Can we try all subsets of points and check? But the input size (up to 3,000 intervals, endpoints up to 10⁸) makes brute-forcing impossible.

So, we need a **greedy** approach. The problem wants the global minimum set covering all intervals, such that each interval has at least two points from the set. Notice that intervals can overlap; we'd benefit from reusing points across overlapping intervals.

A typical greedy strategy with intervals is to process them in a certain order. Here, we sort intervals by their right endpoints (end), because if we pick points at the end of the interval, they're more likely to also cover subsequent intervals. If two intervals have the same end, process the one with the larger start first (to avoid missing wider ranges).

For each interval, we track how many points we already have within it (using two pointers to the last two points added). If fewer than two, we greedily add the missing points at the highest possible positions (rightmost locations: end-1 and end).

The final approach efficiently ensures no interval is left uncovered, and doesn’t waste points by overlapping more than necessary.

### Corner cases to consider  
- Intervals are nested (one entirely inside another).
- Intervals are completely non-overlapping.
- Multiple intervals end at the same point.
- Intervals of minimal length, e.g. [x, x+1].
- Only one interval.
- Intervals covering the entire number space.
- Large inputs (up to 3,000 intervals and very large values).

### Solution

```python
def intersectionSizeTwo(intervals):
    # Sort by interval end ascending; if equal, by start descending
    intervals.sort(key=lambda x: (x[1], -x[0]))
    
    res = []
    a, b = -1, -1  # Markers for two most recently added points
    
    for start, end in intervals:
        # How many of the last two added points lie in [start, end]?
        cnt = (start <= a) + (start <= b)
        if cnt == 2:
            continue  # Already at least two points inside
        elif cnt == 1:
            # Add only one more (the end); keep older marker as new 'a'
            # Add end, update points
            res.append(end)
            a, b = b, end
        else:
            # Need two new points (end-1, end)
            res.extend([end-1, end])
            a, b = end-1, end
    return len(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is the number of intervals, due to the sort. All subsequent operations are linear.
- **Space Complexity:** O(n), for storing result points in the worst case (every interval needs two points).

### Potential follow-up questions (as if you’re the interviewer)  

- Modify if the intersection size requirement is k (not 2)?  
  *Hint: How would the greedy logic scale to “at least k” in each interval? What state do you track?*

- Can you find one actual optimal set S, not just its size?  
  *Hint: Construct and return res, not just the count.*

- What if intervals are large and sparse (very large max endpoint)?  
  *Hint: Do you really need to check all possible points; is your solution memory efficient?*

### Summary
This is a classic greedy interval covering problem: the pattern is to sort intervals by their right ends, ensuring we reuse freshly picked points for as many future intervals as possible. The core trick is to keep track of how many of the most recent points overlap with the current interval, adding more points only if necessary. The underlying pattern also fits classical interval covering and set intersection problems seen in scheduling, resource allocation, and covering segments, and can be adapted for broader intersection size requirements.