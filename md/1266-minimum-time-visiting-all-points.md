### Leetcode 1266 (Easy): Minimum Time Visiting All Points [Practice](https://leetcode.com/problems/minimum-time-visiting-all-points)

### Description  
Given a list of points on a 2D grid, where you start at the first point and must visit all other points in order, moving from one to the next in a straight line. On each move, you can go **horizontally, vertically, or diagonally** one unit per second. Calculate the minimum time needed to visit all points (the path is the sum of minimum required time for each consecutive pair).

### Examples  
**Example 1:**  
Input: `points = [[1,1],[3,4],[-1,0]]`  
Output: `7`
*Explanation: From (1,1)→(3,4): needs max(2,3)=3 sec. From (3,4)→(-1,0): needs max(4,4)=4 sec. Total = 7 seconds.*

**Example 2:**  
Input: `points = [[3,2],[-2,2]]`  
Output: `5`
*Explanation: From (3,2)→(-2,2): needs max(5,0)=5 sec. Only one move needed.*

**Example 3:**  
Input: `points = [[0,0],[0,0]]`  
Output: `0`
*Explanation: Start and end points are the same, no movement needed.*

### Thought Process (as if you’re the interviewee)  
For each consecutive pair of points (x₁,y₁) and (x₂,y₂):
- The minimum seconds = max(|x₂-x₁|, |y₂-y₁|)
- This is because you can move diagonally (covers both axes) or in one direction at a time.
Sum this value for each pair along the path.

### Corner cases to consider  
- Points are all the same (no moves)
- Moves are only horizontal or vertical
- Moves are only diagonal
- Large number of points

### Solution

```python
from typing import List

def minTimeToVisitAllPoints(points: List[List[int]]) -> int:
    total = 0
    for i in range(1, len(points)):
        x1, y1 = points[i-1]
        x2, y2 = points[i]
        total += max(abs(x2 - x1), abs(y2 - y1))
    return total
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N) — N is the number of points
- **Space Complexity:** O(1) — Only a few variables used

### Potential follow-up questions (as if you’re the interviewer)  

- Can you do this if movement is only vertical or horizontal?  
  *Hint: Use sum of |x₂-x₁| + |y₂-y₁| for each step.*

- What if some points must be skipped?  
  *Hint: Plan your visiting permutation, may require DP.*

- How would you change the logic if diagonal moves are not allowed?  
  *Hint: Only sum of Manhattan distances between each pair.*

### Summary
The problem is an example of the **greedy walk** pattern, using properties of 2D movement and maximums. The min time for each step comes from the "+king's move distance" rule—can move diagonally or orthogonally. Useful in grid, chess, or pathfinding scenarios.
