### Leetcode 356 (Medium): Line Reflection [Practice](https://leetcode.com/problems/line-reflection)

### Description  
Given a list of points in the 2D plane, determine if there exists a **vertical line** (of the form `x = m`) such that reflecting all the points over this line results in the same set of points. In other words, for each point in the set, its mirror image across some vertical line must also be present in the set (even if points are repeated). This line can be anywhere on the plane, and points may overlap in position.

### Examples  

**Example 1:**  
Input: `[[1,1], [-1,1]]`  
Output: `True`  
*Explanation: The vertical line x = 0 acts as a mirror. Reflecting (1,1) gives (-1,1) and vice versa. Both are present in the set.*

**Example 2:**  
Input: `[[1,1], [-1,-1]]`  
Output: `False`  
*Explanation: There is no single vertical line that can reflect both (1,1) to another point in the set and (-1,-1) to another point in the set. The y-values do not match for any candidate mirror line.*

**Example 3:**  
Input: `[[0,0]]`  
Output: `True`  
*Explanation: Any vertical line x = m would reflect (0,0) back to itself. The set remains unchanged.*

### Thought Process (as if you’re the interviewee)  
First, I’d think about brute-force: try every possible x-coordinate between the min and max x-values, test if every point’s reflected location exists; this is highly inefficient, O(n²) time.

Instead, I notice that for symmetry, the **vertical line of reflection must be halfway between the minimum and maximum x-values**. That is, for minₓ and maxₓ, the possible mirror line is x = (minₓ + maxₓ)/2.

For each point (x, y), its reflected counterpart is (minₓ + maxₓ - x, y). By storing all points in a set, I can check efficiently if the reflected point exists.

Trade-offs:
- This method is efficient (O(n)), avoids sorting (O(n log n)), and uses a set for quick lookup.
- Handles duplicate points naturally, as set checks for existence, not counts.

### Corner cases to consider  
- Empty list of points: Should return True (no points means trivially symmetric).
- All points have the same x-value: Any vertical mirror coincides with the points.
- Duplicate points: Need to only check existence, not multiplicity.
- Negative or large coordinates.
- Only one point: Always symmetric.

### Solution

```python
def isReflected(points):
    # Store points as tuples in a set for O(1) lookup
    point_set = set((x, y) for x, y in points)
    if not points:
        return True

    # Find min and max x among all points
    min_x = min(x for x, y in points)
    max_x = max(x for x, y in points)
    # The potential line of reflection: x = (min_x + max_x) / 2
    total = min_x + max_x

    for x, y in points:
        mirrored = (total - x, y)
        if mirrored not in point_set:
            return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Need a single pass to find minₓ, maxₓ, and another pass to check mirrored points.
- **Space Complexity:** O(n), due to the use of the set to store all (x,y) pairs.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where the set of points is very large and doesn't fit in memory?
  *Hint: Can you process by bucketing or streaming techniques?*

- What if the reflection line could be at any angle, not just vertical?
  *Hint: Consider general geometric symmetry and point transforms.*

- How do you handle if only *some* points require symmetric images (e.g., partial symmetry)?
  *Hint: Partition input or relax validation criteria.*

### Summary
This problem is a classic **geometry & set lookup** problem. It leverages the symmetry of reflection using simple arithmetic but relies on the hash set to guarantee efficiency. The same pattern—using a set to quickly verify the existence of geometric transformations—appears in other 2D geometry puzzles and duplicate detection problems.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math)

### Similar Problems
- Max Points on a Line(max-points-on-a-line) (Hard)
- Number of Boomerangs(number-of-boomerangs) (Medium)