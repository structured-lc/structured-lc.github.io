### Leetcode 2067 (Medium): Number of Equal Count Substrings [Practice](https://leetcode.com/problems/number-of-equal-count-substrings)

### Description  
You are given a 0-indexed string `s` of lowercase English letters and an integer `count`.   
An **equal count substring** is a substring in which every unique letter appears **exactly** `count` times (no more, no less).  
Your job: count how many substrings of `s` are equal count substrings.

Example:  
If `s = "aaabb"` and `count = 2`, `"aa"` would be valid (if it were a substring), but not `"aab"` (since `a` = 2, `b` = 1).  
You must find all such substrings—of **any length**—that satisfy this condition.

### Examples  

**Example 1:**  
Input: `s = "aaabcbbcc", count = 3`  
Output: `3`  
Explanation:  
- `"aaa"` (positions 0–2): 'a' appears 3 times.  
- `"bcbbcc"` (positions 3–8): 'b' and 'c' both appear 3 times.  
- `"aaabcbbcc"` (positions 0–8): 'a', 'b', and 'c' each appear 3 times.

**Example 2:**  
Input: `s = "abcd", count = 2`  
Output: `0`  
Explanation:  
No character appears 2 times in any substring, so no valid equal count substrings.

**Example 3:**  
Input: `s = "a", count = 5`  
Output: `0`  
Explanation:  
Not enough characters to reach count = 5 for any letter.

### Thought Process (as if you’re the interviewee)  
First, brute-force:  
- Try every possible substring, count frequency of each letter, and check if all unique letters appear exactly `count` times.  
- This is O(n³): O(n²) substrings × O(n) scanning, too slow for n up to 3×10⁴.

How to optimize?  
- Notice: for any substring, the only candidates are those whose length is divisible by `count` (otherwise, can't distribute evenly).
- Fix the number of unique letters, say `uniq`.
  - Each valid substring must be of length `uniq × count`.
  - Slide a window of size `uniq × count` over `s`, checking counts: for each letter in the window, is its count either 0 or precisely `count`? All nonzero must be `count`.
- Try all possible uniq from 1 to 26 (since lowercase English letters).

Further optimizations:
- Maintain a sliding window with a fixed array `cnt` for current frequencies.
- Keep a counter `t` for how many letters reach exactly `count` in the window.
- For each window, check if `t == uniq` and all other counts are zero or not present in the window.

Trade-offs:
- O(26 × n) time, O(26) space. Very efficient and meets constraints.

### Corner cases to consider  
- Empty string (though per constraints, s.length ≥ 1)
- count > s.length: no valid substring possible
- All letters are the same, e.g., `"aaaa"`, `count = 1` or `count = 2`
- count = 1 (each unique letter must present exactly once)
- Repeated/overlapping valid substrings

### Solution

```python
def equalCountSubstrings(s: str, count: int) -> int:
    n = len(s)
    ans = 0
    for uniq in range(1, 27):
        k = uniq * count  # window size
        if k > n:
            break
        cnt = [0] * 26  # frequency for each letter
        t = 0  # number of chars with count=exactly `count`
        left = 0
        for right in range(n):
            idx = ord(s[right]) - ord('a')
            cnt[idx] += 1
            if cnt[idx] == count:
                t += 1
            if cnt[idx] == count + 1:
                t -= 1
            # Shrink window from left if needed
            if right - left + 1 > k:
                idx_left = ord(s[left]) - ord('a')
                if cnt[idx_left] == count:
                    t -= 1
                if cnt[idx_left] == count + 1:
                    t += 1
                cnt[idx_left] -= 1
                left += 1
            # If window size matches and all uniq chars have count==`count`
            if right - left + 1 == k and t == uniq:
                ans += 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(26 × n) = O(n).  
  For each possible number of unique letters (up to 26), process the string with a sliding window.
- **Space Complexity:** O(26) = O(1) extra space, since letter frequencies use a fixed-size array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if `s` contains uppercase and lowercase English letters?
  *Hint: Would need a frequency array of size 52 or case-insensitive comparison.*

- Can you print all such substrings instead of only counting them?
  *Hint: Store start and end indices when the window is valid.*

- Can you adapt this algorithm for a streaming input?
  *Hint: Consider if windowed checks are feasible with limited memory, and how to process when you can't index substrings backwards.*

### Summary
This problem uses the **sliding window with fixed window size** pattern, iterating over all valid window sizes (multiples of `count` with 1 to 26 unique letters).  
It's a common approach when searching for substrings with frequency/count-based constraints, applicable in problems like "Longest Substring with At Most K Distinct Characters," "Minimum Window Substring," and other variants on substring and frequency-based matching.  
Efficient handling of the sliding window and frequency updates are the key to optimal performance.


### Flashcard
Optimize by considering substrings whose length is divisible by the target count.

### Tags
Hash Table(#hash-table), String(#string), Sliding Window(#sliding-window), Counting(#counting)

### Similar Problems
- Longest Substring Without Repeating Characters(longest-substring-without-repeating-characters) (Medium)
- Longest Substring with At Least K Repeating Characters(longest-substring-with-at-least-k-repeating-characters) (Medium)
- Unique Substrings With Equal Digit Frequency(unique-substrings-with-equal-digit-frequency) (Medium)