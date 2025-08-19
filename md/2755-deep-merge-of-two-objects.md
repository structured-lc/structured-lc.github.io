### Leetcode 2755 (Medium): Deep Merge of Two Objects [Practice](https://leetcode.com/problems/deep-merge-of-two-objects)

### Description  
Given two JavaScript (or Python dict) objects (which can include arrays and nested structures), merge them **recursively**:
- If a key exists in both objects:
  - If both values are objects (or both arrays), merge them recursively.
  - If types differ, the second object's value replaces the first.
- If a key exists in only one of the objects, copy it as is.
- The merge is **deep**: this means nested arrays/objects are recursively merged, not merely shallow appended.

### Examples  

**Example 1:**  
Input:  
`obj1 = { "a": 1, "b": { "c": 3, "d": 4 }, "e": [5, 6] }, obj2 = { "b": { "c": 8, "e": 9 }, "e": , "f": 10 }`  
Output:  
`{ "a": 1, "b": { "c": 8, "d": 4, "e": 9 }, "e": [7, 6], "f": 10 }`  
Explanation:  
- b.c is overwritten to 8.  
- b.d remains as 4.  
- b.e is new, becomes 9.  
- e arrays: first element from obj2 (7), rest from obj1 (6).  
- f is new in obj2, so included.  

**Example 2:**  
Input:  
`obj1 = { "x": 42 }, obj2 = { "x": { "y": 99 } }`  
Output:  
`{ "x": { "y": 99 } }`  
Explanation:  
- x is an int in obj1, object in obj2; obj2's value takes precedence.

**Example 3:**  
Input:  
`obj1 = [1, 2, { "a": 3 }], obj2 = [4, 5, { "b": 6 }]`  
Output:  
`[4, 5, { "a": 3, "b": 6 }]`  
Explanation:  
- For each index, merge recursively. Last is merged as an object.

### Thought Process (as if you’re the interviewee)  
First, I interpret “deep merge” as recursively merging structures:
- If both are dicts: merge keys recursively.
- If both are lists: merge by index, recursively for corresponding elements.
- If types differ (dict vs list, or primitive vs object/array): value from second object overrides the first.
- For newly added keys/elements (present only in one input): just copy as is.

Brute-force idea: write separate logic for array-vs-array, dict-vs-dict, else use the second value.

Optimizing: recursion is natural here, since merging is required at every (possibly nested) node. 
Key tradeoff: Do we work in-place or return a new structure? For functional clarity, I’d return a new object.

### Corner cases to consider  
- Empty dict or array in either input
- One value is primitive, other is array/dict (pick second)
- Nested levels much deeper than two
- Null or None values
- Arrays of different lengths
- Conflicting object vs array structure at same key
- Non-integer keys in arrays (should not happen in JS, but possible in some Python data)

### Solution

```python
def deep_merge(obj1, obj2):
    # Helper for merging two values
    if type(obj1) != type(obj2):
        # If types differ, obj2 overwrites obj1
        return obj2
    if isinstance(obj1, dict):
        merged = dict(obj1)  # Copy obj1
        for k in obj2:
            if k in merged:
                merged[k] = deep_merge(merged[k], obj2[k])
            else:
                merged[k] = obj2[k]
        return merged
    if isinstance(obj1, list):
        # Merge by index
        len1, len2 = len(obj1), len(obj2)
        merged = []
        for i in range(max(len1, len2)):
            if i < len1 and i < len2:
                merged.append(deep_merge(obj1[i], obj2[i]))
            elif i < len2:
                merged.append(obj2[i])
            else:
                merged.append(obj1[i])
        return merged
    # For primitives or mismatched types, use obj2
    return obj2
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N), where N is the total number of keys and elements across both objects; every key and index is visited once.  
- **Space Complexity:**  
  O(N) for the output object created, and up to O(D) for recursion stack, where D is the maximum depth of nesting.

### Potential follow-up questions (as if you’re the interviewer)  

- How do you handle cycles or self-references in the input objects?  
  *Hint: Think about visited structures and tracking references.*

- Can you implement this non-recursively (iteratively) to avoid stack overflow on deeply nested objects?  
  *Hint: Use an explicit stack to simulate recursion.*

- What if merging is required for sets or other data types (custom merge rules)?  
  *Hint: How would you parametrize or generalize the merge function?*

### Summary
This deep merge is a classic **recursive structural merge** problem, applicable to configuration management, object diffs, or file merging tools. It uses recursion and dynamic type inspection, and the same pattern appears in schema validation, data reconciliation, and JSON/YAML patching.

### Tags

### Similar Problems
