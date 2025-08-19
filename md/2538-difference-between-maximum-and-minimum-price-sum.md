### Leetcode 2538 (Hard): Difference Between Maximum and Minimum Price Sum [Practice](https://leetcode.com/problems/difference-between-maximum-and-minimum-price-sum)

### Description  
Given an undirected tree with `n` nodes labeled from `0` to `n-1`, an edges list, and a price array where `price[i]` is the price of node `i`, you are to root the tree at *any* node. For a given root, the "price sum" of a path is the sum of prices on the path starting from the root to any other node. Define the "cost" for a root as the difference between the maximum price sum and minimum price sum over all root-to-any-node paths. The problem asks for the **maximum** such cost across all possible roots.

### Examples  

**Example 1:**  
Input:  
n = 4,  
edges = [[0,1],[1,2],[1,3]],  
price = [2,3,5,7]  
Output: `10`  
*Explanation:  
Choose root = 1.*

Paths from 1:  
- 1  
- 1→0 (cost=3+2=5)  
- 1→2 (cost=3+5=8)  
- 1→3 (cost=3+7=10)  

- Minimum sum from 1: 3 (1 itself)  
- Maximum sum from 1: 10 (1→3)  
- So difference: 10−3=7

Trying other roots, e.g., root=2:

Paths from 2:  
- 2  
- 2→1 (5+3=8)  
- 2→1→0 (5+3+2=10)  
- 2→1→3 (5+3+7=15)  

- min: 5  
- max: 15  
Difference: 10.

Thus, answer is `10`.

**Example 2:**  
Input:  
n = 3,  
edges = [[0,1],[1,2]],  
price = [1,1,1]  
Output: `1`  
*Explanation:  
Tree: 0–1–2. Rooting at any node, min price sum=1, max=2 (1→2 with 1+1=2), so difference=1. All roots give same answer.*

**Example 3:**  
Input:  
n = 2,  
edges = [[0,1]],  
price = [4,6]  
Output: `6`  
*Explanation:  
Root at 0: paths  (cost 4), [0→1] (cost 4+6=10). Difference = 10-4=6.  
Root at 1: [1] (6), [1→0] (6+4=10); again, difference is 10-6=4.  
Pick max=6.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each node, consider it as root. For every node-as-root, perform DFS to find all path price sums to every other node, find min and max, take their difference, and keep track of the maximum difference obtained.  
  Time: O(n²) because for each root you traverse the whole tree.

- **Optimize:**  
  - Notice the tree structure: All paths from root to other nodes are unique, and there are n-1 edges.  
  - The minimum path sum from root is always the root itself (path to itself), i.e., price[root].  
  - The maximum path sum from root is the price sum to the *farthest leaf*.  
  - The problem reduces to, for each root, what's the highest path cost to a leaf? Now, can we do it without recomputing for every root?

  - **Key insight:**  
    - Compute for every node, using *rerooting DP*:  
      - For each node, maintain the maximum path sum to any leaf if this node is the root (excluding ancestors).  
      - Using DFS, first compute for initial root (say, 0). As you reroot to each child, you update the value as if the subtree is now under the new root.
      - The minimum sum for root is always price[root]; maximum sum is the "deepest leaf path" in its "outgoing" directions.

### Corner cases to consider  
- Single node tree (n=1): Only one possible sum, so difference is 0.
- All prices are the same.
- All leaves except one.
- Chain/tree is a path (linear), star shaped tree.
- Very large or very small prices.
- Nodes with only one neighbor (leaves).
- Very deep unbalanced tree.

### Solution

```python
def maxOutput(n, edges, price):
    from collections import defaultdict

    # Build the tree
    tree = defaultdict(list)
    for u, v in edges:
        tree[u].append(v)
        tree[v].append(u)

    # dp[u]: best price sum from u to any leaf, excluding parent
    dp = [0] * n

    def dfs(u, parent):
        max_child = 0
        for v in tree[u]:
            if v == parent:
                continue
            dfs(v, u)
            max_child = max(max_child, dp[v])
        dp[u] = price[u] + max_child

    dfs(0, -1)  # Fill dp for "downward" best paths

    ans = 0

    # Now, reroot the tree at every node using a second DFS
    def reroot(u, parent, parent_contrib):
        # parent_contrib: max sum from "above" plus price[u]
        # For u as root, consider:
        #   - Maximum sum from dp[u]'s children (i.e., in subtree)
        #   - Maximum sum from parent_contrib (i.e., upwards)
        #   - Minimum is price[u] (just itself)
        # So, difference is (max(dp[u], parent_contrib) - price[u]). But we must ensure max path is nontrivial (i.e., not just root itself)

        candidates = [parent_contrib]
        for v in tree[u]:
            if v == parent:
                continue
            candidates.append(dp[v])
        # Remove single node root case, must have at least 1 edge
        for v in tree[u]:
            if v == parent:
                continue
            # For child v, the "upwards" path is:
            # max of parent_contrib and max dp[w] for all children w ≠ v
            others = [parent_contrib]
            for w in tree[u]:
                if w == v or w == parent:
                    continue
                others.append(dp[w])
            # new parent_contrib for v is price[u] + max(others) (could be just price[u])
            new_parent = price[u]
            if others:
                new_parent += max(others)
            reroot(v, u, new_parent)

        # For u as root: find the max path sum to somewhere else
        # But we cannot take only price[u] (trivial path), must go to one child
        if len(candidates) > 1:
            max_path = max(candidates)
            ans_nontrivial = max_path - price[u]
            nonlocal ans
            ans = max(ans, ans_nontrivial)

    reroot(0, -1, 0)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Each DFS visits every node once and does constant work per node. So, both downward pass and reroot pass are O(n).
- **Space Complexity:** O(n)  
  - Tree and dp arrays take O(n). Call stack up to depth O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is weighted, i.e., there are edge weights too?
  *Hint: You'll need to factor in edge weights when aggregating your path sums.*

- Can you count the number of roots where the maximum output is achieved?
  *Hint: Track all roots that achieve the optimal difference while traversing.*

- What if you are to print the actual paths (nodes) that achieve the min and max sums for a root?
  *Hint: Backtrack from the maximum value leaf and reconstruct path.*

### Summary
This problem is a classic example of **tree dynamic programming (tree DP) with rerooting**. The key is to use one DFS to find downward best paths from children, then cleverly propagate information in a second rerooting DFS to handle each node as potential root efficiently. This DP rerooting technique is extremely useful for any "every root, aggregate over all descendants" type tree path problems. The pattern appears in subtree/supertree computations, path assignment, and optimizing properties that depend on root choice in trees.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Tree(#tree), Depth-First Search(#depth-first-search)

### Similar Problems
- Binary Tree Maximum Path Sum(binary-tree-maximum-path-sum) (Hard)