### Leetcode 3442 (Easy): Maximum Difference Between Even and Odd Frequency I [Practice](https://leetcode.com/problems/maximum-difference-between-even-and-odd-frequency-i)

### Description  
Given a string `s` of lowercase English letters, find the **maximum difference** between the frequency of two characters in the string such that **one character occurs an odd number of times and the other an even number of times**.  
Return the maximum difference, calculated as (frequency of a character with odd frequency) − (frequency of a character with even frequency).  
There will always be at least one character with even frequency and at least one with odd frequency.

### Examples  

**Example 1:**  
Input: `s = "aaaaabbc"`  
Output: `3`  
*Explanation: 'a' appears 5 times (odd), 'b' appears 2 times (even). 5 − 2 = 3 (maximum possible).*

**Example 2:**  
Input: `s = "abcabcab"`  
Output: `1`  
*Explanation: 'a' appears 3 times (odd), 'c' appears 2 times (even). 3 − 2 = 1 (maximum possible).*

**Example 3:**  
Input: `s = "aabbcc"`  
Output: `0`  
*Explanation: All characters have even frequencies (2). So, pick 'a' (2) as even, but for odd, there is none, so another example needed. Let's try:*

Input: `s = "ab"`  
Output: `0`  
*Explanation: Both have frequency 1 (odd), so no even frequency — as per constraints, this test case is invalid since at least one even and one odd frequency are guaranteed.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  Count the frequency of every character (O(n)).  
  For each pair of characters, if one is odd and one is even, compute the difference.  
  This is O(26 × 26) = O(1), since only lowercase a–z.

- **Optimized:**  
  Rather than check all pairs, just need:
    - The **maximum frequency among odd-count characters**.
    - The **minimum frequency among even-count characters**.
  The answer is: max_odd − min_even.

- **Trade-off:**  
  This avoids unnecessary pairing, and is fast for all practical string lengths since the character set is fixed size.

### Corner cases to consider  
- All but one character have even frequencies, only one odd.
- All but one character have odd frequencies, only one even.
- The smallest possible input size (length 3).
- Frequencies: some characters have zero count (don't affect calculation).
- Multiple characters with same max/min frequencies.

### Solution

```python
def max_difference_even_odd_frequency(s):
    # Frequency count of each character 'a'–'z'
    freq = [0] * 26
    for ch in s:
        freq[ord(ch) - ord('a')] += 1

    max_odd = float('-inf')
    min_even = float('inf')

    # Traverse all character frequencies
    for f in freq:
        if f == 0:
            continue  # skip chars not in s
        if f % 2 == 1:
            # update max odd frequency
            max_odd = max(max_odd, f)
        else:
            # update min even frequency
            min_even = min(min_even, f)

    # As per constraints, there is at least one odd and one even frequency
    return max_odd - min_even
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of `s`. Building the frequency table scans `s` once; then we examine a fixed number (26) of characters.
- **Space Complexity:** O(1). Frequency array is fixed size (26), independent of input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string allows uppercase/lowercase letters?
  *Hint: Update the frequency array to have 52 entries, or process input to lower/uppercase.*

- Return all pairs (odd character, even character) that produce the maximum difference?
  *Hint: Track which characters achieve max_odd and min_even in an array.*

- What if you needed to handle Unicode or arbitrary characters?
  *Hint: Use a dictionary/hashmap for frequency counting.*

### Summary
This is a classic **hash table frequency counting** pattern, optimized by focusing only on finding max among odds and min among evens, since character set size is small. This counting principle applies to a wide variety of string and frequency problems, including finding mode/multiplicity, string construction, and histogram analysis.

### Tags
Hash Table(#hash-table), String(#string), Counting(#counting)

### Similar Problems
