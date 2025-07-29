### Leetcode 1824 (Medium): Minimum Sideway Jumps [Practice](https://leetcode.com/problems/minimum-sideway-jumps)

### Description  
A frog starts at position 0 of a 3-lane track (lanes 1, 2, 3), always starting in lane 2. The track is of length n and is represented by an array where obstacles[i] = x means lane x at point i has an obstacle (1-indexed).  
The frog can:
- Move forward on the same lane if there’s no obstacle.
- Jump sidewise to another lane at the same position (called a side jump), unless there’s an obstacle at that lane and position.

Return the minimum number of **side jumps** needed for the frog to reach the end (position n) on any lane.

### Examples  

**Example 1:**  
Input:  
`obstacles = [0,1,2,3,0]`  
Output:  
`2`  
*Explanation:*
- Start: lane 2, pos 0.
- obstacles[1]=1 blocks lane 1, move forward to pos 1 (lane 2).
- obstacles[2]=2 blocks lane 2 at pos 2, must sidejump to lane 1 or 3; choose sidejump to lane 3 (1st sidejump).
- obstacles[3]=3 blocks lane 3 at pos 3, must sidejump to lane 2 or 1; sidejump to lane 2 (2nd sidejump).
- Reach end at pos 4, lane 2.

**Example 2:**  
Input:  
`obstacles = [0,1,1,3,3,0]`  
Output:  
`0`  
*Explanation:*
- Start: lane 2, pos 0.
- obstacles[1]=1 blocks lane 1, move forward in lane 2.
- obstacles[2]=1 blocks lane 1 again, stay in lane 2.
- obstacles[3]=3 blocks lane 3, stay in lane 2.
- obstacles[4]=3 blocks lane 3, stay in lane 2.
- obstacles[5]=0 means no obstacles, finish in lane 2 without a single side jump.

**Example 3:**  
Input:  
`obstacles = [0,2,1,0,3,0]`  
Output:  
`2`  
*Explanation:*
- Start: lane 2, pos 0.
- obstacles[1]=2 blocks lane 2, must sidejump to lane 1 or 3; sidejump to lane 1 (1st sidejump).
- obstacles[2]=1 blocks lane 1, must sidejump to lane 2 or 3; sidejump to lane 2 (2nd sidejump).
- Continue forward, end at pos 5, lane 2.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
    Try every combination of path—at each position, try walking forward or sidejumping if current lane is blocked. Too slow for large input (exponential time).

- **DP Approach:**  
    Realize there are only 3 lanes at each position. For each (pos, lane), keep the minimum number of side jumps needed to reach there.  
    - At each step, move forward in the same lane if not blocked, or consider sidejumping if hit obstacle.
    - Use a rolling array (size 3 for the 3 lanes) to optimize space.
    - At any step, if lane x has obstacle at i, set dp[x] to infinity.

- **Greedy is not enough** since earlier sidejumps may allow fewer jumps later—so always need to consider every lane.

- **Final choice:**  
    Use dynamic programming with O(n) time and O(1) space, since only “previous” step matters for next step updates.

### Corner cases to consider  
- No obstacles at all (all zeros)—optimal answer is 0 (stay in lane 2).
- Obstacles in the starting lane at position 1—need an immediate sidejump.
- Obstacle at the very last position in some lanes (frog can finish in any lane, not just lane 2).
- Multiple obstacles in consecutive steps in different lanes—must alternate sidejumps.

### Solution

```python
def minSideJumps(obstacles):
    n = len(obstacles) - 1  # positions are from 0 to n
    INF = float('inf')
    
    # dp[i] = min jumps to be at current point in lane (i+1)
    # only 3 lanes: (index 0 for lane 1, index 1 for lane 2, index 2 for lane 3)
    dp = [1, 0, 1]  # at pos 0: lane 2 (middle) is 0, others need 1 sidejump
    
    for i in range(1, n+1):
        # First, set lane to INF if there's obstacle at this position in that lane
        for lane in range(3):
            if obstacles[i] == lane + 1:
                dp[lane] = INF
        # Then, update lane costs by considering sidejumps from other lanes
        min_jumps = min(dp)
        for lane in range(3):
            if obstacles[i] != lane + 1:
                dp[lane] = min(dp[lane], min_jumps + 1)
                
    return min(dp)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Each position is processed once, and at each position, each of the 3 lanes is updated (constant time work).

- **Space Complexity:** O(1)  
  - Only need current array of size 3 for the lanes; all updates are in-place. No extra storage or recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of lanes is k instead of 3?  
  *Hint: Generalize the solution by having a dp array of size k and adapting obstacle indexing.*

- Can you reconstruct the path as well as the number of sidejumps?  
  *Hint: Store the decisions at each (position, lane) or work backwards from the dp table.*

- How would the approach change if jumps to non-adjacent lanes were disallowed?  
  *Hint: Only allow sidejump from lane x to lane x-1 or x+1, not all lanes.*

### Summary
We used a dynamic programming pattern—a rolling DP array to represent the minimum sidejumps needed to reach each lane at every position, updating in-place for efficiency.  
This problem is a type of "stateful shortest path" in a grid/track, and the same pattern can be applied to obstacle-avoidance and path-finding variants with lane switches, e.g., robot grid navigation or video game pathing.