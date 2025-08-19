### Leetcode 1597 (Hard): Build Binary Expression Tree From Infix Expression [Practice](https://leetcode.com/problems/build-binary-expression-tree-from-infix-expression)

### Description  
Given an infix arithmetic expression as a string (with integers, operators +, -, *, /, and parentheses), build a **binary expression tree** such that:
- Each **leaf node** is a number (operand).
- Each **internal node** is an operator, and has both left and right children.
- **Order of operations** (operator precedence, parentheses) is respected.
- The **in-order traversal** of the tree (ignoring parentheses) gives the original expression.

### Examples  

**Example 1:**  
Input: `s = "3*4-2*5"`  
Output:  
```
      -
     / \
    *   *
   / \ / \
  3  4 2  5
```
List representation: `['-', '*', '*', '3', '4', '2', '5']`  
*Explanation: The root is '-', left child is '3\*4', right child is '2\*5'. Operators \* have higher precedence, so they become lower in the tree.*

**Example 2:**  
Input: `s = "2-3/(5*2)+1"`  
Output:  
```
      +
     / \
    -   1
   / \
  2   /
     / \
    3   *
       / \
      5   2
```
List representation: `['+', '-', '1', '2', '/', '3', '*', '5', '2']`  
*Explanation: The inner operation 5\*2 is evaluated first (deeper in the tree), division is above it, and outer +- nodes are at the root.*

**Example 3:**  
Input: `s = "1+((2+3)*4)-5"`  
Output:  
```
      -
     / \
    +   5
   / \
  1   *
     / \
    +   4
   / \
  2   3
```
List representation: `['-', '+', '5', '1', '*', '+', '4', '2', '3']`  
*Explanation: Parentheses group (2+3)\*4 at lower depth, corresponding to order of evaluation.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Parse the expression recursively, splitting at the "least precedence" operator outside parentheses, creating root at each split. This works but is slow and hard to implement with all edge-cases.
- **Optimized idea:**  
  Use two stacks:  
  - `ops` for operators/parentheses  
  - `nodes` for tree nodes (operands and subtrees)  
  For each token:  
    - If it is a number, create a TreeNode and push to `nodes`  
    - If '(', push to `ops`  
    - If ')', pop from `ops` and build subtrees until '(' is found  
    - If operator, process all `ops` with **higher or equal precedence**, building nodes as we go. Push current operator to `ops`.  
  At the end, process remaining `ops` stack.
  - This is the **shunting-yard algorithm**, commonly used for infix to postfix conversion, but instead of outputting postfix, we build the tree directly as we go.
- **Why final approach:**  
  - Handles arbitrary precedence and parentheses.
  - Each token is processed in O(1) amortized, gives linear O(n) time.
  - No need for external libraries or regex.

### Corner cases to consider  
- Empty string input (should return None or raise error)
- Single number string (e.g., `"7"`)
- No parentheses, only operators (e.g., `"2+3*4"`)
- Parentheses inside parentheses (`"1+(2*(3+4))"`)
- Multiple digit numbers (`"123+4*(5-6)"`)
- Whitespaces (if applicable; often input is already space-free)
- Invalid expressions (assume valid as per constraints)

### Solution

```python
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def buildExpressionTree(s):
    # Operator precedence mapping
    precedence = {'+': 1, '-': 1, '*': 2, '/': 2}
    
    ops = []    # operator stack
    nodes = []  # node stack

    def build():
        # Helper to pop operator and build the tree node
        op = ops.pop()
        right = nodes.pop()
        left = nodes.pop()
        node = Node(op)
        node.left = left
        node.right = right
        nodes.append(node)

    i = 0
    while i < len(s):
        ch = s[i]
        if ch.isdigit():
            # Support multi-digit numbers
            j = i
            while j < len(s) and s[j].isdigit():
                j += 1
            num = s[i:j]
            nodes.append(Node(num))
            i = j
        elif ch == '(':
            ops.append(ch)
            i += 1
        elif ch == ')':
            while ops and ops[-1] != '(':
                build()
            ops.pop()  # pop '('
            i += 1
        else:  # operator
            while (ops and ops[-1] in precedence
                   and precedence[ops[-1]] >= precedence[ch]):
                build()
            ops.append(ch)
            i += 1

    while ops:
        build()

    return nodes[-1] if nodes else None
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each token is processed at most a constant number of times. Building operators/subtrees is O(1) per token.
- **Space Complexity:** O(n)  
  The stacks hold up to n tokens. The tree nodes take O(n) space.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your parser to support unary operators (e.g., unary '-')?  
  *Hint: Identify unary operators during parsing, and handle as a special case in build function.*

- Can you adapt the approach for variables (not just numbers) and function calls (`sin(x)`, etc.)?  
  *Hint: Extend Node to hold variable names and function signatures. Adjust the tokenization step.*

- How could you add support for additional operators or operator precedence?  
  *Hint: Make precedence mapping easily extensible, possibly allow dynamic (runtime) precedence rules.*

### Summary
This problem uses a well-known parsing pattern similar to the **shunting-yard algorithm**. The key is to maintain two stacks (operators and nodes) so we can build the tree as we process the string. This pattern naturally handles operator precedence and parentheses, and can be adapted for a variety of expression evaluation or tree building problems. Common in compilers, calculators, and expression evaluators.

### Tags
String(#string), Stack(#stack), Tree(#tree), Binary Tree(#binary-tree)

### Similar Problems
- Basic Calculator III(basic-calculator-iii) (Hard)
- Check If Two Expression Trees are Equivalent(check-if-two-expression-trees-are-equivalent) (Medium)