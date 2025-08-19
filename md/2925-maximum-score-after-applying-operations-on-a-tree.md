### Leetcode 2925 (Medium): Maximum Score After Applying Operations on a Tree [Practice](https://leetcode.com/problems/maximum-score-after-applying-operations-on-a-tree)

### Description  
Given a tree with `n` nodes (labeled `0` to `n-1`), rooted at node `0`, and a list `edges` describing the undirected connections, along with an integer array `values`, you can repeatedly choose a node, add its value to your score, then set its value to 0. After all operations, the tree must stay "healthy": for every path from the root to a leaf, the sum of values along that path must be nonzero. Compute the maximum achievable score.

A path is considered *healthy* if it contains at least one nonzero node—so after operations, **for every root-to-leaf path, not every selected node can have its value set to 0**.

### Examples  

**Example 1:**  
Input:  
edges = `[[0,1],[0,2],[1,3],[1,4]]`,  
values = `[1,2,3,4,5]`  
Output: `14`  
*Explanation:   
Tree:  
```
    0
   / \
  1   2
 / \
3   4
```
You can take all nodes except node 0 itself:  
score = 2 + 3 + 4 + 5 = 14  
After this, each root-to-leaf path passes through node 0 (still nonzero), so the tree stays healthy.*

**Example 2:**  
Input:  
edges = `[[0,1],[0,2],[1,3],[1,4],[2,5]]`,  
values = `[5,3,2,1,4,6]`  
Output: `16`  
*Explanation:  
Tree:  
```
    0
   / \
  1   2
 / \   \
3   4   5
```
Take nodes 1, 2, 3, 4, 5: score = 3 + 2 + 1 + 4 + 6 = 16  
Root remains with value 5, so every path has a nonzero value left.*

**Example 3:**  
Input:  
edges = `[[0,1],[1,2],[2,3],[3,4]]`,  
values = `[10,2,0,0,10]`  
Output: `12`  
*Explanation:  
Tree:  
```
0
|
1
|
2
|
3
|
4
```
Take nodes 1 and 4 (score = 2 + 10 = 12), but must not set all values on the only path to 0, otherwise the path sum would be zero and the tree unhealthy.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:** Try every combination of choices (which nodes to "zero out"), check for each if the tree remains healthy. But exponential time, as every node offers a choice.
- **Observation:** On any root-leaf path, *at least one* node must remain nonzero after all operations. To maximize the score, we want to take as many node values as possible, i.e., set as many to zero, but must ensure *not all* values on any path are set to zero.
- **Key Insight:** The "bottleneck" is that for each leaf path, there must be a node you *don't* take. In the optimal scenario, for each leaf path, you leave one node untouched (commonly a leaf, but not always).  
- **Optimized approach:**  
  - Compute the total sum of all values.
  - The minimal value that cannot be taken is the minimal "leaf path cover": for each leaf path, **one value must remain nonzero** on that path, i.e., we must "pay" (not take) the minimal sum of mandatory-reserved values.
  - Use DFS: For each subtree, decide: what is the minimal cost needed to keep the subtree healthy, and what's the total sum under it?  
  - At each node, either (a) leave this node untouched and take all child subtrees except one value from each leaf-path; (b) or take child subtree's minimums recursively.
- **Bottom line:**  
  - For a leaf, we must keep its own value (since it is the only value in its root-to-leaf path).
  - For an internal node, its minimal required value is the minimum of "its own value" vs. the sum of all its children's required values.

### Corner cases to consider  
- Single node (only root): must not take it, as then path sum is zero.
- Star-shaped trees (root with only leaves): must leave root's value OR at least one leaf's value.
- Nodes with value zero (can leave, but ensure path sum remains nonzero).
- All positive values vs. some zeros.

### Solution

```python
def maximumScoreAfterOperations(edges, values):
    # Build adjacency list
    from collections import defaultdict
    tree = defaultdict(list)
    for a, b in edges:
        tree[a].append(b)
        tree[b].append(a)
    
    def dfs(node, parent):
        subtotal = 0
        min_preserve = 0
        is_leaf = True
        for child in tree[node]:
            if child == parent:
                continue
            is_leaf = False
            child_sum, child_preserve = dfs(child, node)
            subtotal += child_sum
            min_preserve += child_preserve
        if is_leaf:
            return values[node], values[node]  # For leaf, can't take its value.
        # For non-leaf, we can either reserve its own value (not take), or the min sum of child-reservations.
        return subtotal + values[node], min(values[node], min_preserve)
    
    total_sum, min_preserve = dfs(0, -1)
    return total_sum - min_preserve
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes (each is visited once, and all operations per node are O(1)).
- **Space Complexity:** O(n) for recursion stack (worse-case tree height), O(n) for adjacency list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is not rooted at zero?  
  *Hint: How would you find the best root or handle general trees?*

- What if some node values are negative?  
  *Hint: Is "not taking" negative nodes still optimal? How do negative values affect reservation choices?*

- Can you return which nodes must be left nonzero?  
  *Hint: Adapt your DP or dfs to backtrack which nodes are left untouched for optimal score.*

### Summary
This problem uses the **tree DP / post-order DFS pattern**, similar to "minimum vertex cover on trees" or constrained subtree selection. The approach generalizes to problems requiring preserved paths or states along root-to-leaf traversal, making it widely applicable in subtree optimization and dynamic programming on trees.

### Tags
Dynamic Programming(#dynamic-programming), Tree(#tree), Depth-First Search(#depth-first-search)

### Similar Problems
- Sum of Distances in Tree(sum-of-distances-in-tree) (Hard)
- Collect Coins in a Tree(collect-coins-in-a-tree) (Hard)
- Find the Maximum Sum of Node Values(find-the-maximum-sum-of-node-values) (Hard)