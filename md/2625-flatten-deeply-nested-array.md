### Leetcode 2625 (Medium): Flatten Deeply Nested Array [Practice](https://leetcode.com/problems/flatten-deeply-nested-array)

### Description  
Given a multi-dimensional array `arr` (which contains integers or nested arrays) and an integer `n`, return a flattened version of the array up to depth `n`.  
- "Flattening" means replacing a sub-array at depth less than `n` with its elements.
- The depth of the elements in the original array is considered 0.
- You cannot use Python built-ins like `itertools.chain` or similar.

### Examples  

**Example 1:**  
Input: `arr = [1, 2, [3, 4], 5], n = 1`  
Output: `[1, 2, 3, 4, 5]`  
*Explanation: Flatten all sub-arrays one level deep.*

**Example 2:**  
Input: `arr = [1, [2, [3, [4]], 5]], n = 2`  
Output: `[1, 2, 3, [4], 5]`  
*Explanation: First flatten one level → [1, 2, [3, [4]], 5].  
Then flatten again where possible: [1, 2, 3, [4], 5]. Only flatten up to depth 2.*

**Example 3:**  
Input: `arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], n = 0`  
Output: `[1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]`  
*Explanation: For depth 0, do not flatten anything.*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach is to recursively traverse the array, and for every sub-array, flatten it by one level at a time, up to depth `n`.  
- At each recursive call, if depth allowed is zero, we return as is.  
- If the element is not a list, we add it directly to the output.  
- If the element is a list and depth is positive, recursively flatten it at depth - 1.  
- This approach is chosen for its clarity and direct mapping to the problem; it's easy to control the depth, and recursion handles arbitrary levels of nesting.  
- It is important not to use Python list comprehensions or built-ins that do flattening, since the interview may want to see handling via custom logic.

### Corner cases to consider  
- Empty input array: `arr = [], n = x`
- Single element that's not a list: `[1]`
- All elements already flat (`n = 1` or higher doesn't change it)
- Large depths: `n` much larger than nesting depth
- All elements are nested arrays
- Deeply nested input: e.g., `[1, [2, [3, [4]]]]`
- Input contains elements that are not lists or ints: the problem may only specify lists and numbers, so type checking may be required

### Solution

```python
def flatten(arr, n):
    # Helper function to recursively flatten the array up to depth n
    def helper(current, depth):
        result = []
        for elem in current:
            if isinstance(elem, list) and depth > 0:
                # If element is a list and depth permits, flatten it further
                result.extend(helper(elem, depth - 1))
            else:
                # If not a list or depth is exhausted, keep as is
                result.append(elem)
        return result

    return helper(arr, n)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(M), where M is the total number of elements in the nested array (including elements collected at all levels). Each element is visited at most once at each depth up to n.
- **Space Complexity:** O(M), due to storing the flattened result and recursion stack space for the maximum nesting (up to n levels deep).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you want to flatten the array completely, regardless of depth?  
  *Hint: Call with a very large `n` or recursively flatten until no sub-lists are found.*

- Can you implement this iteratively instead of recursively?  
  *Hint: Use a stack or queue to manage the nesting and simulate depth-unrolling manually.*

- How would you handle elements with types other than lists or numbers?  
  *Hint: Add type checks and possibly raise exceptions or skip invalid types.*

### Summary
This problem is a classical use-case of *depth-controlled recursion* for processing nested data structures. The recursion pattern used here provides a robust and clear way to flatten nested lists with an easily tunable depth parameter. This pattern is common for tree/graph-like traversals and generic nested list processing, such as parsing nested JSON, XML, or directory structures.


### Flashcard
Flatten a deeply nested array up to a specified depth `n` using recursion. If an element is an array and `n > 0`, recursively flatten it with `n - 1`. Otherwise, add it as is to the result.

### Tags

### Similar Problems
- JSON Deep Equal(json-deep-equal) (Medium)
- Convert Object to JSON String(convert-object-to-json-string) (Medium)
- Nested Array Generator(nested-array-generator) (Medium)