### Leetcode 653 (Easy): Two Sum IV - Input is a BST [Practice](https://leetcode.com/problems/two-sum-iv-input-is-a-bst)

### Description  
Given a **binary search tree** (BST) and an integer **k**, determine if there exist **two different nodes** in the tree whose values add up to **k**.  
You need to find any such pair. Return `True` if such a pair exists, otherwise return `False`.  
- BST property: for each node, all nodes in the left subtree are strictly less, and all nodes in the right subtree are strictly greater.  
- Node values are unique per node but may repeat overall (if multiple nodes share the same value in more general cases).

### Examples  

**Example 1:**  
Input:  
Tree:  
```
    5
   / \
  3   6
 / \   \
2   4   7
```  
Target: `k = 9`  
Output: `True`  
*Explanation: 5 + 4 = 9, or 2 + 7 = 9. There are at least two different pairs.*

**Example 2:**  
Input:  
Tree:  
```
    5
   / \
  3   6
 / \   \
2   4   7
```  
Target: `k = 28`  
Output: `False`  
*Explanation: There are no two nodes in the tree whose sum is 28. All possible pairs checked, none sum to 28.*

**Example 3:**  
Input:  
Tree:  
```
  2
   \
    3
```  
Target: `k = 6`  
Output: `False`  
*Explanation: Only possible pair (2,3) = 5, which is less than 6.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  For every possible pair of nodes, check if their sum is `k`.  
  This requires traversing each node and, for each node, searching the tree (or a list) for `k - node.val`.  
  Time complexity is inefficient, O(n²), as each node may be paired with every other node.

- **Optimized (Using HashSet):**  
  While traversing the tree (e.g., in-order DFS), for each node:
    - Check if `k - node.val` exists in a set.
    - If yes, we have a pair; return True.
    - Otherwise, add `node.val` to the set and continue traversing.
  This uses O(n) time and O(n) space for the set.
  **Trade-off:**  
  - Uses extra space, but makes the solution linear time.
  - Simple to code and works with any BST shape (balanced or not).

- **Space-optimized (BST property):**
  - In-order traversal creates a sorted list; then use two pointers (left and right) to find if any two sum to `k`.
  - Requires flattening BST to a list first, which is O(n) space as well.

- **Final Approach:**  
  I will use the HashSet + DFS in-order traversal, as it is simple, robust, and passes all edge cases without relying on BST shape.

### Corner cases to consider  
- Empty tree.
- Tree with only one node.
- Tree where all values are the same (if allowed).
- Tree where valid pair does not exist.
- Negative and positive values.
- The valid pair must use two **distinct** nodes (not the same node counted twice).

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def findTarget(root, k):
    """
    Returns True if there exist two distinct nodes in the BST such that
    their values sum up to k.
    """
    seen = set()
    
    def dfs(node):
        if not node:
            return False
        # Check if complement exists in set
        complement = k - node.val
        if complement in seen:
            return True
        # Add current value to set
        seen.add(node.val)
        # Recur on left and right subtrees
        return dfs(node.left) or dfs(node.right)
    
    return dfs(root)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), as every node is visited exactly once during DFS. The set membership check and insert are O(1) each.
- **Space Complexity:** O(n), due to the set storing values of all visited nodes. The recursion stack is O(h) where h is tree height (could be O(n) for skewed trees).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve the problem **without using extra space**?  
  *Hint: Leverage in-order traversal to get a sorted list, then utilize the two-pointer method.*

- How to optimize for the case where the tree is **very large, but values are all unique and range is small**?  
  *Hint: Could a BFS with a visited set still guarantee memory does not explode?*

- Can you do this with **iterative traversal only**?  
  *Hint: Use a stack for in-order traversal instead of recursion.*

### Summary
This problem applies the **“Two Sum”** pattern, mapping it to trees. The solution uses DFS and a HashSet to track seen values, matching the complement for each node while traversing. This “hashing for pair search” is a widely-used pattern (appears in arrays, linked lists, BSTs, etc.) and mastering it helps efficiently solve variations requiring pair or tuple sum checks in linear time. The recursive DFS + hashset approach is easy to adapt for other tree-based “pair”-style problems.


### Flashcard
Traverse BST with DFS, using a hash set to check if k − node.val has been seen; return true if found, else add node.val and continue.

### Tags
Hash Table(#hash-table), Two Pointers(#two-pointers), Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree)

### Similar Problems
- Two Sum(two-sum) (Easy)
- Two Sum II - Input Array Is Sorted(two-sum-ii-input-array-is-sorted) (Medium)
- Two Sum III - Data structure design(two-sum-iii-data-structure-design) (Easy)
- Two Sum BSTs(two-sum-bsts) (Medium)