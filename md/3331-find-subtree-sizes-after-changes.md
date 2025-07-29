### Leetcode 3331 (Medium): Find Subtree Sizes After Changes [Practice](https://leetcode.com/problems/find-subtree-sizes-after-changes)

### Description  
Given a tree rooted at node 0, described by the array `parent` where `parent[i]` is the parent of node i (`parent` is `-1`) and a string `s` where `s[i]` is the character label of node i, transform the tree **simultaneously in one step** by, for each node x (from 1 to n-1):

- Finding the **closest ancestor y of x** with the same label (`s[x] == s[y]`)
- If such y exists, change x’s parent to y (remove edge from current parent, connect to y)
- If not, do nothing

After all changes, return an array `answer` of size n where `answer[i]` is the size of the subtree rooted at i in the **modified tree**.

### Examples  

**Example 1:**  
Input: `parent = [-1,0,0,1,1,1], s = "abaacab"`  
Output: `[7,3,3,1,1,1,1]`  
Explanation:  
```
Original tree:
      0
    / | \
   1  2  3
  / \
 4   5
  \
   6

Label:  a  b  a  a  c  a  b
Node:   0  1  2  3  4  5  6

- Only node 6 changes parent (from 4 to 1), as 1 is its closest ancestor with s[6] = s[1] = 'b'.  
- The resulting subtree sizes are as shown in output.
```

**Example 2:**  
Input: `parent = [-1,0,0,1,2], s = "abcab"`  
Output: `[5,2,2,1,1]`  
Explanation:  
```
Original tree:
    0
   / \
  1   2
 /     \
3       4

Labels: a b c a b

- No node finds an ancestor with the same label.
- No structure changes, output is size of each original subtree.
```

**Example 3:**  
Input: `parent = [-1,0,0,1,1], s = "aaaaa"`  
Output: `[5,3,1,1,1]`  
Explanation:  
```
      0
     / \
    1   2
   / \
  3   4

All nodes except root have an ancestor with same label.
After all changes:
- 2 remains child of 0.
- 1 has children 3 and 4.
Each subtree's size is as above.
```

### Thought Process (as if you’re the interviewee)  
- **Brute Force idea:** For every node x (excluding root), walk up the ancestors to find the closest ancestor with the same label. For each query, ancestor search can take O(n), resulting in O(n²) overall. Then, reconstruct and traverse the modified tree to get subtree sizes.
- **Optimization:** Since all nodes do changes in one step and the underlying structure is a tree, do a single DFS traversal:
  - While recursing, keep mapping from each character to its current node stack/ancestor.
  - For each x, use this mapping to assign new parent quickly (O(1) per node).
  - Build the new tree edges after the transformations.
  - Finally, do a DFS on the new tree to compute subtree sizes.

This makes the solution O(n), since each node is visited a constant number of times in both passes.

**Trade-off:** Using extra maps and lists, but given the low time complexity, this is a standard technique when dealing with labeled trees and ancestor relations.

### Corner cases to consider  
- Tree with only 1 node.
- All labels identical: all nodes (except root) will attach to closest labeled ancestor.
- All labels unique: tree unchanged.
- The resulting tree may not be strictly binary (some nodes may have many siblings after reparenting).
- Deep chains and degenerate trees (very high/low tree shapes).

### Solution

```python
def findSubtreeSizesAfterChanges(parent, s):
    n = len(parent)
    graph = [[] for _ in range(n)]
    for child, p in enumerate(parent):
        if p != -1:
            graph[p].append(child)

    # For new structure after modifications
    new_graph = [[] for _ in range(n)]
    # Records the new parent for each node after modification
    new_parent = [-1] * n

    # Stacks for each character to track current dict of ancestors
    char_stacks = dict()
    for ch in set(s):
        char_stacks[ch] = []

    def dfs(node):
        char_stacks[s[node]].append(node)
        for child in graph[node]:
            # Find closest ancestor with same char
            stk = char_stacks[s[child]]
            if stk:
                # last element on stack (before this dfs) is closest ancestor
                new_parent[child] = stk[-1]
            else:
                # keep parent as in original tree
                new_parent[child] = parent[child]
            dfs(child)
        char_stacks[s[node]].pop()

    dfs(0)

    # Build new graph from new_parent
    for i in range(1, n):
        new_graph[new_parent[i]].append(i)

    # Subtree size dfs
    answer = [1] * n
    def size_dfs(u):
        for v in new_graph[u]:
            answer[u] += size_dfs(v)
        return answer[u]

    size_dfs(0)
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each node is visited a constant number of times in both ancestor search and subtree size calculation.
- **Space Complexity:** O(n), for tree graphs, mapping, answer array, and recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle changes if multiple node labels can change at once?
  *Hint: Track label updates efficiently and process in batches.*

- Can you solve the subtree size part iteratively instead of recursively to avoid stack overflow?
  *Hint: Use a stack to simulate DFS or do level-order traversal.*

- What if the node labels are not lowercase letters but arbitrary values (e.g., numbers)?
  *Hint: Use a map from value to ancestor stack for genericity.*

### Summary
This is a **DFS with ancestor tracking** problem, combining tree labeling and fast re-parenting based on ancestor lookups. The main pattern is “using stacks/mappings in tree recursion to access historical ancestor states by label.”  
Variations of this logic apply to problems such as *lowest common ancestor*, *re-rooted subtree calculations*, or cases requiring ancestor context in trees/graphs.