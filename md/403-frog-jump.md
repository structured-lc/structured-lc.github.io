### Leetcode 403 (Hard): Frog Jump [Practice](https://leetcode.com/problems/frog-jump)

### Description  
You are given a list of **stones**’ positions in sorted ascending order, representing stones across a river.  
A frog starts on the first stone (position 0).  
- The very first jump **must be exactly 1 unit**.  
- After that, if the frog’s last jump was `k` units, it may jump `k-1`, `k`, or `k+1` units next (but not less than 1).
- The frog can **only land on stones** and cannot jump into the water.
The question is: **Can the frog reach the last stone?**  
Return `True` if possible, `False` otherwise.

### Examples  

**Example 1:**  
Input: `stones = [0,1,3,5,6,8,12,17]`  
Output: `True`  
*Explanation: The frog can jump as such:  
0 → 1 (1 unit), 1 → 3 (2), 3 → 5 (2), 5 → 8 (3), 8 → 12 (4), 12 → 17 (5).*

**Example 2:**  
Input: `stones = [0,1,2,3,4,8,9,11]`  
Output: `False`  
*Explanation: The frog cannot reach the last stone at position 11. There's a gap too large to cross.*

**Example 3:**  
Input: `stones = [0,2]`  
Output: `False`  
*Explanation: The first jump would have to be 2, but only a 1-unit jump is allowed for the first move.*

### Thought Process (as if you’re the interviewee)  
First, brute-force comes to mind: **DFS** can explore all jump sequences, but this is expensive due to the branching at each stone.

To optimize, notice every state is determined by:
- The current **stone’s position**
- The **last jump** made

So it's natural to use **DP with memoization**:  
- For each stone, track possible jump sizes that landed us there.
- At each stone, try k-1, k, or k+1 for the next jump, if those jumps are valid and land on stones.

We can use a table or a hash map:
- For each stone, store a set of **jump sizes** that get us there.
- From each state (stone, jump size), only explore forward, and “remember” visited states to prevent repeated work.

This is more efficient, as each (stone, jump) pair will be computed only once, and we never try jumps that would land in the water.

### Corner cases to consider  
- Only two stones: [0,1] should return True, but [0,2] should return False (can't make the first jump).
- Stones are not reachable by allowed jump sizes (e.g., large gap).
- The frog lands on a stone but has no future valid moves (dead end).
- Large input but all jumps are always 1 apart.
- Stones array is empty or has just  (trivial case).

### Solution

```python
def canCross(stones):
    # Edge case: must step on first stone to proceed
    if stones[1] != 1:
        return False

    stone_positions = set(stones)
    last_index = stones[-1]

    # For each stone position, remember jump sizes that can reach it
    dp = {stone: set() for stone in stones}
    dp[0].add(0)  # At stone 0, last jump was 0

    for stone in stones:
        for last_jump in dp[stone]:
            # Try jump sizes: k-1, k, k+1 (except <1)
            for step in [last_jump - 1, last_jump, last_jump + 1]:
                if step >= 1 and (stone + step) in stone_positions:
                    dp[stone + step].add(step)

    # If the last stone has any possible jump size, we can reach it
    return bool(dp[last_index])
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Outer loop iterates n stones.  
  - Inner loops: Up to 3 × n total “states” (since a stone can at most have one jump-size entry for every stone before it, but real number of states is smaller).  
  - So: O(n²) in the worst case.
- **Space Complexity:**  
  - O(n²) — Each stone can (theoretically) be reached by every possible jump-size from 1 to n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we always want to find the minimal **number of jumps** needed to reach the end?  
  *Hint: Try BFS — shortest path in state graph.*

- What if the frog could land anywhere, not just on stones?  
  *Hint: Generalizing — becomes a variant of integer partition, possibly infinite.*

- How would you optimize for huge input but mostly unit distances?  
  *Hint: Can you use pruning or a greedy check for special cases?*

### Summary
This problem uses **DP with memoization** over (stone, last jump size) state, a classic state-exploration pattern found in other “reachable vertices with constraints” problems.  
Patterns: DP with states, set tracking, hash map memoization.  
Related to word ladder, jump game II, and other constrained path-finding questions.  
Common technique: decompose the problem statefully (stone + last jump), avoid revisiting identical subproblems, and prune impossible paths early.


### Flashcard
Use DP with memoization keyed by (stone position, last jump size), trying k-1, k, k+1 jumps from each stone to avoid exponential DFS branching.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Minimum Sideway Jumps(minimum-sideway-jumps) (Medium)
- Solving Questions With Brainpower(solving-questions-with-brainpower) (Medium)
- Maximum Number of Jumps to Reach the Last Index(maximum-number-of-jumps-to-reach-the-last-index) (Medium)