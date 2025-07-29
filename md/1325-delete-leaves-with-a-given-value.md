### Leetcode 1325 (Medium): Delete Leaves With a Given Value [Practice](https://leetcode.com/problems/delete-leaves-with-a-given-value)

### Description  
Given the root of a binary tree and an integer **target**, delete **all leaf nodes** with the value equal to **target**. But there is a catch — if, after deleting a leaf, its parent becomes a **leaf** with value **target**, it should also be deleted. This process continues recursively until you cannot delete any more target-valued leaves.

### Examples  

**Example 1:**  
Input: `root = [1,2,3,2,null,2,4]`, `target = 2`  
Output: `[1,null,3,null,4]`  
*Explanation: The leaf nodes with value 2 are deleted first. After their removal, inner node 2 becomes a leaf and is also deleted. Final tree:*
```
1
 \
  3
   \
    4
```

**Example 2:**  
Input: `root = [1,3,3,3,2]`, `target = 3`  
Output: `[1,3,null,null,2]`  
*Explanation: Leaf nodes with value 3 are pruned. Their parent becomes a leaf, but since its value is not target, it's not deleted.*

**Example 3:**  
Input: `root = [1,2,null,2,null,2]`, `target = 2`  
Output: `[1]`  
*Explanation: Each node with value 2 gets deleted as soon as it becomes a leaf, cascading up to leave only the root.*

### Thought Process (as if you’re the interviewee)  
To solve this problem, I'm asked to delete **leaf nodes** with a given value, with the extra twist that deleting one may convert its parent into a leaf (and if that is a target, it gets deleted as well). 

- First, I could try a brute-force way: scan the tree repeatedly, each time removing all targeted leaves until no more deletions can occur. But that might be inefficient, especially for tall trees, since it revisits nodes.
- A better approach is **postorder traversal** (DFS): for each node, recursively try to delete leaves from its left and right first. 
  - Once both children are processed, check if the node has become a leaf and whether its value equals target. If so, delete (return None) — this naturally percolates deletions upward as we return back up the recursion stack.
- Trade-offs: This approach is efficient (each node is visited once), simple, and leverages the tree structure. We don’t need extra data structures.

### Corner cases to consider  
- Tree is empty (root is None).
- Tree has only one node and that node matches target.
- All nodes in the tree are target and eventually removed.
- No node in the tree matches target (tree remains unchanged).
- Non-leaf nodes with value == target should **not** be deleted unless they become leaves.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def removeLeafNodes(self, root: TreeNode, target: int) -> TreeNode:
        # Base case: if root is None, nothing to process
        if not root:
            return None

        # Process left and right subtrees first (post-order)
        root.left = self.removeLeafNodes(root.left, target)
        root.right = self.removeLeafNodes(root.right, target)

        # After child removal, if current node is a leaf and matches target, delete it
        if not root.left and not root.right and root.val == target:
            return None
        # Otherwise, keep the node
        return root
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of nodes in the tree. Each node is visited only once, and only constant work is done at each step.
- **Space Complexity:** O(H), where H is the height of the tree, due to the recursion stack. H = log₂N for a balanced tree, H = N for a skewed tree.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we need to delete nodes with a value in a range rather than a specific target?  
  *Hint: Adjust the condition from equality check to a range check for deletion.*

- How would you implement this iteratively instead of using recursion?  
  *Hint: Use an explicit stack to perform postorder traversal.*

- Can you adapt this approach for an n-ary tree?  
  *Hint: Instead of just left/right, loop through a list of children.*

### Summary
This solution uses the **post-order DFS** (Depth-First Search) traversal, which is a common pattern for problems requiring information about child nodes before making a decision at the parent. Such a recursive post-order pattern is broadly useful for problems like pruning, evaluating, or transforming tree structures based on subtree properties.