### Leetcode 3083 (Easy): Existence of a Substring in a String and Its Reverse [Practice](https://leetcode.com/problems/existence-of-a-substring-in-a-string-and-its-reverse)

### Description  
Given a string s, check whether **any substring of length 2** (i.e., any pair of adjacent characters) in s also appears in the reverse of s.  
Return `True` if any such substring exists, otherwise return `False`.  
In other words: *Does there exist a 2-letter substring that can be found both in s and in s[::-1]?*

### Examples  

**Example 1:**  
Input: `s = "leetcode"`  
Output: `True`  
Explanation: Substring "ee" is present in both "leetcode" and reverse "edocteel".

**Example 2:**  
Input: `s = "abcba"`  
Output: `True`  
Explanation: Substrings "ab", "bc", "cb", "ba" all appear in the reverse "abcba" as well.

**Example 3:**  
Input: `s = "abcd"`  
Output: `False`  
Explanation: No 2-letter substring from s appears in "dcba".

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For every substring of length 2 in s, check if it exists anywhere in reverse(s). This is O(n²) since every search could take up to n time.
- **Optimize:**  
  Since substring lengths are fixed (length 2), we can precompute all substrings of length 2 from the reversed string and store them in a set. When checking substrings in original s, just see if they're in the set from the reverse.  
  This reduces most checks to O(1), overall O(n) time.

- **Trade-offs:**  
  - Direct string search (.find or .index) is more readable but may be slower than set lookups.
  - Both approaches are fine for small lengths (here, k = 2). For large k, preprocessing the reversed substrings is more optimal.

### Corner cases to consider  
- Length of s is 1: No 2-length substring exists.  
- All characters identical: e.g. "aaaa" — substrings are all "aa".
- Palindromic strings: substrings in s and s[::-1] are the same.
- No 2-letter substring shared with the reverse.
- Overlapping substrings (e.g., "aaa" has two "aa" substrings, and that matters).

### Solution

```python
def isSubstringPresent(s: str) -> bool:
    # Reverse the string
    s_rev = s[::-1]
    # Gather all substrings of length 2 from the reversed string
    rev_pairs = set()
    for i in range(len(s_rev) - 1):
        rev_pairs.add(s_rev[i:i+2])
    # For each substring of length 2 in the original string...
    for i in range(len(s) - 1):
        pair = s[i:i+2]
        # ...if it's in the set of reversed substrings, return True
        if pair in rev_pairs:
            return True
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Gathering all length-2 substrings from s and its reverse each takes O(n), set lookup is O(1) per check.

- **Space Complexity:** O(n)  
  At most O(n) substrings of length 2 in the reversed string are stored in a set.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we needed to check for substrings of length k, not just 2?  
  *Hint: How would you generalize the sliding window and set storage?*

- How to handle case-insensitive matching for substrings?  
  *Hint: Preprocess s and s[::-1] by lowercasing (or uppercasing) everything before extraction.*

- How would this change if substrings needed to be non-overlapping?  
  *Hint: Modify your window to jump size k, not by 1.*

### Summary
This problem uses the **fixed-size sliding window** and **hash set membership** approach—a common string pattern for quick substring existence queries.  
The same approach applies to detecting repeated substrings, palindrome checks, as well as substring matching with generalized window sizes, provided the substring length is small relative to the string size.

### Tags
Hash Table(#hash-table), String(#string)

### Similar Problems
