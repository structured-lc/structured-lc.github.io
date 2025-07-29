### Leetcode 2649 (Medium): Nested Array Generator [Practice](https://leetcode.com/problems/nested-array-generator)

### Description  
You are given a multi-dimensional (nested) array where each element can be either an integer or another array of the same structure (arbitrarily deep).  
Implement a generator function that yields every integer from the array, traversing the full structure *left to right* (like "in order" DFS), regardless of how deeply nested each number is.  
This should present the integers as if the entire structure was fully flattened, in their original sequence.

### Examples  

**Example 1:**  
Input: `arr = [[], [1, 3], []]`  
Output: `6, 1, 3`  
*Explanation: The traversal enters the deepest sub-array to yield 6, then moves to [1, 3] yielding 1 and 3. The last element [] is empty—nothing is yielded.*

**Example 2:**  
Input: `arr = []`  
Output: *(nothing)*  
*Explanation: The array is empty, so the generator yields nothing.*

**Example 3:**  
Input: `arr = [1, [2, [3, [4]]], 5]`  
Output: `1, 2, 3, 4, 5`  
*Explanation: Traversal yields 1, then dives into nested arrays yielding 2, then 3, then 4, and finally 5 at the top level.*

### Thought Process (as if you’re the interviewee)  
- The brute-force idea is to fully flatten the array using a stack or recursive function, collect all numbers, and then yield them.
- However, since we need a generator (memory efficient, yielding numbers one-by-one), a recursive generator function is a natural choice.
- For each element:  
  - If it’s an integer, yield it.  
  - If it’s a list, recursively delegate to the generator for that list (using `yield from` / `yield*`).
- This approach handles any nesting depth without needing extra storage for the full flattened array.
- Trade-offs:  
  - Memory is O(d) where d is the maximum nesting depth (from recursion stack), not O(N) where N is total numbers.
  - Time is O(N) since each element is visited once.

### Corner cases to consider  
- The array is completely empty: `[]`
- Some subarrays are empty: `[[], [[[]]], []]`
- Single element that is an integer: ``
- All integers directly at the top level: `[1, 2, 3, 4]`
- Deep nesting: `[[[]]]`
- Mixed depth: `[1, [2, [3, [4, []]]], [], 5]`

### Solution

```python
from typing import List, Generator, Union

# Our nested type can be int or a list of nested type
NestedIntList = List[Union[int, 'NestedIntList']]

def nested_generator(arr: NestedIntList) -> Generator[int, None, None]:
    """
    Generator to yield all integers from an arbitrarily-nested array.
    Traverses elements in left-to-right order.
    """
    for item in arr:
        # If it's an int, yield
        if isinstance(item, int):
            yield item
        # If it's a list, recurse
        elif isinstance(item, list):
            # Delegate generator to process nested list
            yield from nested_generator(item)
        # Ignore other types (optional strictness)

# Example usage:
# for x in nested_generator([[[6]], [1, 3], []]):
#     print(x, end=" ")
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N)  
  *N = total count of integers plus all inner arrays.*
  - Each element (integer or list) is visited once.
- **Space Complexity:** O(d)  
  *d = max nesting depth.*
  - At most, recursion stack is as deep as the deepest nesting; no extra storage is retained.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want a class-based iterator (not a generator function)?
  *Hint: Need to manage explicit stack for traversal state.*

- Can you do it iteratively (without recursion)?
  *Hint: Use an explicit stack to track position in each list.*

- If the structure had other types (strings, None), how would you handle them?
  *Hint: Add explicit type checks or error handling before recursion or yielding.*

### Summary
This problem uses the recursive generator pattern—a powerful tool for traversing arbitrarily nested data structures with low memory use.  
Such recursive-yield logic is common in problems involving tree traversals, nested list flattening, and advanced iteration over composite data.  
It’s extensible to iterators over tree-like objects, XML/JSON parsing, and more.