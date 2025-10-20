### Leetcode 2700 (Medium): Differences Between Two Objects [Practice](https://leetcode.com/problems/differences-between-two-objects)

### Description  
Given two deeply nested objects (or arrays), return a new object that represents their **differences**.  
- Only compare keys (or array indices) present in **both** objects.
- For keys/indices where values differ, the result should have that key mapped to a `[val1, val2]` array.
- If values at a key/index are both objects or arrays, recursively compare their contents.
- Ignore keys present in only one object.
- If values are of different types (e.g., one is an object, other is a string), treat as a difference: `[obj1_value, obj2_value]`.
- Final output is a nested object showing only the differences as arrays; unchanged properties are not included.

### Examples  

**Example 1:**  
Input: `obj1 = {}, obj2 = { "a": 1, "b": 2 }`  
Output: `{}`  
*Explanation: No keys overlap, so output is empty.*

**Example 2:**  
Input: `obj1 = { "a": 1 }, obj2 = { "a": 2 }`  
Output: `{ "a": [1, 2] }`  
*Explanation: Key "a" differs; so we report [1, 2].*

**Example 3:**  
Input: `obj1 = { "a": 1, "b": 2, "c": 3 }, obj2 = { "a": 2, "b": 2, "c": 4 }`  
Output: `{ "a": [1, 2], "c": [3, 4] }`  
*Explanation: "a" and "c" are different; "b" is the same and ignored.*

**Example 4:**  
Input: `obj1 = { "a": { "b": 1 } }, obj2 = { "a": { "b": 2 } }`  
Output: `{ "a": { "b": [1, 2] } }`  
*Explanation: Nested difference at "a.b".*

**Example 5:**  
Input: `obj1 = [1, 2, 3], obj2 = [2, 2, 4]`  
Output: `{ "0": [1, 2], "2": [3, 4] }`  
*Explanation: At index 0 and 2, values differ.*

**Example 6:**  
Input: `obj1 = { "a": [1, 2, { "x": 5 }], "b": 4 }, obj2 = { "a": [1, 3, { "x": 5 }], "b": 5 }`  
Output: `{ "a": { "1": [2, 3] }, "b": [4, 5] }`  
*Explanation: "a[1]" differs; "a[2].x" is identical, so ignored; "b" differs.*

**Example 7:**  
Input:  
```
obj1 = [ { "a": 2 }, { "b": 4 } ]  
obj2 = [ { "a": 3 }, { "c": 4 } ]
```  
Output: `{ "0": { "a": [2, 3] } }`  
*Explanation: Only "a" exists in both at index 0; ignore "b" vs "c".*


### Thought Process (as if you’re the interviewee)  
- Start by **comparing values at every key/array index** that both objects share.
- If both are objects or arrays, **recurse**.
- If both are primitive types (number, string, etc.) and unequal, store `[val1, val2]` at that key.
- If types differ (array vs object, etc.), they are reported as `[val1, val2]`.
- Only keep changes where values differ and keys/indices exist in both objects.
- Use recursion to drill down into nested objects/arrays.
- If there are **no differences** for a particular subtree, omit that key from the result (so avoid empty nested objects).
- This approach focuses on **deep comparison** but only for shared keys.

**Trade-offs:**  
- **Recursive approach:** Clear and maps directly to the nested structure. Stack usage could be an issue if deeply nested.
- **Iterative would be hard**, as nesting is arbitrary/deep.
- **Efficient:** Only visiting shared keys and reporting minimal changes.

### Corner cases to consider  
- Both inputs are empty (`{}` or `[]`): output `{}`.
- Objects with only non-overlapping keys: output `{}`.
- Arrays with different lengths: compare only up to length of shorter (overlapping indices).
- One value is an array, other is an object, or other type: report as `[val1, val2]`.
- One value is `null`, other is something else: report as `[val1, val2]`.
- Nested structure with differences only several levels deep.
- Same object reference (obj1 is obj2): output `{}`.

### Solution

```python
def obj_diff(obj1, obj2):
    # If both variables are strictly equal, no differences
    if obj1 == obj2:
        return {}
    
    # If types are different, count as a difference
    if type(obj1) != type(obj2):
        return [obj1, obj2]
    
    # Check for null (in JSON) or other primitives
    if not isinstance(obj1, (dict, list)) or not isinstance(obj2, (dict, list)):
        # Primitives and not equal (since first check failed)
        return [obj1, obj2]
    
    # Prepare result
    res = {}
    
    # Handle arrays (lists in python)
    if isinstance(obj1, list) and isinstance(obj2, list):
        # Check overlapping indices only
        for i in range(min(len(obj1), len(obj2))):
            sub_diff = obj_diff(obj1[i], obj2[i])
            if sub_diff != {}:
                res[str(i)] = sub_diff
        return res
    
    # Handle dict
    if isinstance(obj1, dict) and isinstance(obj2, dict):
        for key in obj1:
            if key in obj2:
                sub_diff = obj_diff(obj1[key], obj2[key])
                if sub_diff != {}:
                    res[key] = sub_diff
        return res

    # Types are both container (list/dict), but not matching: treat as diff
    return [obj1, obj2]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N), where N is the total number of overlapping keys/indices in the nested structure.  
  In the worst case (fully overlapping structure), every key/element will be compared.

- **Space Complexity:**  
  O(D), where D is the maximum recursion depth (i.e., the depth of nesting) for the call stack,  
  plus O(K) space for the output, where K is the number of differences found.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle keys that exist in only one object?
  *Hint: Do you want to show adds/removes, or only diffs for matching keys?*

- Can you return the full path to each difference?
  *Hint: Build the path recursively, store alongside the values.*

- What if objects or arrays can be very deeply nested—how do you avoid maximum recursion stack depth?
  *Hint: Explore iterative approaches or limit input depth.*

### Summary
This problem uses the **recursive deep-diff** pattern, traversing two structures in parallel and comparing shared keys/indices.  
It's a common approach for **diff utilities, configuration comparisons, and state change tracking**.  
Skills tested include recursion, handling nested data, and careful type checking—all of which are valuable for backend engineering and state management.


### Flashcard
Recursively compare shared keys/indices; for each, if both are objects/arrays, recurse, else if primitives differ or types differ, record [val1, val2]; only include keys where values differ and exist in both.

### Tags

### Similar Problems
- JSON Deep Equal(json-deep-equal) (Medium)
- Convert Object to JSON String(convert-object-to-json-string) (Medium)