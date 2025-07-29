### Leetcode 3575 (Hard): Maximum Good Subtree Score [Practice](https://leetcode.com/problems/maximum-good-subtree-score)

### Description  
Given a rooted tree with `n` nodes, each node \(i\) has an integer value `vals[i]`. For every subtree rooted at node \(u\), calculate its **score** as follows:  
- For node \(u\), choose any subset of its direct child subtrees (possibly none or all), and take the union of their "good values".  
- The subtree's good values must all be *distinct* (no overlap of values among chosen subtrees). The score is then the sum of all good values of the chosen child subtrees **plus** the value of node \(u\).

Your task is to find the **maximum score** across all possible subtrees of the tree.

### Examples  

**Example 1:**  
Input: `n = 5, vals = [1,2,3,4,5], edges = [[0,1],[0,2],[1,3],[1,4]]`  
Output: `15`  
*Explanation: The subtree rooted at 1 contains nodes 1,3,4 with values [2,4,5]. Take all: 2+4+5=11. Max score is 2+4+5=11 but since parent value also adds, if taken from 0: nodes are [1,2,3,4,5]=15.*

**Example 2:**  
Input: `n = 3, vals = [1,1,1], edges = [[0,1],[0,2]]`  
Output: `2`  
*Explanation: The values are all same; only root and one child can be chosen without duplicate values. Max possible is 1+1=2.*

**Example 3:**  
Input: `n = 4, vals = [1,6,2,4], edges = [[0,1],[1,2],[2,3]]`  
Output: `13`  
*Explanation: The whole tree can be taken as a path without duplicate: 1+6+2+4=13.*

### Thought Process (as if you’re the interviewee)  
- **Naive (brute-force):**  
  For every subtree, try all possible combinations of including/excluding each child. For each combination, check if the good values are disjoint, sum if yes, keep max.  
  This is exponential: Each node branches as 2^k, where k = number of children.

- **Optimal (DP on Tree):**  
  Use DFS with dynamic programming from the leaves up.  
  - For each node, keep a mapping: `mask → max_sum`, where mask tracks which distinct values are included in the subtree.
  - For leaf, the value is its own.
  - For internal nodes, for each child, recursively gather their possible value sets/scores.
  - Try all disjoint combinations between children by merging their sets only if there’s no value overlap.
  - For each merged set, add node’s own value, update max score.

- **Trade-offs:**  
  - The DP avoids recomputation and guarantees that only unique combinations are explored.
  - This is still heavy, but feasible because the value per node is limited (say, ≤20).

### Corner cases to consider  
- Tree with all same values.
- One node only (just the root).
- Tree with max and min integer values.
- Tree where only leaves have unique values.
- Trees with large number of children per node.
- Linear (chain) trees.
- Trees with repeated values so that only one node per value can ever contribute to a score.

### Solution

```python
# Let's assume root = 0, n nodes, vals: List[int], edges: List[List[int]]

from collections import defaultdict

def maximumGoodSubtreeScore(vals, edges):
    n = len(vals)
    tree = [[] for _ in range(n)]
    for u,v in edges:
        tree[u].append(v)
        tree[v].append(u)

    max_score = 0

    def dfs(u, parent):
        # At this node: returns a dictionary {frozenset of values: max_sum}
        res = {}
        res[frozenset([vals[u]])] = vals[u]

        # For each child, get their DP
        for v in tree[u]:
            if v == parent:
                continue

            child_dp = dfs(v, u)
            # Merge: for every state in current res and child_dp, if they're disjoint, combine them
            tmp = dict(res)  # start with current
            for k1, s1 in res.items():
                for k2, s2 in child_dp.items():
                    if k1.isdisjoint(k2):
                        new_set = k1.union(k2)
                        new_sum = s1 + s2
                        if new_set not in tmp or new_sum > tmp[new_set]:
                            tmp[new_set] = new_sum
            res = tmp

        nonlocal max_score
        # Update global max with the largest sum for this node
        max_score = max(max_score, max(res.values()))
        return res

    dfs(0, -1)
    return max_score
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  In the worst case, per node, number of possible value sets explodes exponentially if all node values are unique (up to 2ⁿ sets per node). But with limited distinct values (e.g., small vals[i] range), it's manageable — O(n × 2^V), where V = number of unique vals[i].

- **Space Complexity:**  
  Also O(n × 2^V) for the DP dictionaries at each node and the recursion stack (up to n depth).

### Potential follow-up questions (as if you’re the interviewer)  

- What if vals[i] can be any large number (not small range)?  
  *Hint: Try value compression or set mapping as bitmap if values fit into a bitmask.*

- How would you solve if the tree is a chain (degenerate)?  
  *Hint: The subproblem reduces to longest path with all unique values.*

- Can you adapt the approach for forests or multiple components?  
  *Hint: Just run the same DP on each tree root and pick the max.*

### Summary
This problem is a classic example of **DP on Trees** with submask merging and set/conflict avoidance. The main trick is merging child states only if their value sets are disjoint, which requires maintaining sets per subtree and efficiently combining them.  
This coding pattern appears in unique-path or "maximum-sum-unique-set" tree dynamics, and is highly reusable if state-combination constraints are present (like coloring, value uniqueness, or subpath uniqueness in tree DP).