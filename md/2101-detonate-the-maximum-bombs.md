### Leetcode 2101 (Medium): Detonate the Maximum Bombs [Practice](https://leetcode.com/problems/detonate-the-maximum-bombs)

### Description  
You’re given a list of bombs, each represented as `[x, y, r]` where:
- `x`, `y` is the position of the bomb,
- `r` is its detonation radius.

A bomb detonates all other bombs within or on its radius, possibly causing a chain reaction.  
You can manually detonate any one bomb to start.

Return the **maximum** number of bombs that can be detonated in such a chain.

### Examples  

**Example 1:**  
Input: `bombs = [[2,1,3],[6,1,4]]`  
Output: `2`  
*Explanation: Bomb 0 detonates bomb 1 (since distance = 4 ≤ radius 3), so both can be detonated.*

**Example 2:**  
Input: `bombs = [[1,1,5],[10,10,5]]`  
Output: `1`  
*Explanation: No bomb can detonate any other: max is 1.*

**Example 3:**  
Input: `bombs = [[1,2,3],[2,3,1],[3,4,2],[4,5,1]]`  
Output: `3`  
*Explanation:  
Start with bomb 0:  
- Bomb 0 detonates bomb 1 (distance ≤ 3)  
- Bomb 1 detonates nothing new  
- Bomb 0 also detonates bomb 2 (distance ≤ 3). Bomb 2 detonates bomb 3 (distance ≤ 2).  
Thus, bombs 0,1,2,3 are all detonated — 4 in total. The maximum is 4 if started from bomb 0.*

### Thought Process (as if you’re the interviewee)  

First, I’d treat this as a **graph problem**:
- **Each bomb is a node.**  
- **There’s a directed edge from bomb i to bomb j if j is inside i’s explosion radius (distance ≤ radius).**

**Brute-force (but practical for small constraints):**
- For every bomb, simulate starting the chain reaction there.
- For each starting bomb, traverse the “detonation graph” (BFS or DFS) to count how many bombs get detonated including chains.

**Efficient simulation:**
- Build the adjacency list by checking each pair:  
  For each (i, j), test if distance between i/j ≤ i’s radius (so detonation is possible).
- For each starting node, BFS/DFS to count visited.
- Return the max.

**Why this approach?**
- Constraints make it feasible.
- There’s no “optimal path” selection: just fire every bomb as a start, count who gets triggered, and pick max.
- O(n²) adjacency list build, O(n × (n + edges)) for traversing every start.

### Corner cases to consider  
- Only one bomb — trivial, answer is 1.
- All bombs far apart — each triggers only itself.
- All bombs at same spot — any triggers all.
- Some bombs with radius 0.
- Some bombs at same position, different radii.
- Circular chains (A detonates B, B detonates A).
- Large input sizes – ensure no TLE.

### Solution

```python
from collections import deque

def maximumDetonation(bombs):
    n = len(bombs)
    adj = [[] for _ in range(n)]
    
    # Build the graph: directed edges for reachability
    for i in range(n):
        x₁, y₁, r₁ = bombs[i]
        for j in range(n):
            if i == j:
                continue
            x₂, y₂, _ = bombs[j]
            dx = x₁ - x₂
            dy = y₁ - y₂
            if dx * dx + dy * dy <= r₁ * r₁:
                adj[i].append(j)

    def bfs(start):
        visited = set([start])
        q = deque([start])
        while q:
            curr = q.popleft()
            for nb in adj[curr]:
                if nb not in visited:
                    visited.add(nb)
                    q.append(nb)
        return len(visited)

    result = 0
    for i in range(n):
        # try detonating from every bomb
        result = max(result, bfs(i))
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) for building the graph (for each pair), plus for each bomb, up to O(n) traversal → O(n³) in worst case as we run O(n) BFSs (`n` bombs each traverse `n` nodes at most).
- **Space Complexity:** O(n²) for adjacency list, O(n) for BFS visited set/queue.

### Potential follow-up questions (as if you’re the interviewer)  

- What if each bomb costs a different amount to manually detonate, and you have a budget?
  *Hint: Consider greedy selection or introduce weights.*

- What if after detonating, each chain can only travel a certain number of links?
  *Hint: Use BFS with a depth limit.*

- Can you optimize if all bombs lie on a straight line?
  *Hint: Sort the bombs and only check left/right neighbors.*

### Summary
This is a **graph traversal** problem: model bombs as nodes and detonations as directed edges.  
Simulate the maximum possible chain reaction starting at each node, using BFS or DFS.  
Pattern: “Try every start, collect reachables” — common in problems like “spread” or “contamination” in grids/graphs.  
Useful for virus spread, influence maximization, or other reachability/cascade questions.


### Flashcard
Build a directed graph where an edge exists if one bomb can detonate another; for each bomb, DFS/BFS to count the total detonations.

### Tags
Array(#array), Math(#math), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph), Geometry(#geometry)

### Similar Problems
- Minesweeper(minesweeper) (Medium)
- Number of Provinces(number-of-provinces) (Medium)
- Max Area of Island(max-area-of-island) (Medium)
- Rotting Oranges(rotting-oranges) (Medium)