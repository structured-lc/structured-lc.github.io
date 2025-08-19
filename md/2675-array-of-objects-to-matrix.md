### Leetcode 2675 (Hard): Array of Objects to Matrix [Practice](https://leetcode.com/problems/array-of-objects-to-matrix)

### Description  
Given an array of objects (or arrays), which may be deeply nested and can contain numbers, strings, booleans, or null, convert it into a 2D matrix.  
- The **first row** should be the sorted list of unique column names (flattened keys with dot `.` notation for nested properties).
- The **remaining rows** correspond to each object, mapping values to columns as per the key path; missing keys are represented as "".
- Columns must be ordered **lexicographically ascending**.

### Examples  

**Example 1:**  
Input: `[{"b": 1, "a": 2}, {"b": 3, "a": 4}]`  
Output: `[["a", "b"], [2, 1], [4, 3]]`  
*Explanation: Unique keys are "a" and "b", so columns are ["a", "b"]. Each row fills both from each object.*

**Example 2:**  
Input: `[{"a": 1, "b": {"x": 2, "y": 3}}, {"a": 4, "b": {"y": 6, "z": 7}}]`  
Output: `[["a","b.x","b.y","b.z"], [1,2,3,""], [4,"",6,7]]`  
*Explanation: The keys flatten to "a", "b.x", "b.y", "b.z". Not all objects have every key, so missing values are filled with "".*

**Example 3:**  
Input: `[{"a": [{"b": 1}, {"b": 2}]}, {"a": [{"b": 3}]}]`  
Output: `[["a.0.b","a.1.b"], [1,2], [3,""]]`  
*Explanation: Arrays are indexed with dot notation, like "a.0.b". Not all arrays have the same length so missing values fill with "".*

### Thought Process (as if you’re the interviewee)  
First, I’d want to **flatten each object** recursively, preserving the path to each leaf value (using dot notation for object keys and numeric indexes for arrays).  
- **Step 1:** Recursively flatten each object into a {path: value} mapping.  
- **Step 2:** Collect all unique paths across all objects to get the column set; sort these lexicographically.  
- **Step 3:** For each original object, build a row by matching the sorted column paths; use "" if a value is missing.

This handles deeply nested mixes of objects and arrays.  
A brute-force approach is to visit each key of each object and recursively flatten, which is acceptable because we must examine every value to build the paths. There’s no real optimization beyond ensuring each object is only traversed once for flattening.

### Corner cases to consider  
- **Empty input array:** Should return `[[]]`.
- **Objects with disjoint keys:** Some columns will have "" for missing values.
- **Nested arrays of different lengths:** Columns may be missing for some rows.
- **Null or primitive values at the root:** Treat as having an empty string path.
- **Objects with keys that include dots `.`:** Assume paths are always separated by `.`, so ambiguity if input contains keys with literal dots.

### Solution

```python
def array_of_objects_to_matrix(arr):
    # Helper: recursively flatten an object, collecting path->value
    def flatten(obj, path, out):
        if isinstance(obj, dict):
            for k, v in obj.items():
                flatten(v, path + [str(k)], out)
        elif isinstance(obj, list):
            for idx, v in enumerate(obj):
                flatten(v, path + [str(idx)], out)
        else:
            out[".".join(path)] = obj

    # 1. Flatten each row, collect all unique columns (paths)
    seen_cols = set()
    flat_rows = []

    for item in arr:
        flat_map = {}
        flatten(item, [], flat_map)
        flat_rows.append(flat_map)
        seen_cols |= set(flat_map.keys())

    sorted_cols = sorted(seen_cols)

    # 2. Build matrix: first row is sorted_cols, following are per-object rows
    matrix = [sorted_cols]
    for flat_map in flat_rows:
        row = []
        for col in sorted_cols:
            val = flat_map.get(col, "")
            row.append(val)
        matrix.append(row)

    return matrix
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N × K + T log T)
  - N = number of objects, K = average number of fields per object (due to flattening each).
  - T = total number of unique field paths (columns), sorting adds O(T log T).
- **Space Complexity:** O(N × K + T)
  - Need to store flattened mappings for all N objects and T columns in memory.

### Potential follow-up questions (as if you’re the interviewer)  

- What if an object can have keys with dots `.`? How can you avoid ambiguity in dot-separated paths?  
  *Hint: Use a different separator or encode actual dot characters.*

- Can you stream the input array and write each row to disk, instead of building the whole matrix in RAM?  
  *Hint: Requires two passes: one to collect column set, one to write rows.*

- How would you modify this to support deeply nested arrays (e.g., lists of lists of dicts)?  
  *Hint: Concatenate indices at every array nesting level.*

### Summary
This problem uses the **recursion + hashmap flattening** pattern, central for any serialization of nested data.  
Identifying unique paths as columns and organizing data accordingly is a common ETL/data wrangling problem, applicable to JSON-to-table conversion, log flattening, and spreadsheet construction.  
The key details are path management, missing value handling, and column ordering.

### Tags

### Similar Problems
- JSON Deep Equal(json-deep-equal) (Medium)
- Convert Object to JSON String(convert-object-to-json-string) (Medium)