### Leetcode 118 (Easy): Pascal's Triangle [Practice](https://leetcode.com/problems/pascals-triangle)

### Description  
Given an integer numRows, generate the first numRows of **Pascal's triangle**.  
Each row represents a level of the triangle, where every number is the sum of the two numbers directly above it in the previous row.  
- The first and last element of each row is always 1.
- Each in-between element is the sum of two values from the previous row (arranged as a triangle).

### Examples  

**Example 1:**  
Input: `numRows = 5`  
Output: `[[1], [1,1], [1,2,1], [1,3,3,1], [1,4,6,4,1]]`  
*Explanation:  
- Row 1: [1]  
- Row 2: [1, 1]  
- Row 3: [1, 2, 1] (2 = 1+1)  
- Row 4: [1, 3, 3, 1] (3 = 1+2, 3 = 2+1)  
- Row 5: [1, 4, 6, 4, 1] (4 = 1+3, 6 = 3+3, 4 = 3+1)*

**Example 2:**  
Input: `numRows = 1`  
Output: `[[1]]`  
*Explanation:  
Only the top row needed—just [1].*

**Example 3:**  
Input: `numRows = 3`  
Output: `[[1], [1,1], [1,2,1]]`  
*Explanation:  
- Row 1: [1]  
- Row 2: [1,1]  
- Row 3: [1,2,1] (2 = 1+1)*

### Thought Process (as if you’re the interviewee)  
To solve this, I’d start by constructing the triangle row by row:
- The first row is always [1].
- For each new row, the first and last elements are both 1.
- For all inner elements (if any), each value at index j is formed by adding the (j−1)ᵗʰ and jᵗʰ elements of the previous row.
- Continue this for all rows until numRows are generated.

There’s no need for any optimization since each row only depends on the previous row (not the entire triangle), and given the small constraints, this approach is efficient and clear.

### Corner cases to consider  
- numRows = 1: Should return [[1]].
- numRows = 2: Should return [[1], [1,1]].
- Minimal and maximal numRows (boundary of 1 and 30).
- Ensure every row starts and ends with 1, regardless of size.

### Solution

```python
def generate(numRows):
    # Initialize triangle with empty list
    triangle = []

    for row_num in range(numRows):
        # Start each row with all '1's
        row = [1] * (row_num + 1)

        # Compute inner values if row has more than 2 elements
        for j in range(1, row_num):
            # sum two values from previous row
            row[j] = triangle[row_num - 1][j - 1] + triangle[row_num - 1][j] 
        
        # Append the computed row to the triangle
        triangle.append(row)

    return triangle
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), where n = numRows. We build up to n rows, and each row requires up to its row index iterations (e.g. row k has k elements).
- **Space Complexity:** O(n²), since the output is a list of lists containing all numbers in the triangle (total elements ≈ n(n+1)/2).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you return just the kᵗʰ row of Pascal's Triangle without constructing the whole triangle?  
  *Hint: Use combinations or dynamic programming for O(k) space.*

- Can you generate the triangle in-place if only the last row is needed?  
  *Hint: Update one-row buffer from right to left.*

- What if you had to compute just one element at a specific row and column (without building the rest)?  
  *Hint: Compute using binomial coefficients.*

### Summary
This approach employs a **dynamic programming** pattern—each row builds upon the prior. This pattern is common when subproblems overlap, such as calculating triangle numbers, Fibonacci, etc. Pascal’s Triangle and its iterative row-by-row build is classic for practicing 2D array construction and subproblem reuse.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Pascal's Triangle II(pascals-triangle-ii) (Easy)
- Check If Digits Are Equal in String After Operations II(check-if-digits-are-equal-in-string-after-operations-ii) (Hard)