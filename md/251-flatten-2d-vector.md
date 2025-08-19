### Leetcode 251 (Medium): Flatten 2D Vector [Practice](https://leetcode.com/problems/flatten-2d-vector)

### Description  
Given a 2D vector (a list of lists), design an *iterator* to flatten and traverse its elements in row-major order. This iterator should expose two operations:  
- **next()** — returns the next element in the flattened order.
- **hasNext()** — returns whether there are more elements to iterate.  
The 2D vector may include empty sublists, and the iterator must skip over them and not error out. The iterator should maintain its own state and internal pointers, so you can fetch one element at a time, lazily, in constant time per operation.

### Examples  

**Example 1:**  
Input: `[[1,2],[3],[4,5,6]]`, calls: `next()`, `next()`, `next()`, `next()`, `hasNext()`  
Output: `1`, `2`, `3`, `4`, `True`  
*Explanation:  
- `next()` → 1  
- `next()` → 2  
- `next()` → 3  
- `next()` → 4  
- `hasNext()` → True (since 5 is yet to come)*

**Example 2:**  
Input: `[[], [1], [], [2, 3], []]`, calls: `next()`, `hasNext()`, `next()`, `hasNext()`, `hasNext()`
Output: `1`, `True`, `2`, `True`, `True`  
*Explanation:  
- Skips empty sublists.  
- `next()` → 1  
- `hasNext()` → True (since 2 is left)  
- `next()` → 2  
- `hasNext()` → True (since 3 is left)  
- `hasNext()` → True (since 3 is still left)*

**Example 3:**  
Input: `[[], [], []]`, calls: `hasNext()`  
Output: `False`  
*Explanation:  
- All sublists are empty, so `hasNext()` → False*

### Thought Process (as if you’re the interviewee)  
To approach this problem, start by considering brute-force:  
- Flatten the entire 2D list in the constructor into a 1D array. Maintain a pointer, and in each `next()` call, return the next value; `hasNext()` compares the pointer against length.  
- This is *simple and fast for per-operation* access, but has **O(N)** upfront time and memory, where N is the total number of elements. Also, could be wasteful if most elements are never requested.

To optimize:
- **Lazy iteration:**  
  - Maintain two pointers: `row` and `col`.  
  - In `hasNext()`, advance these pointers to the next valid position, skipping empty sublists or sublists whose elements are exhausted.  
  - Fetch the value at `vec[row][col]` on `next()` and increment `col`; update pointers between calls as needed.  
  - No extra memory required beyond pointers—traversal is on-demand.

Why pick the two-pointer (row/col) approach?  
- **Pros:**  
  - Memory efficient, especially with large or sparse data  
  - Each operation is O(1) amortized time  
  - Aligns with expectation of iterators in Python/Java  
- **Cons:**  
  - Slightly more code complexity (pointer management, skip empties)

### Corner cases to consider  
- Input has empty 2D vector: `[]`  
- Input has only empty lists: `[[], [], []]`  
- Input starts with empty, followed by non-empty: `[[], [1,2]]`  
- Input ends with empty, e.g. `[[1], []]`  
- All rows are singleton arrays: `[[3],[4],[5]]`  
- Only one element: `[]`  
- Call `hasNext()` repeatedly, even after exhausted

### Solution

```python
class Vector2D:
    def __init__(self, vec):
        # Store the 2D vector reference, initialize row and col pointers
        self.vec = vec
        self.row = 0
        self.col = 0
        self._advance()  # Skip to the first non-empty

    def _advance(self):
        # Move (row, col) pointers to the next valid position,
        # skipping empty rows or exhausted sublists.
        while self.row < len(self.vec) and self.col >= len(self.vec[self.row]):
            self.row += 1
            self.col = 0

    def next(self):
        # Assume hasNext() is true before call, as guaranteed
        result = self.vec[self.row][self.col]
        self.col += 1
        self._advance()  # Ensure pointers are always at next available
        return result

    def hasNext(self):
        # Use helper to advance to the next valid element if needed
        self._advance()
        return self.row < len(self.vec)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `next()` and `hasNext()` — O(1) amortized per call (though `_advance()` may skip multiple empty rows, total time over all operations is O(N); per-operation remains constant overall).
- **Space Complexity:**  
  - O(1) extra (beyond input), since only integer pointers are needed. If you use the brute-force flattening approach, the space becomes O(N).

### Potential follow-up questions (as if you’re the interviewer)  

- What if your iterator needs to support `remove()` or deleting an element?  
  *Hint: Would you need to adjust your row/col pointers or structure?*

- Suppose the 2D vector is very large and stored externally (e.g., from a disk or generator)?  
  *Hint: Which approach is more memory efficient? How would you handle IO or streaming input?*

- How would you design an iterator for a 3D vector?  
  *Hint: Can you nest or generalize your pointer logic to N dimensions?*

### Summary
This problem demonstrates the **iterator pattern** for flattening nested data structures with per-operation efficiency and minimal space overhead, by managing explicit pointers into the original data. The key trick is to always keep the iterator pointing at the next available element, skipping over empty or completed sublists. This logic applies to similar interview problems on custom flattening or traversing N-dimensional or sparse data, common in data streaming, database, and filesystems work.

### Tags
Array(#array), Two Pointers(#two-pointers), Design(#design), Iterator(#iterator)

### Similar Problems
- Binary Search Tree Iterator(binary-search-tree-iterator) (Medium)
- Zigzag Iterator(zigzag-iterator) (Medium)
- Peeking Iterator(peeking-iterator) (Medium)
- Flatten Nested List Iterator(flatten-nested-list-iterator) (Medium)