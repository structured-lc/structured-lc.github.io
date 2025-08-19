### Leetcode 3383 (Hard): Minimum Runes to Add to Cast Spell [Practice](https://leetcode.com/problems/minimum-runes-to-add-to-cast-spell)

### Description  
You are given a spell consisting of **n focus points**. Some focus points contain a **magic crystal** (they are energy sources, index in the `crystals` array). Some focus points are already connected by **directed runes** (`flowFrom[i]` → `flowTo[i]`, meaning magic can flow in this direction).  
Your task: **Add the minimum number of new directed runes** so that after adding them, **every focus point is either**:
- Contains a magic crystal, or
- Receives magic flow (directly or indirectly) from another focus point.

In other words, every focus point must either be a source (crystal), or be reachable from a source by a path of runes (existing or added).

### Examples  

**Example 1:**  
Input: `n=6`, `crystals=`, `flowFrom=[0,1,2]`, `flowTo=[1,2,3]`  
Output: `2`  
*Explanation: Only 0 is a crystal (source). Nodes 1/2/3 are already reachable from 0 via the given runes. But nodes 4 and 5 are not reachable. So, you must add runes from any node on the magic path to node 4 and node 5. Minimum runes needed = 2 (e.g., 0→4 and 0→5).*

**Example 2:**  
Input: `n=3`, `crystals=[0,2]`, `flowFrom=[0,1]`, `flowTo=[1,2]`  
Output: `0`  
*Explanation: 0 and 2 are crystals. 1 is reachable from 0 (via 0→1), so every node is either a crystal or receives magic flow.*

**Example 3:**  
Input: `n=4`, `crystals=[]`, `flowFrom=[]`, `flowTo=[]`  
Output: `4`  
*Explanation: No crystals, no connections. Each node needs to either have a crystal or be connected. Since nothing is given, you must connect every node to a crystal (but there are none), so you must add 4 runes (each node to a new "virtual" source), or equivalently, make each node a crystal.*

### Thought Process (as if you’re the interviewee)  
This is a **graph connectivity problem**. 
- Brute-force: For every node, check if it is a crystal or is reachable from any crystal. If not, add a rune.  
- But we must do better — the problem is about adding the MINIMUM runes.
- Rephrase: Mark all nodes reachable from crystals (using BFS/DFS from all crystals). The nodes that are never reached must each become reachable (i.e., connected somehow).
- If more than one of these "unreachable components" exist, we need to connect them with runes to a source.
- If the "unreachable nodes" themselves form separate connected components (strongly connected in a directed graph), we can minimize new runes by connecting each such component with a single new rune.

**Optimized Approach:**  
- Run BFS from all crystals to mark all reachable nodes.
- For each remaining unvisited node, do a DFS/BFS to mark all nodes in its *unreachable component* (which may have cycles).
- For each "strongly connected component" (SCC) among these unvisited nodes, add a rune from a source to *one* node in the component.
- Number of runes to add = number of unreachable components (or SCCs without in-edges from crystals).

### Corner cases to consider  
- No crystals and no runes (must add for every node).
- All nodes already reachable from at least one crystal.
- Multiple disconnected components.
- One node only (with/without a crystal).
- Cycles in the graph, self-loops.
- All nodes are crystals (no runes needed).

### Solution

```python
def minimumRunnsToAdd(n, crystals, flowFrom, flowTo):
    # Build the graph
    from collections import defaultdict, deque

    graph = defaultdict(list)
    for u, v in zip(flowFrom, flowTo):
        graph[u].append(v)

    # Use BFS to find all nodes reachable from crystals
    visited = [False] * n
    queue = deque(crystals)
    for c in crystals:
        visited[c] = True

    while queue:
        node = queue.popleft()
        for nei in graph[node]:
            if not visited[nei]:
                visited[nei] = True
                queue.append(nei)

    # Count number of unreachable components
    def dfs(u, mark):
        stack = [u]
        while stack:
            node = stack.pop()
            mark[node] = True
            for nei in graph[node]:
                if not mark[nei]:
                    stack.append(nei)

    result = 0
    mark = visited[:]
    for i in range(n):
        if not mark[i]:
            # This is a new unreachable component, start DFS from here
            dfs(i, mark)
            result += 1

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n = number of nodes, m = number of runes (edges). Each node/edge is processed at most twice (during BFS and DFS).
- **Space Complexity:** O(n + m) — for the graph adjacency list, visited arrays, and BFS/DFS queues/stacks.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose crystals can be depleted after reaching a certain number of nodes — how do you handle this?  
  *Hint: Think of BFS/DFS with energy constraints, maybe shortest paths with node capacity.*

- What if each rune can only channel magic a limited number of times?  
  *Hint: Treat as edge-capacity problem; consider flow algorithms.*

- How would you modify the solution if some nodes require magic from *multiple* sources simultaneously?  
  *Hint: Consider multi-source connectivity and intersection of flows.*

### Summary
This problem is a type of **directed graph connectivity**, where you want to ensure all nodes are reachable from at least one designated "source" node (crystal). The standard BFS/DFS approach works efficiently due to the small number of crystals and the linearity of graph traversals. The problem is related to finding the number of **unreachable connected components** and is a variant of *minimum connections (edges) to make a directed graph source-connected*, a recurring pattern in directed graph design and maintenance algorithms. These techniques are broadly used in controlling reachability or dependency in systems and networks.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Graph(#graph), Topological Sort(#topological-sort)

### Similar Problems
- Minimum Number of Days to Disconnect Island(minimum-number-of-days-to-disconnect-island) (Hard)
- Minimum Edge Weight Equilibrium Queries in a Tree(minimum-edge-weight-equilibrium-queries-in-a-tree) (Hard)