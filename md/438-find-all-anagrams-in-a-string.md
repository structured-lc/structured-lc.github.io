### Leetcode 438 (Medium): Find All Anagrams in a String [Practice](https://leetcode.com/problems/find-all-anagrams-in-a-string)

### Description

Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`. You may return the answer in any order.

An **anagram** is a permutation of characters. For this problem, an anagram of string `p` must use all the characters in `p` exactly once, in any order.

### Examples

**Example 1:**
Input: `s = "abab"`, `p = "ab"`
Output: ``
*Explanation:*

- The substring starting at index 0 is `"ab"` → an anagram of `"ab"`
- The substring at index 1 is `"ba"` → also an anagram
- The substring at index 2 is `"ab"` → again an anagram

**Example 2:**
Input: `s = "cbaebabacd"`, `p = "abc"`
Output: ``
*Explanation:*

- `"cba"` at index 0 is an anagram.
- `"bac"` at index 6 is also an anagram.


### Thought Process (as if you're the interviewee)

We need to find all substrings in `s` that are anagrams of `p`. Two strings are anagrams if they have the same frequency of each character.

Approaches:

1. **Brute force:** Check every substring of length `len(p)` in `s` and compare with `p` using sorting or frequency count. This is slow: time complexity is O(n * k), where n is the length of `s` and k is the length of `p`.
2. **Sliding Window + Frequency Counting (Optimal):**
    - Maintain a **sliding window** of size `len(p)` and track character frequencies using a hash table or array.
    - Compare frequency counters efficiently as the window slides forward.
    - Each character is processed only twice (added and removed), so total time is O(n).

This sliding window technique is the best trade-off for time and space efficiency here.

### Corner cases to consider

- `p` is longer than `s` → return []
- Empty strings → []
- Single character string `s` or `p`
- No valid anagrams present
- `s` equals `p` exactly
- All characters in `s` are the same


### Solution

```python
def findAnagrams(s, p):
    if len(p) > len(s):
        return []

    from collections import Counter

    # Frequency of characters in p
    p_count = Counter(p)
    window_count = Counter()

    result = []
    window_size = len(p)

    for i in range(len(s)):
        # Add current character to the window
        window_count[s[i]] += 1

        # Maintain window of size 'window_size'
        if i >= window_size:
            left_char = s[i - window_size]
            window_count[left_char] -= 1
            if window_count[left_char] == 0:
                del window_count[left_char]

        # Compare frequency maps
        if window_count == p_count:
            result.append(i - window_size + 1)

    return result
```


### Time and Space Complexity Analysis

- **Time Complexity:** O(n), where n is the length of `s`.
We iterate over `s` once, and frequency counter comparison takes O(1) due to fixed alphabet size (26 lowercase letters).
- **Space Complexity:** O(1)
Frequency arrays (or hash maps) are of fixed size—26 lowercase English letters—so they consume constant space regardless of input size.


### Potential follow-up questions (as if you're the interviewer)

- **What if the input contains Unicode characters, not just lowercase English letters?**
*Hint:* Replace fixed-size arrays with HashMaps (like `collections.Counter`) to handle arbitrary characters.
- **How would you find all substrings of `s` that are anagrams of any length (not fixed to `p`)?**
*Hint:* You may need to vary window sizes dynamically or use more complex strategies like backtracking.
- **Can you optimize memory usage further?**
*Hint:* Consider mutable arrays instead of hash maps to save object overhead; think about in-place updates.


### Summary

This problem is a textbook sliding window + frequency counting task. We learned how to efficiently detect anagrams using a rolling window and character count maps. The pattern appears frequently in substring search, pattern matching, and problems requiring frequency analysis. Mastering it sets the foundation for solving similar window-search questions quickly and robustly.