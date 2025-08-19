### Leetcode 3445 (Hard): Maximum Difference Between Even and Odd Frequency II [Practice](https://leetcode.com/problems/maximum-difference-between-even-and-odd-frequency-ii)

### Description  
Given a string **s** consisting of digits ('0' to '4') and an integer **k**, find the maximum difference between the frequency of two characters, freq[a] - freq[b], in a substring of **s** of size at least **k**, where:
- Character **a** has an **odd frequency** in that substring.
- Character **b** has an **even frequency** in that substring.
Return the maximum possible difference across all valid substrings.  
A substring may contain more than two distinct characters.

### Examples  

**Example 1:**  
Input: `s = "12233", k = 4`  
Output: `-1`  
Explanation: Check substrings of length ≥4. For `"12233"`, `'1'` appears once (odd), `'3'` appears twice (even). The difference is 1 − 2 = −1.

**Example 2:**  
Input: `s = "1122211", k = 3`  
Output: `1`  
Explanation: Consider substring `"11222"`. `'2'` appears 3 times (odd), `'1'` appears 2 times (even). Difference is 3 − 2 = 1.

**Example 3:**  
Input: `s = "110", k = 3`  
Output: `-1`  
Explanation: Only substring is `"110"`. No pair with one having odd frequency and one even frequency exists.

### Thought Process (as if you’re the interviewee)  
- The brute-force idea is to check every substring (of length ≥ k), count the frequencies of all chars, and for every odd/even pair of chars, compute the freq[a] − freq[b]. Keep global maximum. But this is too slow for length up to 30,000.
- Since the string uses at most 5 digits, we can keep frequency counts compact. We want the **max** difference freq[a] − freq[b] with parity constraints inside sliding windows (length ≥ k), over all windows.
- We’ll use a **sliding window** and maintain a running count of each char. For every window of size ≥ k, dynamically update frequencies as the window slides. For every valid window, try all pairs (odd freq char, even freq char) and compute the result.
- To optimize further, we could try prefix-sum tricks or represent frequency parities by bitmasks for all five digits and use a state map, but given the small alphabet, enumerating over all char pairs per window is feasible.
- We choose the sliding window approach with frequency array for readability and acceptable performance since only 5 chars are possible.

### Corner cases to consider  
- s of minimal length (exactly k)
- s where all characters are the same
- No window with a valid odd/even freq pair (output: −1)
- All possible a, b pairs are equal or have the same parity
- k = 1 or k = length of s
- Windows at the start or end of s

### Solution

```python
def maximumDifferenceEvenOddFrequencyII(s: str, k: int) -> int:
    n = len(s)
    max_diff = -1
    freq = [0] * 5  # Only '0'-'4'
    left = 0

    for right in range(n):
        # Add new char to current window
        freq[int(s[right])] += 1

        while (right - left + 1) > k:
            # Shrink left if window is bigger than k
            freq[int(s[left])] -= 1
            left += 1

        if (right - left + 1) >= k:
            # Try all (odd, even) pairs
            for a in range(5):
                if freq[a] % 2 == 1:  # Odd freq
                    for b in range(5):
                        if freq[b] > 0 and freq[b] % 2 == 0:
                            max_diff = max(max_diff, freq[a] - freq[b])

    return max_diff
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 25) = O(n). For each of n positions, we check all pairs of digits—up to 25 combinations (since only 5 digits), which is constant.
- **Space Complexity:** O(1). Only a fixed-size array (freq[5]) is used regardless of input size; no extra storage grows with n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if s could contain all possible digits or lowercase letters?  
  *Hint: Consider scalable data structures and ways to efficiently track frequencies and parities.*

- If asked for the substring itself that achieves the maximum difference, not just the value, how would you retrieve it?  
  *Hint: Track the positions whenever updating max_diff.*

- Can you make the solution run in sublinear time for repeated queries on the same string (e.g., many k with different s)?  
  *Hint: Precompute prefix frequency and parity masks for fast queries.*

### Summary
This problem uses the **sliding window + counting** pattern, exploiting the small digit alphabet to affordably check all relevant pairs. The main trick is efficiently computing, for each substring window, the max difference between odd/even freq characters—classic for questions involving substring stats with small constraint sets. This approach and pattern are broadly used in "at most K distinct chars," "longest substring with at least..." and frequency-based substring problems.

### Tags
String(#string), Sliding Window(#sliding-window), Enumeration(#enumeration), Prefix Sum(#prefix-sum)

### Similar Problems
- Frequency of the Most Frequent Element(frequency-of-the-most-frequent-element) (Medium)
- Count Elements With Maximum Frequency(count-elements-with-maximum-frequency) (Easy)