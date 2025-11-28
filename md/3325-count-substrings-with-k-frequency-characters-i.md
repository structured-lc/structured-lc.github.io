### Leetcode 3325 (Medium): Count Substrings With K-Frequency Characters I [Practice](https://leetcode.com/problems/count-substrings-with-k-frequency-characters-i)

### Description  
Given a string **s** and an integer **k**, count the number of substrings of **s** where *at least one* character appears *at least* **k** times. The substring must be continuous, but any length—including single character substrings—are considered.

This means, for any substring, as long as there is at least one character in that substring that appears ≥ k times within that substring, you count it.

### Examples  

**Example 1:**  
Input: `s = "abacb", k = 2`  
Output: `4`  
Explanation:  
Valid substrings are:
- `"aba"` ('a' appears 2 times)
- `"abac"` ('a' appears 2 times)
- `"abacb"` ('a' appears 2 times)
- `"bacb"` ('b' appears 2 times)

**Example 2:**  
Input: `s = "abcde", k = 1`  
Output: `15`  
Explanation:  
Every substring is valid, since each character appears at least once within itself. In total, for a string of length 5, there are 15 substrings (n × (n+1) / 2).

**Example 3:**  
Input: `s = "aaabb", k = 3`  
Output: `3`  
Explanation:  
Valid substrings are:
- `"aaa"` ('a' appears 3 times)
- `"aaab"` ('a' appears 3 times)
- `"aabbb"` ('b' appears 3 times)

### Thought Process (as if you’re the interviewee)  
First, brute-force:  
- Try all possible substrings.
- For each, count the frequency of each character.
- Check if any character occurs at least k times.  
This is O(n³): N² substrings, each requiring up to O(N) to count.

To optimize:
- We need to cut down substring examination.
- Use the **sliding window** technique: For each start index l, expand right end r to scan all substrings starting at l. Maintain a count of characters in the current window.
- For each extension, check if any count reaches k. Once a character count in the window is ≥ k, then all further extensions (increasing r) will also be valid, so we can count those in bulk.
- Move l forward to find other possible substrings.

Trade-offs:
- Sliding window reduces repeated counting.
- Still may have O(26*N²) since for every substring, you maintain a counter for 26 characters.
- However, for small alphabets (lowercase English), updating the counter is effectively constant time.

### Corner cases to consider  
- Empty string or k > len(s) ⟶ should return 0
- k == 1, every substring is valid!
- All characters same, k up to length of s
- All characters unique, only substrings with length ≥ k can possibly be valid
- s length 1, k == 1

### Solution

```python
def count_substrings_with_k_freq(s: str, k: int) -> int:
    n = len(s)
    res = 0
    for l in range(n):
        freq = [0] * 26  # to count each letter
        # For every possible substring starting at l, expand r
        for r in range(l, n):
            idx = ord(s[r]) - ord('a')
            freq[idx] += 1
            # As soon as any char reaches k, this substring is valid
            if freq[idx] == k:
                res += 1
            # For substrings past the first character who reached k,
            # adding more will not increase count for older reaching chars,
            # but for every new char that reaches k, it's valid.
            # We only increment on == k to avoid double counting.
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²).  
  For each of the n starting positions, we extend to all n end positions. Counting and updating the frequency array for each expansion is O(1) due to the fixed alphabet (26 lowercase letters).

- **Space Complexity:** O(1).  
  The only extra storage is a frequency array of size 26, which does not scale with n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if s contained unicode or all ASCII characters (not just lowercase)?
  *Hint: The frequency array size would increase; how would this affect time and space?*

- Can this be solved in subquadratic time if k is large?
  *Hint: Can you exploit the property that only substrings of length ≥ k are valid?*

- What if you needed to find substrings where *every* character appears at least k times?
  *Hint: Consider a divide and conquer or recursive approach.*

### Summary
This problem is a classic use-case of the sliding window technique with character frequencies: for every substring, maintain a window and check the frequency condition. The key patterns are sliding window for substring enumeration, and frequency counting for constraint checking. This approach is broadly applicable in substring problems with frequency or uniqueness requirements, such as "Longest Substring with At Least K Repeating Characters," "Substring with at most K Distinct Characters," and related string analysis problems.


### Flashcard
Sliding window with character frequency map; for each left position, expand right until some character reaches frequency k, then count valid substrings by shrinking left.

### Tags
Hash Table(#hash-table), String(#string), Sliding Window(#sliding-window)

### Similar Problems
