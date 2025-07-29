### Leetcode 1931 (Hard): Painting a Grid With Three Different Colors [Practice](https://leetcode.com/problems/painting-a-grid-with-three-different-colors)

### Description  
Given a grid of size m × n, you must paint each cell one of three colors: red, green, or blue. The key constraint is that no two adjacent cells (sharing a side: vertically or horizontally) can have the same color. Your task is to determine in how many ways you can paint the grid under these rules. Return your answer modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `m = 1, n = 1`  
Output: `3`  
*Explanation: There is only one cell. You can choose any of 3 colors.*

**Example 2:**  
Input: `m = 1, n = 2`  
Output: `6`  
*Explanation: First cell can be R/G/B, second cell any of remaining 2. So 3 × 2 = 6 ways.*

**Example 3:**  
Input: `m = 5, n = 5`  
Output: `580986`  
*Explanation: The total number of valid colorings for the 5 × 5 grid is 580986, calculated via DP with state compression (details in logic below).*

### Thought Process (as if you’re the interviewee)  

- Brute-force:  
  Try all possible colorings (each cell has 3 choices) and filter out the ones with adjacent cells of same color.  
  This has complexity 3^(m×n), so infeasible for larger inputs due to exponential explosion.

- Observation:  
  For each column, the coloring depends only on the previous column. Each column's configuration must be valid (no adjacent cells with same color), and across columns, no cell aligns with the same color as the cell to its left.

- Optimization:  
  Encode each column's color choices as a "state" (with 3 choices per row ⇒ up to 3ᵐ different possible columns). For each possible state, precompute which other states are valid to pair next-to-each-other. This reduces the problem to DP:  
  - DP[col][state] = number of ways to build the first 'col' columns ending with 'state'.
  - Transition: DP[next_col][next_state] += DP[cur_col][cur_state] for all next_state compatible with cur_state.
  - Start by enumerating all valid states for one column, then DP column by column up to n.

- Why DP + Bitmasking?  
  Both vertical and horizontal adjacency constraints make the problem hard. Representing each column as a single integer ("bitmask" approach, actually a "tritmask"—base 3, not base 2—for 3 colors) allows easy and fast state transitions.

- Trade-offs:  
  For m > 5, the number of possible states (3ᵐ) grows quickly. But m ≤ 5, so we can precompute and store all possible states and transitions. Time and space is exponential in m but linear in n.

### Corner cases to consider  
- m or n is 1 (single row/column).
- Smallest grid (1 × 1), largest grid (5 × 1000).
- Edge behavior: All colors available initially, then removing forbidden ones as you build up columns.
- Ensure you don't miss vertical adjacency within a column, or horizontal adjacency between columns.

### Solution

```python
MOD = 10**9 + 7

def numOfWays(m, n):
    # Ensure m <= n for efficiency (since #states depends on m)
    if m > n:
        m, n = n, m

    # Generate all valid "states" for a single column of height m:
    # Each state is a tuple of length m with values 0,1,2; no adjacent same
    from itertools import product

    def is_valid(col):
        for i in range(m - 1):
            if col[i] == col[i + 1]:
                return False
        return True

    state_list = []
    state_id_map = {}  # tuple -> index
    for tpl in product((0, 1, 2), repeat=m):
        if is_valid(tpl):
            idx = len(state_list)
            state_list.append(tpl)
            state_id_map[tpl] = idx

    num_states = len(state_list)

    # Precompute compatible transitions for fast dp lookups
    transitions = [[] for _ in range(num_states)]
    for i, a in enumerate(state_list):
        for j, b in enumerate(state_list):
            compatible = True
            for k in range(m):
                if a[k] == b[k]:
                    compatible = False
                    break
            if compatible:
                transitions[i].append(j)

    # DP[col][state_id]: number of ways to paint first 'col' columns ending with state 'state_id'
    dp = [1] * num_states  # Base: first column, any valid column state

    for col in range(1, n):
        new_dp = [0] * num_states
        for prev_id in range(num_states):
            for next_id in transitions[prev_id]:
                new_dp[next_id] = (new_dp[next_id] + dp[prev_id]) % MOD
        dp = new_dp

    return sum(dp) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × s²), where s = number of valid column states (≈60 for m=5).  
  - For m = 5, s ≤ 3⁵ = 243, but only valid assignments (where no two adjacent cells are the same) are accepted.
  - For each column (n iterations), for each prev_state and compatible next_state, we update dp.

- **Space Complexity:**  
  O(s), as we only store the dp array for current and (optionally) previous column, plus transition lists (O(s²)).

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if there were 4 or more colors?
  *Hint: What's the impact on state encoding and combinatorics?*

- Can this approach be generalized for other grid adjacency constraints (e.g., diagonal adjacency)?
  *Hint: How would the state transitions change?*

- What if both m and n could be up to 1000?
  *Hint: What's the bottleneck, and can you reduce dimensionality or use symmetry?*

### Summary
This problem is a **DP with State Compression** (tritmask/bitmask DP) classic. It's common in grid coloring, tiling, or "no adjacent same" constraint problems, especially when one dimension is small. Enumerate all local states, and use transitions to propagate valid configurations across the larger dimension. This pattern is widely applied in advanced DP, especially for problems involving tight local constraints on grids or sequences.