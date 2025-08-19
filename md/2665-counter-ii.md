### Leetcode 2665 (Easy): Counter II [Practice](https://leetcode.com/problems/counter-ii)

### Description  
Given an integer `init`, design a function `createCounter(init)` that returns an object representing a **counter** with three methods:
- `increment()`: increases the current value by 1 and returns it.
- `decrement()`: decreases the current value by 1 and returns it.
- `reset()`: resets the value to the initial value and returns it.

The **value must be encapsulated**: it can only be changed via these three methods, not accessed or mutated directly.  
Think of it as implementing a simple in-memory number tracker, like an encapsulated mutable integer, typical for closures/interview object simulation questions.

### Examples  

**Example 1:**  
Input: `init = 5`  
Output: Calls — `increment() → 6`, `reset() → 5`, `decrement() → 4`  
*Explanation:  
Start at 5, increment gives 6.  
Reset puts it back to 5.  
Decrement lowers it to 4.*

**Example 2:**  
Input: `init = 0`  
Output: Calls — `increment() → 1`, `increment() → 2`, `decrement() → 1`, `reset() → 0`  
*Explanation:  
Start at 0.  
Two increments: 1, then 2.  
Decrement: 1.  
Reset: back to 0.*

**Example 3:**  
Input: `init = -2`  
Output: Calls — `decrement() → -3`, `increment() → -2`, `reset() → -2`  
*Explanation:  
Start at -2.  
Decrement to -3.  
Increment to -2.  
Reset—already -2, but it still returns -2.*

### Thought Process (as if you’re the interviewee)  
- **Initial idea:**  
  We need a function that **returns an object** with three methods that all share access to some internal, private variable representing the current counter value.
- Each function should **modify and/or return** the current state, but that variable shouldn’t be accessible directly.
- This is a common interview question testing your understanding of **closures** and object encapsulation.
- **Implementation plan:**  
  - Store two variables:
    - The initial value (for reset)
    - The current value (for tracking)
  - Make them available only to the returned object's methods (by closure).  
- **Brute-force alternative:**  
  Global variables are a big mistake here—wouldn’t support multiple independent counters, and doesn’t encapsulate the state.
- **Final approach:**  
  Use a helper function that returns the object, and inside the function, both the initial and current value are defined.  
  Each method (increment, decrement, reset) manipulates them and returns the result.

### Corner cases to consider  
- Initial value is zero or negative.
- Multiple resets—should always reset to the original init value.
- Multiple increment/decrement calls (check statefulness).
- Multiple instances—do they remain independent?
- No direct access to the counter’s internals.

### Solution

```python
def createCounter(init):
    # Store the original and current value
    start = init
    curr = init

    # Define each method to mutate or reset `curr` only via the API
    def increment():
        nonlocal curr
        curr += 1
        return curr

    def decrement():
        nonlocal curr
        curr -= 1
        return curr

    def reset():
        nonlocal curr
        curr = start
        return curr

    # Return an object of function pointers
    return {
        "increment": increment,
        "decrement": decrement,
        "reset": reset,
    }
```

### Time and Space complexity Analysis  

- **Time Complexity:** All methods (`increment`, `decrement`, `reset`) run in O(1) — constant time, as each is a single arithmetic operation and a variable assignment or return.
- **Space Complexity:** O(1) per counter instance — stores just the initial and current value, plus three method references.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you extend this to support any step size, not just ±1?
  *Hint: What if you want `increment(k)` and `decrement(k)`? What changes?*
  
- Could you add a `get()` method to retrieve the current value without modifying it?
  *Hint: Closure still enables you to add non-mutating accessors.*

- What if this counter needed to be thread-safe?
  *Hint: How would you protect concurrent access in a language like Python or Java?*

### Summary
This is a classic **closure/object pattern** problem, where you must encapsulate mutable state using an inner function/object interface.  
It’s similar to implementing private variables in OOP, and the idea generalizes to things like cache wrappers or rate limiters, where you want API-protected state.  
You’ll see this in designing **API wrappers** and “reactive” variables in frontend frameworks, or even simple interview “design a class/closure” rounds.

### Tags

### Similar Problems
- Counter(counter) (Easy)