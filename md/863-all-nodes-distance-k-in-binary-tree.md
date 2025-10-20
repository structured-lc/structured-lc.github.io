### Leetcode 863 (Medium): All Nodes Distance K in Binary Tree [Practice](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree)

### Description  
Given a binary tree with a root node, a reference to a target node, and an integer K, return the values of all nodes that are **exactly K edges** away from the target node. Nodes can be "up" towards the parent, "down" towards children, or sideways (think: relatives)—distance is by edge count.  
Return the result as a list, in any order. The input `target` is a reference to a node in the tree, not just its value.

### Examples  

**Example 1:**  
Input: `root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, K = 2`  
Output: `[7,4,1]`  
*Explanation: The nodes exactly 2 edges from node 5 are nodes with values 7, 4, and 1. Here's the tree:*
```
         3
       /   \
      5     1
     / \   / \
    6   2 0   8
       / \
      7   4
```
- 2 edges away from 5:  
  - 5 → 2 → 7 (7)  
  - 5 → 2 → 4 (4)  
  - 5 → 3 → 1 (1)  

**Example 2:**  
Input: `root = [1], target = 1, K = 3`  
Output: `[]`  
*Explanation: The tree has only one node; no nodes are 3 steps away from it.*

**Example 3:**  
Input: `root = [1,2,null,3,null,4], target = 2, K = 1`  
Output: `[1,3]`  
*Explanation:*
```
    1
   /
  2
 /
3
/
4
```
- 2's parent is 1 (distance 1), 2's child is 3 (distance 1). Both are included.

### Thought Process (as if you’re the interviewee)  
- The tree node doesn't have a direct parent pointer—so, from any node, you can move to its children, but except for the root, you can't move to its parent.
- We need to reach nodes "upwards" (towards parent/ancestors) and "downwards" (descendants).
- **Brute force:** For every node, check if it's at distance K from target (DFS for every node) — very inefficient for large trees.
- **Better idea:**  
  - Treat the tree as an undirected graph—build a bidirectional adjacency mapping: children and parent links for every node.
  - Once the graph is ready, perform **BFS starting from the target** node, moving simultaneously up to parent and down to children, marking visited nodes so as not to revisit.
  - Collect values at exactly K edges away.
- **Why BFS?** Because BFS naturally explores layer by layer—so the first time we reach distance K, we have all relevant nodes.  
- **Trade-offs:**  
  - DFS would require additional bookkeeping to not revisit nodes, so BFS is more direct and natural here for "smallest number of moves."
  - We pay an O(N) setup cost for the parent pointers, then controlled time in the BFS. Overall efficient for constraints given.

### Corner cases to consider  
- Tree with just root, and K > 0 ⇒ return []
- K == 0 ⇒ should return [target.val]
- Multiple nodes with same value but unique positions: function must distinguish based on node identity, not value
- K > maximum depth — can't reach, should return []
- Target node is the leaf/root
- Tree is skewed (e.g., linked-list shape)

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

def distanceK(root, target, K):
    # Step 1: Build parent pointers for all nodes
    parent = {}
    def dfs(node, par):
        if node:
            parent[node] = par
            dfs(node.left, node)
            dfs(node.right, node)
    dfs(root, None)

    # Step 2: BFS from target, track layers and visited
    from collections import deque
    queue = deque()
    queue.append((target, 0))
    seen = set()
    seen.add(target)
    res = []

    while queue:
        node, dist = queue.popleft()
        if dist == K:
            res.append(node.val)
        elif dist < K:
            for neighbor in (node.left, node.right, parent[node]):
                if neighbor and neighbor not in seen:
                    seen.add(neighbor)
                    queue.append((neighbor, dist + 1))
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N)
  - Collecting parent pointers via DFS is O(N).
  - Each node entered into the BFS queue at most once, O(N).
- **Space Complexity:** O(N)
  - To store parent pointers for N nodes.
  - BFS queue and visited set up to O(N) in worst case.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve it *without* building explicit parent pointers?  
  *Hint: Consider recursive DFS, passing distance from parent as you traverse.*

- What if the tree is *not binary* (i.e., k-ary or even a graph)?  
  *Hint: Solution still works with a generic adjacency list and visited set.*

- Suppose nodes can be deleted or added frequently — can you optimize for updates?  
  *Hint: Consider dynamic data structures or on-the-fly adjacency mapping.*

### Summary
This problem is a classic "convert tree to graph, then BFS for shortest distances" pattern.  
It uses *graph traversal logic* (BFS), with added pre-processing (parent pointers via DFS) to enable "undirected" movement between tree nodes.  
This approach appears in problems involving shortest paths, friend circles, social networks, and can be adapted to any structure where two-way movement is required but links are not explicitly stored.


### Flashcard
Treat the tree as a graph; BFS from the target, tracking distance K in all directions (up and down).

### Tags
Hash Table(#hash-table), Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Amount of Time for Binary Tree to Be Infected(amount-of-time-for-binary-tree-to-be-infected) (Medium)