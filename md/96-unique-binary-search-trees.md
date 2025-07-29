### Leetcode 96 (Medium): Unique Binary Search Trees [Practice](https://leetcode.com/problems/unique-binary-search-trees)

### Description  
Given an integer **n**, find how many structurally unique **Binary Search Trees** (BSTs) can be formed using exactly the values 1, 2, ..., n.  
The tree must follow BST properties: every node's left subtree contains only values less than the node, and the right subtree only values greater.

You need to return how many structured layouts of BSTs are possible, not the concrete tree outputs.

### Examples  

**Example 1:**  
Input: `n = 3`  
Output: `5`  
*Explanation: The 5 unique BSTs that can be built with values 1,2,3 are:*
```
  1       3       3      2      1
   \     /       /      / \      \
    2   2       1      1   3      3
     \ /         \                /
      3 1         2              2
```

**Example 2:**  
Input: `n = 1`  
Output: `1`  
*Explanation: Only one BST can be constructed, which is a single node tree (`1`).*

**Example 3:**  
Input: `n = 2`  
Output: `2`  
*Explanation: For two nodes, there are two BSTs:*
```
  1       2
   \     /
    2   1
```

### Thought Process (as if you’re the interviewee)  
First, consider the brute-force approach of listing every possible tree—this quickly becomes intractable, because the number of unique trees grows very fast with n.  
Instead, notice that for a BST with n nodes, any value i ∈ [1, n] can be the root.  
- For root i, the left subtree has (i-1) possible values, and the right subtree has (n-i) values.  
- The total number of BSTs with n nodes is the sum over all possible roots i of (number of BSTs using i-1 nodes) × (number using n-i nodes).

This recursive property leads directly to a **Dynamic Programming** solution.  
The DP recurrence relation is:
dp[n] = ∑ dp[left] × dp[right]  
where left + right = n-1 and left, right ≥ 0.

This is known as the **Catalan number** sequence in combinatorics.

We fill dp = 1 and dp[1] = 1 as base cases (empty and single node trees), and build up for each higher n.

### Corner cases to consider  
- n = 0 (should return 1; represents the empty tree)
- n = 1 (only one single-node tree possible)
- n is large (test DP memoization efficiency)
- Confirm with small n (manual verification)

### Solution

```python
def numTrees(n):
    # dp[i] will store number of unique BSTs using i nodes
    dp = [0] * (n + 1)
    dp[0] = 1   # Empty tree
    dp[1] = 1   # Single node tree

    for nodes in range(2, n + 1):
        for root in range(1, nodes + 1):
            left = root - 1           # number of nodes in left subtree
            right = nodes - root      # number in right subtree
            dp[nodes] += dp[left] * dp[right]
    return dp[n]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²). For each nodes in [2, n], we loop over each possible root in [1, nodes], and each operation is constant time.
- **Space Complexity:** O(n). We store a single dp array of size n+1.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we need to return all unique BST structures, not just their count?  
  *Hint: Consider recursively generating left/right subtree trees for each root, and combining them.*

- The sequence above is related to Catalan numbers. Can you compute the answer with a closed-form formula?  
  *Hint: Explore the formula Catalan(n) = (2n)! / (n! × (n+1)!).*

- How would the answer change if duplicate values were allowed in the BST?  
  *Hint: The BST property allows or disallows duplicates based on convention; clarify and adjust recursion if needed.*

### Summary
This problem demonstrates the classic **DP on sequences** pattern, using the structure of BSTs and their combinatorial properties. The counting is linked to the Catalan sequence, which appears in many combinatorial problems like counting valid parentheses or polygon triangulations. The recursive DP pattern is commonly applicable to problems where a structure can be divided around a root or pivot in all possible ways.