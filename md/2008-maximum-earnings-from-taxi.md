### Leetcode 2008 (Medium): Maximum Earnings From Taxi [Practice](https://leetcode.com/problems/maximum-earnings-from-taxi)

### Description  
You are a taxi driver operating on a straight road with **n** points labeled from 1 to n, moving only forward (no turning back). Each passenger requests a ride given as **[startᵢ, endᵢ, tipᵢ]**: the passenger wants to be picked up at point `startᵢ`, dropped at `endᵢ`, and will pay you a tip of `tipᵢ`.  
You can pick up only one passenger at a time, but after finishing a ride, you can take the next ride starting at the same point where you dropped off the last one.  
**Your goal** is to select a set of rides (possibly skipping some) to **maximize your total earnings**. The earnings from a ride is **(endᵢ - startᵢ + tipᵢ)**.  

### Examples  

**Example 1:**  
Input:  
`n = 5, rides = [[2,5,4],[1,5,1]]`  
Output:  
`7`  
*Explanation: You can take the first ride: start=2, end=5, tip=4 ⇒ earnings = (5-2) + 4 = 7*

**Example 2:**  
Input:  
`n = 5, rides = [[1,2,1],[1,3,2],[2,5,2]]`  
Output:  
`7`  
*Explanation:  
Option 1: Take ride [1,3,2]: earnings = (3-1)+2 = 4.  
Then take [3,5,0]: no such ride, so stop.  
Option 2: Take ride [1,2,1]: earnings = (2-1)+1 = 2.  
Then [2,5,2]: earnings = (5-2)+2 = 5.  
Total = 2+5 = 7 (maximum).*

**Example 3:**  
Input:  
`n = 5, rides = [[2,5,4],[2,5,3]]`  
Output:  
`7`  
*Explanation:  
Take ride [2,5,4]: earnings = (5-2) + 4 = 7  
Or [2,5,3]: earnings = (5-2) + 3 = 6  
Maximum is 7.*

### Thought Process (as if you’re the interviewee)  

To maximize the total earnings, a brute-force way is to consider all possible subsets of non-overlapping rides — but the number of possibilities blows up quickly as the number of rides increases.

Since the rides are along a straight line and only one passenger is allowed at a time, the problem is similar to activity selection (or weighted job scheduling):  
- Each ride [start, end, tip] has a profit and a time window.  
- For each location, decide whether to start a ride or skip.

**Optimization:**  
We can use **dynamic programming**:
- **Sort the rides by start or end time (usually end time for DP).**
- Let **dp[x]** = the maximum earnings possible upon reaching point x.
- For each ride [start, end, tip],  
  - you can “jump” from dp[start] to dp[end] by taking this ride, earning (end-start+tip).
  - For each point x, `dp[x] = max(dp[x-1], max total earned when arriving at x via any ride ending at x)`

Why this works: at any point x, you can either skip (carry over dp[x-1]) or take rides that end at x.

We can efficiently process rides using a map of rides ending at each point (since n can be large but not every point has a ride ending).

### Corner cases to consider  
- No rides at all ⇒ output 0.
- Rides with the same start and end points.
- Multiple rides starting/ending at the same point.
- Only one ride in input.
- Rides out of order in input.
- Very large n but rides only at a few points.

### Solution

```python
def maxTaxiEarnings(n, rides):
    # dp[i]: max earnings when reaching point i (1 ≤ i ≤ n)
    dp = [0] * (n + 1)
    
    # For easier access, group rides by ending point
    ends_at = [[] for _ in range(n + 1)]
    for start, end, tip in rides:
        ends_at[end].append((start, tip))
    
    for i in range(1, n + 1):
        # Carry over if skipping any ride ending at i
        dp[i] = dp[i - 1]
        
        # Consider all rides that end at i
        for start, tip in ends_at[i]:
            earning = (i - start) + tip
            # Update dp[i] if taking this ride gives better earning
            dp[i] = max(dp[i], dp[start] + earning)
    
    return dp[n]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n is the number of points and m is number of rides. Grouping rides by end point takes O(m). DP loop is O(n). For each point, checking rides ends_at[i], total across n is O(m).
- **Space Complexity:** O(n + m). The dp array needs O(n), rides grouped by end takes O(m).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the road is not 1-dimensional but a tree?
  *Hint: How can you model movements and transitions on a tree instead of a line?*

- Can you optimize space if n is very large and rides are sparse?
  *Hint: Only keep dp for positions that matter, perhaps with a dict.*

- What if you can pick up multiple passengers at the same time?
  *Hint: This relaxes the constraint, possibly needing interval or conflict checks between rides.*

### Summary
This problem uses a classic **dynamic programming** pattern similar to weighted activity/job scheduling, where we process intervals and choose non-overlapping ones for maximum profit. Grouping rides by their ending position allows us to build DP efficiently. This pattern is common for maximizing resource usage among time/space intervals. Similar ideas arise in event scheduling and maximum profit questions with time constraints.