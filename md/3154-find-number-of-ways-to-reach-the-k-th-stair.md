### Leetcode 3154 (Hard): Find Number of Ways to Reach the K-th Stair [Practice](https://leetcode.com/problems/find-number-of-ways-to-reach-the-k-th-stair)

### Description  
Given a non-negative integer k, you start on stair 1 (not 0). You can perform two operations any number of times:
- Go **down** 1 stair (if you're not on stair 0 and you didn't go down on the previous move).
- **Jump up** 2ʲ stairs (where j is number of jumps made so far, initially 0; after each jump `jump` increments by 1).
Return **the total number of distinct sequences of operations that leave you at exactly stair k**.  
You can reach k, then move away and return again: every sequence that ends at k is counted.

### Examples  

**Example 1:**  
Input: `k = 0`  
Output: `1`  
Explanation: Only possible way is: start at 1, go down by 1, reach 0.

**Example 2:**  
Input: `k = 1`  
Output: `4`  
Explanation:  
- Stay at stair 1 (0 operations).  
- Jump up to stair 3 (using jump-0), then go down to 2, then down to 1 (not using 'down' consecutively).  
- Go up (jump-0) to 3, down to 2, then up (jump-1) to 4, then down to 3, down to 2, down to 1 (but can't use down consecutively).  
- Do a jump up and mix with down operations respecting the rules — total ways are 4.

**Example 3:**  
Input: `k = 2`  
Output: `2`  
Explanation:  
- From 1, jump up with jump-0 to 3, then down to 2.  
- From 1, down to 0, jump is still at 0, so jump up to 2 (starting from 0).

### Thought Process (as if you’re the interviewee)  
First, I would model the problem as a **state search**: at each state, store (current stair, can_down, jump_count).  
- The base recursive idea: from (stair, last_was_down, jump), you can either (if last was not down & stair > 0) do a down, or always jump up.  
- **Brute force**: Try all possibilities. This runs into exponential time due to overlapping subproblems.  

To optimize:
- **Memoization**: If we memoize by (stair, can_do_down, jump), we avoid recomputation.
- **Observation**: Since each jump is of size 2ʲ, the total distance Alice can cover after all jumps is predictable.  
  Let’s suppose after N jumps, the total is: 1 + 2⁰ + 2¹ + ... + 2ⁿ⁻¹ = 1 + (2ⁿ - 1) = 2ⁿ.  
  After jumping n times, to reach k exactly, we can do some number of down operations (never consecutively, at most n+1 places to insert them).  
- So, for each possible jump count, calculate #ways to place ‘down’ operations such that stair lands on k, and count the ways using combinations.

Final approach: For jumps from 0 to 29 (since values grow rapidly), see if number of downs = 2ʲ - k is non-negative and ≤ j+1, then accumulate C(j+1, downs).

### Corner cases to consider  
- k == 0 (minimal stair, only 1 way: direct down from 1)
- k == 1 (staying at start)
- Very large k (out of reach except with huge jumps)
- Downs more than possible, or negative
- Multiple ways to do 'down', but not allowed consecutively
- No way to reach exactly k (should return 0)

### Solution

```python
import math

def waysToReachStair(k: int) -> int:
    # Max jump needed: 2^30 > 10^9
    kMaxJump = 29
    total = 0

    for jumps in range(kMaxJump + 1):
        downs = (1 << jumps) - k
        if downs < 0 or downs > jumps + 1:
            continue
        # Place 'downs' in (jumps + 1) places (no adjacent downs)
        total += math.comb(jumps + 1, downs)
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  Up to 30 possible jump numbers, each constant work (math.comb); does not depend on k.
- **Space Complexity:** O(1)  
  Only a few variables for iteration, no recursion or DP table used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we wanted all *paths*, not just the count?
  *Hint: Consider building the paths using recursion or BFS, not just counting ways.*

- What if ‘down’ could be used any number of times, even consecutively?
  *Hint: The reasoning about where to place ‘down’s changes; model via DP.*

- What is the minimal jump sequence for reaching k, not number of ways?
  *Hint: Greedy or binary representation; think about bit manipulation.*

### Summary
This problem uses a non-trivial combinatorial dynamic programming approach: for each possible **jump** count, count ways to distribute ‘down’ operations using combinations.  
The pattern (split into non-consecutive insertions) comes up in problems involving forbidden adjacency, and is related to stars-and-bars counting.  
Such combinatorial insight is common in stair climbing, grid walking, or sequence formation with forbidden moves.