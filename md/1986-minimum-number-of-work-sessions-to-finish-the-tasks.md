### Leetcode 1986 (Medium): Minimum Number of Work Sessions to Finish the Tasks [Practice](https://leetcode.com/problems/minimum-number-of-work-sessions-to-finish-the-tasks)

### Description  
You are given a list of task durations (array `tasks` of size n), where each task `tasks[i]` takes a certain number of hours. You can work in sessions, and each session can last at most `sessionTime` hours.  
- You must finish any started task within a single session; tasks cannot be split across sessions.
- You can finish tasks in any order.
- The goal is to schedule all tasks so that the *minimum number of work sessions* are used.

**Key constraints:**  
- Each task must be assigned in its entirety to a single session.
- sessionTime ≥ max(tasks[i]) (the longest task always fits).

### Examples  

**Example 1:**  
Input: `tasks = [1,2,3]`, `sessionTime = 3`  
Output: `2`  
Explanation:  
- Session 1: 1 + 2 = 3  
- Session 2: 3

**Example 2:**  
Input: `tasks = [3,1,3,1,1]`, `sessionTime = 8`  
Output: `2`  
Explanation:  
- Session 1: 3 + 1 + 3 = 7  
- Session 2: 1 + 1 = 2

**Example 3:**  
Input: `tasks = [1,2,1,1,1]`, `sessionTime = 2`  
Output: `4`  
Explanation:  
- Session 1: 1 + 1 = 2  
- Session 2: 2  
- Session 3: 1 + 1 = 2  
- Session 4: (last 1 can’t be grouped with any other task in a session of size 2)

### Thought Process (as if you’re the interviewee)  

Start with a brute-force (backtracking):  
- Try all ways to partition the tasks into sessions not exceeding sessionTime. Prune impossible cases.  
- This is exponential — too slow for n up to 14.

We can optimize using **bitmask dynamic programming**:  
- Represent the set of unassigned tasks as a bitmask of n bits.
- Define f[mask] = minimum sessions needed for tasks in mask.
- For each mask, try all possible submasks (subsets of tasks that fit in a session); for each valid submask, update f[mask] = min(f[mask], f[mask^submask] + 1).
- Base case: f = 0 (no tasks, no session).
- Transitions: For each subset of remaining tasks (`mask`), choose a submask of tasks that can be done in one session (sum ≤ sessionTime).

This is feasible because total submasks for all masks up to n=14 is ~2ⁿ×2ⁿ = 16k×16k=~256M, but thanks to pruning (only valid subsets), it's much less.

Why DP with bitmask is best:  
- Limits recomputation via memoization.
- Brute force would double count and do redundant work.
- Can be further optimized by enumerating submasks efficiently.

### Corner cases to consider  
- All tasks exactly equal to sessionTime.  
- sessionTime is much larger than any task (all tasks fit in a single session).  
- Tasks array length = 1 (just 1 session).  
- Tasks all the same time.  
- Tasks of varying lengths; sum divisible/indivisible by sessionTime.  
- Sum(tasks) divisible or not divisible by sessionTime.  
- Largest task = sessionTime (it must be alone in a session).

### Solution

```python
def minSessions(tasks, sessionTime):
    n = len(tasks)
    size = 1 << n  # total bitmasks for subsets of tasks

    # Precompute which subset bitmasks can fit in a single session.
    can_fit = [False] * size
    for mask in range(size):
        total = 0
        for i in range(n):
            if (mask >> i) & 1:
                total += tasks[i]
        if total <= sessionTime:
            can_fit[mask] = True

    # f[mask]: min sessions to finish tasks in 'mask'
    f = [n+1] * size
    f[0] = 0  # no task needs 0 sessions

    for mask in range(1, size):
        sub = mask
        while sub > 0:
            if can_fit[sub]:
                remaining = mask ^ sub
                f[mask] = min(f[mask], f[remaining] + 1)
            sub = (sub - 1) & mask  # move to next submask

    return f[size-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 2ⁿ + 3ⁿ)  
  - Precomputing can_fit: O(n × 2ⁿ)
  - DP transitions: Each mask has up to 2ⁿ submasks but typically pruned by can_fit. Each submask's total is already computed.
  - For n ≈ 14, this is tractable.

- **Space Complexity:** O(2ⁿ)  
  - Storing DP array and can_fit lookup by bitmask.

### Potential follow-up questions (as if you’re the interviewer)  

- What if tasks could be split across sessions?  
  *Hint: Think classical bin-packing/greedy scheduling.*

- Can you reconstruct which tasks go in which session?  
  *Hint: Augment DP to backtrack assignments; store split info.*

- How would you solve it if n is very large (say, 1000)?  
  *Hint: Bitmask DP won't work. Need to use greedy approximation or a variant of bin-packing heuristics.*

### Summary
This problem demonstrates the power of bitmask dynamic programming for subset partitioning and optimal assignment, especially when all combinations are considered and recomputation is pruned via memoization.  
The core pattern is **combinatorial subset DP** (classic in problems like traveling salesman, partitioning, and set cover).  
The DP with bitmask is a high-leverage tool for medium-sized n (10 ≤ n ≤ 20). Similar patterns can be used for problems that require grouping or partitioning items with subset constraints.