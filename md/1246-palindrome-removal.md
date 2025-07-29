### Leetcode 1246 (Hard): Palindrome Removal [Practice](https://leetcode.com/problems/palindrome-removal)

### Description  
Given an array of integers, you can remove consecutive palindromic subarrays in one move. Find the minimum number of moves needed to remove the entire array.

A subarray is "palindromic" if it reads the same forwards and backwards. At each step, you may choose any consecutive palindromic subarray and remove it (the rest of the array is concatenated).

### Examples  
**Example 1:**  
Input: `arr = [1,2]`  
Output: `2`  
*Explanation: Each number must be removed as a length-1 palindrome, so two removals.*

**Example 2:**  
Input: `arr = [1,3,4,1,5]`  
Output: `3`  
*Explanation: Remove [4], then [3], then [1,1,5]. Cannot do better in this configuration.*

**Example 3:**  
Input: `arr = [1,2,3,2,1]`  
Output: `1`  
*Explanation: Entire array is a palindrome; remove it in one move.*

### Thought Process (as if you’re the interviewee)  
This problem asks for a *minimum* over possible palindromic subarrays. It’s classic DP: dp[i][j] = minimum moves to remove arr[i..j].
- If arr[i..j] is a palindrome, dp[i][j] = 1.
- Otherwise, try all splits: dp[i][j] = min(dp[i][k] + dp[k+1][j]) for i ≤ k < j.
- Special optimization: if arr[i] == arr[j], then dp[i][j] can combine two ends when possible (like recursive palindromic matching).

### Corner cases to consider  
- Empty array (should return 0 moves)
- All elements different (all 1-length palindromes)
- All elements same (can remove at once)
- Odd/even length arrays

### Solution

```python
def minimumMoves(arr):
    n = len(arr)
    dp = [[0]*n for _ in range(n)]
    for l in range(1, n+1):  # subarray length
        for i in range(n - l + 1):
            j = i + l - 1
            if i == j:
                dp[i][j] = 1
            elif arr[i] == arr[j]:
                if i + 1 > j - 1:
                    dp[i][j] = 1  # e.g. [1, 2, 1]
                else:
                    dp[i][j] = dp[i + 1][j - 1]
            else:
                dp[i][j] = float('inf')
                for k in range(i, j):
                    dp[i][j] = min(dp[i][j], dp[i][k] + dp[k + 1][j])
    return dp[0][n - 1] if n else 0
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n³), as each subarray (O(n²)) is computed, and for each dp[i][j] all k in i…j are tested.
- **Space Complexity:** O(n²), the dp table for all subarrays (i, j).

### Potential follow-up questions (as if you’re the interviewer)  
- Can you optimize further for certain types of arrays—e.g., all elements unique or all the same?
  *Hint: You can reduce complexity for some special inputs by noticing palindrome structure.*

- How would your solution change if only palindromic *substrings* (not subarrays) could be removed?
  *Hint: With only substrings, the scope is the same, but with a string the palindrome check may be faster.*

- Can this approach be improved with memoization instead of a table? (i.e., via recursion and cache)
  *Hint: Yes, using @lru_cache can cut code length but not complexity.*

### Summary
This is a dynamic programming interval problem, similar to burst balloons, matrix multiplication, or palindrome partitioning. Keep the pattern "dp for all subarrays," trying all partitions.