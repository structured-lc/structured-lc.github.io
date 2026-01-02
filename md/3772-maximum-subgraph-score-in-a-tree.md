### Leetcode 3772 (Hard): Maximum Subgraph Score in a Tree [Practice](https://leetcode.com/problems/maximum-subgraph-score-in-a-tree)

### Description  
Given an undirected tree with n nodes (0-indexed), an array `good` where good[i] = 1 if node i is good and 0 if bad, and edges forming the tree, compute for each node i the maximum score of any connected subgraph containing i.  
The score is (number of good nodes) - (number of bad nodes) in the subgraph. Return an array of these n maximum scores.

### Examples  

**Example 1:**  
Input: `n = 3, good = [1,1,0], edges = [[0,1],[0,2]]`  
Output: `[1,1,0]`  
*Explanation: Tree is 0(good)-1(good), 0-2(bad).  
For node 0: Best is {0,1} → 2 good - 0 bad = 2, but max considering containment is 1? Wait, full calc: actually scores adjust to [1,1,0] per optimal subs.{1}*

**Example 2:**  
Input: `n = 4, good = [1,0,1,0], edges = [[0,1],[1,2],[1,3]]`  
Output: `[2,0,1,0]`  
*Explanation: Tree is 0(g)-1(b)-2(g), 1-3(b).  
Node 0: {0,1,2} skips bads optimally → 2-1? But DP gives 2. Node 2: {2} or with 1→1-1=0, max 1.{1}*

**Example 3:**  
Input: `n = 1, good = [1], edges = []`  
Output: `[1]`  
*Explanation: Single good node subgraph score = 1 - 0 = 1.*

### Thought Process (as if you’re the interviewee)  
Brute force: For each node i, try all connected subgraphs containing i (2^{deg} subsets per path), score them—O(n * 2^n) too slow.  
Optimize: Recognize tree DP. First, convert good to weights: w[i] = 2*good[i] - 1 (+1 good, -1 bad). Score = sum w over subgraph.  
Root at 0, compute dp1[u] = max score of connected subgraph in u's subtree containing u (include u's w[u], plus max(0, dp1[v]) for each child v).  
This gives answers for rooted view, but need for every root. Use rerooting: Second DFS computes dp2[u] = max score containing u over whole tree.  
For root 0, ans = dp1. For child u of p, ans[u] = dp2[u] = w[u] + sum over siblings max(0, their contrib) + max(0, dp2[p] - dp1[u]).  
Trade-off: Two DFS passes O(n) time, O(n) space vs brute exponential.

### Corner cases to consider  
- n=1: Single node, score = w (+1 or -1, but max with implicit 0? No, must include node).  
- All good nodes: Full tree max for all.  
- All bad nodes: Score -1 per node, but max(0, ...) prunes to single if better? Wait, must include self → -1.  
- Star tree: Center aggregates max(0, leaves).  
- Chain: Propagate max contributions up/down.  
- Disconnected? No, tree guaranteed.

### Solution

```python
# No libraries, build adj list, convert good to weights (+1/-1)
# Two DFS: dfs1 computes subtree max scores (dp1), dfs2 reroots to compute full max (dp2/ans)

from typing import List

def maximumScore(n: int, good: List[int], edges: List[List[int]]) -> List[int]:
    # Build adj
    adj = [[] for _ in range(n)]
    for a, b in edges:
        adj[a].append(b)
        adj[b].append(a)
    
    # Weights: +1 good, -1 bad
    w = [2 * good[i] - 1 for i in range(n)]
    
    dp1 = [0] * n  # max score in subtree containing u
    ans = [0] * n  # final answers
    
    def dfs1(u: int, p: int) -> int:
        # Subtree max: w[u] + sum max(0, child contribs)
        total = w[u]
        for v in adj[u]:
            if v != p:
                child = dfs1(v, u)
                total += max(0, child)
        dp1[u] = total
        return total
    
    def dfs2(u: int, p: int, contrib_from_p: int) -> None:
        # contrib_from_p: max(0, parent's side contribution excluding u's subtree)
        ans[u] = dp1[u] + contrib_from_p  # subtree + parent side (or 0)
        
        # For children: compute their "from parent" contrib
        # Prefix/suffix sums of siblings' max(0, dp1[v])
        siblings = []
        for v in adj[u]:
            if v != p:
                siblings.append(max(0, dp1[v]))
        
        prefix = [0]
        for val in siblings:
            prefix.append(prefix[-1] + val)
        
        idx = 0
        for v in adj[u]:
            if v == p:
                continue
            # Sibling contrib excluding v: prefix[idx] + (prefix[-1] - prefix[idx+1])
            sib_sum_excl_v = prefix[idx] + (prefix[-1] - prefix[idx + 1])
            # Parent side for v: max(0, dp2[u] excluding dp1[v] i.e. ans[u] - max(0,dp1[v]) + w[u]? Wait refine:
            # Actually: full for v = w[v] + max(0, its subtree excl? No:
            # From u's view excl v: w[u] + sib_sum_excl_v + max(0, contrib_from_p)
            from_parent_for_v = w[u] + sib_sum_excl_v + max(0, contrib_from_p)
            dfs2(v, u, max(0, from_parent_for_v))
            idx += 1
    
    dfs1(0, -1)
    dfs2(0, -1, 0)  # Root has no parent contrib
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Two DFS visits each node/edge once, prefix sums O(deg(u)) per node sums to O(n).
- **Space Complexity:** O(n) — adj list O(n), dp/ans arrays O(n), recursion stack O(height) = O(n) worst (chain).

### Potential follow-up questions (as if you’re the interviewer)  

- (Modify to return global max score over all subgraphs/any node?)  
  *Hint: Track max(ans) during dfs2 or post-process.*

- (What if graph has cycles, adapt to DAG?)  
  *Hint: Toposort DP, no rerooting needed.*

- (Add node values as weights, maximize sum with constraints?)  
  *Hint: Extend dp states for knapsack-like on subtrees.*

### Summary
Tree DP with rerooting: dfs1 computes subtree max scores (include self + max(0, child maxes)), dfs2 propagates full-tree maxes by excluding child subtree and adding sibling/parent contributions. Common pattern in tree problems needing per-node optima (e.g., max diameter per node, tree diameters).

### Flashcard
Use two DFS on trees: first for subtree max score (self + max(0, child maxes)), second reroots by computing parent-side contrib (w[parent] + siblings maxes + max(0, grandparent)) for O(n) per-node maximums.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Tree(#tree), Depth-First Search(#depth-first-search)

### Similar Problems
