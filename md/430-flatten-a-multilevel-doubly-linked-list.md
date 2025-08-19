### Leetcode 430 (Medium): Flatten a Multilevel Doubly Linked List [Practice](https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list)

### Description  
You are given a doubly linked list, which contains nodes that have a next pointer, a previous pointer, and an additional child pointer. This child pointer may or may not point to a separate doubly linked list, also containing these special nodes. These child lists may have one or more children of their own, and so on.

Return the list after flattening it. The nodes in the flattened list should be in the same order as a depth-first traversal of the multilevel linked list.

### Examples  

**Example 1:**  
Input: `head = [1,2,3,7,8,11,9,10,4,5,6]` (multilevel structure)  
Output: `[1,2,3,7,8,11,9,10,4,5,6]` (flattened)  
*Explanation: The multilevel structure is flattened into a single-level doubly linked list.*

**Example 2:**  
Input: `head = [1,2,null,3]`  
Output: `[1,2,3]`  

**Example 3:**  
Input: `head = []`  
Output: `[]`  

### Thought Process (as if you're the interviewee)  
This problem involves flattening a multilevel doubly linked list using depth-first traversal. When we encounter a node with a child, we need to:

1. Save the current path (next pointer)
2. Go deep into the child branch first
3. Return to the saved path after processing the child branch

Approaches:
1. **Recursive DFS**: Process child branches recursively
2. **Iterative with stack**: Use a stack to save continuation points
3. **In-place modification**: Modify pointers as we traverse

The key insight is that this follows a DFS pattern where child branches have priority over next siblings.

### Corner cases to consider  
- Empty list
- Single node without children
- Multiple levels of nesting
- Child at the last node
- Multiple children at different levels
- No children in the entire list

### Solution

```python
# Definition for a Node
class Node:
    def __init__(self, val, prev, next, child):
        self.val = val
        self.prev = prev
        self.next = next
        self.child = child

def flatten(head):
    if not head:
        return head
    
    def dfs(node):
        # Return the tail of current branch
        current = node
        tail = None
        
        while current:
            next_node = current.next
            
            # If current node has a child
            if current.child:
                # Get the tail of child branch
                child_tail = dfs(current.child)
                
                # Connect current node to child
                current.next = current.child
                current.child.prev = current
                
                # Connect child tail to original next node
                if next_node:
                    child_tail.next = next_node
                    next_node.prev = child_tail
                
                # Clear the child pointer
                current.child = None
                
                # Update tail
                tail = child_tail
            else:
                tail = current
            
            current = next_node
        
        return tail
    
    dfs(head)
    return head

# Iterative approach using stack
def flattenIterative(head):
    if not head:
        return head
    
    stack = []
    current = head
    
    while current:
        if current.child:
            # If there's a next node, save it for later
            if current.next:
                stack.append(current.next)
            
            # Connect current to child
            current.next = current.child
            current.child.prev = current
            current.child = None
        
        # If we reach end of current branch and have saved nodes
        if not current.next and stack:
            next_node = stack.pop()
            current.next = next_node
            next_node.prev = current
        
        current = current.next
    
    return head

# Alternative recursive approach
def flattenRecursive(head):
    def flatten_dfs(node):
        if not node:
            return None
        
        # Find the last node in current level
        last = node
        while last.next:
            last = last.next
        
        # Process each node and handle children
        current = node
        while current:
            if current.child:
                # Save the next node
                next_node = current.next
                
                # Connect to child
                current.next = current.child
                current.child.prev = current
                
                # Find tail of child branch
                child_tail = flatten_dfs(current.child)
                current.child = None
                
                # Connect child tail to saved next node
                if next_node:
                    child_tail.next = next_node
                    next_node.prev = child_tail
                else:
                    last = child_tail
            
            current = current.next
        
        return last
    
    if head:
        flatten_dfs(head)
    return head

# Clean iterative solution
def flattenClean(head):
    if not head:
        return head
    
    current = head
    
    while current:
        # If no child, move to next
        if not current.child:
            current = current.next
            continue
        
        # Save the next node
        next_node = current.next
        
        # Connect current to child
        current.next = current.child
        current.child.prev = current
        current.child = None
        
        # Find the tail of child branch
        child_tail = current.next
        while child_tail.next:
            child_tail = child_tail.next
        
        # Connect child tail to saved next node
        if next_node:
            child_tail.next = next_node
            next_node.prev = child_tail
        
        current = current.next
    
    return head
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) where n is the total number of nodes. Each node is visited exactly once.
- **Space Complexity:** O(d) where d is the maximum depth of nesting (for recursion stack or explicit stack). In worst case, O(n).

### Potential follow-up questions (as if you're the interviewer)  

- How would you restore the original multilevel structure from a flattened list?  
  *Hint: You'd need to store additional information about where child branches start and end.*

- What if the list had cycles? How would you detect and handle them?  
  *Hint: Use visited set or modify the traversal to detect cycles.*

- Can you flatten the list in breadth-first order instead of depth-first?  
  *Hint: Use a queue instead of stack to process child branches level by level.*

- How would you handle the case where child pointers could point to nodes already in the main chain?  
  *Hint: This would create a more complex graph structure requiring careful cycle detection.*

### Summary
This problem demonstrates the application of DFS traversal to linked list structures. The key insight is recognizing that child branches should be processed immediately (depth-first), requiring us to save continuation points and handle pointer manipulation carefully. The solution showcases both recursive and iterative approaches to tree/graph traversal patterns applied to linked list data structures, emphasizing the importance of proper pointer management in doubly linked lists.

### Tags
Linked List(#linked-list), Depth-First Search(#depth-first-search), Doubly-Linked List(#doubly-linked-list)

### Similar Problems
- Flatten Binary Tree to Linked List(flatten-binary-tree-to-linked-list) (Medium)
- Correct a Binary Tree(correct-a-binary-tree) (Medium)