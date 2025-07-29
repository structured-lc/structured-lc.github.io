### Leetcode 22 (Medium): Generate Parentheses [Practice](https://leetcode.com/problems/generate-parentheses)

### Description  
Given an integer n, generate all combinations of well-formed parentheses using exactly n pairs. A well-formed parentheses string means that every '(' has a matching ')', and at any point from left to right, the number of ')' does not exceed the number of '('.  
For example, if n=3, return all possible valid strings like "((()))", "(()())", etc.

### Examples  

**Example 1:**  
Input: `n = 3`  
Output: `["((()))","(()())","(())()","()(())","()()()"]`  
*Explanation: All unique valid combinations of 3 pairs: nested, sequential, and mixed nesting.*

**Example 2:**  
Input: `n = 1`  
Output: `["()"]`  
*Explanation: Only one possible well-formed parentheses string of length 2.*

**Example 3:**  
Input: `n = 2`  
Output: `["(())","()()"]`  
*Explanation: Either both pairs are nested: "(())", or just adjacent: "()()".*


### Thought Process (as if you’re the interviewee)  
This problem asks to generate all valid permutations of n pairs of parentheses such that no closing bracket appears before its pair is opened.

**Brute-force idea:**  
- Try generating all possible sequences of '(' and ')' of length 2n (total possible: 2^(2n)), then filter out the ones that are valid by checking balance.
- This is very inefficient because the vast majority of permutations are invalid.

**Optimized approach (Backtracking / DFS):**  
- Since we should never place a ')' unless there is a matching '(', we can build the sequence step by step:
  - At any step, we can add '(' *if* the count of '(' used so far < n.
  - We can add ')' *if* the count of ')' so far < count of '('.
- This systematic exploration via recursion or backtracking ensures only valid sequences are built, dramatically cutting down unnecessary work.
- Backtracking is a natural fit because it explores combinations and "backs up" upon hitting invalid/complete paths.

**Alternative approach:**  
- Dynamic Programming: Build up valid strings for n by using results for smaller n (see Solution 2 in prompt). This is less intuitive for interviews compared to backtracking, but is elegant and reduces recursion stack.


### Corner cases to consider  
- n = 0: should return [""], the empty string means zero pairs.
- n = 1: only one way, "()"
- Large n: Validate efficiency (should not timeout for moderate n).
- Ensuring no string ends with unmatched '('.
- Output order is not important, but each must be unique and well-formed.


### Solution

```python
def generateParenthesis(n):
    # Helper function to perform backtracking
    def backtrack(s, open_count, close_count):
        # If the current string s has n open and n close, it's valid
        if len(s) == 2 * n:
            result.append(s)
            return
        # If we can still add '(', do so
        if open_count < n:
            backtrack(s + '(', open_count + 1, close_count)
        # If we can still add ')', do so
        if close_count < open_count:
            backtrack(s + ')', open_count, close_count + 1)

    result = []
    backtrack("", 0, 0)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Catalan Number Cₙ ≈ 4ⁿ / (n√n). That's the count of valid strings possible for n pairs (number of solutions in result).
  - Each valid string is built character by character, so O(4ⁿ / √n) overall.

- **Space Complexity:**  
  - Output list: O(4ⁿ / √n), since that’s the total number and each is length 2n.
  - Recursion stack: O(n) deep (since we add up to 2n parentheses per path).


### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to generate the sequences in lexicographical order?  
  *Hint: Control the order you recurse, always append '(' before ')' to maintain sort.*

- Can you generalize to generate all valid combinations with k different types of brackets, e.g. '()', '[]', '{}'?  
  *Hint: You need stack/recursion depth per bracket type and care for match at close.*

- Could you compute just the count of valid parentheses strings for a given n, instead of generating them?  
  *Hint: Catalan numbers, use combinatorial formula: Cₙ = (2n)! / ((n+1)! × n!).*


### Summary
This is a classic backtracking problem and a prime example of the "generate all combinations/strings under constraints" pattern. The solution leverages recursion and pruning (never adding invalid ')'), making it efficient compared to brute-force. This backtracking pattern is fundamental in problems like generating subsets, permutations, N-Queens, and more combinatorial generation problems.