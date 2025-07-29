### Leetcode 1569 (Hard): Number of Ways to Reorder Array to Get Same BST [Practice](https://leetcode.com/problems/number-of-ways-to-reorder-array-to-get-same-bst)

### Description  
Given an array `nums` which is a permutation of the integers from 1 to n, you must build a Binary Search Tree (BST) by inserting each number in order from left to right.  
Your task: **Count the number of different ways to reorder the array so that, when inserted into a BST in order, the BST structure stays exactly the same as the original.**  
Return this count **minus 1** (excluding the original order itself), modulo 1,000,000,007.  

- For example: If `nums = [2, 1, 3]`, both `[2,1,3]` and `[2,3,1]` build the same BST, but `[3,2,1]` builds a different BST.

**BST property:**  
All numbers less than a node go in the left subtree, all greater go to the right subtree.

### Examples  

**Example 1:**  
Input: `[2, 1, 3]`  
Output: `1`  
Explanation:  
Both `[2,1,3]` and `[2,3,1]` produce:  
```
    2
   / \
  1   3
```
Only one alternative order (`[2,3,1]`). So return 1.

**Example 2:**  
Input: `[3, 4, 5, 1, 2]`  
Output: `5`  
Explanation:  
All reorderings that maintain the BST structure built by `[3,4,5,1,2]` are:
- `[3,4,5,1,2]`
- `[3,1,4,5,2]`
- `[3,1,2,4,5]`
- `[3,4,1,5,2]`
- `[3,4,1,2,5]`
- `[3,1,4,2,5]`
Exclude the original, so return 5.

**Example 3:**  
Input: `[1, 2, 3]`  
Output: `0`  
Explanation:  
Any reordering will change the shape. Only `[1,2,3]` keeps the structure:  
```
    1
     \
      2
       \
        3
```
Return 0.

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Try all possible reorderings (n! permutations), build BST for each, and count matches.  
  This is infeasible for n > 8 due to factorial time.

- **Recursive Insight:**  
  The first number must be root.  
  The rest splits into left subtree (all < root) and right subtree (all > root).  
  For a BST, the left and right subtree orderings are independent (recursive property).

- **Combinatorics:**  
  At each step, need to select positions for left subtree elements among all remaining, and the rest go to the right subtree.  
  For arrays left and right of root (of sizes l and r), the total number of ways is:
  - Ways = C(l + r, l) × ways_left × ways_right  
    (placing all left elements in any l chosen slots, right in r, order recursively preserved)

- **Memoization:**  
  Use memoization to avoid recalculating for the same subtree arrays.

- **Why this approach:**  
  Only need to compute binomial coefficients (for ordering choices), and recursively solve subproblems.  
  This makes a highly efficient solution compared to brute-force.

### Corner cases to consider  
- Empty array (`[]`): should return 0.
- Array with one element: 0 ways (no reordering).
- Arrays in strictly ascending or descending order (linked-list BST): only 1 way.
- Original BST is a complete binary tree.
- Large n: make sure factorials/combination calculations don't overflow.

### Solution

```python
MOD = 10**9 + 7

def numOfWays(nums):
    # Precompute Pascal's triangle for combinations
    from math import comb

    # For performance with large n, build all combinations up to n
    N = len(nums) + 1
    combs = [[1] * N for _ in range(N)]
    for n in range(N):
        for k in range(1, n):
            combs[n][k] = (combs[n-1][k-1] + combs[n-1][k]) % MOD

    # Memoization on tuple(nums)
    from functools import lru_cache

    @lru_cache(None)
    def ways(arr):
        n = len(arr)
        if n <= 2:
            return 1  # can't rearrange further

        root = arr[0]
        left = tuple(x for x in arr[1:] if x < root)
        right = tuple(x for x in arr[1:] if x > root)

        l, r = len(left), len(right)
        # Number of ways to distribute l left and r right elements
        total = combs[l + r][l] * ways(left) % MOD
        total = total * ways(right) % MOD
        return total

    # Subtract 1 (don't count the original order itself)
    return (ways(tuple(nums)) - 1) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  Each recursive call splits into left/right subarrays, and each call calculates combinations. Memoization ensures no repeated computation. Most work is in precomputing combinations and recursive tree splits.

- **Space Complexity:** O(n²)  
  Needed for memoization of subproblems, and storage for Pascal's triangle up to size n×n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large input arrays (n > 1000)?
  *Hint: Can you optimize the binomial coefficient calculation further? Modular inverses/factorials?*

- Can you extend this to allow duplicate numbers?  
  *Hint: What changes would the BST property require for equal values?*

- How would this change for arbitrary BSTs (not permutations from 1..n)?  
  *Hint: Is the approach generalizable to trees with arbitrary labels?*

### Summary
This problem is a classic application of **recursion + combinatorics** in tree problems.  
It relies on breaking the problem into left/right subtrees, then using binomial coefficients to count interleavings that preserve subtree orderings.  
The pattern appears in counting unique BSTs, reconstructing trees, and combinatorial problems where order and structure are constrained—making it a key idea for advanced interviews.