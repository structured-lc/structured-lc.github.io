### Leetcode 1361 (Medium): Validate Binary Tree Nodes [Practice](https://leetcode.com/problems/validate-binary-tree-nodes)

### Description  
Given n nodes labeled 0 to n-1, and two integer arrays leftChild and rightChild, where leftChild[i] and rightChild[i] are the left and right children of node i (or -1 if none), determine if all nodes can form exactly one valid binary tree. 
A valid binary tree must:
- Have exactly one root (node with no parent)
- Every node except the root has exactly one parent
- No cycles or multiple roots
- All nodes are connected (no disconnected components)

### Examples  

**Example 1:**  
Input: `n = 4, leftChild = [1, -1, 3, -1], rightChild = [2, -1, -1, -1]`  
Output: `true`  
*Explanation: This forms one valid binary tree with root 0. The tree looks like:*
```
    0
   / \
  1   2
   \
    3
List Representation: [0,1,2,null,3]
```

**Example 2:**  
Input: `n = 4, leftChild = [1, -1, 3, -1], rightChild = [2, 3, -1, -1]`  
Output: `false`  
*Explanation: Node 3 has two parents (0 and 1).*

**Example 3:**  
Input: `n = 2, leftChild = [1, 0], rightChild = [-1, -1]`  
Output: `false`  
*Explanation: Forms a cycle: 0 → 1 → 0. Not a tree.*


### Thought Process (as if you’re the interviewee)  
First, we need to make sure:
- Each node (except the root) has exactly one parent. We do this by counting the in-degree of every node; if we see an in-degree > 1, return False.
- There is exactly one root (a node with in-degree 0). If more than one root or no root, return False.
- The structure is a connected tree with no cycles. After finding the root, we use DFS/BFS from the root to count how many nodes we can reach; if not exactly n nodes are reached, the structure is invalid.

We can also use Union-Find to ensure there are no cycles and only one connected component, but the in-degree + DFS approach is a bit simpler here.

### Corner cases to consider  
- Any node has in-degree > 1 (multiple parents)
- Multiple roots (more than one node with in-degree 0)
- No root (every node has a parent)
- The tree is disconnected (not all nodes are reachable from root)
- Cycles (DFS visits the same node twice)
- n = 1 (single node, no children)
- leftChild or rightChild values as -1 everywhere (no children at all)


### Solution

```python
# Check if leftChild and rightChild together make one valid binary tree
# Approach: In-degree counting and DFS

def validateBinaryTreeNodes(n, leftChild, rightChild):
    # Count in-degree for each node
    in_deg = [0] * n
    for ch in leftChild:
        if ch != -1:
            in_deg[ch] += 1
            if in_deg[ch] > 1:
                return False  # More than one parent for a node
    for ch in rightChild:
        if ch != -1:
            in_deg[ch] += 1
            if in_deg[ch] > 1:
                return False

    # Find root (in-degree == 0)
    roots = [i for i, deg in enumerate(in_deg) if deg == 0]
    if len(roots) != 1:
        return False  # No root, or multiple roots
    root = roots[0]

    # Check connectivity & cycles via DFS
    visited = set()
    def dfs(node):
        if node == -1:
            return
        if node in visited:
            return  # cycle detected
        visited.add(node)
        dfs(leftChild[node])
        dfs(rightChild[node])

    dfs(root)
    # All n nodes must be visited
    return len(visited) == n
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) — Each node is processed once for in-degree counting and once for the DFS.
- **Space Complexity:** O(n) — For in-degree array, possible recursion stack, and visited set.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the input is given as an edge list instead of leftChild/rightChild arrays?  
  *Hint: Build child and parent relationships, do parent-counting and root-finding similarly.*

- How do you detect and return the node causing a cycle or multiple parents?  
  *Hint: Track the parent for each node and flag conflicts or repeats. Use the visited set in DFS to report the cycle node.*

- Can you solve this without using recursion (avoiding stack overflow) for large n?  
  *Hint: Implement BFS using a queue for traversal.*

### Summary
This approach uses in-degree counting to detect multiple roots or parents, then DFS from the root to detect connectivity and cycles. These are standard tree-validation steps and fit the general connected-component/cycle-detection pattern in graphs. The pattern is common in organizational chart validation, serializing/deserializing trees, and parent-child pointer validations.