### Leetcode 3647 (Medium): Maximum Weight in Two Bags [Practice](https://leetcode.com/problems/maximum-weight-in-two-bags)

### Description  
Given \( n \) items where the iᵗʰ item weighs weights[i], and two bags with capacity w₁ and w₂. You can put each item into at most one bag (or leave it out). Find the **maximum total weight** that can be put into both bags without exceeding capacities.

The goal:  
Pick a subset of items for bag 1 and another (disjoint) subset for bag 2 so that weight in bag 1 ≤ w₁, weight in bag 2 ≤ w₂, total weight is maximized, each item used at most once.

### Examples  

**Example 1:**  
Input: `weights = [2, 3, 5], w1 = 5, w2 = 5`  
Output: `10`  
*Explanation: Put 2,3 in bag 1 (2+3=5), 5 in bag 2. Total=5+5=10.*

**Example 2:**  
Input: `weights = [1, 2, 3, 4], w1 = 5, w2 = 5`  
Output: `10`  
*Explanation: Put 1,4 in bag 1 (1+4=5), 2,3 in bag 2 (2+3=5). Total=5+5=10.*

**Example 3:**  
Input: `weights = [6, 7, 8], w1 = 8, w2 = 8`  
Output: `8`  
*Explanation: Only one of the weights (8) fits in either bag, so total = 8.*

### Thought Process (as if you’re the interviewee)  
The problem is a variation of the **0/1 knapsack problem** but with two bags and a constraint that each item can only appear in one bag or not at all.

- **Brute-force idea:**  
  Try all ways to assign items into bag 1, bag 2, or neither (3 possibilities per item). For n items, 3ⁿ combinations. For each, check both bag sum ≤ capacity and keep the best total. This is not efficient for n > 12.

- **Optimization:**  
  Use **dynamic programming** — define dp[i][w₁][w₂] as the maximum weight using items from i to n, with capacities w₁ and w₂ left. For each item:  
  - Exclude: dp[i+1][w₁][w₂]  
  - Put in bag 1 if fits: dp[i+1][w₁ - weights[i]][w₂] + weights[i]  
  - Put in bag 2 if fits: dp[i+1][w₁][w₂ - weights[i]] + weights[i]

  Top-down memoization (DFS with cache) or bottom-up DP with a 3D table.  
  Complexity: O(n × w₁ × w₂).

- **Trade-offs:**  
  Fast enough if max(w₁, w₂) and n are not enormous (typical knapsack limits: n ≤ 100, w₁, w₂ ≤ 1000).

### Corner cases to consider  
- weights is empty  
- n = 1 (one item, fits in zero/one/two bags or neither)  
- weights[i] > w₁ and > w₂ (item doesn’t fit anywhere)  
- All items together much less than capacities (can just take all)  
- w₁ = 0 or w₂ = 0 (one bag cannot hold anything)  
- Duplicate weights

### Solution

```python
def maximum_weight_in_two_bags(weights, w1, w2):
    n = len(weights)
    # dp[i][j]: max total weight with bag1 capacity i, bag2 capacity j
    dp = [[0] * (w2 + 1) for _ in range(w1 + 1)]
    
    for weight in weights:
        # We must copy and iterate backward to not overwrite states needed for current round
        for i in range(w1, -1, -1):
            for j in range(w2, -1, -1):
                # Try to put weight into bag1 if possible
                if i >= weight:
                    dp[i][j] = max(dp[i][j], dp[i - weight][j] + weight)
                # Try to put weight into bag2 if possible
                if j >= weight:
                    dp[i][j] = max(dp[i][j], dp[i][j - weight] + weight)
    return dp[w1][w2]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × w₁ × w₂)  
  For each weight, update all possible capacities of two bags.
- **Space Complexity:** O(w₁ × w₂)  
  Only two-dimensional dp needed, since for each item we can refer to states from the previous step.

### Potential follow-up questions (as if you’re the interviewer)  

- If n or capacities are very large, can you optimize space?
  *Hint: Try using two dp layers, or compress further if only 1D array is needed (check transition dependencies).*

- What if you want to recover the exact assignment of items to bags?
  *Hint: Trace-back from dp array, or keep a "choice" array.*

- What if each bag must contain at least one item?
  *Hint: Add extra check in assignment to ensure neither bag is empty; try masking or post-processing on dp.*

### Summary
This is a classic **multi-dimensional knapsack** problem, solved by dynamic programming (DP). Pattern: "0/1 knapsack with multiple containers, each item one container only." The approach generalizes to more than 2 bags (at a cost in complexity), or to optimize subsets over multiple groups. Common in packing, partitioning, resource allocation.

### Tags

### Similar Problems
