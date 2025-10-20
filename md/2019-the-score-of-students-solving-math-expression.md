### Leetcode 2019 (Hard): The Score of Students Solving Math Expression [Practice](https://leetcode.com/problems/the-score-of-students-solving-math-expression)

### Description  
Given a string `s` representing a math expression containing **digits (0-9)** and only **'+'** and **'\*'** operators (no parentheses), and a list of integers `answers` representing students' submitted answers:
- Compute the "correct" answer using **standard operator precedence** ('\*' before '+').
- For each student answer:
  - Award **5 points** if it matches the correct answer.
  - Award **2 points** if it is a possible answer by inserting parentheses in any way (thus, any valid value from *any* parenthesization) but not the strictly correct one.
  - Otherwise, 0 points.
Return the sum of all students' points.

### Examples  

**Example 1:**  
Input: `s = "7+3*1*2"`, `answers = [20,13,42]`  
Output: `7`  
*Explanation:*
- Correct evaluation: 7 + (3\*1\*2) = 7 + 6 = 13
- Possible answers by other groupings: ((7+3)\*1)\*2 = 20, etc.
- Points: [2, 5, 0] ⇒ 2+5+0=7

**Example 2:**  
Input: `s = "3+5*2"`, `answers = [13,0,10,13,13,16,16]`  
Output: `19`  
*Explanation:*
- Correct evaluation: 3 + (5\*2) = 3+10=13
- Possible others: (3+5)\*2=16
- 3 students got 13 (5 points), 2 got 16 (2 points).
- Points: [5,0,0,5,5,2,2] ⇒ total=19

**Example 3:**  
Input: `s = "6+0*1"`, `answers = [12,9,6,4,8,6]`  
Output: `10`  
*Explanation:*
- Correct: 6 + (0\*1) = 6+0=6
- Possible others: (6+0)\*1=6 too, so both are valid
- Two students got 6 (5pts), rest 0.
- Points: [0,0,5,0,0,5] = 10

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try all possible parenthesizations of `s` and evaluate their results. Store all possible outcomes in a set for lookup.
  - For every substring, split at every operator, recursively calculate left and right possible results, and combine via operator.
- **Optimization:** Use **memoization** to avoid recalculating duplicate sub-expressions. Since only '\*' and '+' and short string lengths, total possible distinct subproblems is manageable.
- After getting all possible alternative answers, scan each student answer:
  - If it matches the correct answer: 5 points.
  - Else if it is in "other possible" set (excluding correct): 2 points.
  - Else: 0.
- Trade-off: The DP/memoization approach is much faster than naive full enumeration.

### Corner cases to consider  
- Input with only one number, e.g. `"7"`  
- All same operations, e.g. all '+'
- No '+' or no '\*'
- Multiple students submitting the same answer
- Duplicate possible answers from different parenthesizations
- Large numbers; multi-digit handling not required as per prompt

### Solution

```python
def scoreOfStudents(s: str, answers: list[int]) -> int:
    # Split expression into numbers and operators
    nums, ops = [], []
    i = 0
    while i < len(s):
        if s[i].isdigit():
            nums.append(int(s[i]))
        else:
            ops.append(s[i])
        i += 1

    n = len(nums)

    # Helper: get all possible results for [l, r], inclusive
    from functools import lru_cache

    @lru_cache(None)
    def dfs(l, r):
        results = set()
        if l == r:
            results.add(nums[l])
            return results
        for k in range(l, r):
            left = dfs(l, k)
            right = dfs(k+1, r)
            op = ops[k]
            for a in left:
                for b in right:
                    if op == '+':
                        val = a + b
                    else:  # '*'
                        val = a * b
                    # The problem says only consider results ≤ 1000.
                    if 0 <= val <= 1000:
                        results.add(val)
        return results

    # Compute the correct answer using normal evaluation
    def eval_correct(nums, ops):
        n = len(nums)
        stack = [nums[0]]
        for idx, op in enumerate(ops):
            if op == '+':
                stack.append(nums[idx+1])
            else:  # '*'
                stack[-1] *= nums[idx+1]
        return sum(stack)

    correct = eval_correct(nums, ops)
    possible = dfs(0, n-1)
    total = 0
    for ans in answers:
        if ans == correct:
            total += 5
        elif ans in possible:
            total += 2
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³)  
  - n = number of numbers in the string.
  - Each subproblem (l, r) considered once, and for each split, may combine all left and right options.
- **Space Complexity:** O(n² × v), where v = number of possible results per subproblem (at most all in 0..1000). Mainly from DP/memoization cache.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there were more possible operators (e.g., '-', '/'), or multi-digit numbers?  
  *Hint: How would you refactor the parser and the DP logic?*

- Can we further optimize memory use for very large expressions?  
  *Hint: Is it necessary to keep sets for all subproblems? Can we discard or merge them?*

- How would you handle expressions with parentheses explicitly given as input?  
  *Hint: How would parsing/evaluation logic change?*

### Summary
This problem uses a **recursive DP with memoization** approach for all possible ways to evaluate an arithmetic expression, a classic "all possible results from different groupings" pattern. Efficient memoization is key. The pattern applies to many problems involving all possible computation orderings, such as "different ways to add parentheses" or "evaluate all expressions".


### Flashcard
Evaluate math expressions by using memoization to avoid recalculating sub-expressions.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), String(#string), Dynamic Programming(#dynamic-programming), Stack(#stack), Memoization(#memoization)

### Similar Problems
- Basic Calculator(basic-calculator) (Hard)
- Different Ways to Add Parentheses(different-ways-to-add-parentheses) (Medium)