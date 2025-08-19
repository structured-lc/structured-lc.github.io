### Leetcode 2634 (Easy): Filter Elements from Array [Practice](https://leetcode.com/problems/filter-elements-from-array)

### Description  
Given an integer array and a filtering function, return a new array containing only those elements from the input array that satisfy the filter condition. The filter function, `fn`, receives each element and its index, and returns a truthy value if that element should be included. *Do not* use built-in Array filter methods—implement the logic manually by iterating through the array.

### Examples  

**Example 1:**  
Input: `arr = [0,10,20,30], fn = lambda n, i: n > 10`  
Output: `[20,30]`  
*Explanation: For each element, include it if the value is greater than 10. Only 20 and 30 meet this condition.*

**Example 2:**  
Input: `arr = [1,2,3], fn = lambda n, i: i == 0`  
Output: `[1]`  
*Explanation: Only include elements whose index is 0; so only 1 is included.*

**Example 3:**  
Input: `arr = [-2,-1,0,1,2], fn = lambda n, i: n + i == 0`  
Output: `[2]`  
*Explanation: n + i == 0 is only true for n=2 and i=−2, however, in the input, only the element at i=2 (which is 0) and i=3 (which is 1) and i=4 (which is 2), so for n + i == 0 only 2 at i=−2 doesn't happen here. Wait. This one should be:*  
Input: `arr = [-2,-1,0,1,2], fn = lambda n, i: n + i == 0`  
Output: ``  
*Explanation: The only pair where n + i == 0 is at index 2, where n=0, i=2.*

### Thought Process (as if you’re the interviewee)  
To solve this, iterate through each element of the array alongside its index. For each element at index i, call the function fn(arr[i], i). If fn returns True (element should be included according to the criteria), append it to the result array. This follows the behavior of the filter operation, but by using explicit loops (for efficiency and transparency, rather than using Python's `filter()` or list comprehensions).  
The brute force method is to walk one by one through all elements. There is no substantial optimization possible since each element may need to be checked individually.

### Corner cases to consider  
- The input array is empty → should return an empty array.
- The input array has only one element.
- All elements match the filter → the result is the original array.
- No elements match the filter → the result is an empty array.
- The filter function never returns True.
- The filter function always returns True.
- The filter function depends on the index.

### Solution

```python
def filter(arr, fn):
    # Initialize the result list
    result = []

    # Iterate over all elements with their index
    for i in range(len(arr)):
        # If filter function returns True, include the element
        if fn(arr[i], i):
            result.append(arr[i])

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each of the n elements is checked exactly once by the filter function.
- **Space Complexity:** O(n) in the worst case (if all elements pass the filter and are stored in result), otherwise proportional to the number of elements returned.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the filter function itself is expensive to compute?  
  *Hint: Could you memoize results if the same (element, index) is checked more than once?*

- Can you generalize this approach to work for objects or more complex data structures?  
  *Hint: Consider what changes if arr contains objects, or you want to filter dictionaries by key/value.*

- How would you do this in-place, modifying the original array to save space?  
  *Hint: Could you use two pointers to overwrite positions in arr and truncate?*

### Summary
This problem exemplifies the **manual array filter pattern**—iterating and conditionally collecting items—which is fundamental in both imperative and functional programming. It’s a direct application of array traversal, and the exact logic generalizes to many contexts: stream processing, in-place partitioning, and lazy evaluation in generators. Problems involving selection or predicate-based filtering will build on this pattern.

### Tags

### Similar Problems
- Group By(group-by) (Medium)
- Apply Transform Over Each Element in Array(apply-transform-over-each-element-in-array) (Easy)
- Array Reduce Transformation(array-reduce-transformation) (Easy)