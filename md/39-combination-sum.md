### Leetcode 39 (Medium): Combination Sum [Practice](https://leetcode.com/problems/combination-sum)

### Description  
Given a list of **distinct positive integers** (`candidates`) and a positive integer (`target`), find all unique combinations of candidates that sum up to the target.  
- **Each number** in candidates **may be used unlimited times** in the combination.
- **Order doesn't matter** in a combination (i.e., `[2,2,3]` is the same as `[2,3,2]`).
- Combinations are unique if their frequency of elements differs.
- Return **all possible unique combinations**, in any order.

### Examples  

**Example 1:**  
Input: `candidates = [2,3,6,7], target = 7`  
Output: `[[2,2,3],]`  
*Explanation: All possible ways to sum up to 7: use 2+2+3 or 7 by itself.*

**Example 2:**  
Input: `candidates = [2,3,5], target = 8`  
Output: `[[2,2,2,2],[2,3,3],[3,5]]`  
*Explanation:  
- 2+2+2+2 = 8  
- 2+3+3 = 8  
- 3+5 = 8  
You may use each value as many times as possible to reach the target.*

**Example 3:**  
Input: `candidates = [2], target = 1`  
Output: `[]`  
*Explanation: The only candidate is 2, which is greater than the target. No combinations are possible.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try **all possible combinations** of the numbers, count the sum, and add if it matches the target.

- **Optimized (Backtracking):**  
  Use a **backtracking** DFS approach:
  - At each recursive step, decide whether to pick a candidate (repeatedly) or move to the next.
  - Keep track of the current combination and remaining target.
  - If remaining target == 0, add the current combination to the result.
  - If remaining target < 0, prune this path.
  - Iterate candidates using a start index (so we don't generate duplicate combinations or revisit previous choices).

- **Why backtracking?**  
  The problem needs us to try combinations, not permutations. Backtracking naturally avoids duplicates and can prune impossible paths quickly. It's modular, readable, and fits the problem constraints.

**Trade-offs:**  
- Backtracking can have exponential time in the worst case, but constraints keep the number of result combinations manageable.

### Corner cases to consider  
- Empty candidates array.
- target smaller than the smallest candidate value.
- Only one element in candidates.
- Candidates contains only one number, repeated to sum up to target.
- All candidates are larger than target.
- target == 0.

### Solution

```python
def combinationSum(candidates, target):
    result = []

    def backtrack(remaining, combo, start):
        if remaining == 0:
            # Found a valid combination, append a copy (important!)
            result.append(list(combo))
            return
        if remaining < 0:
            # Exceeded the sum, stop exploring this path
            return

        for i in range(start, len(candidates)):
            num = candidates[i]
            # Choose the number, since it's unlimited use, do not increment i
            combo.append(num)
            backtrack(remaining - num, combo, i)
            # Backtrack, remove the last chosen
            combo.pop()

    backtrack(target, [], 0)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Exponential in nature.  
  In the worst case, explore all combinations: can be O(Nᵗ),  
  where N is number of candidates and t is target divided by the smallest candidate value, i.e., O(N^(T/M+1)),  
  with T = target, M = min(candidates).

- **Space Complexity:**  
  O(T/M) due to the recursion stack (T = target, M = minimum candidate value), plus storage for results (up to 150 combinations, per constraints).

### Potential follow-up questions (as if you’re the interviewer)  

- What if candidates may include **duplicates**?  
  *Hint: Sort first and skip duplicates during recursion.*

- What if each number can be **used only once**?  
  *Hint: Move start index forward for each recursion, don't reuse current value.*

- How would you handle **very large lists of candidates** or **targets**?  
  *Hint: Discuss dynamic programming or memoization for sub-sum reuse.*

### Summary
This problem uses the **backtracking / DFS** pattern to exhaustively search all combinations of numbers that sum up to a target, allowing each number to be reused. This coding pattern is commonly applied to other "combination" and "subset" style problems, and can be adapted for variants like using each element once (subset sum), or where input may have duplicates.


### Flashcard
Use backtracking DFS to explore all combinations; pick/reject each candidate, recurse, and add combination if sum matches target.

### Tags
Array(#array), Backtracking(#backtracking)

### Similar Problems
- Letter Combinations of a Phone Number(letter-combinations-of-a-phone-number) (Medium)
- Combination Sum II(combination-sum-ii) (Medium)
- Combinations(combinations) (Medium)
- Combination Sum III(combination-sum-iii) (Medium)
- Factor Combinations(factor-combinations) (Medium)
- Combination Sum IV(combination-sum-iv) (Medium)
- The Number of Ways to Make the Sum(the-number-of-ways-to-make-the-sum) (Medium)