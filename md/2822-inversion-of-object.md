### Leetcode 2822 (Easy): Inversion of Object [Practice](https://leetcode.com/problems/inversion-of-object)

### Description  
Given an **object** or **array** `obj`, create a new object where each original value becomes a key, and each original key (or array index) becomes its value.  
- If a value occurs multiple times in the input, collect all its corresponding keys into an array (order does not matter).
- For arrays, use string indices as keys.
- Only invert the first-level properties (do not flatten or recursively process possible nested objects/arrays).

### Examples  

**Example 1:**  
Input: `{"a": "x", "b": "y", "c": "x"}`  
Output: `{"x": ["a", "c"], "y": "b"}`  
*Explanation: "x" appears twice, so keys are collected in an array. "y" appears once, so value is just the key.*

**Example 2:**  
Input: `["apple", "banana", "apple"]`  
Output: `{"apple": ["0", "2"], "banana": "1"}`  
*Explanation: Indices are used as keys. "apple" appears at index 0 and 2.*

**Example 3:**  
Input: `{"hello": 1, "world": 1}`  
Output: `{"1": ["hello", "world"]}`  
*Explanation: Both keys "hello" and "world" map to value 1, so result is "1": ["hello", "world"].*

### Thought Process (as if you’re the interviewee)  

- First, determine the type: is the input an object or array? For this problem, both are processed similarly, using their keys (or indices).
- For each key in the input, get its value.
- If the value is already a key in the output, update its value: 
  - If the value is currently a single string, convert it to an array and append the new key.
  - If already an array, just append.
- If not present, add it as key with value as the string of the original key.
- The tricky part: for arrays, keys are always their stringified indices.
- This is a typical *frequency grouping* or *reverse mapping* problem.
- Brute-force works in one pass, O(n).
- No optimization needed.

### Corner cases to consider  
- Empty object or array: should return empty object.
- Values are arrays/objects (should treat as keys, no deep/recursive inversion).
- Non-string/number/boolean/null values? All are acceptable as object keys after conversion (usually stringified).
- Duplicate values: keys should be collected as arrays.
- Only one unique value: still need to check array-vs-string result.

### Solution

```python
def invert_object(obj):
    # Output dictionary
    result = {}

    # Handle both dict and list inputs as key-value pairs (string keys)
    if isinstance(obj, dict):
        items = obj.items()
    else:
        # For list, use string indices as keys
        items = ((str(i), v) for i, v in enumerate(obj))

    for key, val in items:
        val_str = str(val)   # Convert value to string for object key

        if val_str in result:
            if isinstance(result[val_str], list):
                result[val_str].append(key)
            else:
                result[val_str] = [result[val_str], key]
        else:
            result[val_str] = key

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each element is traversed once. Dictionary operations (lookup, insert) are amortized O(1).
- **Space Complexity:** O(n) — Output object at worst holds every unique input value as key. For all keys mapping to one value, could require one array of all indices.

### Potential follow-up questions (as if you’re the interviewer)  

- What if values can themselves be objects or arrays?
  *Hint: Consider deep inversion or recursive flattening. How would you handle non-stringifiable objects as keys?*

- How would you invert deeply nested objects/arrays?
  *Hint: Recursively traverse and build a flat mapping, or create mappings per path.*

- What if you want to preserve original value types for keys?
  *Hint: Python only allows hashable types as keys. Consider custom hashing or use serialization.*

### Summary
This problem uses a direct *reverse mapping* (group-by-value) technique, commonly seen when grouping or counting properties by value.  
It's a simple O(n) hash map pattern, and variants appear in group-by scenarios, frequency counting, and table pivoting.  
Key points involve how to handle duplicates and non-string keys and the importance of only first-level processing.


### Flashcard
Iterate input keys; for each key-value pair, add value→key mapping; if value already exists, convert to array or append key.

### Tags

### Similar Problems
