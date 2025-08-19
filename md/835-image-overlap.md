### Leetcode 835 (Medium): Image Overlap [Practice](https://leetcode.com/problems/image-overlap)

### Description  
Given two n × n binary matrices (images) containing only 0s and 1s, you are to determine the **maximum number of 1s that can overlap** when you translate (slide) one image over the other in any direction (up, down, left, right). "Overlap" means for a given translation, count the positions where both images have a 1 at the same coordinates.  
No rotation is allowed and any pixels that go out of bounds during shifting are erased and ignored.  

### Examples  

**Example 1:**  
Input:  
A = `[[1,1,0], [0,1,0], [0,1,0]]`,  
B = `[[0,0,0], [0,1,1], [0,0,1]]`  
Output: `3`  
*Explanation: Move A down by 1 and right by 1. The overlapping 1s are at three positions, so the answer is 3.*

**Example 2:**  
Input:  
A = `[[1,0], [0,0]]`,  
B = `[[0,1], [1,0]]`  
Output: `0`  
*Explanation: No matter how we shift, there is never an overlap on a "1".*

**Example 3:**  
Input:  
A = `[[1]]`,  
B = `[[1]]`  
Output: `1`  
*Explanation: With only one element, it's either an overlap (if both are 1) or not (if one is 0).*

### Thought Process (as if you’re the interviewee)  
Start with the brute-force idea:
- For each possible translation (shift delta_row, delta_col), shift A over B and count the number of overlapping 1s.
- For an n × n matrix, possible shifts in each direction are from \(-(n-1)\) up to \(n-1\): in total, (2n-1) × (2n-1) possible translations.
- For every translation, O(n²) to count overlaps ⇒ total O(n⁴).

Can we optimize?
- Instead of shifting the whole matrix, focus only on positions of 1s in A and B.
- For every pair of 1s, `(ai, aj)` in A and `(bi, bj)` in B, compute the shift vector \( (ai-bi, aj-bj) \) required to align them.
- Count how many times each shift vector aligns any 1 from A with any 1 from B.
- Use a hash map (dictionary) to count overlaps for each shift.
- The shift with the highest count gives the answer.

Why choose this?
- Both approaches give O(n⁴) in worst case, but focusing on 1s with the hash map can be much faster if images are sparse, and it’s intuitive to implement and debug.
- It’s a classic hash-mapping and counting vectors problem, commonly used for translation/invariant overlap scenarios.

### Corner cases to consider  
- Both matrices are all zeros (answer = 0).
- Both matrices are all ones (answer = n × n).
- Only one position with a 1 in the whole matrices.
- Matrices of size 1 × 1.
- Overlap only possible at non-zero shifts.
- No overlap possible at all.

### Solution

```python
from typing import List
from collections import Counter

def largestOverlap(A: List[List[int]], B: List[List[int]]) -> int:
    n = len(A)
    # Collect all coordinates where there is a 1 in A and B
    A_ones = []
    B_ones = []
    for i in range(n):
        for j in range(n):
            if A[i][j] == 1:
                A_ones.append((i, j))
            if B[i][j] == 1:
                B_ones.append((i, j))

    # Count all shifts (delta_i, delta_j) that align 1s in A with 1s in B
    shift_count = Counter()
    for ai, aj in A_ones:
        for bi, bj in B_ones:
            delta = (ai - bi, aj - bj)
            shift_count[delta] += 1

    # Return the maximum overlap (which is the highest count in shift_count)
    return max(shift_count.values()) if shift_count else 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n⁴) in the worst case, since there can be up to n² 1s in A and n² in B, but is often much faster for sparse images.
- **Space Complexity:** O(n⁴) in the worst case for the hash map storing all possible shifts, but actual usage is often much smaller, depending on number of 1s.

### Potential follow-up questions (as if you’re the interviewer)  

- What if rotation is allowed as well as translation?  
  *Hint: Think about generating all possible rotations (90°, 180°, 270°) and repeating the algorithm for each rotation.*

- How would your solution adapt to non-square images or differently sized matrices?  
  *Hint: Adjust the range of shifts and how you compare boundaries.*

- Could you process streaming data where images arrive one row at a time?  
  *Hint: Consider incremental computation or maintaining running counts for overlap.*

### Summary
This problem is a **classic application of vector counting and hash-mapping for translation-invariant overlap** – directly comparing shifted indices. The coding pattern involves focusing on 1s and counting their relative position differences. This trick is powerful for similar pattern/matrix match problems, especially in image registration, convolution, or grid-based sliding-window problems.

### Tags
Array(#array), Matrix(#matrix)

### Similar Problems
