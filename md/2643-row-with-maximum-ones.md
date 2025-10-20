### Leetcode 2643 (Easy): Row With Maximum Ones [Practice](https://leetcode.com/problems/row-with-maximum-ones)

### Description  
Given a binary matrix (each element is 0 or 1), find the index of the row with the greatest number of 1s. If multiple rows have the same maximum number of 1s, return the one with the smallest index. Output a list with two elements: the row index and the count of ones in that row.  
Example: For a matrix  
```
[[0,1], 
 [1,0]]
```
Both rows contain 1 one, so return `[0, 1]` as row 0 is the smallest index.

### Examples  

**Example 1:**  
Input: `mat = [[0,1],[1,0]]`  
Output: `[0,1]`  
*Explanation: Row 0 and row 1 both have one 1, so return the row with the smaller index, 0.*

**Example 2:**  
Input: `mat = [[0,0,0],[0,1,1]]`  
Output: `[1,2]`  
*Explanation: Row 1 contains two 1s, which is the maximum among all rows.*

**Example 3:**  
Input: `mat = [[0,0],[1,1],[0,0]]`  
Output: `[1,2]`  
*Explanation: Only row 1 has two 1s, so we return its index and the count.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  - Iterate through each row and count the number of 1s by looping over the elements. Keep track of the row index and the maximum count found so far.  
  - On every step, if the count for current row is greater than the current maximum, update the index and maximum.  
  - If equal, do nothing (since a smaller index is already preferred).
- **Optimized notes:**  
  - If each row were sorted, we could use binary search in interview follow-ups, but the problem doesn’t require sorted rows.  
  - Python’s list.count can get the number of 1s efficiently per row, but in interviews, stick to manual counting for clarity.  
  - Since the matrix size is capped at 100×100, the brute-force approach is efficient and readable.

### Corner cases to consider  
- Matrix with all zeros (should return row 0, count 0)  
- Multiple rows with equal and maximum number of 1s (select smallest index)  
- Single row or single column matrices  
- Large square or rectangular matrices  
- Rows with no 1s at all  
- All 1s in every row

### Solution

```python
def rowAndMaximumOnes(mat):
    max_count = -1  # Store the maximum number of 1s found so far
    row_index = -1  # Store the index of the row with max 1s

    for i in range(len(mat)):
        count_ones = 0  # Reset the count for current row
        for num in mat[i]:
            if num == 1:
                count_ones += 1  # Increment count if the element is 1
        # If we find a row with more 1s, update results
        if count_ones > max_count:
            max_count = count_ones
            row_index = i
        # If equal to max_count, do nothing (we keep the smallest index)
    return [row_index, max_count]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m is the number of rows and n is the number of columns. Each element is visited once.
- **Space Complexity:** O(1), excluding the input, only fixed variables are used for tracking the result.

### Potential follow-up questions (as if you’re the interviewer)  

- If the rows are sorted, can you do better than O(m × n)?  
  *Hint: Try binary search for the first 1 in each row.*

- How would you solve this if the matrix is very large and memory is limited?  
  *Hint: Stream rows and store only what’s needed for the answer.*

- Suppose you want all the row indices (not just one) with maximal 1s?  
  *Hint: Use a list to keep track of all such indices.*

### Summary
This problem demonstrates the **matrix row scanning pattern**, commonly found in array and matrix problems requiring global or row-level aggregation and comparisons. The logic—count and compare per row—applies to classic data processing, as well as variations involving sorted rows, streaming large data, or needing ties resolved by index. This pattern frequently appears in matrix/2D array interview questions.


### Flashcard
Identify the row with the most ones in a binary matrix by iterating through rows and counting ones.

### Tags
Array(#array), Matrix(#matrix)

### Similar Problems
