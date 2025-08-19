### Leetcode 312 (Hard): Burst Balloons [Practice](https://leetcode.com/problems/burst-balloons)

### Description  
Given a row of balloons, each balloon has a number on it. When you burst a balloon at index i, you gain coins equal to nums[left] × nums[i] × nums[right], where left and right are the immediate neighbors of i after previous balloons are burst (or 1 if out of bounds). Your goal is to burst all balloons in an order that maximizes the total coins collected.

### Examples  

**Example 1:**  
Input: `nums = [3,1,5,8]`  
Output: `167`  
*Explanation:  
Add virtual balloons: [1,3,1,5,8,1]  
- Burst 1 (index 2): 1×1×5 = 5  
- Burst 5 (index 3): 1×5×8 = 40  
- Burst 3 (index 1): 1×3×8 = 24  
- Burst 8 (index 4): 1×8×1 = 8  
Sum partials: ... (Optimized order is to burst 1, 5, 3, then 8 for max: 167)*

**Example 2:**  
Input: `nums = [1,5]`  
Output: `10`  
*Explanation:  
Add virtual balloons: [1,1,5,1]  
- Burst 1 (index 1): 1×1×5 = 5  
- Burst 5 (index 2): 1×5×1 = 5  
Total = 10*

**Example 3:**  
Input: `nums = `  
Output: `7`  
*Explanation:  
Add virtual balloons: [1,7,1]  
- Burst 7 (index 1): 1×7×1 = 7*

### Thought Process (as if you’re the interviewee)  
A brute force approach would be to try all possible ways to burst balloons, calculating the result for each permutation, but this is infeasible due to factorial growth.

Instead, notice that:
- The order impacts results since bursting a balloon changes its neighbors.
- For every range (\[i, j\]), try every possible last balloon to burst in that range. The answer for the range depends on the answer to its two subranges and the coins gained from bursting the chosen last balloon.

This hints at using **dynamic programming**:
- Define `dp[i][j]` as the maximum coins for bursting all balloons between i and j (exclusive, so balloons at i and j are not burst in this subproblem).
- For each possible length of subarray, fill the `dp` table bottom-up, considering each possible k as the last balloon to burst between i and j.

Using boundaries (virtual balloons with value 1 at both ends) simplifies edge cases.

This approach avoids recomputing overlapping subproblems and fits classic DP patterns for partition/bursting problems.

### Corner cases to consider  
- Empty input array (`[]`)
- Single balloon
- Two balloons
- Balloons with the same value
- Balloons containing a zero
- Large input size (test DP performance)
- Already surrounded by 1’s (e.g. [1, 1, 1])

### Solution

```python
def maxCoins(nums):
    # Pad with virtual balloons for easier calculation
    balloons = [1] + nums + [1]
    n = len(balloons)
    
    # DP table: dp[i][j] is max coins from (i, j), exclusive
    dp = [[0] * n for _ in range(n)]
    
    # length is the length of the interval (end - start)
    for length in range(2, n):  # At least 2 apart to have a balloon between
        for left in range(0, n - length):
            right = left + length
            # Try every possible last balloon to burst between (left, right)
            for k in range(left + 1, right):
                coins = balloons[left] * balloons[k] * balloons[right]
                coins += dp[left][k] + dp[k][right]
                if coins > dp[left][right]:
                    dp[left][right] = coins

    return dp[0][n-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³) — Three nested loops: interval length, interval start, last balloon position k.
- **Space Complexity:** O(n²) — 2D DP table of size n×n, where n = len(nums) + 2.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize the solution to use less memory?  
  *Hint: Can you compress unused parts of the DP matrix?*

- How would you generate the actual sequence of balloon bursts that yields the max coins?  
  *Hint: Keep a backtrack table to reconstruct the bursting order.*

- What if the numbers can be negative?  
  *Hint: Update DP recurrence and discuss if maximal coins can be less than zero.*

### Summary
This problem uses the **interval dynamic programming** pattern, where the optimal solution for a subarray depends on optimally splitting the interval at every possible point. This pattern is common in partition, bursting, or "build from inside out" problems. Recognizing when a problem can be reduced to optimal substructure over intervals is key to solving similar challenges efficiently.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Minimum Cost to Merge Stones(minimum-cost-to-merge-stones) (Hard)