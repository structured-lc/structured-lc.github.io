### Leetcode 119 (Easy): Pascal's Triangle II [Practice](https://leetcode.com/problems/pascals-triangle-ii)

### Description  
Given a non-negative integer **rowIndex**, return the rowIndexᵗʰ (0-indexed) row of Pascal's Triangle.  
In Pascal's Triangle, each value is the sum of the two values directly above it. The first row (row 0) is `[1]`, row 1 is `[1, 1]`. You only need to return the row for the given index, not the full triangle.

### Examples  

**Example 1:**  
Input: `rowIndex = 3`  
Output: `[1, 3, 3, 1]`  
*Explanation:  
Row 0: [1]  
Row 1: [1, 1]  
Row 2: [1, 2, 1]  
Row 3: [1, 3, 3, 1]*

**Example 2:**  
Input: `rowIndex = 0`  
Output: `[1]`  
*Explanation:  
First row is `[1]`.*

**Example 3:**  
Input: `rowIndex = 1`  
Output: `[1, 1]`  
*Explanation:  
Second row is `[1, 1]`.*

### Thought Process (as if you’re the interviewee)  
First approach: Brute-force is to build the entire Pascal's Triangle up to the rowIndex, then return the last row. This requires O(rowIndex²) space and time because we store all previous rows.

Observation:  
- Every element is the sum of two numbers above it.
- First and last elements in every row are 1.

Optimization:  
We realize we only ever need the previous row to generate the next, so we don’t need the entire triangle in memory.  
Further optimization: If we update a single list from right to left, in-place, we can keep building until rowIndex and just return that row.  
For each row, update from the end towards the start so previous values aren’t overwritten before being used.

Trade-off:  
- Time: O(rowIndex²) – we loop for each row, and for each row update up to i elements.
- Space: O(rowIndex) – just one list for the current row.

This is considered optimal for this problem, as returning only the required row allows us to do in-place updates and use minimal space[1][4].

### Corner cases to consider  
- rowIndex is 0 or 1 (very short rows)
- Checking values are always 1 at start/end of row
- Handle max input (rowIndex = 33)

### Solution

```python
def getRow(rowIndex):
    # Initialize the row with 1s; will be modified in-place.
    row = [1] * (rowIndex + 1)
    # Iterate over rows, starting from the 2nd row (index 2)
    for i in range(2, rowIndex + 1):
        # Update from right to left to avoid overwriting needed values
        for j in range(i - 1, 0, -1):
            row[j] = row[j] + row[j - 1]
    return row
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k²), where k = rowIndex.  
  For each new row (from 2 to k), we do up to i updates for row i, giving a total sum of 1 + 2 + ... + (k-1) = O(k²).
- **Space Complexity:** O(k), as we only keep one list for the current row, of length k + 1.

### Potential follow-up questions (as if you’re the interviewer)  

- Reduce further space usage if returning an iterator rather than a list?  
  *Hint: Can you generate one value at a time using combinatorics?*

- What if you needed a specific value from row k and column n?  
  *Hint: Use binomial coefficient: C(k, n).*

- Can you build the triangle recursively?  
  *Hint: Think base cases and recursive sum of previous row values.*

### Summary
This problem uses the **Dynamic Programming** and **in-place array update** pattern, efficiently constructing a specific row from a triangle defined by local rules. This approach can be applied to other triangle-structured DP problems—such as minimum paths, triangle sums, or combinatorial tables—where prior row values determine the next state.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Pascal's Triangle(pascals-triangle) (Easy)
- Find Triangular Sum of an Array(find-triangular-sum-of-an-array) (Medium)