### Leetcode 216 (Medium): Combination Sum III [Practice](https://leetcode.com/problems/combination-sum-iii)

### Description  
Given two integers, **k** and **n**, the task is to find all unique combinations of **k distinct** numbers from **1 to 9** such that the sum is exactly **n**. Each number can be *used at most once* in each combination, and combinations must be unique (order does not matter).  
This is a classic **backtracking/combinatorial** problem that explores sets of limited, consecutive numbers, respecting a fixed combination size and total.

### Examples  

**Example 1:**  
Input: `k = 3, n = 7`  
Output: `[[1,2,4]]`  
*Explanation: The only set of three distinct numbers from 1–9 that add up to 7 is {1,2,4}.*

**Example 2:**  
Input: `k = 3, n = 9`  
Output: `[[1,2,6], [1,3,5], [2,3,4]]`  
*Explanation: The valid groupings (no repeats, size 3, numbers 1–9) that sum to 9:*
- 1+2+6 = 9  
- 1+3+5 = 9  
- 2+3+4 = 9

**Example 3:**  
Input: `k = 4, n = 1`  
Output: `[]`  
*Explanation: No four distinct numbers from 1–9 can sum to just 1, so the result is empty.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force** would attempt all possible k-sized subsets of 1–9 (totaling \( \binom{9}{k} \)), checking if their sum matches n.  
- Given that numbers are small (1–9) and k is small (up to 9), **backtracking** is preferred — recursively build up combinations, add a number only if it does not exceed n, and continue until exactly k elements are in the path.  
- Early **pruning**:  
  - Stop recursion if the current sum > n or subset size > k.
  - Avoid repeats by only considering numbers strictly greater than the previous pick.
- Trade-offs: Backtracking efficiently prunes impossible cases early, reducing the number of total recursive calls, and is simple to code given the small search space.

### Corner cases to consider  
- n is too small or too large to form with k distinct numbers from 1–9
- k > 9 (impossible; since only numbers 1–9 are allowed)
- Multiple combinations produce the same sum; ensure no duplicates by always building combos in increasing order.
- Empty output when no valid combo exists
- k or n at the minimum or maximum end of constraints

### Solution

```python
def combinationSum3(k, n):
    # Helper function for backtracking
    def backtrack(start, path, total):
        # If the combination is complete
        if len(path) == k and total == n:
            result.append(list(path))
            return
        # If we've used too many numbers or gone over the target, stop
        if len(path) > k or total > n:
            return
        # Try next candidates, increasing to avoid repeats
        for i in range(start, 10):
            path.append(i)
            backtrack(i + 1, path, total + i)
            path.pop()
    result = []
    backtrack(1, [], 0)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** \(O(\binom{9}{k})\) in the worst case, as we may generate all k-sized subsets of numbers 1–9. However, pruning due to the sum constraint reduces work considerably.
- **Space Complexity:** \(O(k)\) for each recursive call stack, plus up to \(O(\text{number of valid combinations} \times k)\) for the output storage.


### Potential follow-up questions (as if you’re the interviewer)  

- What if **repeats of numbers** (1–9) were allowed in combinations?
  *Hint: Modify adding logic to not increment start index.*
- How would you handle numbers from a **larger set** (e.g., 1–20)?
  *Hint: The current solution works, but pruning and runtime may be impacted; further optimizations/DP may be explored.*
- Can you return **just the count** of such combinations instead of listing them?
  *Hint: Instead of accumulating results, increment a counter.*

### Summary
This problem uses the **backtracking** pattern, exhaustively constructing combinations subject to constraints (set size, element sum, no repeats). The search is efficient due to constrained input and early pruning, and the pattern is fundamental for many subset, combination, or partitioning problems (e.g., N-Queens, subset sum, k-combinations, and others).