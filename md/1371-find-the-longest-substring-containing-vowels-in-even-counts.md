### Leetcode 1371 (Medium): Find the Longest Substring Containing Vowels in Even Counts [Practice](https://leetcode.com/problems/find-the-longest-substring-containing-vowels-in-even-counts)

### Description  
Given a string of lowercase English letters, find the length of the **longest substring** where **each vowel ('a', 'e', 'i', 'o', 'u') appears an even number of times** (including zero). You can assume the input may contain any lowercase letters, but only the counts of the vowels matter for the substring's validity.

### Examples  

**Example 1:**  
Input: `s = "eleetminicoworoep"`  
Output: `13`  
*Explanation: The substring "leetminicowor" (from index 1 to 13) meets the condition—all vowels appear an even number of times.*

**Example 2:**  
Input: `s = "leetcodeisgreat"`  
Output: `5`  
*Explanation: "leetc" (indices 0 to 4) is one longest valid substring—all vowels counted evenly.*

**Example 3:**  
Input: `s = "bcbcbc"`  
Output: `6`  
*Explanation: The whole string has no vowels, so 0 (even) for all, and thus all substrings are valid; the longest is the whole string.*

### Thought Process (as if you’re the interviewee)  
The brute-force way is to try every substring and count all five vowels in each substring, but this would be O(n²) time and is too slow for large strings.

To optimize, I can use the **bitmask technique** to track the even/odd parity of each vowel as we scan left-to-right:

- Assign each vowel a bit: a=0, e=1, i=2, o=3, u=4.
- Maintain a bitmask state, where the iᵗʰ bit is 1 if the corresponding vowel has appeared an odd number of times so far, 0 if even.
- If at two indices the state is the same, the substring between them has all vowels with even counts (because the change in counts between them is even for all).
- We can use an array/hashmap to record the **first index** we ever see each state.
- As we scan, whenever we see a state again, we compute the length from the first index to the current index and update max.

This is O(n), very efficient!

### Corner cases to consider  
- Empty string (should return 0)
- String with no vowels at all
- All vowels, all at least twice, or never reaching even count
- Multiple longest substrings with same length
- String length 1 or very large

### Solution

```python
# O(n) time, uses bit manipulation on five vowels (a, e, i, o, u)
def findTheLongestSubstring(s: str) -> int:
    # Map each vowel to a bit position
    vowel_idx = {'a': 0, 'e': 1, 'i': 2, 'o': 3, 'u': 4}
    state = 0  # 5 bits for 5 vowels: odd/even count
    # At start: state 0 (all vowels seen even times), index -1
    first_occurrence = {0: -1}
    max_len = 0
    for i, c in enumerate(s):
        if c in vowel_idx:
            # Flip bit: XOR ^= (1 << position)
            state ^= (1 << vowel_idx[c])
        # If we've seen this state before, update max length
        if state in first_occurrence:
            max_len = max(max_len, i - first_occurrence[state])
        else:
            # Record the earliest index of this state
            first_occurrence[state] = i
    return max_len
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) — Each character is processed once, and all other state operations (dict lookup, xor) are O(1).
- **Space Complexity:** O(1) — There are only 32 (2⁵) possible vowel parity states, so the hashmap never stores more than 32 keys, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string is in uppercase or mixed case?  
  *Hint: Can you normalize the string first or check vowels case-insensitively?*

- What if instead of even counts, we care about substrings where **the counts are multiples of 3**?  
  *Hint: Bit-masking may not be enough; how could you encode counts modulo 3?*

- How can you recover the actual substring, not just the length?  
  *Hint: You have the indices of each state — how would you track start and end?*

### Summary
This problem leverages the **prefix XOR / bit state** pattern, where the parity (even/odd) of certain events can be compressed into a bitmask as we iterate through the string. The trick is to recognize that revisiting the same state implies the substring in between must have all vowels occur an even number of times. This bitmask-state idea is common in problems involving tracking the "parity" of counts or events, and can also be used for related substring problems involving even/odd constraints.