### Leetcode 742 (Medium): Closest Leaf in a Binary Tree [Practice](https://leetcode.com/problems/closest-leaf-in-a-binary-tree)

### Description  
Given a binary tree in which each node has a unique value, and an integer `k`, find the value of the **nearest leaf** node to the node whose value is `k`.  
- A **leaf node** is any node without left or right children.  
- *Nearest* means the minimal number of edges needed to reach a leaf from the target node.

### Examples  

**Example 1:**  
Input: `root = [1,3,2], k = 1`  
Output: `2`  
*Explanation: The tree is:*
```
    1
   / \
  3   2
```
*Both 3 and 2 are leaves and both are 1 edge from node 1. Either answer (2 or 3) is accepted.*

**Example 2:**  
Input: `root = [1,2,3,4,null,null,null,5,null,6], k = 2`  
Output: `5`  
*Explanation: The tree is:*
```
        1
      /   \
     2     3
    /
   4
  /
 5
  \
   6
```
*Starting from node 2, the closest leaf is 5 (down the path 2→4→5, distance 2 edges), while 6 is farther.*

**Example 3:**  
Input: `root = [1], k = 1`  
Output: `1`  
*Explanation: The tree is:*
```
1
```
*The only node is itself, and it is a leaf.*

### Thought Process (as if you’re the interviewee)  

- **Naive idea:** For each node, find all possible leaves below it and track the minimum distance. This can be very inefficient, especially with repeated work.
- **Refined:** Notice you may reach leaves either **down the subtree** from k, or by going **up then down another branch**.  
- **Tree to Graph:** Convert the tree into a graph (each node points to left, right, and parent). Then simply do a **BFS** starting from node k, the first leaf found is the closest.
    - This works because BFS finds the least number of edges first, whether moving down or up.
- **Alternative:** Use recursion, memoization, and try finding the path from root to k. Then, for every node on the path, compute the nearest leaf via children, and attempt the minimal from all possible split points. This is more complex and less standard than the BFS graph approach.
- Trade-offs: Graph + BFS is easy to implement and guarantees shortest path to a leaf from any node.

### Corner cases to consider  
- Tree has only a single node (root is a leaf).
- k is already a leaf node (immediate answer).
- The closest leaf may require moving up and then down another subtree.
- Deep/skewed tree, where path to leaf is long or needs to move up before down.
- All leaves are at different depths.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

def findClosestLeaf(root: TreeNode, k: int) -> int:
    # Step 1: Use DFS to build a graph: node value -> list of neighboring nodes
    from collections import defaultdict, deque

    graph = defaultdict(list)
    node_map = {}

    def dfs(node, parent):
        if not node:
            return
        node_map[node.val] = node
        if parent:
            graph[node.val].append(parent.val)
            graph[parent.val].append(node.val)
        if node.left:
            dfs(node.left, node)
        if node.right:
            dfs(node.right, node)
    dfs(root, None)
    
    # Step 2: BFS from node 'k', return the first leaf encountered
    queue = deque([k])
    visited = set()
    while queue:
        cur = queue.popleft()
        node = node_map[cur]
        # If this is a leaf, return its value
        if not node.left and not node.right:
            return cur
        visited.add(cur)
        for neighbor in graph[cur]:
            if neighbor not in visited:
                queue.append(neighbor)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of nodes.  
    - DFS creates the graph in O(n).  
    - BFS visits each node at most once.
- **Space Complexity:** O(n).  
    - Graph and node_map store all nodes.  
    - BFS queue and visited set can grow up to O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- If the tree is *very large* (e.g., nodes can't all fit in memory), how could you modify your approach?  
  *Hint: Streaming traversal or external memory graph, or prioritizing partial traversal towards k.*

- Suppose the node values are *not unique*; how would you handle finding the starting node?  
  *Hint: Would need an extra step to uniquely identify nodes (e.g., pointer, position, parent).*

- What if you also wanted the distance (number of edges) to the closest leaf?  
  *Hint: Track distance variable in BFS level order traversal.*

### Summary

This problem demonstrates the technique of *converting a tree to an undirected graph* and then using **BFS** to find the shortest path, a pattern that shows up whenever bidirectional traversal is needed in a tree (finding shortest/closest nodes or relatives).  
It’s a common pattern in problems like “Lowest Common Ancestor”, “Distance Between Nodes in a Tree”, and any search where parent navigation is required.  
Key ideas are **BFS for shortest path**, and using a hashmap to store parent links if not explicitly available.