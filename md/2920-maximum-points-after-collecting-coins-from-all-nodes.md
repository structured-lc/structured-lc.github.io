### Leetcode 2920 (Hard): Maximum Points After Collecting Coins From All Nodes [Practice](https://leetcode.com/problems/maximum-points-after-collecting-coins-from-all-nodes)

### Description  
Given a tree (an undirected, connected, acyclic graph) with n nodes, each node has some number of coins. You are allowed to perform an operation on **any subtree** rooted at a node:
- **At each node:** You have two choices when collecting coins:
    1. Take `coins[u] - k` at this node and all its descendants (no division).
    2. Take ⌊coins[u] / 2⌋ at this node, and recursively must use the halving operation for all its descendants.
- The process starts at the root node (`node 0`).
- The goal is to maximize the total number of points (coins) collected from all the nodes.
- You need to decide, for every node, **in which state/subtree to halve or not halve**, so the total is maximized.

### Examples  

**Example 1:**  
Input: `edges = [[0,1],[0,2]], coins = [10,3,10], k = 2`  
Output: `17`  
*Explanation:  
- One way: Do not halve anywhere.  
  At root 0: 10-2=8  
  At child 1: 3-2=1  
  At child 2: 10-2=8  
  Total = 8+1+8=17  
- If you ever halve, you must halve everything below, and it’s not better here.*

**Example 2:**  
Input: `edges = [[0,1],[1,2]], coins = [8,7,3], k = 3`  
Output: `8`  
*Explanation:  
- Many splits: Best is to halve at root.  
  At 0: ⌊8/2⌋ = 4  
  At 1: ⌊7/2⌋ = 3  
  At 2: ⌊3/2⌋ = 1  
  Total = 4+3+1=8*

**Example 3:**  
Input: `edges = [[0,1],[1,2]], coins = [5,5,5], k = 2`  
Output: `7`  
*Explanation:  
- Do not halve: (5-2)+(5-2)+(5-2)=9  
- Halve at node 1 and below: 5-2=3 (at root), then at 1: ⌊5/2⌋=2, 2: ⌊5/2⌋=2 ⇒ 3+2+2=7*


### Thought Process (as if you’re the interviewee)  
- Notice the tree structure and the two choices per node.
- For every node, you either:
    - Collect coins[u] - k, and recurse to children with the same options.
    - Or, **halve** here (collect ⌊coins[u]/2⌋) and from here forward, you must continue halving downwards.
- **Brute-force approach:** For each node decide at each subtree root whether to halve; this clearly yields exponential time due to overlapping subproblems.
- Instead, use **dynamic programming**:
    - DP state: For each node, track the maximum you can collect if you have been halved a certain number of times on the path to root (either 0 or 1 is enough, but up to O(log(coin)) is possible).
    - Memoize results for each node and "halved state".
    - Compute both choices at each node, take the maximum.
- The recursion:
    - If in halved state, must halve.
    - If not halved, can choose: normal or halve all below.
- **Trade-off**: DP with memoization (state: (nodeIdx, #halves)), Time is O(n × log(coin)), but due to maximum possible halvings being small (≤ log₂(maxCoin)), this is acceptable.

### Corner cases to consider  
- Only one node (`n = 1`).
- All coins are zero.
- Large values of `k` (possibly greater than any coins, can yield negative/zero).
- Already halved coins reach 0.
- Star-shaped trees, line trees, perfectly balanced trees.

### Solution

```python
def maximumPoints(edges, coins, k):
    from math import log2, floor
    
    n = len(coins)
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)
        
    # Maximum halvings possible for any coin, prevents excessive states
    MAX_HALVES = int(log2(max(max(coins), 1))) + 2

    memo = {}

    def dfs(u, parent, halves):
        key = (u, halves)
        if key in memo:
            return memo[key]
            
        # (1) Collect coins - k at this node, children same halves as me
        val_no_halve = coins[u] // (1 << halves)
        take_all = val_no_halve - k
        for v in graph[u]:
            if v != parent:
                take_all += dfs(v, u, halves)
        
        # (2) Halve at this node and all below
        val_halved = floor(val_no_halve / 2)
        take_half = val_halved
        for v in graph[u]:
            if v != parent:
                take_half += dfs(v, u, halves + 1)

        res = max(take_all, take_half)
        memo[key] = res
        return res

    return dfs(0, -1, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × logC)  
  For each of n nodes, the number of halvings per node is at most log₂(maxCoin), so total DP states are O(n × logC). Each state processes all children once.

- **Space Complexity:** O(n × logC)  
  For memoization cache and the recursion stack in the worst case (for skewed tree).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large coin values (beyond 10⁴)?  
  *Hint: How does number of halvings affect your memoization?*

- Suppose you could “halve” only a limited number of times globally—what changes?  
  *Hint: Add a third parameter to the DP state: global-halve-count.*

- Can you make this work if “halve” costs k instead of the original operation?  
  *Hint: Swap the computation for the two options, just adjust cost formulas.*

### Summary
This problem uses **tree DP with memoization**. The main decision is at every node: whether to "halve" everything from here down, or not. Memoizing the computation for each unique (node, halve count) enables efficient recursion. This pattern—tree DP with state propagation to children—is common in other problems like “minimum camera cover on binary tree”, “tree coloring with path constraints”, and generalized “tree rooted subset” problems.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Tree(#tree), Depth-First Search(#depth-first-search), Memoization(#memoization)

### Similar Problems
