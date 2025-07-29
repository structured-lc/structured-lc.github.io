### Leetcode 2876 (Hard): Count Visited Nodes in a Directed Graph [Practice](https://leetcode.com/problems/count-visited-nodes-in-a-directed-graph)

### Description  
Given a directed graph with n nodes (labeled 0 to n−1), represented as an array `edges` where edges[i] is the node that node i has a directed edge to, for each node i, calculate how many distinct nodes can be visited by starting at i and repeatedly following the edges until you visit a node that you have already visited in this process. In other words, for each node, count the number of unique nodes visited before encountering a cycle or a repeated node.

### Examples  

**Example 1:**  
Input: `edges = [1, 2, 0]`  
Output: `[3, 3, 3]`  
*Explanation: Each node leads to a single cycle: 0 → 1 → 2 → 0.  
Starting at any node, you eventually visit all three nodes before repeating.*

**Example 2:**  
Input: `edges = [1, 2, 3, 4, 2]`  
Output: `[5, 4, 3, 3, 3]`  
*Explanation:  
- 0 → 1 → 2 → 3 → 4 → 2 (cycle starts here, so 5 unique nodes)  
- 1 → 2 → 3 → 4 → 2 (cycle, so 4 unique nodes)
- 2 → 3 → 4 → 2   (cycle, so 3 unique nodes)
- 3 → 4 → 2 → 3   (cycle, so 3 unique nodes)
- 4 → 2 → 3 → 4   (cycle, so 3 unique nodes)*

**Example 3:**  
Input: `edges = [2, 2, 3, 4, 0, 2]`  
Output: `[4, 4, 4, 4, 5, 4]`  
*Explanation: All paths eventually hit the cycle 2 → 3 → 4 → 0 → 2, except for node 4, which has a self-contained loop including node 0, so node 4 covers all 5 nodes.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: For each node, simulate the traversal keeping a seen set, counting unique steps until a node repeats. This is O(n²), since a chain can be as long as n for each start.
- **Optimized approach**: Notice that once a node's result is known (for nodes inside a cycle), you can reuse that instead of recomputing for every start. DFS with memoization is suitable:
  - For each node, detect cycles (using a path stack or visitation order).
  - Track nodes that participate in a cycle vs paths that reach a cycle.
  - Record and propagate the answer: For cycle nodes, length of cycle; for others, path length = 1 + answer of the next node.
- **Why final approach**: Avoids redundant computation by caching answers and allows us to efficiently jump across nodes by using DFS+memoization, guaranteed O(n) time.

### Corner cases to consider  
- Empty graph (n = 0): Not allowed as per constraints (guaranteed n nodes).
- Self-loops: edges[i] == i; single-node cycles.
- Disjoint cycles: Subgraphs not connected.
- Linear chain feeding into a cycle.
- All nodes forming a cycle.
- Paths that revisit a node not at root (complex cycles).

### Solution

```python
def count_visited_nodes(edges):
    n = len(edges)
    ans = [0] * n        # Store result for each node
    visited = [0] * n    # 0 = unvisited, 1 = visiting, 2 = processed
    
    def dfs(node, path, index_at_visit):
        if visited[node] == 2:
            return ans[node]
        if visited[node] == 1:
            # Cycle detected
            cycle_start = index_at_visit[node]
            cycle_len = len(path) - cycle_start
            # All nodes in cycle get cycle_len
            for i in range(cycle_start, len(path)):
                ans[path[i]] = cycle_len
                visited[path[i]] = 2
            return cycle_len

        visited[node] = 1
        path.append(node)
        index_at_visit[node] = len(path) - 1
        res = dfs(edges[node], path, index_at_visit)
        if visited[node] != 2:
            ans[node] = res + (visited[edges[node]] != 2)
            visited[node] = 2
        path.pop()
        return ans[node]

    for i in range(n):
        if visited[i] == 0:
            dfs(i, [], [0]*n)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each node is visited at most twice: once during DFS traversal and possibly again when part of a cycle propagation.
- **Space Complexity:** O(n). Used for `ans`, `visited`, and recursion stack/temporary path storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the edges array is not guaranteed to contain exactly one outgoing edge per node?  
  *Hint: How would you handle nodes with multiple outgoing edges? (Use BFS/DFS for general graphs, more state management needed)*

- How would you solve this if you had to also return the specific set of nodes visited, not just the count?  
  *Hint: Instead of just memoizing counts, return sets or lists of nodes; merge as needed, but be cautious about time and space.*

- What if nodes are weighted, and you must return the maximum/minimum path sum instead of count?  
  *Hint: Modify DFS to propagate path-weight computations; consider use of Dijkstra if necessary.*

### Summary
This problem leverages the *cycle detection in directed graphs* and *memoization* pattern. It uses DFS with state marking and answer caching, efficiently avoiding duplicate work. The approach is widely applicable to cycle-based and repeat/loop-detection style graph problems, including problems with function composition, linked lists, or finding "eventually safe" nodes in graphs.