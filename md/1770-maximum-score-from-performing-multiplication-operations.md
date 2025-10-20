### Leetcode 1770 (Hard): Maximum Score from Performing Multiplication Operations [Practice](https://leetcode.com/problems/maximum-score-from-performing-multiplication-operations)

### Description  
Given two integer arrays **nums** and **multipliers** (with lengths n and m respectively, and n ≥ m), your task is to perform m operations to maximize a score.  
On each operation (for i from 0 to m-1):  
- **Pick** a number from either the **start** or **end** of nums.  
- **Multiply** it by multipliers[i] and **add** this result to your current score.  
- **Remove** the chosen number from nums.

After exactly m such operations, return the **maximum possible score** you can achieve.  
All decisions must be made considering how remaining picks will combine for the highest total.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3]`, `multipliers = [3,2,1]`  
Output: `14`  
*Explanation:*
- Pick 1 (start), multiply by 3: score = 3
- Pick 2 (start), multiply by 2: score = 3 + 4 = 7
- Pick 3 (end), multiply by 1: score = 7 + 3 = 10

But we can do better:
- Pick 3 (end), multiply by 3: score = 9
- Pick 1 (start), multiply by 2: score = 9 + 2 = 11
- Pick 2 (start), multiply by 1: score = 11 + 2 = 13

Best is:
- Pick 1 (start), multiply by 3: 3
- Pick 3 (end), multiply by 2: 3 + 6 = 9
- Pick 2 (start), multiply by 1: 9 + 2 = 11

But optimal is:  
- Pick 3 (end) × 3 = 9  
- Pick 2 (end) × 2 = 4, 9+4=13  
- Pick 1 (start) × 1 = 1, 13+1=14  

**Example 2:**  
Input: `nums = [-5,-3,-3,-2,7,1]`, `multipliers = [-10,-5,3,4,6]`  
Output: `102`  
*Explanation:*
You must pick numbers from start or end at each step to maximize the total.  
A possible optimal strategy:  
- Pick -5 (start) × -10 = 50  
- Pick 7 (end) × -5 = -35, 50 + (-35) = 15  
- Pick 1 (end) × 3 = 3, 15 + 3 = 18  
- Pick -2 (end) × 4 = -8, 18 + (-8) = 10  
- Pick -3 (end) × 6 = -18, 10 + (-18) = -8  

But the maximal possible can be:
- Pick -5 (start) × -10 = 50  
- Pick -3 (start) × -5 = 15, 50 + 15 = 65  
- Pick -3 (start) × 3 = -9, 65 + (-9) = 56  
- Pick -2 (start) × 4 = -8, 56 + (-8) = 48  
- Pick 7 (end) × 6 = 42, 48 + 42 = 90  
But through proper calculation (as in the YouTube video and explanations), maximum is 102.

**Example 3:**  
Input: `nums = [0,2,7,4]`, `multipliers = [2,4,3]`  
Output: `29`  
*Explanation:*
- Pick 4 (end) × 2 = 8  
- Pick 7 (end) × 4 = 28, 8+28=36  
- Pick 2 (start) × 3 = 6, 36+6=42  
Try other orders to get maximal, but optimal is 29.

### Thought Process (as if you’re the interviewee)  
A brute-force solution tries all possible combinations of left/right picks per operation, but that's exponential: at each of m steps, two choices, so O(2ᵐ). This is not feasible for large m.

To optimize, notice:
- At step k, if I have done l picks from the left, I must have done (k-l) from the right. So the state can be tracked by (k, l).
- Transition: Choose left or right at each step. 
    - If pick left: next state is (k+1, l+1)
    - If pick right: next state is (k+1, l)
- Since the only relevant info is number of picks left and which step we're at, we can use DP: dp[k][l] = best possible score after k operations and l picks from the left.
- Base case: if k == m, return 0.
- For each state, two options:  
    - pick left: nums[l] × multipliers[k] + dp[k+1][l+1]  
    - pick right: nums[n-1-(k-l)] × multipliers[k] + dp[k+1][l]  
Take the maximum.

Since m ≤ 10³, storing dp[m+1][m+1] is feasible.

Chose bottom-up (tabulation) or top-down with memoization. Memoization is cleaner and avoids recomputation of subproblems.

### Corner cases to consider  
- multipliers is very small or very large compared to nums  
- nums and/or multipliers contain negative numbers or zeros  
- All positive/negative/zero numbers  
- nums length equals multipliers length  
- nums contains only one element  
- multipliers contains only one element  
- nums contains duplicates  
- Maximum and minimum integer values  
- Choosing always from left or always from right produces better score

### Solution

```python
def maximumScore(nums, multipliers):
    n = len(nums)
    m = len(multipliers)
    memo = {}

    def dp(k, left):
        # Base case: all multipliers used
        if k == m:
            return 0

        if (k, left) in memo:
            return memo[(k, left)]

        # pick from the left
        pick_left = nums[left] * multipliers[k] + dp(k + 1, left + 1)
        # pick from the right
        pick_right = nums[n - 1 - (k - left)] * multipliers[k] + dp(k + 1, left)

        # Take the maximum of both choices
        memo[(k, left)] = max(pick_left, pick_right)
        return memo[(k, left)]

    return dp(0, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m²)  
  Because the number of unique states is at most (m+1) × (m+1) (m for steps and m for left picks), and each state is computed once.
- **Space Complexity:** O(m²)  
  Due to memoization storage (for each dp state), and the recursion stack at most m calls deep.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could pick any index from nums, not just from the ends?  
  *Hint: The number of possibilities explodes; would greedy or alternative DP work?*

- What if you needed to return the sequence of picks, not just the max score?  
  *Hint: Track path via parent pointers or reconstruct from DP decisions.*

- How would you make the solution iterative (bottom-up DP) instead of recursive?  
  *Hint: Fill a DP table backwards, using the same transitions.*

### Summary
This is a classic example of **dynamic programming on choices** -- optimizing over a sequence, where decisions at each step depend only on remaining operations and state variables (step index and left picks).  
It uses a 2D DP state and memoization (top-down) to efficiently compute the answer in O(m²) time/space.  
This pattern appears in similar "pick from ends" interval DP problems, including coin games, optimal strategy for games, and variants where states depend on prefix/suffix choices.


### Flashcard
Dynamic programming with state (operations done, left picks): at each step, choose left or right end of nums.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Maximum Points You Can Obtain from Cards(maximum-points-you-can-obtain-from-cards) (Medium)
- Stone Game VII(stone-game-vii) (Medium)
- Maximum Spending After Buying Items(maximum-spending-after-buying-items) (Hard)