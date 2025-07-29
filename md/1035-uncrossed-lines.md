### Leetcode 1035 (Medium): Uncrossed Lines [Practice](https://leetcode.com/problems/uncrossed-lines)

### Description  
Given two integer arrays, you can draw a straight line between `A[i]` and `B[j]` if `A[i] == B[j]`, and each index can be used at most once. The lines must not cross, meaning if you draw a line from `A[i]` to `B[j]` and another from `A[k]` to `B[l]`, you must have either `i < k` and `j < l` or `i > k` and `j > l`.  
Find the **maximum number of uncrossed lines** you can draw.  
This is essentially equivalent to finding the **Length of Longest Common Subsequence (LCS)** between the two arrays.

### Examples  

**Example 1:**  
Input: `A = [1,4,2]`, `B = [1,2,4]`  
Output: `2`  
*Explanation: You can draw lines between A=1 and B=1, and between A[2]=2 and B[1]=2. Drawing a line from A[1]=4 to B[2]=4 would cross the previous line, which is not allowed.*

**Example 2:**  
Input: `A = [2,5,1,2,5]`, `B = [10,5,2,1,5,2]`  
Output: `3`  
*Explanation: The optimal matching (no crossings) is: A[1]=5 to B[1]=5, A[2]=1 to B[3]=1, and A[4]=5 to B[4]=5.*

**Example 3:**  
Input: `A = [1,3,7,1,7,5]`, `B = [1,9,2,5,1]`  
Output: `2`  
*Explanation: For instance, connect A=1 to B=1 and A[5]=5 to B[3]=5.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  - Try every subset of matches and check if lines cross. This is exponential in both size and infeasible.
- **Optimization via DP:**  
  - Realize that the problem only cares about the order, not the exact positions, and you can't reuse indices.
  - This translates exactly to the **Longest Common Subsequence (LCS)** problem:
      - Match as many equal elements in order as possible.
      - If A[i] == B[j], add 1 and move right on both.
      - Else, try skipping either A[i] or B[j], and take the max.
  - **DP Table:**  
    - Let `dp[i][j]` be the maximum number of uncrossed lines between A[0:i] and B[0:j].
    - Recurrence:
        - If A[i-1] == B[j-1]: `dp[i][j] = dp[i-1][j-1] + 1`
        - Else: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`
    - This gives an O(n × m) solution with O(n × m) space, or can be optimized to O(m) space.

### Corner cases to consider  
- Either array is empty ⇒ output is 0.
- All elements are the same ⇒ min(len(A), len(B)).
- No matching elements at all ⇒ output is 0.
- Arrays of length 1 (either or both).
- Arrays with duplicate numbers.
- Arrays with interleaved matching numbers.

### Solution

```python
def maxUncrossedLines(A, B):
    n, m = len(A), len(B)
    # DP table: previous and current rows only for space optimization
    prev = [0] * (m + 1)
    for i in range(1, n + 1):
        curr = [0] * (m + 1)
        for j in range(1, m + 1):
            if A[i-1] == B[j-1]:
                curr[j] = prev[j-1] + 1
            else:
                curr[j] = max(prev[j], curr[j-1])
        prev = curr
    return prev[m]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m), where n = len(A), m = len(B).  
  Each cell of the DP table is filled exactly once.
- **Space Complexity:** O(m).  
  By only keeping current and previous rows (rolling arrays), space is reduced compared to O(n × m) DP table.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you reconstruct the actual sequence of lines (i.e., matched indices)?
  *Hint: Use parent pointers or trace back from the DP table.*

- What if elements aren't unique and you want all possible maximum sets?
  *Hint: Consider combinations and deduplication, but output count only.*

- Can you optimize space even further for streaming data?
  *Hint: If order can be relaxed, try greedy/hashtable, but with ordering, rolling DP is optimal.*

### Summary
- This problem is an exact application of the **Dynamic Programming - Longest Common Subsequence (LCS)** pattern.
- The optimization for space (rolling arrays) is typical for LCS when only the result, not the actual paths, are needed.
- Common in bioinformatics (sequence alignment), diff comparison algorithms, and many interview DP questions.