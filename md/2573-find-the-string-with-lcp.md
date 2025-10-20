### Leetcode 2573 (Hard): Find the String with LCP [Practice](https://leetcode.com/problems/find-the-string-with-lcp)

### Description  
Given an n × n integer matrix `lcp`, where `lcp[i][j]` means the length of the **longest common prefix** between the suffixes of a string `s` starting at positions `i` and `j`, construct and return the **lexicographically smallest string** which matches the given `lcp` matrix. If no such string exists, return an empty string.

- The string must use lowercase English letters only.
- Example: If `lcp[1][2] = 3` and the resulting string is "ababa", then `s[1:] = "baba"` and `s[2:] = "aba"` have a common prefix "aba", so the value 3 is correct.

### Examples  

**Example 1:**  
Input: `lcp = [[3,0,0],[0,2,0],[0,0,1]]`  
Output: `"abc"`  
*Explanation: Each character is unique, so the longest common prefix between any pair of different indices is 0, and the diagonal is the full length: lcp[i][i] = n-i.*

**Example 2:**  
Input: `lcp = [[3,2,1],[2,2,1],[1,1,1]]`  
Output: `"aaa"`  
*Explanation: All characters are the same, so every pair of suffixes have the maximum possible overlap.*

**Example 3:**  
Input: `lcp = [[1,0],[0,1]]`  
Output: `"ab"`  
*Explanation: Since lcp[1]=0, s ≠ s[1], so "ab" or "ba". Lexicographically "ab" is smallest.*

**Example 4:**  
Input: `lcp = [[2,1],[1,2]]`  
Output: `"aa"`  
*Explanation: Both must be the same.*

**Example 5:**  
Input: `lcp = [[2,0],[0,1]]`  
Output: `"ab"`  
*Explanation: lcp=2 (two chars remain starting at 0), lcp[1]=0 (first letter different); "ab" is valid.*

**Example 6:**  
Input: `lcp = [[2,0],[0,1]]`  
Output: `"ab"`  
*Explanation: Similar to above.*

### Thought Process (as if you’re the interviewee)  
First, observe what the lcp matrix means: lcp[i][j] is the length of the longest shared prefix between s[i:] and s[j:].  
- The diagonal lcp[i][i] must be n-i (the remaining suffix).
- lcp[i][j] ≥ 0, and for all i,j: lcp[i][j] = lcp[j][i].

**Brute-force:**  
Try all possible strings, check validity; clearly intractable for n up to 1000.

**Greedy coloring + validation:**  
- To maximize lexicographical order, assign 'a' wherever possible.
- If lcp[i][j] > 0, then s[i] == s[j]. Group indices using union-find or similar so that points with lcp[i][j]>0 are forced to be the same letter.
- For each "character block", assign letters starting from 'a'.
- After assignment, validate all constraints of the lcp matrix: the lcp of any suffix-pair matches the matrix.

**Validation step:**  
- For each i, j:  
  - If s[i] == s[j], then lcp[i][j] should be length of matching suffix — recursively, lcp[i+1][j+1]+1, unless i or j runs out, in which case only 1 if the suffix is length 1.
  - If s[i] ≠ s[j], then lcp[i][j] == 0.

**Why this works:**  
- The grouping ensures all required matches; the validation ensures no illegal overlap.
- Always choose the lexicographically smallest letter still available for each group.

**Trade-offs:**  
- Simple greedy assignment could violate lcp if validation isn’t performed. Hence full validation is mandatory.

### Corner cases to consider  
- n = 1 (single letter).
- lcp[i][j] > min(lcp[i+1][j+1])+1 (invalid grid).
- Isolated indices (letters forced to be different).
- Max 26 groups (letters).
- Contradictory diagonal (e.g. lcp[i][i] ≠ n-i).
- Symmetry: lcp[i][j] must equal lcp[j][i].
- Unfillable (more than 26 groups).

### Solution

```python
def findTheString(lcp):
    n = len(lcp)
    # Step 1: Build group components -- indices needing the same letter
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        px, py = find(x), find(y)
        if px != py:
            parent[py] = px

    # If lcp[i][j] > 0, then s[i] == s[j]
    for i in range(n):
        for j in range(n):
            if lcp[i][j] > 0:
                union(i, j)

    # Assign characters to groups, using lexicographically smallest possible letters
    groups = {}
    ch = ord('a')
    res = [''] * n
    for i in range(n):
        g = find(i)
        if g not in groups:
            if ch > ord('z'):
                return ""
            groups[g] = chr(ch)
            ch += 1
        res[i] = groups[g]

    s = ''.join(res)
    # Step 2: Validate s against lcp
    for i in range(n):
        for j in range(n):
            # Calculate LCP of s[i:] vs s[j:]
            l = 0
            while i + l < n and j + l < n and s[i + l] == s[j + l]:
                l += 1
            if lcp[i][j] != l:
                return ""
    return s
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) — For union-find, assigning characters and validation check for each pair (i, j).
- **Space Complexity:** O(n) — For parent array, group map, and resulting string. O(n²) for input lcp matrix.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need the largest lexicographical string given lcp?
  *Hint: Assign 'z' then 'y' etc.*

- How would you optimize if n were very large (e.g., greater than 10⁵)?
  *Hint: How to avoid O(n²): lcp is too big; is input sparse?*

- If you were given a partially-filled lcp, how would you reconstruct possible strings?
  *Hint: Consider minimal addition and maximal ambiguity.*

### Summary
This problem is a variant of **graph grouping (union-find/connected components)** with lexicographical string construction and a rigorous full-matrix validation. The solution relies on grouping all indices that must have the same character, greedily assigning the minimal available character, and then strictly validating the entirety of the resulting string against all lcp constraints.  
This pattern (group-and-color, then validate) is common in string reconstruction, equivalence class coloring, and constraint satisfaction problems.


### Flashcard
Assign characters greedily based on lcp constraints; validate that the constructed string matches the given lcp matrix.

### Tags
Array(#array), String(#string), Dynamic Programming(#dynamic-programming), Greedy(#greedy), Union Find(#union-find), Matrix(#matrix)

### Similar Problems
