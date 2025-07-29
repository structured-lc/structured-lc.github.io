### Leetcode 967 (Medium): Numbers With Same Consecutive Differences [Practice](https://leetcode.com/problems/numbers-with-same-consecutive-differences)

### Description  
Given two integers `n` and `k`, return all integers of length `n` such that the absolute difference between every two consecutive digits is exactly `k`. Every number should have no leading zeros.  
For example, if `n=3` and `k=7`, valid numbers include 181 and 292 because the absolute differences between consecutive digits are equal to 7 (e.g., |1−8|=7 and |8−1|=7).  
You can return the answer in any order.

### Examples  

**Example 1:**  
Input: `n=3, k=7`  
Output: `[181, 292, 707, 818, 929]`  
*Explanation: All valid 3-digit numbers: 181 (|1-8|=7, |8-1|=7), 292 (|2-9|=7, |9-2|=7), etc. No leading zero allowed.*

**Example 2:**  
Input: `n=2, k=1`  
Output: `[10, 12, 21, 23, 32, 34, 43, 45, 54, 56, 65, 67, 76, 78, 87, 89, 98]`  
*Explanation: All valid 2-digit numbers with adjacent digit difference 1 (e.g., 23: |2-3|=1), no number like 01 or 09 since leading zeros are forbidden.*

**Example 3:**  
Input: `n=2, k=0`  
Output: `[11, 22, 33, 44, 55, 66, 77, 88, 99]`  
*Explanation: Only numbers with identical consecutive digits, since k=0.*

### Thought Process (as if you’re the interviewee)  
- Start by observing that brute force is not feasible since numbers can be up to 10⁹ in size.
- Instead, treat the problem like generating all possible numbers of length `n` via **backtracking/DFS**:
    - Each step, try to append a next digit such that its difference with the previous digit is exactly `k`.
    - Skip any number that would introduce a leading zero.
- Begin with digits 1-9 (since leading zeros not allowed for n>1).
- For every next step, add either (last digit + k) or (last digit - k) as long as it's between 0..9.
- Special care: if `k = 0`, don't add the same number twice (since +0 and -0 are the same).
- After building numbers of length `n`, add them to the result.

### Corner cases to consider  
- n = 1: All digits 0..9 are allowed (since single-digit numbers can be 0).
- k = 0: Prevent generating duplicates, only one branch per extension.
- k > 9: Infeasible since difference can't exceed 9, but as per constraints, 0 ≤ k ≤ 9.
- Large n: Ensure recursion does not overflow and result fits in reasonable memory.
- Numbers ending/beginning with 0: Ensure no leading zeros except possibly for n=1.

### Solution

```python
def numsSameConsecDiff(n, k):
    results = []

    # For n == 1, single-digit numbers are allowed, including 0.
    if n == 1:
        return [i for i in range(10)]

    def dfs(num, length):
        if length == n:
            results.append(num)
            return
        last_digit = num % 10
        # Next possible digits
        next_digits = set()
        next_digits.add(last_digit + k)
        if k != 0:
            next_digits.add(last_digit - k)
        for next_digit in next_digits:
            if 0 <= next_digit <= 9:
                dfs(num * 10 + next_digit, length + 1)

    # Start with digits 1..9 (no leading zero)
    for start in range(1, 10):
        dfs(start, 1)
    return results
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ⁿ × n).  
  For each position, at most two choices (depending on k and current digit). The number of generated numbers is at most 2ⁿ (precise value depends on k). For each number, construction takes O(n) time due to recursion stack.
- **Space Complexity:** O(2ⁿ).  
  Required for the recursion call stack and to store the result list; output dominates for large n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large n (n > 16) when output list may not fit in memory?  
  *Hint: Consider using generators or streaming results instead of returning a full list.*

- Can you generate the numbers in sorted order without sorting the final result?  
  *Hint: Use BFS and level-order traversal to build numbers in order.*

- How would you count the number of valid numbers without generating them all?  
  *Hint: Use DP—memoize the count of numbers for each (current digit, length left) combination.*

### Summary
This problem is a classic example of **Digit DP / Backtracking**, very similar to "Letter Combinations of a Phone Number" but with custom digit constraints. The recursive (DFS) pattern to build each possible number stepwise and filter via constraints is common. This technique applies well to combinatorial generation of codes, PINs, or digit strings with constraints.