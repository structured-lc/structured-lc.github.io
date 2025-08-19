### Leetcode 1628 (Medium): Design an Expression Tree With Evaluate Function [Practice](https://leetcode.com/problems/design-an-expression-tree-with-evaluate-function)

### Description  
Implement a class to build an **expression tree** from a set of input tokens in Reverse Polish Notation (postfix), and support evaluating the expression. Each node is either an operator (like '+', '-', '*', '/') or an integer operand (string). Each operator node applies the operation to its left and right child.

### Examples  

**Example 1:**  
Input: `["3","4","+"]`  
Output: `7`  
*Explanation: 3 + 4 = 7. Tree:  
```
  +
 / \
3   4
```
List: ["3","4","+"]*

**Example 2:**  
Input: `["2","3","4","*","+"]`  
Output: `14`  
*Explanation: 3 × 4 = 12, then 2 + 12 = 14. Tree:  
```
  +
 / \
2   *
    / \
   3   4
```
List: ["2","3","4","*","+"]*

**Example 3:**  
Input: `["4","5","7","2","+","-","*"]`  
Output: `-16`  
*Explanation: 7+2=9, 5-9=-4, 4×(-4)=-16. Tree:
```
   *
  / \
 4   -
    / \
   5   +
       / \
      7   2
```
List: ["4","5","7","2","+","-","*"]*

### Thought Process (as if you’re the interviewee)  
- Reverse Polish Notation makes it easy to evaluate using a stack: if token is operand, push as a node; if operator, pop two nodes and build a new operator node with those as children.
- After tree is built, writing an evaluator is just doing postorder traversal: if node is a number, return it; if operator, recursively evaluate left and right and apply the operation.
- Class design: abstract base class with eval(), and subclasses for operand or operator nodes.
- Edge cases: check for valid inputs, division by zero, negative numbers, etc.

### Corner cases to consider  
- Only one token (single leaf)
- Very deep trees (many nested operations)
- Division by zero
- Negative results
- Unary operators (not allowed here, but check input robustness)
- Non-integer or invalid tokens

### Solution

```python
from typing import List

class Node:
    def evaluate(self) -> int:
        raise NotImplementedError

class NumNode(Node):
    def __init__(self, val: int):
        self.val = val
    def evaluate(self) -> int:
        return self.val

class OpNode(Node):
    def __init__(self, op: str, left: Node, right: Node):
        self.op = op
        self.left = left
        self.right = right
    def evaluate(self) -> int:
        a = self.left.evaluate()
        b = self.right.evaluate()
        if self.op == '+':
            return a + b
        elif self.op == '-':
            return a - b
        elif self.op == '*':
            return a * b
        else:
            # Integer division rounding towards zero
            return int(a / b)

class TreeBuilder:
    def buildTree(self, postfix: List[str]) -> Node:
        stack = []
        for token in postfix:
            if token in '+-*/':
                right = stack.pop()
                left = stack.pop()
                stack.append(OpNode(token, left, right))
            else:
                stack.append(NumNode(int(token)))
        return stack[0]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), single pass for building tree and O(n) for evaluation (visit each node once)
- **Space Complexity:** O(n) for the tree and stack (worst case, tree height is n)

### Potential follow-up questions (as if you’re the interviewer)  
- How would you extend for variables or functions?  
  *Hint: Add support for a context mapping names to values/functions.*

- Support unary operators or parentheses in input?  
  *Hint: Adjust the grammar and parser/code accordingly.*

- How would you handle floating point operations or custom operators?  
  *Hint: Change node evaluation and possibly accept a custom operator table.*

### Summary
This is a classic recursive tree-building and evaluation problem, using stack for **postfix parsing** and **recursion for evaluation**. The pattern is directly reusable for interpreters and compilers.

### Tags
Array(#array), Math(#math), Stack(#stack), Tree(#tree), Design(#design), Binary Tree(#binary-tree)

### Similar Problems
- Minimum Flips in Binary Tree to Get Result(minimum-flips-in-binary-tree-to-get-result) (Hard)
- Evaluate Boolean Binary Tree(evaluate-boolean-binary-tree) (Easy)