### Leetcode 2705 (Medium): Compact Object [Practice](https://leetcode.com/problems/compact-object)

### Description  
Given an object or array, recursively remove all keys/indices that have **falsy values**, at any depth.  
Falsy values include: `false`, `0`, `""` (empty string), `null`, `undefined`, and `NaN`.  
The output should be a new structure with the same shape but omitting all falsy leaf nodes.  
Arrays are also treated as objects and should have falsy elements stripped.  
Assume the input is the output from `JSON.parse` and is always valid JSON (contains only numbers, strings, booleans, arrays, objects, or null).

### Examples  

**Example 1:**  
Input: `[null, 0, false, 1]`  
Output: `[1]`  
*Explanation: All falsy values (`null`, `0`, `false`) are removed; only `1` remains.*

**Example 2:**  
Input: `{"a": null, "b": [false, 1]}`  
Output: `{"b": [1]}`  
*Explanation: Property `"a"` is `null` (falsy) and removed. Property `"b"` is an array; its first element (`false`) is falsy and removed, so `"b"` becomes `[1]`.*

**Example 3:**  
Input: `[null, 0, 5, , [false, 16]]`  
Output: `[5, [], ]`  
*Explanation:  
- `null` and `0` are falsy and removed from the outer array.  
- `` becomes `[]` because `0` is falsy.  
- `[false, 16]` becomes `` because `false` is falsy. Only `[5, [], ]` are retained.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach is to walk through every value of the object or array, and for every element:
- If it's an object or array, recursively compact it.
- If it's a primitive and **falsy**, remove it (don't include it in the output).
- If it's a primitive and **truthy**, keep it.

For objects, we copy only keys whose values survive compaction.  
For arrays, we build a new array including only truthy (and compacted) elements.

**Recursive traversal** is ideal for this structure, as arbitrarily deep nesting can exist.  
Trade-offs:  
- Recursion is simple and elegant, but stack overflow risk is negligible here since JSON objects rarely grow deep enough in interviews.
- We must avoid mutating the input.

### Corner cases to consider  
- Input is `null` or empty array/object (should return e.g. `{}` or `[]`).
- Nested empty objects/arrays after compaction (should remain as empty `{}` or `[]`).
- Falsy values inside deep nested arrays/objects.
- Primitive truthy and falsy values at the root level.
- Arrays with all elements falsy (should become `[]`).

### Solution

```python
def compactObject(obj):
    # Base case: primitives
    if not isinstance(obj, (dict, list)):
        # Return the value only if it's truthy (not falsy)
        # Note: bool(float('nan')) is True in Python, not like JS, so treat float('nan') manually
        if obj is None or obj is False or obj == 0 or obj == "" or (isinstance(obj, float) and obj != obj):
            return None
        return obj

    if isinstance(obj, list):
        result = []
        for item in obj:
            compacted = compactObject(item)
            # Only include truthy items (skip None and other falsy values)
            # If recursive call returned None or is falsy, skip it
            # But allow objects or arrays (might be empty; check for None explicitly)
            if compacted or compacted == 0:  # keep 0 explicit, since 0 is falsy
                result.append(compacted)
            elif isinstance(compacted, (dict, list)) and compacted is not None:
                # Keep empty dict/array
                result.append(compacted)
        return result

    # Otherwise, obj is a dict (object)
    result = {}
    for key in obj:
        compacted = compactObject(obj[key])
        if compacted or compacted == 0:
            result[key] = compacted
        elif isinstance(compacted, (dict, list)) and compacted is not None:
            # Keep empty dict/array
            result[key] = compacted
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N)  
  N = number of elements (total keys + values) in the structure. Each node is visited once recursively.

- **Space Complexity:** O(N)  
  Need extra space for the output object/array and the recursion stack. For deeply nested structures, recursion stack ≤ nesting depth.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle non-JSON types (functions, Date, etc.)?
  *Hint: Consider type checking and custom filtering logic.*

- Can you implement this without recursion (iterative/deep stack yourself)?
  *Hint: Try DFS with your own stack to replace the call stack.*

- If some keys are reserved and must be retained even if falsy, how would your function change?
  *Hint: Add a parameter for exception keys, and skip removal for those.*

### Summary
This problem is a classic **recursive deep-clean/filter** pattern frequently seen on nested data, such as in config cleaning, deep cloning, or data ingestion pipelines.  
The recursive traversal with compaction is a useful template for flattening, cleaning, or transforming complex hierarchical data. The concept is widely applicable in data parsing, normalization tasks, and interviewer favorites dealing with object/array manipulation.