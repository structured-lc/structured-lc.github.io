### Leetcode 254 (Medium): Factor Combinations [Practice](https://leetcode.com/problems/factor-combinations)

### Description  
Given an integer **n**, return all possible combinations of its factors (integers greater than 1 and less than *n*) such that the product of those factors is exactly **n**. Each combination should be in non-decreasing order, and combinations with the same set of factors but in different orders should not be repeated. *For example, for n = 12, possible combinations include [2,6], [2,2,3], [3,4]. Factors like 1 and n itself are not included as factors.*

### Examples  

**Example 1:**  
Input: `n = 8`  
Output: `[[2,4],[2,2,2]]`  
*Explanation: 8 = 2×4, 8 = 2×2×2. [4,2] is not allowed because we require non-decreasing order.*

**Example 2:**  
Input: `n = 12`  
Output: `[[2,6],[2,2,3],[3,4]]`  
*Explanation: 12 = 2×6, 2×2×3, 3×4. Only show unique, sorted combinations.*

**Example 3:**  
Input: `n = 15`  
Output: `[[3,5]]`  
*Explanation: 15 = 3×5. 5×3 is not allowed because it is not non-decreasing order.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Try all sets of numbers from 2 to n-1, generating every possible subset and checking if their product equals n. This is very inefficient—combinatorially explosive as n grows.
- **Backtracking:**  
  Since the number of factors multiplies quickly, a better strategy is to **recursively build factor combinations**, starting from the lowest possible factor (2) and only moving upwards.  
  For each divisor of n greater than or equal to the current factor, if it divides n, append it to the combination and recursively factor n // divisor from there. This guarantees that the resulting combinations are sorted and avoids duplicates.
- **Pruning:**  
  Stop at factors greater than √n, because larger factors will only appear after their smaller pair has already been generated.
- **Why this works:**  
  Backtracking ensures we try all viable combinations without repeats, and only in non-decreasing order. The search space is reduced by pruning, and recursion naturally handles the branching structure of combinations.

### Corner cases to consider  
- **n = 1** or **n = 0**: not valid; should return `[]`
- **n** is a prime number: should return `[]` (no factorization possible)
- **n = 2**: should return `[]` (can’t use 1 or n as a factor)
- Duplicate factors: combinations like [2,4] vs [4,2]—should only allow non-decreasing order ([2,4])
- Large n, e.g., `n = 10⁷`: efficiency of your recursion/pruning matters

### Solution

```python
def getFactors(n):
    def backtrack(start, num, path, res):
        # Always start from 'start' to enforce non-decreasing order
        for factor in range(start, int(num ** 0.5) + 1):
            if num % factor == 0:
                # Add [current path + next factor + paired factor] to result
                res.append(path + [factor, num // factor])
                # Recursively break down further with factor
                backtrack(factor, num // factor, path + [factor], res)
    
    res = []
    backtrack(2, n, [], res)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(2^√n) —  
  Each number up to √n could be the start of a new combination. Because we only branch on valid factors (not every integer in range), and stop when num // factor < factor, this is far better than brute-force.
- **Space Complexity:**  
  O(log n) (recursion stack) + O(A) (for answers themselves).  
  At most log n recursion depth for any path.  
  Extra space is proportional to the total number of valid combinations.

### Potential follow-up questions (as if you’re the interviewer)  

- If you needed to produce the combinations in strictly lexicographic or numeric order, how would you guarantee that?  
  *Hint: Sorting at the end, or careful selection of the order in backtracking recursion.*
  
- How would you modify the solution to **count** the number of combinations instead of returning the combinations themselves?  
  *Hint: Use a counter variable incremented at each result instead of collecting lists.*

- If the allowed factors include 1, or we can use n itself, how does that change the approach?  
  *Hint: You’ll need to adjust your recursion to consider these as valid; be careful of infinite loops with 1!*

### Summary
This problem uses the **backtracking/DFS pattern** to generate all unique, sorted factor combinations without repetition or reordering. Pruning with the sqrt(n) boundary and enforcing non-decreasing order makes this both efficient and correct. Variants of this pattern appear in integer partitioning, combination sum, and recursive factorization problems.