### Leetcode 250 (Medium): Count Univalue Subtrees [Practice](https://leetcode.com/problems/count-univalue-subtrees)

### Description  
Given a binary tree, count the number of **univalue subtrees**. A univalue subtree is a subtree where all nodes have the same value. Return the total count of such subtrees.

In other words, for every node, check if the entire subtree rooted at that node consists of nodes with the same value, and count all such subtrees in the entire tree.

### Examples  

**Example 1:**  
Input: `[5,1,5,5,5,null,5]`  
Output: `4`  
*Explanation:  
```
    5
   / \
  1   5
     / \
    5   5
         \
          5
```
There are 4 univalue subtrees: each leaf (three `5`s and one `1`), and the subtree rooted at the rightmost `5` (connecting its right leaf `5`).*

**Example 2:**  
Input: `[1,1,1,5,1,null,5]`  
Output: `5`  
*Explanation:  
```
    1
   / \
  1   1
 /   \
5     5
 \
  1
```
All 4 leaves are univalue. The left child subtree rooted at left `1` (whose left is `5`) is not univalue, but the right subtree is. Total univalue subtrees = 5.*

**Example 3:**  
Input: `[]`  
Output: `0`  
*Explanation: Empty tree, so 0 univalue subtrees.*

### Thought Process (as if you’re the interviewee)  
- First, I restate the problem to make sure I understand: given a binary tree, count how many subtrees have all the same value.
- **Brute-force idea:** For every node, perform a traversal of its subtree to check if all nodes have the same value. But this would be very slow (O(n²)), because we may redundantly check the same subtrees multiple times.
- **Optimization:** I realize I can use DFS (recursion). If I traverse bottom-up (post-order), at each node I can check:
  - Are both left and right subtrees univalue?
  - Do left/right children match the current node value (if they exist)?
  - If yes, then this subtree (rooted at the current node) is univalue — increment counter.
- This approach enables us to determine, in a single traversal, which nodes root a univalue subtree. 
- This is **efficient (O(n))** because we check each subtree property only once.

### Corner cases to consider  
- Tree is empty (should return 0)
- Tree has only one node (should return 1)
- All nodes have unique values (only leaves would count as univalue subtrees)
- All nodes have the same value (every subtree is univalue)
- Tree has only left or only right children (unbalanced)

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def countUnivalSubtrees(self, root: TreeNode) -> int:
        # Holds the count as a list so inner function can mutate
        count = [0]

        def is_univalue_subtree(node):
            if node is None:
                return True   # Null subtree is univalue

            # Recursively check left and right
            left_uni = is_univalue_subtree(node.left)
            right_uni = is_univalue_subtree(node.right)

            # If either not univalue, current can't be univalue
            if not left_uni or not right_uni:
                return False

            if node.left and node.left.val != node.val:
                return False
            if node.right and node.right.val != node.val:
                return False

            # If all passed, this subtree is univalue
            count[0] += 1
            return True

        is_univalue_subtree(root)
        return count[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes (each node is visited exactly once).
- **Space Complexity:** O(h), where h is the height of the tree (due to recursion stack). No other extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What would change if the tree was not binary (could have more than two children)?  
  *Hint: Think about traversing all children and extending the check over an arbitrary list.*

- Suppose the nodes contain both value and color — can you count the number of univalue **and unicolor** subtrees?  
  *Hint: Instead of checking just value, compare both attributes for each subtree.*

- How would you return the roots of each univalue subtree, not just the count?  
  *Hint: Collect nodes when you find a univalue subtree.*

### Summary
This problem uses the classic **DFS/postorder traversal** to gather information from bottom up and aggregate counts. The pattern is common for problems where you need to check/collect properties for the subtree rooted at every node efficiently. The approach is applicable for many similar subtree verification/counting problems.


### Flashcard
Count Univalue Subtrees

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Subtree of Another Tree(subtree-of-another-tree) (Easy)
- Longest Univalue Path(longest-univalue-path) (Medium)