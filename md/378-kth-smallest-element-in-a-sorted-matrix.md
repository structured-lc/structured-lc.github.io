### Leetcode 378 (Medium): Kth Smallest Element in a Sorted Matrix [Practice](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix)

### Description  
We are given an n×n matrix where both the rows and the columns are sorted in ascending order. The task is to find the kᵗʰ smallest element in the whole matrix if we were to flatten it into a single, sorted list. The kᵗʰ smallest is by order, not uniqueness; duplicates count toward the kᵗʰ smallest.  
We must do this efficiently, without flattening the matrix into a new array due to possible memory constraints.

### Examples  

**Example 1:**  
Input: `matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8`  
Output: `13`  
*Explanation: The sorted sequence is [1,5,9,10,11,12,13,13,15]. The 8ᵗʰ smallest is 13.*

**Example 2:**  
Input: `matrix = [[-5]], k = 1`  
Output: `-5`  
*Explanation: Single element, so the 1ˢᵗ smallest is -5.*

**Example 3:**  
Input: `matrix = [[1,2],[1,3]], k = 2`  
Output: `1`  
*Explanation: The sorted sequence is [1,1,2,3]. The 2ⁿᵈ smallest is 1.*

### Thought Process (as if you’re the interviewee)  
A brute-force solution would be to take all n² elements, sort them, and return the kᵗʰ item. This is simple, but O(n²) time and O(n²) space is too much for large n, and the problem hints at better space performance.

Both rows and columns are sorted which is a strong hint.  
- **Optimizing space and time:**  
    - We can use a min-heap to simulate the process of merging sorted lists (rows), but though better, it still uses extra space proportional to n.
    - An even better method leverages binary search over the possible value range (i.e., between matrix and matrix[n-1][n-1]). For a candidate value mid, we can count in O(n) time how many elements in the matrix are ≤ mid, exploiting the sorted nature of each row and column.
    - If that count < k, the answer must be greater; if ≥ k, it could still be the answer or smaller, so adjust range accordingly.
    - This binary search does not require extra space.

### Corner cases to consider  
- **Single-element matrix**  
- **All elements same**  
- **k = 1 (smallest)**  
- **k = n² (largest)**  
- Matrices containing negative numbers or duplicates

### Solution

```python
def kthSmallest(matrix, k):
    n = len(matrix)

    # Helper: Counts the number of elements ≤ target in matrix
    def count_less_equal(target):
        count = 0
        row, col = n - 1, 0
        # Start from bottom-left and move accordingly
        while row >= 0 and col < n:
            if matrix[row][col] <= target:
                count += row + 1
                col += 1  # Move right
            else:
                row -= 1  # Move up
        return count

    left, right = matrix[0][0], matrix[n-1][n-1]
    while left < right:
        mid = left + (right - left) // 2
        if count_less_equal(mid) < k:
            left = mid + 1
        else:
            right = mid
    return left
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log(max−min))  
    - Each binary search iteration takes O(n) to count, and there are up to log(max−min) iterations, where max is the largest and min the smallest value in the matrix.
- **Space Complexity:** O(1)  
    - Only a few variables for tracking indices and counts; no extra space proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the matrix is not square, but n×m?
  *Hint: Most logic still works; adapt for row and col sizes.*
- How would you modify if asked for kᵗʰ largest instead?
  *Hint: Change how you count or flip the value range direction.*
- Can you retrieve the value *and* its coordinates?
  *Hint: Track positions during traversal or store candidate positions.*

### Summary  
This problem demonstrates a classic application of **binary search on value range** combined with matrix traversal exploiting *sorted properties*. Recognizing sorted 2D data allows O(1) extra space and much better-than-naive time. This pattern recurs in problems involving searching or counting in sorted grids, and is a good base for problems involving rank statistics in sorted/partially sorted data.


### Flashcard
Use binary search on value range: for each mid, count elements ≤ mid; adjust search bounds until kᵗʰ smallest is found.

### Tags
Array(#array), Binary Search(#binary-search), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Matrix(#matrix)

### Similar Problems
- Find K Pairs with Smallest Sums(find-k-pairs-with-smallest-sums) (Medium)
- Kth Smallest Number in Multiplication Table(kth-smallest-number-in-multiplication-table) (Hard)
- Find K-th Smallest Pair Distance(find-k-th-smallest-pair-distance) (Hard)
- K-th Smallest Prime Fraction(k-th-smallest-prime-fraction) (Medium)