### Leetcode 727 (Hard): Minimum Window Subsequence [Practice](https://leetcode.com/problems/minimum-window-subsequence)

### Description  
Given two strings, **S** and **T**, find the shortest **contiguous substring** of S such that T is a subsequence of that substring. If there is no such substring, return the empty string "". If there are multiple such substrings with the same minimum length, return the one with the left-most starting index.

A **subsequence** means all characters of T appear in order in the substring, though not necessarily consecutively.

### Examples  

**Example 1:**  
Input: `s1 = "abcdebdde", s2 = "bde"`  
Output: `"bcde"`  
Explanation: The minimal window substring is "bcde" because `b`, `d`, and `e` appear in order, and "bcde" appears before "bdde" which has the same length.

**Example 2:**  
Input: `s1 = "jmeqksfrsdcmsiwvaovztaqenprpvnbstl", s2 = "u"`  
Output: `""`  
Explanation: No window in s1 contains "u" as a subsequence. Return empty string.

**Example 3:**  
Input: `s1 = "fgrqsqsnodwmxzkzxwqegkndaa", s2 = "fnok"`  
Output: `"fgrqsqsnodwmxzk"`  
Explanation: "fgrqsqsnodwmxzk" is the shortest substring where all characters of s2 appear in order as a subsequence.


### Thought Process (as if you’re the interviewee)  
The brute-force approach would be to check all substrings of S and see if T is a subsequence of any. But this is much too slow with O(n³) time for long strings.

A better solution is to use **two pointers**:
- Start by moving a pointer `i` along S, trying to find an instance where T is fully matched as a subsequence. 
- When T is matched, scan *backwards* to find the leftmost starting position of the substring that still contains T as a subsequence.
- Track the minimum window and start position as you go.

For even better efficiency, dynamic programming can be used. Build a 2D DP array where `dp[i][j]` stores the start index in S where T[0...j] is a subsequence ending at S[i]. However, for interview code, the two-pointer greedy approach is often preferred for its clarity and reduced space usage.

### Corner cases to consider  
- Empty s1 or s2.
- s2 longer than s1.
- Characters in s2 not all present in s1.
- Multiple possible minimal windows—must pick the leftmost.
- s2 contains duplicate characters.

### Solution

```python
def minWindow(s1: str, s2: str) -> str:
    m, n = len(s1), len(s2)
    min_len = float('inf')
    start = -1

    i = 0
    while i < m:
        if s1[i] == s2[0]:
            j = 0
            k = i
            # Forward pass: try to match entire s2 as subsequence
            while k < m and j < n:
                if s1[k] == s2[j]:
                    j += 1
                k += 1

            if j == n:
                # s2 matched; now move backward to minimize window
                end = k - 1
                j -= 1
                k -= 1
                while j >= 0:
                    if s1[k] == s2[j]:
                        j -= 1
                    k -= 1
                k += 1  # leftmost start
                if end - k + 1 < min_len:
                    min_len = end - k + 1
                    start = k
            i = i + 1
        else:
            i += 1

    if start == -1:
        return ""
    return s1[start:start + min_len]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(m × n), where m = len(s1), n = len(s2). Each time we scan forward to match s2, and backward to find leftmost start, in the worst case for each character in s1.

- **Space Complexity:**  
  O(1) extra space (excluding input). The code only uses variables—not arrays that scale with input size.

### Potential follow-up questions (as if you’re the interviewer)  

- If s2 can be very large (e.g. comparable to s1), how can you optimize?
  *Hint: Consider dynamic programming with reduced space or early pruning when impossible to match.*

- How would you handle finding all such minimum windows with the same length?
  *Hint: Keep a list of all valid windows when a match is found, then compare their start indices.*

- What if you need to solve the problem in one pass?
  *Hint: It's challenging due to the need to backtrack, but possible with more pre-processing or extra space.*

### Summary
This problem uses a combination of the **two-pointer** and **greedy** approaches to scan s1 for the shortest window containing s2 as a subsequence, then tries to shrink the window from the left as much as possible. The pattern is related to advanced variations of the sliding window, and also shares ideas with subsequence dynamic programming. It’s common in substring search and window-based interview questions.


### Flashcard
Use two pointers to find each window in S containing T as a subsequence, then scan backward to minimize the window.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Sliding Window(#sliding-window)

### Similar Problems
- Minimum Window Substring(minimum-window-substring) (Hard)
- Longest Continuous Increasing Subsequence(longest-continuous-increasing-subsequence) (Easy)