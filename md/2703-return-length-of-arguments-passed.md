### Leetcode 2703 (Easy): Return Length of Arguments Passed [Practice](https://leetcode.com/problems/return-length-of-arguments-passed)

### Description  
You need to implement a function that returns the number of arguments passed to it when called. The arguments can be of any type (number, string, object, etc.), and the total count of arguments should be returned. There are no constraints on the types, only a need to count how many were supplied during the call.

### Examples  

**Example 1:**  
Input: `5`  
Output: `1`  
Explanation: Only one argument, so the function returns 1.

**Example 2:**  
Input: `{}, null, "3"`  
Output: `3`  
Explanation: Three arguments (an object, null, and a string), so the result is 3.

**Example 3:**  
Input: *no arguments*  
Output: `0`  
Explanation: No arguments were passed—the function returns 0.

### Thought Process (as if you’re the interviewee)  
The task simply requires counting the number of inputs given to the function, regardless of their type or value. In JavaScript/TypeScript, the rest parameter syntax (`...args`) lets us collect all arguments into a list/array, and we can use `args.length` for the answer. There’s no need for iteration or special checks, as edge cases (no arguments) are handled naturally—the `args` array will be empty in that case.  
The direct and efficient solution is to use the rest parameter to accumulate arguments and return the array’s length.

### Corner cases to consider  
- No arguments passed: Should return 0.
- Arguments of different types (number, string, undefined, object).
- Arguments with undefined or null values (should still count).
- Large number of arguments (test upper limit, e.g., 100).
- Arguments passed as arrays or nested objects (each counts as one argument).

### Solution

```python
# The closest equivalent in Python is *args for variable arguments.

def argumentsLength(*args):
    # args collects all positional arguments as a tuple
    return len(args)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  The function retrieves the length of a tuple (or array), which is a constant-time operation.

- **Space Complexity:** O(n)  
  Where n is the number of arguments passed, as they are stored in a tuple for the function’s scope. No extra space is used beyond storage of input arguments.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle named (keyword) arguments separately from positional ones?  
  *Hint: Contrast *args and **kwargs in Python; in JS, consider arguments object properties.*

- How can you ensure the function works if arguments could include arrays or objects?  
  *Hint: Remember each argument is counted once, regardless of its content.*

- What if you want to return the types of all arguments instead of the length?  
  *Hint: Consider looping through args and using type() in Python or typeof in JS.*

### Summary
This is an example of a function transformation pattern: writing flexible code that works with any number of inputs. The use of variable argument lists (`*args` in Python, `...args` in JavaScript/TypeScript) is a common tool when function signatures need to support unknown or dynamic counts of parameters—useful for utilities, logging, or flexible APIs. This pattern applies widely to problems requiring handling of variadic input and is language-agnostic in most modern programming environments.


### Flashcard
Use rest parameter (...args) and return args.length to count the number of arguments passed.

### Tags

### Similar Problems
