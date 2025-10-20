### Leetcode 2619 (Easy): Array Prototype Last [Practice](https://leetcode.com/problems/array-prototype-last)

### Description  
You are asked to extend all arrays in JavaScript by adding a custom method called `last()`. This method, when called on an array, should return the last element if the array is non-empty. If the array is empty, it should return -1. For example, `[1,2,3].last()` should return `3`, and `[ ].last()` should return `-1`. This method must work for arrays resulting from `JSON.parse`, which means any array of values (numbers, strings, objects, null, etc.).

### Examples  

**Example 1:**  
Input: `[1, 2, 3].last()`  
Output: `3`  
*Explanation: The array is not empty, so it returns the last element (3).*

**Example 2:**  
Input: `[].last()`  
Output: `-1`  
*Explanation: The array is empty, so it returns -1.*

**Example 3:**  
Input: `[null, false, 0].last()`  
Output: `0`  
*Explanation: The array contains three elements, so it returns the last one, which is 0. It does not check for falsiness, only array length.*

### Thought Process (as if you’re the interviewee)  
This problem is about extending JS array behavior, which means adding a new method to `Array.prototype`. The core requirement is to return the last element (if present) or -1 for empty arrays.  
- The naive check is: if the array has length zero, return -1; otherwise, return arr[arr.length-1].  
- This approach is O(1) time and space.  
- No optimization is required, since all operations (length check, last element access) are O(1).  
- For safety, care should be taken to use a function expression (not an arrow function) so `this` refers to the array instance.

### Corner cases to consider  
- Empty arrays: `[ ].last()` should return -1  
- Arrays with one element: `[5].last()` should return 5  
- Arrays with falsy values at the end: `[0, null, false].last()` should return the actual last element (e.g., `false`)  
- Arrays of objects: `[{id: 1}].last()` should return `{id: 1}`  
- Very large arrays: Performance should be O(1)  
- Non-array objects: The method should not be available unless `this` is truly an array

### Solution

```python
# Since this is JavaScript behavior, here's the equivalent Python description.
# In an interview, you'd be expected to write this in JavaScript:
# Array.prototype.last = function() {
#     if (this.length === 0) return -1;
#     return this[this.length - 1];
# };

# In Python, for learning pattern:
def array_last(arr):
    # Check if the array is empty
    if len(arr) == 0:
        return -1

    # Otherwise, return the last element
    return arr[-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — We do a simple length check and a direct element access, both constant time.
- **Space Complexity:** O(1) — No extra space is used; operation is in-place and does not grow with input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the API should throw an exception for non-arrays?
  *Hint: Consider type-checking inside the method and error-handling patterns.*

- How would you add an equivalent method to all array-like objects, not just true arrays?
  *Hint: Think about `arguments`, typed arrays, and objects with numeric keys plus a length property.*

- Can you make it immutable, so no mutation or polluting global prototypes occurs?
  *Hint: Consider utility/static methods versus prototype extension, and possible risks in production code.*

### Summary
This problem showcases the **prototype extension pattern** in JavaScript, enabling you to add custom methods globally to all array instances. It is a common interview task to test understanding of language prototypes, inheritance, and best practices in safe augmentation. The O(1) solution is simple: check for length, return -1 if the array is empty, otherwise return the last element. This pattern (return special value for empty structures) is widely applicable in both languages and systems that require robust API design.


### Flashcard
Return the last element if the array is non-empty, else -1.

### Tags

### Similar Problems
- Snail Traversal(snail-traversal) (Medium)
- Array Upper Bound(array-upper-bound) (Easy)