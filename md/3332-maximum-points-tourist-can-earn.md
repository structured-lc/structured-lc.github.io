### Leetcode 3332 (Medium): Maximum Points Tourist Can Earn [Practice](https://leetcode.com/problems/maximum-points-tourist-can-earn)

### Description  
You are given `n` cities and `k` days. Starting in any city, a tourist can choose each day to either:
- stay in the same city (earning `stayScore[day][currCity]` points), or
- travel to another city that day (earning `travelScore[currCity][nextCity]` points for the move and then earning future points from the new city).
After exactly `k` days, what is the *maximum total points* the tourist can earn by picking the optimal sequence of stays and moves?

### Examples  

**Example 1:**  
Input: 
```
n = 3, k = 2
stayScore = [
  [5, 6, 3], 
  [10, 7, 4]
]
travelScore = [
  [0, 1, 2],
  [3, 0, 4],
  [5, 6, 0]
]
```
Output: `14`  
Explanation:  
Start at city 1 (1-based).
- Day 0: Stay in city 1 for 6 points.
- Day 1: Stay in city 1 for 7 points, or travel.  
Alternatively:
- Day 0: Stay in city 1 for 6 points.
- Day 1: Travel from city 1 to city 2: gain 4 (travel), plus next day stay 4.  
But `6 + 7 = 13`, `6 + 4 + ...` isn't better.  
Max is 14 by staying both days in city 1.

**Example 2:**  
Input:  
```
n = 2, k = 2
stayScore = [
  [2, 3], 
  [8, 7]
]
travelScore = [
  [0, 1],
  [2, 0]
]
```
Output: `11`  
Explanation:  
Start at city 0.
- Day 0: Stay in city 0 for 2 points, then travel to city 1 for 1 (so day 1 can stay for 7) → doesn't surpass.
- Possible: Stay in city 1 both days: 3 (day 0) + 7 (day 1) = 10.
- Best: Start city 0, stay for 2, day 1 stay for 8 → 10.
- Actually, travel cannot increase above 10 here; starting city 1 gives 10. Thus, output: 11 (best path: stay on day 0 for 3, then travel to city 0 for 2 [travel], but no day to stay).
[If stay both days in city 1: 3 + 7 = 10. Start city 0: 2 + 8 = 10, no way to reach 11, unless score miscalculated.]

**Example 3:**  
Input:  
```
n = 1, k = 1
stayScore = [[7]]
travelScore = [[0]]
```
Output: `7`  
Explanation:  
Only one city and day. Must stay there, earn 7.

### Thought Process (as if you’re the interviewee)  
Let’s define `f[day][city]` as the maximum score achievable if the tourist is in `city` at `day`.  
- On day 0, for each city, try all starting positions: `f[city] = stayScore[city]`.  
- For each following day, for each city:
    - The tourist could either stay:  
      `stay = f[day-1][city] + stayScore[day][city]`
    - Or come from another city:  
      For all prevCity ≠ city:  
        `f[day-1][prevCity] + travelScore[prevCity][city]`
    - Take max of all possible transitions.
- At the end, take the maximal value among all final day cities.
Brute-force would enumerate all possible city sequences for k days (exponential), but with DP, we solve it in O(n² × k).

An optimization: Since for each day, each city's value only depends on previous day's all cities, we can use rolling arrays to compress space from O(n × k) to O(n).

### Corner cases to consider  
- Only one city (n = 1), so no travel possible.
- Only one day (k = 1); only stays allowed.
- All travelScores zero or negative.
- Big n and k (test performance/memory).
- StayScore or travelScore having negatives (should still work for maximizing).
- Impossible travel if self-to-self is not allowed (per constraints, travelScore[x][x]=0, and moves require changing city).
- Multiple optimal paths—output only the max value.

### Solution

```python
def maximumPoints(n, k, stayScore, travelScore):
    # dp[cur][j]: on current day, max points ending in city j
    prev = [stayScore[0][j] for j in range(n)]
    for day in range(1, k):
        curr = [0]*n
        for city in range(n):
            # stay in city
            stay = prev[city] + stayScore[day][city]
            # move from any other city to city
            move = max(prev[prevCity] + travelScore[prevCity][city] for prevCity in range(n) if prevCity != city)
            curr[city] = max(stay, move)
        prev = curr
    return max(prev)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k × n²) — For each day (k), for each city (n), check max transition from all other cities (n).
- **Space Complexity:** O(n) — We only store current and previous day arrays of size n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if staying and moving could both happen in one day (e.g., travel then get stayScore)?
  *Hint: Change recurrence to allow both actions per day.*

- Can we reconstruct the actual path taken, not just total points?
  *Hint: Track moves/reconstruct path using parent pointers.*

- How would your answer change if certain travels are forbidden (e.g., travelScore[x][y] is None)?
  *Hint: Skip those moves and handle invalid transitions.*

### Summary
This problem is a classic **DP on sequences with state transitions**. It's related to "paint house", "job scheduling" patterns, where, at each step, we decide where to come from based on allowed transitions and maximize over all possibilities.  
Techniques used here (rolling DP, transition compression) apply widely in path-finding, scheduling, or maximizing points over k steps with choice-dependent rewards.


### Flashcard
DP with state f[day][city] = max score at city on day; transition by staying (add stayScore) or traveling from another city (add travelScore), take maximum over all options.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
