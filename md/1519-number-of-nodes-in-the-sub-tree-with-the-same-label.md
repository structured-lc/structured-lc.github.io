### Leetcode 1519 (Medium): Number of Nodes in the Sub-Tree With the Same Label [Practice](https://leetcode.com/problems/number-of-nodes-in-the-sub-tree-with-the-same-label)

### Description  
Given an undirected tree with `n` nodes labeled `0` to `n-1` and an array `labels` where each node i has a lowercase character label, return an array `ans` where `ans[i]` is the number of nodes in the subtree rooted at i that have the same label as node i.

### Examples  
**Example 1:**  
Input: `n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], labels = "abaedcd"`  
Output: `[2,1,1,1,1,1,1]`
*Explanation: Root at 0 ("a"). Its subtree has itself and node 1; two "a"s: at 0 and 1. Rest only have themselves.*
Tree:
```
      0(a)
     /   \
  1(a)  2(b)
 / \    / \
4(e)5(d)3(c)6(d)
```

**Example 2:**  
Input: `n = 4, edges = [[0,1],[1,2],[0,3]], labels = "bbbb"`  
Output: `[4,2,1,1]`
*Explanation: All nodes in subtree share label "b".*

**Example 3:**  
Input: `n = 5, edges = [[0,1],[0,2],[1,3],[0,4]], labels = "aabab"`  
Output: `[3,2,1,1,1]`

### Thought Process (as if you’re the interviewee)  
We need to count, for each subtree rooted at each node i, the number of nodes in that subtree with the same label as i. For a tree, use DFS from root. Each node aggregates counts from its children. At each call, return a counter (size 26 for 'a'-'z'), add up children's counters, increment for current node's own label. The answer for node i is then counter[label[i]].

Optimized for tree structure using recursion.

### Corner cases to consider  
- All labels different (all answers are 1)
- All labels same (root's answer is n)
- Small tree (n=1)
- Tree has no children (star topology)

### Solution

```python
from typing import List
from collections import defaultdict

def countSubTrees(n: int, edges: List[List[int]], labels: str) -> List[int]:
    tree = [[] for _ in range(n)]
    for a, b in edges:
        tree[a].append(b)
        tree[b].append(a)
    answer = [0] * n

    def dfs(node, parent):
        count = [0] * 26
        idx = ord(labels[node]) - ord('a')
        count[idx] = 1
        for neighbor in tree[node]:
            if neighbor != parent:
                child_count = dfs(neighbor, node)
                for i in range(26):
                    count[i] += child_count[i]
        answer[node] = count[idx]
        return count

    dfs(0, -1)
    return answer
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n × 26) = O(n), as each node is visited once, and combining small arrays is fast for small (constant) size alphabet.
- **Space Complexity:** O(n + h), for the tree and recursion stack (h=height), plus O(n) for the result.

### Potential follow-up questions (as if you’re the interviewer)  
- How to handle trees with very large/variable alphabets?  
  *Hint: Use hash maps instead of fixed arrays for character count.*

- What if the tree is not rooted?  
  *Hint: Choose any node or try root at each. This might change answers if re-rooted.*

- How to return the full list of matching nodes, not just their counts?  
  *Hint: Track and store indices during DFS matching the label.*

### Summary
The algorithm leverages bottom-up **DFS** aggregation for tree-subtree properties—pattern is common in counting/aggregation problems on tree structures. Especially useful for subtree DPs and label-counting on trees.


### Flashcard
Count nodes in a subtree with the same label as the root by using DFS to aggregate counts from child nodes.

### Tags
Hash Table(#hash-table), Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Counting(#counting)

### Similar Problems
