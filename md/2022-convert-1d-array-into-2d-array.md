### Leetcode 2022 (Easy): Convert 1D Array Into 2D Array [Practice](https://leetcode.com/problems/convert-1d-array-into-2d-array)

### Description  
Given a one-dimensional array of integers `original` and two integers `m` and `n`, the task is to reshape `original` into a 2D array with `m` rows and `n` columns.  
You must fill the 2D array row by row using the values from `original` in order.   
If it is not possible (i.e., the length of `original` is not equal to `m × n`), return an empty 2D array.

### Examples  

**Example 1:**  
Input: `original = [1,2,3,4], m = 2, n = 2`  
Output: `[[1,2],[3,4]]`  
*Explanation: Split as: first 2 elements → first row: [1,2], next 2 → second row: [3,4].*

**Example 2:**  
Input: `original = [1,2,3], m = 1, n = 3`  
Output: `[[1,2,3]]`  
*Explanation: All 3 elements fit in a single row.*

**Example 3:**  
Input: `original = [1,2], m = 1, n = 1`  
Output: `[]`  
*Explanation: Array size is 2, but m × n = 1, so can't construct the 2D array. Return empty.*

### Thought Process (as if you’re the interviewee)  
First, check if it's possible to reshape:  
- The 2D array needs exactly `m × n` elements. If not, return `[]` right away.  
- Brute-force way: Iterate over the original array, take n elements at a time, and create new rows.
- Initialize an empty list for the 2D array, then for each row, put n elements in until exhausted.
- Implementation-wise, simply loop from 0 to len(original) in steps of n, slicing as you go.

This is efficient—each element is visited only once.  
There’s no need to over-optimize further since the reshape can be done in a single pass.

### Corner cases to consider  
- Empty `original` array.  
- Original has fewer or more elements than needed for `m × n`.
- n or m is zero.
- All elements are identical.
- `original` has exactly one element.
- m or n is negative (invalid input).
- Large arrays (performance/overflow).

### Solution

```python
def construct2DArray(original, m, n):
    # Check feasibility
    if len(original) != m * n:
        return []
    
    result = []
    for i in range(m):
        # For each row, slice n elements starting from i * n
        row = []
        for j in range(n):
            # Append the correct element to the row
            row.append(original[i * n + j])
        result.append(row)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n)  
  Each element is visited once and placed into the new 2D array.

- **Space Complexity:** O(m × n)  
  The result array uses O(m × n) additional space to hold the reshaped elements.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you must do this **in-place** in a language where inplace-matrix reshaping is possible?  
  *Hint: Think about how memory is laid out for contiguous storage in some languages; is it possible in Python?*

- How would your approach change if the array contained objects or strings, not just integers?  
  *Hint: Does element type affect your slicing logic or checks?*

- Can this be done with **generators** to handle very large inputs or streaming data?  
  *Hint: Yield rows one at a time instead of building the entire array in memory.*

### Summary

This problem uses a classic array transformation (reshaping) pattern: chunking a list into sublists of fixed length.  
It checks feasibility with a simple size comparison, then slices the input list into rows in a single loop.  
This reshape pattern is common, appearing in matrix operations and data preprocessing, and is extendable to many application domains.