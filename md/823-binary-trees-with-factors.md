### Leetcode 823 (Medium): Binary Trees With Factors [Practice](https://leetcode.com/problems/binary-trees-with-factors)

### Description  
Given an array of **unique integers** greater than 1, you can create binary trees where every **non-leaf node's value is the product** of its two children (whose values must also appear in the array; children can be repeated). Each integer can be used any number of times across different trees. The task is to **count the total number of different binary trees** you can build this way, with **each tree root being any value from the array**. The answer should be returned modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `arr = [2, 4]`  
Output: `3`  
Explanation:  
We can make these trees:  
- `[2]` (a single-node tree with root 2)  
- `[4]` (a single-node tree with root 4)  
- `[4, 2, 2]` (root 4, left child 2, right child 2, since 2×2=4)

**Example 2:**  
Input: `arr = [2, 4, 5, 10]`  
Output: `7`  
Explanation:  
Possible trees:
- `[2]`
- `[4]`
- `[5]`
- ``
- `[4, 2, 2]` (root 4, left/right children 2)
- `[10, 2, 5]` (root 10, left 2, right 5)
- `[10, 5, 2]` (root 10, left 5, right 2)

**Example 3:**  
Input: `arr = [18, 3, 6, 2]`  
Output: `12`  
Explanation:  
Multiple trees possible using combinations where parents equal the product of their children's values.

### Thought Process (as if you’re the interviewee)  

- **Brute-force:** For every number, try all binary tree structures recursively. For each root, try all pairs for children whose product equals the root. This quickly becomes exponential as the number of possible trees grows.
- **Observation:** Subtrees rooted at the same value can be reused. Count of trees with root `x` depends on factor pairs whose product is `x`.  
- **Optimization:**  
  - **Sort** the array for efficient factorization.
  - Use **Dynamic Programming (DP)**: `dp[x]` = number of trees where root is x.
  - For each x, consider every possible pair (a, b) such that x = a × b, and both a and b are in the array.
    - For each such pair, there are `dp[a] × dp[b]` ways (children can be swapped unless a = b — count appropriately).
    - Initialize `dp[x] = 1` (the singleton tree).
    - Sum up for all pairs.
- **Why DP works:** Subproblems overlap—the number of trees rooted at a value depends only on the number of trees for its factors which are smaller.

### Corner cases to consider  
- Empty array → output 0 (though per constraints, array has at least 1 value)
- Only one element → answer is 1
- No pairs multiply to any other in array → each single node is its only possible tree
- Large numbers with no possible factors in the array
- Duplicates not allowed (all values unique per constraints)
- Order of pairs: for factors a, b, if a ≠ b, both (a,b) and (b,a) create unique trees

### Solution

```python
def numFactoredBinaryTrees(arr):
    MOD = 10 ** 9 + 7
    arr.sort()
    dp = {}
    arr_set = set(arr)  # For fast lookup
    
    for x in arr:
        dp[x] = 1  # Singleton tree: x alone
        
        for a in arr:
            if a > x // 2:
                break  # No need to check further, since b <= a, and a > x/2 ⇒ b < 2
            if x % a == 0:
                b = x // a
                if b in arr_set:
                    # Each (a, b) forms a new tree; swap creates same tree unless a != b
                    dp[x] += dp[a] * dp[b] if a != b else dp[a] * dp[b]
                    if a != b:
                        dp[x] += dp[a] * dp[b]  # For (b, a)
        dp[x] %= MOD  # Keep result within modulo
    
    return sum(dp.values()) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)
  - For each element x, iterating up to n possible factors a.
  - For each x, factor pairs processed.
- **Space Complexity:** O(n)
  - DP dictionary (size equal to length of arr), plus a set for lookup.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array is not unique?  
  *Hint: How would duplicate values change how many trees could be constructed?*

- Can we generalize this for k-ary trees (instead of binary)?  
  *Hint: Instead of pairs, think about k-tuples whose product is the root.*

- How would you handle very large values (up to 10⁹) efficiently?  
  *Hint: Consider how to factor numbers efficiently or prune impossible checks.*

### Summary
This problem uses a classic **dynamic programming with factors** pattern, combining factors for each node in a **bottom-up** manner based on **sorted input** and storing results to avoid recomputation. Similar approaches apply to counting compositions or trees with values determined by relationships among child nodes (ex: unique BST counts, coin change, subset product problems). It’s a good example of DP with memoization leveraging multiplicative structure and combinatorial tree-building.

### Tags
Array(#array), Hash Table(#hash-table), Dynamic Programming(#dynamic-programming), Sorting(#sorting)

### Similar Problems
