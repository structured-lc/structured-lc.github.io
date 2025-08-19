### Leetcode 1337 (Easy): The K Weakest Rows in a Matrix [Practice](https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix)

### Description  
You’re given a `m × n` binary matrix `mat` where each row contains only 1s (soldiers) followed by 0s (civilians). Rows may have different numbers of soldiers, but all 1s come before 0s in each row. The **strength** of a row is the number of soldiers in it. Return the indices of the k weakest rows in the matrix, sorted from weakest to strongest. If multiple rows have the same number of soldiers, the row with the smaller index comes first.

### Examples  

**Example 1:**  
Input: `mat = [[1,1,0,0,0], [1,1,1,1,0], [1,0,0,0,0], [1,1,0,0,0], [1,1,1,1,1]]`, `k = 3`  
Output: `[2, 0, 3]`  
*Explanation: Row 2: 1 soldier, Row 0 & 3: 2 soldiers each. Row 2 < 0 < 3 for tie-breaks.*

**Example 2:**  
Input: `mat = [[1,0,0,0],[1,1,1,1],[1,0,0,0],[1,0,0,0]]`, `k = 2`  
Output: `[0, 2]`  
*Explanation: Rows 0 and 2: only 1 soldier each.*

**Example 3:**  
Input: `mat = [[1,1,1,1,0],[1,1,1,1,1],[1,0,0,0,0],[1,1,0,0,0],[1,1,1,1,0]]`, `k = 4`  
Output: `[2,3,0,4]`  
*Explanation: Soldier counts: [4,5,1,2,4] ⇒ sorted: 1 (2), 2 (3), 4 (0,4).* 

### Thought Process (as if you’re the interviewee)  
- For each row, count how many 1s (soldiers) it has. Since 1s come before 0s, binary search is faster than scan.
- Store (num_soldiers, row_index) for each row.
- Sort all rows by num_soldiers, then index.
- Output first k indices after sorting.

### Corner cases to consider  
- All rows have same number of soldiers
- k = number of rows
- Matrix has 1 row or column
- Rows with 0 soldiers

### Solution

```python
from typing import List

def kWeakestRows(mat: List[List[int]], k: int) -> List[int]:
    def soldier_count(row):
        # Binary search to find first 0
        left, right = 0, len(row)
        while left < right:
            mid = (left + right) // 2
            if row[mid] == 1:
                left = mid + 1
            else:
                right = mid
        return left    # count of 1s
    rows = [(soldier_count(row), i) for i, row in enumerate(mat)]
    rows.sort()
    return [i for (_, i) in rows[:k]]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × log n + m × log m), m = #rows, n = #cols. For each row, binary search (log n), then sort m rows.
- **Space Complexity:** O(m), for the list of (count, index)

### Potential follow-up questions (as if you’re the interviewer)  

- How to optimize if matrix is extremely large?  
  *Hint: Use a min-heap of size k to avoid sorting everything.*
- Can you do it with only O(1) extra space?  
  *Hint: No, since you need to store soldier counts for each row.*
- If matrix could have random 1s/0s (not grouped):  
  *Hint: Count 1s normally; no binary search speedup.*

### Summary
This is a counting and sorting problem. Binary search leverages the 1s-before-0s pattern for optimal performance. Useful for row-ranking or top-k min/max selection tasks.

### Tags
Array(#array), Binary Search(#binary-search), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Matrix(#matrix)

### Similar Problems
