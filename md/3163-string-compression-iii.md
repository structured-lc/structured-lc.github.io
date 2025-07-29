### Leetcode 3163 (Medium): String Compression III [Practice](https://leetcode.com/problems/string-compression-iii)

### Description  
Given a string `word`, compress it using the following algorithm:
- Start with an empty string `comp`.
- While `word` is not empty, repeatedly remove the longest possible prefix consisting of a single character `c` repeated **at most 9 times**.
- For each such prefix, append the **count** and the **character** to `comp`.
- Continue until the entire string is processed.
This means for any group of identical characters longer than 9, split it into chunks of 9 or fewer and encode each chunk separately.

### Examples  

**Example 1:**  
Input: `word = "abcde"`  
Output: `"1a1b1c1d1e"`  
*Explanation: Each character appears once, so each is encoded as `1` followed by the character.*

**Example 2:**  
Input: `word = "aaaaaaaaaaa"`  
Output: `"9a2a"`  
*Explanation: The first 9 'a's are compressed to "9a", the next 2 as "2a". Total = 11 'a's.*

**Example 3:**  
Input: `word = "aabbaaabb"`  
Output: `"2a2b3a2b"`  
*Explanation:*
- The first group: 2 'a's → "2a"
- Next: 2 'b's → "2b"
- Next: 3 'a's → "3a"
- Last: 2 'b's → "2b"

### Thought Process (as if you’re the interviewee)  
First, consider brute force: process the string left to right, count consecutive same characters, and record both character and count. The twist is to split any group longer than 9 into multiple chunks (since prefix length can max be 9).
So, loop through the string:
- Track a `count` and current char.
- If count reaches 9, output `9c` and reset count.
- At each character change, output the count so far.
This approach ensures no group in the output exceeds 9.  
Use a single pass, and build output as you go. No advanced data structures needed; just careful counting and chunking.

### Corner cases to consider  
- Empty string.
- All unique characters.
- A single character repeated more than 9 times (chunking).
- Alternating two characters.
- Groups with exactly 9, and just over 9 characters (10, 11, etc.).

### Solution

```python
def compressedString(word: str) -> str:
    # String builder for the output
    result = []
    n = len(word)
    i = 0

    while i < n:
        count = 1
        # Count up to the next different char or 9, whichever comes first
        while i + count < n and word[i + count] == word[i] and count < 9:
            count += 1
        # Output current chunk
        result.append(str(count))
        result.append(word[i])
        i += count

    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of `word`. Each character is visited once.
- **Space Complexity:** O(n), for the output string and result buffer (worst case if all chars are different).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the maximum repeat count is changed from 9 to some k?
  *Hint: Replace hardcoded 9 with a variable k in your loop condition.*

- Can you decompress the string you produced?
  *Hint: You'd need to parse counts and characters, and expand accordingly.*

- What if the string contains upper- and lower-case letters?
  *Hint: Current logic works as long as equality comparisons are unchanged.*

### Summary
This problem is a variant of run-length encoding, with the twist of chunking runs longer than 9 into segments of ≤9. The approach uses a two-pointer or greedy technique, which is common in string compression and sequence processing. This pattern applies in problems like original run-length encoding, chunked partitioning, and simple stream compression algorithms.