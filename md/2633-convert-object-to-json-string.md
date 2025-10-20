### Leetcode 2633 (Medium): Convert Object to JSON String [Practice](https://leetcode.com/problems/convert-object-to-json-string)

### Description  
Given an input value which can be an object, array, string, number, boolean, or null, implement a function that returns its valid JSON string representation. You should **not** use any built-in JSON serialization functions. Arrays and objects may be nested, and you must recursively format all contained values. Strings are enclosed in double quotes; object keys must retain their property order as given; and primitives (number, boolean, null) must appear as-is in JSON syntax.

### Examples  

**Example 1:**  
Input: `{"y":1,"x":2}`  
Output: `{"y":1,"x":2}`  
*Explanation: Each key-value pair is rendered as "key":value. Order is preserved, and numbers are not quoted.*

**Example 2:**  
Input: `{"a":"str","b":-12,"c":true,"d":null}`  
Output: `{"a":"str","b":-12,"c":true,"d":null}`  
*Explanation: String values are enclosed in double quotes. Boolean true, number -12, and null appear as-is.*

**Example 3:**  
Input: `{"key":{"a":1,"b":[{},null,"Hello"]}}`  
Output: `{"key":{"a":1,"b":[{},null,"Hello"]}}`  
*Explanation: Nested object under "key"; its "b" value is an array with an empty object, null, and a string.*

**Example 4:**  
Input: `true`  
Output: `true`  
*Explanation: Booleans are serialized directly without quotes.*

### Thought Process (as if you’re the interviewee)  
I would start by handling each value type separately, since the valid JSON representation depends on the type:
- For strings, return the value with double quotes and properly escape any necessary characters.
- For numbers, booleans, or null, return the string representation directly.
- For arrays, recursively process each element and wrap them in brackets, separating by commas.
- For objects, recursively process each key-value pair. Keys become double-quoted strings, and values use the same serialization logic. Each pair is joined by a colon and pairs are joined by commas, with the whole object wrapped in braces.
- The main challenges are recursion (for arbitrary nesting) and edge case handling (empty arrays/objects, string escaping).  
A brute-force approach would be to check the type and handle accordingly at each recursive call. Optimization comes from minimizing unnecessary conversions and efficiently building the string.

### Corner cases to consider  
- An empty array: `[]` → `"[]"`
- An empty object: `{}` → `"{}"`
- Strings with special characters: e.g. `"line\nbreak"` → `"\"line\\nbreak\""`
- Null values: `null`
- Invisible values inside arrays/objects (i.e., arrays with only nulls, objects with nested empty objects)
- Already stringified values (should not double-quote)
- Booleans, numbers at root level
- Deeply nested structures (e.g., array of arrays, object within array, etc.)
- Top-level primitives, not only arrays/objects

### Solution

```python
def json_stringify(obj):
    # Helper to escape necessary characters in strings
    def escape_string(s):
        # Only escape " and \ (basic spec for this problem)
        return s.replace('\\', '\\\\').replace('"', '\\"')

    # Handle string
    if isinstance(obj, str):
        return '"' + escape_string(obj) + '"'

    # Handle numbers (int, float), booleans, and None (null)
    if isinstance(obj, (int, float)):
        return str(obj)
    if obj is True:
        return 'true'
    if obj is False:
        return 'false'
    if obj is None:
        return 'null'

    # Handle arrays (lists, tuples)
    if isinstance(obj, (list, tuple)):
        # Recursively serialize each element
        elements = [json_stringify(item) for item in obj]
        return '[' + ','.join(elements) + ']'

    # Handle objects (dict)
    if isinstance(obj, dict):
        items = []
        for key in obj:
            # Keys must be strings in JSON
            key_str = '"' + escape_string(str(key)) + '"'
            value_str = json_stringify(obj[key])
            items.append(key_str + ':' + value_str)
        return '{' + ','.join(items) + '}'

    # Catch-all for unsupported types
    raise TypeError(f"Type {type(obj)} not supported")
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the total number of primitive values in the input object/array tree. Each value is visited and serialized exactly once.
- **Space Complexity:** O(D), where D is the maximum depth of nesting due to recursion stack, plus O(S) for the concatenated resulting string S.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle string escaping for all special characters (e.g., \n, \t, unicode)?
  *Hint: Think about the JSON specification for string escape codes.*

- Can you support key types other than strings (numbers, booleans) as with Python dictionaries?
  *Hint: Consider key conversion, but recall the JSON spec only allows string keys.*

- What if the input objects could contain circular references?
  *Hint: Think about detection strategies and appropriate error handling or error messages.*

### Summary
This solution uses a **recursive serialization** pattern, where each component (object, array, etc.) delegates to the same function for its children. This is a classic example of recursive data structure traversal for serialization and parsing, which is common in JSON, XML, and tree-like data problems. It’s highly applicable to any problem that requires processing nested or recursively defined data without using libraries.


### Flashcard
Convert an object to a JSON string by recursively handling each value type and properly escaping characters.

### Tags

### Similar Problems
- JSON Deep Equal(json-deep-equal) (Medium)
- Flatten Deeply Nested Array(flatten-deeply-nested-array) (Medium)
- Array of Objects to Matrix(array-of-objects-to-matrix) (Hard)
- Differences Between Two Objects(differences-between-two-objects) (Medium)