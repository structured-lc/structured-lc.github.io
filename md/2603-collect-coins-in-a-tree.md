### Leetcode 2603 (Hard): Collect Coins in a Tree [Practice](https://leetcode.com/problems/collect-coins-in-a-tree)

### Description  
Given an **undirected tree** with `n` nodes (0-indexed), you are given the `edges` of the tree and a `coins` array. Each value in `coins` is 1 if there is a coin at that node, 0 otherwise.  
- **From any node**, you can collect all coins within **distance 2** (including the current node and its neighbors’ neighbors).
- You may traverse the tree by moving to any adjacent node (traversing edges).
- Edges are undirected; the tree is unrooted.
- You **must collect all coins and return to your starting node**.  
Find the **minimum number of edges** you must traverse to accomplish this.

### Examples  

**Example 1:**  
Input:  
`edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]]`,  
`coins = [0,0,0,1,1,0,0]`  
Output: `2`   
*Explanation: Start at 2. Collect coins at 3 and 4 (as they are within distance 2 of 2).  
You can traverse: 2 → 0 → 1 (or reverse), and return: 1 → 0 → 2.*


**Example 2:**  
Input:  
`edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[3,7],[3,8]]`,  
`coins = [0,0,0,0,0,0,0,1,1]`  
Output: `6`  
*Explanation: Start at 3, collect coins at 7 and 8.  
You will need to traverse out and back for optimal coverage, with return trips included.*


**Example 3:**  
Input:  
`edges = [[0,1],[1,2]]`,  
`coins = [0,1,0]`  
Output: `0`
*Explanation: If you start at node 1 (which has the coin) you do not need to traverse any edges.*


### Thought Process (as if you’re the interviewee)  
- **Brute force:** Try every possible path to cover all coins, simulating all starting positions and traversals. This is intractable for large n.
- **Observations:**  
  - You can collect from all nodes within 2 edge distance: node itself, neighbors, and each neighbor’s neighbor.
  - Any **leaf node without a coin cannot possibly contribute to collecting coins** (because nothing can reach through it or from it), so you can safely "prune" them from the tree.
  - If a **leaf node has a coin**, its parent and grandparent can collect it.
  - After pruning nodes (leaves) without coins, and possibly doing this recursively, you’re left with the "essential" part of the tree.
- **Algorithm (optimized):**  
  1. **Prune leaves without coins.** Repeat: remove leaves with no coins until none remain.
  2. Do this process a second time (because collecting is allowed from distance 2). This means you can prune a second "layer" of leaf nodes now that the previous leaves (and their edges) are gone.
  3. **Count the remaining edges.** Each such edge must be traversed twice (go out and return).
  4. Return total traversals = 2 × number of remaining edges.

- **Why this works:** Because coins in pruned nodes were already reachable from their distance-2 parent or collected already. Remaining structure is the minimal subgraph needed to reach every coin.

### Corner cases to consider  
- Tree with **all zeros** in coins.
- Tree with **only one node**.
- Tree with **one coin** (on a leaf, on center, etc).
- **Star shaped** trees.
- Tree where all coins are within distance 2 from one node (so no travel needed).
- Coins on a path at leaves’ ends only.

### Solution

```python
def collectTheCoins(coins, edges):
    from collections import deque, defaultdict

    n = len(coins)
    # Build adjacency list
    graph = defaultdict(set)
    for u, v in edges:
        graph[u].add(v)
        graph[v].add(u)

    # Phase 1: Prune leaves with no coins (recursively)
    queue = deque([i for i in range(n) if len(graph[i]) == 1 and coins[i] == 0])
    while queue:
        node = queue.popleft()
        if not graph[node]:
            continue
        neighbor = graph[node].pop()
        graph[neighbor].remove(node)
        if len(graph[neighbor]) == 1 and coins[neighbor] == 0:
            queue.append(neighbor)

    # Phase 2: Prune leaves again (since walk can collect within distance 2)
    queue = deque([i for i in range(n) if len(graph[i]) == 1])
    for _ in range(2):   # Layer 1 and Layer 2 prune
        next_queue = deque()
        while queue:
            node = queue.popleft()
            if not graph[node]:
                continue
            neighbor = graph[node].pop()
            graph[neighbor].remove(node)
            if len(graph[neighbor]) == 1:
                next_queue.append(neighbor)
        queue = next_queue

    # Remaining edges are the ones we *must* traverse (count undirected edges)
    edge_count = sum(len(neighbors) for neighbors in graph.values()) // 2
    return max(0, edge_count * 2)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since every node and edge is processed a constant number of times (at most 3 full scans).
- **Space Complexity:** O(n), for adjacency list and queues.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is **not connected**?  
  *Hint: Consider processing each component separately.*

- How to adapt if the **collection distance is k** (not always 2)?  
  *Hint: How many pruning rounds are required?*

- How would you handle a **dynamic tree** where coins can be added/removed or edges changed?  
  *Hint: Can you update your structure incrementally?*

### Summary
This problem is a classic example of **tree pruning** and modeling complex constraints as layers of removal.  
The double-pruning technique exploits the collection radius and helps reduce the problem to counting essential edges.  
This pattern, known as the "kernelization" or *minimal subtree covering all targets*, appears often in graph dynamics, such as message delivery, minimal travel, or Steiner tree problems in trees.

### Tags
Array(#array), Tree(#tree), Graph(#graph), Topological Sort(#topological-sort)

### Similar Problems
- Minimum Height Trees(minimum-height-trees) (Medium)
- Sum of Distances in Tree(sum-of-distances-in-tree) (Hard)
- Maximum Score After Applying Operations on a Tree(maximum-score-after-applying-operations-on-a-tree) (Medium)
- Find Number of Coins to Place in Tree Nodes(find-number-of-coins-to-place-in-tree-nodes) (Hard)