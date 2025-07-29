### Leetcode 3329 (Hard): Count Substrings With K-Frequency Characters II [Practice](https://leetcode.com/problems/count-substrings-with-k-frequency-characters-ii)

### Description  
Given a string **s** and an integer **k**, return the number of **distinct substrings** of **s** where **every character in the substring appears either 0 times or exactly k times** (i.e., for every present character in the substring, its frequency is exactly k).  
This is a much stricter condition than “at least k times.” Each character in a valid substring must appear **exactly** k times, and no character appears < k or > k.

### Examples  

**Example 1:**  
Input: `s = "aaabb", k = 2`  
Output: `1`  
Explanation: The only valid substring is `"aa"` (since 'a' appears 2 times). For `"bb"`, 'b' appears 2 times, so that's also valid. But both `"aa"` and `"bb"` count as valid, so output would be 2.  
But if we count only substrings where each present letter appears **exactly** k times and **all characters in the substring must have frequency exactly k** (no mixing), as per similar "I" problems, so all substrings for which this property holds: `"aa"`, `"bb"`, possibly also `"aaa"`, `"bbb"` (for k=3), but for this input, only substrings of length 2 with same letter.  
So full valid substrings: `"aa"`, `"bb"`. Output: `2`.

**Example 2:**  
Input: `s = "abcabc", k = 1`  
Output: `9`  
Explanation:  
Every single character substring (`"a"`, `"b"`, `"c"`) is valid (3 substrings).  
Also, `"ab"`, `"bc"`, `"ca"`, etc. Each time, the substring length equals k = 1 for each present character, but for longer substrings, unless all present characters appear exactly one time, not valid.  
Count of valid substrings: all substrings of length 1 and those where all present characters have frequency 1.  
There are 6 substrings of length 1. There are 3 substrings of length 3 (`"abc"`, `"bca"`, `"cab"`) where each character appears once.  
Total: 6 (length-1) + 3 (length-3) = 9. Output: `9`.

**Example 3:**  
Input: `s = "aabbcc", k = 2`  
Output: `6`  
Explanation:  
Valid substrings are `"aa"`, `"bb"`, `"cc"`, and any combination where each present character appears exactly twice: (`"aabb"`, `"bbcc"`, `"aabbcc"`), so total = 6.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**: Check all possible substrings (O(n²)), and for each, count the frequency of each letter. If all present characters appear exactly k times, count as valid. This is too slow for large n.
- **Optimization**:  
  - Fix a window and try to expand it rightward, keeping a count of frequency of every letter.  
  - Only substrings whose length is a multiple of k * unique character count can be valid.  
  - For each possible number of unique letters (from 1 to 26), scan the substring using a sliding window, and for each window of size unique * k, check if each unique character in that window appears exactly k times.
  - By fixing the number of unique characters, and using a frequency array of 26, we can efficiently check window by window.
  - This approach is inspired by substring analysis patterns for "at most k unique letters" problems, but adapted for "every present letter exactly k."

**Tradeoffs**:  
- This is O(26 \* n) (as we scan for all possible 1-26 unique letters), which is efficient.
- The frequency array is constant-sized (26).

### Corner cases to consider  
- Empty string ⇒ return 0.
- k > length of s ⇒ impossible, return 0.
- All characters are the same.
- No valid substrings at all.
- Substrings where some characters appear k times but others with different counts (invalid).
- Overlapping substrings.

### Solution

```python
def count_substrings_with_k_frequency(s: str, k: int) -> int:
    n = len(s)
    result = 0
    
    # For each possible number of unique characters
    for unique_target in range(1, 27):  # 1 to 26 inclusive
        freq = [0] * 26
        l = 0
        r = 0
        unique_cnt = 0
        count_k = 0
        
        while r < n:
            idx_r = ord(s[r]) - ord('a')
            freq[idx_r] += 1
            if freq[idx_r] == 1:
                unique_cnt += 1
            if freq[idx_r] == k:
                count_k += 1
            # If more unique letters, shrink left pointer
            while unique_cnt > unique_target or freq[idx_r] > k:
                idx_l = ord(s[l]) - ord('a')
                if freq[idx_l] == k:
                    count_k -= 1
                freq[idx_l] -= 1
                if freq[idx_l] == 0:
                    unique_cnt -= 1
                l += 1
            # If all present chars appear exactly k times, and their number is unique_target
            if unique_cnt == unique_target and unique_cnt == count_k:
                result += 1
            r += 1
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(26 × n), since for each possible unique letter count (max 26), we scan through the string using a sliding window.
- **Space Complexity:** O(1), as the frequency array size is constant (26 letters).

### Potential follow-up questions (as if you’re the interviewer)  

- How could you modify the approach if s could contain uppercase and lowercase letters?
  *Hint: Consider an increased alphabet size.*

- What if k could be very large, possibly higher than the string length?
  *Hint: Early return/skip such cases for efficiency.*

- Can you output the substrings themselves, or avoid double-counting overlapping substrings?
  *Hint: Use a set to collect unique substrings if needed.*

### Summary
This problem uses the **sliding window with variable unique letter-count** pattern, a powerful approach when substring criteria involve both per-character frequency and unique character count.  
By iterating different unique character amounts, and tracking counts efficiently, we avoid unnecessary work and achieve near-linear time. This pattern frequently appears in substring, anagram, and frequency-balance problems, especially those involving exact or at-most counts.