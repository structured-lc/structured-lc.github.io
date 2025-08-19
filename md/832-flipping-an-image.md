### Leetcode 832 (Easy): Flipping an Image [Practice](https://leetcode.com/problems/flipping-an-image)

### Description  
Given a binary matrix representing an image (it contains only 0s and 1s), flip the image **horizontally** (reverse each row), then **invert** the image (change 1 to 0 and 0 to 1 in every cell). Return the resulting image as a new matrix.  
- Think of this as mirroring each row and then inverting black-and-white pixels.

### Examples  

**Example 1:**  
Input: `[[1,1,0],[1,0,1],[0,0,0]]`  
Output: `[[1,0,0],[0,1,0],[1,1,1]]`  
*Explanation:  
- Flip each row:  
  [0,1,1],  
  [1,0,1],  
  [0,0,0]  
- Invert each row:  
  [1,0,0],  
  [0,1,0],  
  [1,1,1]*

**Example 2:**  
Input: `[[1,0],[0,1]]`  
Output: `[[1,0],[0,1]]`  
*Explanation:  
- Flip each row:  
  [0,1],  
  [1,0]  
- Invert:  
  [1,0],  
  [0,1]*

**Example 3:**  
Input: `[[1]]`  
Output: `[]`  
*Explanation:  
- Flip: [1]  
- Invert: *

### Thought Process (as if you’re the interviewee)  
First, I clarify the two operations:
- **Flip horizontally:** Reverse each row.
- **Invert:** Change every 0 → 1 and 1 → 0.

A brute-force way is:
- For each row, create a reversed copy, then invert every value.

However, this uses extra space. For an in-place solution:
- Use two pointers for each row: left at start, right at end.
- Swap and invert values at left and right. If they're the same, invert both. If they're different, just invert when swapping.
- If the row has an odd length, invert the middle element at the end.

This is efficient (O(1) extra space if allowed to mutate in place) and only O(n²) time for an n × n matrix.

### Corner cases to consider  
- Empty matrix (`[]`)
- Rows of different lengths (not expected per LeetCode, but good to mention)
- Single element
- All elements are the same (all 0s or all 1s)
- Even and odd row lengths

### Solution

```python
from typing import List

def flipAndInvertImage(image: List[List[int]]) -> List[List[int]]:
    n = len(image)
    for row in image:
        left, right = 0, len(row) - 1
        while left < right:
            # Swap, flip, and invert at the same time
            # If both bits are the same, just invert both
            if row[left] == row[right]:
                row[left] ^= 1
                row[right] ^= 1
            # If different, swap and invert via swap, which does it for us
            # Swapping and inverting at the same time
            left += 1
            right -= 1
        # If odd number of columns, invert the middle element
        if left == right:
            row[left] ^= 1
    return image
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m), where n is the number of rows and m is the number of columns. Each cell is visited once.
- **Space Complexity:** O(1) if editing in place, because only a few variables are used regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input is not a square matrix?
  *Hint: Does your solution handle any rectangular m × n?*

- Can you achieve the flip and invert in a single pass without extra space?
  *Hint: Combine swapping and inverting, use bitwise XOR.*

- How would you handle if the image was not binary, but grayscale?
  *Hint: Adjust the ‘invert’ operation for arbitrary pixel values.*

### Summary
This approach uses **two-pointer scanning** per row, efficiently reversing and inverting in-place.  
It exemplifies the pattern of array two-pointer manipulation, and simultaneously performing multiple operations to save space and avoid unnecessary passes.  
This two-pointer mirroring and modifying approach commonly arises in other interview problems involving array or string symmetry, reversal, or in-place transformation.

### Tags
Array(#array), Two Pointers(#two-pointers), Bit Manipulation(#bit-manipulation), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
