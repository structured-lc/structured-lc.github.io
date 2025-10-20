### Leetcode 960 (Hard): Delete Columns to Make Sorted III [Practice](https://leetcode.com/problems/delete-columns-to-make-sorted-iii)

### Description  
You are given an array of **n strings**, all of the same length. You may choose any set of column indices, and delete those columns (removing the character at that position from every string). The goal is to remove the **minimum number of columns** so that, after deletions, **every row is in non-decreasing lexicographic order**. Each row must individually be sorted left to right; you do not have to sort the rows collectively or worry if rows are sorted with respect to each other.

Imagine each string as a row in a matrix; each column is a character position. Your task is to delete as few columns as possible so that, in every row, the sequence of remaining characters is sorted alphabetically from left to right, possibly skipping over the indices you deleted.

### Examples  

**Example 1:**  
Input: `strs = ["babca","bbazb"]`  
Output: `3`  
Explanation: Delete columns 0, 1, and 4. The array becomes: `["bc", "az"]`. Both rows are now individually sorted: b ≤ c and a ≤ z.

**Example 2:**  
Input: `strs = ["edcba"]`  
Output: `4`  
Explanation: Need to delete columns 0, 1, 2, 3, so only "a" remains. This is the only possible (sorted) outcome.

**Example 3:**  
Input: `strs = ["ghi","def","abc"]`  
Output: `0`  
Explanation: All rows are already sorted from left to right.


### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:** Try all possible subsets of columns to keep, check if keeping them preserves the sorted order for every row, and return the minimum number of deletions. But this is exponential in the number of columns—far too slow.
- **Observation:** The problem is equivalent to finding the **longest sequence of columns** (i₁ < i₂ < ... < ik) such that, for every row, the corresponding sequence of characters is non-decreasing. The minimum deletions is then total columns - length of this maximal sequence.
- **Dynamic Programming approach:**  
    - Let k = number of columns.
    - Use dp[j]: the length of the longest "good" ordered subsequence ending at column j.
    - For each pair of columns i, j (i < j):
        - If, for all rows, strs[row][i] ≤ strs[row][j], then we can append column j after i in our sequence.
        - So, dp[j] = max(dp[i] + 1) over all such i.
    - Initialize dp with all 1s (a single column is always sorted).
    - The answer is k - max(dp).
- **Trade-off:** This dynamic programming uses O(k²×n) time, but is polynomial and efficient for moderate sizes.


### Corner cases to consider  
- Only one row (no need to keep any columns sorted across rows, just sort that row).
- Strings already sorted (output 0).
- Each string is a reverse alphabet (need to delete all but one column for each).
- All columns identical (no need to delete any).
- Minimum input sizes (k=1, n=1).
- All possible letters in a column are equal.


### Solution

```python
def minDeletionSize(strs):
    n = len(strs)
    k = len(strs[0])
    dp = [1] * k  # dp[j]: max length of ordered subsequence ending at column j

    for j in range(k):
        for i in range(j):
            # Check if for all rows, col i ≤ col j
            if all(strs[row][i] <= strs[row][j] for row in range(n)):
                dp[j] = max(dp[j], dp[i] + 1)

    return k - max(dp)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k² × n), where k is the number of columns and n is the number of rows—since for every pair (i, j), we might need to check all rows.
- **Space Complexity:** O(k), for the dp array storing maximum subsequence lengths for each column.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the input matrix is very large?  
  *Hint: Can you optimize by early termination when you find a violation?*

- How would you reconstruct the sequence of remaining columns?  
  *Hint: Store previous indices along with dp to backtrack and rebuild the actual column indices kept.*

- Can you generalize this to allow strictly increasing rows?  
  *Hint: Modify the "≤" check to "<" when comparing for all rows.*


### Summary
This problem uses the **Longest Increasing Subsequence (LIS)** dynamic programming pattern applied to columns (with a twist—all rows must be non-decreasing across the selected columns). This pattern, while more typically used for arrays, can be generalized for two-dimensional or multi-sequence constraints, and often appears in problems involving "minimum deletions" to achieve sorted order across sequences, such as "Delete Columns to Make Sorted II" and other grid-related DP optimizations.


### Flashcard
Find the longest sequence of columns where all rows are non-decreasing; answer is total columns minus the length of this sequence (Longest Increasing Subsequence variant on columns).

### Tags
Array(#array), String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
