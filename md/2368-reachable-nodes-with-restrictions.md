### Leetcode 2368 (Medium): Reachable Nodes With Restrictions [Practice](https://leetcode.com/problems/reachable-nodes-with-restrictions)

### Description  
Given an undirected tree with `n` nodes labeled from 0 to n-1, edges describe which nodes are directly connected. Some nodes are labeled as restricted; these nodes are blocked and cannot be visited (nor can their neighbors be explored through them). Starting from node 0, determine how many nodes are reachable without passing through any restricted node.

### Examples  

**Example 1:**  
Input:  
`n = 7`,  
`edges = [[0,1],[1,2],[3,1],[4,0],[0,5],[5,6]]`,  
`restricted = [4,5]`  
Output: `4`  
*Explanation: Nodes 0, 1, 2, and 3 are reachable. Nodes 4 and 5 are restricted, blocking themselves and anyone connected through them. Node 6 can only be reached via 5, which is restricted. The explored portion is as follows:*  
```
    0
   / \
  1   4 (restricted)
 / \   \
2   3   5 (restricted)
           \
            6
```
*Nodes in bold (0,1,2,3) are reachable.*

**Example 2:**  
Input:  
`n = 4`,  
`edges = [[0,1],[1,2],[2,3]]`,  
`restricted = [2]`  
Output: `2`  
*Explanation: Only nodes 0 and 1 are reachable. Node 2 is restricted (and blocks access to node 3 which is otherwise only accessible via 2).*  
```
0
|
1
|
2 (restricted)
|
3
```

**Example 3:**  
Input:  
`n = 5`,  
`edges = [[0,1],[0,2],[3,4]]`,  
`restricted = [3,4]`  
Output: `3`  
*Explanation: Component containing nodes 3 and 4 is restricted from access. Only nodes 0, 1, and 2 are accessible:*
```
  0
 / \
1   2   3 (restricted)-4 (restricted)
```

### Thought Process (as if you’re the interviewee)  

First, since the graph is a tree, it is connected and acyclic. Starting from node 0, I need to traverse as far as possible without entering restricted nodes. Classic traversal algorithms like Depth-First Search (DFS) or Breadth-First Search (BFS) are ideal.

- **Brute Force Approach:** Traverse all nodes using DFS or BFS. If a restricted node is found, don’t explore its neighbors.
- **Optimization:** Use a set for restricted nodes for O(1) lookups. Use a `visited` array to avoid cycles (even though trees don’t have cycles, it handles disconnected nodes and ensures correctness).

By marking restricted nodes as already visited (or simply skipping them), the traversal won’t go further into their connected regions. This prevents us from accidentally visiting inaccessible nodes.

### Corner cases to consider  
- All nodes are restricted except 0: Only node 0 is reachable.
- No restricted nodes: All nodes are reachable.
- The root (node 0) is never restricted by problem statement.
- Multiple isolated tree branches due to restrictions.
- No edges (n = 1): Only node 0 is reachable.
- Empty `restricted` array.

### Solution

```python
from collections import defaultdict
from typing import List

def reachableNodes(n: int, edges: List[List[int]], restricted: List[int]) -> int:
    # Build adjacency list for the tree
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)

    # Use a set for O(1) restricted node checks
    restricted_set = set(restricted)
    visited = set()

    def dfs(node):
        visited.add(node)
        count = 1  # Count self
        for neighbor in graph[node]:
            if neighbor not in visited and neighbor not in restricted_set:
                count += dfs(neighbor)
        return count

    return dfs(0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Every node and edge is visited at most once.
- **Space Complexity:** O(n). Needed for the adjacency list, the visited set, and recursion stack (in the worst case, the tree is a straight line).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the graph contains cycles?  
  *Hint: How would BFS/DFS traversals and visited set need to be adjusted?*
  
- How would you find the shortest path to any accessible node from the root, ignoring restricted nodes?  
  *Hint: BFS will give shortest paths; track steps per node.*

- How would your method change for hundreds of queries, each asking reachability for a different start node?  
  *Hint: Can precompute connected components for unrestricted parts, or cache reachability.*

### Summary
This approach uses a standard **DFS traversal pattern** with careful handling of restricted nodes, which is very common in tree and graph traversal problems. Marking restricted nodes as non-reachable before traversal is a simple way to block off certain parts of the graph. This pattern is widely useful for any graph search or constraint-based traversal, such as "flood fill" problems, reachability with forbidden zones, or navigating permissions/access in networks.


### Flashcard
Mark restricted nodes in a set; run DFS/BFS from node 0, counting all visited nodes while avoiding restricted ones. O(n) time.

### Tags
Array(#array), Hash Table(#hash-table), Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Graph(#graph)

### Similar Problems
- Open the Lock(open-the-lock) (Medium)
- Minimum Jumps to Reach Home(minimum-jumps-to-reach-home) (Medium)