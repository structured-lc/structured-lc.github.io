### Leetcode 1975 (Medium): Maximum Matrix Sum [Practice](https://leetcode.com/problems/maximum-matrix-sum)

### Description  
Given an n × n integer matrix, you may perform the following operation any number of times:  
- Choose any two **adjacent** elements (sharing a border) and **multiply each by -1** (i.e., flip their signs).

Your goal is to maximize the sum of all matrix elements by repeating the operation any number of times.  
Return the largest possible matrix sum after such flips.

### Examples  

**Example 1:**  
Input: `[[1, -1], [-1, 1]]`  
Output: `4`  
*Explanation: Flip both elements in the first row, making the matrix `[[1, 1], [1, 1]]`. Sum is 4.*

**Example 2:**  
Input: `[[1, 2, 3], [-1, -2, -3], [1, 2, 3]]`  
Output: `16`  
*Explanation: Flip the two elements at positions (1,1) and (1,2):  
Original:  
```
 1   2   3  
-1  -2  -3  
 1   2   3
```
After flipping -2 and -3:  
```
 1   2   3  
-1   2   3  
 1   2   3
```
Sum: 1+2+3+(-1)+2+3+1+2+3 = 16.*

**Example 3:**  
Input: `[[-1, 0, 1], [2, -3, 4], [-5, 6, -7]]`  
Output: `27`  
*Explanation: Flip adjacent negatives to maximize positives where possible. Sum of absolute values is 29, but one minimum absolute value (1) stays negative due to odd negatives. Final sum is 29 - 2 = 27.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Try all possible flipping combinations? Not feasible—too many possibilities for n × n grid.
- **Observations**:
  - Any **pair of negatives** that are adjacent can be flipped together to become positives.  
  - If there's an **even number of negatives**, we can make everything positive (by strategically pairing and flipping).
  - If there's an **odd number of negatives**, one negative will always remain. In that case, choose the **smallest in absolute value** to be left negative—minimizing its impact.
  - So,
    - Sum of absolute values: `total_sum`
    - If negative count is even: answer = `total_sum`
    - If negative count is odd: answer = `total_sum - 2 × (smallest absolute value)`
- This greedy approach leverages symmetry of the operation and adjacency—because the matrix is connected, and we can "shuffle" signs as needed.

### Corner cases to consider  
- All elements positive or all zero: already maximized.
- All elements negative but even count: can make all positive.
- Single negative (and rest positive): one must remain negative.
- Matrix contains zeros: zeros can trivially be made negative/positive; doesn't affect sum.
- Minimum absolute value is 0 (i.e., matrix contains a zero): the answer is always the total absolute sum, regardless of count of negatives.

### Solution

```python
def maxMatrixSum(matrix):
    # Track sum of absolute values, minimum abs value, and number of negatives
    total = 0
    min_abs = float('inf')
    neg_count = 0

    for row in matrix:
        for val in row:
            abs_val = abs(val)
            total += abs_val
            min_abs = min(min_abs, abs_val)
            if val < 0:
                neg_count += 1

    # If number of negatives is even, or there's a zero, everything can be made positive
    if neg_count % 2 == 0 or min_abs == 0:
        return total

    # If odd negatives, one minimum-abs value must remain negative
    return total - 2 * min_abs
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²). We scan every element once to accumulate abs sums, count negatives, and track min absolute value.
- **Space Complexity:** O(1). Only a few variables for tracking sums and counts, no extra storage beyond input.

### Potential follow-up questions (as if you’re the interviewer)  

- If the operation could only be performed a finite number of times, how would your approach change?  
  *Hint: Think about which pairs you'd optimally flip first to maximize change in sum.*

- Suppose the matrix is not square, but rectangular. Does your solution still work?  
  *Hint: Does adjacency property depend on being square?*

- Can you output the sequence of operations needed to reach the maximum sum, not just the value?  
  *Hint: How would you reconstruct the flips, if needed?*

### Summary
This problem fits the **Greedy** pattern with connected grid symmetries and absolute value analysis. Similar techniques are seen in matrix/array flipping or sign adjustment problems, and the key idea is to pair up negatives to cancel out their sign effect—leaving at most one (the smallest) if their count is odd. Recognizing sign flexibility under adjacency operations is the core insight.

### Tags
Array(#array), Greedy(#greedy), Matrix(#matrix)

### Similar Problems
