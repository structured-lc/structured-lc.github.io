### Leetcode 3713 (Medium): Longest Balanced Substring I [Practice](https://leetcode.com/problems/longest-balanced-substring-i)

### Description  
Given a string `s` consisting only of lowercase English letters, find the length of the longest **balanced** substring.  
A substring is **balanced** if, for every distinct character in it, their counts are all equal.  
For example:  
- In `"abba"`, both 'a' and 'b' appear twice.  
- In `"zzabccy"`, the substring `"abcc"` contains 'a', 'b', 'c', 'c'. Counts for 'a' and 'b' are 1, for 'c' is 2: *not balanced*.  
The task: **Return the length of the longest balanced substring.** Substrings must be contiguous.

### Examples  

**Example 1:**  
Input: `s = "abba"`  
Output: `4`  
*Explanation: The whole string "abba" is balanced since both 'a' and 'b' occur 2 times.*

**Example 2:**  
Input: `s = "zzabccy"`  
Output: `4`  
*Explanation: "abcc" is not balanced, but "zzab" ('z':2, 'a':1, 'b':1) is not. However, "abcc" or "bccy" are not balanced. The longest balanced substring is of length 4 (for example "zzab" or "bacc").*

**Example 3:**  
Input: `s = "aaabbbcc"`  
Output: `6`  
*Explanation: "aaabbb" ('a':3, 'b':3) is balanced with length 6. "bbcc" ('b':2, 'c':2) is balanced with length 4, but not longer.*

### Thought Process (as if you’re the interviewee)  
- Brute-force: Try all substrings, for each check frequencies of their characters. For each substring, use a frequency map and check if all non-zero counts are equal. This would be O(n³) (O(n²) substrings, inside O(n) per substring for freq map).
- Optimize:  
  - We want to reduce checking substring frequencies.
  - Use a sliding window or prefix sums to speed up count extraction.  
  - Build a prefix frequency table per character, so for any [i, j] you can compute counts for each character in O(1).
  - For all (start, end) pairs (where start ≤ end), compute frequencies using prefix difference. Check if nonzero counts are the same.
  - This brings time to O(n² × 26) = O(n²) (since alphabet size is 26).
- Final approach:  
  - Build prefix frequency arrays.
  - For each substring (start, end):
    - Get frequency of each character via prefix.
    - If all nonzero counts are equal, update max length.
  - This is feasible for n ≤ 1000.

### Corner cases to consider  
- Entire string is balanced (return n).
- No balanced substring exists (return 0).
- Only one unique character (balance is always true).
- Empty string.
- Multiple balanced substrings of the same max length.
- String with more than two unique characters.
- Overlapping balanced substrings.

### Solution

```python
def longestBalancedSubstring(s: str) -> int:
    n = len(s)
    # prefix_counts[i][ch] = count of ch in s[:i]
    prefix_counts = [[0]*26 for _ in range(n+1)]

    for i in range(n):
        for j in range(26):
            prefix_counts[i+1][j] = prefix_counts[i][j]
        ch = ord(s[i]) - ord('a')
        prefix_counts[i+1][ch] += 1

    max_len = 0

    # Check all substrings
    for start in range(n):
        for end in range(start+1, n+1):
            freq = []
            for ch in range(26):
                cnt = prefix_counts[end][ch] - prefix_counts[start][ch]
                if cnt > 0:
                    freq.append(cnt)
            # If all nonzero counts are the same
            if freq and all(x == freq[0] for x in freq):
                max_len = max(max_len, end-start)
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × 26)  
  For each substring (`n²` pairs), you check up to 26 character frequencies.
- **Space Complexity:** O(n × 26)  
  For prefix frequency table. Negligible extra space for counters.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize space if only two distinct characters are allowed?  
  *Hint: Use two counters in sliding window logic.*

- If we need the actual substring(s), not just length, how would you extract them all?  
  *Hint: Store (start, end) indices when updating max length.*

- Can you solve this in O(n) for binary strings?  
  *Hint: Try counting and balancing as you move through the string like "longest valid parentheses".*

### Summary
- Used **prefix counts** and frequency equality check to spot balanced substrings.
- The pattern here is "frequency matching in substrings", a common problem in anagrams, subarray sum, and sliding window techniques.
- Useful in problems requiring count balancing or substring scans, like "Longest Equal Frequency Substring", "Longest Subarray with Equal Elements", etc.


### Flashcard
Use prefix frequency arrays for each character; for any substring [i, j], compute character counts in O(1) and check if all non-zero counts are equal.

### Tags
Hash Table(#hash-table), String(#string), Counting(#counting), Enumeration(#enumeration)

### Similar Problems
