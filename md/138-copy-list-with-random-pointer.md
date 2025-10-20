### Leetcode 138 (Medium): Copy List with Random Pointer [Practice](https://leetcode.com/problems/copy-list-with-random-pointer)

### Description  
Given a singly-linked list, where each node contains not only a `next` pointer but also a `random` pointer that could point to any node in the list (or null), create a **deep copy** of the list. The copied list must consist of brand new nodes such that both `next` and `random` pointers in the original list are correctly replicated, but the new nodes do not refer to any node from the original list.  

### Examples  

**Example 1:**  
Input: `head = [[7,null],[13,0],[11,4],[10,2],[1,0]]`  
Output: `[[7,null],[13,0],[11,4],[10,2],[1,0]]`  
*Explanation:  
The original list is:*

```
7 -> 13 -> 11 -> 10 -> 1
|    |     |     |    |
n    7     1     11   7
```
*(`null`, 7 means random pointer for that node points to node with value 7, etc.)  
A deep copy of the list is made, with new nodes replicating the same sequence and `random` links.*

**Example 2:**  
Input: `head = [[1,1],[2,1]]`  
Output: `[[1,1],[2,1]]`  
*Explanation:  
List: 1 -> 2; both random pointers go to node with value 2 (second node)*

**Example 3:**  
Input: `head = []`  
Output: `[]`  
*Explanation:  
The list is empty; output is also an empty list.*

### Thought Process (as if you’re the interviewee)  
Start with brute force:  
- The key challenge is replicating both `next` and `random` pointers using only information from the original nodes.  
- The brute-force idea is to create a copy of each node and use a hash map to record the mapping: original node ⟶ cloned node. First pass: clone all nodes and wire up `next`. Second pass: wire up the `random` using the hash map.

Optimize space:  
- An in-place O(1) space approach is possible:  
  1. Interleave new (copy) nodes with originals (so each original node is followed by its copy).  
  2. Set the `random` pointer of each copy, using the fact that the original's copy is right after it.  
  3. Detach the copy list from the original.  
- This avoids extra hash map storage.

Choose the in-place method for interviews to minimize space while maintaining O(n) time.

**Trade-offs:**  
- The hash map (dictionary) approach is easier to write/debug, but uses O(n) extra space.  
- The in-place method is a bit trickier, but is optimal for both time and space.

### Corner cases to consider  
- Empty list (`head` is `None`)
- List with only one node, pointing random to itself
- All random pointers are `None`
- All random pointers point to head
- Random pointers form a cycle
- All node values are the same (test address identity, not value only)
- List where random pointers are arbitrary (not sequential)

### Solution

```python
# Definition for a Node.
class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random

class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        if head is None:
            return None

        # Step 1: Interleave copied nodes with original nodes
        current = head
        while current:
            # Create a new node and insert it after current
            copy = Node(current.val, current.next)
            current.next = copy
            current = copy.next

        # Step 2: Set the random pointers for the copied nodes
        current = head
        while current:
            if current.random:
                # The cloned node's random is the clone of current.random
                current.next.random = current.random.next
            current = current.next.next

        # Step 3: Separate the copied list from the original
        dummy = Node(0)
        copy_current = dummy
        current = head
        while current:
            # Extract the copied node
            copy = current.next
            copy_current.next = copy
            copy_current = copy

            # Restore original 'next'
            current.next = copy.next
            current = current.next

        return dummy.next
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we traverse the original list three times, and each pass does O(1) work per node.
- **Space Complexity:** O(1) *auxiliary*, not counting the space for the returned copy. (The copy nodes themselves are required for output, so that’s not auxiliary.) No hash maps are created.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the list is very long? Can you do it in parallel?  
  *Hint: Explore splitting and merging based on segments, with careful `random` wiring.*

- Can you handle an immutable list (cannot modify original nodes at all)?  
  *Hint: Only the O(n) hash map approach works.*

- How would you copy a binary tree with random pointers?  
  *Hint: Adapt this algorithm for trees by traversing nodes (DFS/BFS) and mapping originals to copies.*

### Summary
This problem is a classic **linked list deep copy** task, where extra (random) pointers increase complexity. The in-place interleaving solution is a space-optimized pointer manipulation trick frequently applicable in *copying complex data structures with random connections*, and variants of it often appear with trees or graphs. It’s a common interview pattern showcasing pointer manipulation and two-pass or three-pass approaches, and appears across many Leetcode “copy a structure with random/back/other” pointer problems.


### Flashcard
Interleave copied nodes with originals, set random pointers in a second pass, then split the lists to restore original and extract the copy.

### Tags
Hash Table(#hash-table), Linked List(#linked-list)

### Similar Problems
- Clone Graph(clone-graph) (Medium)
- Clone Binary Tree With Random Pointer(clone-binary-tree-with-random-pointer) (Medium)
- Clone N-ary Tree(clone-n-ary-tree) (Medium)