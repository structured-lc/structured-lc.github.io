### Leetcode 920 (Hard): Number of Music Playlists [Practice](https://leetcode.com/problems/number-of-music-playlists)

### Description  
Given **n unique songs**, you want to create a playlist of length **goal**.  
Constraints:
- Every song must be played at least once.
- You cannot replay a song unless at least **k** other songs have been played.
Your task: **Return the number of possible playlists, modulo 1_000_000_007.**

### Examples  

**Example 1:**  
Input: `n=3, goal=3, k=1`  
Output: `6`  
*Explanation: All 3! = 6 arrangements (permutations): [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]. Each song is played exactly once and k=1 allows this.*

**Example 2:**  
Input: `n=2, goal=3, k=0`  
Output: `6`  
*Explanation: Playlists like [1,1,2], [1,2,1], [2,1,2], [1,2,2], [2,1,1], [2,2,1] are possible. Songs can repeat immediately when k=0.*

**Example 3:**  
Input: `n=2, goal=3, k=1`  
Output: `2`  
*Explanation: Only [1,2,1] and [2,1,2] are valid. Repeats only allowed after 1 other song.*

### Thought Process (as if you’re the interviewee)  
A brute force idea: Generate all sequences of length **goal** using **n** songs, track the last k played, and check if every song appears at least once.  
That’s infeasible since the number of sequences is exponential—too slow for larger **n** or **goal**.

**Let’s optimize:**
- This is classic **dynamic programming**. State: (goal slots left, number of unique songs used).
  - When you add a song, two choices:
    - Add a **new** song: only if we haven’t yet used all n. Choices = n−used.
    - Add an **old** song (not the last k songs): choices = used−k (must be >0).
    - Recurrence:
      - f(goal, used) = (f(goal−1, used−1) × (n−(used−1))) + (f(goal−1, used) × max(used−k, 0))

**Why this approach:**
- Uses bottom-up or top-down memoization.
- The state space is small enough for DP, and you avoid recomputing subproblems.
- Handles constraints exactly (each song at least once, and “k” rule).

### Corner cases to consider  
- k=0: Songs can repeat immediately.
- n > goal: Impossible—return 0 (can't use every song at least once).
- k ≥ n: After each song, you have to play at least n other songs; so no repeats allowed—once all n have played, can’t add more.
- n = 1 (single unique song).
- goal < n (can’t use all songs at least once).
- goal = n (play each once, like permutations).

### Solution

```python
def numMusicPlaylists(n: int, goal: int, k: int) -> int:
    MOD = 10 ** 9 + 7
    # dp[i][j]: number of playlists of length i with j unique songs used
    dp = [[0] * (n + 1) for _ in range(goal + 1)]
    dp[0][0] = 1

    for i in range(1, goal + 1):  # playlist length
        for j in range(1, n + 1):  # unique songs used
            # Add a new unique song
            dp[i][j] += dp[i - 1][j - 1] * (n - (j - 1))
            # Add an old song (already counted, but at least k other songs between)
            if j > k:
                dp[i][j] += dp[i - 1][j] * (j - k)
            dp[i][j] %= MOD

    return dp[goal][n]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(goal × n). You fill a dp table of size (goal+1) by (n+1). Each cell requires O(1) computation.
- **Space Complexity:** O(goal × n). For the dp table; no extra recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize space usage further?  
  *Hint: dp[i][*] only depends on dp[i-1][*], so can you use two rows?*

- What if you’re asked for the exact playlist arrangements, not just the count?  
  *Hint: Tracing back via reconstruction or backtracking may be needed, and likely infeasible for large cases.*

- How does the solution change if each song can only be played a **maximum** number of times?  
  *Hint: State needs to include per-song play count, e.g. DP over [goal][used][song_counts...]*

### Summary
This problem is a classic **dynamic programming on combinations** pattern with constraints. The key is to define a 2D DP: “how many ways to create a playlist of length i with j unique songs.”  
Techniques used here (combining permutations, with DP and constraints) are common in advanced combinatorics and can also be seen in problems about arrangement, assignment, and scheduling with minimum or maximum gaps.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming), Combinatorics(#combinatorics)

### Similar Problems
- Count the Number of Good Subsequences(count-the-number-of-good-subsequences) (Medium)