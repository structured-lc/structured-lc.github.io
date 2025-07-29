### Leetcode 2982 (Medium): Find Longest Special Substring That Occurs Thrice II [Practice](https://leetcode.com/problems/find-longest-special-substring-that-occurs-thrice-ii)

### Description  
Given a string s consisting of only lowercase English letters, find the length of the longest "special" substring that appears in s at least three times.  
A substring is "special" if it is made up of only one repeating character (e.g., "aaa", "bbbb"), is contiguous, and non-empty.  
Return the maximum possible length for such a substring, or -1 if no special substring appears three or more times.

### Examples  

**Example 1:**  
Input: `s = "aaaa"`  
Output: `2`  
Explanation:  
The substring "aa" (positions 0-1, 1-2, and 2-3) appears three times. All special substrings of length 2 are "aa", and it occurs three times in "aaaa". No longer special substring fits the criterion.

**Example 2:**  
Input: `s = "abcdef"`  
Output: `-1`  
Explanation:  
There are no special substrings that occur at least three times.

**Example 3:**  
Input: `s = "abcaba"`  
Output: `1`  
Explanation:  
The special substring "a" occurs three times (positions 0, 3, and 5).

### Thought Process (as if you’re the interviewee)  
- First, a brute-force approach: For every possible substring, check if it's special and count its occurrences. But with n ≤ 5×10⁵, this is much too slow.
- Key insight: Special substrings only consist of repeated single letters. For any letter, all “special substrings” look like “a”, “aa”, “aaa”, up to the maximum consecutive streak of that letter in s.
- For each character a–z:
  - Record all maximal runs of the character (with start, end, and length).
  - For each possible length l from the maximal run down to 1:
    - Count how many times a substring of that length appears (sliding window within the runs).
    - As soon as a length appears at least three times, record/compare that l.
  - Return the maximum possible l across all characters.
- This runs in O(26n) = O(n), since each character and each index is visited only a few times.

### Corner cases to consider  
- Empty string or string of length < 3
- No character occurs three times
- Multiple possible answers: return the **maximum** length
- The answer substring appears three times but overlaps (overlaps are allowed, since substrings can overlap)
- All characters are the same
- The string contains only two distinct characters

### Solution

```python
def maximumLength(s: str) -> int:
    n = len(s)
    max_len = -1

    # For each character a–z
    for ch in set(s):
        runs = []
        i = 0
        # Collect all runs of ch
        while i < n:
            if s[i] == ch:
                j = i
                while j < n and s[j] == ch:
                    j += 1
                runs.append(j - i)
                i = j
            else:
                i += 1

        # Count number of possible substrings of each length l
        count_by_length = {}
        for run in runs:
            for l in range(1, run + 1):
                count_by_length[l] = count_by_length.get(l, 0) + run - l + 1

        # For this character, try the longest l down to 1 that occurs at least 3 times
        for l in sorted(count_by_length.keys(), reverse=True):
            if count_by_length[l] >= 3:
                max_len = max(max_len, l)
                break  # no need to check shorter l for this character

    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  For each character, every index is traversed at most a few times, and only up to 26 characters.
- **Space Complexity:** O(n)  
  At most O(n) needed to store runs and counts for each character.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to output the substring(s) themselves, not just the length?  
  *Hint: Track the start indices or the actual substrings when counting occurrences.*

- Could you solve it with O(1) space?  
  *Hint: Carefully think about reusing counters and only maintaining necessary current state as you scan.*

- How would your approach change if the substring could contain more than one character?  
  *Hint: Suffix automaton or rolling hash is usually needed for arbitrary substrings.*

### Summary
This is a variant of the sliding window / run-length encoding pattern, where we exploit the fact that special substrings consist of a single repeated character. The solution builds upon grouping runs and sliding over their repetition windows, a neat trick for single-character substring counting.  
The run-length technique is common in string compression, substring occurrence, and any “repeated letter” substring problem.