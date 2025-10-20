### Leetcode 1896 (Hard): Minimum Cost to Change the Final Value of Expression [Practice](https://leetcode.com/problems/minimum-cost-to-change-the-final-value-of-expression)

### Description  
You are given a valid Boolean expression as a string containing only `0`, `1`, `&`, `|`, and parentheses. Evaluate the expression normally: no operator precedence; just process left to right, using parentheses to group.

You can flip the result of the entire expression (from `1` to `0` or vice versa) by making changes in the expression. An operation is:
- Flip a digit (`0` ↔ `1`)
- Flip an operator (`&` ↔ `|`)

Find the **minimum number of operations** needed to flip the final value of the expression.

### Examples  

**Example 1:**  
Input: `"1&1|0"`  
Output: `1`  
*Explanation: Flipping the last '0' to '1' changes result from 1 → 0, or flipping any `&`/`|` can also flip final value in 1 operation.*

**Example 2:**  
Input: `"(0&0)&(0&0&0)"`  
Output: `3`  
*Explanation: To flip final value from `0` to `1`, need to flip three separate `0`s to `1`s: change each `0` in each group to `1`. Each flip is one operation, so total 3 operations.*

**Example 3:**  
Input: `"1|1|(0&0)&1"`  
Output: `1`  
*Explanation: The expression evaluates to 1. Flipping just one '1' (any) or flipping an operator will flip the output.*

### Thought Process (as if you’re the interviewee)  
First, let's consider brute-force: try all possible combinations of flipping any individual symbol and check the evaluated result. But with parentheses and possible size up to 10⁴, this is infeasible.

Optimally, since every subexpression yields either 0 or 1, and we only care about the minimal number of changes to flip its output, we can use a stack simulating the evaluation as we parse, and for each subexpression, keep for **both** possible outputs:
- the cost to make that subexpression evaluate to `0`
- the cost to make it evaluate to `1`

For a leaf (just `'0'` or `'1'`):
- cost to flip `0` → `1` is 1, and `1` → `0` is 1.

For operator nodes (`&`/`|`), when combining two subresults, compute:
- For `&`: to make it 1, both sides must be 1. To make it 0, one side is 0.
  - cost1 = cost(lhs to 1) + cost(rhs to 1)
  - cost0 = min(cost(lhs to 0), cost(rhs to 0))
  - But also, can flip the operator (cost 1) + cost for `|` version.

We keep track using a stack and dynamic programming as we parse the string, simulating evaluation.

### Corner cases to consider  
- Expressions with only one digit, like `"1"` (should return 1).
- Nested parentheses: `"(((1)))"`
- All operators the same: `"0&0&0..."` or `"1|1|1..."`.
- Minimal and maximal operator positions.
- Flipping `&` to `|` versus flipping digit—sometimes better to flip operator.
- Mixed operators and orderings.

### Solution

```python
def minOperationsToFlip(expression: str) -> int:
    # Helper: for '0'/'1', returns (cost to flip to 0, cost to flip to 1)
    def get_leaf_cost(ch):
        if ch == '0':
            return (0, 1)
        return (1, 0)

    # Two result stacks for each subexpression's cost to become 0 or 1
    val_stack = []
    op_stack = []

    i = 0
    n = len(expression)
    while i < n:
        ch = expression[i]
        if ch == ' ':
            i += 1
            continue
        if ch == '(':
            op_stack.append(ch)
            i += 1
        elif ch in ('0', '1'):
            val_stack.append(get_leaf_cost(ch))
            i += 1
        elif ch in ('&', '|'):
            op_stack.append(ch)
            i += 1
        elif ch == ')':
            # Collapse expressions inside ()
            while op_stack and op_stack[-1] != '(':
                op = op_stack.pop()
                right = val_stack.pop()
                left = val_stack.pop()
                # For each, compute min cost to get result 0/1
                if op == '&':
                    # & needs both 1 for 1, any 0 for 0
                    cost0 = min(left[0] + right[0],
                                left[0] + right[1],
                                left[1] + right[0])
                    cost1 = left[1] + right[1]
                else:  # '|'
                    # | needs any 1 for 1, both 0 for 0
                    cost1 = min(left[1] + right[1],
                                left[1] + right[0],
                                left[0] + right[1])
                    cost0 = left[0] + right[0]
                # Can flip op, cost +1, and swap costs
                min_cost0 = min(cost0, cost1 + 1)
                min_cost1 = min(cost1, cost0 + 1)
                val_stack.append((min_cost0, min_cost1))
            op_stack.pop()  # remove '('
            i += 1
        else:
            i += 1

        # Collapse at the top level (when possible)
        while op_stack and op_stack[-1] in ('&', '|') and len(val_stack) >= 2:
            op = op_stack.pop()
            right = val_stack.pop()
            left = val_stack.pop()
            if op == '&':
                cost0 = min(left[0] + right[0],
                            left[0] + right[1],
                            left[1] + right[0])
                cost1 = left[1] + right[1]
            else:  # '|'
                cost1 = min(left[1] + right[1],
                            left[1] + right[0],
                            left[0] + right[1])
                cost0 = left[0] + right[0]
            min_cost0 = min(cost0, cost1 + 1)
            min_cost1 = min(cost1, cost0 + 1)
            val_stack.append((min_cost0, min_cost1))

    final0, final1 = val_stack[-1]
    # Expression evaluates to either 0 or 1 -- flip the result!
    # The one that is NOT the current value is the min cost to flip.
    return max(final0, final1)

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each character is processed at most a constant number of times by the stack operations.

- **Space Complexity:** O(n)  
  Stacks hold up to O(n) expressions/sub-results in the worst (deeply nested) input.


### Potential follow-up questions (as if you’re the interviewer)  

- How does the solution change if operator precedence (i.e., & > |) must be obeyed?  
  *Hint: You'll need to adjust parsing to respect precedence (e.g., via Shunting Yard Algorithm).*

- What if you need to output the actual sequence of changes as well as the minimal number?  
  *Hint: Maintain traceback pointers to reconstruct the operations.*

- Could this be solved recursively instead of with a stack?  
  *Hint: You can write a parser that returns (cost-to-0, cost-to-1) for each subtree.*

### Summary
This problem is a variant of dynamic programming on expressions, using stacks to simulate computation while storing DP states for each subexpression. The method of keeping two possible minimal costs per subexpression is common in expression evaluation, and is similar to techniques in "Evaluate Boolean Expression to True," circuit design, and parsing arithmetic expressions for minimum/maximum value. The flexible stack-based parsing pattern is reusable for other expression or formula evaluation variants.


### Flashcard
Use a stack to simulate expression evaluation and track the cost of flipping symbols.

### Tags
Math(#math), String(#string), Dynamic Programming(#dynamic-programming), Stack(#stack)

### Similar Problems
