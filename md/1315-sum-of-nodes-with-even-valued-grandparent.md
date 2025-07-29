### Leetcode 1315 (Medium): Sum of Nodes with Even-Valued Grandparent [Practice](https://leetcode.com/problems/sum-of-nodes-with-even-valued-grandparent)

### Description  
Given a binary tree, compute the sum of values of all nodes whose grandparent has an even value. A grandparent of a node is its parent’s parent. If such a node doesn’t exist or the tree is empty, return 0.

### Examples  

**Example 1:**  
Input:  
Tree:  
```
    6
   / \
  7   8
 / \ / \
2  7 1  3
/  /   \
9  1    5
```
List: `[6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]`  
Output: `18`  
*Explanation: Nodes with even-valued grandparent (6) are 2, 1, 1, 3, 5. Sum = 2+1+1+3+5 = 12.  
(If the full node set in the explanation includes grandchildren of 6 or others, check input. Actual sum per LeetCode for this exact structure should be `18`, as nodes under even-valued 6 are 7,8,* children: 2,7,1,3. Their children: 9,1,4,5 (grandchildren of 6). So total is 9+1+4+5 = 19. Verify input in question.*)

**Example 2:**  
Input:  
Tree:  
```
  2
 /
6
```
List: `[2,6]`  
Output: `0`  
*Explanation: There isn't any node with a grandparent, so output is 0.*

**Example 3:**  
Input:  
Tree:  
```
  1
 / \
2   3
```
List: `[1,2,3]`  
Output: `0`  
*Explanation: All nodes are just roots or direct children; no node has a grandparent, so result is 0.*

### Thought Process (as if you’re the interviewee)  
- First, I need to traverse the tree and for each node, determine if it has a grandparent and whether that grandparent has an even value.
- A brute-force approach would involve, for each node, tracing up two levels to check the grandparent's value, but that can be inefficient.
- A more efficient approach is to do a DFS traversal and for each node, keep track of its parent and grandparent values as I recurse down the tree.
- At each visit, if the grandparent exists and is even-valued, I add the current node's value to a running sum.
- This reduces the need for repeated traversal and makes use of recursion’s call stack to easily carry the parent/grandparent values.
- The final answer is the sum accumulated as I traverse the entire tree.

### Corner cases to consider  
- The tree is empty ⇒ return 0.
- The tree is only a root node ⇒ no grandparents possible, return 0.
- Tree has only root + one child ⇒ again, no possible grandparent.
- All node values are odd ⇒ sum remains 0.
- The grandparent exists, but not even-valued ⇒ not counted.
- Tree is unbalanced or skewed.
- Negative node values (if allowed by input constraints).

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def sumEvenGrandparent(root):
    # Helper function: dfs with params (node, parent, grandparent)
    def dfs(node, parent_val, grandparent_val):
        if not node:
            return 0
        
        # If grandparent exists and is even
        curr_sum = node.val if grandparent_val % 2 == 0 else 0
        
        # Recurse to children, passing current as parent, parent as grandparent
        left_sum = dfs(node.left, node.val, parent_val)
        right_sum = dfs(node.right, node.val, parent_val)
        
        return curr_sum + left_sum + right_sum

    # Initial call: root has no parent or grandparent, can give dummy odd value like 1
    return dfs(root, 1, 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Every node is visited once during traversal, where n is the number of nodes in the tree.

- **Space Complexity:** O(h)  
  O(h) for recursive stack, where h is the height of the tree (O(log n) for balanced, O(n) worst-case for skewed).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is very deep and the recursion stack may overflow?  
  *Hint: Can you implement this iteratively using a stack for traversal?*

- Can this be adapted if the “grandparent” relationship were defined as k-ancestor, not fixed at 2?  
  *Hint: Consider passing a queue of ancestor values of length k.*

- What if you need to return the list of qualifying nodes, not just their sum?  
  *Hint: Use an array to collect nodes whenever the grandparent condition is met.*

### Summary
This problem is a classic recursive tree traversal with parameter passing. It uses depth-first search (DFS) and demonstrates how carrying ancestor information during recursion leads to elegant solutions. This pattern—passing parent/grandparent context down recursions—is commonly used in tree dynamic programming and ancestor-related queries on trees.