### Leetcode 2477 (Medium): Minimum Fuel Cost to Report to the Capital [Practice](https://leetcode.com/problems/minimum-fuel-cost-to-report-to-the-capital)

### Description  
Given a country represented by a tree (a connected, acyclic graph) where each node is a city and each edge is a road, every city except the capital (node 0) has one representative. Each car that transports representatives can carry up to **seats** representatives (including the driver), and each car traveling through a road consumes **1** unit of fuel, regardless of the number of people in it. The task is to determine the **minimum fuel cost** for all representatives to report to the capital city (node 0). Representatives can team up at any city.

### Examples  

**Example 1:**  
Input: `roads = [[0,1],[0,2],[0,3]], seats = 5`  
Output: `3`  
*Explanation: There are 3 representatives (cities 1, 2, 3). Each can ride in their own car to the capital (node 0). Each edge is used exactly once, so total fuel = 3.*

**Example 2:**  
Input: `roads = [[3,1],[3,2],[1,0],[0,4],[0,5],[4,6]], seats = 2`  
Output: `7`  
*Explanation:  
- Representatives at 2 and 6 join 3 and 4, then move toward the capital.
- Minimum cars used at each step, taking capacity into account, results in 7 units of fuel overall.*

**Example 3:**  
Input: `roads = [], seats = 1`  
Output: `0`  
*Explanation: Only the capital exists, so no representatives need to travel and fuel cost is 0.*


### Thought Process (as if you’re the interviewee)  
First, since the network forms a tree, there are no cycles and exactly n−1 roads for n cities.  
Initially, a brute force might try every possible grouping of representatives, but this would be exponential and inefficient.  
A more optimal approach is to **process the tree from the leaves up to the root (capital)**, keeping track of representatives that can be grouped as they pass through each node.

- Use DFS. At each node, calculate the number of representatives beneath it (including itself if it's not the capital).
- For each subtree, the number of cars needed to carry its representatives into its parent node is ceil(rep_count / seats).
- The total fuel cost is the sum of all such car trips across all roads except those directly connected to the capital, where representatives already consolidate.

This is efficient because it visits each city and edge once and only requires simple arithmetic at each step.

Trade-offs: The DFS solution makes it easier to propagate representative counts up and is easier to reason about for leaf-to-root grouping.


### Corner cases to consider  
- Only the capital exists (`roads` is empty).
- `seats` is 1 (every person needs their own car).
- Large seat numbers (more than half the cities).
- Unbalanced or deep trees (all nodes connected in a line).
- All representatives start close to the capital.
- Disconnected input (shouldn’t happen per problem constraints).

### Solution

```python
from math import ceil
from collections import defaultdict

def minimumFuelCost(roads, seats):
    # Build the adjacency list for the tree.
    graph = defaultdict(list)
    for u, v in roads:
        graph[u].append(v)
        graph[v].append(u)

    # Track total fuel cost.
    total_fuel = 0

    def dfs(node, parent):
        # This node itself is a representative (unless it's the capital)
        reps = 1
        for neighbor in graph[node]:
            if neighbor == parent:
                continue
            # Count representatives for the subtree.
            sub_reps = dfs(neighbor, node)
            # Cars needed from this subtree up to this node.
            cars = ceil(sub_reps / seats)
            nonlocal total_fuel
            total_fuel += cars
            reps += sub_reps
        return reps

    dfs(0, -1)   # Start from the capital, which has no parent
    return total_fuel
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Each node and edge is visited once in DFS, so it’s linear in the number of cities.

- **Space Complexity:** O(n).  
  The adjacency list and the recursion stack take up to O(n) space.


### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if each road consumed a different amount of fuel?  
  *Hint: Instead of adding 1 per road cross, use the fuel cost for that particular edge when computing total fuel.*

- What if representatives could only team up at certain designated cities?  
  *Hint: You’d need to restrict groupings in DFS only at allowed nodes and adjust your calculations accordingly.*

- Can you solve the problem iteratively without recursion?  
  *Hint: Post-order traversal using an explicit stack can substitute for recursion and help avoid stack overflows on large inputs.*

### Summary
This problem uses a **tree DFS (post-order)** pattern to aggregate bottom-up values (representative counts). It’s a classic **tree DP / post-order aggregation pattern**, commonly seen in subtree calculations, root-to-leaf propagation, and any flow-consolidation problems. Similar strategies apply to problems such as **“Sum of Distances in Tree”**, or any variant requiring data to be merged up the hierarchy efficiently.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph)

### Similar Problems
- Binary Tree Postorder Traversal(binary-tree-postorder-traversal) (Easy)