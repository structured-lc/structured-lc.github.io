### Leetcode 2623 (Medium): Memoize [Practice](https://leetcode.com/problems/memoize)

### Description  
Design a `memoize` function that takes a function `fn` and returns a memoized version of it.  
A memoized function caches computed results for each given input, so if it is called again with the same arguments, it returns the cached result instead of recomputing.  
This can optimize recursive or computationally expensive functions (like Fibonacci or factorial), by storing results for each unique set of arguments.

### Examples  

**Example 1:**  
Input:  
sum = (a, b) ⇒ a + b  
calls: ["call", "call", "getCallCount", "call", "getCallCount"]  
args: [[2, 2], [2, 2], [], [1, 2], []]  
Output: `[4, 4, 1, 3, 2]`  
*Explanation:*
- memoizedSum(2, 2) ⇒ computes 4, caches result (total real calls: 1)
- memoizedSum(2, 2) ⇒ retrieves from cache, returns 4 (call count stays 1)
- getCallCount() ⇒ returns 1
- memoizedSum(1, 2) ⇒ computes 3, caches (call count: 2)
- getCallCount() ⇒ returns 2

**Example 2:**  
Input:  
factorial = n ⇒ n ≤ 1 ? 1 : n × factorial(n-1)  
calls: ["call", "call", "call", "getCallCount", "call", "getCallCount"]  
args: [[2], [3], [2], [], [3], []]  
Output: `[2, 6, 2, 2, 6, 2]`  
*Explanation:*
- memoizedFactorial(2) ⇒ computes 2 (calls factorial)
- memoizedFactorial(3) ⇒ computes 6 (calls factorial)
- memoizedFactorial(2) ⇒ retrieves cached 2
- getCallCount() ⇒ returns 2 (unique actual calls)
- memoizedFactorial(3) ⇒ retrieves cached 6
- getCallCount() ⇒ returns 2

**Example 3:**  
Input:  
fib = n ⇒ n ≤ 1 ? 1 : fib(n-1) + fib(n-2)  
calls: ["call","call","call","call","call","getCallCount"]  
args: [[1],[2],[3],[3],[5],[]]  
Output: `[1, 2, 3, 3, 8, 5]`  
*Explanation:*
If you call memoizedFib(1), (2), (3), (3), (5):
- Each is only computed once, further calls are cached
- getCallCount() ⇒ returns number of unique computations (5 here)


### Thought Process (as if you’re the interviewee)  
Start by recognizing the problem asks for a *general-purpose memoizer*:  
We need to return a function which, for every input, checks a cache to see if the function was already called with those arguments.  
If so, return cached value; if not, compute value, cache it, and return.

Naive (brute-force) solution would simply call `fn` every time.  
To optimize, store a mapping from argument(s) to result.  
Because arguments might be multiple values, the most straightforward key is to join all arguments as a string, e.g. `"a,b"`.  
This makes comparing input lists easy.  
In some languages, using tuple or a hashable objects as key is better, but for primitive arguments, a stringified key is fine.

Additionally, to mimic the problem, we should also support a `.getCallCount()` method to report how many *unique* underlying calls to `fn` have occurred (not counting cache hits).

Trade-offs:  
- Simple cache approach works for primitive/value arguments.
- For object/function/array arguments, more robust hash/keying is needed (but not needed here per examples).
- Storing too many cache entries can consume memory; generally not a problem unless fn is called with huge variety of inputs.

This approach is robust and generally applicable to any "pure" function (outputs depend only on inputs and no side effects).

### Corner cases to consider  
- Calls with identical arguments but in different order (e.g. sum(2,3) vs sum(3,2))  
- Functions with no arguments (memoizing constants)  
- Large or complex argument arrays (care how they are stringified!)  
- Same argument value but different types (e.g. 1 vs '1')  
- Functions with side-effects (not suitable for memoization)  
- Functions with non-hashable arguments (not expected in this problem)
- Cache grows unbounded if function is called with infinitely many different parameters

### Solution

```python
def memoize(fn):
    """
    Returns a memoized version of the input function fn.
    Also attaches a getCallCount() method to report unique real calls to fn.
    """
    cache = dict()            # Stores key → result
    call_count = [0]          # Use list for mutability in closure
    
    def get_key(args):
        # Convert tuple of arguments to a string, suitable as a dict key
        # Assuming arguments are serializable and order matters
        return repr(args)
    
    def memoized_fn(*args):
        key = get_key(args)
        if key in cache:
            return cache[key]
        # Call actual function since result not cached
        res = fn(*args)
        cache[key] = res
        call_count[0] += 1
        return res
    
    # Attach getCallCount method
    def get_call_count():
        return call_count[0]
    
    memoized_fn.getCallCount = get_call_count
    return memoized_fn
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  For each unique input, the underlying function is called once. Each *subsequent* call with the same parameters is O(1) due to hashing and dict lookup.  
  So, O(1) per call *after* the value has been cached; O(f(input)) for the first time where f(input) is the cost of fn.

- **Space Complexity:**  
  O(u) where `u` is the number of unique argument combinations passed to the memoized function (i.e., one cache slot per unique argument tuple).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you memoize functions with object or list arguments?  
  *Hint: Think about how to create unique and hashable cache keys for non-primitive arguments.*

- What are potential downsides of memoization in long-running applications?  
  *Hint: Consider memory usage if there are many unique calls or unbounded inputs.*

- How would you add a cache eviction policy (e.g., least-recently-used/LRU)?  
  *Hint: Discuss built-in data structures for fixed-size cache management.*

### Summary
This problem is a classic **function caching/memoization** pattern—wrapping a function and caching results based on input arguments.  
It’s a versatile technique, useful for optimizing recursive algorithms (like Fibonacci or factorial), reusing expensive computations, and improving API performance when calls are pure and deterministic.  
The solution can be adapted to add features like cache expiry, LRU-eviction, and argument normalization for real-world use-cases.  
Commonly seen in dynamic programming (with recursion), and in UI frameworks or database query optimization.

### Tags

### Similar Problems
- Counter(counter) (Easy)
- Curry(curry) (Medium)
- Function Composition(function-composition) (Easy)
- Memoize II(memoize-ii) (Hard)