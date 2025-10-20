### Leetcode 85 (Hard): Maximal Rectangle [Practice](https://leetcode.com/problems/maximal-rectangle)

### Description  
Given a binary matrix filled with '0's and '1's, find the largest rectangle containing only '1's and return its area.  
Think of each row in the matrix as the base of a histogram made of columns. At every row, for each column, track the consecutive number of 1’s you’ve seen. For each "histogram", compute the largest rectangle of 1’s (think "Largest Rectangle in Histogram" problem).

### Examples  

**Example 1:**  
Input:  
```
matrix = [
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
```  
Output: `6`  
*Explanation: The maximum rectangle of 1’s has area 6. It covers rows 2-3, columns 2-4:*

```
[
  [      ],
  [  1 1 1 ],
  [  1 1 1 ],
  [      ]
]
```

**Example 2:**  
Input:  
```
matrix = [
  ["0"]
]
```  
Output: `0`  
*Explanation: There are no 1’s, so the area is 0.*

**Example 3:**  
Input:  
```
matrix = [
  ["1"]
]
```  
Output: `1`  
*Explanation: Only one element and it’s '1', so area is 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:** Try every possible submatrix. For every rectangle between (i₁,j₁) and (i₂,j₂), check if all entries are '1'. This is very slow, O(n⁴) or worse, not suitable for large matrices.
- **Optimized approach:** Notice that for each row, we can build a histogram (heights) where heights[j] denotes consecutive 1’s in column j up to the current row. For each row’s histogram, solve the Largest Rectangle in Histogram problem (Leetcode 84).
- **Why it works:** Every rectangle of 1’s can be represented by a base row and a height vector ending there.
- **Workflow:** For every row:
  - Update the `heights` array (increase height if current cell is '1', otherwise reset to 0).
  - Compute the largest rectangle for the current `heights` using a stack.
- **Trade-offs:** This reduces the problem to O(m × n) time, where m is row count and n is column count.

### Corner cases to consider  
- Matrix is empty (`matrix = []`)
- Matrix is all '0's
- Matrix is all '1's
- Matrix is only 1 row or 1 column
- Mixed 1’s and 0’s: rectangles split by one or two zeros

### Solution

```python
def maximalRectangle(matrix):
    if not matrix or not matrix[0]:
        return 0

    num_cols = len(matrix[0])
    heights = [0] * num_cols
    max_area = 0

    # Helper to calculate largest area in histogram for a single row
    def largestRectangleArea(heights):
        stack = []
        max_area = 0
        heights.append(0)  # Sentinel to ensure all bars are popped
        for i, h in enumerate(heights):
            while stack and h < heights[stack[-1]]:
                height = heights[stack.pop()]
                width = i if not stack else (i - stack[-1] - 1)
                max_area = max(max_area, height * width)
            stack.append(i)
        heights.pop()  # Remove the sentinel
        return max_area

    for row in matrix:
        for j in range(num_cols):
            # If cell is '1', increment the column height
            if row[j] == '1':
                heights[j] += 1
            else:
                heights[j] = 0  # Reset height if cell is '0'
        # For each updated "histogram", get the area
        max_area = max(max_area, largestRectangleArea(heights))

    return max_area
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(m × n), where m = number of rows, n = number of columns.
  - For each row, we update the heights array in O(n) and solve Largest Rectangle in Histogram in O(n) as well.
- **Space Complexity:**  
  O(n) for the heights array and stack used; n = number of columns.
  - No extra space based on input size except for these arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the matrix is very large (e.g., doesn’t fit in memory)?
  *Hint: Can you process the matrix in chunks, or stream one row at a time?*

- How would you modify your approach for maximal square (all 1’s, but square shape required)?
  *Hint: Think about keeping track of the side length for each cell.*

- Can you retrieve the actual rectangle’s coordinates, not just the area?
  *Hint: Store left/right boundaries as you compute the largest rectangle at each step.*

### Summary
This problem uses a classic *stack-based* approach for finding the largest rectangle in a histogram, applied row by row. By transforming the 2D maximal rectangle search into many 1D histogram problems, it leverages a well-known and efficient coding pattern with clear reusability (for example: Leetcode 84 - Largest Rectangle in Histogram). This dynamic programming + stack pattern is widely applicable in matrix rectangle and area-finding scenarios.


### Flashcard
For each row, treat it as a histogram of consecutive 1’s and apply the Largest Rectangle in Histogram algorithm to find the maximal rectangle.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Stack(#stack), Matrix(#matrix), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Largest Rectangle in Histogram(largest-rectangle-in-histogram) (Hard)
- Maximal Square(maximal-square) (Medium)
- Find Sorted Submatrices With Maximum Element at Most K(find-sorted-submatrices-with-maximum-element-at-most-k) (Hard)