### Leetcode 2679 (Medium): Sum in a Matrix [Practice](https://leetcode.com/problems/sum-in-a-matrix)

### Description  
You are given a matrix, nums, with m rows and n columns. In each operation, you choose any number from each row and remove it. For each operation (total n operations), you select one number from each row (so m numbers per operation), find the **maximum** among the chosen numbers, and add this to your score. Repeat until the matrix is empty.  
Return the **total score** after all operations.

### Examples  

**Example 1:**  
Input: `nums = [[1,2,4],[3,3,1]]`  
Output: `8`  
*Explanation:  
- Operation 1: Pick 4 and 3 (max is 4), remove them. Matrix: [[1,2],[3,3]].  
- Operation 2: Pick 2 and 3 (max is 3), remove them. Matrix: [[1],[3]].  
- Operation 3: Pick 1 and 3 (max is 3), remove them. Matrix is now empty.  
Total score: 4 + 3 + 3 = 10*

**Example 2:**  
Input: `nums = []`  
Output: `10`  
*Explanation:  
- Only one number, so sum is 10.*

**Example 3:**  
Input: `nums = [[1,1,1],[1,1,1],[1,1,1]]`  
Output: `3`  
*Explanation:  
- Each operation picks three 1s; max is always 1.  
Total score: 1 + 1 + 1 = 3*


### Thought Process (as if you’re the interviewee)  
First, notice the problem involves repeatedly picking and removing the largest element from each row, and scoring based on the largest among those in each round.

- **Brute-force idea:** On each operation, try all combinations of picking one element from each row, get their max, and remove those elements. But this is exponential and clearly inefficient.

- **Observation:** The operation must be repeated exactly n times (n columns).  
If, before each round, each row is sorted in ascending order, then on each operation, grabbing the last element from every row is optimal (since you'll only get each element once, and you want to maximize the round's max for the score).  
By transposing the matrix (taking elements column by column from the right), and in each column, picking the max, you can avoid nested loops.

- **Optimized approach:**  
1. Sort each row in ascending order.  
2. For each column (from rightmost to left), pick the greatest number among all rows (so, for column j, pick max(nums[row][j]) for all rows).  
3. Sum these maximums.

This efficiently reduces the problem to sorting and column-wise processing.

### Corner cases to consider  
- Rows of varying sizes (not possible by constraints, but check input assumptions).  
- Single row or single column matrix.  
- All elements are equal.  
- Already sorted/unordered input.
- Large integer values (check no overflows in other languages).

### Solution

```python
def matrixSum(nums):
    # Step 1: Sort each row so we can always remove the largest (rightmost) easily
    for row in nums:
        row.sort()
    
    score = 0
    n = len(nums[0])  # Number of columns
    
    # Step 2: For each column (from rightmost to left)
    for j in range(n-1, -1, -1):
        round_max = 0
        # Step 3: For each row, pick the element at column j (rightmost available)
        for row in nums:
            round_max = max(round_max, row[j])
        # Step 4: Add max picked in this operation to total score
        score += round_max
    return score
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n log n)  
  - Sorting each of m rows takes O(n log n) each ⇒ O(m × n log n).  
  - Each column processed in O(m) for n columns ⇒ O(m × n), but sorting dominates.

- **Space Complexity:** O(1) extra (if sorting in-place).  
  - No extra data structures apart from input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the matrix can be very large—can you optimize for space or time?  
  *Hint: Investigate in-place algorithms or heuristics that avoid full sorts.*

- How would you solve this if you can only remove from the front or back of each row?  
  *Hint: Consider double-ended queues or pointers to manage each row efficiently.*

- How would you adjust the algorithm if instead of the *maximum* sum, you wanted the *minimum*?  
  *Hint: Would the same sorting strategy work, or do you need to rethink column selection?*

### Summary
This problem is a classic example of **greedy algorithm** and **matrix manipulation**, specifically sorting rows to facilitate column-wise max picking. Sorting each row lets you always access the largest available values efficiently. This type of column-wise aggregation after row operations is common in problems involving simultaneous row/column operations, and the transposition idea can be applied in problems like "matrix diagonal sums," "pick from ends," or where order-independent selections are scored per operation.


### Flashcard
Sort each row in descending order, then for n rounds pick the first element from each row (the current max), sum their maximum across rows, remove those elements, and accumulate scores.

### Tags
Array(#array), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
