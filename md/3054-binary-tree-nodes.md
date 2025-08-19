### Leetcode 3054 (Medium): Binary Tree Nodes [Practice](https://leetcode.com/problems/binary-tree-nodes)

### Description  
Given a table `Tree` representing nodes of a binary tree:
- Each row includes `N` (the node's value) and `P` (its parent, or `null` if it's the root).

Classify each node as one of:
- "**Root**" (no parent, i.e., `P` is null),
- "**Inner**" node (has a parent and is a parent to at least one node),
- "**Leaf**" node (has a parent but is not a parent to any node).

Return the result as a list of nodes with their type.

### Examples  

**Example 1:**  
Input:  
```
Tree table:
+----+------+
| N  |  P   |
+----+------+
| 1  |  2   |
| 2  |  5   |
| 3  |  2   |
| 4  |  3   |
| 5  | null |
| 6  | 5    |
| 7  | 4    |
| 8  | 4    |
+----+------+
```
Output:  
```
+----+-------+
| N  | type  |
+----+-------+
| 1  | Leaf  |
| 2  | Inner |
| 3  | Inner |
| 4  | Inner |
| 5  | Root  |
| 6  | Leaf  |
| 7  | Leaf  |
| 8  | Leaf  |
+----+-------+
```
Explanation:  
- 5 is the root (P is null).
- 2, 3, 4 are inner nodes (they have parents and at least one child).
- 1, 6, 7, 8 are leaves (they have a parent, but no children).

**Example 2:**  
Input:  
```
Tree table:
+----+------+
| N  |  P   |
+----+------+
| 1  | null |
+----+------+
```
Output:  
```
+----+-------+
| N  | type  |
+----+-------+
| 1  | Root  |
+----+-------+
```
Explanation:  
- Only one node, which is the root.

**Example 3:**  
Input:  
```
Tree table:
+----+------+
| N  |  P   |
+----+------+
| 1  | 2    |
| 2  | null |
+----+------+
```
Output:  
```
+----+-------+
| N  | type  |
+----+-------+
| 1  | Leaf  |
| 2  | Root  |
+----+-------+
```
Explanation:  
- 2 is the root.
- 1 is a child of 2 and is a leaf.

### Thought Process (as if you’re the interviewee)  
Let's consider how to determine each type:
- If `P` is null, it's the **Root**.
- If a node's value never appears as a parent (`P`) in the `Tree`, the node is a **Leaf**.
- Otherwise, it's an **Inner** node.

In SQL, this can be solved using a self join:
- For each node (t1), left-join on t2 where t1.N = t2.P.
- If t1.P is null ⇒ 'Root'.
- If t2.P is null (i.e., no child row matches) ⇒ 'Leaf'.
- Else ⇒ 'Inner'.

Trade-offs:
- The LEFT JOIN approach is easy to implement and reads clearly.
- Complexity depends on the table size, but for an interview or moderate data, this is ideal.

### Corner cases to consider  
- Only one node (should be Root).
- All nodes are leaves except Root.
- Each node has only one child (degenerate to a linked list).
- Duplicate node/parent entries (shouldn't occur per problem, but code should be robust).
- Nodes with no children (Leaf detection).
- Multiple nodes with P as null (should not happen in a proper tree).

### Solution

```python
# As this problem is typical for a SQL interview, here's an equivalent Python simulation.
# We'll assume input is a list of tuples (N, P) corresponding to the Tree table.

def classify_nodes(tree):
    # tree: List of [N, P], P may be None
    node_to_parent = {}
    parents = set()
    node_set = set()
    for n, p in tree:
        node_set.add(n)
        node_to_parent[n] = p
        if p is not None:
            parents.add(p)
    result = []
    for n in sorted(node_set):
        if node_to_parent[n] is None:
            typ = "Root"
        elif n not in parents:
            typ = "Leaf"
        else:
            typ = "Inner"
        result.append((n, typ))
    return result

# Example:
# tree = [
#     [1, 2],
#     [2, 5],
#     [3, 2],
#     [4, 3],
#     [5, None],
#     [6, 5],
#     [7, 4],
#     [8, 4],
# ]
# print(classify_nodes(tree))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes.  
  - Two passes: one for building parent sets and the node-to-parent mapping, second for type classification.
- **Space Complexity:** O(n)
  - Storage for parent set, node-to-parent mapping, list of nodes.

### Potential follow-up questions (as if you’re the interviewer)  

- How would this change if there could be multiple roots?  
  *Hint: Consider nodes where P is null as roots—just return multiple "Root" nodes.*

- What if the tree can be cyclic (not guaranteed as a tree)?  
  *Hint: Need to check for cycles while classifying using DFS or visited set.*

- Can you extend this for k-ary trees (instead of strictly binary)?  
  *Hint: The classification logic remains identical; parent/child checks still work.*

### Summary
This problem is a classic example of parent-child mapping and classification in trees. The solution uses a "self-join" pattern—common in SQL and useful for parent-child relationships in any tree-like structure. The classification pattern here applies for n-ary and general rooted trees, not just binary. This node classification method is seen in file system ancestry, org charts, and network tree problems.

### Tags
Database(#database)

### Similar Problems
