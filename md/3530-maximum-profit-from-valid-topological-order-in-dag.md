### Leetcode 3530 (Hard): Maximum Profit from Valid Topological Order in DAG [Practice](https://leetcode.com/problems/maximum-profit-from-valid-topological-order-in-dag)

### Description  
Given a **Directed Acyclic Graph (DAG)** with `n` nodes labeled from 0 to n-1, some directed edges, and each node assigned a **score**, you can process nodes in any **valid topological order** (i.e., respecting edge directions: if there is an edge u→v, you must process u before v).  
For a chosen ordering, if a node is assigned position \(p\) (1-based), it contributes scoreᵢ × p to the total profit.  
Your task: **Find the maximum total profit achievable over all valid topological orders.**


### Examples  

**Example 1:**  
Input: `n = 2, edges = [[0,1]], score = [2,3]`  
Output: `8`  
*Explanation: Only valid order is [0,1]. Node 0 at position 1: 2×1=2, node 1 at position 2: 3×2=6, total = 2+6 = 8.*

**Example 2:**  
Input: `n = 3, edges = [[0,1],[0,2]], score = [1,3,2]`  
Output: `14`  
*Explanation:  
Possible orders:  
- [0,1,2]: 1×1 + 3×2 + 2×3 = 1+6+6=13  
- [0,2,1]: 1×1 + 2×2 + 3×3 = 1+4+9=14 (max)*

**Example 3:**  
Input: `n = 3, edges = [], score = [1,2,3]`  
Output: `14`  
*Explanation:  
No dependencies, any permutation allowed.  
Best is [3,2,1] at positions 1,2,3: 3×1 + 2×2 + 1×3 = 3+4+3=10.  
Actually, [1,2,3] gives 1×1 + 2×2 + 3×3 = 1+4+9=14. So, output is 14.*


### Thought Process (as if you’re the interviewee)  
- The brute-force idea is to generate all valid topological orders (which can be exponentially many) and compute the total profit for each, returning the maximum.  
  - But this is infeasible for large `n` due to factorial complexity.

- To optimize, recognize that:
  - The *profit* depends on node positions, and for every subset of scheduled nodes, we can try to schedule an available node at the next position.
  - Use **dynamic programming (DP) with bitmask** to represent which nodes are already placed.
  - For each DP state (i.e., set of placed nodes), for every node not yet placed whose dependencies are all already scheduled, try placing it next, and update the profit.
  - Track, for each node, a bitmask of prerequisites. For each DP state, check which nodes are available to schedule next.
  - This approach is standard for "enumerate all orderings with constraints" in small DAGs (`n ≤ 16`).

- Why this approach is optimal:
  - DP size is O(2ⁿ), with O(n²) possibilities per subset/state, which is tractable for n up to 15 or 16.


### Corner cases to consider  
- n = 0 (empty graph, should return 0)
- No edges (all nodes independent; orderings are unrestricted)
- Single node (return its score × 1)
- Multiple nodes with same score
- Long chains (total dependency)
- Disconnected graphs (multiple components)
- Cycles (should not occur, as input is a DAG)
- Edge case where some nodes have zero score


### Solution

```python
def maxProfit(n, edges, score):
    # need[i]: bitmask representing prerequisites of node i
    need = [0] * n
    for u, v in edges:
        need[v] |= (1 << u)    # v needs u to be before it

    N = 1 << n   # total number of states
    dp = [-1] * N    # dp[mask]: max profit achievable for nodes in 'mask'
    dp[0] = 0        # empty set, profit is 0

    for mask in range(N):
        if dp[mask] == -1:
            continue   # skip uninitialized states

        # Next position will be bit_count(mask) + 1
        pos = bin(mask).count('1') + 1

        # Try scheduling every node i not yet scheduled in mask
        for i in range(n):
            if (mask >> i) & 1:
                continue  # already scheduled

            # All prerequisites must be scheduled
            if (mask & need[i]) != need[i]:
                continue

            new_mask = mask | (1 << i)
            profit = dp[mask] + score[i] * pos
            dp[new_mask] = max(dp[new_mask], profit)

    return dp[N-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n × 2ⁿ): For each mask (2ⁿ states), try up to n nodes per mask, checking prerequisites and updating.
- **Space Complexity:**  
  - O(2ⁿ): For the DP table and need[] arrays.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the graph contains cycles?
  *Hint: How would you detect a cycle in a directed graph before running the DP?*

- How do you construct and store all possible topological orders for a DAG?
  *Hint: Consider a DFS with visited set and available nodes queue.*

- Can this be optimized for very large n (say, n > 20)?
  *Hint: Think about heuristic/approximate methods, or greedy orderings for special DAGs.*


### Summary
This problem is a classic application of **DP with bitmasking over subsets** in the context of DAG scheduling and topological orders. The approach efficiently maximizes a position-based weighted sum when only certain execution orders are allowed. The DP technique used here is broadly applicable to other permutation-enumeration problems with dependency constraints, common in scheduling, course planning, and some matching or assignment problems.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Graph(#graph), Topological Sort(#topological-sort), Bitmask(#bitmask)

### Similar Problems
