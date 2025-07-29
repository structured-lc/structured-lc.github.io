### Leetcode 2724 (Easy): Sort By [Practice](https://leetcode.com/problems/sort-by)

### Description  
Given an array `arr` and a function `fn`, return a sorted array where each element's position is determined by the numeric result of applying `fn` to it. The sorting must be in ascending order based on these computed values. You can assume that `fn` returns unique numbers for every element, so no two elements will have the same sorting key. (Think of this as a custom sort with a key function, similar to Python's `key` or JavaScript's comparator.)

### Examples  

**Example 1:**  
Input: `arr = [3,1,2], fn = lambda x: -x`  
Output: `[3,2,1]`  
*Explanation: Applying `fn`, we get `[-3, -1, -2]` for `[3, 1, 2]`. Sorting these gives `-3` (3), `-2` (2), `-1` (1), so output is `[3,2,1]`.*

**Example 2:**  
Input: `arr = [0,4,2,5,1], fn = lambda x: x`  
Output: `[0,1,2,4,5]`  
*Explanation: `fn` returns the number itself, so standard ascending sort (`[0,1,2,4,5]`).*

**Example 3:**  
Input: `arr = ["apple","banana","kiwi"], fn = lambda x: len(x)`  
Output: `["kiwi","apple","banana"]`  
*Explanation: String lengths: `[5,6,4]` → `["apple", "banana", "kiwi"]`, then sort by lengths: 4 ("kiwi"), 5 ("apple"), 6 ("banana") → `["kiwi","apple","banana"]`.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force way would be to create a list of tuples: for each element in `arr`, compute `fn(element)` and store `(fn(element), element)`. Then, sort the list of tuples by the first value (the key). Finally, extract the sorted elements from this tuple list.

However, since we can use a custom comparator or key when sorting, most languages let us directly sort the array with a custom key. In Python, this can be done with `arr.sort(key=fn)`, which is clean and efficient.  
We choose this optimized approach because it eliminates the need for extra storage for tuples and leverages efficient sorting algorithms built into the language.

Trade-offs:  
- Using a key function is more idiomatic and concise.  
- If `fn` is slow, it could be computed multiple times for each compare step, unless we cache results (many libraries do).
- For very large data where you want to avoid recomputation, you could precompute all `fn` values and sort with them (decorate-sort-undecorate/Schwartzian transform).

### Corner cases to consider  
- Empty array (`arr = []`)
- One element (`arr = [5]`)
- All elements have unique `fn(x)` (guaranteed by problem)
- Non-integer/heterogeneous types if allowed (e.g., strings, floats)
- `fn` always returns integers (per prompt)
- Non-sorting keys (complex/lambdas with internal state—should not occur as per problem)
- Array already sorted by `fn`

### Solution

```python
# Function to sort an array by the result of fn(x) in ascending order,
# without using shortcuts like the built-in sorted().
# Commented step-by-step for interviews.

def sort_by(arr, fn):
    # Sort the array in place with the key as fn(x).
    # In python, sort is stable and O(n log n) on average.
    arr.sort(key=fn)
    return arr
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is length of arr.  
  Justification: The sorting operation dominates, using Timsort which is O(n log n) in the average/worst case.

- **Space Complexity:** O(1) extra (if sorting in-place), or O(n) if a new array is returned.  
  Justification: Python’s sort is in-place, so no extra storage is needed except for stack frames/memory used by the sort algorithm itself.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if `fn` was expensive to compute or not idempotent?  
  *Hint: Store/calculate all `fn(x)` values once, then sort using those as the key.*

- What if the array has objects and you want to sort by multiple keys?  
  *Hint: Return a tuple from fn, e.g., `fn = lambda x: (x.age, x.name)`—this way, Python will sort by the first value, then the second if needed.*

- How to ensure stability if two elements have the same keys?  
  *Hint: Python's sort is stable—order is preserved for equal keys; in JS/other langs check stability of .sort().*

### Summary
This problem demonstrates the classic pattern of "custom sorting by key", which is common in many real-world scenarios (sorting objects by properties, custom metrics, etc).  
The use of a `key` function or comparator is standard in Python, JavaScript, and Java.  
The approach is efficient, readable, and widely applicable—great for interviews when custom orderings are required.  
Common pattern: decorate-sort-undecorate (aka Schwartzian transform), or just built-in sort with key/comparator.