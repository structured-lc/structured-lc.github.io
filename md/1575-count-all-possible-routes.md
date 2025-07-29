### Leetcode 1575 (Hard): Count All Possible Routes [Practice](https://leetcode.com/problems/count-all-possible-routes)

### Description  
Given a list of `locations` (integers representing cities along a line), a `start` city index, a `finish` city index, and `fuel` units, count how many possible routes exist from start to finish using the given fuel. At each move, you can go to any other city (not just adjacent), spending `abs(locations[i] - locations[j])` fuel to go from city i to city j. You may revisit cities, including the finish city (but only count routes which end there). Return the total number of routes modulo 10⁹+7.

### Examples  
**Example 1:**  
Input: `locations=[2,3,6,8,4], start=1, finish=3, fuel=5`  
Output: `4`  
*Explanation: Four possible routes from city 1 (3) to city 3 (8) with at most 5 fuel.*

**Example 2:**  
Input: `locations=[4,3,1], start=1, finish=0, fuel=6`  
Output: `5`  
*Explanation: Five ways to go from city 1 (3) to 0 (4) using ≤6 fuel (including staying at start and finish as a valid route).* 

**Example 3:**  
Input: `locations=[5,2,1], start=0, finish=2, fuel=3`  
Output: `0`  
*Explanation: Not enough fuel to reach 2 from 0 in any way.*

### Thought Process (as if you’re the interviewee)  
Brute force would be to try all permutations/paths, but with <=100 cities and up to 200 fuel, this will be too slow (exponential). The problem is suited for dynamic programming with memoization: for `(curr_city, remaining_fuel)`, recursively try all possible moves, cache results to avoid recomputation. Base case: if at finish, count that as a valid route (even if we haven't used all fuel). Each move: try every other city, see if enough fuel. Memoization table is key for pruning repeated work.

### Corner cases to consider  
- Not enough fuel to even visit finish from start
- Multiple ways to revisit finish
- Zero fuel but already at finish at the start
- Only one city (start == finish)

### Solution

```python
def countRoutes(locations, start, finish, fuel):
    MOD = 10**9 + 7
    n = len(locations)
    from functools import lru_cache
    
    @lru_cache(maxsize=None)
    def dp(city, rem_fuel):
        # Start with 1 if at finish
        ways = 1 if city == finish else 0
        for next_city in range(n):
            if next_city == city:
                continue
            cost = abs(locations[city] - locations[next_city])
            if rem_fuel >= cost:
                ways = (ways + dp(next_city, rem_fuel - cost)) % MOD
        return ways
    return dp(start, fuel)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n × fuel): total number of DP states (n cities × fuel+1 fuel). Each state iterates up to n cities.
- **Space Complexity:** O(n × fuel): memoization cache for DP states.

### Potential follow-up questions (as if you’re the interviewer)  
- How do you handle if moving between cities has different (non-distance) costs?
  *Hint: Adapt cost calculation for each leg as needed.*

- What if the distance graph is not fully connected?
  *Hint: Add edge checks/ignore moves not possible.*

- How do you avoid stack overflow for deep recursion?
  *Hint: Use iterative DP (tabulation) or adjust recursion limits.*

### Summary
Classic **dynamic programming with memoization** on states (city, fuel). Pattern is common in path counting, grid traversal, and shortest path variants with resource constraints. Memoization is crucial for tractability in large state spaces.