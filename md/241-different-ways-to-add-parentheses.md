### Leetcode 241 (Medium): Different Ways to Add Parentheses [Practice](https://leetcode.com/problems/different-ways-to-add-parentheses)

### Description  
Given a string expression (like `'2-1-1'`) containing numbers and the operators +, -, and *, return all possible results from computing all the different possible ways to group numbers and operators with parentheses. Evaluate all different parenthesizations and return every possible result.

For example, taking `'2-1-1'`, the result can be either 0 or 2, depending on the way you group the numbers and operators:  
- ((2-1)-1) = 0  
- (2-(1-1)) = 2

### Examples  

**Example 1:**  
Input: `2-1-1`  
Output: `[0,2]`  
*Explanation:  
((2-1)-1) = 0  
(2-(1-1)) = 2*

**Example 2:**  
Input: `2*3-4*5`  
Output: `[-34,-14,-10,-10,10]`  
*Explanation:  
(2*(3-(4*5))) = 2*(3-20) = -34  
((2*3)-(4*5)) = 6-20 = -14  
((2*(3-4))*5) = (2*-1)*5 = -10  
(2*((3-4)*5)) = 2*-5 = -10  
(((2*3)-4)*5) = (6-4)*5 = 10*

**Example 3:**  
Input: `3`  
Output: `[3]`  
*Explanation: A single number always returns itself.*


### Thought Process (as if you’re the interviewee)  

First, I’d recognize this is a classic recursion problem:  
- At every operator (+, -, *), I can split the expression into left and right.  
- I recursively solve all possible results of left and right, then combine each left result with each right result using the operator.  
- The base case: if the subexpression is a single number, just return it.

This approach naturally forms a tree of recursive calls. For optimality, I’d add **memoization** to cache computations for sub-expressions, as the same substring can be evaluated many times due to overlapping subproblems.

In short:
- Recursively split at every operator.
- For each split, combine all left/right results using the current operator.
- Base case: number only (no operator).
- Memoize results per substring for efficiency.

Trade-offs:  
- Very natural recursive structure, but can be exponential time for large expressions.
- Memoization helps save repeated computations.


### Corner cases to consider  
- Single number input (like `3`)
- Only one operator (like `2+3`)
- All same operator (like `2+3+4`)
- Consecutive operators not possible (guaranteed by constraints)
- Empty expression (not expected)
- Very large numbers (input guarantees safe int operations)
- Negative results and zero


### Solution

```python
def diffWaysToCompute(expression: str) -> list[int]:
    # Helper function with memoization
    memo = {}
    
    def dfs(expr):
        if expr in memo:
            return memo[expr]
        res = []
        for i in range(len(expr)):
            if expr[i] in "+-*":
                # Split expression into left and right at operator
                left = dfs(expr[:i])
                right = dfs(expr[i+1:])
                # Compute all combinations
                for l in left:
                    for r in right:
                        if expr[i] == '+':
                            res.append(l + r)
                        elif expr[i] == '-':
                            res.append(l - r)
                        else:  # '*'
                            res.append(l * r)
        # Base case: entire substring is a number
        if not res:
            res.append(int(expr))
        memo[expr] = res
        return res

    return dfs(expression)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ⁿ), where n is the number of operators.  
  Each operator can be a split point, giving rise to combinations exponential in n.  
- **Space Complexity:** O(n × 2ⁿ)  
  Due to memoization storing results for all possible substrings, and the size of the result list grows for each split.


### Potential follow-up questions (as if you’re the interviewer)  

- Can you support division `/` as an operator?
  *Hint: Consider integer vs float division, and handling division by zero.*

- What if the operators also included exponentiation (^)?
  *Hint: Operator precedence and associativity now matter; parse tree must handle order.*

- How would you return not only results but also the parenthesizations themselves?
  *Hint: For each recursion, store the string representation along with the computed value.*

### Summary  
This problem demonstrates the **divide-and-conquer** pattern (recursive splitting on operators) with **memoization** for optimization—both are powerful strategies for expression evaluation. This approach generalizes well to similar problems involving all possible binary tree parenthesizations, or wherever you want all possible results from different ways to process binary operations on an input sequence.


### Flashcard
Recursively split at each operator, compute all results for left/right, combine; use memoization to cache subexpression results.

### Tags
Math(#math), String(#string), Dynamic Programming(#dynamic-programming), Recursion(#recursion), Memoization(#memoization)

### Similar Problems
- Unique Binary Search Trees II(unique-binary-search-trees-ii) (Medium)
- Basic Calculator(basic-calculator) (Hard)
- Expression Add Operators(expression-add-operators) (Hard)
- The Score of Students Solving Math Expression(the-score-of-students-solving-math-expression) (Hard)
- Minimize Result by Adding Parentheses to Expression(minimize-result-by-adding-parentheses-to-expression) (Medium)