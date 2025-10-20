### Leetcode 2726 (Easy): Calculator with Method Chaining [Practice](https://leetcode.com/problems/calculator-with-method-chaining)

### Description  
Design a `Calculator` class that allows chaining of mathematical operations.  
- The constructor takes an initial number to store as the result.
- Implements these methods:  
  - `add(value)` — adds `value` to result, returns the Calculator instance  
  - `subtract(value)` — subtracts `value` from result, returns the instance  
  - `multiply(value)` — multiplies result by `value`, returns the instance  
  - `divide(value)` — divides result by `value`, throws error if dividing by zero, returns the instance  
  - `power(value)` — raises result to the `value`'th power, returns the instance  
  - `getResult()` — returns the final result as a float  

The main point is to support *method chaining*: multiple operations can be seamlessly called in sequence, for example:  
`calc.add(2).subtract(1).multiply(3).getResult()`.

### Examples  

**Example 1:**  
Input:  
```
Calculator(10).add(5).subtract(3).getResult()
```
Output:  
```
12
```
*Explanation: Start with 10, +5 ⇒ 15, -3 ⇒ 12, return result.*

**Example 2:**  
Input:  
```
Calculator(2).multiply(3).power(2).getResult()
```
Output:  
```
36
```
*Explanation: Start with 2, ×3 ⇒ 6, then 6² ⇒ 36.*

**Example 3:**  
Input:  
```
Calculator(4).divide(0).getResult()
```
Output:  
```
Error: Division by zero is not allowed
```
*Explanation: Division by zero must raise an error.*


### Thought Process (as if you’re the interviewee)  
First, I’d define a class storing the current result as state. Each operation updates this result and returns `self` to enable chaining.  
- For `add`, `subtract`, and `multiply`, just update the attribute accordingly.
- For `divide`, check for division by zero and raise an exception if encountered.
- For `power`, use exponentiation.
- `getResult` just returns the result float.

Why this approach:  
- Chaining is cleanest when all methods (except `getResult`) return the instance (`self`).  
- All work is constant-time; result is stored directly after each operation.  
- Clean error management (especially for division by zero) is necessary for predictable, safe usage.

### Corner cases to consider  
- Division by zero (`divide(0)`)
- Negative and fractional exponents in `power`
- Chaining with no operations (just `getResult()` after instantiation)
- Very large/small results (floating point imprecision)
- Using negative, zero, or fractional initial values

### Solution

```python
class Calculator:
    def __init__(self, value: float):
        # Initialize with the starting value
        self.result = float(value)

    def add(self, value: float):
        # Add value to result
        self.result += value
        return self  # Enable chaining

    def subtract(self, value: float):
        # Subtract value from result
        self.result -= value
        return self

    def multiply(self, value: float):
        # Multiply result by value
        self.result *= value
        return self

    def divide(self, value: float):
        # Check division by zero
        if value == 0:
            raise Exception("Error: Division by zero is not allowed")
        self.result /= value
        return self

    def power(self, value: float):
        # Raise result to the value'th power
        self.result **= value
        return self

    def getResult(self):
        # Return the current result
        return self.result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Each method (`add`, `subtract`, `multiply`, `divide`, `power`, and `getResult`) operates in O(1) constant time per call since only a single arithmetic operation and attribute update occurs.

- **Space Complexity:**  
  O(1) — Only one float is stored regardless of the number of operations.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you support undo functionality for operations?  
  *Hint: Store a stack of previous results to allow reverting.*

- How would you support more complex expressions or parenthesized sub-expressions?  
  *Hint: Consider parsing a string into an expression tree or using a different expression model.*

- How would you handle integer overflow or improve floating-point accuracy?  
  *Hint: Explore arbitrary-precision arithmetic or decimal modules for more reliable results.*

### Summary
This problem uses the *method chaining* pattern to design a clean, user-friendly API for repeated operations on an internal state. The approach—returning `self` from each mutating method—is widely useful for data structure builders and query DSLs. This pattern shows up in string builders, fluent interfaces, and other customizable computation pipelines.


### Flashcard
Chain calculator methods by updating internal state and returning self; handle division by zero, enable chaining except for getResult.

### Tags

### Similar Problems
