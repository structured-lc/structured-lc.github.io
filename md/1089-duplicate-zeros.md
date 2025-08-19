### Leetcode 1089 (Easy): Duplicate Zeros [Practice](https://leetcode.com/problems/duplicate-zeros)

### Description  
Given a fixed-length integer array, **duplicate each occurrence of zero** in-place, shifting the remaining elements to the right.  
- Whenever you find a `0`, insert another `0` immediately after it, shifting the rest of the array right.
- Elements shifted off the end are lost; the array must not grow.
- Modify the array in place and do **not** return anything.

### Examples  

**Example 1:**  
Input: `[1,0,2,3,0,4,5,0]`  
Output: `[1,0,0,2,3,0,0,4]`  
*Explanation: Zeroes at indices 1, 4, and 7 are duplicated. Elements that would move beyond the array length are ignored.*

**Example 2:**  
Input: `[1,2,3]`  
Output: `[1,2,3]`  
*Explanation: No zeros to duplicate, so the array is unchanged.*

**Example 3:**  
Input: `[0,0,0,0,0,0,0]`  
Output: `[0,0,0,0,0,0,0]`  
*Explanation: Only zeros, but after each duplication, new elements are discarded because the array is at max length.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force idea:**  
  For every `0` in the array, shift all elements to the right and insert a new `0`.  
  But this has poor performance (O(n²)), as each shift takes linear time and multiple shifts may overlap.

- **Optimized idea:**  
  The key insight:  
  - We need to **duplicate only zeros that fit within the original array length**.
  - We can process the array **from the end backward**, using two pointers:
    *One* pointer where elements would go if there was infinite space (virtual position), and *one* at the real array end.  
  - First, "simulate" how many zeros can be duplicated without exceeding the length.
  - Then, fill the array backward, duplicating zeros as needed, and ignoring elements that overflow.

  **Why this approach?**  
  - Backward filling prevents overwriting values before we've duplicated them.
  - Time complexity is linear, space is constant.

### Corner cases to consider  
- Array is empty (`[]`)
- No zeros in the array
- All zeros (array of only `[0,...,0]`)
- Zeros right at the end (last zero may not be duplicate-able)
- Very large arrays (test efficiency)
- Zeros in the middle with not enough space at the end for fully duplicating all

### Solution

```python
def duplicateZeros(arr):
    n = len(arr)
    zeros = 0

    # First pass: count "duplicate-able" zeros (not all zeros can be duplicated if they fall off the edge)
    for i in range(n):
        # If this zero would be the last that fits exactly
        if arr[i] == 0:
            # Special case: when the last zero cannot be fully duplicated
            if i + zeros == n - 1:
                arr[-1] = 0
                n -= 1   # Reduce the array's effective length by 1
                break
            zeros += 1

    # Second pass: fill the array from the end backward
    last = n - 1
    for i in range(last, -1, -1):
        # Place the current element in its new position (shifted by zeros)
        if i + zeros < len(arr):
            arr[i + zeros] = arr[i]

        # If it's a zero, duplicate it by placing another zero before
        if arr[i] == 0:
            zeros -= 1
            if i + zeros < len(arr):
                arr[i + zeros] = 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each element is visited at most twice (once for counting zeros, once for moving elements).
- **Space Complexity:** O(1) — All operations are in-place; no extra arrays or significant memory used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return a new array, instead of modifying in-place?  
  *Hint: Use a result array and a write pointer; standard array copy pattern.*

- Can you do this if zeros can be "triplicated" or "k-duplicated"?  
  *Hint: Adjust the counting logic and the shifting based on `k` instead of 2 (duplicate just means insert k-1 zeros).*

- How would you adapt this for a linked list instead of an array?  
  *Hint: Consider how insertions work in linked lists and if backward or forward traversal helps.*

### Summary
This problem uses the **two pointers** (backward fill) approach, often applied when in-place array operations must avoid overwriting data. Back-filling after a simulation pass is a classic technique for problems where insertions "expand" data but must stick to fixed bounds. This is commonly used in array shifting, compress/decompress, or implementing custom in-place transformations.

### Tags
Array(#array), Two Pointers(#two-pointers)

### Similar Problems
