### Leetcode 1660 (Medium): Correct a Binary Tree [Practice](https://leetcode.com/problems/correct-a-binary-tree)

### Description  
Given the root of a binary tree that has **exactly one invalid node**, where its right child incorrectly points to another node at the same depth but to its right (i.e., a cycle or bad pointer), remove the invalid node and return the corrected tree. The valid tree is otherwise a normal binary tree with unique values.

### Examples  

**Example 1:**  
Input: Root tree:  
```
    1
   / \
  2   3
       \
        4  <---<--\
            \     |
             5 <--/
```
List: `[1,2,3,null,null,null,4,null,5]`  
Output: Corrected tree:  
```
    1
   / \
  2   3
```
*Explanation: Node 4 had an invalid right child to node 5 on the same depth but to its right. Remove node 4 and its incorrect subtree.*

**Example 2:**  
Input: Root tree:  
```
    7
   / \
  5   8
     /
    6   (bad pointer from 6 right to 5)
```
List: `[7,5,8,null,null,6,null,null,null,null,5]`  
Output:  
```
    7
   / \
  5   8
```
*Explanation: Remove node 6, which has illegal pointer to node 5.*

### Thought Process (as if you’re the interviewee)  
The core problem is to find the node whose right child points to a node already seen on the same level, but to its right. I can perform BFS (level-order traversal), maintaining a set of seen node addresses per level from right to left. Visit right child first, then left. If I find a node whose right child is already in the set of seen nodes, I know it's the bad node. Set its parent's corresponding child pointer to None.

### Corner cases to consider  
- Only root node
- Bad node at the deepest leaf
- Bad node is the immediate right child
- Bad node's children

### Solution

```python
from collections import deque

class Solution:
    def correctBinaryTree(self, root: 'TreeNode') -> 'TreeNode':
        queue = deque([root])
        parent = {root: None}
        while queue:
            level = list(queue)
            seen = set()
            for node in reversed(level):
                if node.right and node.right in seen:
                    par = parent[node]
                    # Remove reference from parent
                    if par.left == node:
                        par.left = None
                    else:
                        par.right = None
                    return root
                seen.add(node)
            for node in level:
                if node.left:
                    parent[node.left] = node
                    queue.append(node.left)
                if node.right:
                    parent[node.right] = node
                    queue.append(node.right)
            queue = queue[len(level):]
        return root
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N), one pass over all nodes in BFS.
- **Space Complexity:** O(N), for parent mapping and level storage.


### Potential follow-up questions (as if you’re the interviewer)  

- How to adapt if there could be multiple invalid pointers?
  *Hint: Repeat process, or mark all seen in set.*

- Can you do it in one DFS traversal?
  *Hint: Preorder or postorder may struggle with level restriction.*

- What if bad pointers could be to any node, not just rightward?
  *Hint: Need generalized set-check for each level.*

### Summary
This uses BFS and per-level bookkeeping to detect illegal right pointers. The pattern is typical for questions involving tree structure correction, loops in trees, and illegal child pointer detection by level order.


### Flashcard
Perform BFS right-to-left per level; if a node’s right child is already seen, it’s the bad node—set its parent’s pointer to None.

### Tags
Hash Table(#hash-table), Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Flatten Binary Tree to Linked List(flatten-binary-tree-to-linked-list) (Medium)
- Flatten a Multilevel Doubly Linked List(flatten-a-multilevel-doubly-linked-list) (Medium)