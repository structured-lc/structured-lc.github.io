### Leetcode 521 (Easy): Longest Uncommon Subsequence I [Practice](https://leetcode.com/problems/longest-uncommon-subsequence-i)

### Description  
Given two strings **a** and **b**, you are to find the length of the **longest uncommon subsequence** between them.  
An *uncommon subsequence* is a string that is a subsequence of either **a** or **b**, but not both.  
Return the length of the longest such subsequence. If no such subsequence exists (i.e., if the two strings are identical), return -1.

### Examples  

**Example 1:**  
Input: `a = "aba", b = "cdc"`  
Output: `3`  
*Explanation: "aba" is not a subsequence of "cdc", and vice versa. The longest uncommon subsequence has length 3.*

**Example 2:**  
Input: `a = "aaa", b = "bbb"`  
Output: `3`  
*Explanation: "aaa" is not a subsequence of "bbb", and vice versa. Both are longest uncommon subsequences, length 3.*

**Example 3:**  
Input: `a = "aaa", b = "aaa"`  
Output: `-1`  
*Explanation: Both strings are identical. Every subsequence of one is a subsequence of the other, so there is no uncommon subsequence.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force Idea:**  
  Consider all possible subsequences of both strings, and check which is not a subsequence of the other, keeping track of the longest.  
  - This idea is impractical as the number of subsequences for a string of length n is 2ⁿ, which will not scale.

- **Observation:**  
  If two strings are *identical*, then every subsequence of one is a subsequence of the other, so there is no uncommon subsequence; answer is -1.

- **Key Optimization:**  
  - If the strings are **not equal**, then the longer string itself cannot be a subsequence of the shorter (unless they are equal in length).  
  - If the strings are *not* the same, then the entire string of longer length is itself an uncommon subsequence.  
  - So, the answer is simply the length of the longer string if a ≠ b, and -1 if a == b.

- **Why this works:**  
  A string is always a subsequence of itself. If the two strings differ, the entire string (either **a** or **b**) is not a subsequence of the other, especially if their lengths differ or any character differs.

### Corner cases to consider  
- Both strings are empty ("", ""): Not possible as per constraints (1 ≤ a.length, b.length ≤ 100).
- Both strings are identical.
- Strings of different lengths but overlapping content.
- One string is a single character.
- Large strings at maximum size with all characters same or all different.

### Solution

```python
def findLUSlength(a: str, b: str) -> int:
    # If the two strings are identical, no uncommon subsequence possible
    if a == b:
        return -1
    # Otherwise, the longer string itself is the longest uncommon subsequence
    return max(len(a), len(b))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(max(m, n)), where m and n are the lengths of a and b.
  - Only a string comparison and length calculation are performed.
- **Space Complexity:** O(1)
  - No additional space other than variables for string lengths.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you were given more than two strings?  
  *Hint: Think about finding a string that is not a subsequence of any of the others.*

- Can you write a function to check if one string is a subsequence of another?  
  *Hint: Use two pointers to try to match all characters.*

- What if the problem were to return the uncommon subsequence itself, not just the length?  
  *Hint: Return the string itself if a ≠ b, else return "".*

### Summary
This approach leverages the simple property that if two strings are not equal, the longer one itself is an uncommon subsequence.  
This pattern of direct string comparison and maximal property can be applied in other subsequence-based problems when the definitions allow.  
No advanced search or dynamic programming is needed for this variant. The solution is optimal and concise.