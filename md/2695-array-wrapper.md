### Leetcode 2695 (Easy): Array Wrapper [Practice](https://leetcode.com/problems/array-wrapper)

### Description  
Implement a class called **ArrayWrapper** that wraps an array of integers.  
- When two **ArrayWrapper** objects are added (`+`), the result should be the sum of all the values from both arrays.
- When converting an **ArrayWrapper** object to a string (e.g., using `str(obj)`, `f"{obj}"`, or `print(obj)`), it should display the array as a string, formatted like a typical array: entries separated by commas and enclosed in brackets, e.g., `[1,2,3]`.  
This simulates overloading the addition and string conversion operators.

### Examples  

**Example 1:**  
Input: `nums = [[1,2],[3,4]], operation = "Add"`  
Output: `10`  
*Explanation: obj1 = ArrayWrapper([1,2]), obj2 = ArrayWrapper([3,4]); obj1 + obj2; 1 + 2 + 3 + 4 = 10.*

**Example 2:**  
Input: `nums = [[23,98,42,70]], operation = "String"`  
Output: `"[23,98,42,70]"`  
*Explanation: obj = ArrayWrapper([23,98,42,70]); str(obj) gives a string with all elements comma-separated inside brackets.*

**Example 3:**  
Input: `nums = [[],[]], operation = "Add"`  
Output: `0`  
*Explanation: obj1 = ArrayWrapper([]), obj2 = ArrayWrapper([]); obj1 + obj2 gives 0 (sum of empty arrays).*

### Thought Process (as if you’re the interviewee)  
First, I want to wrap an array so that I can customize how addition and string conversion work.  
- For the addition, I need to implement either the `__add__` or `__radd__` method so `obj1 + obj2` returns the sum of their values.
- For string conversion, I’ll use `__str__` to output in the correct format.
This means both features rely on knowing how to sum the wrapped list and how to format it as a string.  
Edge cases like empty arrays or adding multiple wrappers still work if I always sum every value in both lists, and format even an empty list as `"[]"`.

No complex algorithm is needed — just define the right dunder methods.

### Corner cases to consider  
- Empty arrays: `[] + []` should yield 0, and `str([])` should be `"[]"`.
- One element per array: ` + [5]` should yield 15.
- Large numbers or negative values: ensure sum works for any integers.
- Adding more than two wrappers (e.g., via chained addition).
- Calling str() or addition on wrappers where one wraps an empty list.

### Solution

```python
class ArrayWrapper:
    def __init__(self, nums):
        # Store the input list
        self.nums = nums

    def __add__(self, other):
        # Allow addition with another ArrayWrapper
        # Sum both arrays and return as integer
        return sum(self.nums) + sum(other.nums)

    def __str__(self):
        # Format as comma-separated list in brackets
        return '[' + ','.join(str(num) for num in self.nums) + ']'

    def __repr__(self):
        # Optional: for nice output in interpreter, match __str__
        return str(self)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n and m are lengths of the two arrays being added, because summing each array iterates through all elements.
- **Space Complexity:** O(1) extra (not counting storage for the input arrays themselves); no extra structures are created during sums or stringification (output string size is O(n)).

### Potential follow-up questions (as if you’re the interviewer)  

- What happens if one or both operands of `+` are not instances of ArrayWrapper?  
  *Hint: Should check types or support addition with plain lists?*

- How would you support subtraction, or comparison operators between wrappers?  
  *Hint: Implement __sub__, __eq__, etc.*

- Can you make ArrayWrapper support iteration (e.g., for num in obj)?  
  *Hint: Define __iter__ for custom iteration.*

### Summary
This problem demonstrates **operator overloading** and **encapsulation** in Python.  
Defining special ("dunder") methods allows custom classes to behave like built-in types for basic operations.  
The pattern is widely applicable for customizing how objects interact in arithmetic, output, and container contexts.


### Flashcard
Implement valueOf() to return sum of wrapped array elements for addition, implement toString() to return JSON.stringify format for string conversion; allows custom + and String() behavior.

### Tags

### Similar Problems
