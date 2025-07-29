### Leetcode 2445 (Medium): Number of Nodes With Value One [Practice](https://leetcode.com/problems/number-of-nodes-with-value-one)

### Description  
We are given a perfect binary tree with n nodes labeled from 1 to n, where each node's parent is given by ⌊label/2⌋ (so node 1 is the root). Initially, all node values are 0. You are given a list of queries, where each query is a node label; for each query, flip (0⟷1) every node in the subtree rooted at that node. Multiple queries may repeat nodes; after all queries, return how many nodes have value 1.

### Examples  

**Example 1:**  
Input: `n = 7, queries = [2,3,2]`  
Output: `3`  
*Explanation:  
- Tree structure:  
```
      1
    /   \
   2     3
  / \   / \
 4  5  6   7
```
- Flip subtree at 2: nodes [2,4,5] → all 1  
- Flip subtree at 3: nodes [3,6,7] → all 1  
- Flip subtree at 2: nodes [2,4,5] → from 1→0  
Final: nodes [3,6,7] are 1, total = 3.*

**Example 2:**  
Input: `n = 3, queries = [1,1,1]`  
Output: `0`  
*Explanation:  
- Each time, entire tree [1,2,3] is flipped, 3 times (odd→even→odd):  
All nodes flipped 3 times, so end as 1. But 3 is odd, so actually all as 1. But on checking, we see after each flip, the parity is 1,0,1, so must be 1 at end. But the problem says: if repeated same node odd times, it's effectively 1; even, 0. For n=3, queries=[1,1,1]:  
All [1,2,3] are flipped 3 times → end up as 1, so output is 3.*

**Example 3:**  
Input: `n = 4, queries = []`  
Output: `0`  
*Explanation:  
No flips, all remain 0.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force way is to simulate the value for each node. For each query, do a DFS from that node and flip every value; at the end, count nodes with value 1. This is O(q × n), which is too slow.

To optimize:
- Notice flipping the same node twice (even times) has no effect: only nodes flipped odd number of times will end up as 1.
- Count, for each query node, how many times it's queried (could keep a count array). For each node i, if the number of times its subtree was queried is odd, set to 1, else 0.
- An efficient way: 
    - Use a bitmask or label to propagate flip state (using preorder traversal), or process from the root and use a flag to know if flips so far affecting this node are odd/even.
    - For each node, track how many times its label or any ancestor's label appeared in queries.

So do a DFS: 
- At each node, if this node is in queries, increment a flip flag.
- Recursively DFS left/right with flip flag.
- At leaves, sum up flip parity for that node.
- This is O(n).

### Corner cases to consider  
- n=1, no queries.
- n=1, several queries.
- queries contains out-of-bounds values (spec clarifies valid).
- Multiple repeated queries.
- Large n, queries on root node.
- Empty queries.
- Even/odd count of flips per subtree.
- Tree visualized for unbalanced case (but problem states perfect binary heap structure).

### Solution

```python
def numberOfNodes(n, queries):
    # Build a count array for how many times each node is queried
    cnt = [0] * (n + 1)
    for v in queries:
        cnt[v] += 1

    # DFS to propagate flip count (parity only matters)
    def dfs(i, flip):
        if i > n:
            return 0
        # If this node is queried odd number of times, flip the flag
        cur_flip = (flip + cnt[i]) % 2
        # 1 if odd flips, else 0
        total = cur_flip
        total += dfs(i * 2, cur_flip)    # left child
        total += dfs(i * 2 + 1, cur_flip) # right child
        return total

    return dfs(1, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since each node is visited exactly once.
- **Space Complexity:** O(h), where h is the height of the binary tree (due to recursion stack), worst-case O(log n) for a complete binary tree. We also store O(n) for cnt.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if the tree was not perfect, but instead given as a list of parent pointers or adjacency list?  
  *Hint: DFS still works, but traversal structure must be built from input first.*

- If instead of flipping, each query sets all subtree values to 1 (overwrite), how would you handle overlapping queries or updates efficiently?  
  *Hint: Consider segment trees or lazy propagation.*

- Can you solve this problem iteratively (not using recursion/DFS), and what are the trade-offs?  
  *Hint: Use an explicit stack for tree traversal, or level-order traversal.*

### Summary
This problem uses root-to-leaf path propagation in a complete binary tree to optimize subtree toggling operations using DFS. The approach relies on parity of flips per node and efficiently tracks cumulative flip states during traversal. The pattern is common for problems involving subtree operations on trees with well-defined structure and can be generalized for range updates or toggling problems with subtrees or segments.