### Leetcode 230 (Medium): Kth Smallest Element in a BST [Practice](https://leetcode.com/problems/kth-smallest-element-in-a-bst)

### Description  
Given the root of a **binary search tree** (BST) and an integer k, return the **kᵗʰ smallest** value among all nodes in the tree.  
Recall that in a BST, for every node, all nodes in its left subtree are less than its value, and all nodes in its right subtree are greater.

### Examples  

**Example 1:**  
Input: root = `[3,1,4,null,2]`, k = `1`  
Output: `1`  
*Explanation: The BST looks like:*  
```
    3
   / \
  1   4
   \
    2
```  
The inorder traversal is [1,2,3,4]. The 1ˢᵗ smallest value is `1`.

**Example 2:**  
Input: root = `[5,3,6,2,4,null,null,1]`, k = `3`  
Output: `3`  
*Explanation: The BST looks like:*  
```
      5
     / \
    3   6
   / \
  2   4
 /
1
```  
The inorder traversal is [1,2,3,4,5,6]. The 3ʳᵈ smallest value is `3`.

**Example 3:**  
Input: root = `[2,1,3]`, k = `2`  
Output: `2`  
*Explanation: The BST looks like:*  
```
  2
 / \
1   3
```  
The inorder is [1,2,3], the 2ⁿᵈ smallest is `2`.

### Thought Process (as if you’re the interviewee)  
- The problem asks for the kᵗʰ smallest element in a BST.  
- In a BST, inorder traversal (left → node → right) visits nodes in sorted ascending order.
- **Brute-force**: Perform an inorder traversal, record nodes in a list, then return the (k-1)ᵗʰ element.  
  - Drawback: unnecessary space use to store the entire traversal.
- **Optimization**: Since all we need is the kᵗʰ smallest, we can do an inorder traversal but stop as soon as we reach the kᵗʰ node—tracking count with a counter.
- **Iterative**: We could also use an explicit stack to emulate recursion and find the kᵗʰ smallest without recursion stack overhead, stopping as soon as we pop k nodes off the stack.

### Corner cases to consider  
- The BST is empty (`root = None`).
- k is 1 (need the minimum).
- k equals the total number of nodes (need the maximum).
- The BST is "degenerate" (resembles a linked list).
- All value are unique (per BST property).

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

def kthSmallest(root, k):
    # Stack for the simulation of iterative inorder traversal
    stack = []
    current = root
    count = 0
    
    # Iterative inorder traversal: left -> node -> right
    while stack or current:
        # Go as far left as possible
        while current:
            stack.append(current)
            current = current.left
        # Visit the node
        current = stack.pop()
        count += 1
        # If we've reached the kᵗʰ smallest, return its value
        if count == k:
            return current.val
        # Move to the right subtree
        current = current.right
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k) in best case (for very left-heavy trees), O(n) in worst case (need to traverse whole BST in skewed cases).
- **Space Complexity:** O(h), where h is the tree height, due to the stack (recursion or explicit). For balanced trees h ≈ log₂n, for skewed trees O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the BST is frequently modified (insert/delete), and you need to repeatedly find the kᵗʰ smallest?
  *Hint: Consider augmenting each node with subtree node counts to enable O(log n) selection.*

- Can you do this with O(1) extra space (not counting the recursion/stack)?
  *Hint: Think about Morris Traversal (threaded binary tree traversal).*

- How would you find the kᵗʰ largest instead?
  *Hint: Do a reverse inorder traversal (right → node → left), counting as you go.*

### Summary
This problem is a classic example of **inorder traversal** applied to BSTs, leveraging their property of in-order sortedness. The iterative (or recursive) in-order approach is a common pattern that’s widely useful in tree-related algorithms—especially when working with *ranges*, *min/max/median*, or *selection* queries in BSTs.