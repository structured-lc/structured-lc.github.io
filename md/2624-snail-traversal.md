### Leetcode 2624 (Medium): Snail Traversal [Practice](https://leetcode.com/problems/snail-traversal)

### Description  
Given a 1D array and integers rowsCount and colsCount, transform the array into a 2D matrix of dimensions (rowsCount × colsCount) filled in *snail traversal order*:  
- Fill the first column from top to bottom,  
- then fill the second column from bottom to top,  
- then third column from top to bottom, and so on, alternating direction for each column.  
If the input array length ≠ rowsCount × colsCount, return an empty array.  
Example in words: Start filling leftmost column top-down, then next column bottom-up, left-to-right in columns, zigzagging up and down.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4,5,6], rowsCount = 3, colsCount = 2`  
Output: `[[1,6],[2,5],[3,4]]`  
*Explanation:  
- First column, top-down: 1, 2, 3  
- Second column, bottom-up: 4, 5, 6 (written as 6, 5, 4 bottom-up, but relative to rows: row 2 = 4, row 1 = 5, row 0 = 6)  
- So matrix is:  
  row 0: 1(first), 6(second-col-top)  
  row 1: 2,      5  
  row 2: 3,      4*

**Example 2:**  
Input: `nums = [3,2,1], rowsCount = 1, colsCount = 3`  
Output: `[[3,2,1]]`  
*Explanation:  
- Single row. All columns go into one row.*

**Example 3:**  
Input: `nums = [1,2,3,4], rowsCount = 2, colsCount = 3`  
Output: `[]`  
*Explanation:  
- nums has 4 elements.  
- rowsCount × colsCount = 6.  
- Not enough elements. Return empty array.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  The simplest approach is to create an empty 2D list, then iterate through the 1D array. For each column, decide whether to fill rows top-to-bottom or bottom-to-top, and place each number accordingly.

- **Validation:**  
  Check if length of input array equals rowsCount × colsCount. If not, immediately return [].  
 
- **Snail filling:**  
  For each column index j:  
    - If j is even, fill rows from 0 to rowsCount-1 (top-down).  
    - If j is odd, fill rows from rowsCount-1 down to 0 (bottom-up).  
  Track current position in nums to assign each value.

- **Time and space:**  
  This approach has to visit each item once. No extra optimizations are necessary since every number needs to be mapped exactly once.

- **Trade-offs:**  
  The method is linear and needs only O(1) extra space (beyond result). In-place isn’t feasible since shape changes.

### Corner cases to consider  
- Empty input array.
- rowsCount or colsCount is zero.
- Array size not matching rowsCount × colsCount.
- Single row or single column (all left-to-right or up-down).
- nums with duplicate values.
- nums of length 1.
- Large input arrays.
- Odd vs. even number of columns (testing direction flip logic).

### Solution

```python
def snailTraversal(nums, rowsCount, colsCount):
    # Check if input size is compatible for a matrix
    if len(nums) != rowsCount * colsCount:
        return []
    
    # Initialize an empty matrix of required shape
    res = [[0] * colsCount for _ in range(rowsCount)]
    
    idx = 0  # Pointer into nums
    
    # For each column
    for col in range(colsCount):
        # Decide direction: top-down if even col, bottom-up if odd col
        if col % 2 == 0:
            # Fill top-down: row 0 to rowsCount-1
            for row in range(rowsCount):
                res[row][col] = nums[idx]
                idx += 1
        else:
            # Fill bottom-up: row rowsCount-1 to 0
            for row in range(rowsCount - 1, -1, -1):
                res[row][col] = nums[idx]
                idx += 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the size of the input array.
  - We assign each number exactly once.
- **Space Complexity:** O(n), due to the output matrix of size rowsCount × colsCount.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you do this in-place?
  *Hint: Consider if it's possible with a 1D array that needs to become 2D, or vice versa.*

- What if you wanted to fill the columns left-to-right without zigzag, i.e., always top-down?
  *Hint: How does omitting the reverse direction affect traversal?*

- How would you solve for a spiral order instead of this snake/zag order?
  *Hint: Look at classic “spiral matrix” problems and compare direction logic.*

### Summary
This problem uses the **matrix traversal with alternate direction columns pattern**—a zigzag or "snail" fill. Similar approaches appear in printing/constructing 2D data with serpentine or wave order, and in problems that need controlled directional traversal by index parity. Techniques here apply anywhere staggered row/column iteration is needed, and are especially common in matrix or board-based coding problems.


### Flashcard
Fill a 2D array in a zigzag (snail) pattern: top-down for even columns, bottom-up for odd columns.

### Tags

### Similar Problems
- Array Prototype Last(array-prototype-last) (Easy)
- Group By(group-by) (Medium)
- Array Upper Bound(array-upper-bound) (Easy)