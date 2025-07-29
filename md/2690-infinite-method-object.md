### Leetcode 2690 (Easy): Infinite Method Object [Practice](https://leetcode.com/problems/infinite-method-object)

### Description  
Design a function that returns an object supporting an "infinite-method" interface.  
This means, for **any method name you call on this object, the method exists, and always returns the method name as a string**.  
For example, calling `obj.abc()` should return `"abc"`, and `obj.foobar123()` should return `"foobar123"`.  
The object supports any method name, even if it hasn't been defined in advance.

### Examples  

**Example 1:**  
Input: `obj.hello()`  
Output: `"hello"`  
*Explanation: The method name `hello` is called; it returns `"hello"` as a string.*

**Example 2:**  
Input: `obj.anythingYouWant()`  
Output: `"anythingYouWant"`  
*Explanation: No matter what you call, the method returns the name as a string.*

**Example 3:**  
Input: `obj.run123run()`  
Output: `"run123run"`  
*Explanation: The method `run123run` is invoked, and simply returns its name.*

### Thought Process (as if you’re the interviewee)  
First, I need to create an object where any method name is valid — and calling any method returns exactly the name of the method invoked.  
The brute-force idea of pre-defining all possible method names is impossible, since the set is infinite.  
Instead, I should look for a language feature that can intercept **all property accesses**, including function calls, for names that weren't defined explicitly.

In Python, one can use `__getattr__`. In JavaScript, ES6 Proxies work well for this, but in Python, `__getattr__` allows for custom response to any attribute access not defined in the class.

So, if I implement `__getattr__`, and return a function that returns the attribute name as a string, it will fulfill the requirement for every method call.

Trade-offs:
- This is compact, neat, and supports unlimited methods.
- It may not handle non-callable attribute accesses as a method, but the problem only asks for methods.

### Corner cases to consider  
- Accessing methods like `obj.__str__()` should return `"__str__"`  
- Chained calls like `obj.foo().bar` do **not** need to work (the result is always the string, not an object).
- Passing arguments (e.g. `obj.abc(1,2)`) — these should be accepted and ignored.
- Attribute access without `()` — the problem only specifies *method calls*, so this is fine to leave unsupported.

### Solution

```python
class InfiniteMethodObject:
    def __getattr__(self, name):
        # Return a function for any undefined attribute (method)
        def method(*args, **kwargs):
            # Ignore any arguments; just return the method name
            return name
        return method

def createInfiniteMethodObject():
    # Factory method to create the object (as often required on LeetCode)
    return InfiniteMethodObject()
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) for each method call.  
  Each call only invokes Python’s attribute lookup and a single function call — no growing state.
- **Space Complexity:** O(1).  
  There is no storage of previous method names or state; only methods returned on demand.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you support attribute (non-method) access as well?
  *Hint: Consider returning the name directly for attributes that are not callable.*

- What if you want the infinite object to be chainable, e.g. `obj.foo.bar.baz() → "baz"`?
  *Hint: Let every attribute access return another instance of the infinite object, and store the full path.*

- How can you implement this pattern in another language, for example, JavaScript?
  *Hint: Use ES6 Proxy objects to trap `get` accesses for any property name.*

### Summary
This problem demonstrates the use of **dynamic method resolution** via Python’s `__getattr__` (or Proxies in JavaScript) to construct a highly flexible object interface. This is a rare but powerful pattern used for mocks, testing, dynamic APIs, and sometimes for domain-specific language (DSL) frameworks. Recognizing interceptor patterns and method overloading at runtime is a useful skill in dynamic programming and metaprogramming tasks.