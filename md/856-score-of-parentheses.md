### Leetcode 856 (Medium): Score of Parentheses [Practice](https://leetcode.com/problems/score-of-parentheses)

### Description  
Given a string consisting only of balanced parentheses, compute its **score** using the following rules:  
- Every `"()"` counts as **1** point.  
- For two balanced strings side-by-side `"AB"`, the score is `score(A) + score(B)`.
- If a balanced string `"A"` is contained within a pair `"(" + A + ")"`, the score is **2 × score(A)**.
Your goal is to determine the final score of the input string.

### Examples  

**Example 1:**  
Input: `s = "()"`  
Output: `1`  
*Explanation: Only one simple pair "()", which scores as 1.*

**Example 2:**  
Input: `s = "(())"`  
Output: `2`  
*Explanation: "(())" is `2 × 1 = 2` because "()" nested gives double score.*

**Example 3:**  
Input: `s = "()()"`  
Output: `2`  
*Explanation: Two separate pairs, each "()" scores 1, total is 1 + 1 = 2.*

**Example 4:**  
Input: `s = "(()(()))"`  
Output: `6`  
*Explanation:  
Breakdown:  
- Outermost: `( ... )` → 2 × [score inside]
- Inside: `() (())`:  
  - "()" → 1  
  - "(())" → 2 × 1 = 2  
  Total inside: 1 + 2 = 3  
- Outer: 2 × 3 = 6*

### Thought Process (as if you’re the interviewee)  
First, I’d restate the rules for scoring.  
For `"()"` we have 1, for concatenation we add, and for nesting we double the inner score.  
A **brute-force** way is to recursively split and compute, but that's inefficient, especially for deep nesting.

A more optimal approach is to use a **stack**:  
- When we see `'('`, we push a score marker (e.g., `0`) to track the score for a new frame.
- When we see `')'`, if the last pushed is 0, it's a simple `"()"`, so it's 1 point.  
  If not, we pop, double it (as per the rules), and manage aggregation.
- Sum up all scores at the end.

Alternatively, for an even faster and slicker solution, we could use a **score and nesting depth method**:
- Notice that every primitive "()" at depth `d` contributes `2^d` to the score.
- Traverse, on every `)` immediately after a `(`, add `1 << depth` to the sum.

I’d favor the stack approach for clarity or the bit manipulation approach for efficiency, as both are O(n) time.

### Corner cases to consider  
- Single pair: `"()"`  
- Deep nesting: `"(((())))"`  
- Many siblings: `"()()()"`  
- Mixed structure: `"(()())"`  
- Minimum length / only two characters  
- Ensuring it’s always balanced, as per constraints

### Solution

```python
def scoreOfParentheses(s: str) -> int:
    # Initialize score and a variable to track nesting depth
    score = 0
    depth = 0

    for i in range(len(s)):
        if s[i] == '(':
            depth += 1  # Increase depth on every '('
        else:
            depth -= 1  # Decrease depth on every ')'
            if s[i-1] == '(':  # If it was a '()', add 2^depth to score
                score += 1 << depth  # Bit shift is 2^depth
    return score
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Every character is checked once.
- **Space Complexity:** O(1)  
  Depth and score are just integers; no stack is used.

If you use an explicit stack (alternative solution), space can be up to O(n) for the stack in worst-case deep nesting.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle *very large* input sizes where recursion may hit depth limits?  
  *Hint: Avoid recursion; prefer iterative or O(1) state.*

- Can you compute the score in one pass, without any extra space stack?  
  *Hint: Track depth; only focus on primitive "()" patterns.*

- What if you had to print the sub-scores for every valid substring?  
  *Hint: Use a stack to remember where each substring starts and aggregate scores.*

### Summary
This is a classic example of using depth-counting and stack simulations for parentheses matching and scoring. The bit manipulation/depth approach is especially efficient and elegant for problems with primitive patterns and strict rules. The main coding pattern here—parenthesis parsing and state tracking—shows up in expression evaluation, syntax checking, and recursive data parsing problems.