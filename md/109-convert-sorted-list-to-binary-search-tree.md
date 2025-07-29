### Leetcode 109 (Medium): Convert Sorted List to Binary Search Tree [Practice](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree)

### Description  
Given a singly linked list where the elements are sorted in ascending order, convert it into a height-balanced binary search tree (BST).  
A height-balanced BST is one where the depth of the two subtrees of every node never differs by more than one. The resulting tree must also maintain in-order traversal as the original list order.

### Examples  

**Example 1:**  
Input: `head = [-10, -3, 0, 5, 9]`  
Output:  
```
      0
     / \
   -3   9
   /   /
-10   5
```
Explanation:  
The middle of the list is 0; left side forms left subtree, right forms right subtree.  
(Tree representation: [0,-3,9,-10,null,5])

**Example 2:**  
Input: `head = []`  
Output: `null`  
Explanation:  
Empty list → the tree is empty.

**Example 3:**  
Input: `head = [1,2]`  
Output:  
```
  2
 /
1
```
Explanation:  
2 is the middle, 1 left of 2.
(Tree representation: [2,1])

### Thought Process (as if you’re the interviewee)  
Start with the brute-force idea:
- Since the list is sorted, the in-order traversal of the BST should match the list order.
- To build a balanced BST, we need to pick the middle node as the root, recursively.
- Finding the middle in a singly linked list is O(n), and we have to do it at each level; this results in O(n log n) time.

Optimize:
- Since finding the middle repeatedly is inefficient, we can convert the linked list to an array (O(n)), which allows O(1) access for forming the BST recursively in O(n) time. But this uses O(n) extra space.

Best possible (O(n) time, O(log n) space):
- Simulate in-order traversal using recursion:
  - First, get the length of the list.
  - Use a recursive function that builds the left subtree for ⌊n/2⌋ nodes,
  - Then uses the current head as the root, advances the pointer,
  - Then builds the right subtree from the remaining nodes.
- This method never splits the list or creates extra arrays and uses only O(log n) recursion space.

### Corner cases to consider  
- Empty list (`head = None`).
- List with one node.
- List with two nodes.
- List with all elements equal.
- Very long lists (check for stack overflow / efficiency).

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def sortedListToBST(head):
    # First, compute the length of the linked list
    def get_length(node):
        count = 0
        while node:
            count += 1
            node = node.next
        return count

    # Main recursive function for in-order simulation
    def build_BST(left, right):
        nonlocal head  # Reference shared head across recursion
        if left > right:
            return None

        mid = (left + right) // 2

        # First, build the left PSTree
        left_child = build_BST(left, mid - 1)

        # Now, the head is at mid: it becomes the root
        root = TreeNode(head.val)
        root.left = left_child

        # Advance head
        head = head.next

        # Build right subtree
        root.right = build_BST(mid + 1, right)
        return root

    size = get_length(head)
    return build_BST(0, size - 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since each node is processed exactly once in the recursive in-order traversal.
- **Space Complexity:** O(log n), due to recursion stack for the balanced tree. No extra data structure is needed beyond the tree itself and recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if the list were a doubly linked list?  
  *Hint: Can you optimize finding middle?*

- If the input was an array instead of a list, how would you proceed?  
  *Hint: Indexing allows simpler recursion.*

- Can you return the result as a different kind of tree (AVL, Red-Black) structure?  
  *Hint: What tree properties need to be maintained?*

### Summary
This problem uses the **in-order traversal simulation** pattern to build a height-balanced BST directly from a sorted linked list, avoiding conversion to an array. It’s a classic recursive tree-building interview question and solidifies the pattern of “convert sorted structure to BST,” useful for trees and divide & conquer scenarios.