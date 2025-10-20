### Leetcode 1104 (Medium): Path In Zigzag Labelled Binary Tree [Practice](https://leetcode.com/problems/path-in-zigzag-labelled-binary-tree)

### Description  
Given a label corresponding to a node in a special binary tree, return the path (as a list of labels) from the root (label 1) to that node, **inclusive**.

- The tree is a perfect infinite binary tree where:
    - Nodes are labeled in level order.
    - Odd-numbered levels are labeled left to right, even-numbered levels are labeled right to left (creating a "zigzag" labeling).
- Example:  
  - Level 1:       1  
  - Level 2:     3   2  
  - Level 3:   4  5  6  7  
  - Level 4: 15 14 13 12 11 10 9 8
  
The main challenge: labels in each level may not match a regular tree traversal, due to alternating order. You must compute the parent for any node, considering how its label is zigzagged at its level.

### Examples  

**Example 1:**  
Input: `label = 14`  
Output: `[1, 3, 4, 14]`  
*Explanation: The path from root to node 14 is:  
Level 1: 1  
Level 2: 3 (since Level 2 is right to left)  
Level 3: 4  
Level 4: 14 (Level 4 is right to left; 14 is the second value from left in this reverse ordering)*

**Example 2:**  
Input: `label = 26`  
Output: `[1, 2, 6, 10, 26]`  
*Explanation:  
Level 1: 1  
Level 2: 2 (Level 2 is right to left)  
Level 3: 6  
Level 4: 10  
Level 5: 26 (Level 5 is left to right)*

**Example 3:**  
Input: `label = 1`  
Output: `[1]`  
*Explanation: Root node, so path is just root itself.*

### Thought Process (as if you’re the interviewee)  
- Brute force:  
    - Construct the actual tree or mapping for each level and parent relations. This is inefficient for large input.
- Optimized idea:  
    - Realize the pattern:
        - Each level ℓ has nodes in range [2⁽ˡ⁻¹⁾, 2ˡ-1]. Even levels are labeled in reverse within their range.
    - To find the parent for any node:
        - "Unzigzag" the label to recover its "normal" value as if the level were labeled left->right (by inverting the label within its level range).
        - Compute its parent as usual (`label // 2`), but at the *previous* level.
        - If needed at a reversed level, "zigzag" by flipping again.
    - Build the path backwards (from label to root), insert each computed label, and finally reverse the result.

### Corner cases to consider  
- label is 1 (just the root)
- Smallest possible tree (label = 2)
- Even and odd levels, testing both left and right
- Very large label (maximum input size)
- Node at the leftmost or rightmost position of a level

### Solution

```python
def pathInZigZagTree(label: int):
    # Helper to find the level/depth of a label
    level = 0
    node = label
    while node:
        level += 1
        node //= 2
        
    path = [0] * level
    curr = label
    for i in range(level - 1, -1, -1):
        path[i] = curr
        # Find the actual start/end of the current level
        start = 2 ** i
        end = 2 ** (i + 1) - 1
        # For zigzag levels (even depth, 0-based), compute mirrored label
        if i % 2 == 1:
            curr = start + end - curr
        # Parent of the mirrored value (in normal binary tree)
        curr //= 2
        # If next parent is on an even level again, transform as needed in next iteration
    return path
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log label)  
  The main loop iterates once per level of the tree, which grows as log₂(label).
  
- **Space Complexity:** O(log label)  
  The path array must store up to the depth of the tree (again, log₂(label)).


### Potential follow-up questions (as if you’re the interviewer)  

- How would the solution change if the tree were not perfect (i.e., some nodes are missing)?
  *Hint: Parent/child structural relations may require tree pointers, not just math.*

- What if you wanted the path from any node to any other?
  *Hint: Compute paths to root for both, then align their ancestors.*

- Can you do this without the extra path array?
  *Hint: Print/output the values on the fly in reverse order or use recursion to avoid explicit storage.*

### Summary
This problem uses math properties of complete binary trees and alternating level orders to efficiently find a path back to the root. The main trick is mirroring the label within its level when the level is reversed, then standard binary tree logic finds parents. This “reverse level order” trick is a useful technique for binary tree label manipulations, especially when tree structure follows regular mathematical patterns. It's a problem that strengthens skills in math-based tree traversal and level indexing.


### Flashcard
Find level of label, compute "unzigzagged" position using range inversion on odd levels, then divide by 2 repeatedly to trace path to root.

### Tags
Math(#math), Tree(#tree), Binary Tree(#binary-tree)

### Similar Problems
- Cycle Length Queries in a Tree(cycle-length-queries-in-a-tree) (Hard)