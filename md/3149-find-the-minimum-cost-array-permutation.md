### Leetcode 3149 (Hard): Find the Minimum Cost Array Permutation [Practice](https://leetcode.com/problems/find-the-minimum-cost-array-permutation)

### Description  
You are given an array `nums` which is a permutation of `[0, 1, 2, ..., n-1]`.  
Your goal:  
Find a permutation `perm` of `[0, 1, 2, ..., n-1]` that minimizes the following score:  
score(perm) = |perm₀ − nums[perm₁]| + |perm₁ − nums[perm₂]| + ... + |permₙ₋₁ − nums[perm₀]|  
Return the permutation `perm` with the **minimum possible score**.  
If there are multiple answers, return the lexicographically smallest one.

### Examples  

**Example 1:**  
Input: `nums = [1,0,2]`,  
Output: `[0,1,2]`  
Explanation:  
score([0,1,2]) = |0-0| + |1-2| + |2-1| = 0 + 1 + 1 = 2  

**Example 2:**  
Input: `nums = [0,2,1]`,  
Output: `[0,2,1]`  
Explanation:  
score([0,2,1]) = |0-1| + |2-2| + |1-0| = 1 + 0 + 1 = 2  

**Example 3:**  
Input: `nums = [0,1,2,3]`,  
Output: `[0,1,2,3]`  
Explanation:  
score([0,1,2,3]) = |0-1| + |1-2| + |2-3| + |3-0| = 1+1+1+3 = 6  

### Thought Process (as if you’re the interviewee)  
- Brute-force:  
  Try all n! permutations of [0,1,...,n-1], calculate their cost, and track the minimum.  
  - **Drawback:** n! is feasible only for n ≤ 7 or so, but the constraints go up to n=14 (14! is huge).

- Optimize with DP and bitmask:  
  - Recognize this is a **Traveling Salesman Problem (TSP)** variant in disguise, where the "cities" are the values 0..n-1, and the "distance" from city a to city b is |a - nums[b]|.
  - DP state: (visited_mask, last_visited)  
    - visited_mask: which cities are already chosen (bitmask of n bits).
    - last_visited: index of last city in the sequence.
    - Value: (min_cost, corresponding path for tie-breaking).
  - Transition: For each unvisited node `next`, try moving there from `last_visited`, update the cost with |last_visited - nums[next]|, and continue until all nodes are visited.
  - To reconstruct the permutation, store the best path along with the cost.
  - After filling DP, close the cycle by adding the cost from the last node to the first node.

- Lexicographical order:  
  - When paths tie in cost, choose the one that's lexicographically smallest.  
  - Store both cost and actual path in your DP state and compare (cost, path) tuples.

- Why this approach?  
  - Bitmask DP (DP with state compression) is classic for small n (≤ 14).
  - Ensures you explore the exponential space, but with efficient pruning and memoization.

### Corner cases to consider  
- n = 2 (the smallest possible input).
- nums is already sorted.
- nums is in reverse order.
- Multiple permutations have the same minimal score.
- Check tie-breaking on lexicographical order.
- Large n (time/space).

### Solution

```python
def find_permutation(nums):
    n = len(nums)
    from functools import lru_cache

    # dp(mask, last): returns (min_cost, path as tuple) covering bits in mask, ends at 'last'
    @lru_cache(maxsize=None)
    def dp(mask, last):
        if mask == (1 << n) - 1:
            # Complete the cycle back to start (mask full, add last->first edge)
            cost = abs(last - nums[path[0]])
            return (cost, (last,))
        min_cost = float('inf')
        min_path = None
        for nxt in range(n):
            if not (mask & (1 << nxt)):
                nxt_cost, nxt_path = dp(mask | (1 << nxt), nxt)
                edge_cost = abs(last - nums[nxt]) if mask else 0  # first call: edge cost=0
                total_cost = edge_cost + nxt_cost
                candidate = (total_cost, (last,) + nxt_path)
                if (total_cost < min_cost) or (total_cost == min_cost and candidate[1] < min_path):
                    min_cost = total_cost
                    min_path = candidate[1]
        return (min_cost, min_path)
    
    # special step: try every starting node for the cycle, select best answer
    best_cost = float('inf')
    best_perm = None
    for start in range(n):
        cost, path = dp(1 << start, start)
        # Now, add the closing cost: |path[-1] - nums[path[0]]|
        cycle_cost = cost + abs(path[-1] - nums[path[0]])
        if (cycle_cost < best_cost) or (cycle_cost == best_cost and path < best_perm):
            best_cost = cycle_cost
            best_perm = path
    return list(best_perm)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ⁿ × n²)  
  - Explanation: Each DP state is (mask, last), with 2ⁿ masks × n last indices.  
    For each state, up to n transitions.  
    Since n ≤ 14, this is acceptable.

- **Space Complexity:** O(2ⁿ × n × n)  
  - DP memoization table stores min_cost and actual sequences (length n) for each (mask, last).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve it if n ≤ 20?
  *Hint: Explore ideas from TSP with Held-Karp, but storing paths grows impractical. Consider only cost and reconstruct actual paths separately.*

- Can you just return the minimum cost, not the path?
  *Hint: Remove explicit path tracking, save only cost. This is much more scalable!*

- If instead of |a - nums[b]|, the cost was arbitrary d[a][b], could your approach still work?
  *Hint: Absolutely, and this is the classic TSP with custom weight matrix.*

### Summary
This problem uses the **bitmask DP (Held-Karp)** pattern, like Traveling Salesman Problem variations, to efficiently explore all permutations for minimal cost circuit cycles using smart state compression. The key challenge is lexicographical tie-breaking, which requires tracking not just costs but actual paths in DP. This dynamic programming and state representation approach appears in many shortest Hamiltonian path/circuit or sequence permutation problems.