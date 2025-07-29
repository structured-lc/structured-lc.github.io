### Leetcode 1367 (Medium): Linked List in Binary Tree [Practice](https://leetcode.com/problems/linked-list-in-binary-tree)

### Description  
Given a singly linked list and a binary tree, determine if the sequence of values in the linked list exists as a **downward path** in the binary tree.  
A downward path starts at any node in the tree and continues only to children (either left or right) without going back upward. The path doesn't have to start at the root or reach a leaf; any path downward starting from any node counts.

### Examples  

**Example 1:**  
Input:  
Linked List = `[4,2,8]`  
Binary Tree =  
```
      1
     / \
    4   4
   /   / \
  2   2   1
 /   /
1   6
   /
  8
```
Output: `True`  
*Explanation: The path 4→2→8 (from the left subtree) matches the linked list.*

**Example 2:**  
Input:  
Linked List = `[1,4,2,6]`  
Binary Tree =  
```
      1
     / \
    4   4
   /   / \
  2   2   1
 /   /
1   6
   /
  8
```
Output: `True`  
*Explanation: The path 1→4→2→6 (on the leftmost branch) matches the linked list.*

**Example 3:**  
Input:  
Linked List = `[1,4,2,6,8]`  
Binary Tree =  
```
      1
     / \
    4   4
   /   / \
  2   2   1
 /   /
1   6
   /
  8
```
Output: `False`  
*Explanation: No downward path in the tree matches all five linked list values.*

### Thought Process (as if you’re the interviewee)  
First, recognize that every node in the binary tree could be a potential starting point for the path.  
At each node, you want to see if you can "walk" down the linked list and match the path downward in the tree, moving to either the left or right child.  
A brute-force approach would be:
- For every node in the tree, initiate a matching process to check if it can be the starting point of the linked list path.
- For the matching process, use recursion: at each step, compare the current tree node value to the current linked list node value. If they match, move to the next node in both the list and the tree (either left or right).
- You must try every node in the tree as a potential starting point.

This approach is acceptable since the time complexity is reasonable for interview constraints.  
- It's essentially: for every node in the tree, try to walk the linked list starting from that node (DFS from every node).

Alternatives:
- Optimize with KMP preprocessing for the pattern (linked list) for very large data, but that's typically not needed and is more complex.

### Corner cases to consider  
- The linked list is empty: should always return True.
- The binary tree is empty: return True only if the linked list is also empty, else False.
- No node in the tree matches the head of the list.
- Duplicates in the list or tree.
- The matching path "branches" but is not continuous downward.
- The path needs to start mid-tree, not at the root.
- The linked list is longer than any tree path.

### Solution

```python
# Assume class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
# and class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def isSubPath(head, root):
    # Base case: If list is empty, we've matched everything
    if not head:
        return True
    # If tree is empty but list is not, cannot match
    if not root:
        return False

    # Check if match starts from current root or recurse on subtrees
    return (
        match_from_node(head, root) or
        isSubPath(head, root.left) or
        isSubPath(head, root.right)
    )

def match_from_node(head, node):
    # If we finish the list, success
    if not head:
        return True
    # If reach null in tree or values differ, fail
    if not node or node.val != head.val:
        return False
    # Try to match continuing down either left or right child
    return (
        match_from_node(head.next, node.left) or
        match_from_node(head.next, node.right)
    )
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N \* M), where N = number of tree nodes and M = length of the linked list.  
  For each node in the tree, you may potentially traverse up to the whole list in the worst case.

- **Space Complexity:** O(M) for the recursion stack (when matching the list), and O(H) for normal DFS on the tree (H = tree height).  
  Total stack usage in the worst case is O(M + H).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if the pattern (linked list) is very long or must be matched against many trees?
  *Hint: Preprocess the linked list into a KMP failure table to avoid redundant matching.*

- Can you make your solution iterative instead of recursive for environments with a small call stack?
  *Hint: Use explicit stacks for both tree and list traversal instead of function calls.*

- What changes if the tree is not binary (e.g., N-ary tree)?
  *Hint: Adjust recursion to iterate all child nodes at each step.*

### Summary
This is a classic DFS/backtracking tree path search pattern: for every tree node, attempt a downward matching against an ordered pattern (the linked list).  
This coding pattern commonly arises in substring/pattern matching problems, and can be optimized or adapted to other graph and tree path sequence matching scenarios.  
No special data structures are required—just recursion and careful use of base cases.