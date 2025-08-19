### Leetcode 2953 (Hard): Count Complete Substrings [Practice](https://leetcode.com/problems/count-complete-substrings)

### Description  
Given a string of lowercase English letters `word` and an integer `k`, count the number of substrings that are “complete”.  
A substring is **complete** if:
- Every unique character in this substring appears exactly `k` times.
- All characters are lowercase.
- Additionally, substrings are only considered *inside maximal contiguous segments* where the absolute difference between adjacent characters is at most 2. Whenever two adjacent characters differ by more than 2 in ordinal value (`abs(ord(word[i]) - ord(word[i-1])) > 2`), a new segment starts.

### Examples  

**Example 1:**  
Input: `word = "aaabbbccc", k = 3`  
Output: `1`  
Explanation. There is one segment since no adjacent pair differs by more than 2. The whole string "aaabbbccc" is a substring where each character 'a', 'b', 'c' appears exactly 3 times.

**Example 2:**  
Input: `word = "abac", k = 1`  
Output: `3`  
Explanation. The segments are ["aba", "c"], since |'c'-'a'|=2 (ok) but the substrings are ["a", "b", "a", "c"] with each letter occurring once (there are 3 valid 1-length substrings: "a", "b", "c").

**Example 3:**  
Input: `word = "azby", k = 1`  
Output: `4`  
Explanation. Each pair |'z'-'a'|=25 (>2), |'b'-'z'|=24, etc. So every character is its own segment, and each one is a valid substring by itself.

### Thought Process (as if you’re the interviewee)  
First, I identify segments where for every position, adjacent character difference is ≤ 2.  
Within each segment, I want to count all substrings where every unique character appears exactly `k` times.  
The naive brute-force approach would generate all substrings within each segment and check the count criteria, which is exponential and not efficient for large input.

Instead, for each segment, I recognize that for each possible count of unique characters `u` (from 1 to 26), a complete substring for that `u` will be of length `u × k`.  
I can then use a sliding window of length `u \* k` across the segment, maintaining letter counts in the current window.  
I only increment the answer if all nonzero counts in the window are exactly `k`.

The string's maximum length is small (<= 1e5), so this windowed approach is efficient. I also need to reset counts between maximal segments (at every "large jump" in adjacent letters).

### Corner cases to consider  
- Empty string (word="")  
- k larger than the segment length: no possible complete substring  
- All letters are the same  
- Letter jumps: e.g., "a---z" (segments are tiny)  
- k=1 (every single letter is a valid substring)  
- Only one unique letter in a segment

### Solution

```python
def countCompleteSubstrings(word: str, k: int) -> int:
    from collections import Counter
    
    # Helper to count for a single valid segment (no big jumps)
    def count_for_segment(segment: str) -> int:
        m = len(segment)
        res = 0
        # Try all possible number of unique characters
        for unique in range(1, 27):
            window_len = unique * k
            if window_len > m:
                break
            cnt = Counter(segment[:window_len])
            if len(cnt) == unique and all(v == k for v in cnt.values()):
                res += 1
            # Sliding window
            for i in range(window_len, m):
                left_char = segment[i - window_len]
                cnt[left_char] -= 1
                if cnt[left_char] == 0:
                    cnt.pop(left_char)
                new_char = segment[i]
                cnt[new_char] = cnt.get(new_char, 0) + 1
                if len(cnt) == unique and all(v == k for v in cnt.values()):
                    res += 1
        return res

    n = len(word)
    ans = 0
    i = 0
    # Segment the original word at big jumps
    while i < n:
        j = i + 1
        while j < n and abs(ord(word[j]) - ord(word[j-1])) <= 2:
            j += 1
        segment = word[i:j]
        ans += count_for_segment(segment)
        i = j
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 26), where n is the length of word and the factor 26 is for possible unique letters. Each segment is processed with sliding windows, and the per-segment time is bounded since unique ≤ 26.
- **Space Complexity:** O(26) extra for per-window character counts, plus O(n) for the string itself. No recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach adapt if `word` contained uppercase letters or non-alphabetic characters?  
  *Hint: Think about how to generalize character difference checks, or map upper and lower case uniformly.*

- Can we optimize further if k is always 1?  
  *Hint: For k=1, every substring of length unique characters (with all unique) is valid.*

- What if you want to return all such substrings, not just count them?  
  *Hint: Collect indices or substring slices as you process the sliding window.*

### Summary
This problem uses the multiple sliding window and segment partitioning patterns.  
We segment the input at large adjacent differences, then for each segment, apply a sliding window over each possible window size (unique \* k), efficiently tracking character counts to identify valid "complete" substrings.  
This pattern generalizes to problems involving substring uniqueness and frequency constraints, and showcases careful window state maintenance and segmentation techniques.

### Tags
Hash Table(#hash-table), String(#string), Sliding Window(#sliding-window)

### Similar Problems
- Number of Substrings Containing All Three Characters(number-of-substrings-containing-all-three-characters) (Medium)
- Count Substrings Without Repeating Character(count-substrings-without-repeating-character) (Medium)