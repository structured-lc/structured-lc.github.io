### Leetcode 3297 (Medium): Count Substrings That Can Be Rearranged to Contain a String I [Practice](https://leetcode.com/problems/count-substrings-that-can-be-rearranged-to-contain-a-string-i)

### Description  
Given two strings **word1** and **word2**, count how many substrings of **word1** can be rearranged so that **word2** is a prefix of the rearranged string.  
A substring is a contiguous segment, and a prefix is the beginning portion of a string.  
A substring is considered **valid** if, by rearranging its letters, it is possible for the arrangement to begin with **word2**.

### Examples  

**Example 1:**  
Input: `word1 = "bcca", word2 = "abc"`  
Output: `1`  
*Explanation: Only substring "bcca" has all the characters to make "abc" a prefix ("abcc"), so it's valid.*

**Example 2:**  
Input: `word1 = "abcabc", word2 = "abc"`  
Output: `10`  
*Explanation: All substrings of length ≥ 3 are valid. Each has enough 'a', 'b', 'c' to make "abc" prefix. For this length, there are 10 substrings.*

**Example 3:**  
Input: `word1 = "abcabc", word2 = "aaabc"`  
Output: `0`  
*Explanation: No substring of word1 has enough 'a's to satisfy "aaabc" as a prefix.*

### Thought Process (as if you’re the interviewee)  
First, I need to check every possible substring of **word1** to see if, by rearranging, it can have **word2** as its prefix.  
Valid substring needs to have at least as many of each character as **word2**. For any substring of **word1**, I can count its characters and compare their counts to those in **word2**.

**Brute force**:

- Iterate all substrings of **word1**.
- For each substring, count the frequency of each character and compare to frequencies in **word2**.

This is O(n²) substrings; for each, up to O(26) frequency comparison (for lowercase English letters).

**Optimizing** for larger constraints:

- Since `word1.length, word2.length` can be up to 10⁵, brute force is not feasible.
- Use a **sliding window** of length at least len(word2):
    - Move window over **word1**, maintaining letter counts.
    - For each window of length ≥ len(word2), check if current counts contain at least the counts needed for **word2**.
    - For given window, as soon as counts in window are sufficient, all larger substrings starting at current start and ending at end will also be sufficient (as adding more letters can't remove existing ones), BUT since rearrangement is only needed for the prefix, this is best handled by direct checking for every substring.  
    - However, the problem constraints allow O(n²) for n up to 10⁴.

Final choice: For n up to 10⁵, need a **frequency-counting with prefix sums**.  
- Precompute prefix sums of frequencies.
- For every possible (i, j) substring, get character counts in O(1).
- Check if counts cover **word2** in O(26).

However, for n up to 10⁵, that's still up to 10¹⁰ substrings, so the intention must be n ≤ 10⁴ for direct implementation.

### Corner cases to consider  
- **word2** longer than **word1** (impossible, so 0 valid).
- **word2** with repeated letters.
- **word1** or **word2** of length 1.
- **word1** with none of the required letters.
- Multiple identical valid substrings.

### Solution

```python
def count_substrings(word1: str, word2: str) -> int:
    # Frequency count for word2
    from collections import Counter

    n = len(word1)
    k = len(word2)
    res = 0

    # Count of each character needed for word2
    need = Counter(word2)

    # Use prefix sums for frequency counts
    # freq[i][ch] gives count of ch in word1[:i]
    freq = [[0] * 26 for _ in range(n + 1)]

    for i in range(n):
        for j in range(26):
            freq[i + 1][j] = freq[i][j]
        freq[i + 1][ord(word1[i]) - ord('a')] += 1

    # Iterate all substrings of length at least k
    for start in range(n):
        for end in range(start + k, n + 1):
            valid = True
            for ch in need:
                count = freq[end][ord(ch) - ord('a')] - freq[start][ord(ch) - ord('a')]
                if count < need[ch]:
                    valid = False
                    break
            if valid:
                res += 1

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × 26)  
  - There are O(n²) substrings, and checking frequency for each is O(26) (constant), so this is only suitable for n up to around 5000–10,000.
- **Space Complexity:** O(n × 26)  
  - Prefix sum counts for each prefix and character.

### Potential follow-up questions (as if you’re the interviewer)  

- What if **word1** and **word2** can be up to 10⁶ in length?  
  *Hint: How would you avoid checking all substrings directly? Suffix arrays or hash-based methods?*

- How can you optimize further if **word2** has a small alphabet size?  
  *Hint: Could you use bitmasking for tiny k?*

- How would your approach change if you could not use extra space for prefix sums?  
  *Hint: Can a single sliding window suffice for k-sized substrings?*

### Summary
The approach uses prefix sums to allow quick character count retrieval for any substring, and brute-forces all possible substrings of length ≥ len(word2). Character set checks are handled in linear time with respect to the number of substrings, but overall complexity is O(n²), acceptable for small n. The pattern is a common variant of substring + character count checking, and similar logic applies in "anagram substring", "minimum window substring", and "permutation in string" types of LeetCode problems.


### Flashcard
Use a sliding window with character frequency maps; for each starting position, expand the window until the substring contains all characters of word2 with sufficient counts.

### Tags
Hash Table(#hash-table), String(#string), Sliding Window(#sliding-window)

### Similar Problems
- Minimum Window Substring(minimum-window-substring) (Hard)