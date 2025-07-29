### Leetcode 1586 (Medium): Binary Search Tree Iterator II [Practice](https://leetcode.com/problems/binary-search-tree-iterator-ii)

### Description  
You are given a **binary search tree (BST)**. Implement an iterator class BSTIterator that supports in-order traversal with two primary operations:
- `next()` returns the next smallest element (in BST order).
- `prev()` returns the previous element (stepping back in the in-order sequence).
The iterator should also support `hasNext()` (whether a next element exists) and `hasPrev()` (whether a previous exists).  
The iterator must efficiently support both moving forward and backward in the in-order traversal, as if stepping through an array of the BST's values.

### Examples  

**Example 1:**  
Input: Initialize with root of BST ```[7, 3, 15, null, null, 9, 20]```, call operations:  
`next()`, `next()`, `prev()`, `next()`, `next()`, `hasNext()`, `next()`  
Output:  
`3, 7, 3, 7, 9, True, 15`  
*Explanation:  
In-order is [3, 7, 9, 15, 20].  
next() → 3  
next() → 7  
prev() → 3 (goes back to 3)  
next() → 7  
next() → 9  
hasNext() → True (there is 15 left)  
next() → 15*

**Example 2:**  
Input: Call sequence: `next()`, `next()`, `prev()`, `hasPrev()`, `prev()`, `hasPrev()`  
Output:  
`3, 7, 3, False, <<Exception or handled error>>, False`  
*Explanation:  
prev() at the start (after only one next) should either return an error or a special value. hasPrev() correctly returns False then True as expected.*

**Example 3:**  
Input: Tree =  
```
   5
  / \
 3   8
/
1
```
Sequence: `next()`, `next()`, `next()`, `prev()`, `prev()`, `hasNext()`  
Output:  
`1, 3, 5, 3, 1, True`  
*Explanation:  
In-order is [1, 3, 5, 8].  
next() → 1  
next() → 3  
next() → 5  
prev() → 3  
prev() → 1  
hasNext() → True (still can visit 8)*

### Thought Process (as if you’re the interviewee)  
- The brute-force solution is to do an in-order traversal and store all values in an array. Each `next()`/`prev()` is just moving an index in this array.
- This approach is easy but uses O(n) space to store the full traversal.
- An optimized approach is to do “lazy” traversal — use a stack as in classic BST iterators, extend it to allow backward traversal (keeping track of previous visited nodes).
- Tradeoff: The full array solution gives constant-time next/prev, but O(n) space. A lazy approach reduces space to O(h), but makes prev() more complex and possibly O(h) time.

### Corner cases to consider  
- Empty tree (root is None)
- Only one node BST
- Operations called at ends of the traversal (`prev()` at the first element, `next()` at the last)
- Repeated calls to `prev()` or `next()` beyond bounds
- Tree with duplicate values (if allowed)
- Highly unbalanced BST

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class BSTIterator:
    def __init__(self, root: TreeNode):
        # In-order traversal to store all values in an array
        self.values = []
        self._inorder(root)
        self.index = -1  # This will point to the "virtual" cursor position

    def _inorder(self, node):
        if node is None:
            return
        self._inorder(node.left)
        self.values.append(node.val)
        self._inorder(node.right)

    def hasNext(self) -> bool:
        # There is a next element if index < len(values) - 1
        return self.index < len(self.values) - 1

    def next(self) -> int:
        # Move forward and return the next element
        if self.hasNext():
            self.index += 1
            return self.values[self.index]
        raise Exception("No next element.")

    def hasPrev(self) -> bool:
        # There is a previous element if index > 0
        return self.index > 0

    def prev(self) -> int:
        # Move backward and return the prev element
        if self.hasPrev():
            self.index -= 1
            return self.values[self.index]
        raise Exception("No previous element.")
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Initialization: O(n), where n is the number of nodes (for the in-order traversal).
  - `next()`, `prev()`, `hasNext()`, `hasPrev()`: O(1) per operation (just incrementing/decrementing index and array lookup).

- **Space Complexity:**  
  - O(n), to store the in-order traversal of the BST in the array `values`.

### Potential follow-up questions (as if you’re the interviewer)  

- Can we reduce space usage to O(h) instead of O(n), where h is the height of the tree?  
  *Hint: Use a stack and only keep necessary traversal state, not the full list.*

- How would the API change if we required adding/removing elements in the BST while iterating?  
  *Hint: Discuss iterator invalidation and concurrent modification handling.*

- How would you implement the same interface if the tree were very large or even infinite in one direction?  
  *Hint: Lazy generation, only store/traverse as needed, never materialize full list.*

### Summary
The array-based BST iterator is a classic **iterator + traversal** pattern.  
It provides fast forward/back stepping via index within an in-order array, trading off O(n) space for O(1) next/prev time.  
This pattern is common in problems where forward/back traversal is needed; the approach can be adapted to linked lists, array-based trees, or pre/post/in-order traversals for trees.  
For strict O(h) space, a stack-based lazy iterator is the standard advanced follow-up.