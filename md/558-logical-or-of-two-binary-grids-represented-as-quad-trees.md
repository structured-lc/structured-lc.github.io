### Leetcode 558 (Medium): Logical OR of Two Binary Grids Represented as Quad-Trees [Practice](https://leetcode.com/problems/logical-or-of-two-binary-grids-represented-as-quad-trees)

### Description  
Given two **n × n** binary grids (matrices), each represented as a **quad-tree** (a recursive tree structure, where each leaf node represents a uniform sub-grid of all 0s or all 1s), combine them into a new quad-tree that represents the logical **OR** of the input grids.  
- Each node has:  
  - `isLeaf`: whether all values underneath are the same (so this is a leaf node).
  - `val`: the value in the region (True for 1, False for 0) if it’s a leaf.
- If both input nodes are leaves, the result is just the OR of their values.
- If one subtree is a leaf node, apply the OR operation to each quadrant between the leaf and the matching quadrant of the other tree.
- If neither is a leaf, recurse for all four quadrants.

### Examples  

**Example 1:**  
Input:  
quadTree1:
```
      [1, 0]
     /  |  |   \
 [1,1][1,1][1,0][1,0]
```
quadTree2:  
```
      [1, 1]
```
Output:  
```
      [1, 1]
```
*Explanation: Tree 1 represents all 1s on the left quadrants, all 0s on right; tree 2 is all 1s. So output is all 1s.*

**Example 2:**  
Input:  
quadTree1:
```
      [1, 0]
     /  |  |   \
 [1,1][1,1][1,0][1,0]
```
quadTree2:
```
      [1, 0]
     /  |   |    \
 [1,0][1,0][1,1][1,1]
```
Output:
```
      [0, 0]
     /  |   |    \
 [1,1][1,1][1,1][1,1]
```
*Explanation: Both are divided, so take OR for each quadrant; each quadrant’s OR results in all 1s, so output tree is all 1s (could be collapsed to a single leaf [1,1]).*

**Example 3:**  
Input:  
quadTree1: `[1, 0]` (leaf 0, full grid is 0)  
quadTree2:
```
      [1, 0]
     /  |   |    \
 [1,1][1,0][1,0][1,0]
```
Output:
```
      [1, 0]
     /  |   |    \
 [1,1][1,0][1,0][1,0]
```
*Explanation: The OR of all 0’s with another structure always returns the structure of the non-zero tree.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - Convert both quad-trees back to grids, OR each cell, then rebuild quad-tree.  
  - This is simple, but reconstructing and traversing n × n grids is inefficient for large or sparse trees.
- **Optimize:**  
  - Leverage quad-tree structure & recursion:  
    - If either subtree is a leaf with value 1, result is a leaf node with value 1 (since 1 OR anything = 1).
    - If both are leaves (all values equal), result is a leaf with value = tree1.val OR tree2.val.
    - If neither is a leaf and neither is a “1 leaf,” recursively compute each quadrant (topLeft, topRight, bottomLeft, bottomRight).
    - After merging, check: if all 4 children are leaves and their values are all equal, collapse node to a single leaf.
  - This way, we never have to build the entire matrix.

### Corner cases to consider  
- Both trees are a single leaf (minimal case).
- One tree is all 0s, so the result matches the other.
- One tree is all 1s, so the result is all 1s.
- Trees with mismatched depths (one subdivides some parts, the other not).
- After recursion, possibility to collapse four identical children into a single node.

### Solution

```python
# Definition for a QuadTree node.
class Node:
    def __init__(self, val, isLeaf, topLeft=None, topRight=None, bottomLeft=None, bottomRight=None):
        self.val = val            # True(1) or False(0)
        self.isLeaf = isLeaf      # True if this node is a leaf
        self.topLeft = topLeft    # type: Node
        self.topRight = topRight
        self.bottomLeft = bottomLeft
        self.bottomRight = bottomRight

def intersect(quadTree1: Node, quadTree2: Node) -> Node:
    # If one is leaf and its value is 1, always return this node.
    if quadTree1.isLeaf:
        if quadTree1.val:
            return Node(True, True)
        else:
            return quadTree2
    if quadTree2.isLeaf:
        if quadTree2.val:
            return Node(True, True)
        else:
            return quadTree1

    # Recursive merge of four children
    topLeft = intersect(quadTree1.topLeft, quadTree2.topLeft)
    topRight = intersect(quadTree1.topRight, quadTree2.topRight)
    bottomLeft = intersect(quadTree1.bottomLeft, quadTree2.bottomLeft)
    bottomRight = intersect(quadTree1.bottomRight, quadTree2.bottomRight)

    # After recursion, if all four children are leaves with same value, flatten
    if (topLeft.isLeaf and topRight.isLeaf and
        bottomLeft.isLeaf and bottomRight.isLeaf and
        topLeft.val == topRight.val == bottomLeft.val == bottomRight.val):
        return Node(topLeft.val, True)
    else:
        return Node(False, False, topLeft, topRight, bottomLeft, bottomRight)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Worst-case O(N²): For a grid of size n × n (represented in full as quad-tree leaves), we might visit all O(N²) leaves.  
  - In practice, efficiency is much better if the quad-trees are shallow (due to large uniform regions).

- **Space Complexity:**  
  - Recursive stack can go as deep as O(log N) for balanced quad-trees; O(N²) in the worst, degenerate case.
  - New tree can have up to O(N²) nodes; but often is much smaller if many regions are uniform.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want **AND** instead of OR?
  *Hint: Carefully adjust the base cases where a “0” in one acts as identity for AND.*

- Can you generalize for arbitrary boolean operations?
  *Hint: Accept the operation as a function parameter and handle base cases accordingly.*

- How does this structure help for very large, sparse matrices?
  *Hint: Quad-trees are efficient for sparse regions, representing large blocks uniformly; so saves memory and time.*

### Summary
This is a classic **divide and conquer** recursion problem that exploits the compactness of quad-trees for uniform regions.  
The key is correctly handling leaf cases and merging children, and recognizing when we can collapse internal nodes to leaves. This coding pattern generalizes to many problems involving recursive merging of spatial or hierarchical data structures.  
The recursive structure is common in quad-tree/octree merging, compressing, and logical operations over spatial indexes.


### Flashcard
Recursively merge quad-trees; if either node is a leaf with value 1, result is a leaf 1; otherwise, merge children and collapse if all are leaves with the same value.

### Tags
Divide and Conquer(#divide-and-conquer), Tree(#tree)

### Similar Problems
