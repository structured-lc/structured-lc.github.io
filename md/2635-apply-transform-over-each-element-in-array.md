### Leetcode 2635 (Easy): Apply Transform Over Each Element in Array [Practice](https://leetcode.com/problems/apply-transform-over-each-element-in-array)

### Description  
Given an integer array and a *mapping function* that takes two arguments (value and index), return a new array where each element is replaced by the result of applying the function to the corresponding element and its index. The transformation should be done for every element, and the order must be preserved.

### Examples  

**Example 1:**  
Input: `arr = [1, 2, 3]`, `fn = lambda x, i: x + i`  
Output: `[1, 3, 5]`  
*Explanation: We add each value to its index: 1+0=1, 2+1=3, 3+2=5.*

**Example 2:**  
Input: `arr = [4, 5, 6]`, `fn = lambda x, i: x * 2`  
Output: `[8, 10, 12]`  
*Explanation: We multiply each value by 2: 4×2=8, 5×2=10, 6×2=12.*

**Example 3:**  
Input: `arr = [1, 2, 3, 4]`, `fn = lambda x, i: x * i`  
Output: `[0, 2, 6, 12]`  
*Explanation: Values are multiplied by their index: 1×0=0, 2×1=2, 3×2=6, 4×3=12.*

### Thought Process (as if you’re the interviewee)  
- The problem requires applying a given function to every element of an array, passing both the element and its index.  
- Brute-force approach:  
  - Initialize a result array.
  - For each index in the input array, compute fn(arr[i], i) and append it to the result.
- Optimization isn’t necessary here since we must process every element exactly once, and the problem constraints are straightforward.
- Using list comprehension makes the code neat and efficient, but in a real interview I’d write a simple loop to make the logic explicit.

### Corner cases to consider  
- Empty array: `arr = []`  
- Single element: `arr` of length 1  
- Array with negative values  
- Mapping function that produces identical output for all elements  
- Large arrays in context of time/space  
- Mapping function with side effects, though not usually expected

### Solution

```python
def map(arr, fn):
    # Initialize an empty result array
    res = []
    # Iterate over each index and value in arr
    for i in range(len(arr)):
        # Apply the mapping function to each value and its index
        transformed = fn(arr[i], i)
        # Append the result to the output array
        res.append(transformed)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of elements in `arr`. We process each element once.
- **Space Complexity:** O(n), for storing the result array.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if the mapping function was asynchronous or involved I/O?  
  *Hint: Think about promises or callbacks and async processing.*

- Can you implement this without using extra space?  
  *Hint: Try modifying the original array in-place, if allowed.*

- How would you handle very large arrays or infinite streams?  
  *Hint: Consider generators or lazy evaluation to process elements one at a time.*

### Summary
This problem uses the *map* pattern—a core approach in functional programming and frequently used in many languages. The solution is direct: loop over the array, transform each item, and collect results. This coding pattern is broadly applicable in data processing, transformation tasks, and is the building block for many advanced techniques such as stream/lazy evaluation.