### Leetcode 2028 (Medium): Find Missing Observations [Practice](https://leetcode.com/problems/find-missing-observations)

### Description  
Given some results from rolling an m-sided die (`rolls` list), you are told that `n` results are missing. You also know the mean (average) of all n + m dice rolls is `mean`. Your task is to reconstruct one possible list of the missing n rolls (each between 1 and 6, inclusive), so that if you combine it with `rolls`, the overall average is exactly `mean`. If no solution is possible, return an empty list.

### Examples  

**Example 1:**  
Input: `rolls = [3, 2, 4, 3]`, `mean = 4`, `n = 2`  
Output: `[6, 6]`  
*Explanation:  
Total rolls: 4 (known) + 2 (missing) = 6  
Required sum: 4 × 6 = 24  
Sum of known rolls: 3 + 2 + 4 + 3 = 12  
Missing sum: 24 - 12 = 12  
We must find 2 numbers between 1 and 6 whose sum = 12. Only possible: [6, 6].*

**Example 2:**  
Input: `rolls = [1, 5, 6]`, `mean = 3`, `n = 4`  
Output: `[2, 3, 2, 2]`  
*Explanation:  
Total rolls: 3 + 4 = 7  
Required sum: 3 × 7 = 21  
Sum of known: 1 + 5 + 6 = 12  
Missing sum: 21 - 12 = 9  
We need 4 positive numbers between 1 and 6, summing to 9. [2, 3, 2, 2] is valid (others possible).*

**Example 3:**  
Input: `rolls = [1, 2, 3, 4]`, `mean = 6`, `n = 4`  
Output: `[]`  
*Explanation:  
Total rolls: 4 + 4 = 8  
Required sum: 6 × 8 = 48  
Sum of known: 1 + 2 + 3 + 4 = 10  
Missing sum: 48 - 10 = 38  
But the minimum sum we can make with 4 rolls (all 6's) is 24, so it is impossible.*

### Thought Process (as if you’re the interviewee)  
- We want to split up the required total sum for missing rolls in such a way that each number is between 1 and 6 inclusive.
- **Brute-force idea:** Try all combinations of n numbers (1 to 6) that sum to the missing sum. Clearly infeasible, as combinations grow exponentially.
- **Mathematical approach:**  
    - Compute the total sum required: mean × (n + m).
    - Compute the sum of known rolls.
    - Missing sum = total required sum - known sum.
    - The minimum possible sum for n rolls is n × 1; the maximum is n × 6.
    - If missing sum < n or > n × 6, return empty list (impossible).
    - To construct a valid list, start by giving all rolls a value of 1, then distribute the remaining (missing sum - n) as increments, giving each at most 5 more (to max of 6).
- This approach is efficient and guarantees valid results when possible.
- **Trade-off:** Only finds *a* valid answer, not all.

### Corner cases to consider  
- missing sum < n ⇒ impossible (can't even make up using all 1's)
- missing sum > n × 6 ⇒ impossible (can't reach sum even using all 6's)
- n = 0 (returns empty list regardless of mean and rolls)
- rolls may contain any numbers between 1 and 6 (not sorted)
- mean = 1 or mean = 6 (check min/max boundaries)
- check for large n (should be efficient, O(n))

### Solution

```python
def missingRolls(rolls, mean, n):
    m = len(rolls)
    total_needed = mean * (m + n)
    known_sum = sum(rolls)
    missing_sum = total_needed - known_sum

    # Check if missing_sum is possible
    if missing_sum < n or missing_sum > n * 6:
        return []

    # Start with n rolls of 1, distribute the rest
    result = [1] * n
    missing_sum -= n
    i = 0
    while missing_sum > 0:
        add = min(5, missing_sum)
        result[i] += add
        missing_sum -= add
        i += 1
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  We process the missing rolls in a single pass, distributing up to missing_sum among n positions.
- **Space Complexity:** O(n).  
  We create a new array of length n for the result.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to generate *all* possible valid missing rolls arrays?  
  *Hint: Think about combinations with constraints—try using recursive backtracking or DP, but beware of combinatorial explosion for large n.*

- Can you minimize the maximum value among the missing rolls?  
  *Hint: Instead of filling from left, try distributing the "extra" evenly, like an integer partition problem with constraints.*

- What if the number of sides of the die is not 6, but any k?  
  *Hint: Replace constants 1 and 6 with 1 and k and distribute as above.*

### Summary
This is a **range distribution** problem: given a fixed sum and bounds per position, generate a valid assignment.  
The coding pattern is "greedy distribution + math check," common in problems where we reconstruct a possible set or array under element-wise constraints (e.g., exam scores, equal splits, dice rolls).  
Efficient, scalable, leverages the min/max constraints, and avoids brute-force search.


### Flashcard
Calculate missing sum, then distribute it as n numbers between 1 and 6—use math to find feasible distribution, not brute-force combinations.

### Tags
Array(#array), Math(#math), Simulation(#simulation)

### Similar Problems
- Number of Dice Rolls With Target Sum(number-of-dice-rolls-with-target-sum) (Medium)
- Dice Roll Simulation(dice-roll-simulation) (Hard)