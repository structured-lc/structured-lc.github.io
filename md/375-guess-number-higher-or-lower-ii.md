### Leetcode 375 (Medium): Guess Number Higher or Lower II [Practice](https://leetcode.com/problems/guess-number-higher-or-lower-ii)

### Description  
This problem asks you to design a strategy to guarantee a win in a **number guessing game with a cost**.  
Given an integer **n**, you must guess a number from 1 to **n**.  
- Each time you guess a number **x** and it's incorrect, you pay **$x**.
- You’re told whether the target is higher or lower after each guess.
- You win by guessing the correct number.

Your goal: **Find the minimum amount of money required to guarantee a win**, no matter what the actual number is.  
Unlike standard binary search (which minimizes number of guesses), here you aim to minimize the **maximum cost** you could possibly pay in the worst case.

### Examples  

**Example 1:**  
Input: `n = 1`  
Output: `0`  
*Explanation: Only one number to pick. No guesses or costs needed.*

**Example 2:**  
Input: `n = 2`  
Output: `1`  
*Explanation:  
- Guess 1:  
  - If it's correct, cost = 0.  
  - If not, the answer is 2; you pay $1 for guessing, and win on 2 without extra cost.  
  - The worst-case cost here is $1.*

**Example 3:**  
Input: `n = 10`  
Output: `16`  
*Explanation:  
- Strategic guessing minimizes the worst-case cost.  
- (For example, guessing 4, then 7 or 9, etc; see further below for the strategy.  
  - No matter where the answer is, the total paid will not exceed $16.)*

### Thought Process (as if you’re the interviewee)  
This is a classic **DP minimax** (dynamic programming + minimax) problem.

Brute-force:  
- For range [l, r], guess any number x in [l, r].  
- If wrong:  
   - Pay $x,  
   - then, depending if the answer is higher or lower, get min guaranteed cost in either [l, x-1] or [x+1, r].
- To guarantee a win, we must assume the adversary will pick the outcome costing us most.  
- So, at each step, cost for guessing x is:  
  `cost = x + max(dp[l][x-1], dp[x+1][r])`
- We want the **minimum** over all choices of x:  
  `dp[l][r] = min { x + max(dp[l][x-1], dp[x+1][r]) } for all x in [l, r]`

Optimization:  
- Subproblems overlap: use memoization.
- For n up to 200, time complexity is O(n³): O(n²) subranges × O(n) possible guesses per subrange.

Tradeoffs:  
- We can't use simple greedy/binary search, because cost is not symmetric – sometimes it’s cheaper to risk with a guess closer to the end if that minimizes the worst-case cost from both sides.

### Corner cases to consider  
- n = 1 (no guess needed)
- n = 2 or n = 3 (test boundary DP initialization)
- Subranges where l >= r (no cost, already found)
- Very large n (test time/space)

### Solution

```python
def getMoneyAmount(n):
    # dp[l][r] = minimum money to guarantee a win in range [l, r]
    dp = [[0] * (n + 2) for _ in range(n + 2)]  # extra padding to avoid index checks

    # Length of guess range: start from 2 since range of size 1 means zero cost
    for length in range(2, n + 1):
        for l in range(1, n - length + 2):
            r = l + length - 1
            dp[l][r] = float('inf')
            for x in range(l, r + 1):
                cost_left = 0 if x == l else dp[l][x - 1]
                cost_right = 0 if x == r else dp[x + 1][r]
                cost = x + max(cost_left, cost_right)
                dp[l][r] = min(dp[l][r], cost)
    return dp[1][n]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³), due to three nested loops (subrange length, subrange start, and guess point x inside each subrange).
- **Space Complexity:** O(n²), for the DP table where dp[l][r] stores solutions for all pairs 1 ≤ l ≤ r ≤ n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you reconstruct the optimal guess sequence for a given n?  
  *Hint: Store the x that gives minimal cost at each dp[l][r] and backtrack from there.*

- Could you reduce the time complexity below O(n³)?  
  *Hint: Think about monotonicity or using advanced DP optimizations if possible—often not trivial here.*

- How would this problem change if the cost for a wrong guess was fixed or followed another rule?  
  *Hint: The DP structure would change; model the new cost formula accordingly.*

### Summary
This problem is a **minimax DP** classic: you build up solutions for small ranges to solve the larger range, always minimizing the maximum possible cost (worst-case).  
It uses a DP table to remember solutions for each subrange and simulates all possible initial guesses for each range to guarantee minimum loss.  
This pattern—breaking a range, picking a "pivot," and minimizing the largest subproblem—is common in problems about worst-case performance and can be applied to other guess, search, or interval DP challenges.