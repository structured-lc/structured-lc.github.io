### Leetcode 2049 (Medium): Count Nodes With the Highest Score [Practice](https://leetcode.com/problems/count-nodes-with-the-highest-score)

### Description  
Given a rooted tree where each node has exactly one parent (except the root, whose parent is -1), you are to calculate for every node a “score”: remove the node and its subtree, and the tree breaks into several disjoint forests. The score of a node is the product of the sizes of all resulting non-empty forests. You are to count how many nodes achieve the maximum possible score.

### Examples  

**Example 1:**  
Input: `parents = [-1,2,0,2,0]`  
Output: `3`  
*Explanation:*

The tree is:
```
      0
     / \
    2   4
   / \
  1   3
```
- Node 0: Removing 0 disconnects all children → forests: [1], [3], [2,1,3], [4], sizes: 3, 1, 1 → Score = 3 × 1 × 1 = 3
- Node 1: Removing 1, only its own node → forests: [rest=4 nodes]; Score = 4
- Node 2: Removing 2, forests = [0,4], [1], [3]; Sizes: 2, 1, 1 → Score = 2 × 1 × 1 = 2
- Node 3: Same as 1
- Node 4: Same as 1

Maximum score is 4 (nodes 1, 3, 4 all reach it), so answer is 3.

**Example 2:**  
Input: `parents = [-1,0,0,1,1,2,2]`  
Output: `2`  
*Explanation:*

The tree:
```
        0
       / \
      1   2
     / \ / \
    3  4 5  6
```
- Nodes 1 and 2 get the highest score.

**Example 3:**  
Input: `parents = [-1,0]`  
Output: `1`  
*Explanation:*

Tree:
```
  0
  |
  1
```
- Only node 1 gets the max score.

### Thought Process (as if you’re the interviewee)  
We must compute a “score” for every node, defined as the product of the sizes of all the forests (connected components) you get after you cut out that node (and its subtree). The brute-force way is: for each node, simulate removal, find sizes of all resulting trees, and multiply. But that’s O(n²)—inefficient for large n.

Optimized idea:  
- If we precompute subtree sizes for each node (DFS), then for each node:
    - Removing node i, each child’s subtree becomes a separate forest.
    - The “rest of the tree” (above node i) also becomes a forest, of size n - subtree_size[i].
- So, for each node, score is (for each child c in i) subtree_size[c], multiplied together, times (if not root) the rest: (n - subtree_size[i]).
- Traverse once to get subtree sizes, another to compute scores.
- Track max_score and how many nodes get it.

This is a classic two-pass DFS over a tree, with O(n) time and space, using the parent/child representation.

### Corner cases to consider  
- Single-node tree (parents = [-1])
- Skewed/deep/unbalanced trees
- All nodes but one as leaves (star structure)
- Duplicate max scores
- Make sure to handle when a node has no children (product is just rest-of-tree size)
- Size constraint: large n

### Solution

```python
def countHighestScoreNodes(parents):
    n = len(parents)
    # Build the tree as adjacency (children) list
    children = [[] for _ in range(n)]
    for i in range(1, n):
        children[parents[i]].append(i)

    max_score = 0
    count = 0

    def dfs(node):
        nonlocal max_score, count
        # The total size of the subtree rooted at this node (including itself)
        size = 1
        prod = 1  # product of all child subtree sizes
        for child in children[node]:
            child_size = dfs(child)
            size += child_size
            prod *= child_size
        # The "rest of tree" after removing this subtree
        rest = n - size
        # If not root node, include the rest
        score = prod * (rest if rest > 0 else 1)
        if score > max_score:
            max_score = score
            count = 1
        elif score == max_score:
            count += 1
        return size

    dfs(0)
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we traverse each node once to compute subtree sizes and scores. All work inside the loop is O(1) per child.
- **Space Complexity:** O(n) for the tree representation and recursion stack (worst case: depth n for a skewed tree).

### Potential follow-up questions (as if you’re the interviewer)  

- If the tree is very deep (n is large, path-like), how do you avoid recursion stack overflow?  
  *Hint: Consider iterative DFS or increasing recursion limit.*

- What if instead of multiplication for score, we used summation?  
  *Hint: Would product logic still work? What changes with zero values or empty components?*

- Can you reconstruct which nodes (not just the count) achieved the max score?  
  *Hint: Store a list of nodes along with count and max_score.*

### Summary
This is a classic "tree DP", specifically using a postorder DFS to aggregate and propagate subtree sizes bottom-up. The key insight is that after removing any node, the sizes of the resulting forests can be written as the sizes of its child subtrees and the “rest of the tree,” enabling O(n) calculation. This pattern (postorder aggregation, then use of these aggregations for scoring) is common in problems involving subtree removals, rerooting, or partitioning trees.


### Flashcard
Precompute subtree sizes via DFS; for each node, score is product of subtree sizes after removal—efficiently calculate using precomputed sizes.

### Tags
Array(#array), Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Sum of Distances in Tree(sum-of-distances-in-tree) (Hard)
- Delete Nodes And Return Forest(delete-nodes-and-return-forest) (Medium)
- Maximum Product of Splitted Binary Tree(maximum-product-of-splitted-binary-tree) (Medium)