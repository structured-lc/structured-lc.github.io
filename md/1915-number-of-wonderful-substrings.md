### Leetcode 1915 (Medium): Number of Wonderful Substrings [Practice](https://leetcode.com/problems/number-of-wonderful-substrings)

### Description  
Given a string `word` consisting only of the first ten lowercase English letters (`'a'` through `'j'`), you are to count the total number of _wonderful substrings_ in `word`.  
A substring is called **wonderful** if **at most one** letter appears an **odd** number of times in it.  
The solution must count all occurrences, including repeated substrings.

### Examples  

**Example 1:**  
Input: `word = "aba"`  
Output: `4`  
*Explanation: "aba" has wonderful substrings:*  
- "a" (positions 0–0): only 'a' is odd  
- "b" (positions 1–1): only 'b' is odd  
- "a" (positions 2–2): only 'a' is odd  
- "aba" (positions 0–2): both 'a's, so 'a' is even, 'b' is odd (1 odd)  

**Example 2:**  
Input: `word = "aabb"`  
Output: `9`  
*Explanation: Wonderful substrings are:*  
- "a"  
- "aa"  
- "aab"  
- "aabb"  
- "a" (2nd 'a')  
- "abb"  
- "b"  
- "bb"  
- "b" (2nd 'b')  

**Example 3:**  
Input: `word = "he"`  
Output: `2`  
*Explanation: Only substrings "h" and "e" are considered wonderful, as both are of length 1, containing a single letter whose count is odd.*  

### Thought Process (as if you’re the interviewee)  

- **Brute-force**: Consider every substring, check if at most one character occurs odd number of times.  
  - Complexity: Checking every substring (O(n²)), counting frequencies (O(26)), which is too slow for long strings.  
- **Optimization**:  
  - Notice that we care only about the parity (odd/even), not the exact frequency.  
  - There are 10 possible letters, so we can represent count parity of all with a 10-bit integer (bitmask).  
  - For each position, keep track of a _current state_ mask where bit i is 1 if the letter 'a'+i has been seen an odd number of times so far.
  - To find a wonderful substring ending at position i:  
    - If the substring between two indices has _at most one_ odd count, then the XOR of their state masks should be either: 
      - all 0’s (no change: all even), or 
      - exactly one bit set (one odd letter difference: at most one letter odd)  
    - Use a hash map to count the number of times each state occurs.
  - For each char at i, after updating the state, for every possible state, accumulate from the hash map:
    - exact match (all bits same: all letters appear an even number of times in the range)
    - for each bit, flip that bit (at most one letter is odd in the difference: only one letter is odd)
  - This gives O(n × 10) time.

### Corner cases to consider  
- Empty string (not possible as per constraints, but code should not fail).
- All letters are the same.
- No wonderful substring except 1-length substrings.
- Maximum input length (to check performance).
- Letters not in `'a'` to `'j'` (not possible; assume input is valid).
- Repeated patterns in string.

### Solution

```python
def wonderfulSubstrings(word):
    # There are 10 letters: 'a' to 'j', so 10 bits
    cnt = [0] * 1024  # 2^10 possible masks
    cnt[0] = 1  # the initial state before reading any character
    res = 0
    mask = 0

    for ch in word:
        # toggle the bit for current character
        mask ^= 1 << (ord(ch) - ord('a'))
        # Case 1: all letters have even counts in the current substring (mask matches)
        res += cnt[mask]
        # Case 2: exactly one letter has an odd count (mask differs by one bit)
        for i in range(10):
            res += cnt[mask ^ (1 << i)]
        # Update count of this mask for future substrings
        cnt[mask] += 1

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 10) = O(n), where n = len(word), since for each character we do one mask update and 10 checks for all possible single bit flips.
- **Space Complexity:** O(2¹⁰) = O(1), as the count array only stores states for 10 bits (constant space).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string could contain more than 10 unique lowercase letters ('a' to 'z')?  
  *Hint: How does the bitmask size impact performance? Will your solution scale?*

- Can you return the actual substrings (not just the count)?  
  *Hint: Would tracking start/end positions be feasible?*

- How would you optimize further for extremely large strings with streaming input?  
  *Hint: Can you maintain counts in a rolling window efficiently?*

### Summary
This problem is solved efficiently using **bitmasking** (bit-parity trick) and a running hash table to quickly find the number of substrings where the parity difference of counts preserves the "at most one odd count" constraint. This bitmask and pre-count technique is a classic pattern in substring parity, similar to problems like "count subarrays with even sum", "palindromic substrings with parity constraints", etc. It is highly efficient due to the small number of possible states (2¹⁰).