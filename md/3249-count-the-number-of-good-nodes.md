### Leetcode 3249 (Medium): Count the Number of Good Nodes [Practice](https://leetcode.com/problems/count-the-number-of-good-nodes)

### Description  
Given an **undirected tree** with `n` nodes labeled from 0 to n-1 (rooted at node 0), and a 2D integer array `edges` of length n-1, your task is to determine **how many nodes in the tree are “good”**.  
A node is considered *good* **if all the subtrees rooted at its children have the same size**.  
Return the number of good nodes in the tree.

### Examples  

**Example 1:**  
Input: `edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]]`  
Output: `7`  
*Explanation:  
Every node has either 0 or 2 children whose subtrees have the same size. So all 7 nodes (0 to 6) are good.*

<br>

**Example 2:**  
Input: `edges = [[0,1],[1,2],[2,3]]`  
Output: `4`  
*Explanation:  
The tree is a straight line:  
```
    0
     \
      1
       \
        2
         \
          3
```
Each node has 0 or 1 child, so every node is good.*

<br>

**Example 3:**  
Input: `edges = [[0,1],[0,2],[1,3]]`  
Output: `4`  
*Explanation:  
The tree looks like:  
```
    0
   / \
  1   2
 /
3
```
- Node 2 and node 3 are leaves (good).
- Node 1 has only one child (good).
- Node 0 has children 1 and 2. Subtree size of 1 is 2 (nodes 1, 3), of 2 is 1. Unequal, but requirements are that only if there are children, they must have same subtree sizes. Here, since node 0 has ≥2 children and their subtrees are different, node 0 is **NOT** good.  
**Correction:**  
From the official definition, as long as number of children ≥2, only then sizes must match. In this case, node 0's children (node 1 and node 2): sizes 2 and 1, **so node 0 is not good**.  
Output: `4` (nodes 1, 2, 3, not node 0).*

### Thought Process (as if you’re the interviewee)  

- First, represent the tree using an adjacency list.
- Any leaf node (with no children) is good by definition.
- For every internal node, recursively calculate the *size* (number of nodes in) each child’s subtree.
- If the node has 0 or 1 child, it’s automatically good.
- If it has more than one child, check whether all children’s subtrees have the same size.
- Use DFS (Depth-First Search) starting from root node (node 0). For each node:
  - Recurse each child (skipping back edge to parent).
  - Collect/traverse each child, record subtree sizes.
  - If sizes equal (for ≥2 children), node is counted as good.
- Count and return total good nodes.
- This approach is efficient due to tree’s acyclic (no cycles) and sparsely connected property.

### Corner cases to consider  
- Single node tree (edge = []): root is good.
- Tree with all leaves except root (e.g. "star" tree: node 0 connected to all others).
- Long chain (every node degree 2 except ends).
- Root with multiple children, different subtree depths.
- Children with equal subtree counts but different structures.
- Disconnected input (should never happen: input is always a valid tree).

### Solution

```python
from typing import List
from collections import defaultdict

class Solution:
    def countGoodNodes(self, edges: List[List[int]]) -> int:
        # Build adjacency list from edges
        graph = defaultdict(list)
        for a, b in edges:
            graph[a].append(b)
            graph[b].append(a)

        answer = 0  # To keep track of good nodes

        def dfs(node: int, parent: int) -> int:
            """
            Returns the subtree size rooted at this node.
            """
            nonlocal answer
            previous_count = -1  # Store first child's subtree size
            count = 1  # Count itself
            is_good_tree = 1  # 1 if current subtree is "good", else 0

            # Traverse children
            for child in graph[node]:
                if child == parent:
                    continue  # Skip parent
                current = dfs(child, node)  # Recursively get child's subtree size
                count += current  # Add child's size to current
                if previous_count < 0:
                    previous_count = current
                elif previous_count != current:
                    is_good_tree = 0  # Subtree sizes differ

            answer += is_good_tree  # If is_good_tree, count this node
            return count  # Return total count for parent use

        # Always start DFS from node 0; parent is -1
        dfs(0, -1)
        return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each node visited once, each edge traversed twice (in and out), total O(n) for n node tree.
- **Space Complexity:** O(n) — For adjacency list, recursion stack may be up to O(n) in worst case (chain/tree depth).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree was rooted at an arbitrary node, not necessarily 0?  
  *Hint: Start DFS from any node and pass its parent as -1 to support arbitrary roots.*

- How would you modify your approach if you had to find the list of all “bad” nodes?  
  *Hint: Collect nodes where `is_good_tree == 0`.*

- Can you optimize for iterative (non-recursive) DFS if stack overflows are a concern?  
  *Hint: Use explicit stack and maintain (node, parent, state) pairs.*

### Summary
This problem is a clean example of **tree recursion and subtree property aggregation**, specifically applying a post-order DFS to compute child-related properties at each node.  
The main pattern—calculating and comparing subtree sizes—appears in many tree DP, centroid decomposition, or “equal subtree” type interview questions.  
**Mastery of DFS, recursive info passing, and local/global aggregation is the key pattern here.**

### Tags
Tree(#tree), Depth-First Search(#depth-first-search)

### Similar Problems
- Maximum Depth of N-ary Tree(maximum-depth-of-n-ary-tree) (Easy)