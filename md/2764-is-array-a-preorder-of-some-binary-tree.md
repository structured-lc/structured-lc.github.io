### Leetcode 2764 (Medium): Is Array a Preorder of Some ‌Binary Tree [Practice](https://leetcode.com/problems/is-array-a-preorder-of-some-binary-tree)

### Description  
You are given a 0-indexed 2D integer array `nodes`, where each element is `[id, parent]`.  
Your task is to **determine if the given array represents the preorder traversal of some binary tree**, where each pair `[id, parent]` means node `id` has parent `parent` (and the root has parent -1).  
That is, can you reconstruct a valid binary tree whose preorder traversal would visit nodes exactly in the given order?

### Examples  

**Example 1:**  
Input: `nodes = [[0,-1],[1,0],[2,0],[3,1],[4,1]]`  
Output: `false`  
Explanation:  
The tree formed is:
```
    0
   / \
  1   2
 / \
3   4
```
In preorder, after visiting `0`, we must completely traverse the left subtree `[1,3,4]` or right subtree `[2]` entirely. But in the order given, `2` appears between `1` and `3`, breaking valid preorder.  

**Example 2:**  
Input: `nodes = [[0,-1],[1,0],[2,1],[3,2]]`  
Output: `true`  
Explanation:  
The tree formed is:
```
  0
   \
    1
     \
      2
       \
        3
```
Preorder traversal: 0, 1, 2, 3, which matches the input order.

**Example 3:**  
Input: `nodes = [[1,-1],[2,1],[3,1]]`  
Output: `true`  
Explanation:  
The tree formed is:
```
  1
 / \
2   3
```
Preorder traversals can be: 1, 2, 3 or 1, 3, 2. Both are valid preorder traversals for this structure. The given order is valid.

### Thought Process (as if you’re the interviewee)  
- First, I’ll build the tree structure from the `[id, parent]` pairs.
- To check if the order matches a possible preorder traversal, I can:
  - Traverse the tree in preorder and compare it with the given list.
  - Alternatively, mimic preorder DFS, always matching the next expected node.
- The brute-force way is to try all possible binary trees and check preorder, but that's exponential.
- Instead, since nodes’ ordering and parent relationships are fixed, I can:
  - Build the child mapping (from parent to list of children).
  - Start DFS from the root (parent == -1), increment a global index as I go, always checking that the next node in preorder matches expected structure.
- If I ever find a node in traversal that doesn't match the next node in array, return false.
- This method efficiently validates if the array is exactly a preorder traversal.

### Corner cases to consider  
- Array of size 1: trivial tree with only root, must return true.
- Nodes with same parent (siblings): both orders should be valid preorder, as long as no node is repeated out of subtree context.
- Tree with deep nesting (degenerate/tree-as-list).
- Invalid parent relationships (but per constraints, input generates a valid tree).
- Child comes before parent (should never happen due to construction).
- Duplicate ids (should not happen).

### Solution

```python
from collections import defaultdict

def isPreorder(nodes):
    # Build the tree: child list for each parent
    tree = defaultdict(list)
    id_to_parent = {}
    for id, parent in nodes:
        tree[parent].append(id)
        id_to_parent[id] = parent

    # Find root node (with parent == -1)
    root = None
    for id, parent in nodes:
        if parent == -1:
            root = id
            break

    # Prepare a mapping: node_id -> expected preorder index
    preorder = [id for id, _ in nodes]
    idx = [0]  # Use list for mutability in nested function

    def dfs(node):
        # Check if current node matches the expected position in preorder
        if node != preorder[idx[0]]:
            return False
        idx[0] += 1
        for child in tree[node]:
            if not dfs(child):
                return False
        return True

    return dfs(root) and idx[0] == len(nodes)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Each node is visited once in the DFS.
  - Building the tree from the node list is O(n).

- **Space Complexity:** O(n)  
  - Tree/child adjacency mapping takes O(n).
  - Recursion stack can go as deep as n in worst case (skewed tree).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle cases where the parent relationships do not form a valid tree?  
  *Hint: Validate that there is exactly one root, and no cycles or multiple parents per node.*

- Can this be extended to k-ary trees (i.e., trees with more than 2 children per node)?  
  *Hint: The parent-to-child relationship remains, but preorder validation logic is the same.*

- What if you also want to recover the **postorder** or **inorder** traversal from this structure?  
  *Hint: The parent-child graph suffices; perform DFS in the desired order.*

### Summary
This problem uses the "Simulate the traversal + direct compare" pattern: construct the structure, then simulate the traversal, making sure it matches the input.  
It is a classic use of DFS and tree construction from parent arrays.  
This pattern is broadly applicable in tree validation, reconstruction, serialization, and various traversal ordering checks in binary/k-ary trees.