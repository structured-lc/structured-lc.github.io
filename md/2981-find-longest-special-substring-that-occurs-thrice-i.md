### Leetcode 2981 (Medium): Find Longest Special Substring That Occurs Thrice I  [Practice](https://leetcode.com/problems/find-longest-special-substring-that-occurs-thrice-i)

### Description  
Given a string s of lowercase English letters, find the length of the **longest special substring** (a non-empty substring made of a single repeated character, e.g., "aa") that occurs **at least three times** (overlapping is allowed). If no such substring exists, return -1.

### Examples  

**Example 1:**  
Input: `s = "aaaa"`  
Output: `2`  
Explanation:  
"aa" appears in positions 0–1, 1–2, and 2–3. All are overlapping but count as valid, as each is contiguous:  
- "aa" at [0,1], [1,2], [2,3].  
Longest such substring: length 2.

**Example 2:**  
Input: `s = "abcdef"`  
Output: `-1`  
Explanation:  
No special substring (a repeated single char) occurs at least thrice.

**Example 3:**  
Input: `s = "abcaba"`  
Output: `1`  
Explanation:  
Only "a" occurs at least 3 times (positions 0, 3, 5).

### Thought Process (as if you’re the interviewee)  
First, brute-force:  
- For all possible substring lengths from len(s) down to 1,  
- For each possible character 'a' to 'z',  
- Slide a window of that length, count how many times a substring of all that character appears.  
- As soon as you find one that appears at least 3 times, return its length.

But brute-force is potentially O(n³), which isn’t needed since n ≤ 50, but can optimize:

Optimized plan:
- For each possible length l (from len(s) down to 1), and each letter c,  
- Count all substrings of length l of only c in s.  
- Can do this by sliding window and checking if window is filled with c.

At first l, c where count ≥ 3, return l. If loop finishes, return -1.

This approach ensures highest length is found first.  
Only need a single pass per window size per character.

**Tradeoffs:**  
- For n ≤ 50, this is feasible.  
- Very efficient for problem constraints.

### Corner cases to consider  
- All letters distinct, e.g. "abc" ⇒ no solution, return -1  
- All letters the same, e.g. "aaaaa" ⇒ several overlapping substrings, should return maximal possible  
- Minimal length: "aba" ⇒ single characters only  
- Overlapping substrings—must count all valid occurrences (not just non-overlapping)  
- Letters appearing exactly twice—do not qualify

### Solution

```python
def maximumLength(s: str) -> int:
    n = len(s)
    ans = -1
    # Try all possible lengths from n down to 1
    for l in range(n, 0, -1):
        # For each letter 'a' to 'z'
        for c in set(s):  # only check letters that are present in s
            count = 0
            # Sliding window of size l
            for i in range(n - l + 1):
                if all(ch == c for ch in s[i:i+l]):
                    count += 1
            if count >= 3:
                return l
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(26 × n²), where n = length of s (max 50).  
  - For each length l (≤ n), for each letter, slide a window (O(n)), and check l characters (O(l)). But overall, constants and size are small.

- **Space Complexity:** O(1) extra (excluding input), as only counters and variables are used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want substrings of at least k length, or appearing at least k times (generalize 3)?
  *Hint: Add parameters for length or count; adjust the condition.*

- What if "special" allowed at most 2 different characters?
  *Hint: Use a frequency counter in the window instead of all-equal check.*

- What if string size n is large (~10⁵)? How would you optimize further?
  *Hint: Use more advanced algorithms such as prefix sums, hashing, or run-length encoding.*

### Summary
A classic sliding window with character frequency check, iterating by decreasing substring size to ensure the largest valid substring is found first.  
This pattern—enumerate substring lengths, use sliding window, validate with simple checks—is common for substring counting problems with small input.  
For larger inputs, adapt via prefix sums, hashing, or precomputing runs ("run-length encoding") for efficiency.


### Flashcard
For each length from n down to 1, iterate through characters a-z and count consecutive runs of that character with that exact length. Return the first length where any character appears ≥3 times.

### Tags
Hash Table(#hash-table), String(#string), Binary Search(#binary-search), Sliding Window(#sliding-window), Counting(#counting)

### Similar Problems
- Longest Substring Without Repeating Characters(longest-substring-without-repeating-characters) (Medium)
- Longest Substring with At Least K Repeating Characters(longest-substring-with-at-least-k-repeating-characters) (Medium)