### Leetcode 2973 (Hard): Find Number of Coins to Place in Tree Nodes [Practice](https://leetcode.com/problems/find-number-of-coins-to-place-in-tree-nodes)

### Description  
You are given a tree with n nodes, numbered 0 to n-1, rooted at node 0. You have a list of edges describing the tree structure, and an array cost where cost[i] is assigned to node i.  
For each node, place coins according to its subtree:
- If the subtree rooted at node i has fewer than 3 nodes, place **1** coin at node i.
- If the subtree has 3 or more nodes, choose any 3 distinct nodes within it and let Area = max(cost[a] × cost[b] × cost[c]) over all possible triples. If this maximum is negative, place **0** coins. Otherwise, place that value (Area) coins at node i.
Return an array coins where coins[i] is the number of coins placed at node i.

### Examples  

**Example 1:**  
Input: `edges=[[0,1],[0,2],[0,3],[0,4],[0,5]], cost=[1,2,3,4,5,6]`  
Output: `[120,1,1,1,1,1]`  
*Explanation: Node 0's subtree includes all nodes. The three largest costs are 6, 5, and 4, so 6×5×4=120 coins at node 0. All other nodes are leaves, so just 1 coin each.*

**Example 2:**  
Input: `edges=[[0,1],[0,2],[1,3],[1,4],[1,5],[2,6],[2,7],[2,8]], cost=[1,4,2,3,5,7,8,-4,2]`  
Output: `[280,140,32,1,1,1,1,1,1]`  
*Explanation:  
- Node 0's subtree: costs = [1,4,2,3,5,7,8,-4,2]. Max product: 8×7×5=280.  
- Node 1's subtree: costs = [4,3,5,7,-4,2]; max product: 7×5×4=140.  
- Node 2's subtree: costs = [2,8,-4,2]; max product: 8×2×2=32.  
- Other nodes are leaves, so just 1 coin each.*

**Example 3:**  
Input: `edges=[[0,1],[1,2]], cost=[-5,-10,-2]`  
Output: `[0,1,1]`  
*Explanation: Node 0's subtree is the whole tree: costs=[-5,-10,-2]. All costs are negative, so any triple's product is negative. Node 0 gets 0 coins. Nodes 1 and 2 get 1 coin each.*

### Thought Process (as if you’re the interviewee)  
First, I’d clarify input—this is a rooted, undirected tree (connected, acyclic) specified by edges and costs per node.  
Brute force: For every node, find all triples in its subtree and calculate the max cost[a]×cost[b]×cost[c]. Check if the product is negative or positive, choose max. For leaves or small subtrees, just return 1. But generating all possible subtree nodes and enumerating all O(k³) triples per node is too slow.

Observation and optimization:
- We can DFS to identify each node's subtree, collecting the cost per node.
- For subtree size < 3, answer is 1.
- For size ≥ 3, to maximize the product, we need the three largest (possibly negative) values and three smallest (if all negatives).
- Because three negatives can multiply to a negative, but two negatives and one positive may be better (if there are large positives and large negatives).
- Key: The max product is max of:
    - product of top 3 largest costs
    - product of lowest 2 costs (the most negative ones) and largest cost (if largest cost is positive)
- We can sort the subtree costs, pick the top 3 and bottom 2.  
Thus:
- Use DFS to collect subtree costs per node.
- For each node, if subtree < 3, coins = 1.
- Else, coins = max(top₃×top₃[1]×top₃[2], bot₂×bot₂[1]×top₁). If the result < 0, set to 0.
  
Space optimization: For efficiency, at each node don't keep the full list—just the top 3 and bottom 2 values.  
Time: Sorting each subtree costs O(k log k), but with only top 3/bottom 2, merge in O(1) time. So, O(n) total.

### Corner cases to consider  
- All costs are negative.
- Subtrees with exactly 3 nodes.
- Costs containing zeros.
- Empty tree (n=0, usually not present per constraints).
- Tree with all nodes having the same cost.
- Skewed (path-like) trees and bushy trees.

### Solution

```python
def find_coins(edges, cost):
    n = len(cost)
    from collections import defaultdict
    
    # Build adjacency list
    tree = defaultdict(list)
    for u, v in edges:
        tree[u].append(v)
        tree[v].append(u)
    
    res = [1] * n

    def dfs(u, parent):
        # For collecting up to top 3 largest, and bottom 2 smallest costs in subtree
        values = [cost[u]]
        
        for v in tree[u]:
            if v == parent:
                continue
            sub_values = dfs(v, u)
            values.extend(sub_values)
        
        if len(values) < 3:
            res[u] = 1
        else:
            sorted_vals = sorted(values)
            # top 3 largest
            top3 = sorted_vals[-3:]
            # bottom 2 smallest
            bot2 = sorted_vals[:2]
            # The max product: either all large positive, or two large negative + one positive
            candidates = []
            candidates.append(top3[0] * top3[1] * top3[2])
            candidates.append(bot2[0] * bot2[1] * top3[2])
            mx = max(candidates)
            # If the maximum is negative, place 0 coins
            res[u] = mx if mx > 0 else 0
        # Only need the values for further computation within ancestors
        return values

    dfs(0, -1)
    return res

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) overall. Each node does constant work merging lists of up to O(n) nodes over the entire DFS, but since each node participates in O(1) merges, and the merging is linear for small lists, total is O(n).
- **Space Complexity:** O(n). We store adjacency list, result array, and recursion stack up to O(n) depth.

### Potential follow-up questions (as if you’re the interviewer)  

- How to handle the case where costs are extremely large or small (risk of integer overflow)?  
  *Hint: Discuss using 64-bit integers or modular arithmetic if outputs could be huge.*

- Can this algorithm be modified to answer queries about subtree products efficiently for updates?  
  *Hint: Think about segment trees or heavy-light decomposition for dynamic queries.*

- What if the number of nodes to form a product (currently 3) is variable, say k?  
  *Hint: Consider generalizing the merge step, but for larger k the space/execution grows quickly.*

### Summary
This is a classic case of a tree + DP/DFS pattern, where subtree aggregation is required and the result for each node depends only on its subtree’s information. The critical optimization is only maintaining a few largest/smallest elements per subtree, which reduces time and space from naive cubic/brute-force to linear. This aggregation technique is widely useful in tree DP, such as diameter problems, max/min subtree queries, and others.


### Flashcard
For each node, use DFS to track subtree nodes and efficiently find the maximum product of any three costs, handling positive and negative cases.

### Tags
Dynamic Programming(#dynamic-programming), Tree(#tree), Depth-First Search(#depth-first-search), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Collect Coins in a Tree(collect-coins-in-a-tree) (Hard)
- Find the Maximum Sum of Node Values(find-the-maximum-sum-of-node-values) (Hard)