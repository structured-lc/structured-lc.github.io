### Leetcode 797 (Medium): All Paths From Source to Target [Practice](https://leetcode.com/problems/all-paths-from-source-to-target)

### Description  
Given a **directed acyclic graph (DAG)** with `n` nodes labeled from `0` to `n-1`, find **all possible paths from node 0 (source) to node n-1 (target)**. The graph is given as an adjacency list (i.e., `graph[i]` contains all nodes you can go to directly from `i`).  
Your job is to return *all sequences* of nodes showing each possible path from `0` to `n-1`, in any order.

### Examples  

**Example 1:**  
Input: `graph = [[1,2],[3],[3],[]]`  
Output: `[[0,1,3],[0,2,3]]`  
*Explanation:  
The graph structure is:*
```
0
├─> 1
│    └─> 3
└─> 2
     └─> 3
```
*There are two paths: 0 → 1 → 3 and 0 → 2 → 3.*

**Example 2:**  
Input: `graph = [[4,3,1],[3,2,4],[3],[4],[]]`  
Output: `[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]`  
*Explanation:  
There are several paths from 0 to 4, through different combinations of nodes, but all end at node 4.*

**Example 3:**  
Input: `graph = [[1],[]]`  
Output: `[[0,1]]`  
*Explanation:  
Only one path: 0 → 1.*

### Thought Process (as if you’re the interviewee)  
- The problem wants **all possible paths** from 0 to n-1 in a DAG. Since it’s a DAG (no cycles), we don’t need to worry about infinite loops when traversing.
- **Brute-force approach**: List every possible way to go from 0 to n-1. Since multiple paths may diverge at every node, trying all options is necessary.
- The natural way to do this is **backtracking + DFS**:  
  - Start from node 0.
  - For every neighbor, recursively search, adding that node to our current path.
  - When we reach node n-1, save the path.
  - After each recursion, backtrack to explore other possible options.
- Why not BFS? BFS also works (by storing partial paths in a queue), but DFS with backtracking is more natural here and uses less memory for intermediate paths.  
- **Trade-offs:**  
  - Time complexity grows exponentially with the number of paths.
  - Memory is mainly for the output (all paths), but stack/queue usage is manageable due to no cycles.

### Corner cases to consider  
- The graph has only two nodes: only one path.
- Some nodes have no outgoing edges except the last node.
- The graph has branching, i.e., nodes with multiple neighbors.
- Large graphs: Consider the explosion of the number of paths.
- The graph already contains the target at the source (edge case, but not possible as per constraints).

### Solution

```python
def allPathsSourceTarget(graph):
    """
    Returns all paths from node 0 to node n-1 in a directed acyclic graph.
    """
    res = []
    n = len(graph)

    def dfs(node, path):
        # If we've reached the target, save the current path
        if node == n - 1:
            res.append(path[:])
            return
        # Recursively visit all neighbors
        for neighbor in graph[node]:
            path.append(neighbor)
            dfs(neighbor, path)
            path.pop()  # backtrack

    dfs(0, [0])
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** Exponential in the worst case. For a graph where every node is connected to every other node (`n` nodes), number of possible paths can be up to 2ⁿ, as each path can diverge at every node.
- **Space Complexity:**  
  - Output: O(P × L), where `P` is the number of paths, `L` is their average length.
  - Stack: O(L) for the recursion stack (max path length is n).
  - Other extra space is minimal.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the graph could have cycles?  
  *Hint: You would need to keep a visited set to prevent repeating nodes in a single path.*

- How would you handle extremely large graphs where the number of paths could be very high?  
  *Hint: Maybe just count the number of paths, or limit the search to paths no longer than K nodes.*

- Could you return the shortest path(s) only?  
  *Hint: Use BFS to find the shortest paths, and collect all reaching the target with minimal length.*

### Summary
This problem exemplifies the **backtracking + DFS** pattern for finding all valid paths/solutions in a search space. The approach is common in problems involving paths, combinations, permutations, or solving brainteasers with branching choices. The technique avoids cycles (guaranteed by DAG here), and is memory-efficient except for the output size. Variants are widely used in puzzles, AI (finding all solutions), games, and certain graph path analyses.