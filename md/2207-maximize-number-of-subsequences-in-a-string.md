### Leetcode 2207 (Medium): Maximize Number of Subsequences in a String [Practice](https://leetcode.com/problems/maximize-number-of-subsequences-in-a-string)

### Description  
Given a string `text` and a 2-letter string `pattern`, you can insert *exactly one* character, which is either `pattern` or `pattern[1]`, at *any* position (including the very start or end) in `text`.  
**Return the maximum number of times `pattern` can appear as a subsequence** in the resulting string.  
A *subsequence* is a sequence that can be derived from another string by deleting zero or more characters, without changing the order of the remaining characters.

### Examples  

**Example 1:**  
Input: `text = "abdcdbc"`, `pattern = "ac"`  
Output: `4`  
*Explanation: Insert 'a' at the start or 'c' at the end to maximize the number of `"ac"` subsequences. Both produce 4:*
- Insert 'a' at start: `"aabdcdbc"`: all original 'a's can pair with all 'c's after them in the string (2 × 2 = 4).

**Example 2:**  
Input: `text = "aabb"`, `pattern = "ab"`  
Output: `6`  
*Explanation: Insert 'a' at the start or 'b' at the end. Both maximize number of `"ab"`:*
- Insert 'a' at start: `"aaabb"`: new 'a' increases 'a' count (new pairs).
- Insert 'b' at end: `"aabbb"` (same result). Number of subsequences: number of 'a's × number of 'b's = 3 × 2 = 6.

**Example 3:**  
Input: `text = "aaa"`, `pattern = "aa"`  
Output: `6`  
*Explanation: Inserting either 'a' at start or end, total 'a's is 4. Number of `"aa"` subsequences: choose any two out of four (⟶ 4 × 3 / 2 = 6).*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Try inserting either `pattern` at each position or `pattern[1]` at each position, then for each resulting string, count number of times `pattern` appears as a subsequence.  
  This is *very inefficient* (O(n²)) — we need a better approach.
  
- **Observation:**  
  Since insert only one character, and we're maximizing subsequences:  
  - Inserting `pattern` at start (maximizes the number of leading pattern's, which can pair with all following pattern[1]s).
  - Inserting `pattern[1]` at end (maximizes the number of trailing pattern[1]'s, which can be paired with all previous patterns).
  We only need to check two scenarios: insert pattern at start, or pattern[1] at end.

- **How to count pairs?**  
  Iterate through string:
   - For each occurrence of pattern[1], count how many pattern were seen before.
   - Total original subsequences = sum for all pattern[1]s: (patterns seen before each)
   - 
  - After simulation, the additional insertion gives max:
    - If insert pattern once: add one more pattern (pairs with all existing pattern[1]s).
    - If insert pattern[1] once: pairs with all existing patterns.
  - Final answer: original subsequences + max(number of pattern, number of pattern[1])

- **Tradeoff:**  
  Only O(n) time; no extra storage except a few counters. Very efficient.

### Corner cases to consider  
- Empty string (`text == ""`)
- `pattern == pattern[1]` (e.g., both 'a')
- No occurrences of pattern or pattern[1] in `text`
- All characters in `text` are `pattern` or all are `pattern[1]`
- `pattern` not found as subsequence initially

### Solution

```python
def maximumSubsequenceCount(text: str, pattern: str) -> int:
    # Count for the subsequences pattern[0] + pattern[1]
    total = 0
    count_first = 0  # Number of pattern[0] seen so far
    count_second = 0 # Number of pattern[1] seen so far

    # Loop to count current pattern subsequences
    for char in text:
        if char == pattern[1]:
            total += count_first  # every pattern[0] before current pattern[1] forms a subsequence
            count_second += 1
        if char == pattern[0]:
            count_first += 1

    # After inserting one character, answer is the original total plus:
    # - If we insert pattern[0]: it can pair with all existing pattern[1]s (at the start)
    # - If we insert pattern[1]: all existing pattern[0]s can pair with it (at the end)
    return total + max(count_first, count_second)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we do a single pass over `text` and only basic counting for the rest.
- **Space Complexity:** O(1), uses only a few integer counters; no extra space required besides input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can insert up to k characters anywhere?
  *Hint: Try to generalize the approach, consider combinatorics or DP for multiple insertions.*

- How would you solve if pattern can be longer than 2?
  *Hint: Try dynamic programming for counts of each prefix of pattern as you scan text.*

- How would you solve if removal of a character was allowed?
  *Hint: Find which character, when removed, reduces overlap and maximizes count.*

### Summary
To maximize the number of 2-letter pattern subsequences after one insertion, count how many subsequences currently exist using a single pass, then consider adding either pattern or pattern[1] to maximize the new total. This approach uses the greedy, prefix counting pattern — a common technique in substring and subsequence counting problems, and similar logic can be applied where you track relationship between prefixes and current characters (works for many sliding window and prefix/suffix sum problems).