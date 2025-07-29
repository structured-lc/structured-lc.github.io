### Leetcode 1591 (Hard): Strange Printer II [Practice](https://leetcode.com/problems/strange-printer-ii)

### Description  
You are given an m × n grid, where each cell has a color indicated by an integer. You have a strange printer that, on each turn, prints a **solid rectangle** of a single color onto the grid, overwriting any colors already there. **Once a color is used, it can't be used again.** Your task is to check if it is possible to reproduce the given target grid with such a printer, following the constraints (rectangle printing and each color used only once).

### Examples  
**Example 1:**  
Input: `targetGrid = [[1,1,1,1],[1,2,2,1],[1,2,2,1],[1,1,1,1]]`  
Output: `true`  
*Explanation: The rectangles can be printed in the order 2, then 1. First print color 2 in the center 2x2 block, then color 1 in the outer rectangle.*

**Example 2:**  
Input: `targetGrid = [[1,1,1,1],[1,1,3,3],[1,1,3,4],[5,5,1,4]]`  
Output: `true`  
*Explanation: You can print the rectangles in order: 3, 4, 5, 1, according to the rectangles formed by each color.*

**Example 3:**  
Input: `targetGrid = [[1,2,1],[2,1,2],[1,2,1]]`  
Output: `false`  
*Explanation: There's an unavoidable cycle; you cannot print this grid with the rectangle rules, as at least one color needs to be covered and then exposed.*

**Example 4:**  
Input: `targetGrid = [[1,1,1],[3,1,3]]`  
Output: `false`  
*Explanation: Impossible due to overlap and use restrictions.*

### Thought Process (as if you’re the interviewee)  
First, observe that each color must be printed in exactly **one solid rectangle**, and later prints can cover previous prints. For each color, find the smallest rectangle that covers all its occurrences. For the algorithm:

- For each color, find its rectangle bounds (min/max row/col where the color appears)
- For a valid solution, **the rectangle for color c must not contain any uncovered cell of another color that is required to be printed after c**
- This forms a directed dependency graph: if rectangle of color A overlaps a cell colored B, then B must be printed after A
- If there is a **cycle** in this dependency graph, it's impossible (colors mutually depend on each other to be "printed last", which can't happen)
- Use DFS (or topological sort) to detect cycles in the dependency graph

### Corner cases to consider  
- All cells are of only one color
- Each color makes a perfect rectangle without overlap
- Multiple colors fully overlap in one rectangle
- Small grid (1x1, 1 row, 1 col)
- Rectangle has "holes" (but the rectangle must cover all instances of the color)
- Cyclic dependency in overlaps

### Solution

```python
from enum import Enum

class State(Enum):
    INIT = 0
    VISITING = 1
    VISITED = 2

class Solution:
    def isPrintable(self, targetGrid: list[list[int]]) -> bool:
        kMaxColor = 60  # max color value
        m, n = len(targetGrid), len(targetGrid[0])
        graph = [set() for _ in range(kMaxColor + 1)]
        # Find bounds for each color
        for color in range(1, kMaxColor + 1):
            min_i, min_j = m, n
            max_i, max_j = -1, -1
            for i in range(m):
                for j in range(n):
                    if targetGrid[i][j] == color:
                        min_i = min(min_i, i)
                        max_i = max(max_i, i)
                        min_j = min(min_j, j)
                        max_j = max(max_j, j)
            if min_i > max_i:  # color not present
                continue
            # Check if rectangle contains any other color
            for i in range(min_i, max_i + 1):
                for j in range(min_j, max_j + 1):
                    other_color = targetGrid[i][j]
                    if other_color != color:
                        graph[color].add(other_color)
        # Detect cycles via DFS
        states = [State.INIT] * (kMaxColor + 1)
        def has_cycle(u):
            if states[u] == State.VISITING:
                return True
            if states[u] == State.VISITED:
                return False
            states[u] = State.VISITING
            if any(has_cycle(v) for v in graph[u]):
                return True
            states[u] = State.VISITED
            return False
        return not any(has_cycle(c) for c in range(1, kMaxColor + 1))
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(k × m × n), where k is number of colors (≤ 60), and m × n is the grid size. We scan the entire grid for each color to find bounding rectangles and build the graph. Cycle detection DFS is O(k²) in worst case.
- **Space Complexity:** O(k²) for the dependency graph, and O(k) for state tracking in the visit array.

### Potential follow-up questions (as if you’re the interviewer)  
- What if the rectangles allowed aren't solid, but can be L-shapes or other polyomino shapes?  
  *Hint: Try to generalize the dependency graph creation step for the new shape category.*

- What if each color can be used multiple times, but each rectangle must still be solid?  
  *Hint: Rethink the cycle detection logic when a color can be reused, possibly count the minimum number of uses.*

- How would you optimize if the input grid was much larger but the number of unique colors is very small?  
  *Hint: Consider spatial partitioning or hash maps to reduce searching time for locations of each color.*

### Summary
This problem is a variant of dependency graph cycle detection, where the dependencies are induced by rectangle containment. The pattern is similar to topological sorting, cycle detection in directed graphs, and is applicable to similar scheduling and dependency resolution problems where "actions" (prints) must obey a coverage or ordering constraint.
