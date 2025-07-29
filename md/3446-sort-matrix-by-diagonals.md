### Leetcode 3446 (Medium): Sort Matrix by Diagonals [Practice](https://leetcode.com/problems/sort-matrix-by-diagonals)

### Description  
Given an m × n matrix, **sort each diagonal in ascending order** and return the resulting matrix.  
A diagonal in a matrix is a set of cells starting from any cell in the topmost row or leftmost column and extending down and to the right, i.e., all elements with the same (i - j) difference.  
**You are to independently sort the elements along each diagonal and put them back in their places.**

### Examples  

**Example 1:**  
Input: `mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]`  
Output: `[[1,1,1,1],[1,2,2,2],[1,2,3,3]]`  
*Explanation: Each diagonal is sorted independently:  
- Diagonal 0 (top-left to bottom-right): [3,2,1] → [1,2,3],  
  positions (0,0),(1,1),(2,2)  
- Diagonal -1: [3,2] → [2,3],  
  positions (0,1),(1,2)  
- Diagonal 1: [1,2] → [1,2],  
  positions (1,0),(2,1)  
- Diagonal -2: [1], position (0,2)  
- Diagonal 2: [2], position (2,0)  
After replacement:  
`[[1,1,1,1],[1,2,2,2],[1,2,3,3]]`

**Example 2:**  
Input: `mat = [[11,25,66,1,69,7],[23,55,17,45,15,52],[75,31,36,44,58,8],[22,27,33,25,68,4],[84,28,14,11,5,50]]`  
Output: `[[5,17,4,1,52,7],[11,11,25,45,8,69],[14,23,25,44,58,15],[28,27,31,36,50,66],[84,22,33,55,68,75]]`  
*Explanation: Each diagonal like (0,0)->(1,1)->(2,2)... gets sorted.

**Example 3:**  
Input: `mat = [[5]]`  
Output: `[[5]]`  
*Explanation: Only one element; nothing changes.*

### Thought Process (as if you’re the interviewee)  
- Brute-force: For each diagonal, collect its elements, sort them, and put them back.  
  - To identify a diagonal, notice that all elements (i,j) with the same (i - j) belong to the same diagonal.
  - So, walk across the matrix, use a dictionary to group elements by (i - j), sort each array, then replace them back.
- Optimization: Since the constraints are not massive, the above works fine.  
- Why this strategy?  
  - Sorting each diagonal independently and using the (i - j) key is a standard trick to group diagonals without extra data structures.  
  - Space: One pass to collect, another to put back.
- Alternative: In-place sorting diagonal by diagonal, but that’d be more complex and not efficient for repeated or long diagonals.

### Corner cases to consider  
- Empty matrix (`mat = []`)
- Matrix with only one row or one column
- All elements are equal
- Matrix with negative numbers
- Matrix with duplicate values
- Non-square matrices (rectangular)

### Solution

```python
def diagonalSort(mat):
    # Step 1: Collect all diagonal elements using (i-j) as a key
    from collections import defaultdict

    m = len(mat)
    n = len(mat[0]) if m > 0 else 0
    diagonals = defaultdict(list)

    for i in range(m):
        for j in range(n):
            diagonals[i-j].append(mat[i][j])

    # Step 2: Sort each diagonal
    for key in diagonals:
        diagonals[key].sort(reverse=True)  # reverse so we can pop() smallest

    # Step 3: Put back the sorted values
    for i in range(m):
        for j in range(n):
            mat[i][j] = diagonals[i-j].pop()

    return mat
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × log(min(m, n)))  
  - Each diagonal contains at most min(m, n) elements and is sorted.
  - There are O(m + n) diagonals, partitioning the matrix's O(m × n) cells.
  - Each cell is inserted and popped exactly once.
- **Space Complexity:** O(m × n)  
  - Extra storage for all diagonals as lists: at most one value per cell at a time.

### Potential follow-up questions (as if you’re the interviewer)  

- What if memory is limited?  
  *Hint: Can you sort in-place along each diagonal?*

- What if we want to sort diagonals in descending order?  
  *Hint: Change sort order ('reverse=True' or not).*

- How would you handle huge matrices that don't fit in memory?  
  *Hint: Can you process diagonals one at a time, possibly using external storage?*

### Summary
This problem uses the diagonal-grouping trick (using i-j as a key) to efficiently segment and process matrix diagonals. The pattern is dictionary bucketing followed by sorting and replacement—commonly used in grid problems like diagonal order traversals and anti-diagonal summations. This approach generalizes to related tasks (e.g., finding min/max/sums by diagonals) and is widely applicable in grid manipulation and DP.