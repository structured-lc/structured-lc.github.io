### Leetcode 2385 (Medium): Amount of Time for Binary Tree to Be Infected [Practice](https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected)

### Description  
Given a binary tree with unique values, you are given a `start` value representing the value of a node in the tree where an infection spreads at minute 0. Every minute, a currently infected node infects each of its direct neighbors (its parent and its left/right children, if they exist and are uninfected). Return the total number of minutes needed to infect the entire tree.

### Examples  

**Example 1:**  
Input:  
Tree =  
```
      1
     / \
    5   3
       / \
      10  6
```
List = `[1,5,3,null,null,10,6]`, `start=3`  
Output: `4`  
*Explanation:*
- Minute 0: Node 3 infected.
- Minute 1: Nodes 1, 10, 6 infected.
- Minute 2: Node 5 infected (through parent 1).
- All nodes infected after 4 minutes (since the farthest leaf takes 4 steps from 3).

**Example 2:**  
Input:  
Tree =  
```
        1
       / 
      2  
     / 
    3  
```
List = `[1,2,null,3]`, `start=2`  
Output: `2`  
*Explanation:*
- Minute 0: Node 2 infected.
- Minute 1: Nodes 1, 3 infected.
- All nodes infected after 2 minutes.

**Example 3:**  
Input:  
Tree =  
```
    1
```
List = `[1]`, `start=1`  
Output: `0`  
*Explanation:*
- Only one node, infected at minute 0, so total time is 0.

### Thought Process (as if you’re the interviewee)  
To solve this, I first thought to simulate the infection minute by minute, using BFS from the start node because the infection spreads like a wave. But finding parent access efficiently from a node is tricky in a classic binary tree.

So, I realized I should:
- First, traverse the tree to map each node to its parent.
- Next, do a BFS starting at the node with value `start`. For BFS, treat each node's neighbors as its children and its parent.
- Count the number of minutes (levels of BFS) until all nodes are visited (infected).

Alternatively, a DFS approach from root can compute depths and distances from start more elegantly. But BFS more naturally models the per-minute spread.

I choose the BFS route as it handles all adjacency and is easy to visualize/debug.

### Corner cases to consider  
- Single-node tree.
- Skewed tree (all left or right).
- `start` is the root or a leaf.
- Tree with only two nodes.
- Nodes only connected via parent links (no children).
- `start` value not present in the tree (should not happen per constraints).

### Solution

```python
# Tree Node definition
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def amountOfTime(root, start):
    # Step 1: Build parent map and value-node map
    from collections import defaultdict, deque

    parent = dict()
    node_map = dict()

    def dfs(node, par=None):
        if not node:
            return
        node_map[node.val] = node
        if par:
            parent[node] = par
        dfs(node.left, node)
        dfs(node.right, node)

    dfs(root)

    # Step 2: BFS from start value
    start_node = node_map[start]
    visited = set()
    q = deque()
    q.append(start_node)
    visited.add(start_node)
    minute = -1

    while q:
        size = len(q)
        for _ in range(size):
            node = q.popleft()
            # Check neighbors: left, right, parent
            for neighbor in [node.left, node.right, parent.get(node)]:
                if neighbor and neighbor not in visited:
                    visited.add(neighbor)
                    q.append(neighbor)
        minute += 1

    return minute
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes. We visit every node once to build maps, and again during BFS.
- **Space Complexity:** O(n), to store parent pointers, node map, and BFS queue/visited set.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to track the exact infection time at each node?
  *Hint: Augment BFS with a dictionary mapping node to infection time.*

- Suppose multiple nodes are initially infected (multi-source)?
  *Hint: BFS queue can be seeded with all initial infected nodes.*

- What if it was a general graph instead of a binary tree?
  *Hint: Represent neighbors via adjacency list, otherwise same BFS applies.*

### Summary
This is a graph traversal problem applied to a binary tree, leveraging BFS to model the per-minute "infection" spread. The key is the **parent mapping** to enable upward movement, converting the tree into an undirected graph traversal for this simulation. This is a classic BFS layer-based pattern, often used for shortest path, level-order problems, and infectious spread modeling.

### Tags
Hash Table(#hash-table), Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Maximum Depth of Binary Tree(maximum-depth-of-binary-tree) (Easy)
- Shortest Path to Get Food(shortest-path-to-get-food) (Medium)
- All Nodes Distance K in Binary Tree(all-nodes-distance-k-in-binary-tree) (Medium)
- Count the Number of Infection Sequences(count-the-number-of-infection-sequences) (Hard)