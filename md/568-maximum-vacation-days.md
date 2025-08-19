### Leetcode 568 (Hard): Maximum Vacation Days [Practice](https://leetcode.com/problems/maximum-vacation-days)

### Description  
Given **n** cities and **k** weeks, you want to maximize your total vacation days over k weeks, starting from city 0. Every week, you can either stay in your current city or take a direct flight to another city (based on the provided flights matrix). The flights matrix (`flights[i][j] == 1`) indicates whether there's a flight from city i to city j. The days matrix (`days[i][w]`) tells you how many vacation days you can take if you spend week w in city i. You can only fly on Monday morning, and travel takes no vacation time. Determine the maximum vacation days you can take following these rules[1][2].

### Examples  

**Example 1:**  
Input:  
flights = `[[0,1,1],[1,0,1],[1,1,0]]`, days = `[[1,3,1],[6,0,3],[3,3,3]]`  
Output: `12`  
*Explanation: Start in city 0.  
- Week 0: Fly to city 1 (6 days).  
- Week 1: Stay in city 1 (0 days), but flying to city 2 gives 3 days, flying back to city 0 gives 1 day.  
Optimal: 6 (c1) + 3 (c2) + 3 (c2) = 12.*

**Example 2:**  
Input:  
flights = `[[0,0,0],[0,0,0],[0,0,0]]`, days = `[[1,1,1],[7,7,7],[7,7,7]]`  
Output: `3`  
*Explanation: No flights available, so must stay in city 0.  
Vacation days = 1 + 1 + 1 = 3.*

**Example 3:**  
Input:  
flights = `[[0,1,0],[0,0,1],[0,0,0]]`, days = `[[1,0,0],[0,2,1],[1,1,2]]`  
Output: `4`  
*Explanation: Try all possible paths. One optimal path:  
- Week 0: Stay city 0 (1).  
- Week 1: Fly to city 1 (2).  
- Week 2: Fly to city 2 (2).  
Total = 1 + 2 + 1 = 4.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:** For every week, try all cities accessible via flight, for every choice simulate subsequent weeks recursively. There are n possibilities each week, so total states are roughly O(nᵏ). This is much too slow.
- **Optimization:** Use **Dynamic Programming**.  
    - Let dp[i][w] = max vacation days possible if I'm in city i for week w.
    - For each week, from each city, try all cities j where flights[i][j] == 1 or i == j (stay or fly).
    - Transition:  
      dp[j][w+1] = max(dp[j][w+1], dp[i][w] + days[j][w+1])
    - Compute from week 0 up to week k-1.
- **Further optimize space**: Notice that only previous week info is needed. So can optimize to a 1D dp array (for cities).

### Corner cases to consider  
- flights matrix is all zeros: cannot move, must stay in city 0.
- Only one city and multi weeks: can only accumulate days from single city.
- days matrix with zero vacation days in some cities or weeks.
- Empty flights or days.
- k = 0 (no weeks): should return 0.

### Solution

```python
def maxVacationDays(flights, days):
    if not flights or not days:
        return 0

    n = len(flights)   # number of cities
    k = len(days[0])   # number of weeks
    
    dp = [float('-inf')] * n
    dp[0] = 0  # start at city 0 with 0 vacation days

    for week in range(k):
        next_dp = [float('-inf')] * n
        for curr_city in range(n):
            if dp[curr_city] == float('-inf'):
                continue
            for dest_city in range(n):
                # Can go if same city (no travel), or if flights[curr_city][dest_city]
                if curr_city == dest_city or flights[curr_city][dest_city]:
                    next_dp[dest_city] = max(
                        next_dp[dest_city],
                        dp[curr_city] + days[dest_city][week]
                    )
        dp = next_dp

    return max(dp)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × k), since for each week (k), for each current city (n), we try every destination city (n).
- **Space Complexity:** O(n), since we only keep two arrays for DP across cities per week.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can only take a flight every other week?  
  *Hint: Add a week parity constraint in your DP choice.*

- How would you retrieve the *actual* path (cities visited) for the maximum vacation days, not just the value?  
  *Hint: Use parent pointers or track path reconstruction alongside DP.*

- How would you handle the case where not all cities can be reached from city 0?  
  *Hint: Carefully initialize DP with float('-inf') or 0, and only update for reachable cities.*

### Summary
This problem uses the **Dynamic Programming** pattern, optimizing over weekly decisions based on previous state. The trick is to encode the state as (city, week) and update, considering only valid flights or staying put. This technique—multi-stage, staged DP—is common in scheduling, path maximization, or resource allocation problems with stage-wise constraints.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
- Cheapest Flights Within K Stops(cheapest-flights-within-k-stops) (Medium)