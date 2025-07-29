### Leetcode 2794 (Easy): Create Object from Two Arrays [Practice](https://leetcode.com/problems/create-object-from-two-arrays)

### Description  
Given two arrays, **keysArr** (array of keys) and **valuesArr** (array of values), construct an object such that each key from **keysArr** is mapped to the value at the same index in **valuesArr**. If a key appears multiple times, only the *first* occurrence is considered.

For example, if keysArr = ['a', 'b', 'a'], valuesArr = [1, 2, 3], the resulting object should be {'a': 1, 'b': 2} (the second 'a' is ignored).

### Examples  

**Example 1:**  
Input: `keysArr = ['a', 'b', 'c']`, `valuesArr = [1, 2, 3]`  
Output: `{'a': 1, 'b': 2, 'c': 3}`  
*Explanation: Each key gets its value from the same index.*

**Example 2:**  
Input: `keysArr = ['x', 'y', 'x']`, `valuesArr = [4, 5, 6]`  
Output: `{'x': 4, 'y': 5}`  
*Explanation: The first 'x' gets value 4. The second 'x' is ignored.*

**Example 3:**  
Input: `keysArr = [1, 2, 2, 3]`, `valuesArr = ['a', 'b', 'c', 'd']`  
Output: `{1: 'a', 2: 'b', 3: 'd'}`  
*Explanation: 2 appears twice; first '2' is mapped to 'b', the second occurrence is ignored.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Iterate through **keysArr** and **valuesArr** together, adding each key-value pair to the result object. If a key already exists in the object, skip it.

- **Why does this work?**  
  The requirements are:
    * Map each iᵗʰ key in **keysArr** to the iᵗʰ value in **valuesArr**.
    * If a key appears multiple times, only its *first* occurrence should be recorded.

- **Key trade-off:**  
  Dictionaries (objects) have O(1) lookup, so checking if a key is already set and assigning if not is efficient.

- **Final approach:**  
  - Initialize an empty result dictionary.
  - For each index i, convert keysArr[i] to string (so keys are always string type).
  - If the key is not already in the dictionary, set result[key] = valuesArr[i].

### Corner cases to consider  
- Arrays are empty: Both inputs may be [].
- Number of keys does not match number of values (should assume equal lengths per prompt; otherwise, decide whether to ignore extras or raise error).
- Arrays contain duplicate keys (ensure only first occurrence used).
- Non-string/non-integer keys should be converted to strings for dictionary keys.
- Single-element arrays.
- All elements in keysArr are the same.

### Solution

```python
def create_object_from_two_arrays(keys_arr, values_arr):
    # Initialize an empty dictionary for the result
    result = {}
    # Iterate over both arrays using index
    for i in range(len(keys_arr)):
        # Convert key to string to ensure consistency
        key = str(keys_arr[i])
        # Add the key-value pair if key not already present
        if key not in result:
            result[key] = values_arr[i]
        # If key is already present, skip (first occurrence only)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n), where n is the length of the keysArr. Each lookup and insertion in a dictionary is O(1), so we process each element once.

- **Space Complexity:**  
  O(n) in the worst case, if all keys are unique. Extra space is used for the result dictionary.

### Potential follow-up questions (as if you’re the interviewer)  

- If the lengths of keysArr and valuesArr are not the same, how should your function behave?  
  *Hint: Should you raise an exception, or just map up to the shorter length?*

- What if valuesArr has more elements than keysArr?  
  *Hint: Consider whether you ignore extras or notify the caller.*

- How would you change your implementation if you needed to keep *all* values for duplicate keys (i.e., have lists as values)?  
  *Hint: You might need to aggregate into lists rather than skipping duplicates.*

### Summary
This problem is an example of the **"mapping / association"** pattern, commonly seen in tasks that require quick lookup or grouping using a hash table. The solution makes use of a basic dictionary data structure with a guard to ensure only the first occurrence of a key is used. This pattern is common in frequency analysis, de-duplication, and building indexes from data streams.