### Leetcode 2823 (Medium): Deep Object Filter [Practice](https://leetcode.com/problems/deep-object-filter)

### Description  
Given an object, array, or value, implement a function `deepFilter(obj, fn)` that:
- Recursively traverses **all levels** of nested objects and arrays.
- Applies the filter function **fn** to each value (primitive or null).
- **Only retains elements or properties for which fn returns true.**
- If an object or array becomes empty after filtering, **it is removed from the result**.
- If the top-level is completely filtered out, **undefined** is returned.

Key: The filter is **deep**, and all empty objects/arrays are removed (not just their keys/indices).

### Examples  

**Example 1:**  
Input:  
`obj = { "a": 1, "b": { "c": 2, "d": 3 }, "e": [4, 5, 6] }`,  
`fn = (x) => x % 2 === 0`

Output:  
`{ "b": { "c": 2 }, "e": [4, 6] }`

*Explanation:*
- "a": 1 is odd, so removed.
- "b" is an object; "c": 2 is even (kept), "d": 3 is odd (removed). After filtering, "b": { "c": 2 } is kept because it's not empty.
- "e" is an array; 4 and 6 are even (kept), 5 is odd (removed). So "e": [4, 6].


**Example 2:**  
Input:  
`obj = [1, 3, 5]`,  
`fn = (x) => x > 10`

Output:  
`undefined`  

*Explanation:*  
None of the numbers pass fn. The filtered array is empty, so it is pruned to undefined.


**Example 3:**  
Input:  
`obj = { "foo": { "bar": [] }, "baz": [] }`,  
`fn = (x) => true`

Output:  
`{ "foo": { "bar": [] }, "baz": [] }`

*Explanation:*
- fn always returns true, so nothing is filtered out.
- Empty arrays are part of the original structure, and since fn returns true for arrays, they are retained.

### Thought Process (as if you’re the interviewee)  

Start by analyzing how to handle different data types:
- If `obj` is a primitive (number, string, boolean, null), just apply fn.
- If `obj` is an array, recursively filter each element, prune elements filtered out, and if the result is empty, return undefined.
- If `obj` is an object, recursively deep filter each property, omit keys with undefined values, and if all keys are filtered out, prune the object (return undefined).

Brute-force is to use a DFS approach: for each node (array/object/primitive), process recursively.  
Main trade-off: must create **new** objects and arrays to avoid mutating the input.  
Optimization is not about time but depth and structure copying. Pruning only happens when a filtered sub-structure is truly empty.

This is a **recursive pattern** (DFS) suitable for tree or nested structure traversal.

### Corner cases to consider  
- Input is null or a primitive value.
- Input array or object is empty at some level.
- All properties or elements are filtered out (should prune that level).
- Multiple layers of nested arrays/objects.
- Non-primitive values: arrays in arrays, objects in arrays, arrays in objects.
- No value passes the filter (should return undefined).

### Solution

```python
def deep_filter(obj, fn):
    # Process primitive and null directly
    if not isinstance(obj, (dict, list)):
        return obj if fn(obj) else None  # None signals undefined

    # Handle list - apply filter recursively
    if isinstance(obj, list):
        result = []
        for item in obj:
            filtered = deep_filter(item, fn)
            if filtered is not None:
                result.append(filtered)
        if not result:  # Empty array pruned
            return None
        return result

    # Handle dict - apply filter recursively to each property
    result = {}
    for key, value in obj.items():
        filtered = deep_filter(value, fn)
        if filtered is not None:
            result[key] = filtered
    if not result:  # Empty object pruned
        return None
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the total number of values (including all nested elements and properties). Each value is visited exactly once.
- **Space Complexity:** O(H), where H is the max depth of the input (recursion stack), plus O(N) for output size in the worst case (all values retained).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution to filter keys as well as values?
  *Hint: Consider supplying a filter function that receives the key-value pairs, not just values.*

- How do you adapt it for very deep (possibly cyclic) structures?
  *Hint: Think about recursion limits and handling circular references or repeated substructures.*

- Could you make the function in-place, without allocating new objects?
  *Hint: Removing keys or popping array items during traversal but be careful not to skip elements.*

### Summary

This problem is a classic **recursive DFS/tree traversal** on nested structures with post-processing pruning (remove empty containers).  
The technique and pattern is very common in serialization, filtering, validated transformations, and could be adapted to other JSON/tree structure manipulations—especially those requiring deep, structural modifications and clean-up.

### Tags

### Similar Problems
