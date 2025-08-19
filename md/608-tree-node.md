### Leetcode 608 (Medium): Tree Node [Practice](https://leetcode.com/problems/tree-node)

### Description  
Given a tree structure as a list of nodes, each node is represented by an `id` and its `p_id` (parent id, which is `null` for the root).  
For each node, classify it into one of three types:
- **"Root"** – Node with no parent (`p_id` is `null`).
- **"Leaf"** – Node that is not a parent of any node (its `id` does not appear as any other node's `p_id`).
- **"Inner"** – Node that has a parent and is also a parent of at least one node (has non-null `p_id`, and its `id` appears elsewhere as a `p_id`).  
Return a list with each node’s `[id, type]`.

### Examples  

**Example 1:**  
Input:  
```
[
  [1, None],
  [2, 1],
  [3, 1],
  [4, 2]
]
```
Output:  
```
[[1, "Root"], [2, "Inner"], [3, "Leaf"], [4, "Leaf"]]
```
Explanation:  
- Node 1 has `p_id=None` → "Root".
- Node 2 (parent 1, also has child 4) → "Inner".
- Node 3 is a child only → "Leaf".
- Node 4 is a child only → "Leaf".

**Example 2:**  
Input:  
```
[
  [1, None],
  [2, 1]
]
```
Output:  
```
[[1, "Root"], [2, "Leaf"]]
```
Explanation:  
- Node 1 is the root, and the parent of node 2.
- Node 2 has no children → "Leaf".

**Example 3:**  
Input:  
```
[
  [10, None],
  [22, 10],
  [23, 10],
  [35, 23],
  [77, 22]
]
```
Output:  
```
[[10, "Root"], [22, "Inner"], [23, "Inner"], [35, "Leaf"], [77, "Leaf"]]
```
Explanation:  
- Node 10 has `p_id=None`, is parent to 22 & 23 → "Root".
- Node 22 has parent 10, is parent to 77 → "Inner".
- Node 23 has parent 10, is parent to 35 → "Inner".
- Nodes 35 and 77 are leaves.

### Thought Process (as if you’re the interviewee)  
- Start by identifying the "Root": nodes with `p_id == None`.
- To check for "Inner" and "Leaf", I need to know which nodes act as parents (i.e., whose `id` shows up as a `p_id` for another node).
- Brute force: For each node, scan all others to see if `id` appears as a `p_id` elsewhere. This is O(n²).
- Optimize:  
  - First, build a set of all parent ids (`p_id` values that aren't `None`), to look up in O(1) per node.
  - Process nodes:
    - If `p_id == None`: "Root".
    - Else if `id` in parent id set: "Inner".
    - Else: "Leaf".
- The solution only requires O(n) time and space.

### Corner cases to consider  
- A tree with a single node (it's the root and also a leaf).
- Nodes with multiple children.
- All nodes except the root are leaves.
- Deeply nested structures.
- Non-consecutive node ids.

### Solution

```python
# Accepts a list of [id, p_id]; returns list of [id, type]

def classify_tree_nodes(nodes):
    # Gather all ids that are used as a parent
    parent_ids = set()
    for node in nodes:
        pid = node[1]
        if pid is not None:
            parent_ids.add(pid)

    result = []
    for node in nodes:
        node_id, pid = node
        if pid is None:
            node_type = "Root"
        elif node_id in parent_ids:
            node_type = "Inner"
        else:
            node_type = "Leaf"
        result.append([node_id, node_type])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes. We iterate over `nodes` twice: once to collect parent ids, once to classify.
- **Space Complexity:** O(n). The set of parent ids (at most n) and the result list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there could be multiple roots?
  *Hint: Adjust code to handle multiple nodes with `p_id == None`.*

- How would you return results sorted by id?
  *Hint: Sort the result before returning.*

- Suppose you need to return the tree node types for a subtree rooted at a given id only?
  *Hint: Build adjacency list; perform BFS or DFS from that id.*

### Summary
This problem uses the "hash set for quick lookup" coding pattern, common for classifying or deduplicating elements efficiently. It applies anytime you need to check for membership or relationships across columns in unstructured data. This approach is widely needed in tree queries, graph preprocessing, or relational data lookups.

### Tags
Database(#database)

### Similar Problems
