### Leetcode 3319 (Medium): K-th Largest Perfect Subtree Size in Binary Tree [Practice](https://leetcode.com/problems/k-th-largest-perfect-subtree-size-in-binary-tree)

### Description  
Given the root of a binary tree and an integer k, find the size of the k-th largest *perfect* subtree in the tree.  
A perfect subtree is one where every non-leaf node has exactly two children and all leaf nodes are at the same depth.  
Return the size (number of nodes) of that k-th largest perfect subtree.  

### Examples  

**Example 1:**  
Input: `root = [1,2,3,4,5,6,7], k = 2`  
Output: `3`  
*Explanation: The perfect subtrees in the tree are:*
```
    2
   / \
  4   5

    3
   / \
  6   7

    1
   / \
  2   3
 / \ / \
4 5 6 7
```
*Subtree sizes: 3, 3, 7. The 2ⁿᵈ largest is 3.*

**Example 2:**  
Input: `root = [5,4,6,2,null,null,7], k = 1`  
Output: `3`  
*Explanation: The perfect subtrees are:*
```
    2           6
               / \
             N   7
 ```
*Both have size 1 (only leaves), but the subtree rooted at 6 is perfect with 3 nodes:*
```
   6
  / \
 N   7
```
*Largest perfect subtree has size 3.*

**Example 3:**  
Input: `root = [1,null,2], k = 1`  
Output: `1`  
*Explanation: Only leaf nodes (2) are perfect subtrees, so output is 1.*

### Thought Process (as if you’re the interviewee)  
- First, I need to identify all perfect subtrees (subtrees that are themselves perfect binary trees).
- Brute-force approach: For every node, check if its subtree is perfect and, if so, record its size. This requires repeated traversals.
- Optimize: Use a post-order traversal (DFS) and, for each node, gather info from its left and right children.  
  - If both children are roots of perfect subtrees of the same size, the current node can be the root of a perfect subtree of size `left_size + right_size + 1`.
  - Otherwise, it's not perfect.
- As I process each node, I keep a list of all perfect subtree sizes found.
- At the end, I'll sort the list and return the k-th largest.
- This method ensures O(n) traversal plus a final sort (which will be fast since number of perfect subtree sizes is ≤ n).

### Corner cases to consider  
- Tree is empty (`root is None`)
- k is greater than the number of perfect subtrees
- All nodes are leaves (all perfect subtrees are size 1)
- Entire tree is a perfect binary tree (e.g. complete tree)
- Unbalanced trees with only single perfect subtrees at leaves
- Duplicate sizes of perfect subtrees

### Solution

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
        
def kthLargestSubtreeSize(root, k):
    nums = []
    
    # Helper: postorder DFS returning size of perfect subtree, -1 if not perfect
    def dfs(node):
        if not node:
            return 0  # treat empty subtree as perfect of size 0
        left = dfs(node.left)
        right = dfs(node.right)
        
        # If either subtree is not perfect, or sizes mismatch, not perfect
        if left == -1 or right == -1 or left != right:
            return -1
        
        curr_size = left + right + 1
        nums.append(curr_size)
        return curr_size
    
    dfs(root)
    
    if len(nums) < k:
        return -1  # not enough perfect subtrees
    
    nums.sort(reverse=True)
    return nums[k-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m log m),  
  Where n = number of nodes (DFS traversal), and m = number of perfect subtrees found (m ≤ n, so sorting is acceptable). Overall O(n log n) in worst case.
- **Space Complexity:** O(n)  
  For the recursion stack (in the case of a skewed tree), and for storing up to n perfect subtree sizes.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the code to return not just sizes, but also the root nodes of these perfect subtrees?  
  *Hint: Instead of just storing subtree sizes, store (size, node) pairs.*

- How would you reduce space further if you only care about the k largest perfect subtree sizes?  
  *Hint: Use a min-heap of size k instead of storing all sizes.*

- Can you do it without sorting, in O(n) time?  
  *Hint: Use quickselect to find the k-th largest after collecting sizes.*

### Summary
This solution highlights a *post-order DFS* binary tree traversal with local aggregation of subtree properties — a common pattern for problems like "largest subtree", "subtree sum", or "unival subtrees". The key trick is to determine from each node's children whether the current subtree meets global structure constraints, and to gather results efficiently during traversal. This pattern is broadly reusable for structural binary tree problems and interview scenarios involving subtrees and their properties.


### Flashcard
Post-order DFS to check if each subtree is perfect; track height and size; if both children are perfect subtrees of equal height, current node forms a perfect subtree.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Sorting(#sorting), Binary Tree(#binary-tree)

### Similar Problems
- Balanced Binary Tree(balanced-binary-tree) (Easy)