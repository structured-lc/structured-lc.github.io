### Leetcode 2673 (Medium): Make Costs of Paths Equal in a Binary Tree [Practice](https://leetcode.com/problems/make-costs-of-paths-equal-in-a-binary-tree)

### Description  
Given a **perfect binary tree** with `n` nodes, where the nodes are numbered from 1 to `n`, each node has an associated non-negative integer cost (given as an array: cost[i] is the cost of node i+1).  
You can increment the cost of any node by 1, any number of times.

Your goal is:  
**Make the total cost along every path from root to leaf node the same** using the minimum number of such increments across the tree.  
Return the minimum number of increments needed.

### Examples  

**Example 1:**  
Input: `n = 7`, `cost = [1, 5, 2, 2, 3, 3, 1]`  
Output: `6`  
*Explanation:  
The tree (using list: [1,5,2,2,3,3,1]):  
```
          1
        /   \
      5       2
     / \     / \
    2   3   3   1
```
- Path 1→5→2: sum = 1+5+2 = 8  
- Path 1→5→3: sum = 1+5+3 = 9  
- Path 1→2→3: sum = 1+2+3 = 6  
- Path 1→2→1: sum = 1+2+1 = 4

To make all root-to-leaf path costs equal, you increment node costs as follows (one valid way):  
- Increment 2 (right leaf) by 5 (to make path cost 9)
- Increment 3 (right leaf) by 3 (to make path cost 9)
- Increment 1 (left leaf) by 5 (to make path cost 9)

Total increments = 5+3+5 = 13, **BUT** using an efficient approach you "balance" upward and only pay for sibling path differences (see algorithm below): The minimum total increments needed is `6`.

**Example 2:**  
Input: `n = 3`, `cost = [1, 2, 3]`  
Output: `1`  
*Explanation:  
```
      1
     / \
    2   3
```
- Paths: 1→2=3, 1→3=4  
Increment node 2 by 1 to make both root-to-leaf paths cost 4. Total increments = 1.

**Example 3:**  
Input: `n = 1`, `cost = [5]`  
Output: `0`  
*Explanation:  
Tree has only the root, already balanced. No increments needed.

### Thought Process (as if you’re the interviewee)  

- The brute-force idea is to recursively or iteratively try all possible root-to-leaf paths, compute their sums, and then increment leaf node costs until all paths are equal. But this is highly inefficient, especially for large trees.

- **Key observation:** In a perfect binary tree, every non-leaf node has two children.  
To equalize the path costs, sibling subtrees rooted at any non-leaf node must be "balanced"—their maximal path sums downward should be the same.

- We can process the tree *bottom-up*. For every pair of sibling nodes, calculate their maximal path cost to a leaf.  
  - The cost difference between siblings must be incremented somewhere along the path of the lower-cost sibling.
  - For every non-leaf node:  
    - Let L and R be the maximal path sums of left and right subtree.  
    - We need to increment path costs to make them equal (pay abs(L-R)).
    - The parent’s maximal path sum becomes its own cost plus max(L, R).
  - The sum of all such sibling differences across the tree gives the minimum number of increments needed.

- **This cost balancing idea reduces redundant work and ensures minimum increments.**

### Corner cases to consider  
- Tree with only the root node (`n=1`), no increments needed.
- All costs are zero; only need to increment along a single path to match any higher-cost paths.
- Multiple paths already equal; no increments needed.
- Large perfect trees with deep levels.
- Sibling nodes have equal maximal descendant path cost—no increment needed.
- Skewed cost distributions among leaves.

### Solution

```python
def minIncrements(n, cost):
    # Helper function: returns max path sum from this node down,
    # and accumulates necessary increments in total
    total = 0  # Use nonlocal in the helper below

    def dfs(i):
        nonlocal total
        # Leaf node: just return its cost
        left = 2*i + 1
        right = 2*i + 2
        if left >= n and right >= n:
            return cost[i]
        # Post-order: process children first
        left_sum = dfs(left) if left < n else 0
        right_sum = dfs(right) if right < n else 0
        # To balance, add the difference between left & right path sums
        total += abs(left_sum - right_sum)
        # Max path sum for this node (itself + heavier child's path)
        return cost[i] + max(left_sum, right_sum)
    
    dfs(0)
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Every node is visited exactly once; work at each node is constant.

- **Space Complexity:** O(h) for recursion stack, where h is tree height (⌊log₂n⌋); O(1) extra otherwise, since we're not using any structures proportional to n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is not perfect (i.e., not all leaves at the same depth)?  
  *Hint: How would you generalize path sum computation and balancing for missing children?*

- Could the cost of a node ever be decremented, or are only increments allowed?  
  *Hint: Consider impact of allowing negative adjustments and how it changes the minimality.*

- Can you do it without recursion (i.e., iteratively or with explicit stack)?  
  *Hint: Think about level-order or stack-based traversal and how you might simulate post-order operations.*

### Summary
This problem uses a **bottom-up post-order traversal with cost balancing** — a common pattern for processing trees where lower subproblems inform parents' decisions. The pattern appears in tree dynamic programming and binary tree path problems, especially where sibling or path relations must be balanced. Recognizing the perfect-binary sibling relationship and processing from leaves upward is the key to efficiency.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Greedy(#greedy), Tree(#tree), Binary Tree(#binary-tree)

### Similar Problems
