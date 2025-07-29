### Leetcode 685 (Hard): Redundant Connection II [Practice](https://leetcode.com/problems/redundant-connection-ii)

### Description  
Given a directed graph that was originally a **rooted tree** (a directed acyclic graph with one root node and all other nodes having exactly one parent), an extra edge was added, possibly making the graph invalid (with either a cycle or a node with two parents). Your task: **Find and return the edge that can be removed to restore the graph to a rooted tree**. If there are multiple possible edges, return the last one that appears in the input.

In other words, after removing this edge, the graph must:
- Have exactly one root (node with no parents)
- All nodes except the root have exactly one parent
- No cycles

### Examples  

**Example 1:**  
Input: `edges = [[1,2],[1,3],[2,3]]`  
Output: `[2,3]`  
*Explanation: Node 3 gets two parents (1 and 2). Removing the edge `[2,3]` restores the tree structure.*

**Example 2:**  
Input: `edges = [[1,2],[2,3],[3,4],[4,1],[1,5]]`  
Output: `[4,1]`  
*Explanation: There’s a cycle involving nodes 1,2,3,4. Removing `[4,1]` breaks the cycle and leaves a rooted tree.*

**Example 3:**  
Input: `edges = [[2,1],[3,1],[4,2],[1,4]]`  
Output: `[2,1]`  
*Explanation: Node 1 has two parents (2, 3). Also, there’s a cycle: 4→2→1→4. According to the problem rules, remove the edge `[2,1]`.*

### Thought Process (as if you’re the interviewee)

- **Understanding the problem:**  
  The graph was originally a rooted tree. Adding one directed edge may:
  - Create a cycle
  - Make a node have two parents
  - Or both
  Our goal is to find the "bad" edge to remove so the tree property is restored, favoring the edge that appears last in the input.

- **Naive approach:**
  - Try removing each edge one by one, and for each, check if the graph is a rooted tree.  
  - This is **slow** (O(n³)) since validating if the entire graph is a tree after each removal is expensive.

- **Optimal approach (Union-Find, also called DSU):**
  - **Step 1:** Check for a node with two parents. Track any such two edges as candidates.
  - **Step 2:** For each edge (ignoring the later-found candidate edge for step 1), perform union-find to see if adding the edge creates a cycle.
  - **Decision:**  
    - If there's a node with two parents:
      - If adding the "earlier edge" forms a cycle, that is the redundant edge.
      - Else, the "later edge" is redundant.
    - If *no* node has two parents, the edge creating the cycle is the redundant edge.
  - **Why Union-Find?**  
    Efficient at cycle detection (O(α(n)) per operation, nearly constant time).

- **Trade-offs:**  
  Correctly handling both “two parents” and “cycle” scenarios avoids excessive graph traversals, keeping the algorithm efficient.

### Corner cases to consider  
- Edge case where the extra edge causes both a node with two parents **and** a cycle.
- The extra edge may simply create a cycle (no node has two parents).
- Edge may make a node have two parents, but not cause a cycle.
- Nodes up to n=1000, possible need for path compression in union-find.
- Input where both candidate edges must be checked for cycles.
- Edge indices start from 1 (node labels).

### Solution

```python
def findRedundantDirectedConnection(edges):
    n = len(edges)
    parent = [0] * (n + 1)  # parent[i] is the parent of node i
    cand1 = None  # First edge causing double-parent, earliest in list
    cand2 = None  # Second edge causing double-parent, latest in list

    # Step 1: Check for a node with two parents
    for u, v in edges:
        if parent[v] == 0:
            parent[v] = u
        else:
            cand1 = [parent[v], v]
            cand2 = [u, v]
            break  # node with two parents found

    # Helper to find the root with path compression
    def find(anc, x):
        while anc[x] != x:
            anc[x] = anc[anc[x]]
            x = anc[x]
        return x

    # Step 2: Union-Find to detect cycle
    anc = [i for i in range(n + 1)]
    for u, v in edges:
        # If double-parent, skip cand2 edge for now
        if cand2 and [u, v] == cand2:
            continue
        pu, pv = find(anc, u), find(anc, v)
        if pu == pv:
            # Found a cycle
            if cand1:
                return cand1
            else:
                return [u, v]
        anc[pv] = pu  # Union

    # If reached here, and cand2 exists: deleting cand2 fixes the problem
    return cand2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Each edge is processed once, and with path compression union-find is nearly O(1) per operation.
- **Space Complexity:** O(n)  
  - Storing parent and anc arrays of size n+1.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are multiple edges added instead of just one?  
  *Hint: How would your approach change if more than one “bad edge” is present? Would union-find scale?*

- Can you detect which nodes are part of a cycle, and return them all?  
  *Hint: Union-find can label components; how would you extract the full cycle?*

- Could this algorithm be extended for undirected graphs or non-tree input?  
  *Hint: How does rootness vs. general connectivity affect the edge removal logic?*

### Summary
This problem leverages the **Union-Find (Disjoint Set Union) pattern** combined with extra bookkeeping for nodes with two parents. The key insight is to classify the added edge’s impact as either creating a cycle, introducing a node with two parents, or both—and address each possibility directly. This type of DSU-based cycle and parent tracking is a common pattern for graph problems involving tree restoration or minimal re-connection, and is widely applicable in network validation and dependency resolution tasks.