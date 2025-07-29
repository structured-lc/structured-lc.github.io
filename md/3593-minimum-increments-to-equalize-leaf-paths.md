### Leetcode 3593 (Medium): Minimum Increments to Equalize Leaf Paths [Practice](https://leetcode.com/problems/minimum-increments-to-equalize-leaf-paths)

### Description  
Given an **undirected tree** with `n` nodes (`0` to `n-1`), rooted at node `0`, and a `cost` array where `cost[i]` is the cost of node `i`, you must make all **root-to-leaf path sums** equal.  
On each operation, you may increment the cost of any node by `1` (multiple times, possibly for different nodes).  
Find the **minimum total number of increments** needed so all root-to-leaf paths have the same path sum.

### Examples  

**Example 1:**  
Input:  
```
n = 7, edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]], cost = [1,5,2,2,3,3,1]
```
Output:  
```
6
```
*Explanation:  
The root-to-leaf paths are:  
- 0→1→3: sum = 1 + 5 + 2 = 8  
- 0→1→4: sum = 1 + 5 + 3 = 9  
- 0→2→5: sum = 1 + 2 + 3 = 6  
- 0→2→6: sum = 1 + 2 + 1 = 4  
We increment:  
- cost[3] by 1 (now 3), cost by 2 (now 3), so leaf sums: 9,9,6,6  
- cost[5] by 3 (now 6), cost by 1 (now 4), so leaf sums: 9,9,9,9  
Total increments: 1 (3) + 2 (6) + 3 (5) + 1 (6 again) = 6.*

**Example 2:**  
Input:  
```
n = 3, edges = [[0,1],[1,2]], cost = [1,2,1]
```
Output:  
```
0
```
*Explanation:  
Only one root-to-leaf path exists (0→1→2), already equal.*

**Example 3:**  
Input:  
```
n = 5, edges = [[0,1],[0,2],[1,3],[1,4]], cost = [2,2,2,2,1]
```
Output:  
```
1
```
*Explanation:  
Leaf paths:  
- 0→1→3: sum = 6  
- 0→1→4: sum = 5  
- 0→2: sum = 4  

Increment cost[4] by 1 (now 2), then cost[2] by 2 (now 4) — but you only need 1 minimum increment to reach possible equality for the leaves.*

### Thought Process (as if you’re the interviewee)  
The core of the problem:  
- Find all root-to-leaf paths, compute their sums, and *equalize* them with **minimum cost increments**, where increments can go to any node any number of times.

Brute-force idea:  
- Try all possible increments on leaf paths until sums match—very inefficient.

Optimized approach:  
- **DFS from root**, compute for each node:
  - The max leaf-sum in its subtree.
  - Propagate this value back up: each child *must be incremented* so its best leaf path *matches* the best overall leaf in the subtree.
  - For a leaf, we just return its cost.
  - For an internal node:  
    - Get dfs value (max path sum) from each child.
    - Identify the max child sum.
    - For each child, total increments needed = max child sum - its own dfs value (so all child leaf paths reach the max).
    - Root adds own value on top for its own dfs value.
- The answer is the sum of all increments calculated recursively.

This gives linear O(n) time, as each node is visited once, aggregating (max, increments) per subtree.  
Trade-off: All paths from root to leaf must be considered, but we don’t need to store all paths; only the max contributions are needed.

### Corner cases to consider  
- Single node tree (root = leaf).
- Tree is a chain (every node only one child).
- All costs already equal, no increment needed.
- Trees with large branching.
- Very unbalanced trees.

### Solution

```python
def minIncrements(n, edges, cost):
    # Build adjacency list
    tree = [[] for _ in range(n)]
    for u, v in edges:
        tree[u].append(v)
        tree[v].append(u)
    
    # We need to avoid revisiting parent, so pass in last node as parent in DFS
    res = 0  # total increments needed

    def dfs(node, parent):
        nonlocal res
        # For leaf, just return its cost
        if len(tree[node]) == 1 and node != 0:
            return cost[node]
        # Otherwise, track max path sum among children
        child_sums = []
        for child in tree[node]:
            if child != parent:
                child_sums.append(dfs(child, node))
        max_sum = max(child_sums)
        # For each child, add increments needed to match max_sum
        for s in child_sums:
            res += max_sum - s
        # Return own cost + child's max path sum
        return cost[node] + max_sum

    # Edge: single node tree
    if n == 1:
        return 0

    dfs(0, -1)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each node is visited once via DFS, and all child values are processed.
- **Space Complexity:** O(n) — For the adjacency list, and DFS recursion stack (worst case n for a chain tree).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could only increment **leaf** node costs?  
  *Hint: Only leaf nodes may change; consider differences among root-to-leaf paths.*

- What if costs could be decremented (as well as incremented)?  
  *Hint: Look for median of all path sums, and consider both directions.*

- What if the tree is not rooted, or the root is arbitrary?  
  *Hint: Any node could be chosen as root; result depends on choice, optimize over all nodes?*

### Summary
This problem uses the DFS aggregation pattern on trees: compute values for subtrees and propagate up optimally.  
It commonly arises in path-equalizing problems, such as distributing work, synchronizing schedules in trees, and processing root-to-leaf dependencies.  
It's a classic example of bottom-up tree dynamic programming where local adjustments must be made to obtain global equality among paths.