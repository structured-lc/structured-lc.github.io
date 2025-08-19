### Leetcode 2647 (Hard): Color the Triangle Red [Practice](https://leetcode.com/problems/color-the-triangle-red)

### Description  
Given an equilateral triangle with `n` rows, where the bottom row contains `2n-1` unit triangles, each row above contains fewer triangles (forming a centered triangle configuration).  
Your task: **Select the minimum number of unit triangles to color red, such that if you repeatedly color any white triangle that has at least two red neighbors, eventually all triangles become red.**  
Neighbors are triangles sharing an edge.  
Return the coordinates of the red triangles you initially chose, using 1-based (row, position) for output.  
If there are multiple solutions, return any.

### Examples  

**Example 1:**  
Input: `n = 3`  
Output: `[[1,1],[2,1],[2,3],[3,1],[3,5]]`  
*Explanation:  
- Initially red: (1,1), (2,1), (2,3), (3,1), (3,5)  
- Step 1: (2,2) (has 3 red neighbors) → red  
- Step 2: (3,2) (has 2 red neighbors) → red  
- Step 3: (3,4) (has 3 red neighbors) → red  
- Step 4: (3,3) (has 3 red neighbors) → red  
All triangles become red. Any 4 or fewer is insufficient.*

**Example 2:**  
Input: `n = 2`  
Output: `[[1,1],[2,1],[2,3]]`  
*Explanation:  
- Initially red: (1,1), (2,1), (2,3)  
- Step 1: (2,2) (has 3 red neighbors) → red  
All triangles become red. Any 2 or fewer is insufficient.*

**Example 3:**  
Input: `n = 1`  
Output: `[[1,1]]`  
*Explanation: Only one triangle; set it red, done.*

### Thought Process (as if you’re the interviewee)  
- **Brute force**: Try all combinations of red triangles? Not feasible. Explodes combinatorially, especially as n ≤ 1000.
- **Observation**: Triangles "propagate" redness via neighbors. So, maximize spread by properly placing initial reds.
- **Pattern**: Need to ensure every triangle on the outer edges is red (since interior triangles rely on outer reds for propagation). Basically, an “enclosure” strategy.  
- **Efficient construction**: From analysis and example patterns, it works to color every leftmost and rightmost triangle of each row, as well as some select inner triangles on alternating rows. There is an optimal repeated pattern emerging from brute force on small n.
- **Final approach**: Systematically pick the necessary edge triangles row by row, following a specific recurring pattern based on the row number modulo 4 (see code for details). This approach gives minimal initial reds.

### Corner cases to consider  
- n = 1 (only one triangle)  
- n = 2 (all triangles must be directly colored or immediately reachable)  
- Large n (performance/efficiency, placement correctness for far right/left triangles)  
- Correct handling for rows and indices (1-based), especially on bottom row (row n, positions 1 to 2n-1)

### Solution

```python
# Greedy + pattern construction from example and analysis:
# Always color the tip and then every "edge" triangle, and some specific internal ones based on row order.

def colorRed(n):
    ans = []
    # Color the tip
    ans.append([1, 1])
    # Use a variable to determine the pattern for each row
    k = 0
    for i in range(n, 1, -1):
        if k == 0:
            # Color all odd columns in this row (the two edges and all inner odd indices)
            for j in range(1, i * 2, 2):
                ans.append([i, j])
        elif k == 1:
            # Color the 2nd column (edge-adjacent)
            ans.append([i, 2])
        elif k == 2:
            # Color all inner odd columns starting from 3
            for j in range(3, i * 2, 2):
                ans.append([i, j])
        else:
            ans.append([i, 1])
        k = (k + 1) % 4
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) in the worst case (if n is large, inner loop for rows up to 2n-1 items), but the actual number of colored triangles is much less, so in practice O(n).
- **Space Complexity:** O(n) — stores only a small constant fraction of all possible triangles as output (initially red).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize this to other shapes (e.g., rectangles, hexagons)?
  *Hint: Consider neighbor relations and propagation conditions for other grids.*

- If you could color k triangles, but want to maximize time until propagation completes, how would you adjust?
  *Hint: Analyze the spread mechanics, maybe "delay" by distributing reds farther apart.*

- What if you wanted to minimize total propagation steps rather than initial reds?
  *Hint: Look for different combinatorial patterns or center-weighted placement.*

### Summary
This problem is a variant of **grid propagation / influence spreading**. The optimal patterning here uses greedy construction with periodic edge and interior seeding, efficiently minimizing the needed start points. Patterns like this arise in problems involving cellular automata, percolation, and minimal “dominating sets” in graphs. The code is a form of constructive greedy logic with a fixed stride pattern, often used in grid induction problems.

### Tags
Array(#array), Math(#math)

### Similar Problems
