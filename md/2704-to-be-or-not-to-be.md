### Leetcode 2704 (Easy): To Be Or Not To Be [Practice](https://leetcode.com/problems/to-be-or-not-to-be)

### Description  
Implement a testing utility similar to JavaScript's assertion library.  
You must write a function `expect(val)` that accepts any value and returns an object with two methods:
- `toBe(val2)`: Returns true if the original value === val2. If not, throw an error with message `"Not Equal"`.
- `notToBe(val2)`: Returns true if the original value !== val2. If equal, throw an error with message `"Equal"`.

Essentially, the function mimics test assertions for strict equality and strict inequality.

### Examples  

**Example 1:**  
Input: `func = () => expect(5).toBe(5)`  
Output: `{"value": true}`  
*Explanation: 5 === 5. Returns true as assertion passes.*

**Example 2:**  
Input: `func = () => expect(5).toBe(null)`  
Output: `{"error": "Not Equal"}`  
*Explanation: 5 !== null. Throws "Not Equal" error.*

**Example 3:**  
Input: `func = () => expect(5).notToBe(null)`  
Output: `{"value": true}`  
*Explanation: 5 !== null. Returns true as assertion passes.*


### Thought Process (as if you’re the interviewee)  
First, notice that the function behaves like a simple assertion library:
- It needs to encapsulate a value, then define two methods that compare strictly (=== and !==).
- If the assertions pass, return true; if not, throw an error with a specific message.

A brute-force way is to define a constructor or closure keeping the value, then attach methods directly using an object return.
Optimization is straightforward: use closures to carry the original value, return an object with toBe and notToBe methods for chaining, and throw meaningful error messages.

This approach separates the API from implementation and closely resembles real-world assertion functions.


### Corner cases to consider  
- Comparing undefined and null (should not be equal).
- Comparing objects (strict equality checks object identity, `{} !== {}`).
- Comparing NaN (NaN === NaN is false, but the logic should hold per JS rules).
- Comparing different value types (5 vs '5', etc.).
- Self-reference: expect(x).toBe(x).
- Large or deep objects (no deep comparison, just strict identity).
- Functions as values.


### Solution

```python
def expect(val):
    # Inner class for method binding
    class Assertion:
        def __init__(self, value):
            self.value = value

        def toBe(self, val2):
            # Strict equality (Python: "is" is identity, "==" is value; JS uses "===")
            if self.value == val2 and type(self.value) == type(val2):
                return True
            raise Exception("Not Equal")

        def notToBe(self, val2):
            if self.value == val2 and type(self.value) == type(val2):
                raise Exception("Equal")
            return True

    return Assertion(val)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  Both toBe and notToBe perform a single comparison; no loops or recursion.

- **Space Complexity:** O(1)  
  The only extra space is for the wrapped object and input values (no additional data structures used).


### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to support deep equality (structural comparison for objects and arrays)?  
  *Hint: Use recursive comparison for objects and lists. Consider edge cases with circular references.*

- How would you add more assertion methods (like `toBeGreaterThan`, `toBeCloseTo` for numbers)?  
  *Hint: Extend the returned object with more methods following the same design. Think modularity and easy addition.*

- How would you handle asynchronous values (Promises or Futures)?  
  *Hint: Consider returning/accepting awaitables or wrapping assertion logic for async scenarios.*


### Summary
This problem uses closures/objects to encapsulate a value and return assertion methods for strict equality (`toBe`) and inequality (`notToBe`).  
It's a classic demonstration of function closures and is similar to building basic testing frameworks.  
The pattern can be applied when designing fluent assertion libraries or APIs requiring method chaining with context-capturing.

### Tags

### Similar Problems
