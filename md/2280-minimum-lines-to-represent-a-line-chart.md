### Leetcode 2280 (Medium): Minimum Lines to Represent a Line Chart [Practice](https://leetcode.com/problems/minimum-lines-to-represent-a-line-chart)

### Description  
Given a series of points representing stock prices over time, each as `[day, price]`, determine the minimum number of **straight lines** needed to connect all the points in a line chart, such that each line passes sequentially through points where the slope does not change.  
You must connect the points in order of increasing day. If three or more consecutive points are collinear (lie on the same straight line), they can be represented by a single line.

### Examples  

**Example 1:**  
Input: `stockPrices = [[1,2],[2,3],[3,5],[4,6],[5,8]]`  
Output: `3`  
*Explanation:  
- Points [1,2]→[2,3]→[3,5] form a line, but [3,5]→[4,6] have a different slope.  
- [4,6]→[5,8] have the same slope, so can be grouped.  
- Total lines = 3.*

**Example 2:**  
Input: `stockPrices = [[1,7],[2,6],[3,5],[4,4],[5,4],[6,4],[7,3]]`  
Output: `3`  
*Explanation:  
- [1,7]→[2,6]→[3,5]→[4,4] are collinear (same slope), form 1 line.  
- [4,4]→[5,4]→[6,4] are horizontal, another line.  
- [6,4]→[7,3] form a third line.*

**Example 3:**  
Input: `stockPrices = [[3,4]]`  
Output: `0`  
*Explanation:  
- Only one point, zero lines needed.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For every new point, check with every previous group if adding this point keeps them collinear. But re-checking all subsets is costly and unnecessary.

- **Optimized approach:**  
  Since we can connect all points in order, we only need to add a new line when the new segment doesn’t share the slope with the previous segment.  
  - Sort points by day (x-axis).  
  - For each consecutive triplet, check if all three are collinear (same slope).  
  - Use cross multiplication (`dy₁ × dx₂ == dy₂ × dx₁`) to avoid floating-point errors.  
  - Count the number of times the slope changes, i.e., increment a counter whenever collinearity is lost.

- **Trade-offs:**  
  - No need for complex data structures; only basic sorting and a single pass.
  - Use integer arithmetic to avoid floating-point inaccuracies.

### Corner cases to consider  
- Only one point: 0 lines.
- All points collinear: 1 line.
- Multiple consecutive points with same coordinates.
- Horizontal lines (dy = 0), vertical lines (dx = 0).
- Unsorted input—must sort by the day first.
- Duplicate days (problem ensures unique days by constraints).

### Solution

```python
def minimumLines(stockPrices):
    # Sort points by the x-axis (day)
    stockPrices.sort()
    n = len(stockPrices)
    # 0 or 1 point => 0 lines needed
    if n == 1:
        return 0

    # Initial slope between the first two points
    prev_dx = stockPrices[1][0] - stockPrices[0][0]
    prev_dy = stockPrices[1][1] - stockPrices[0][1]
    lines = 1  # At least one line for more than 1 point

    for i in range(2, n):
        # Current slope between i-th and (i-1)-th point
        dx = stockPrices[i][0] - stockPrices[i-1][0]
        dy = stockPrices[i][1] - stockPrices[i-1][1]
        # Check for slope change using cross multiplication
        if prev_dy * dx != prev_dx * dy:
            lines += 1  # New line segment
        prev_dx, prev_dy = dx, dy  # Update previous slope

    return lines
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  Justification: Sorting the points by day takes O(n log n). The linear scan for slope changes is O(n).

- **Space Complexity:** O(1)  
  Justification: We sort in place and use only a fixed number of variables for state.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the points are not guaranteed to have unique days (x-axis)?
  *Hint: How would duplicate x-coordinates affect slope computations and collinearity checks?*

- Can you return the actual segments/lines instead of just their count?
  *Hint: Maintain a list of segment start and endpoints whenever the slope changes.*

- What if floating-point coordinates are allowed and high precision is needed?
  *Hint: Consider the use of fractions or Decimal for exact comparisons.*

### Summary
This problem is a **geometry/coding pattern** focused on identifying consecutive collinear points using slope equivalence via cross multiplication. It's a greedy one-pass scan pattern after sorting, frequently found in line simplification, polyline segmentation, GPS data compression, or collinear points detection in computational geometry.  
The code builds the answer efficiently with minimal storage and high reliability by staying in the integer domain for slope checks.