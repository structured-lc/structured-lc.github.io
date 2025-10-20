### Leetcode 1443 (Medium): Minimum Time to Collect All Apples in a Tree [Practice](https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree)

### Description  

Given an undirected tree (n nodes with n-1 edges, rooted at 0) and a boolean list hasApple[] where hasApple[i] is true if the iᵗʰ node has an apple, return the minimum time (number of edges traversed, each takes 1 second) to collect all apples and return to the root. You must return to root.

### Examples  

**Example 1:**  
Input: `n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [False,False,True,False,True,True,False]`  
Output: `8`  
*Explanation: Visit 2→6→2→0→1→4→1→5→1→0; but must traverse edges only for nodes with apples.*

**Example 2:**  
Input: `n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [False,False,False,False,False,False,False]`  
Output: `0`  
*Explanation: No apples, do not need to move.*

**Example 3:**  
Input: `n = 1, edges = [], hasApple = [True]`  
Output: `0`  
*Explanation: Only root, no edges need traversal.*


### Thought Process (as if you’re the interviewee)  

To minimize time, only walk the path(s) to and from the nodes containing apples. For each edge leading to a subtree with apples, count two traversals (go and back). Use DFS to recursively sum the cost for each subtree. Only add time for paths where there is at least one apple in that subtree. If a child or its descendants have apples, add 2 (down and up over that edge).


### Corner cases to consider  
- Only root has apple, no traversal.
- No node has an apple.
- All nodes have apples.
- Apples scattered on leaves at max depth.
- Disconnected tree input (invalid, but check input promise).

### Solution

```python
# DFS from root, add 2 for each edge that leads to apples in its subtree.

def minTime(n, edges, hasApple):
    from collections import defaultdict
    tree = defaultdict(list)
    for u, v in edges:
        tree[u].append(v)
        tree[v].append(u)
    
    def dfs(node, parent):
        total = 0
        for child in tree[node]:
            if child != parent:
                child_cost = dfs(child, node)
                if child_cost > 0 or hasApple[child]:
                    total += child_cost + 2
        return total
    res = dfs(0, -1)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n); each node is visited once by DFS.
- **Space Complexity:** O(n) for adjacency list and recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is very deep (large height)?  
  *Hint: Can you avoid recursion, use iteration?*

- Can you return the actual path to collect apples?  
  *Hint: Modify DFS to record sequence of nodes traversed.*

- What if you start at another node, not 0?  
  *Hint: How does starting node affect the return time?*

### Summary
This is an example of the "tree pruning" pattern: DFS visit accumulates only those subtrees providing value (in this case, apples). Ignore unnecessary branches. Similar logic helps with problems like minimum path collection, file system traversal, subtree sum computation.


### Flashcard
DFS from root; for each edge leading to apples, add 2 to total time (go and back), summing only paths with apples in subtree.

### Tags
Hash Table(#hash-table), Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search)

### Similar Problems
