### Leetcode 2667 (Easy): Create Hello World Function [Practice](https://leetcode.com/problems/create-hello-world-function)

### Description  
Design a function called **createHelloWorld** that returns **another function**. The returned function, when invoked (with any number of arguments), should always return the string **"Hello World"**.  
This problem tests if you understand closures and the idea of returning functions from functions.

### Examples  

**Example 1:**  
Input: `args = []`  
Output: `"Hello World"`  
*Explanation: You call the function with no arguments, it returns "Hello World".*

**Example 2:**  
Input: `args = [1, 2, 3]`  
Output: `"Hello World"`  
*Explanation: You can provide arguments, but the function still just returns "Hello World".*

**Example 3:**  
Input: `args = ["anything", true, null]`  
Output: `"Hello World"`  
*Explanation: The function ignores all arguments; output is always "Hello World".*

### Thought Process (as if you’re the interviewee)  
The question requires returning a function that *always* returns **"Hello World"**, no matter its inputs.  
- **Brute force:** I could create a function that ignores its arguments and returns "Hello World".  
- **Functional requirement:** But I need another function (let's call it the outer one) to *return* this always-return-"Hello World" function.  
- The function being returned must accept any arguments, but must not use them.

So, I’ll define an outer function `createHelloWorld` with no parameters, and inside it, return an inner function that takes any arguments (`*args`) and returns "Hello World".

I choose this pattern because:  
- It matches the requirements (closure + returning a function).
- It’s very efficient, since nothing is done except returning a string.
- It demonstrates closure even if it's trivial.

### Corner cases to consider  
- The returned function should work with **zero or more arguments** (including none).
- Arguments of **any type** (number, string, object, etc.) must not affect the output.
- Multiple calls to the returned function should all return "Hello World".

### Solution

```python
def createHelloWorld():
    # Define and return an inner function that ignores its arguments
    def hello_func(*args):
        # Always return "Hello World"
        return "Hello World"
    return hello_func
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1), since each time the returned function is called, it returns a constant string, regardless of input.
- **Space Complexity:** O(1), since only a function object is created, and no additional memory is used or persisted, regardless of arguments.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the inner function must customize the greeting (e.g., "Hello, Alice")?
  *Hint: How could you use arguments to make the output dynamic if needed?*
- What’s a closure? How does this problem demonstrate closure?
  *Hint: Explain how the inner function “remembers” its external scope, even if not used here.*
- Can you explain how this design supports functional programming concepts?
  *Hint: Discuss first-class functions and higher-order functions.*

### Summary
This solution uses the **closure** pattern: a function returning another function, which is fundamental in functional programming and JavaScript, Python, etc.  
Here, the pattern is used in its simplest form—no environment is captured, but the interface allows for customization with minimal changes.  
This is a **factory pattern** use-case, and it's commonly seen in decorators, callback generators, and event handler setups.