### Leetcode 2246 (Hard): Longest Path With Different Adjacent Characters [Practice](https://leetcode.com/problems/longest-path-with-different-adjacent-characters)

### Description  
You are given a tree rooted at node 0, described by an array `parent` where `parent[i]` is the parent of the iᵗʰ node (parent = -1), and a string `s` where s[i] is the character assigned to node i. The goal is to find the length of the longest path in the tree such that no pair of adjacent nodes on the path have the same character.  
The path can start and end at any node; all connections are undirected edges as given by the parent array. You must ensure that adjacent nodes in the path have different characters.

### Examples  

**Example 1:**  
Input: `parent = [-1,0,0,1,1,2]`, `s = "abacbe"`  
Output: `3`  
*Explanation: The longest path is 0 → 1 → 3 (with characters 'a', 'b', 'c'). No adjacent nodes with the same character.*

Visualization:  
List: [0, 1, 2, 3, 4, 5]  
Tree:
```
      0('a')
     /     \
 1('b')   2('a')
 /   \       \
3('c') 4('b') 5('e')
```

**Example 2:**  
Input: `parent = [-1,0,0,0]`, `s = "aabc"`  
Output: `3`  
*Explanation: The longest path is 2 → 0 → 3 (characters 'b' → 'a' → 'c'). All adjacent nodes on path have different characters.*

Visualization:  
List: [0, 1, 2, 3]  
Tree:
```
    0('a')
  /   |   \
1('a')2('b')3('c')
```

**Example 3:**  
Input: `parent = [-1,0,1,2,3,4,5]`, `s = "abcdefg"`  
Output: `7`  
*Explanation: The tree is a straight chain (path): 0→1→2→3→4→5→6, with all distinct adjacent characters, so the answer is the total number of nodes.*

Visualization:  
List: [0, 1, 2, 3, 4, 5, 6]  
Tree:
```
0('a')
  |
1('b')
  |
2('c')
  |
3('d')
  |
4('e')
  |
5('f')
  |
6('g')
```

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Consider every path in the tree and check if adjacent nodes have different characters. This would be highly inefficient because the number of paths in a tree can be exponential.

- **Optimized (DFS) approach:**  
  Since this is a tree (no cycles), we can use DFS from the leaves upward. For each node, we can compute the longest chain starting from its children up, only if the child character is different. To get the longest simple path that passes through a node, consider the two longest distinct child-paths for which the adjacent character is not the same as the current node (because two such child-paths can be joined at this node to make a longer path).  
  At each node:
  - Track the two longest valid child paths.
  - The answer for that node is 1 (the node itself), plus the length(s) of up to two best non-overlapping child paths with distinct adjacent character.
  - The global answer is the max such value for all nodes.

- **Why DFS:**  
  - Tree structure allows easy recursion without visited marks.
  - Bottom-up logic naturally fits DFS: child paths are known before the parent aggregates them.

- **Trade-offs:**  
  - DFS is O(n) since each node is visited a constant number of times, and path merging/aggregation at each node is O(1).  
  - Using BFS (queue-based level processing) would be possible, but DFS is more natural and has smaller overhead.

### Corner cases to consider  
- Tree of only one node.
- All nodes have the same character: longest path = 1.
- All characters are unique: longest path = n.
- Skewed trees (chain vs. star).
- Some nodes have multiple children with the same character; ensure only distinct adjacent chars are counted.
- Tree is a chain where some adjacent nodes have same character—test that only segments of distinct-chars are counted.

### Solution

```python
from collections import defaultdict

def longestPath(parent, s):
    n = len(parent)
    # Build the tree as adjacency list
    tree = defaultdict(list)
    for child, par in enumerate(parent):
        if par != -1:
            tree[par].append(child)

    res = [1]  # Global max path length (at least one node in tree)
    
    def dfs(node):
        max1, max2 = 0, 0  # store top 2 longest valid child paths
        for child in tree[node]:
            child_len = dfs(child)
            # Only consider if adjacent char is different
            if s[child] != s[node]:
                if child_len > max1:
                    max2 = max1
                    max1 = child_len
                elif child_len > max2:
                    max2 = child_len
            # else, ignore - cannot be in same path

        # Update the global result: path using this node and top two child paths
        res[0] = max(res[0], 1 + max1 + max2)
        return 1 + max1  # propagate the best path (single branch with node at root)
    
    dfs(0)
    return res[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since each node is visited once in the DFS traversal, and at each node we do constant work (finding top-2 paths only among its children).
- **Space Complexity:** O(n), for the adjacency list representation of the tree, plus O(h) for the recursion stack (h ≤ n).

### Potential follow-up questions (as if you’re the interviewer)  

- If instead of just one character per node, each node had a set of allowed characters, how would you adapt your algorithm?  
  *Hint: Consider dynamic programming at each node for all possible last characters.*

- Could you output one such path instead of just its length?  
  *Hint: Track parent pointers or reconstruct the path during DFS.*

- What if the tree was very deep (large h)? What would you do to avoid stack overflow?  
  *Hint: Consider an explicit stack (iterative DFS).*

### Summary
This problem demonstrates the classic use of DFS on trees, specifically the "aggregation" pattern where each node gathers information from its children. In particular, capturing the two longest distinct-child paths echoes the "diameter of tree" pattern, but conditioned on an adjacent-character constraint. This approach is widely used for various forms of path or subtree queries and can be adapted to problems with similar aggregation requirements.