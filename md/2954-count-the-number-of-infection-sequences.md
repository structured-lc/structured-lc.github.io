### Leetcode 2954 (Hard): Count the Number of Infection Sequences [Practice](https://leetcode.com/problems/count-the-number-of-infection-sequences)

### Description  
You're given `n` children numbered 0 to n-1 standing in a queue. Some children, identified by the sorted array `sick`, are already infected with a contagious disease. Each second, any infected child can infect one of their immediate neighbors (left or right) if they are not already infected, but only one new child is infected per second. Ultimately, all children will be infected.  
An “infection sequence” is the order in which all originally healthy children get infected. You must return the number of *distinct* possible infection sequences (orders), modulo 10⁹+7.  
The sequence should not include children who were already sick at the start.

### Examples  

**Example 1:**  
Input: `n = 5`, `sick = [0, 4]`  
Output: `4`  
Explanation.  
Uninfected = [1, 2, 3]. The possible infection orderings are:  
- [1, 2, 3]  
- [1, 3, 2]  
- [3, 2, 1]  
- [3, 1, 2]  
The infection can spread inward from either end.

**Example 2:**  
Input: `n = 4`, `sick = [1]`  
Output: `3`  
Explanation.  
Uninfected = [0, 2, 3]. Possible infection sequences:  
- [0, 2, 3]  
- [0, 3, 2]  
- [2, 0, 3]  

**Example 3:**  
Input: `n = 7`, `sick = [2, 4]`  
Output: `30`  
Explanation.  
Uninfected = [0, 1, 3, 5, 6].  
There are 30 valid infection orders for spreading out from 2 and 4.

### Thought Process (as if you’re the interviewee)  
First, I’d try a simulation: in each step, pick a possible neighbor to infect. However, simulating all possibilities quickly becomes computationally infeasible for large n.

Notice the infection *fronts* can only propagate outwards from the blocks of already-infected children in `sick`. The intervals between `sick` entries form *regions*; each region is a block of contiguous healthy children between two infected positions (or between an infected and the start/end).

- For each such region, the infection can only enter from its boundary sick children (possibly both ends, or only one edge if at the ends).
- The number of ways to infect a region of length `k` from both ends is equivalent to the *number of ways to interleave* left and right fronts (a combinatorial problem).

This leads to a **combinatorics** solution:
- Let len₁, len₂, ..., lenₘ be the length of each healthy block.
- For each region, if both endpoints are infected, the number of ways is 2ˡᵉⁿ (since infection can start from both ends).
- If not both endpoints are infected (e.g., at the edge), infection spreads only from one side—only 1 way.
- The final answer is thus:
  - The multinomial coefficient for all healthy children (number of ways to order their infection),
  - Divided by the product of factorials for the size of each block (because the order within a block is constrained), multiplied by the number of ways internal to each block (which is a catalan number for 2-sided spreading).

But the optimal solution is:
- Let gaps be the size of each block of healthy children between sick children.
- The total number of infection orders = comb(total healthy, gap₁, gap₂, ..., gapₖ)
- For each internal segment (not touching the left or right end of queue), the infection can happen from both sides, so multiply by 2^(gap - 1) for all such blocks (since leftmost and rightmost blocks can only be infected from 1 side).

We can use **modular arithmetic**, **precomputed factorials**, and **modular inverses** for efficiency.

### Corner cases to consider  
- All children already sick: sick length = n (no uninfected)
- Only one healthy child
- All healthy except one sick
- Sick kids at the start or end
- More than one contiguous block of healthy children
- n very large (test modular arithmetic, performance)

### Solution

```python
MOD = 10**9 + 7

def count_infection_sequences(n, sick):
    # Precompute factorials and their inverses for fast binomial/multinomial coefficients
    max_n = n + 1
    fac = [1] * max_n
    inv_fac = [1] * max_n
    for i in range(1, max_n):
        fac[i] = fac[i - 1] * i % MOD
    inv_fac[-1] = pow(fac[-1], MOD - 2, MOD)
    for i in range(max_n - 2, -1, -1):
        inv_fac[i] = inv_fac[i + 1] * (i + 1) % MOD

    # Identify gaps of uninfected children
    blocks = []
    # First block: from 0 to first sick
    if sick[0] > 0:
        blocks.append(sick[0])
    # Internal blocks: between sick kids
    for i in range(1, len(sick)):
        block = sick[i] - sick[i-1] - 1
        if block > 0:
            blocks.append(block)
    # Last block: from last sick to n-1
    if sick[-1] < n - 1:
        blocks.append(n - 1 - sick[-1])

    total_healthy = n - len(sick)

    # Start from multinomial coefficient: permuting all healthy, divide by block!! to preserve internal block order
    ans = fac[total_healthy]
    for b in blocks:
        ans = ans * inv_fac[b] % MOD

    # For every internal block (with two infected neighbors), multiply by 2ᵇˡᵒᶜᵏ s.t. block > 0
    # Only internal blocks (not at the start/end)
    for i in range(1, len(sick)):
        block = sick[i] - sick[i-1] - 1
        if block > 0:
            ans = ans * pow(2, block - 1, MOD) % MOD

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Precomputing factorials and inverses takes O(n). The rest is O(len(sick)) for block logic and multiplications.
- **Space Complexity:** O(n)  
  O(n) space for precomputed factorials/inverses.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if each sick child could infect more than just immediate neighbors?  
  *Hint: Consider BFS or dynamic programming for more general neighborhoods.*

- What if the infection could infect multiple neighbors in one second?  
  *Hint: State or DP-based modeling is needed instead of strict sequence permutations.*

- Can you output not just the count but all possible infection sequences for small n?  
  *Hint: Try backtracking or BFS with explicit sequence construction, but only feasible for small input sizes.*

### Summary
This problem uses a combinatorial pattern, combining multinomial coefficients for global orderings and powers of 2 for internal block spread possibilities (blocks between sick children). This type of combinatorics occurs in interval infection, independent subproblems, and queue spreading problems—other scenarios include painting, distributing tasks, or simulating constrained propagations in queues or grids. The key is converting propagation constraints into mathematical structure for efficient computation.

### Tags
Array(#array), Math(#math), Combinatorics(#combinatorics)

### Similar Problems
- Contain Virus(contain-virus) (Hard)
- Amount of Time for Binary Tree to Be Infected(amount-of-time-for-binary-tree-to-be-infected) (Medium)