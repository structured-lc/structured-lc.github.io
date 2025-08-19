### Leetcode 3203 (Hard): Find Minimum Diameter After Merging Two Trees [Practice](https://leetcode.com/problems/find-minimum-diameter-after-merging-two-trees)

### Description  
Given two trees (undirected, connected, acyclic graphs), each represented by their edge lists, merge them into a single tree by adding exactly one new edge connecting any node from the first tree to any node in the second tree.  
Find the minimum possible diameter of the resulting tree.  
The **diameter** of a tree is the length of the longest path between any two nodes. Your goal is to optimally select nodes to connect from each tree so that this maximum path (diameter) in the merged tree is minimized.

### Examples  

**Example 1:**  
Input: `edges1=[[0,1]], edges2=[[0,1]]`  
Output: `3`  
*Explanation: Each tree is just an edge; after connecting, the longest path will go through both trees and the connecting edge: path length = 3.*

**Example 2:**  
Input: `edges1=[[0,1]], edges2=[[0,1],[1,2]]`  
Output: `3`  
*Explanation: The first tree is a line with 2 nodes; the second tree is a line with 3 nodes. After optimally connecting, the longest path is 3: for instance, from leaf(0 in tree1) to leaf(2 in tree2) with the connector in between.*

**Example 3:**  
Input: `edges1=[[0,1],[1,2]], edges2=[[0,1],[1,2],[2,3]]`  
Output: `5`  
*Explanation: Both input trees are lines (lengths 3 and 4). Connect their centers (to minimize diameter). New diameter is 5.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force** approach: Try connecting every node in tree1 with every node in tree2, compute the resulting tree’s diameter each time, and return the minimum. This is computationally expensive (O(n²m²)) and not viable for large trees.
- **Optimized strategy:**  
  - Realize that the optimal link should be near the "center" of each tree (the midpoint of its diameter), minimizing the maximal path.
  - The **longest path after merging** will be the greater of:
    1. Either input tree’s original diameter (if both endpoints are in a single tree).
    2. The sum of the radii (smallest max distance from any node to furthest leaf) of each tree **plus 1** (for the new connecting edge):  
       result = max(d₁, d₂, r₁ + r₂ + 1)
  - To compute diameter & radius:  
    - Run BFS/DFS from an arbitrary node to find the farthest node (one endpoint of the diameter).
    - Run BFS/DFS from that node to find the real farthest node; the length of this path is the diameter.
    - The **radius** is ⌊diameter/2⌋ if diameter even, (diameter+1)//2 in Python.
  - This is fast: two passes per tree, then a simple calculation.
- **Why this works:** The longest possible path is either contained in one tree or stretches across both trees via the new edge, reaching at most (r₁ + r₂ + 1).

### Corner cases to consider  
- Both trees are just single nodes.
- One or both trees are long paths (line/chain structure).
- Deep "bush" vs. flat "star" (check what happens if one tree already has a big internal diameter).
- Both trees are already nearly the same size or shape.
- Trees with only two nodes.

### Solution

```python
from collections import deque, defaultdict
from typing import List

def tree_diameter(edges: List[List[int]]) -> int:
    if not edges:
        return 0
    # Build adjacency list
    adj = defaultdict(list)
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    # Find farthest node from arbitrary node (say, the lowest id)
    def bfs(start):
        visited = set()
        queue = deque([(start, 0)])
        far_node = start
        max_dist = 0
        while queue:
            node, dist = queue.popleft()
            visited.add(node)
            if dist > max_dist:
                max_dist = dist
                far_node = node
            for nei in adj[node]:
                if nei not in visited:
                    queue.append((nei, dist + 1))
        return far_node, max_dist

    any_node = list(adj.keys())[0]
    node_far, _ = bfs(any_node)
    _, diameter = bfs(node_far)
    return diameter

def minimum_diameter_after_merge(edges1: List[List[int]], edges2: List[List[int]]) -> int:
    # Calculate diameters for both trees
    d1 = tree_diameter(edges1)
    d2 = tree_diameter(edges2)
    # Calculate radius for both trees (radius = (diameter + 1) // 2)
    r1 = (d1 + 1) // 2
    r2 = (d2 + 1) // 2
    # The minimum diameter after merging optimally is:
    return max(d1, d2, r1 + r2 + 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n₁ + n₂) where n₁, n₂ = number of nodes in each tree—since we do two BFS runs per tree and each edge is visited once per BFS.
- **Space Complexity:**  
  O(n₁ + n₂) for adjacency lists and BFS queues/visited sets.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could add **two** edges between the trees?  
  *Hint: Consider how two connecting edges can create cycles or reduce the maximum shortest-path distance further.*
- How would the approach change if the graphs could have cycles (i.e., were not trees)?  
  *Hint: Tree properties would no longer hold; consider shortest paths and all-pairs distances.*
- How would you modify the solution for **weighted** edges?  
  *Hint: Use Dijkstra’s algorithm to compute true diameters/radii respecting edge weights.*

### Summary
This problem uses the **tree diameter** calculation pattern (two-pass BFS/DFS) and a center/radius analysis for optimal joining. It's a classic tree structure problem with an optimal "merge at centers" insight, generalizable for tree merging and minimum-diameter problems in distributed/networked systems. This approach can also be applied wherever tree representations are joined and properties like maximal distances need to be managed efficiently.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph)

### Similar Problems
- Minimum Height Trees(minimum-height-trees) (Medium)
- Tree Diameter(tree-diameter) (Medium)
- Maximize the Number of Target Nodes After Connecting Trees I(maximize-the-number-of-target-nodes-after-connecting-trees-i) (Medium)
- Maximize the Number of Target Nodes After Connecting Trees II(maximize-the-number-of-target-nodes-after-connecting-trees-ii) (Hard)
- Maximize Sum of Weights after Edge Removals(maximize-sum-of-weights-after-edge-removals) (Hard)