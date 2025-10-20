### Leetcode 72 (Medium): Edit Distance [Practice](https://leetcode.com/problems/edit-distance)

### Description  
Given two strings, **word1** and **word2**, compute the *minimum number of operations* required to convert **word1** into **word2**.  
Allowed operations are:
- **Insert** a character
- **Delete** a character
- **Replace** a character  
Each operation counts as 1 step.  
Return the minimum number of steps needed to convert **word1** to **word2**.

### Examples  

**Example 1:**  
Input: `word1 = "horse", word2 = "ros"`  
Output: `3`  
*Explanation:*
- Replace 'h' with 'r': "rorse"
- Delete 'r': "rose"
- Delete 'e': "ros"

**Example 2:**  
Input: `word1 = "intention", word2 = "execution"`  
Output: `5`  
*Explanation:*
- Insert 'e': "eintention"
- Replace 'i' with 'x': "exntention"
- Delete 'n': "extention"
- Replace 't' with 'c': "exection"
- Insert 'u': "execution"

**Example 3:**  
Input: `word1 = "", word2 = "abc"`  
Output: `3`  
*Explanation:* Insert 'a', 'b', 'c' (3 operations)

### Thought Process (as if you’re the interviewee)

Start by thinking about the brute-force way:  
For each character position, for every mismatch between **word1** and **word2**, recursively try all possible operations (insert, delete, replace).  
However, this leads to many overlapping subproblems. So, use **Dynamic Programming** to save results.

Key idea:  
- Let dp\[i\]\[j\] be the minimum edits needed to convert the first *i* chars of **word1** to first *j* chars of **word2**.
- **Base cases:**
  - If **word1** is empty (i=0), we need j inserts.
  - If **word2** is empty (j=0), we need i deletes.
- If the last characters match, no operation needed: dp\[i-1\]\[j-1\].
- If they don't, consider:
  - Insert (dp\[i\]\[j−1\] + 1)
  - Delete (dp\[i-1\]\[j\] + 1)
  - Replace (dp\[i-1\]\[j-1\] + 1)
  Take the minimum.

The DP table approach is efficient and easy to reason about. Space can be optimized to O(min(m,n)) if needed, but a full matrix is simplest to code and debug.

### Corner cases to consider  
- Both strings are empty: Output = 0  
- One string empty: Output = length of the other (all inserts or deletes)  
- Strings are already equal: Output = 0  
- All characters different: Output = max(len(word1), len(word2)) (need a replace for each or combination of delete/insert)  
- Very long strings (test for efficiency)

### Solution

```python
def minDistance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)

    # dp[i][j]: min operations to convert word1[:i] to word2[:j]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Initialize for empty word cases
    for i in range(m + 1):
        dp[i][0] = i   # delete all characters from word1
    for j in range(n + 1):
        dp[0][j] = j   # insert all characters to word1 to make word2

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                # Characters match, no extra operation needed
                dp[i][j] = dp[i - 1][j - 1]
            else:
                # 1 + min of insert, delete, replace
                dp[i][j] = 1 + min(
                    dp[i - 1][j],    # delete
                    dp[i][j - 1],    # insert
                    dp[i - 1][j - 1] # replace
                )
    return dp[m][n]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where *m* = len(word1), *n* = len(word2).  
  We fill each cell in a (m+1) × (n+1) matrix exactly once.

- **Space Complexity:** O(m × n) for the DP table.  
  Can be optimized to O(min(m, n)) by only remembering two rows at a time.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you optimize the space usage in your DP solution?
  *Hint: Do you really need the full matrix at once?*

- What if the cost for replace, insert, and delete operations were different?
  *Hint: How would your recurrence relation change?*

- Can you return not just the minimum edit distance but also the actual sequence of edits?
  *Hint: Add a parent-pointer or trace-back path while filling the table.*

### Summary
This problem is a classic example of **Dynamic Programming** applied to string transformation. The pattern—breaking down a problem into subproblems and building up a solution via a DP table—is standard in edit/sequence problems (like Longest Common Subsequence).  
You can reuse this approach for spell checking, DNA/protein sequence analysis, and many other applications involving string transformations.


### Flashcard
DP: let dp[i][j] be min edits to convert first i chars of word1 to first j of word2; fill table using insert, delete, replace.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- One Edit Distance(one-edit-distance) (Medium)
- Delete Operation for Two Strings(delete-operation-for-two-strings) (Medium)
- Minimum ASCII Delete Sum for Two Strings(minimum-ascii-delete-sum-for-two-strings) (Medium)
- Uncrossed Lines(uncrossed-lines) (Medium)
- Minimum White Tiles After Covering With Carpets(minimum-white-tiles-after-covering-with-carpets) (Hard)
- Longest Palindrome After Substring Concatenation II(longest-palindrome-after-substring-concatenation-ii) (Hard)
- Minimum Steps to Convert String with Operations(minimum-steps-to-convert-string-with-operations) (Hard)