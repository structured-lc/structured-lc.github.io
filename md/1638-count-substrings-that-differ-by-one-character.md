### Leetcode 1638 (Medium): Count Substrings That Differ by One Character [Practice](https://leetcode.com/problems/count-substrings-that-differ-by-one-character)

### Description  
Given two strings `s` and `t`, count the number of non-empty substrings from `s` and `t` that differ by **exactly one character**. The substrings of different lengths or starting at different positions are considered different.

### Examples  
**Example 1:**  
Input: `s = "aba", t = "baba"`  
Output: `6`  
*Explanation: Substrings differing by 1 character are: ["aba" vs "bba"], ["aba" vs "aaa"], ["aba" vs "abb"], ["a" vs "b"], etc.*

**Example 2:**  
Input: `s = "ab", t = "bb"`  
Output: `3`  
*Explanation: "a" vs "b", "ab" vs "bb", "b" vs "b" (not counted as no diff).*

**Example 3:**  
Input: `s = "a", t = "a"`  
Output: `0`  
*Explanation: There are no substrings differing by exactly one character.*

### Thought Process (as if you’re the interviewee)  
Naïve approach: Try all substrings of both strings and check if they differ by exactly 1 character. But total substrings is O(n²) for each string, so brute force is O(n²·m²), which is too slow.

Optimized approach: Fix a starting pair (i, j) in s and t, expand to the right as long as substrings differ by at most 1 character. For each alignment, count substrings ending at positions where there's exactly 1 mismatch. Increment total count accordingly. This reduces redundant checks and is feasible for short strings.

### Corner cases to consider  
- Strings are empty
- No substrings differ by one character (identical strings)
- Strings have length 1
- All characters differ

### Solution

```python
def countSubstrings(s, t):
    res = 0
    n, m = len(s), len(t)
    for i in range(n):
        for j in range(m):
            mismatch = 0
            k = 0
            while i + k < n and j + k < m:
                if s[i + k] != t[j + k]:
                    mismatch += 1
                if mismatch > 1:
                    break
                if mismatch == 1:
                    res += 1
                k += 1
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n²·m), since for every alignment, expand until strings differ at 1 or 2 places.
- **Space Complexity:** O(1), constant space used.

### Potential follow-up questions (as if you’re the interviewer)  
- Can you optimize for much longer strings?
  *Hint: Consider DP or preprocessing for longer substrings.*

- What if you wanted substrings that differ by at most k characters?
  *Hint: Generalize the inner loop for k mismatches.*

- How do overlapping substrings affect the count?
  *Hint: Each substring alignment is considered separate, even if characters overlap.*

### Summary
Sliding window plus brute force substring expansion is a common approach for substring comparison problems, especially when only one mismatch is allowed. Recognizing the alignment and early stopping with one difference is key for acceptable performance.


### Flashcard
Fix starting positions in two strings and expand substrings that differ by at most one character.

### Tags
Hash Table(#hash-table), String(#string), Dynamic Programming(#dynamic-programming), Enumeration(#enumeration)

### Similar Problems
- Count Words Obtained After Adding a Letter(count-words-obtained-after-adding-a-letter) (Medium)