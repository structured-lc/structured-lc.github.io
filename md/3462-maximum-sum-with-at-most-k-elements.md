### Leetcode 3462 (Medium): Maximum Sum With at Most K Elements [Practice](https://leetcode.com/problems/maximum-sum-with-at-most-k-elements)

### Description  
Given a 2D integer matrix `grid` with n rows and m columns, an integer array `limits` of length n, and an integer `k`, select at most `k` elements from `grid` such that:
- From the iᵗʰ row, you take at most `limits[i]` elements.
- The goal is to **maximize the sum** of the selected elements.

Return the **maximum sum** achievable under these constraints.

---

### Examples  

**Example 1:**  
Input: `grid = [[1,2],[3,4]], limits = [1,2], k = 2`  
Output: `7`  
*Explanation: You can pick 4 (row 1), and 3 (row 1) for total sum 7. But from row 0 you can pick at most 1, so it could also be 4 (row 1) and 2 (row 0), still sum 6. But best is to pick 3 and 4 (row 1 only, limit is 2).*

**Example 2:**  
Input: `grid = [[5,1,4],[2,8,7]], limits = [2,1], k = 3`  
Output: `19`  
*Explanation: From row 0, you can pick at most 2 (so pick 5 and 4); from row 1, at most 1 (pick 8). 5 + 4 + 8 = 17. But picking 4 and 5 (row 0 limit), and 8 (row 1 limit), and 7 not allowed (row 1 limit is 1). Maximum is 5 + 4 + 8 = 17.*

**Example 3:**  
Input: `grid = [], limits = [1], k = 1`  
Output: `6`  
*Explanation: Only one cell, pick it.*

---

### Thought Process (as if you’re the interviewee)  

1. **Brute-force:**  
   - Try all subsets of the elements, check if they respect the limits and if count ≤ k. 
   - Too slow for large grids, as total possibilities are (n\*m choose at most k) which explodes.
2. **Optimize with Greedy + Heap:**  
   - Since the limits are per row, and the goal is to maximize sum:
       - In each row, sort all elements descending, and pick up to `limits[i]` largest.
       - This gives a pool of eligible elements.
       - From this pool across all rows, pick the top k largest values (using a max-heap or collecting all and sorting).
       - Their sum is the answer.
   - Why is this correct?
     - Greedy works since each pick is independent, and expanding the set with descending order best uses k.
   - Tradeoff:
     - Sorting each row takes O(n \* m log m), and getting top k is O(L log L) for L eligible elements.
     - Space: store list of all candidates.

---

### Corner cases to consider  
- Empty grid (`grid = []` or grid with 0 columns).
- All elements negative (should still pick the largest up to constraints).
- k = 0 (no picks, answer 0).
- Row limits = 0 (rows with no elements to pick).
- Some rows have less elements than limits[i].
- k >= total available numbers (should pick all eligible).
- Only one row or one column in grid.

---

### Solution

```python
def maxSum(grid, limits, k):
    # Collects available picks per row
    candidates = []

    for row_idx, row in enumerate(grid):
        # Sort row descending
        sorted_row = sorted(row, reverse=True)
        # Take up to limits[row_idx] elements
        take = min(limits[row_idx], len(row))
        for j in range(take):
            candidates.append(sorted_row[j])

    # Sort candidates descending
    candidates.sort(reverse=True)
    # Take up to k elements (or all if fewer)
    picks = candidates[:k]
    return sum(picks)
```

---

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n \* m log m): sorting each row, where n = number of rows, m = max columns per row.
  - O(L log L): sorting all eligible elements, where L = sum of min(limits[i], len(grid[i])) over i.
  - O(n \* m log m) dominates unless k is very large.
- **Space Complexity:**  
  - O(L): storing candidate values (at most sum of all limits).

---

### Potential follow-up questions (as if you’re the interviewer)  

- What if the grid is extremely large and you can’t hold all candidates in memory?  
  *Hint: Use a min-heap of size k while traversing candidates instead of sorting the whole list.*

- What if picking elements had to be contiguous in each row?  
  *Hint: Think about sliding window sums and compute up to limits[i] for each row.*

- What about multiple grids or streaming input?  
  *Hint: Keep updating the heap or running sum as new rows/elements arrive, never storing all eligible candidates at once.*

---

### Summary
This problem uses a **greedy selection pattern with row-wise limits and global cap**, implemented via sort or heap. This is a common interview pattern for "take k best" with extra constraints, and also appears in problems involving merging sorted rows, top-k sum calculations, or batch-wise selection under multiple constraints.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Matrix(#matrix)

### Similar Problems
