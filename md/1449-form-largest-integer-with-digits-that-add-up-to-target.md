### Leetcode 1449 (Hard): Form Largest Integer With Digits That Add up to Target [Practice](https://leetcode.com/problems/form-largest-integer-with-digits-that-add-up-to-target)

### Description  
You are given an array `cost` of length 9, where `cost[i]` is the cost of using digit (i+1). You are also given an integer `target`. Return the **largest integer** (as a string) that can be formed under the following rules:
- The sum of the costs of its digits is exactly target.
- Each digit can be used as many times as you like.
If it is impossible to meet the target, return "0".

### Examples  

**Example 1:**  
Input: `cost = [4,3,2,5,6,7,2,5,5]`, `target = 9`
Output: `7772`
*Explanation: 7, 7, 7, 2 (costs: 2+2+2+3=9), which is the largest integer possible.*

**Example 2:**  
Input: `cost = [7,6,5,5,5,6,8,7,8]`, `target = 12`
Output: `85`
*Explanation: 8 (cost=7) + 5 (cost=5), total cost=12.*

**Example 3:**  
Input: `cost = [2,4,6,2,4,6,4,4,4]`, `target = 5`
Output: `0`
*Explanation: It's impossible to form target sum with these costs.*

### Thought Process (as if you’re the interviewee)  
We need a solution similar to the **unbounded knapsack problem**, but instead of maximizing value, we're maximizing the "number of digits" (and for ties, prefer bigger digits). Dynamic programming fits:
- dp[t]: Largest number (as string) able to be formed with total cost t.
- For each t from 1 to target, try all digits. If t-cost[d] ≥ 0 and dp[t-cost[d]] ≠ "", try appending digit (d+1) and pick the best (prefer lexicographically larger values).
Implementation must ensure digits are appended in order to get the largest possible number.

### Corner cases to consider  
- Not possible to sum to target: output is "0".
- Leading zeros not allowed (digits 1-9).
- Multiple combinations sum to target; pick lexicographically largest.
- Duplicates of digits allowed (unlimited use).

### Solution

```python
def largestNumber(cost: list[int], target: int) -> str:
    dp = ["-inf"] * (target + 1)
    dp[0] = ""   # zero cost: empty string
    for t in range(1, target + 1):
        for d in range(8, -1, -1):  # start from 9 for lexicographically larger
            if t >= cost[d] and dp[t - cost[d]] != "-inf":
                cand = dp[t - cost[d]] + str(d+1)
                if len(cand) > len(dp[t]) or (len(cand) == len(dp[t]) and cand > dp[t]):
                    dp[t] = cand
    return dp[target] if dp[target] != "-inf" else "0"
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(9 × target), try every digit at every cost up to target.
- **Space Complexity:** O(target × m), where m is max number of digits in any dp[t].

### Potential follow-up questions (as if you’re the interviewer)  
- How would you handle very large target (e.g., >10⁵)?
  *Hint: Optimize states, prune dominated partial results, or use iterative construction unbiased by lex order if possible.*

- How to output the smallest integer if asked?
  *Hint: Process digits from 1 to 9, adjust comparison for min rather than max.*

- What if some digits are forbidden (cost is infinite)?
  *Hint: Just skip those digits in iteration.*

### Summary
This is a DP (unbounded knapsack) with strings as states, maximizing lex order and length. It’s a classic digit-dp problem, similar to coin change and integer composition with digit constraints.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
