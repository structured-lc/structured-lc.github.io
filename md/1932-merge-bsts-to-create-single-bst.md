### Leetcode 1932 (Hard): Merge BSTs to Create Single BST [Practice](https://leetcode.com/problems/merge-bsts-to-create-single-bst)

### Description  
Given n binary search trees (BSTs), each with at most 3 nodes and all root values unique, merge them into one valid BST if possible.  
Each operation selects two distinct trees: if a leaf (a node with no children) in one has the same value as the root of another, you replace that leaf with the full tree of the matching root and remove the merged tree from the list.  
Repeat until only one tree remains (after n − 1 merges). Return the root of the resultant BST if valid, or None/null if impossible.

- BST property: In any node, values on the left are strictly less, right are strictly greater.
- Merging is only allowed when a leaf equals another tree’s root.

### Examples  

**Example 1:**  
Input:  
```
trees = [
  [2,1,3],    #    2
              #   / \
              #  1   3
  [3,null,4], #    3
              #     \
              #      4
  [5,null,6]  #    5
              #     \
              #      6
]
```   
Output: `[5,2,6,1,3,null,null,null,null,null,4]`  
Explanation:  
- Merge `[3,null,4]` into leaf 3 of `[2,1,3]`:  
  ```
    2
   / \
  1   3
        \
         4
  ```
- Merge result above into leaf 2 of `[5,null,6]` (replace 2 with the full tree):  
  ```
    5
   / \
  2   6
 / \
1   3
      \
       4
  ```
- Only one BST remains, which is valid.

**Example 2:**  
Input:  
```
trees = [
  [2,1],   # 2
           # /
           #1
  [3,2]    # 3
           # /
           #2
]
```
Output: `None`  
Explanation:  
- Cannot merge: both roots have 2 as a node, which would violate the unique values property, so return None.

**Example 3:**  
Input:  
```
trees = [
  [1],      # 1
  [2,1],    # 2
            # /
            #1
  [3,2]     # 3
            # /
            #2
]
```
Output: `None`  
Explanation:  
- Only possible merge is 1 under 2, but then cannot merge 2 under 3 since 2 already used in a previous subtree. Merge impossible.

### Thought Process (as if you’re the interviewee)  
First, try brute force:  
- Pick any two trees, attempt all possible merges, recursively check if the remaining can be merged. Since trees are small (max 3 nodes each), this won’t scale for bigger n but may work for these constraints.

A more optimal idea:
- Since each root is unique, find a “master root”: one that’s not a leaf in any other tree. This will be the root of the final BST.
- Create a mapping from value → tree root node for quick lookup.
- Identify leaves in all trees. When a leaf matches a root elsewhere, merge by replacing the leaf with the corresponding tree and remove the merged tree from the collection.
- After replacing/merging, check if the final tree is a valid BST and covers all nodes without duplication.

Trade-offs:
- Efficient mapping helps avoid repeated tree scanning.
- There are constraints that each value must be unique in the final tree and BST properties must be maintained.

### Corner cases to consider  
- Only one tree given → Already a valid BST; return as is.
- Leaf value appears in more than one tree root.
- Cycles—trees cannot reference each other in a loop.
- Duplicate values in unrelated trees (should never happen as per problem, but worth checking).
- Tree list is empty.
- After merges, structure violates BST properties somewhere down the line.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def canMerge(trees):
    # Map root value to root node for fast lookup
    val_to_root = {}
    # Set to record all leaf node values across all trees
    leaf_vals = set()
    for root in trees:
        val_to_root[root.val] = root
        if root.left: leaf_vals.add(root.left.val)
        if root.right: leaf_vals.add(root.right.val)
    
    # Candidate: a tree whose root never appears as a leaf elsewhere
    master = None
    for root in trees:
        if root.val not in leaf_vals:
            if master is None:
                master = root
            else:
                # More than one possible master root: ambiguous
                return None
    if not master:
        return None

    # Remove master from candidates, others will be merged in
    del val_to_root[master.val]
    
    # Helper to perform merge during traversal
    def merge(node, min_val, max_val):
        if not node:
            return True
        # If leaf matches another root's value, merge
        if not node.left and not node.right and node.val in val_to_root:
            merged_subtree = val_to_root.pop(node.val)
            node.left = merged_subtree.left
            node.right = merged_subtree.right
        # BST property check: left < node < right
        if node.val <= min_val or node.val >= max_val:
            return False
        return merge(node.left, min_val, node.val) and merge(node.right, node.val, max_val)
    
    if not merge(master, float('-inf'), float('inf')):
        return None
    # After all merges, if any unmerged tree remains, fail
    if val_to_root:
        return None
    return master
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the total number of nodes (since we traverse each node once for merging and BST validation).
- **Space Complexity:** O(n), since we use hash maps to store root and leaf references, plus call stack in recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- What if each BST had up to 1,000 nodes?  
  *Hint: Focus on efficient subtree replacement. In-order traversal for BST validation in O(n).*

- What if duplicate values were allowed somewhere in the trees?  
  *Hint: How would merging and validation change? Need to update uniqueness checks.*

- What is the minimum and maximum number of merges needed to guarantee building a valid BST?  
  *Hint: Always n − 1 merges? Only if one root never appears as a leaf elsewhere.*

### Summary
This problem combines union-find pattern with tree traversal, hash map lookups, and BST validity checks.  
It leverages set/dictionary data structures to efficiently find where merges are possible and uses recursive traversal to perform merging and validation in one pass.  
Such techniques are common in problems involving tree reconstruction, validation, and merge operations across disjoint data structures.

### Tags
Hash Table(#hash-table), Binary Search(#binary-search), Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
