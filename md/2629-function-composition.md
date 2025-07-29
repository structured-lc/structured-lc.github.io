### Leetcode 2629 (Easy): Function Composition [Practice](https://leetcode.com/problems/function-composition)

### Description  
Given an array of **unary functions** (each function takes one integer argument), create a new function that is the **function composition** of all the functions in the array.  
- The new function takes an integer argument and applies each function from last to first (right-to-left).  
- If the function list is empty, the returned function should behave as the **identity function**: f(x) = x.  

### Examples  

**Example 1:**  
Input: `functions = [f1, f2, f3]` where `f1(x)=x+1`, `f2(x)=x*2`, `f3(x)=x-3`  
Output:  
If `fn = compose(functions)`, then `fn(4) = 3 → 6 → 7`  
*Explanation: Apply f3 first: 4-3=1, then f2: 1*2=2, then f1: 2+1=3. So, `fn(4)=3`.*

**Example 2:**  
Input: `functions = []`, input `x = 10`  
Output: `10`  
*Explanation: Empty function list, so identity function: f(x) = x.*

**Example 3:**  
Input: `functions = [lambda x: x\*2]`, input `x = 5`  
Output: `10`  
*Explanation: Only one function, so fn(5) = 2\*5 = 10.*

### Thought Process (as if you’re the interviewee)  
- The problem asks for chaining a sequence of **unary functions** in a way that when the composite function is called, the **rightmost function is applied first**, then the next, and so on (i.e., reduce right).
- If the array is empty, we must **return the identity function**.
- **Brute-force** idea: Manually loop through the list of functions in reverse each time the result function is called. This works, but reduces code reuse.
- **Optimal, pythonic approach**: Define a wrapper that, for any input `x`, applies functions from last to first: for f in reversed(functions): x = f(x).
  - Alternative: Use `functools.reduce` or `reduceRight` (JS), but should avoid built-ins in interviews for clarity.
- **Why this approach?** It fits the compositional logic, is O(n) per call, and handles the identity case with a condition.

### Corner cases to consider  
- Empty function array: should return identity function (returns its input).
- One function in array.
- Functions that don’t modify input (e.g., lambda x: x).
- Functions that cause exceptions if used in wrong type, but it’s given all are unary over integers.
- Input value is 0, negative, large, or edge-case integer.

### Solution

```python
def compose(functions):
    # Returns a function which is the composition of the input functions
    if not functions:
        # Identity if empty function list
        return lambda x: x

    def composed(x):
        # Apply each function from right to left
        for f in reversed(functions):
            x = f(x)
        return x

    return composed
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) per call, where n is the number of functions. Each function is called once per invocation.
- **Space Complexity:** O(1) extra space, not counting the input/output and function list. No extra space proportional to input or function count.

### Potential follow-up questions (as if you’re the interviewer)  

- What if each function takes multiple arguments, or the arity varies?  
  *Hint: Think about *args/**kwargs, or partial application.*
  
- Can you compose functions in left-to-right order (f1(f2(f3(x))) instead of f3(f2(f1(x)))?  
  *Hint: Don’t reverse the list, apply as-is!*

- How would you cache composition if functions are pure and costly?  
  *Hint: Explore memoization or dynamic programming for repeated calls.*

### Summary
We use a **function composition design pattern**, which chains unary functions so each result feeds the next, evaluated right-to-left.  
This is a classic functional programming technique, useful in **pipelines**, **middleware**, and chaining preprocessors.  
The identity function as default is a standard base case seen elsewhere (e.g., with reduce).  
This pattern is reusable for any "reduce over functions" style chaining in codebases.