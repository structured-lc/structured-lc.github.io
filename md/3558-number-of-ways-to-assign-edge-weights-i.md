### Leetcode 3558 (Medium): Number of Ways to Assign Edge Weights I [Practice](https://leetcode.com/problems/number-of-ways-to-assign-edge-weights-i)

### Description  
Given an undirected **tree** with `n` nodes labeled 1 to n (rooted at node 1), assign weights of either 1 or 2 to each edge. For each node, the sum of weights along the path from the root to that node must be **even** (for some nodes) or **odd** (for others) as specified.  
Given the edge list and an array `parity` where `parity[i]` is 0 if the iᵗʰ node wants an even sum, or 1 if odd, compute how many valid assignments exist.

### Examples  

**Example 1:**  
Input:  
`edges = [[1,2],[1,3]]`,  
`parity = [0,0,1]`  
Output:  
`2`  
*Explanation:  
From root node 1 to node 2: edge weight must be even for node 2. To node 3: sum must be odd.  
Possible:  
- Edge [1,2]=2 (even), [1,3]=1 (odd)  
- Edge [1,2]=2, [1,3]=1 (weights can be reversed for the two children)*

**Example 2:**  
Input:  
`edges = [[1,2],[2,3],[3,4]]`,  
`parity = [0,1,0,1]`  
Output:  
`4`  
*Explanation:  
Each edge offers choices, but we need to ensure the sum parity matches at each node according to `parity`. Total possible valid assignments is 4.*

**Example 3:**  
Input:  
`edges = [[1,2]]`,  
`parity = [0,1]`  
Output:  
`1`  
*Explanation:  
Root (1): 0, Child (2): wants parity 1, so assign edge weight 1 (odd). Only one way.*

### Thought Process (as if you’re the interviewee)  
Start by brute-force. For each edge, try both weights (1 or 2), compute the sums from root to every node, and check if each node's path sum matches its parity requirement. This is exponential (2ʰ, h=edges), so infeasible for big trees.

Next, realize that from root to a node, the sum's parity depends just on the number of *odd* (i.e., weight=1) edges in the path. Parity flips whenever we pick edge weight 1; stays for 2.  
Traverse the tree (DFS), and at each step, try both weights for the current edge; if the resulting path sum matches required parity at the child, continue.  
We can use DP: `dp[node][parity_so_far]` = number of ways to reach this node with given parity. At each child, for each possible parent parity, try edge weight 1/2, forming new parity, and check with `parity[child]`.

Trade-off:  
- Brute: O(2ⁿ), infeasible.  
- DFS+DP: O(n), as each node has 2 possibilities (even/odd parity), and we only need to check each once.

### Corner cases to consider  
- Tree with one node (edge case: no edge)  
- All parity = 0 (all want even: some assignments may not be possible)  
- All parity = 1  
- Unbalanced/deep trees  
- No valid assignment (conflicting parities)

### Solution

```python
def numberOfWaysToAssignEdgeWeights(n, edges, parity):
    # Build adjacency list (1-indexed)
    tree = [[] for _ in range(n + 1)]
    for u, v in edges:
        tree[u].append(v)
        tree[v].append(u)
    
    MOD = 10**9 + 7
    # dp[node][parity]: # ways to get to node with path sum parity (0=even, 1=odd)
    dp = [[0, 0] for _ in range(n + 1)]
    # At root (node 1), only even parity (sum = 0)
    dp[1][0] = 1
    
    def dfs(node, parent):
        for child in tree[node]:
            if child == parent:
                continue
            # For each possible parity at parent
            for p in [0, 1]:
                # Try both weights for the edge: 1 (odd), 2 (even)
                # Edge weight = 1: flips parity
                new_p = p ^ 1
                if parity[child - 1] == new_p:
                    dp[child][new_p] += dp[node][p]
                    dp[child][new_p] %= MOD
                # Edge weight = 2: parity unchanged
                if parity[child - 1] == p:
                    dp[child][p] += dp[node][p]
                    dp[child][p] %= MOD
            dfs(child, node)
    
    dfs(1, 0)
    # For each node, only count if we reached it with its desired parity
    result = 1
    for i in range(2, n + 1):
        count = dp[i][parity[i - 1]]
        if count == 0:
            return 0  # No way to satisfy for some node
        result = (result * count) % MOD
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each edge and node visited once in DFS. At each node, only check 2 parity states.
- **Space Complexity:** O(n)  
  For tree, adjacency list and O(n) for dp table.

### Potential follow-up questions (as if you’re the interviewer)  

- If weights could be {1,2,3}, how would the approach change?  
  *Hint: Now the sum modulo 2 can change in more than two ways, need to account for all transitions (modulo 2 math, DP with more states).*

- If the tree was not rooted, would your approach work?  
  *Hint: You'd have to root arbitrarily and handle each undirected edge accordingly.*

- What if you needed exactly k nodes with odd path sum?  
  *Hint: Use DP to keep track of number of ways given a count of nodes with odd parity.*

### Summary
The approach uses **DFS with DP on tree paths and parity**.  
It's a common pattern: label tree nodes by path properties (sum parity, XOR, etc.) and use DP to count solution ways. Can apply to variants like coloring, path constraints, or subtree labels.

### Tags
Math(#math), Tree(#tree), Depth-First Search(#depth-first-search)

### Similar Problems
