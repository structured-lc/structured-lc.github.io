### Leetcode 335 (Hard): Self Crossing [Practice](https://leetcode.com/problems/self-crossing)

### Description  
Given an array of integers representing distances, you start at point (0,0) and move in a counterclockwise direction starting north. After each move, you turn 90° left and move the next distance. The task: **Determine if at any point your path crosses itself** (i.e., you visit a point you have already visited).

You must efficiently check for self-crossing, *without drawing the path*, and return `True` if the path intersects itself, otherwise `False`.


### Examples  

**Example 1:**  
Input: `distance = [2, 1, 1, 2]`  
Output: `True`  
*Explanation: The path crosses itself at the fourth move (forms a loop at the origin).*

**Example 2:**  
Input: `distance = [1, 2, 3, 4]`  
Output: `False`  
*Explanation: The moves keep expanding outward; the path never crosses itself.*

**Example 3:**  
Input: `distance = [1, 1, 1, 1]`  
Output: `True`  
*Explanation: Each segment is length 1, so after 4 moves you form a square and overlap the starting point.*


### Thought Process (as if you’re the interviewee)  

- **Brute-force idea**:  
  Keep track of every coordinate visited, check for each new segment if it crosses any previous segment using geometry.  
  - **Drawback**: Takes O(N²) time and O(N) space, slow for large input.

- **Optimized approach**:  
  Observe that, due to the counter-clockwise turn after every move, at any step only the last *few* (specifically, the last 3-5 steps) segments can possibly intersect the new one.  
  - For each move (i ≥ 3), check three specific geometric patterns where a new segment could cross a previous one, based on segment lengths.
  - **Why only last few**? After three moves, the path forms a potential loop – and updates may only ever “catch up” to a previous line up to five steps ago.

- **Key crossing cases**:  
  1. **Fourth segment crosses first**: Current (iᵗʰ) segment crosses (i-3)rd segment.
  2. **Fifth overlaps first**: Current overlays (i-4)th if prior segments are in a “spiral.”
  3. **Sixth crosses back**: A more complex pattern with overlapping and crossing back (see code).

- Chosen approach:  
  Single pass, constant extra space, rely on length comparisons to detect crossing.  
  This avoids path simulation and remains O(N) time, O(1) space.


### Corner cases to consider  
- Very short distance arrays (less than 4, which can’t possibly cross).
- All zeros (path never moves).
- Large jumps followed by zeros or small numbers.
- Paths with repeated zeros in middle.
- Input with just one, two, or three segments.


### Solution

```python
def isSelfCrossing(distance):
    n = len(distance)
    for i in range(3, n):
        # Case 1: current line crosses the line 3 steps before
        if distance[i] >= distance[i - 2] and distance[i - 1] <= distance[i - 3]:
            return True
        # Case 2: current line overlaps the line 4 steps before
        if i >= 4:
            if distance[i - 1] == distance[i - 3] and distance[i] + distance[i - 4] >= distance[i - 2]:
                return True
        # Case 3: current line crosses the line 5 steps before
        if i >= 5:
            if (distance[i - 2] >= distance[i - 4] and
                distance[i - 1] <= distance[i - 3] and
                distance[i] + distance[i - 4] >= distance[i - 2] and
                distance[i - 1] + distance[i - 5] >= distance[i - 3]):
                return True
    return False
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of steps in `distance`.  
  - Each index is visited once; each crossing pattern is checked in O(1).
- **Space Complexity:** O(1)  
  - No extra space structures, just a few integer checks for recent elements.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this for diagonal movements (not just N-E-S-W)?  
  *Hint: Consider direction vectors and general intersection math.*

- What if you also needed to return the coordinate where the crossing first occurs?  
  *Hint: You’d need to simulate the path and track positions (use a map/dictionary).*

- Can you generalize this for any arbitrary turn angle besides 90°?  
  *Hint: The shortcut works only because of regular right angles. With unusual angles, the crossing logic would need full segment intersection checks.*


### Summary
This problem showcases an **array geometric pattern** – recognizing that only the last few steps can possibly cause a crossing. The solution uses pure math, constant space, and achieves O(n) runtime by leveraging the path’s regular turn rules. This pattern of “constant window-check based on geometric constraints” is rare but comes up in robot simulation and grid problems, and is an efficient replacement for simulation when movements are highly structured.

### Tags
Array(#array), Math(#math), Geometry(#geometry)

### Similar Problems
