### Leetcode 526 (Medium): Beautiful Arrangement [Practice](https://leetcode.com/problems/beautiful-arrangement)

### Description  
Given an integer n, count the number of *beautiful arrangements* you can form using numbers 1 to n, where a *beautiful arrangement* is defined as a permutation of 1 to n such that for every position i (1-based), either:
- The number at position i divides i, **or**
- i divides the number at position i.

In other words, for each position i, either permutation[i] % i == 0 or i % permutation[i] == 0.

### Examples  

**Example 1:**  
Input: `n = 2`  
Output: `2`  
*Explanation: The possible arrangements are [1, 2] (1 divides 1, 2 divides 2) and [2, 1] (2 divides 1, 1 does not divide 2 but 2 divides 1). Both are "beautiful".*

**Example 2:**  
Input: `n = 1`  
Output: `1`  
*Explanation: Only arrangement is [1], which trivially satisfies the condition.*

**Example 3:**  
Input: `n = 3`  
Output: `3`  
*Explanation: The "beautiful" arrangements are [1,2,3], [2,1,3], and [3,2,1]. Each arrangement meets the divisibility condition for its positions.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Generate all n! permutations of numbers 1 to n, and for each permutation, check if it is a *beautiful arrangement* by evaluating the divisibility condition at every position.
  - This works for small n, but it is not feasible for n up to 15 because 15! is computationally too large.

- **Optimization:**  
  Use **backtracking** to build the permutation step by step.
  - At each position i (from 1 to n), try each unused number only if it meets the divisibility condition with i.
  - Mark a number as used, recurse to the next position, then unmark after recursion (backtrack).
  - This approach skips invalid branches early, drastically reducing computation.

- **Further optimization:**  
  Precompute for each position i the list of numbers it could contain (i.e., numbers where either i % num == 0 or num % i == 0).
  - Backtracking proceeds by picking numbers from this filtered list, building up valid arrangements much faster.

**Trade-off explanation:**  
Backtracking with pruning is optimal here: it combines the flexibility of trying all arrangements with the efficiency of constraint checking.

### Corner cases to consider  
- n = 1 (single element, should return 1)
- n = 2 (minimum case with different answers)
- No arrangements possible (for higher n this will not occur since there is always at least one)
- All numbers are coprime with their index (no such case within given constraints)
- Large n (tests efficiency and correctness for upper bound)

### Solution

```python
def countArrangement(n: int) -> int:
    # Precompute possible candidates for each position (1-based indices)
    # position_candidates[i]: which nums can we place at position i?
    position_candidates = [[] for _ in range(n + 1)]
    for pos in range(1, n + 1):
        for num in range(1, n + 1):
            if pos % num == 0 or num % pos == 0:
                position_candidates[pos].append(num)
    
    count = 0
    used = [False] * (n + 1)  # 1-based index for easily matching numbers

    def backtrack(pos):
        nonlocal count
        if pos > n:
            count += 1
            return
        for num in position_candidates[pos]:
            if not used[num]:
                used[num] = True
                backtrack(pos + 1)
                used[num] = False

    backtrack(1)
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - *O(n!)* in the worst case. However, pruning with divisibility checks brings it much lower for larger n. The number of recursive calls is not exactly n! but depends on how many candidates are valid at each position. 
- **Space Complexity:**  
  - *O(n²)* due to precomputed position_candidates and *O(n)* for the used array and recursion stack (max depth n).

### Potential follow-up questions (as if you’re the interviewer)  

- If we wanted to print all possible beautiful arrangements instead of just counting them, how would you modify the solution?  
  *Hint: Collect the permutations in a results list during the backtracking process.*
  
- How would you optimize memory usage for very large n?  
  *Hint: Instead of precomputing candidates, generate candidates for each position on the fly.*

- What if the divisibility condition changed to only “number at position divides index” and not the other way round?  
  *Hint: Only allow num if i % num == 0 for position i.*

### Summary

This problem is a great example of classic **backtracking with pruning**, leveraging permutation generation with custom constraints. The solution pattern applies to many problems involving arrangements or placements with "positional rules", such as N-Queens, Sudoku, or seating charts with preferences. Efficient pruning via precomputation or dynamic checks is key to making solutions tractable for large input sizes.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Backtracking(#backtracking), Bit Manipulation(#bit-manipulation), Bitmask(#bitmask)

### Similar Problems
- Beautiful Arrangement II(beautiful-arrangement-ii) (Medium)