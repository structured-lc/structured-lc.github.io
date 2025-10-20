### Leetcode 2463 (Hard): Minimum Total Distance Traveled [Practice](https://leetcode.com/problems/minimum-total-distance-traveled)

### Description  
Given arrays for **robots** and **factories** located on an X-axis, each robot's position is unique; each factory’s position and max repair capacity is unique. The goal is to assign each robot to a factory (via movement along the X-axis) such that every robot is repaired (subject to factory capacities), and the **total distance traveled** by all robots is **minimized**. Each robot can move in either direction, and stops as soon as it reaches any factory with available capacity.

### Examples  

**Example 1:**  
Input: `robot = [0, 4, 6]`, `factory = [[2, 2], [6, 2]]`  
Output: `4`  
*Explanation: Move robot 0 to factory 2 (distance = 2), robot 4 to factory 2 (distance = 2), robot 6 to factory 6 (distance = 0). Total: 2 + 2 + 0 = 4.*

**Example 2:**  
Input: `robot = [1, -1]`, `factory = [[-2, 1], [2, 1]]`  
Output: `2`  
*Explanation: Assign robot -1 to factory -2 (distance = 1), robot 1 to factory 2 (distance = 1). Total: 1 + 1 = 2.*

**Example 3:**  
Input: `robot = [5]`, `factory = [[10, 1], [3, 1]]`  
Output: `2`  
*Explanation: Assign robot 5 to factory 3 (distance = 2) or factory 10 (distance = 5), minimum total is 2.*

### Thought Process (as if you’re the interviewee)  
First thought: Brute-force—try every assignment of robots to factories not exceeding capacity, compute total distance for each, and choose minimum.  
But the number of assignments is exponential: far too slow.

Observing that **positions are unique**, we can **sort** both robots and factories (by x position).  
Now, as greedy seems tempting, factory capacities complicate assignments.

Thus, I’d try **Dynamic Programming**.  
Let’s define dp[i][j]: minimum distance to assign the first i robots to the first j factories.

Transition:
- For each dp[i][j], try assigning k robots (0 ≤ k ≤ min(factory[j-1].limit, i)) to factory j-1, and dp[i-k][j-1] covers the previous state.  
- For computing cost: sum the distances for the last k robots to go to factory j-1.

Iterate over all possible k for every dp[i][j]. Fill dp bottom-up.

This is similar to the **knapsack pattern** (since factory capacity is a constraint).

Trade-offs:  
- This solution is O(n × m × c), where n = robots, m = factories, c = maximum capacity per factory. It’s tractable since constraints are reasonable.

### Corner cases to consider  
- No robots (should return 0).
- No factories (invalid—problem guarantees all robots can be repaired).
- All robots at the same position as a factory.
- Factory with 0 capacity.
- Factory limits sum to exactly number of robots (tight fit).
- Robots/factories in negative positions.
- Robots closer to far factories (don't assume local greedy is always optimal).

### Solution

```python
def minimumTotalDistance(robot, factory):
    # Sort robots and factories by position
    robot.sort()
    factory.sort()
    
    n = len(robot)
    m = len(factory)
    
    # dp[i][j]: minimum distance to fix first i robots with first j factories
    # We'll use large number for init.
    INF = 1 << 60
    dp = [ [INF] * (m + 1) for _ in range(n + 1) ]
    
    # Base case: 0 robots need 0 distance
    for j in range(m + 1):
        dp[0][j] = 0

    # Fill DP
    for i in range(1, n + 1):         # number of robots to assign
        for j in range(1, m + 1):     # number of factories to consider
            # Option 1: do not use jᵗʰ factory for the iᵗʰ robot
            dp[i][j] = min(dp[i][j], dp[i][j-1])
            
            # Option 2: use k robots (1 ≤ k ≤ min(i, capacity))
            total = 0
            # Assign up to factory[j-1][1] robots to factory[j-1]
            for k in range(1, min(i, factory[j-1][1]) + 1):
                idx = i - k        # Number of robots already assigned (remaining)
                total += abs(robot[idx] - factory[j-1][0])
                # dp[idx][j-1]: best distance covering up to idx robots with (j-1) factories
                dp[i][j] = min(dp[i][j], dp[idx][j-1] + total)
    
    return dp[n][m]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m × c), where n = number of robots, m = number of factories, c = maximum factory capacity.  
  Justification: For each dp[i][j], up to c k-iterations.
- **Space Complexity:** O(n × m), due to storing the DP table for all states.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you reconstruct the actual assignments of robots to factories from your DP table?  
  *Hint: Store backtracking information for each transition.*

- How would the solution change if robots and factories were not lying on a line (e.g., 2D plane)?  
  *Hint: The key challenge is the loss of sorting and possible combinatorics of distances.*

- Could a greedy approach ever work for this problem?  
  *Hint: Demonstrate a small example where greedy fails due to factory limits.*

### Summary  
This problem uses a typical **DP with grouping/knapsack pattern**, where transitions explore assigning possible contiguous groups of robots to each factory within capacity, minimizing cumulative distance.  
Such patterns also appear in scheduling with resource limits, interval assignment, and capacitated facility location problems.  
Sorting inputs first and considering group assignments makes the DP transitions efficient and manageable for hard constrained assignment problems.


### Flashcard
Sort robots and factories; use DP where dp[i][j] is the min distance to assign first i robots to first j factories, respecting capacities.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Sorting(#sorting)

### Similar Problems
- Capacity To Ship Packages Within D Days(capacity-to-ship-packages-within-d-days) (Medium)
- Number of Ways to Earn Points(number-of-ways-to-earn-points) (Hard)