### Leetcode 2188 (Hard): Minimum Time to Finish the Race [Practice](https://leetcode.com/problems/minimum-time-to-finish-the-race)

### Description  
You are given a set of **tires**, where each tire has a formula: to run the first lap, it takes `f` seconds, and each consecutive lap on the same tire multiplies that time by `r`. You can change tires between any two laps, but doing so costs `changeTime` seconds. You must finish exactly `numLaps` laps in total, and want to minimize the total race time.  
**Goal:** Find the minimum possible total time to complete all the laps, considering you can change tires as often as you want but must pay the changeTime each time (except before the first lap).

### Examples  

**Example 1:**  
Input: `tires = [[2,3]], changeTime = 5, numLaps = 4`  
Output: `21`  
*Explanation:*
- Lap 1: Tire 0, 2 seconds.
- Lap 2: Tire 0, 2×3 = 6 seconds.
- Lap 3: Change tires (+5 sec), then Tire 0, 2 seconds.
- Lap 4: Tire 0, 2×3 = 6 seconds.
- **Total:** 2 + 6 + 5 + 2 + 6 = 21.

**Example 2:**  
Input: `tires = [[1,10],[2,2],[3,4]], changeTime = 6, numLaps = 5`  
Output: `25`  
*Explanation:*
- Lap 1: Tire 1, 2 seconds.
- Lap 2: Tire 1, 2×2 = 4 seconds.
- Lap 3: Change tires (+6 sec), then Tire 1, 2 seconds.
- Lap 4: Tire 1, 2×2 = 4 seconds.
- Lap 5: Change tires (+6 sec), then Tire 0, 1 second.
- **Total:** 2 + 4 + 6 + 2 + 4 + 6 + 1 = 25.

**Example 3:**  
Input: `tires = [[1,2],[2,3]], changeTime = 3, numLaps = 3`  
Output: `8`  
*Explanation:*
- Lap 1: Tire 0, 1 second.
- Lap 2: Tire 0, 1×2 = 2 seconds.
- Lap 3: Tire 0, 1×2×2 = 4 seconds.
- **Total:** 1 + 2 + 4 = 7 (no need to change, since once changing would cost 3 and no better tire).

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible ways to split the numLaps into groups, each time picking the best possible tire for each group size (incurring changeTime between groups). Clearly exponential, not feasible due to tight constraints on numLaps (up to 1000), but many types of tires (up to 10⁵).
- **Observation:** Tire performance degrades exponentially per lap unless reset. Thus, it’s never worth using a tire for consecutive laps if the time gets worse than changing tires.
- **Optimization:** Precompute, for every tire, the minimal time needed to run up to K consecutive laps without changing (where total time doesn't exceed the cost of always resetting).
- Use DP: `dp[i] = min time to finish i laps`. For every possible valid block (up to L laps in a row), try combining to reach numLaps using best blocks.
- **Trade-off:** We precompute all possible “block” times for up to L laps (where going further is never optimal), and then DP to reach numLaps.

### Corner cases to consider  
- Only one tire, must find the optimal sequence of changes or keep going.
- ChangeTime is very large or very small.
- numLaps = 1 or 2.
- Multiple tires with identical parameters.
- r = 1 (no degradation).
- fi or changeTime = 1.
- numLaps can’t be split evenly.

### Solution

```python
def minimumFinishTime(tires, changeTime, numLaps):
    # Precompute the best single-tire segment times:
    # best_time[laps]: minimal time to run "laps" consecutive laps (without change)
    INF = float('inf')
    max_block = 20  # Because beyond this, due to exponential r, not useful (killed by changeTime penalty)
    best_time = [INF] * (numLaps+1)
    
    for f, r in tires:
        t, total = f, f
        for lap in range(1, numLaps+1):
            if lap > max_block or t > f + changeTime:
                break  # Not worth it to keep using the tire consecutively
            if total < best_time[lap]:
                best_time[lap] = total
            t *= r
            total += t
    
    # DP: dp[i] = min time to finish i laps
    dp = [INF] * (numLaps+1)
    dp[0] = 0
    for i in range(1, numLaps+1):
        # Try all block sizes for the last segment
        for k in range(1, min(i, max_block)+1):
            if best_time[k] == INF:
                continue
            if i == k:
                dp[i] = min(dp[i], best_time[k])
            else:
                dp[i] = min(dp[i], dp[i-k] + changeTime + best_time[k])
    return dp[numLaps]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n \* log(numLaps) + numLaps²). For each tire (n), simulate up to O(log(numLaps)) consecutive laps; then DP for all numLaps² combinations. Both n and numLaps are within constraints.
- **Space Complexity:** O(numLaps). Only store dp and best_time for up to numLaps.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we can change tires only a limited number of times?  
  *Hint: Track the number of changes left as an extra DP state.*

- How would you update the solution for arbitrarily large numLaps (e.g., 10⁶+), but still limited tire types?  
  *Hint: Can you identify and repeat optimal block “patterns”?*

- Can you reconstruct the tire change sequence for the minimum time?  
  *Hint: Track choices made in your DP to backtrace reconstruction.*

### Summary
This problem is an application of **DP with segmented block optimization** and **preprocessing blocks for combinations**. The solution is analogous to problems like “minimum cost to reach n with allowed steps,” but here each “step” may be a variable-length block with variable cost. This pattern shows up in racing/game energy management, segmented cost problems, and sequence partitioning with per-segment costs.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Minimum Skips to Arrive at Meeting On Time(minimum-skips-to-arrive-at-meeting-on-time) (Hard)