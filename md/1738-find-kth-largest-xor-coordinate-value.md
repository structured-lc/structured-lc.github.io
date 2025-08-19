### Leetcode 1738 (Medium): Find Kth Largest XOR Coordinate Value [Practice](https://leetcode.com/problems/find-kth-largest-xor-coordinate-value)

### Description  
Given an m × n matrix of non-negative integers, for each coordinate (a, b), define its value as the XOR of all elements in the rectangle from (0, 0) to (a, b) (inclusive, top-left to (a, b)). Find the kᵗʰ largest value among all such coordinates.

### Examples  

**Example 1:**  
Input:  
`matrix = [[5,2],[1,6]], k = 1`  
Output:  
`7`  
*Explanation: The XOR submatrix values are  
[[5, 7],  
 [4, 0]]  
The values are [5, 7, 4, 0]. The 1ˢᵗ largest is 7.*

**Example 2:**  
Input:  
`matrix = [[5,2],[1,6]], k = 2`  
Output:  
`5`  
*Explanation: Values as above are [5, 7, 4, 0]. The 2ⁿᵈ largest is 5.*

**Example 3:**  
Input:  
`matrix = [[5,2],[1,6]], k = 3`  
Output:  
`4`  
*Explanation: Values as above are [5, 7, 4, 0]. The 3ʳᵈ largest is 4.*

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:** For each (a, b), explicitly compute the XOR of all elements in rectangle (0, 0) to (a, b). For an m × n matrix, this is O(m² n²) — much too slow.
- **Optimize with prefix XOR:** Use a prefix XOR matrix where  
`prefix[i+1][j+1] = prefix[i][j+1] ^ prefix[i+1][j] ^ prefix[i][j] ^ matrix[i][j]`  
to compute the XOR of each rectangle (0, 0) → (i, j) in O(1) time per cell.
- Store all prefix XORs in a list. To find the kth largest, sort the list (O(mn log mn)), or use a min-heap of size k for O(mn log k).  
- **Trade-off:** Sorting is simpler and fine unless mn is very large. The prefix-XOR approach is crucial for speed.

### Corner cases to consider  
- Single cell matrix (1 × 1), e.g. [], k = 1.
- Matrices with all zeros or all equal values.
- k equals 1 (largest value) or equals m × n (smallest value).
- Matrix with one row or one column.
- k greater than m × n (invalid input — assume not).
- No negative numbers, but non-negative zeros are allowed.

### Solution

```python
def kthLargestValue(matrix, k):
    m, n = len(matrix), len(matrix[0])

    # Build prefix XOR matrix of size (m+1) × (n+1)
    prefix = [[0] * (n + 1) for _ in range(m + 1)]
    xor_values = []

    for i in range(m):
        for j in range(n):
            # Compute prefix XOR for (i, j)
            prefix[i+1][j+1] = (prefix[i][j+1]
                                ^ prefix[i+1][j]
                                ^ prefix[i][j]
                                ^ matrix[i][j])
            xor_values.append(prefix[i+1][j+1])

    # Sort in descending order and pick kᵗʰ largest
    xor_values.sort(reverse=True)
    return xor_values[k-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m n log(m n))  
  Main component is sorting the m × n prefix-XOR values. Computing prefix-XORs is O(m n).
- **Space Complexity:** O(m n)  
  For the prefix matrix and the list of XOR values.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you find the kth *smallest* value efficiently instead?
  *Hint: Reverse the sort or use a min-heap.*

- How would you optimize further if k is tiny compared to mn?
  *Hint: Use a min-heap of size k instead of sorting the whole list.*

- Can this be solved without extra space for prefix matrix?
  *Hint: You could overwrite the input or just keep enough state for the current row.*

### Summary
This problem uses the 2D **prefix XOR** (analogous to prefix sums for XOR), a classic dynamic programming prep technique to speed up area submatrix queries. After calculating all coordinate XORs efficiently, the order statistic (kth largest) is retrieved. This technique is widely used in problems involving region-based aggregation (sum, min/max, or XOR) in 2D grids.

### Tags
Array(#array), Divide and Conquer(#divide-and-conquer), Bit Manipulation(#bit-manipulation), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Matrix(#matrix), Prefix Sum(#prefix-sum), Quickselect(#quickselect)

### Similar Problems
