### Leetcode 1261 (Medium): Find Elements in a Contaminated Binary Tree [Practice](https://leetcode.com/problems/find-elements-in-a-contaminated-binary-tree)

### Description  
You are given a binary tree where every node's value is -1 (the tree is "contaminated"). You need to **recover** the tree such that the root is 0, and for every node with value x:
- its left child (if it exists) should have value 2×x+1
- its right child (if it exists) should have value 2×x+2  
After recovering, implement the `FindElements` class that allows you to check efficiently whether a given target value is present in this recovered tree.

### Examples  

**Example 1:**  
Input: root =  
```
    -1
   /  \
 -1   -1
```
FindElements([root]), find(1), find(2)

Output=`FindElements([root]), true, true`  
Explanation:  
- After recovery, values become  
  ```
     0
    / \
   1   2
  ```
- find(1) → true  
- find(2) → true

**Example 2:**  
Input: root =  
```
      -1
     /
   -1
   /
 -1
```
FindElements([root]), find(2), find(3), find(4)

Output=`FindElements([root]), true, false, false`  
Explanation:  
- After recovery, values become  
  ```
    0
   /
  1
 /
3
  ```
- find(2) → false (not in tree)  
- find(3) → true  
- find(4) → false

**Example 3:**  
Input: root =  
```
    -1
      \
      -1
        \
        -1
```
FindElements([root]), find(1), find(3), find(5)

Output=`FindElements([root]), false, true, true`  
Explanation:  
- After recovery, values become  
  ```
      0
       \
        2
         \
          6
  ```
- find(1) → false  
- find(3) → false  
- find(5) → false  
- (if trying find(6), it would be true)


### Thought Process (as if you’re the interviewee)  

First, we must **recover the tree** by restoring all the original values using the rule:
- root = 0
- left child = 2×parent+1
- right child = 2×parent+2  
This is well-suited for recursive depth-first traversal (DFS), as each node's correct value can be deduced from its parent.

Once recovered, to efficiently support find(target), we want O(1) lookups. Storing all recovered values in a set during the recovery lets us do this.

Brute-force idea:
- When a find query comes, search through the tree using BFS or DFS (O(n) per query). This is inefficient for repeated queries.

Optimized approach:
- Precompute and store all valid values in a set during recovery (O(n) time and space upfront, O(1) per query).

Trade-off:  
- We're using extra space for the set but gain fast queries. This is fine unless memory is severely constrained.


### Corner cases to consider  
- Tree has only one node  
- Tree is empty (root is None)  
- Querying for negative values  
- Querying for values much greater than possible (not in tree)  
- Skewed tree (all nodes left, or all right)  
- Duplicate queries  


### Solution

```python
class FindElements:
    def __init__(self, root):
        # Set to store all recovered values
        self.values = set()
        self._recover(root, 0)
    
    def _recover(self, node, val):
        # Base case: if node is None, do nothing
        if not node:
            return
        # Assign correct value to current node
        node.val = val
        self.values.add(val)
        # Recurse for left and right child with new values
        self._recover(node.left, 2 * val + 1)
        self._recover(node.right, 2 * val + 2)
    
    def find(self, target):
        # O(1) lookup in the set
        return target in self.values
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(n) for recovery (visit every node once). Each find call is O(1), thanks to the hash set.
- **Space Complexity:** O(n) for storing n values in the set, plus O(h) recursion stack (h = height).


### Potential follow-up questions (as if you’re the interviewer)  

- What if you couldn't use extra space?  
  *Hint: Can you traverse the tree from scratch for each query? (O(n) per query)*

- What if you had to treat extremely large trees?  
  *Hint: Limit the set size, or use lazy recovery upon query paths only?*

- Could you implement `find` without actually recovering the whole tree?  
  *Hint: Given the target, reconstruct a path from root, and traverse only as needed.*


### Summary
This problem uses the **tree DFS traversal and hash set** design pattern. The DFS recovers values as we traverse, and the set provides fast O(1) lookup for queries. This is a classic space-for-speed trade-off and is seen in many problems needing repeated fast existence-checks after a batch precomputation. The recursive DFS is fundamental for tree recovery, and the membership set pattern is common for fast lookups.

### Tags
Hash Table(#hash-table), Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Design(#design), Binary Tree(#binary-tree)

### Similar Problems
