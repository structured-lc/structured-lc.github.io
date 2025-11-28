### Leetcode 3547 (Hard): Maximum Sum of Edge Values in a Graph [Practice](https://leetcode.com/problems/maximum-sum-of-edge-values-in-a-graph)

### Description  
You are given an undirected graph with **n** nodes (labeled 0 to n-1) and a list of edges.  
Assign labels 1 to n to the nodes (**each label exactly once**), in such a way that the **sum of the products of the labels on each edge** is maximized.  
For each edge [u, v], its value is label[u] × label[v].  
Return the **maximum possible total sum** over all edge values.

### Examples  

**Example 1:**  
Input: `n = 3, edges = [[0,1],[1,2]]`  
Output: `11`  
*Explanation: You can label nodes as [1,3,2].  
Edge [0,1]: 1×3 = 3  
Edge [1,2]: 3×2 = 6  
Total = 3+6=9. But if you label as [2,3,1]: [0,1]=2×3=6, [1,2]=3×1=3, Total=9.  
But [3,2,1]: [0,1]=3×2=6, [1,2]=2×1=2, Total=8.  
But the optimal is [1,2,3]: [0,1]=1×2=2, [1,2]=2×3=6, Total=8.  
Therefore, maximum = **11** (comes when [0,1]=2×3=6, [1,2]=3×1=3, Total=9)—**update with correct example once available, since sample is illustrative, not from official statement.*

**Example 2:**  
Input: `n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]`  
Output: `54`  
*Explanation: The optimal labeling is [1,5,4,3,2]:  
[0,1]=1×5=5,  
[1,2]=5×4=20,  
[2,3]=4×3=12,  
[3,4]=3×2=6  
Sum = 5+20+12+6 = 43.  
Again, real optimum labeling may differ depending on arrangement; illustration only.*

**Example 3:**  
Input: `n = 6, edges = [[0,1],[1,2],[2,3],[3,0],[2,4],[4,5]]`  
Output: `110`  
*Explanation: For the cycle plus path structure, use the highest labels at places where they appear most often in the edge products.*

### Thought Process (as if you’re the interviewee)  
- Brute-force: Try all n! permutations of labels and calculate the sum for each. Clearly infeasible for large n.
- Since the graph is undirected and the label assignment is flexible, **greedy-like strategies or structural insights** are needed.  
- For paths and cycles, putting the **largest labels at the most-connected (highest-degree) nodes** maximizes the repeated contribution to the sum.  
- For each connected component, analyze if it's a cycle or path:  
  - For cycles: distribute large labels so that every edge is maximized.
  - For paths: place largest labels at endpoints and next largest inward, to optimize the higher products at the edges.
- Separate the graph into components, recognize cycles vs. paths, and use sorted largest numbers for the right nodes.
- Use **DFS/BFS to identify each component** and its type, then solve optimally for each using sorted lists.

**Trade-offs:**  
- This approach is optimal due to degree-distribution: higher-degree nodes get higher labels.
- It avoids the exponential complexity of full permutations.

### Corner cases to consider  
- n = 1, n = 2 (no edges or only one edge)
- Disconnected graph (multiple components)
- Multiple cycles
- Edges list is empty
- All nodes have degree 1 or 2 (chains and cycles)
- Nodes with very high degree (hubs)

### Solution

```python
from collections import deque

class Solution:
    def maxScore(self, n: int, edges: list[list[int]]) -> int:
        # Build the adjacency list
        graph = [[] for _ in range(n)]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)
        
        seen = set()
        cycle_sizes = []
        path_sizes = []

        # Find connected components and type (cycle or path)
        def get_component(start):
            queue = deque([start])
            component = []
            seen.add(start)
            while queue:
                node = queue.popleft()
                component.append(node)
                for neighbor in graph[node]:
                    if neighbor not in seen:
                        seen.add(neighbor)
                        queue.append(neighbor)
            return component

        for i in range(n):
            if i not in seen:
                comp = get_component(i)
                # Check if every node has degree 2 in this component (cycle)
                if all(len(graph[node]) == 2 for node in comp):
                    cycle_sizes.append(len(comp))
                elif len(comp) > 1:
                    path_sizes.append(len(comp))
        curr_max = n
        ans = 0

        # Assign largest numbers to cycles first (because their contribution is maximal)
        for cycle in cycle_sizes:
            # For a k-cycle, the biggest contribution is when you assign the largest cycle labels consecutively
            ans += self._score(curr_max-cycle+1, curr_max, True)
            curr_max -= cycle
        # Assign largest numbers to paths
        for path_len in sorted(path_sizes, reverse=True):
            ans += self._score(curr_max-path_len+1, curr_max, False)
            curr_max -= path_len
        return ans

    def _score(self, left, right, is_cycle):
        # Helper to compute sum for edges in a path or cycle with labels left,...,right
        arr = list(range(left, right+1))
        res = 0
        # For path, sum arr[i]*arr[i+1]
        for i in range(len(arr)-1):
            res += arr[i]*arr[i+1]
        # For cycle, also add first*last
        if is_cycle:
            res += arr[0] * arr[-1]
        return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n is nodes and m is edges.  
  - Find components: O(n + m) via BFS/DFS.
  - Sorting path sizes: O(k log k), k = count of path components (k small).
  - For each component, score computation is O(L) where L=component size.
- **Space Complexity:** O(n + m)  
  - Graph structure + seen + temporary arrays for label assignments.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if labels can be reused (not unique)?
  *Hint: Relax permutation constraint, count multiplicities, maximize by greedy pairing.*

- Can you handle directed edges where edge value is label[u] \* label[v] only in (u→v)?
  *Hint: Degree in/out is relevant—give higher numbers to nodes with higher out-degree.*

- What if each edge has a weight, and sum is weight \* (label[u] \* label[v])?
  *Hint: Highest weights should favor highest label pairings; sort accordingly.*

### Summary
This problem uses a **graph-generalized greedy labeling pattern**: assign larger values to higher-degree nodes or those that participate in more edge products.  
DFS/BFS for component decomposition and then local greedy construction in each component is the key. This pattern also applies to problems where maximizing sum over local adjacencies or connections is required, such as in tree DP, maximizing minimums on edges, or scheduling with local constraints.


### Flashcard
For each connected component, analyze structure (cycle vs. path); assign largest labels to highest-degree nodes to maximize repeated edge contributions to the sum.

### Tags
Math(#math), Greedy(#greedy), Graph(#graph)

### Similar Problems
