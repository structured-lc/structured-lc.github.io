### Leetcode 2689 (Easy): Extract Kth Character From The Rope Tree [Practice](https://leetcode.com/problems/extract-kth-character-from-the-rope-tree)

### Description  
Given a binary Rope tree, each node is either:
- a **leaf** (with a non-empty string value and no children, and `len == 0`),  
- or an **internal node** (with an empty string, and `len > 0`, and up to two children).  

For each node, its string is:
- if it’s a leaf: its own value,
- if it’s internal: the concatenation of the strings at its left and right children.

The task: **find the kᵗʰ character (1-based) in the string represented by the whole tree at the root,** but do it efficiently, without constructing the whole string (tree can be very deep/large).

### Examples  

**Example 1:**  
Input:  
```
Tree:       [ "", 6 ]
            /       \
       [ "abc", 0 ]  [ "def", 0 ]
k = 4
```
Output: `d`  
*Explanation: The string is "abcdef". 4ᵗʰ character is "d".*

**Example 2:**  
Input:  
```
Tree:         [ "", 8 ]
              /      \
     [ "", 5 ]   [ "gh", 0 ]
      /    \
 [ "abc",0 ] [ "de",0 ]
k = 7
```
Output: `h`  
*Explanation: The Rope builds "abcdegh". The 7ᵗʰ character is "h".*

**Example 3:**  
Input:  
```
Tree:         [ "", 3 ]
                 /
         [ "", 3 ]
           /     \
     [ "a", 0 ] [ "bc", 0 ]
k = 2
```
Output: `b`  
*Explanation: The string is "abc". The 2ⁿᵈ character is "b".*



### Thought Process (as if you’re the interviewee)  
First, for a brute-force solution, we could construct the full string represented by the tree (inorder/dfs traversal), and return the kᵗʰ character. But if the string is huge, this uses too much memory.

The Rope’s purpose is to allow efficient queries — since each internal node stores the total length for its subtree, we can **navigate down the tree without fully constructing the string**.

At each internal node, we can check `len(left)`:
- If `k` ≤ left subtree length, descend to left.
- Else, subtract left subtree length and descend right.

When we reach a **leaf**, just index into the string.

This approach only visits O(log n) nodes for a balanced rope, and O(n) in the worst case (very imbalanced tree), but never materializes the full string.

**Tradeoffs:**  
- Brute-force (inefficient for large trees/strings).
- Length-guided tree traversal (optimal for both time and space).

### Corner cases to consider  
- k is exactly at the leaf boundary.
- k points into rightmost leaf.
- All internal nodes except one child (degenerate tree).  
- k out-of-bounds (invalid k).
- Empty rope (root is None).
- Single character leaf.

### Solution

```python
# RopeTreeNode class is assumed provided, with fields:
#   val : str      # string at leaf, empty for internal
#   len : int      # total length of string for subtree rooted here
#   left : RopeTreeNode or None
#   right : RopeTreeNode or None

def getKthCharacter(root, k):
    # Traverse down the rope based on left subtree lengths
    node = root
    while node:
        # If leaf node: node.len == 0 and node.val is non-empty
        if node.len == 0:
            # Return kᵗʰ char (1-based index)
            return node.val[k-1]
        
        # Internal node: left or/and right must exist
        left_len = node.left.len if node.left else 0  # left can be None
        if k <= left_len:
            node = node.left
        else:
            k -= left_len
            node = node.right
    # If k is invalid, the function could return an error/raise Exception
    raise IndexError('k is out of bounds')
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(h), where h = height of rope tree.  
  - Each descent uses rope's len info to skip whole subtrees; no substrings or string concatenations.

- **Space Complexity:**  
  - O(1) iterative version (O(h) recursive version: call stack).
  - No extra storage used for strings; storage only required for a few integer pointers.
  

### Potential follow-up questions (as if you’re the interviewer)  

- How do you extend this to support efficiently updating (insert/delete) a character at position k?  
  *Hint: Rope trees support split/concat in O(log n) with parent pointers and weight-balanced nodes.*

- What if a node can have more than two children?  
  *Hint: Generalize the len-accumulation logic to N-ary, and binary search which child holds the position.*

- How could you implement an iterator over all characters in Rope tree without flatting to a string?  
  *Hint: Use stack-based DFS to walk all leaf nodes and yield characters in order.*

### Summary
This problem uses the **length-augmented tree traversal** pattern: at each node, use subtree metrics to guide the search for the kᵗʰ character, avoiding full string construction.  
This is a classic Rope problem: ropes are used in text editors for fast split/merge/index.  
The core technique (descend left/right based on cumulative counts) applies to many range query problems on trees, e.g. order statistics in BSTs, Kᵗʰ smallest in segment trees, etc.


### Flashcard
Navigate tree by comparing k with left subtree length at each node: if k ≤ left.len descend left, else subtract left.len from k and descend right, until reaching leaf node where val[k−1] is the answer.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
