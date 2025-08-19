### Leetcode 3009 (Hard): Maximum Number of Intersections on the Chart [Practice](https://leetcode.com/problems/maximum-number-of-intersections-on-the-chart)

### Description  
Given an array y representing the y-coordinates of n points, we plot each point at (k, yₖ) for 1-based k. These points are connected consecutively to form a polyline (no two consecutive y's are equal, so there are no flat horizontal segments). The goal is: among all possible horizontal lines you could draw, what is the **maximum number of intersections** such a line can have with this chart?

In other words: For the polyline formed by joining these points, what is the highest number of times any infinitely-long horizontal line can cross it?

### Examples  

**Example 1:**  
Input: `y = [1,4,6,8,14]`  
Output: `1`  
*Explanation: Every segment slopes strictly up or down, and every horizontal line crosses at most one segment.*

**Example 2:**  
Input: `y = [2,1,3,4,5]`  
Output: `2`  
*Explanation: For example, a horizontal line at y=1.5 crosses the chart 2 times (between 2↘️1 and 1↗️3), and no horizontal can cross more than 2 segments.*

**Example 3:**  
Input: `y = [1,3,2,5,4,6]`  
Output: `3`  
*Explanation: A horizontal line (e.g. y=3) may intersect up to 3 segments.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**: For every possible y (potentially infinitely many), check how many chart segments a horizontal line at that y would cross. For each segment between y[i-1] and y[i], if the line is strictly between the y's (min < y_line < max), it would cross.  
- This is inefficient, as there could be up to 10⁵ segments and 10⁹ possible y's.

- **Key insight**: The only possible places where the *number* of intersections can change are at points between two consecutive y-coordinates (since only then do segments cross the horizontal line y=target). For each segment, the horizontal line will cross somewhere between min(y[i-1],y[i]) and max(y[i-1],y[i]).  
- If we treat each interval (exclusive of endpoints) as an "event" — a +1 when a line starts crossing (at min+1), and a -1 when it stops (at max).

- So, using a sweep line over all such interval endpoints:  
    - For each segment between positions i-1 and i, take the open interval (min(y[i-1],y[i]), max(y[i-1],y[i]))
    - For the left endpoint (exclusive), add +1, for the right endpoint (exclusive), add -1.
    - Sweep through events by increasing y, maintaining the current number of active intervals ("crossings"), and record the maximum.

- **Implementation**: To avoid float precision, multiply y-values by 2 and use integer addition/subtraction for event points.

- **Trade-offs**:  
    - O(n log n), since we're sweeping over up to 2n interval boundaries.
    - Linear extra space.

### Corner cases to consider  
- Two adjacent coordinates with a big gap.
- All y-coordinates strictly increasing or strictly decreasing (only one crossing possible).
- Array of length 2.
- y has alternating up-down values (max number of overlaps).
- Minimum input size (n=2).

### Solution

```python
def maxIntersectionCount(y):
    # Instead of checking every possible y, we record the intervals where a
    # horizontal line would cross a segment.
    # We use event points for a sweep line: when an interval starts and ends.

    events = []
    n = len(y)
    for i in range(1, n):
        a = y[i-1]
        b = y[i]
        # Exclude endpoints: open interval
        left = min(a, b) + 1
        right = max(a, b)
        if left <= right - 1:
            # Starting crossing at left, end crossing at right
            events.append((left, 1))
            events.append((right, -1))
        # Edge case: for difference = 1 (no y strictly in (a,b)), skip
        
    # Sort the events by y. In case of tie, +1 before -1.
    events.sort()
    
    max_cross = 0
    curr_cross = 0
    for y_val, delta in events:
        curr_cross += delta
        max_cross = max(max_cross, curr_cross)
    return max_cross
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), because we process 2n events and sort them.
- **Space Complexity:** O(n), for storing events (at most 2n).

### Potential follow-up questions (as if you’re the interviewer)  

- If the chart could include horizontal segments (yᵢ = yᵢ₊₁), how would the answer change?  
  *Hint: Think about whether the horizontal line coincides with a flat segment and whether to count it once or multiple times.*

- Can you find not only the count but also the y-value(s) that maximize intersection?  
  *Hint: Record y when updating max_cross.*

- How do you handle real (floating-point) y-values, or if coordinates are huge?  
  *Hint: Consider coordinate compression or custom comparator for floating points.*

### Summary
This problem is a variation of the **sweep line/intersecting intervals** pattern. By converting the polyline crossing count to sweep events (interval start and end for each sloped segment), you use efficient event sorting and counting. This is similar to the "max number of overlapping intervals/rooms/active segments" problem, a common pattern in interval and computational geometry questions.

### Tags
Array(#array), Math(#math), Binary Indexed Tree(#binary-indexed-tree), Geometry(#geometry)

### Similar Problems
