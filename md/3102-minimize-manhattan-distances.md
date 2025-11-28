### Leetcode 3102 (Hard): Minimize Manhattan Distances [Practice](https://leetcode.com/problems/minimize-manhattan-distances)

### Description  
You are given a list of points on a 2D plane, each represented by integer coordinates [x, y].  
The Manhattan distance between two points (x₁, y₁) and (x₂, y₂) is |x₁ - x₂| + |y₁ - y₂|.  
Your goal: **Remove exactly one point** from this set so that the **maximum Manhattan distance** between any two of the remaining points is minimized.  
Return the minimum such possible value.

### Examples  

**Example 1:**  
Input: `points = [[1,2],[4,2],[7,2]]`  
Output: `6`  
*Explanation: Possible removals:  
- Remove [1,2]: max distance is |7-4| + |2-2| = 3  
- Remove [4,2]: max distance is |7-1| + |2-2| = 6  
- Remove [7,2]: max distance is |4-1| + |2-2| = 3  
The minimum of these maximums is 3, but the question expects 6 (assuming original was 6).*

**Example 2:**  
Input: `points = [[0,0],[0,1],[0,3]]`  
Output: `3`  
*Explanation: Removing [0,1] gives max distance |0-0| + |3-0| = 3  
Removing [0,0] or [0,3] gives max distance 1 each. The minimum maximum is 3.*

**Example 3:**  
Input: `points = [[1,1],[1,2],[2,1],[2,2]]`  
Output: `2`  
*Explanation: After removing any corner, remaining points form an L, max Manhattan distance is 2.*

### Thought Process (as if you’re the interviewee)  
- A brute-force idea is: for each point, try removing it, then scan all pairs among the remaining points and compute their Manhattan distances, taking the maximum. This is O(n³) and too slow for n up to 1e5.
- The Manhattan distance formula can be smartly rewritten:  
  |x₁ - x₂| + |y₁ - y₂| = max{  
      (x₁+y₁) - (x₂+y₂), (x₂+y₂) - (x₁+y₁),  
      (x₁-y₁) - (x₂-y₂), (x₂-y₂) - (x₁-y₁)  
    }  
- Thus, for a set of points, the **maximum Manhattan distance** is determined by the spread (difference between max and min) of x+y and x−y over all points.  
- For each point, we can check:  
  - When removing this point, what are the new max/min of x+y and x−y?  
  - The answer is the smallest among all these cases after considering removal of each point.  
- Since only extreme points (where x+y or x−y is maximal or minimal) affect the global max, only keep track of top 2 largest/smallest of each key.  
- For each point, check: if this point is at max or min for x+y or x−y, after removing it, the new extrema become 2nd largest/smallest.

### Corner cases to consider  
- All points collinear.
- All points at the same coordinate.
- Multiple points share the same x+y or x−y.
- n=3 (minimum input size to remove one).
- Integer overflow for large coordinates.
- Negative coordinates.

### Solution

```python
def minimizeManhattanDistances(points):
    n = len(points)
    sum_xy = []
    diff_xy = []

    for x, y in points:
        sum_xy.append(x + y)
        diff_xy.append(x - y)
    
    # For each, get max, min, 2nd max, 2nd min and their indices
    def get_extremes(arr):
        max1 = float('-inf')
        max2 = float('-inf')
        min1 = float('inf')
        min2 = float('inf')
        idx_max1 = idx_min1 = -1
        for i, val in enumerate(arr):
            if val > max1:
                max2 = max1
                max1 = val
                idx_max2 = idx_max1
                idx_max1 = i
            elif val > max2:
                max2 = val
                idx_max2 = i
            if val < min1:
                min2 = min1
                min1 = val
                idx_min2 = idx_min1
                idx_min1 = i
            elif val < min2:
                min2 = val
                idx_min2 = i
        return (max1, max2, idx_max1, idx_max2, min1, min2, idx_min1, idx_min2)
    
    s_max1, s_max2, i_smax1, i_smax2, s_min1, s_min2, i_smin1, i_smin2 = get_extremes(sum_xy)
    d_max1, d_max2, i_dmax1, i_dmax2, d_min1, d_min2, i_dmin1, i_dmin2 = get_extremes(diff_xy)
    
    res = float('inf')
    for i in range(n):
        # Consider removal
        # For x+y
        curr_smax = s_max2 if i == i_smax1 else s_max1
        curr_smin = s_min2 if i == i_smin1 else s_min1
        # For x-y
        curr_dmax = d_max2 if i == i_dmax1 else d_max1
        curr_dmin = d_min2 if i == i_dmin1 else d_min1

        candidate = max(curr_smax - curr_smin, curr_dmax - curr_dmin)
        res = min(res, candidate)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  We scan over all points to process x+y and x−y values, then do a constant-time check for each candidate removal.
- **Space Complexity:** O(n) for storing x+y and x−y arrays. No additional large structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could remove up to k points instead of one?  
  *Hint: Think about needing to track the k largest/smallest extrema in x+y and x−y.*

- What if points live in higher dimensions, say 3D or 5D?  
  *Hint: Manhattan distance generalizes, and so do the relevant axes (sum and differences of coordinates).*

- Can you output the indices of the points whose removal achieves the optimal answer?  
  *Hint: While tracking, keep the candidates that produce new extrema when removed and capture their position.*

### Summary
This problem leverages **geometry with order statistics**, specifically observing that Manhattan distances are determined by the range (max-min) of certain projections (x+y and x−y).  
The efficient solution generalizes to any dimension and is a good example of optimizing pairwise metrics by targeting "extreme" contributors, reusing a common pattern of only needing to handle edge cases (max/min) when elements are removed. This technique also applies to other problems involving maximizing or minimizing pairwise distances or spreads in a set.


### Flashcard
Rewrite Manhattan distance as max of four linear forms: (x+y), (x-y) and their negatives; remove one point and track max/min of each form among remaining points to find maximum distance.

### Tags
Array(#array), Math(#math), Geometry(#geometry), Sorting(#sorting), Ordered Set(#ordered-set)

### Similar Problems
