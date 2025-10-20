### Leetcode 1273 (Medium): Delete Tree Nodes [Practice](https://leetcode.com/problems/delete-tree-nodes)

### Description  
Given a rooted tree with `n` nodes, values for each node, and lists of each node's parent, delete every subtree whose total sum is 0. Finally, report how many nodes remain after all deletions. Children of deleted nodes are *also* deleted. The tree is given as:
- `nodes`: n (number of nodes)
- `parent`: parent[i] is parent of i. Root's parent is -1.
- `value`: value[i] is the integer value at node i.

### Examples  

**Example 1:**  
Input: `nodes = 7`, `parent = [-1,0,0,1,2,2,2]`, `value = [1,-2,4,0,-2,-1,-1]`
Output: `2`
*Explanation: Tree is*
```
    0
  /   \
 1     2
/    / | \
3   4  5 6
```
*Subtree sums: 1(-2+0)+(4+(-2)+(-1)+(-1))=0, leaves 0 and 2.*

**Example 2:**  
Input: `nodes = 5`, `parent = [-1,0,0,1,1]`, `value = [1,-1,-1,1,0]`
Output: `3`
*Explanation: Some subtrees do not sum to zero—remain in tree.*

**Example 3:**  
Input: `nodes = 1`, `parent = [-1]`, `value = `
Output: `0`
*Explanation: Single node with value zero; whole tree deleted.*

### Thought Process (as if you’re the interviewee)  

- Build the tree from parent pointers using a children-list structure.
- Traverse bottom-up (post-order DFS): compute each subtree’s total sum.
- If a subtree sums to 0, delete it (don't count those nodes in answer).
- For each non-0 subtree, accumulate the count and pass the sum up.

Tradeoff: Must use post-order so children processed first.

### Corner cases to consider  
- All node values zero: whole tree deleted, return 0.
- Only some subtrees sum to zero, remove them.
- Negative and positive values.
- Single node tree, zero or nonzero.
- Parent[-1] at index > 0? (shouldn’t happen in valid input)

### Solution

```python
def deleteTreeNodes(nodes, parent, value):
    from collections import defaultdict

    # Build tree: parent → [children]
    tree = defaultdict(list)
    for child, par in enumerate(parent):
        if par != -1:
            tree[par].append(child)

    def dfs(node):
        total = value[node]
        size = 1
        for child in tree.get(node, []):
            child_sum, child_size = dfs(child)
            total += child_sum
            size += child_size
        if total == 0:
            return 0, 0  # subtree deleted
        else:
            return total, size  # keep, pass current sum and count

    _, remaining_size = dfs(parent.index(-1))
    return remaining_size
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), each node visited once.
- **Space Complexity:** O(n), for tree and recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How to return the list of remaining node indices (not just count)?  
  *Hint: Track visited nodes or mark survivors during DFS.*

- Can you do this iteratively?  
  *Hint: Use a stack for postorder traversal.*

- What if children were an adjacency matrix?  
  *Hint: Build children-lists from matrix form first.*

### Summary
This is a post-order tree DFS for conditional deletion, a common pattern in tree cleanup, garbage collection, or computing aggregates that control which nodes are retained.


### Flashcard
Build tree, post-order DFS to sum subtree values; delete subtrees with sum 0, count remaining nodes.

### Tags
Array(#array), Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search)

### Similar Problems
