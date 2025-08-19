### Leetcode 2628 (Medium): JSON Deep Equal [Practice](https://leetcode.com/problems/json-deep-equal)

### Description  
Given two values (could be primitives, arrays, or objects), determine whether they are deeply equal. Deep equality means:
- For **primitives** (number, string, boolean, or null): values must be exactly equal.
- For **arrays**: both must be arrays, same length, and each element deeply equal and in same order.
- For **objects**: both must be objects (not arrays), same set of keys, and each key’s value must be deeply equal.  
This needs to work recursively, checking every nested level and type.

### Examples  

**Example 1:**  
Input: `o1 = { "x": 1, "y": 2 }`, `o2 = { "x": 1, "y": 2 }`  
Output: `True`  
*Explanation: Both objects have same keys and values.*

**Example 2:**  
Input: `o1 = { "y": 2, "x": 1 }`, `o2 = { "x": 1, "y": 2 }`  
Output: `True`  
*Explanation: Objects have same keys and values but order differs (order doesn’t matter for object keys).*

**Example 3:**  
Input: `o1 = [1, 2, 3]`, `o2 = [1, 2, 3]`  
Output: `True`  
*Explanation: Arrays are same length, elements at each index are equal.*

**Example 4:**  
Input: `o1 = [1, 2, 3]`, `o2 = [1, 2, 4]`  
Output: `False`  
*Explanation: Arrays have different values at index 2.*

**Example 5:**  
Input: `o1 = { "a": [1,2,{ "b": 3 }] }`, `o2 = { "a": [1,2,{ "b": 3 }] }`  
Output: `True`  
*Explanation: Nested array and object are deeply equal.*

### Thought Process (as if you’re the interviewee)  
Initially, I'd check for strict equality (`==`/`===`).  
If both are primitives (number, string, boolean, null), then just return the result of comparison.  
If both are arrays:  
- Both must be arrays, lengths must match.  
- Check each element recursively.
If both are objects:  
- Both must be objects (and not arrays).
- Keys must match (same set, order doesn’t matter).
- For each key, recursively check values.

For recursion, important to handle the base case (primitives and null), check type and structure match, and then recursively compare children. I won't use shortcuts like JSON.stringify (because order of object keys doesn’t matter and values might not be serializable in same way).

### Corner cases to consider  
- Null vs object: null is special (typeof null is 'object'), so handle explicitly.
- Empty arrays and empty objects: should match when both are empty of same type.
- Nested structures with objects/arrays inside objects/arrays.
- Different types at the same node (number vs string, array vs object).
- Objects with additional keys.
- Arrays with extra elements.
- Arrays vs objects (should never be equal).
- Keys with different case (JSON is case sensitive, so 'A' ≠ 'a').
- Nested nulls.

### Solution

```python
def are_deeply_equal(o1, o2):
    # If both are the same object or value (handles all primitives, including null)
    if o1 is o2:
        return True

    # If one is None and the other is not, or types don't match, not equal
    if o1 is None or o2 is None:
        return o1 is o2

    if type(o1) != type(o2):
        return False

    # If both are lists (arrays)
    if isinstance(o1, list):
        if len(o1) != len(o2):
            return False
        for a, b in zip(o1, o2):
            if not are_deeply_equal(a, b):
                return False
        return True

    # If both are dictionaries (objects)
    if isinstance(o1, dict):
        # Compare sets of keys
        if set(o1.keys()) != set(o2.keys()):
            return False
        for key in o1:
            if not are_deeply_equal(o1[key], o2[key]):
                return False
        return True

    # Otherwise: must be primitives (int, float, str, bool)
    return o1 == o2
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N), where N is the total number of nodes/values in the nested structures. Each element, key, and value is visited at most once in the recursive calls.

- **Space Complexity:**  
  O(D), where D is the maximum depth of nesting (due to recursion stack). No significant extra space is used besides recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle comparison of floating point numbers for "almost equal" values?  
  *Hint: Consider checking with a tolerance (epsilon).*

- How would you handle cyclical references in objects?  
  *Hint: Keep a set of visited object id pairs to prevent infinite recursion.*

- How would you handle custom class instances or non-serializable types?  
  *Hint: Consider checking instance types explicitly and defining equality for those.*

### Summary
This solution follows the recursive *deep equality* pattern, similar to problems requiring deep tree traversal, graph search, or nested comparisons.  
It is a direct application of divide-and-conquer for nested data.  
The same pattern can be applied to serialization, checksum validation, or other structure-sensitive comparisons.  
Key takeaways: always check for base cases (like primitives and null), match types, and recurse only when structure matches, being careful of Python's quirks with null and type checking.

### Tags

### Similar Problems
- Convert Object to JSON String(convert-object-to-json-string) (Medium)
- Flatten Deeply Nested Array(flatten-deeply-nested-array) (Medium)
- Array of Objects to Matrix(array-of-objects-to-matrix) (Hard)
- Differences Between Two Objects(differences-between-two-objects) (Medium)