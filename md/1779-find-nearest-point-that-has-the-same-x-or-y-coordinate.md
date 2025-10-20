### Leetcode 1779 (Easy): Find Nearest Point That Has the Same X or Y Coordinate [Practice](https://leetcode.com/problems/find-nearest-point-that-has-the-same-x-or-y-coordinate)

### Description  
Given your current coordinates (x, y) on a 2D grid and a list of points where each point is represented as [aᵢ, bᵢ], return the index of the nearest point that shares either the same x or the same y coordinate as you. The distance is measured using Manhattan distance: |x - aᵢ| + |y - bᵢ|. If multiple points are tied for minimal distance, return the one with the lowest index. If no such point exists, return -1.

### Examples  

**Example 1:**  
Input: x = 3, y = 4, points = [[1,2],[3,1],[2,4],[2,3],[4,4]]  
Output: `2`  
*Explanation: Point [2,4] shares the same y=4; its Manhattan distance is |3-2| + |4-4| = 1. Point [3,1] shares x=3, distance = |3-3| + |4-1| = 3. Point [4,4] shares y=4, distance = |3-4| + |4-4| = 1. Both [2,4] and [4,4] are distance 1; index 2 is smaller than 4.*

**Example 2:**  
Input: x = 3, y = 4, points = [[3,4]]  
Output: `0`  
*Explanation: The only point shares both x and y, so its distance is 0.*

**Example 3:**  
Input: x = 3, y = 4, points = [[2,3]]  
Output: `-1`  
*Explanation: No point shares x=3 or y=4. Return -1.*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach is to scan each point to check if the x or y matches.
- For each valid point, compute Manhattan distance and update the minimum if this point is closer or is the first found at that distance.
- Return the lowest index with the minimum distance. If there are no valid points, return -1.
- Since the constraints are small and we need the first minimum index, iterating over the array is optimal.
- This approach works in O(n) time where n is the length of points.

### Corner cases to consider  
- No points share x or y with (x, y): should return -1.
- Multiple points share x/y, but at different distances.
- Multiple points are at the same minimal distance: return the smallest index.
- The input list of points is empty.
- Current location itself present as a point.
- Negative coordinates.

### Solution

```python
def nearestValidPoint(x, y, points):
    min_dist = float('inf')
    min_index = -1
    # Loop over all points
    for i in range(len(points)):
        px, py = points[i]
        # Check if the point is valid (shares x or y)
        if px == x or py == y:
            # Manhattan distance calculation
            dist = abs(x - px) + abs(y - py)
            # Update if this is closer or first found at min distance
            if dist < min_dist:
                min_dist = dist
                min_index = i
    return min_index
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of points, because we scan every point once.
- **Space Complexity:** O(1), no extra space except a few integer variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to return all indices of points with minimal Manhattan distance and the same x or y?  
  *Hint: Collect results in a list as you scan, and only add if dist equals the current min.*

- How would you handle very large lists of points, e.g. streaming input?  
  *Hint: Track current minimum on the fly, can't sort or store all, similar code still works as above.*

- Could you extend this to 3D?  
  *Hint: The same idea, but you’d check if x, y, or z matches and use Manhattan distance in 3D.*

### Summary
This is a simple **linear search pattern**: scan for candidates, check a validity predicate, and track the candidate with best score while remembering their index. It's a very common pattern for "find minimum/maximum under constraint" problems, such as finding closest/farthest points, optimal candidates in arrays, etc.


### Flashcard
Iterate through points to find the nearest one with the same x or y coordinate, tracking the minimum distance and the first index at that distance.

### Tags
Array(#array)

### Similar Problems
- K Closest Points to Origin(k-closest-points-to-origin) (Medium)