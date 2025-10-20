### Leetcode 2692 (Medium): Make Object Immutable [Practice](https://leetcode.com/problems/make-object-immutable)

### Description  
Given an object or array (possibly nested) representing JSON data, create a version of it that is **immutable**.  
Specifically:
- **Attempting to set a property on an object** must throw `Error Modifying: <key>`.
- **Attempting to set an array index** must throw `Error Modifying Index: <index>`.
- **Calling any array mutator method** (`pop`, `push`, `shift`, `unshift`, `splice`, `sort`, `reverse`) must throw `Error Calling Method: <methodName>`.
- The immutability must be **deep**: all nested objects/arrays should also be immutable.

The input will always be a valid, non-cyclic JSON object or array.

### Examples  

**Example 1:**  
Input: `const obj = makeImmutable({x: 5}); obj.x = 6`  
Output: Throws `"Error Modifying: x"`  
*Explanation: Setting property `x` is not allowed and throws the specified error.*

**Example 2:**  
Input: `const arr = makeImmutable([1, 2, 3]); arr = 10`  
Output: Throws `"Error Modifying Index: 0"`  
*Explanation: Setting an array index is not allowed and throws the specified error.*

**Example 3:**  
Input:  
```
const arr = makeImmutable([1, 2, 3]);
arr.push(4)
```
Output: Throws `"Error Calling Method: push"`  
*Explanation: Calling the mutating method `push` is blocked with the specified error message.*

**Example 4:**  
Input:  
```
const nested = makeImmutable({a: [1, {b: 2}]});
nested.a[1].b = 3
```
Output: Throws `"Error Modifying: b"`  
*Explanation: Assignment is deeply blocked due to deep proxying.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force (Shallow):**  
  Simply freeze the object using `Object.freeze(obj)`.  
  But this only blocks properties at the top level and doesn't give custom error messages.

- **Deep Immutability:**  
  Recursively traverse all objects/arrays. For each object or array, wrap it in a JavaScript Proxy to intercept write/call operations.

- **Arrays vs. Objects:**  
  - For arrays: block assignments to indices, and intercept all mutating method calls.
  - For objects: block property writes.
  - Recursively wrap nested objects/arrays to ensure deep immutability.

- **Error Messages:**  
  Carefully distinguish property/array index for error type.
  For mutator methods, throw errors when they're called.

- **Trade-off:**  
  Using Proxy provides fine control and custom error messages, at the cost of some performance and added complexity.

- **Decision:**  
  Use recursive DFS and Proxy, as it’s the only practical way to both deeply prevent modification and control error messages.

### Corner cases to consider  
- Input is already deeply immutable (no-op, should behave correctly).
- Deeply nested objects/arrays: verify modification is blocked at any level.
- Empty object or array: should still be immutable, no error on read access.
- Non-modifying method calls (e.g., map, filter): should be allowed.
- Properties or indices that do not exist: setting new keys/indices must also throw.
- Attempting to delete properties/indices.

### Solution

```python
# We'll simulate the JavaScript behavior for immutability as described.
# We'll use JS-style pseudo-Python for demonstration.
# But in interviews, you'd show the logic, and describe exactly how Proxy traps work.

def makeImmutable(obj):
    # List of array-mutating method names to intercept
    methods = ['pop', 'push', 'shift', 'unshift', 'splice', 'sort', 'reverse']
    
    def dfs(value):
        # Recursively wrap nested objects/arrays
        if isinstance(value, dict):
            # Wrap all values recursively
            for k in value:
                if isinstance(value[k], (dict, list)):
                    value[k] = dfs(value[k])
            # Return a proxy that blocks property sets
            return ProxyDict(value)
        if isinstance(value, list):
            # Wrap all items recursively
            for i in range(len(value)):
                if isinstance(value[i], (dict, list)):
                    value[i] = dfs(value[i])
            # Return a proxy that blocks index sets and methods
            return ProxyList(value)
        return value

    # Define proxy for object
    class ProxyDict(dict):
        def __setitem__(self, key, val):
            raise Exception(f"Error Modifying: {key}")
        def __delitem__(self, key):
            raise Exception(f"Error Modifying: {key}")
        def __getattribute__(self, name):
            if name in ('__setitem__', '__delitem__'):
                raise Exception(f"Error Modifying: {name}")
            return dict.__getattribute__(self, name)
        
    # Define proxy for list
    class ProxyList(list):
        def __setitem__(self, idx, val):
            raise Exception(f"Error Modifying Index: {idx}")
        def __delitem__(self, idx):
            raise Exception(f"Error Modifying Index: {idx}")
        def __getattribute__(self, name):
            if name in methods:
                def method(*args, **kwargs):
                    raise Exception(f"Error Calling Method: {name}")
                return method
            return list.__getattribute__(self, name)

    return dfs(obj)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N), where N is the number of all keys and array elements recursively in the structure. Each value is visited once during proxy/wrapping.

- **Space Complexity:**  
  O(N), for the additional wrappers or recursive stack. We create proxy objects/lists for every node in the tree.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the object contains functions, symbols, or non-JSON types?  
  *Hint: JSON structures don’t, but in JS, Proxy must distinguish data types. How would you handle these?*

- How would you allow for “shallow” immutability (only top-level, not nested)?  
  *Hint: Don’t recurse. Only proxy/wrap the input object directly.*

- How would you handle making only certain properties immutable?  
  *Hint: Accept an optional list of property keys/indices to protect and check them in the proxy handlers.*

### Summary
This problem uses the **Proxy/Trap pattern** to recursively intercept all changes, achieving deep immutability with custom error messages.  
This approach is critical in situations where data integrity and traceable error reasons are vital, especially with complex, nested configuration or state structures.  
The **deep proxying pattern** is commonly seen in security wrappers, debugging libraries, and state managers in modern applications.


### Flashcard
Recursively wrap object and nested objects/arrays in Proxy; intercept set/deleteProperty traps to throw custom error, intercept array mutating methods (push, pop, shift, etc.) to throw error, return proxy for deep immutability.

### Tags

### Similar Problems
- Infinite Method Object(infinite-method-object) (Easy)
- Immutability Helper(immutability-helper) (Hard)