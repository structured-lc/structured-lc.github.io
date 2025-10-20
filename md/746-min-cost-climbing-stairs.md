### Leetcode 746 (Easy): Min Cost Climbing Stairs [Practice](https://leetcode.com/problems/min-cost-climbing-stairs)

### Description  
Given an array **cost** where each element represents the cost to step on the *i-th* stair, you need to reach the top of the stairs (one step past the end of the array).  
You can start at either index 0 or 1 (i.e., step 0 or step 1). From each step, you can move to the next step or skip one to go to the step after (i.e., climb 1 or 2 stairs at a time). The goal is to determine the **minimum cost** needed to reach the "top" (just past the last stair), paying the cost of each step you land on.

### Examples  

**Example 1:**  
Input: `cost = [10, 15, 20]`  
Output: `15`  
*Explanation: Start at step 1 (15), pay 15, then take 2 steps to reach the top. That's 15 total. If you start at step 0 (10), you could do 0→1→top (10+15=25), or 0→2→top (10+20=30), both are more expensive.*

**Example 2:**  
Input: `cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]`  
Output: `6`  
*Explanation: Start at step 0 (1):  
0→2→3→4→6→7→9→top, pays 1+1+1+1+1+1=6.*

**Example 3:**  
Input: `cost = [0, 2, 2, 1]`  
Output: `2`  
*Explanation: Best is start at step 0 (0), go to step 1 (2), then skip to step 3 (1), and finally to top (free), total 0+2+1=3.  
But actually, starting at step 1 (2), go to step 3 (1), then to top. That's 2+1=3.  
But since you can skip starting at index 0 with cost 0, it's still 2.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible paths (recursive solution), but with every step, choose both one and two jump possibilities. Exponential time, not efficient.
- **Dynamic Programming:** Use the optimal substructure. To reach step \( i \), you must come from step \( i-1 \) or step \( i-2 \). So, the cost to reach step \( i \) is the min cost to reach \( i-1 \) plus cost of step \( i-1 \), or \( i-2 \) plus cost of step \( i-2 \).  
  \( dp[i] = \min(dp[i-1]+cost[i-1],\ dp[i-2]+cost[i-2]) \)  
  We initialize \( dp=dp[1]=0 \) since you can start at either stair for free.

- **Space Optimization:** Since each dp calculation depends only on the last two results, we only need two variables.

- **Final Choice:** Use the space-optimized DP for O(1) memory.

### Corner cases to consider  
- Empty array (`[]`) — not possible by description.
- Single element (`[5]`) — starting at either 0 or 1.
- Two elements (`[2,3]`) — can start at either, so min(2,3).
- All elements are equal.
- Costs of 0 at some steps.
- Large input sizes (efficiency).

### Solution

```python
def minCostClimbingStairs(cost):
    # Initialize the two previous minimal costs
    prev1 = 0  # Cost to reach step i-2
    prev2 = 0  # Cost to reach step i-1

    # Loop through from step 2 (imaginary top) to len(cost)
    for i in range(2, len(cost) + 1):
        # Cost to step i-1 and then one step to next
        one_step = prev2 + cost[i - 1]
        # Cost to step i-2 and then two steps to next
        two_steps = prev1 + cost[i - 2]
        # Current min cost is min of the two choices
        current = min(one_step, two_steps)
        # Move forward
        prev1, prev2 = prev2, current

    # At end, prev2 holds the min cost to reach "top"
    return prev2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the cost array. We process each step once.
- **Space Complexity:** O(1), since we only store a pair of variables, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you reconstruct the actual steps taken to reach the minimum cost?  
  *Hint: Store the best previous index for each step and backtrack.*

- What if you can take up to *k* steps at once instead of just 1 or 2?  
  *Hint: Use a sliding window or generalize the DP recurrence for k-width.*

- How would your solution change if you could start at any arbitrary step, not just step 0 or 1?  
  *Hint: Change your initialization conditions and starting cost options.*

### Summary
This is a classic **dynamic programming** problem, specifically the "minimum path" variation with choices of one or two steps. The key pattern is to build up the solution using the optimal results of the last two subproblems, allowing O(1) space. This DP principle applies to many stair, grid, and constrained path optimization problems.


### Flashcard
Use DP where dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2]); can reach top from either last or second-last step.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Climbing Stairs(climbing-stairs) (Easy)
- Find Number of Ways to Reach the K-th Stair(find-number-of-ways-to-reach-the-k-th-stair) (Hard)