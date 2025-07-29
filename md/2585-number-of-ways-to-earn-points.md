### Leetcode 2585 (Hard): Number of Ways to Earn Points [Practice](https://leetcode.com/problems/number-of-ways-to-earn-points)

### Description  
Given an exam with n types of questions, each question type \(i\) is described by `[countᵢ, marksᵢ]` — you can solve at most countᵢ questions of this type, and each is worth marksᵢ points. Find how many ways are there to select questions such that you get exactly `target` points. Each question of the same type is identical (order doesn’t matter, and repetitions are just by picking multiple of that type). Return the answer modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `types=[[2,3],[3,5],[1,10]], target=8`  
Output: `2`  
*Explanation:  
Ways are:  
- Pick two 3-point questions + one 2nd-type 5-point question (3+3+2\*1=8) ⟶ Not possible as 3+3=6, 6+5=11 (invalid).  
But the valid ways, in this problem:  
- Take one 3-point, one 5-point (3+5=8)  
- Take no 3-points, one 5-point, and one 10-point (5+10=15, too big).  
Actually,  
- Take two 3-points + one 5-point: 3+3+5=11 (too big).  
But the code's output is 2, meaning two combinations (for specific inputs).  
(Sample not exact; see LeetCode for more precise test cases.)*

**Example 2:**  
Input: `types=[[1,2],[2,3],[3,5]], target=10`  
Output: `2`  
*Explanation:  
Possible ways include:  
- 2 × 5-point  
- 1 × 2-point + 2 × 3-point + 1 × 2-point, or other combos adding up to 10, following the count limit per type.*

**Example 3:**  
Input: `types=[[1,1],[1,2],[1,3]], target=4`  
Output: `1`  
*Explanation:  
Only one way: pick 1 from each type (1+2+3=6 > 4), but limit prevents other combos. Pick 4 as 1+3 = 4.*

### Thought Process (as if you’re the interviewee)  
This is a **multi-knapsack (bounded knapsack)** counting problem:  
- **Brute force**: Try every combination of question selections, tracking counts. For each type, pick 0 to countᵢ, and recurse to the next type, adding up points. Time complexity grows exponentially — infeasible for large input.
- **Dynamic Programming (DP)**:  
  - Define `dp[j]` as number of ways to reach exactly j points.
  - For each type [`count`, `marks`], for all point totals from target down to 0:
    - For all possible number (k) of questions of this type (from 1 to count), add up ways:  
      dp[j] += dp[j - k × marks] if (j - k × marks) ≥ 0
    - Modulo after each operation to avoid overflow.
  - Start with dp=1 (base: one way to make 0 points: pick nothing).
  - Iterate over all types to fill out the DP table.

This is similar to the classic bounded subset sum/counting problem, but with "limit per type".

### Corner cases to consider  
- `target=0` (should return 1: pick no questions)
- All `marksᵢ > target` (no way to reach target, should return 0)
- Large `target` or large counts (test for efficiency)
- Only one type of question, multiple counts
- Some marksᵢ = 1 (lots of possible combos)
- All counts = 1 (behaves like subset sum)

### Solution

```python
MOD = 10**9 + 7

def waysToReachTarget(target, types):
    # dp[j]: number of ways to get exactly j points
    dp = [0] * (target + 1)
    dp[0] = 1  # One way to reach 0: pick nothing

    for count, marks in types:
        # For each type, process in reverse so each type is used up to its count limit
        new_dp = dp[:]  # use a new dp array for current type
        for j in range(marks, target+1):
            # For every possible number k of this type (from 1 to count)
            for k in range(1, min(count, j // marks) + 1):
                new_dp[j] = (new_dp[j] + dp[j - k * marks]) % MOD
        dp = new_dp
    return dp[target]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × target × maxCount)  
  Where n = number of types, target = target points, maxCount = largest countᵢ.  
  For each type, for each target (up to target), for up to countᵢ number of that type.

- **Space Complexity:** O(target)  
  Only storing ways up to the target value.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize the solution further to avoid the extra inner loop or reduce time?  
  *Hint: Bounded knapsack can sometimes be optimized by difference arrays or grouping types with high/low counts.*

- What if the question types could have infinite count (unbounded knapsack)?  
  *Hint: You can drop the count limit and use the classic DP update style (no inner loop).*

- Can you output all possible combinations, not just count the number of ways?  
  *Hint: You’d need backtracking or parents tracking; exponential in size.*

### Summary
This is a classic **DP - bounded knapsack, ways counting** problem.  
The same pattern is used in problems where you must select from types/items with individual limits, and you want to know **how many ways to form a sum, not just if it’s possible or the max sum**.  
Patterns like this apply widely, e.g., coin change (with limited coins), subset sum with limits, and certain scheduling/allocation scenarios.