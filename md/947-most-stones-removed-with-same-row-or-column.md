### Leetcode 947 (Medium): Most Stones Removed with Same Row or Column [Practice](https://leetcode.com/problems/most-stones-removed-with-same-row-or-column)

### Description  
Given n stones placed at integer coordinates in a 2D plane, you can remove a stone if there is **at least one other stone that shares its row or column** and is still on the board. Each coordinate has at most one stone.  
You must determine the **maximum number of stones you can remove**, following this rule, leaving at least one stone in each connected group (based on row/column links).

### Examples  

**Example 1:**  
Input: `stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]`  
Output: `5`  
*Explanation: All stones form a single group through shared rows/columns. Any sequence of removals will ultimately leave only one stone from this group; thus, you can remove 5 of the 6 stones.*

**Example 2:**  
Input: `stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]`  
Output: `3`  
*Explanation: Three stones in a "+" shape form a single group, and two on the sides remain connected. Three stones can be removed in total, one per group except for the last one.*

**Example 3:**  
Input: `stones = [[0,0]]`  
Output: `0`  
*Explanation: Only one stone exists; no removal is possible.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try removing each stone recursively, checking at every step if another stone shares its row or column. This approach is far too slow (exponential), as every removal changes the connections.
- **Graph Approach:** Realize each stone can be treated as a node in a graph, where stones are connected (an edge exists) if they share a row or column.
  - The game can be reframed: each _connected component_ in the graph can have all but one stone removed (the process must always leave at least one stone in each component).
- So, the problem reduces to: **maximum stones removed = total number of stones - number of connected components**.
- **Optimized Approach:** Use Depth-First Search (DFS) or Union Find (Disjoint Set Union, DSU) to count components.

### Corner cases to consider  
- No stones: `stones = []` → Output: `0`
- All stones are isolated (no two share a row or column): No removal possible.
- All stones in a line (row or column): Can remove all but one.
- Stones making several disconnected clusters.
- Large n, to test performance.

### Solution

```python
def removeStones(stones):
    # Map from coordinate to stone indices
    from collections import defaultdict
    graph = defaultdict(list)
    n = len(stones)

    # Build a connection graph based on rows and columns
    for i in range(n):
        for j in range(i+1, n):
            # If stones share a row or a column
            if stones[i][0] == stones[j][0] or stones[i][1] == stones[j][1]:
                graph[i].append(j)
                graph[j].append(i)

    visited = set()
    components = 0

    def dfs(node):
        visited.add(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor)

    # Count the components using DFS
    for i in range(n):
        if i not in visited:
            dfs(i)
            components += 1

    return n - components
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²). Each pair of stones may be checked for sharing a row or column. DFS traversal is O(n).
- **Space Complexity:** O(n²) worst case for the adjacency list if all stones are in the same row or column; O(n) if sparse. O(n) extra for visited set and recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- If the board size is huge (coordinates can be very big), but the number of stones is small, can we optimize further?
  *Hint: Use hash maps for coordinates.*
- Can you solve this with Union-Find/DSU for even faster lookup and handling?
  *Hint: Represent rows/columns with union find indexes.*
- What if a stone could also be removed if it shares a diagonal?
  *Hint: Change connection logic to also check |x₁ − x₂| == |y₁ − y₂|.*

### Summary
This problem is a classic **connected components counting** applied to a grid, often solved with **DFS or Union Find (DSU)**. The key idea is recognizing removals depend on groupings, and in any group, all but one can be removed.  
This pattern (grouping by connections, counting components, removing all but one item) is common in union-find/DSU and graph traversal problems. It applies in network connectivity, friend circles, islands in grid, and more.

### Tags
Hash Table(#hash-table), Depth-First Search(#depth-first-search), Union Find(#union-find), Graph(#graph)

### Similar Problems
- Minimum Moves to Get a Peaceful Board(minimum-moves-to-get-a-peaceful-board) (Medium)