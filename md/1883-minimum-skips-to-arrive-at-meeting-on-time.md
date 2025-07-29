### Leetcode 1883 (Hard): Minimum Skips to Arrive at Meeting On Time [Practice](https://leetcode.com/problems/minimum-skips-to-arrive-at-meeting-on-time)

### Description  
Given a list of n roads described by their distances `dist` and a constant `speed`, you want to travel through all roads in order. After every road except the last, you must usually rest and wait until the start of the next full hour before continuing (so, you "round up" your travel time to the next integer hour). You are allowed to skip this rest a limited number of times — a "skip" means you continue to the next road immediately. Given a time limit `hoursBefore`, return the **minimum number of skips needed** to arrive at or before the time limit, or -1 if it's impossible.

### Examples  

**Example 1:**  
Input: `dist = [1,3,2], speed = 4, hoursBefore = 2`  
Output: `1`  
Explanation:  
- No skips: 1/4 + (wait) + 3/4 + (wait) + 2/4 = 2.5 hours (not enough)
- Skip after first road: (1/4 + 3/4[=1]) + (wait) + 2/4 = 1.5 hours.

**Example 2:**  
Input: `dist = [7,3,5,5], speed = 2, hoursBefore = 10`  
Output: `2`  
Explanation:  
- Skipping after certain roads makes total travel + rests fit within ⩽ 10 hours. Minimum skips needed is 2.

**Example 3:**  
Input: `dist = [7,3,5,5], speed = 1, hoursBefore = 10`  
Output: `-1`  
Explanation:  
- Even with maximum skips, can't reach within the required time.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try every subset of (n-1) rest breaks to skip. Simulate the travel. But there are 2^(n-1) combinations, too slow for n up to 1000.
- **Optimize:**  
  - Whenever you finish a road, round the time up to the next integer hour unless you skip.
  - *Key*: The state after each road depends on how many skips you’ve used so far.
  - **Dynamic Programming**: 
    - Let `dp[i][k]` = minimal total time at the end of iᵗʰ road with k skips used so far.
    - For each road:
        - If you don’t skip, you add the travel time and round up to next integer (except for last road).
        - If you skip, just add travel time.
    - For each road and skips-used level, consider both options.
    - At the end, check minimal skips s.t. the total time ≤ hoursBefore.
- **Why DP:** Only previous state and number of skips matter. States are small enough (n × n) for strong solution.

### Corner cases to consider  
- Only one road
- All distances are 0
- All roads require skipping all rests to be on time
- Impossible even if maximum skips used
- Already possible with 0 skips (trivial case)
- hoursBefore not integer, e.g., 2.3

### Solution

```python
def minSkips(dist, speed, hoursBefore):
    n = len(dist)
    INF = float('inf')
    # dp[k]: minimal total time (in fractional hours) to finish 0...i with k skips
    dp = [0] + [INF] * n  # dp[k] means using k skips up to prev road

    for i in range(n):
        ndp = [INF] * (n+1)
        for k in range(i+1):
            if dp[k] == INF:
                continue
            # Option 1: No skip, except after the last road
            t = dp[k] + dist[i] / speed
            if i < n-1:
                # round up to next integer hour
                t_no_skip = int(t+0.999999999)
            else:
                t_no_skip = t
            ndp[k] = min(ndp[k], t_no_skip)
            # Option 2: Use a skip
            if k+1 <= n:
                t_skip = dp[k] + dist[i] / speed
                ndp[k+1] = min(ndp[k+1], t_skip)
        dp = ndp

    for k in range(n+1):
        if dp[k] <= hoursBefore + 1e-8:  # allow some floating point error
            return k
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
    - For each road (O(n)), for up to n skips (O(n)), we update DP states per skip.
- **Space Complexity:** O(n)  
    - We only need two arrays of size n+1 (current/next DP).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you cannot skip consecutive breaks?
  *Hint: Add an extra state tracking last skip position.*

- How do you minimize total arrival time, not the number of skips?
  *Hint: Change DP to minimize time, not skips, and update transition cost.*

- Can this be solved using greedy or mathematical methods?
  *Hint: Counterexamples exist; DP is needed as optimal skip decisions depend on previous rounding.*

### Summary
We used a 2-dimensional dynamic programming approach (`dp[i][k]` or compressed to one array) tracking the minimal time to reach each segment with a given number of skips. This makes it a classic DP on stages and decisions, with applications in path scheduling and resource allocation where discrete jumps (rest) and continuous progress (skipping) are options. This pattern appears in production scheduling, minimal cost path problems, and other transport/resource-constrained optimizations.