### Leetcode 2620 (Easy): Counter [Practice](https://leetcode.com/problems/counter)

### Description  
Given an integer n, create and return a **counter function**.  
- The very first time this function is called, it should return n.
- Each subsequent call should return 1 more than what it returned last time.  
In other words, if you call the function repeatedly, outputs would be n, n+1, n+2, ...  
You have to ensure the function “remembers” the last value between calls (closure/concept of persistent state).

### Examples  

**Example 1:**  
Input: n = 10, calls = 3  
Output: [10, 11, 12]  
Explanation:  
- The first call returns 10.  
- The second call returns 11.  
- The third call returns 12.

**Example 2:**  
Input: n = -2, calls = 5  
Output: [-2, -1, 0, 1, 2]  
Explanation:  
- The counter starts at -2. Each further call increases it by 1.

**Example 3:**  
Input: n = 0, calls = 1  
Output:   
Explanation:  
- The counter starts at 0; only one call returns 0.

### Thought Process (as if you’re the interviewee)  
First, we need a function that can “retain state” across multiple calls. With plain functions, the local variables are re-initialized each time, so we need something persistent.

A brute-force idea would be to use a global variable. However, globals are bad practice and will not work if users create many counters (with different starting values).

Instead, closures let us “trap” variables inside a function, so they live on between function calls, without polluting the global scope.  
So the plan is to:
- Define a function that takes n and returns another function (the real counter).
- The returned function has access to n and can increment it each time it’s called.
- Each call returns the new value of n.

This closure approach is space-optimal, reusable, and idiomatic for related LeetCode or real-world coding.

### Corner cases to consider  
- n is negative (e.g. n = -10).  
- n is zero.  
- The counter function is never called after creation.
- Only called once.
- Many counters created with different starting values (their state shouldn't overlap/mix).

### Solution

```python
# Counter factory that remembers state using closure

def create_counter(n):
    # Define the inner function that will act as the counter
    def counter():
        nonlocal n   # allow modification of n in this scope
        current = n  # store the current value to return
        n += 1       # increment n for the next call
        return current
    return counter

# Usage example:
# c = create_counter(5)
# print(c()) # 5
# print(c()) # 6
# print(c()) # 7
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) per call.  
  Each call simply reads, returns, and increments a number.
- **Space Complexity:** O(1) additional per counter function.  
  Only one integer (n) is stored for each created counter. No extra growth per function call.

### Potential follow-up questions (as if you’re the interviewer)  

- What if I want the counter to increase by 2, or a custom step?  
  *Hint: Can you parameterize the increment?*

- If I call create_counter(5) twice, do their states affect each other?  
  *Hint: What does closure capture? Is state global or per-instance?*

- Can you implement this using a class instead of a closure?  
  *Hint: How would you track state inside an object/class?*

### Summary
This problem uses the **closure pattern** to keep state private to each function instance—an important coding concept.  
It is a classic interview question for understanding closures, function factories, and encapsulation in any functional or object-oriented language.  
Mastery here helps in asynchronous callbacks, event handlers, or any scenario where functions need private state tracking in applications.