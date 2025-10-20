### Leetcode 1610 (Hard): Maximum Number of Visible Points [Practice](https://leetcode.com/problems/maximum-number-of-visible-points)

### Description  
Given a list of 2D points and your location, a viewing angle in degrees, find the **maximum number of points** (possibly including those at your location) visible from your location within any angle window of that size (from 0 to angle). Points at your location are always visible regardless of direction.

### Examples  

**Example 1:**  
Input: `points = [[2,1],[2,2],[3,3]], angle = 90, location = [1,1]`
Output: `3`
*Explanation: All points can be visible within a 90° sweep.*

**Example 2:**  
Input: `points = [[2,1],[2,2],[3,4],[1,1]], angle = 90, location = [1,1]`
Output: `4`
*Explanation: Point [1,1] is at your location and is always visible; the rest fit in a 90° window.*

**Example 3:**  
Input: `points = [[1,0],[2,1]], angle = 13, location = [1,1]`
Output: `1`
*Explanation: Only one point (besides the location point) fits within a 13° window from origin.*

### Thought Process (as if you’re the interviewee)  
- For each point, if it's at your location, count it separately (always visible).
- For all other points, compute the polar angle relative to your location (atan2), normalize to [0, 360).
- Sort all angles. Since the viewing window can wrap around 360°, we duplicate the array by adding 360° to each angle, forming a "doubled" angle list.
- For each angle, use a sliding window (two-pointer) to find the maximal number of points within `angle` degrees (inclusive), moving the window through the sorted list.
- The answer is max count in any window plus the at-location count.

### Corner cases to consider  
- All points at location.
- No points.
- Very small or 360° angle.
- Negative or not normalized coordinates.
- All points in the same direction.

### Solution

```python
import math

def visiblePoints(points, angle, location):
    same = 0
    polar = []
    base_x, base_y = location
    for x, y in points:
        dx, dy = x - base_x, y - base_y
        if dx == 0 and dy == 0:
            same += 1
            continue
        polar.append(math.degrees(math.atan2(dy, dx)))
    polar.sort()
    n = len(polar)
    polar += [p + 360 for p in polar]
    max_seen = left = 0
    for right in range(len(polar)):
        while polar[right] - polar[left] > angle:
            left += 1
        max_seen = max(max_seen, right - left + 1)
    return max_seen + same
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log n) (for sorting, n = number of points)
- **Space Complexity:** O(n) (angle list and doubled list)

### Potential follow-up questions (as if you’re the interviewer)  
- How to handle floating point precision and angle wrap-around robustly?   
  *Hint: Always use a tiny epsilon (e.g., 1e-9) in floating-point comparisons.*

- What if points are in 3D?   
  *Hint: Use solid angles; more advanced geometry needed.*

- Can you update the set of points in real-time (moving window)?   
  *Hint: Use a data structure to maintain rolling angles, perhaps a deque.*

### Summary
Pattern is: *geometry (polar angle)* + *sorting* + *sliding window (two-pointer)*. Used in problems where intervals wrap around, maximal clusters in the angular or circular domain, and sightline/sensor applications.


### Flashcard
Convert points to angles relative to your position, sort, duplicate with +360°, then use a sliding window to find the maximum visible points within the given angle.

### Tags
Array(#array), Math(#math), Geometry(#geometry), Sliding Window(#sliding-window), Sorting(#sorting)

### Similar Problems
