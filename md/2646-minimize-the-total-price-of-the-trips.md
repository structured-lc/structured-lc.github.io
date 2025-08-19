### Leetcode 2646 (Hard): Minimize the Total Price of the Trips [Practice](https://leetcode.com/problems/minimize-the-total-price-of-the-trips)

### Description  
Given a tree of n nodes (undirected, acyclic connected graph), each node has a given price. You are also given a list of trips (start, end pairs), and each trip takes any path between the two nodes.  
**You may choose a subset of nodes to halve their prices with the restriction that no two chosen nodes can be adjacent.**  
Your goal is to minimize the total cost for all trips, where for each trip you pay the sum of (current node price) for each node on the trip's path (counted as many times as traversed across all trips).

### Examples  

**Example 1:**  
Input:  
prices = `[2,3,1,2]`,  
edges = `[[0,1],[1,2],[1,3]]`,  
trips = `[[0,3],[2,1],[2,3]]`  
Output: `6`  
*Explanation:*
The tree:
```
    1
   /|\
  0 2 3
```
- Paths: 0→1→3, 2→1, 2→1→3  
- Visit counts: [1,3,2,2]  
- The optimal is to halve prices at nodes 0, 2, and 3 (none adjacent, 1 is adjacent to all others), so total:  
    2/2 + 3×3 + 1/2×2 + 2/2×2 = 1 + 9 + 1 + 2 = 13 (You must recalculate this per trip; see code)  
But with a relevant halving arrangement, minimum total is 6.

**Example 2:**  
Input:  
prices = `[1,2,3]`,  
edges = `[[0,1],[0,2]]`,  
trips = `[[1,2],[2,1],[0,2]]`  
Output: `4`  
*Explanation:*
The tree:
```
  0
 / \
1   2
```
- Paths: 1→0→2, 2→0→1, 0→2  
- Visit counts: determine per path, then pick halved nodes for minimum cost.

**Example 3:**  
Input:  
prices = `[2,1,4,5,3,2,2]`,  
edges = `[[0,1],[1,2],[1,3],[3,4],[3,5],[4,6]]`,  
trips = `[[0,4],[2,6],[2,4]]`  
Output: `8`  
*Explanation:*
The tree:
```
    1
   /|\
  0 2 3
      / \
     4   5
    /
   6
```
- Many trips cross 1,3,4.
- The visit count per node is built, and DP is then used to find the optimal halve arrangement.

### Thought Process (as if you’re the interviewee)  

Start by breaking the challenge into manageable steps:
- First, since the graph is a tree, finding unique paths between trip endpoints is straightforward.
- We need to count how many times each node is passed by any trip: for each trip, increment the visit count for nodes on its path (can use DFS to find the path).
- Once we have the frequency per node, the problem reduces to: pick a subset of non-adjacent nodes (restrictions: not two consecutive in tree, i.e., not parent-child) to halve their price, such that the overall trip cost is minimal (classic DP on tree with "choose/not choose" states, akin to "House Robber III").

**Brute-force:** Try all subsets of nodes that don't include adjacent nodes (exponential, infeasible for large n).

**Optimal:** 
1. Use DFS to gather usage counts (per node, as summed across all trips).
2. Then, run a DP on the tree:
    - For each node, two states:
        - If halved: all children must *not* be halved.
        - If not halved: children can be either.
    - For leaves, base case is trivial.

This aligns with classic tree DP techniques.

### Corner cases to consider  
- Tree with only 1 node / single trip.
- All node prices are equal.
- Trips overlap completely or not at all.
- Very deep/unbalanced trees.
- Edge case: no node can be halved.
- Edge case: all optimal nodes are non-adjacent.

### Solution

```python
def minimumTotalPrice(n, edges, price, trips):
    from collections import defaultdict

    # Step 1: Build the tree (adjacency list)
    tree = defaultdict(list)
    for u,v in edges:
        tree[u].append(v)
        tree[v].append(u)

    # Step 2: For each trip, find path and count usage
    # Usage count: freq[i] is times i used in all trips
    freq = [0] * n

    def find_path(u, target, parent, path):
        if u == target:
            path.append(u)
            return True
        for v in tree[u]:
            if v == parent:
                continue
            if find_path(v, target, u, path):
                path.append(u)
                return True
        return False

    for start, end in trips:
        path = []
        find_path(start, end, -1, path)
        for node in path:
            freq[node] += 1

    # Step 3: DP on tree - for each node: return (cost if not halved, cost if halved)
    def dfs(u, parent):
        # Option 1: Not halve u
        not_halved = freq[u] * price[u]
        # Option 2: Halve u
        halved = freq[u] * (price[u] // 2)  # Halving (integer division matches problem's intent)
        for v in tree[u]:
            if v == parent:
                continue
            child_not_halved, child_halved = dfs(v, u)
            # If u is not halved, child can be halved or not
            not_halved += min(child_not_halved, child_halved)
            # If u is halved, child must not be halved
            halved += child_not_halved
        return (not_halved, halved)

    res = dfs(0, -1)
    return min(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × T), where n is nodes and T is number of trips.  
  - For each trip, DFS to build path: O(n) per trip.  
  - Tree DP: O(n).
- **Space Complexity:** O(n), for tree, freq, and stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of diagrams, trips were given with explicit paths?
  *Hint: Can precompute; how does it change your complexity?*

- What if the tree became a general graph?
  *Hint: Does it break unique path guarantee?*

- If you could halve price on more flexible node sets (e.g., allow one pair of adjacent), how does the DP change?
  *Hint: Think about state expansion or updating constraints.*

### Summary
This problem uses **tree dynamic programming** with subtree states, leveraging the "robbery without adjacent" (House Robber III) pattern. It also relies on first collecting frequent usage stats with DFS per path, then computing the optimal set of non-adjacent nodes to halve. The key insight is to reduce the pricing problem to DP over the tree, considering the no-adjacent-halving rule. This pattern shows up in problems like "House Robber on Tree," "Max Weight Independent Set" in trees, and resource allocation on hierarchical structures.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Tree(#tree), Depth-First Search(#depth-first-search), Graph(#graph)

### Similar Problems
