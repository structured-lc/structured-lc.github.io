### Leetcode 2775 (Medium): Undefined to Null [Practice](https://leetcode.com/problems/undefined-to-null)

### Description  
Given a deeply nested object or array, return a new object where **every occurrence of the value `undefined` is replaced by `null`**. The traversal should be **recursive**, so all nested children, arrays, and objects have this transformation applied. This is useful when serializing to JSON because `undefined` values are omitted or can cause errors, but `null` is preserved.

### Examples  

**Example 1:**  
Input: `{"a": undefined, "b": 3}`  
Output: `{"a": null, "b": 3}`  
*Explanation: a's value is `undefined` so it becomes `null`, b remains unchanged.*

**Example 2:**  
Input: `{"a": undefined, "b": ["a", undefined]}`  
Output: `{"a": null, "b": ["a", null]}`  
*Explanation: a is replaced with null and the second element in b's array (`undefined`) is replaced by null.*

**Example 3:**  
Input: `[undefined, {"b": undefined, "c": ["x", undefined]}]`  
Output: `[null, {"b": null, "c": ["x", null]}]`  
*Explanation: All `undefined` values—even deep in nested arrays/objects—become `null`.*

### Thought Process (as if you’re the interviewee)  
- My first thought is to **recursively traverse** the entire structure.  
- Since objects and arrays in JavaScript/TypeScript can both contain nested values, I'll check if each value is itself an object or array.  
- For **every property or element**, if it is `undefined`, I replace it with `null`.  
- If it's an object or array, I recursively apply the function.  
- The brute-force approach is to mutate the input in place, but it's safer to create a new object/array to avoid side-effects.  
- Final approach:  
   - Distinguish between arrays and objects.
   - Return a new object/array with the same shape, but all `undefined` replaced by `null`.
   - Recursively handle all levels of nesting.

### Corner cases to consider  
- Input is `undefined` itself (should return `null`).
- Primitives like numbers, strings, `null` itself—should remain unchanged.
- Empty objects `{}` and arrays `[]`.
- Nested empty objects/arrays.
- Non-enumerable properties (typically, ignore these in JS).
- Input is not an object or array (e.g. a number or string).

### Solution

```python
def undefined_to_null(obj):
    # If obj is literally undefined (not possible in Python, but covering the logic)
    if obj is None:
        return None

    # If obj is a list, process each element recursively
    if isinstance(obj, list):
        return [undefined_to_null(item) if item is not None else None for item in obj]
    
    # If obj is a dict, process each key's value recursively
    if isinstance(obj, dict):
        result = {}
        for key, value in obj.items():
            if value is None:
                result[key] = None
            elif isinstance(value, (dict, list)):
                result[key] = undefined_to_null(value)
            else:
                result[key] = value
        return result

    # For primitive types, return as-is
    return obj
```

*Note: In JavaScript, you'd check `value === undefined`, but in Python, only `None` can directly represent this. The logic is identical.*

### Time and Space complexity Analysis  

- **Time Complexity:** O(N) where N is the total number of nodes/properties/elements in the structure. Every property and element is visited exactly once.
- **Space Complexity:** O(D) where D is the maximum depth of nesting (due to recursion stack), plus O(N) for output if copying. If mutating in-place, extra space can be O(D).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle cyclic references?
  *Hint: Maintain a set of visited nodes to avoid infinite recursion.*

- Can you do this in-place, and what are the trade-offs?
  *Hint: Modifies the input. Risk of unintended side-effects elsewhere in code.*

- How would you extend this to process only certain keys or only arrays?
  *Hint: Add conditional params for keys or types.*

### Summary
This problem uses the **recursive traversal** (DFS) pattern for deeply nested objects/arrays. It's common in problems like deep cloning, serialization, and data transformations. Robust error handling and correctly distinguishing object from array is key. Similar logic applies to tasks like deeply flattening structures or performing any recursive transformation.

### Tags

### Similar Problems
