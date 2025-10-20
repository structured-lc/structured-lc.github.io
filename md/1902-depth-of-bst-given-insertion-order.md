### Leetcode 1902 (Medium): Depth of BST Given Insertion Order [Practice](https://leetcode.com/problems/depth-of-bst-given-insertion-order)

### Description  
Given an array `order` of length n, which is a permutation of integers from 1 to n, insert the elements into a binary search tree in the given order.  
Your task is to **find the depth of the resulting BST**.  
The **depth** is the number of nodes along the longest path from the root node down to a leaf.

When each number is inserted, it becomes the left or right child of a previously inserted node, depending on the BST rules (left < parent, right > parent).  
After all numbers are inserted, output the final **depth** of the tree.

---

### Examples  

**Example 1:**  
Input: `order = [2,1,3]`  
Output: `2`  
*Explanation:*

```
Tree formation
Insert 2: root
Insert 1: left child of 2
Insert 3: right child of 2

    2
   / \
  1   3

Depth = 2 (2 → 1 or 2 → 3)
```

**Example 2:**  
Input: `order = [3,2,1]`  
Output: `3`  
*Explanation:*

```
Insert 3: root
Insert 2: left child of 3
Insert 1: left child of 2

    3
   /
  2
 /
1

Depth = 3 (3 → 2 → 1)
```

**Example 3:**  
Input: `order = [1,2,3,4,5]`  
Output: `5`  
*Explanation:*

```
Insert 1: root
Insert 2: right child of 1
Insert 3: right child of 2
Insert 4: right child of 3
Insert 5: right child of 4

    1
     \
      2
       \
        3
         \
          4
           \
            5

Depth = 5 (1 → 2 → 3 → 4 → 5)
```

---

### Thought Process (as if you’re the interviewee)  

Let’s break down the problem:

- **Naive approach:**  
  Simulate the actual BST construction for each insertion. For each number, compare and move left/right until you find the insertion point, maintaining depth as you go. But this is \(O(n^2)\) time since searching for each insertion could take O(n) in the worst case (skewed tree).

- **Optimized idea:**  
  Instead of building the whole tree, track **the depth of each insertion via predecessors and successors**.  
  For each node, its depth is **1 + max(depth of predecessor, depth of successor)**, where:
    - Predecessor: largest element less than the node, already inserted
    - Successor: smallest element greater than the node, already inserted

  Use a self-balancing search structure (like a TreeMap or SortedDict) to efficiently find predecessors/successors and store their depths.

- **Implementation:**  
  - Insert nodes one by one.
  - For each node v:
      - Find the depth of its predecessor and successor (which are always less/greater already inserted numbers).
      - Its depth = 1 + max(depth of predecessor, depth of successor).
  - Track the max depth as you build.

  This is **O(n log n)** time since each insert/search is log n, and there are n inserts.

---

### Corner cases to consider  
- Single element in `order` (should return 1).
- Strictly increasing (completely right-skewed tree).
- Strictly decreasing (completely left-skewed tree).
- Random permutation.
- Large n (test for performance).
- Only 2 elements.
- Insertion order that makes a balanced tree.

---

### Solution

```python
# We avoid built-in libraries for shortcuts, as in real interviews.

class TreeMap:
    # Simple BST map supporting find predecessor/successor
    def __init__(self):
        self.data = {}

    def insert(self, k, v):
        self.data[k] = v

    def keys(self):
        return sorted(self.data.keys())

    def predecessor(self, k):
        # Find largest key < k
        keys = self.keys()
        pred = None
        for x in keys:
            if x < k:
                pred = x
            else:
                break
        return pred

    def successor(self, k):
        # Find smallest key > k
        keys = self.keys()
        for x in keys:
            if x > k:
                return x
        return None

    def get(self, k):
        return self.data.get(k, 0)


def maxDepthBST(order):
    tm = TreeMap()
    n = len(order)
    tm.insert(float('-inf'), 0)  # Handle no predecessor edge case
    tm.insert(float('inf'), 0)   # Handle no successor edge case

    root = order[0]
    tm.insert(root, 1)
    max_depth = 1

    for v in order[1:]:
        pred = tm.predecessor(v)
        succ = tm.successor(v)
        depth = 1 + max(tm.get(pred), tm.get(succ))
        tm.insert(v, depth)
        max_depth = max(max_depth, depth)

    return max_depth

# For LeetCode, replace with:
# class Solution:
#     def maxDepthBST(self, order: List[int]) -> int:
#         (Same logic as above)
```

---

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n), since each insertion of the n elements requires finding predecessor and successor keys in O(log n) for balanced BST/key order structure.

- **Space Complexity:**  
  O(n), as we need to store n node depths and the inserted keys.

---

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input order is not a permutation of 1..n but arbitrary distinct integers?  
  *Hint: The algorithm still works, since BST property only depends on relative order.*

- How would you output the tree height after each insertion, not just at the end?  
  *Hint: Keep track of depth at each step; maintain and output max_depth so far after each insertion.*

- Can you do this with true O(1) extra space without auxiliary data structures?  
  *Hint: Not possible in general, since you need at least O(n) to track node information.*

---

### Summary
We optimize the problem by using an ordered map (simulating TreeMap/SortedDict) to efficiently find the predecessor and successor, allowing us to compute the depth for each inserted node without building the actual tree structure.  
This is a classic application of **BST + order-statistics** and a very common technique in BST order problems—useful in questions about number of greater/smaller elements and dynamic order maintenance.  
Patterns: BST construction, order-statistic trees, predecessor/successor search.


### Flashcard
Simulate BST insertion for each element, tracking depth; optimize by noting each insertion’s depth depends only on its immediate predecessor/successor in the current tree.

### Tags
Array(#array), Tree(#tree), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree), Ordered Set(#ordered-set)

### Similar Problems
