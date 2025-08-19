### Leetcode 1155 (Medium): Number of Dice Rolls With Target Sum [Practice](https://leetcode.com/problems/number-of-dice-rolls-with-target-sum)

### Description  
Given **n** dice, each with **k** faces numbered from 1 to **k**, count the number of distinct ways to roll the dice so the sum of the rolled numbers equals **target**. Since the number of possible ways can be extremely large, return the answer modulo 10⁹ + 7.  
*Example context:* You have kⁿ possible total rolls. The problem is to count only those which sum exactly to the given target.

### Examples  

**Example 1:**  
Input: `n = 1, k = 6, target = 3`  
Output: `1`  
*Explanation: You roll one die. There’s only one way to get a 3: [{3}].*

**Example 2:**  
Input: `n = 2, k = 6, target = 7`  
Output: `6`  
*Explanation: Possible rolls for sum 7 are: [1,6], [2,5], [3,4], [4,3], [5,2], [6,1]. So 6 ways.*

**Example 3:**  
Input: `n = 30, k = 30, target = 500`  
Output: `222616187`  
*Explanation: The number is very large, so answer is returned modulo 10⁹ + 7.*

### Thought Process (as if you’re the interviewee)  
- **Brute-Force**: Try all possible combinations of n dice, each with k faces, and count only those where sum == target. This is infeasible — there are kⁿ possibilities, exponential in n.
- **Recursive DP**: Instead, for each die, try all face values (from 1 to k), and recursively calculate ways to achieve (target - face_value) with remaining dice.  
- **Top-down Memoization**: Use a helper function `dp(dice_left, remain_sum)`, cache intermediate results to avoid redundant work.
- **Bottom-up DP**: Build a dp table where `dp[i][s]` means number of ways to use i dice to build sum s; fill iteratively.
- In both approaches, reduce repeated state calculation via memoization.
- **Space/Time trade-off**: Bottom-up is usually faster, avoids deep recursion stack, but uses a table that could be of size n × target (up to 30,000).
- Since n, k ≤ 30, target ≤ 1000, DP is practical.

### Corner cases to consider  
- n = 1 (single die): Can only get sums 1..k
- target < n or target > n×k: Impossible, result is 0
- target = n or target = n×k: Only one combination (all ones or all k’s)
- k = 1: Each die can only show 1, so total sum is n. Only possible if target == n

### Solution

```python
def numRollsToTarget(n, k, target):
    MOD = 10 ** 9 + 7
    # dp[i][s]: ways to roll i dice to sum s
    dp = [[0] * (target + 1) for _ in range(n + 1)]
    dp[0][0] = 1  # 0 dice, sum 0: 1 way

    # Fill the DP table
    for dice in range(1, n + 1):
        for t in range(1, target + 1):
            # Try each face value for the current die
            for face in range(1, k + 1):
                if t - face >= 0:
                    dp[dice][t] = (dp[dice][t] + dp[dice - 1][t - face]) % MOD
    return dp[n][target]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k × target)  
  For each die (n), for each possible sum (target), try k faces.
- **Space Complexity:** O(n × target)  
  DP table stores results for every dice count and possible target sum.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize the space complexity?
  *Hint: You only need current and previous rows (try rolling array for dp).*

- What if each die had a different number of faces?
  *Hint: Store number of faces per die, update face range dynamically in loop.*

- How would you count *minimum* or *maximum* ways to reach the target with dice showing certain constraints (e.g., not allowing consecutive same faces)?
  *Hint: Modify state to include extra information about previous face (DP with more dimensions).*

### Summary
This problem is a classic case of **Dynamic Programming - Unbounded Knapsack/Subset Sum**. The solution uses states representing the number of dice and running sum, iteratively building answers from simpler subproblems. The pattern is widely applicable for dice/game probability, sum partition, and constrained counting questions.

### Tags
Dynamic Programming(#dynamic-programming)

### Similar Problems
- Equal Sum Arrays With Minimum Number of Operations(equal-sum-arrays-with-minimum-number-of-operations) (Medium)
- Find Missing Observations(find-missing-observations) (Medium)