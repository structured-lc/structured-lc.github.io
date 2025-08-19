### Leetcode 2727 (Easy): Is Object Empty [Practice](https://leetcode.com/problems/is-object-empty)

### Description  
Given an input that is either an object (dictionary/map) or an array (list), determine whether it is **empty**. An empty object contains no key-value pairs; an empty array contains no elements.  
The function should return `True` if the object or array is empty. If not, return `False`.  
Typical interview clarifications: The input will always either be an object or array (never a primitive), and you do *not* need to worry about null/None inputs.

### Examples  

**Example 1:**  
Input: `{"x": 5, "y": 42}`  
Output: `False`  
*Explanation: Object has two key-value pairs, so it is not empty.*

**Example 2:**  
Input: `{}`  
Output: `True`  
*Explanation: Object has no key-value pairs, so it is empty.*

**Example 3:**  
Input: `[1, 2, 3]`  
Output: `False`  
*Explanation: Array has three elements, so it is not empty.*

**Example 4:**  
Input: `[]`  
Output: `True`  
*Explanation: Array has zero elements, so it is empty.*

### Thought Process (as if you’re the interviewee)  
First, I want to determine whether the input is a dictionary or a list, since only those types qualify for this check.  
- For dictionaries, the length being zero means empty (no keys).
- For lists, the length being zero means empty (no items).  
The brute-force solution is to check `len(obj) == 0` for both types, but sometimes interviewers want you to avoid using single-line Python tricks or Python built-ins, so I will use a more manual approach for maximum clarity.

Edge decision: If input is neither a dictionary nor a list, problem constraints say this can’t happen, but in a real system, I might want to throw an exception (not required here).  
Ultimately, using a for-loop to check if there are elements/keys could also work, but checking the length is both efficient and idiomatic.

### Corner cases to consider  
- Empty dictionary: `{}`
- Empty list: `[]`
- Dictionary with one key-value pair
- List with one element
- Nested dictionaries or arrays: do *not* check recursively, only top-level
- Unusual keys (e.g., numbers, None) or values: still count as “not empty”
- No need to handle None or primitives  
- Large objects/arrays (just to check O(1) behavior)

### Solution

```python
def is_empty(obj):
    """
    Returns True if the input (dict or list) is empty, False otherwise.
    """
    # For a dictionary: empty if no keys
    if isinstance(obj, dict):
        return len(obj) == 0
    
    # For a list: empty if no elements
    if isinstance(obj, list):
        return len(obj) == 0

    # By Leetcode constraints, we don't expect other types.
    # But in a real system, might want:
    # raise ValueError("Input is not a dict or list.")
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — Checking the length of a dictionary or list requires O(1) time.
- **Space Complexity:** O(1) — No extra data structures or recursion used; operation is in constant space.

### Potential follow-up questions (as if you’re the interviewer)  

- What should be returned for an input value that is neither an object nor an array?  
  *Hint: Check constraints or specs; do you reject or ignore invalid inputs?*

- What if the array or object contains only empty elements (e.g., `[{}, []]` or `{"a": {}}`)?  
  *Hint: Are we checking emptiness recursively or only at the top level?*

- How would you handle a custom object or a data structure that mimics a dictionary/array?  
  *Hint: Use duck typing or check for collections.abc interfaces in Python?*

### Summary
The approach uses a straightforward type check and length check, a common **type guard with immediate property** pattern.  
This is a generic, reusable check that appears in many API validation, serialization, and defensive programming settings.  
The same technique (checking `len()` or equivalent) is widely applicable to data validation, input wrappers, or language-agnostic type-check logic.

### Tags

### Similar Problems
