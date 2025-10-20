### Leetcode 2325 (Easy): Decode the Message [Practice](https://leetcode.com/problems/decode-the-message)

### Description  
Given a string **key** that contains every lowercase English letter at least once (and possibly spaces), and a *message* to decode, create a substitution from the *key* that assigns the first unique letter in the *key* to 'a', the next unique to 'b', and so on for all 26 letters. Then, decode the message by replacing each character using this mapping (spaces remain unchanged).

The main steps:
- Scan the *key* from left to right; each new unique letter gets mapped to the next letter of the alphabet (starting with 'a').
- For every character in the *message*, if it's a letter, substitute it according to this mapping. If it's a space, keep it as a space.

### Examples  

**Example 1:**  
Input:  
key=`"the quick brown fox jumps over the lazy dog"`,  
message=`"vkbs bs t suepuv"`,  
Output:  
`"this is a secret"`  
*Explanation: Walk through the key, mapping: t→a, h→b, e→c, ..., until each unique letter is assigned to a, b, c, ... z. Using this mapping, substitute letters in the message. Spaces remain unchanged.*

**Example 2:**  
Input:  
key=`"eljuxhpwnyrdgtqkviszcfmabo"`,  
message=`"zwx hnfx lqantp mnoeius ycgk vcnjrdb"`  
Output:  
`"the five boxing wizards jump quickly"`  
*Explanation: Build the letter mapping by order of first occurrence in the key, and decrypt the message accordingly.*

**Example 3:**  
Input:  
key=`"abcdefghijklm nopqrstuvwxyz"`,  
message=`"abc xyz"`  
Output:  
`"abc xyz"`  
*Explanation: The key is just the alphabet; so each letter maps to itself. The message remains unchanged.*

### Thought Process (as if you’re the interviewee)  
First, I would parse the *key* string to create a mapping from each unique letter in its first appearance to the letters 'a' through 'z' in order. I can use a hashmap (dict) for this.  
- Initialize a pointer for the current alphabet starting at 'a'.
- For each character in *key*, if it's not a space and not already mapped, assign it to the next alphabet letter.
- Once mapping is ready, iterate over each character in *message*:  
  - If it's a space, retain it.  
  - If it's a letter, substitute using the mapping.

Optimizing:  
- This approach is linear in time as we only process each letter once when building the map and once when decoding.  
- It’s also space efficient since the mapping needs at most 26 entries.

Trade-offs:  
- No need for sorting.  
- Using dict preserves readability and constant-time lookups.

### Corner cases to consider  
- *key* contains repeated letters and spaces (should only map first appearance of each letter).
- *message* includes only spaces (should return string of spaces).
- *key* is exactly the alphabet once (identity mapping).
- *message* is empty (should return empty string).
- Letters in *key* and *message* are all lowercase (as per constraints).
- *key* contains superfluous spaces – should ignore for mapping.

### Solution

```python
def decodeMessage(key: str, message: str) -> str:
    # Create mapping from unique letters in key to a-z
    mapping = {}
    current = ord('a')
    for ch in key:
        if ch != ' ' and ch not in mapping:
            mapping[ch] = chr(current)
            current += 1
            if current > ord('z'):
                break  # all 26 letters mapped

    # Build decoded message
    decoded = []
    for ch in message:
        if ch == ' ':
            decoded.append(' ')
        else:
            decoded.append(mapping[ch])
    return ''.join(decoded)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m + n), where m = length of *key*, n = length of *message*. We build the mapping in O(m) and decode in O(n).
- **Space Complexity:** O(1) for the mapping (fixed size, max 26 letters), plus O(n) for the output string in memory.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input *key* or *message* contains uppercase letters?  
  *Hint: Think about whether the mapping should be case-insensitive, and handle with lower()/upper().*

- Can this technique handle arbitrary unicode alphabets?  
  *Hint: Would need to generalize the mapping to support more than just a-z.*

- How would you handle very large messages (e.g., streaming input)?  
  *Hint: Consider processing one character at a time or using generators.*

### Summary
This problem follows the **character mapping** pattern, which is common in problems involving substitution ciphers or character replacement. The technique of creating a mapping by scanning an input key, then using that map to transform/decode another string is widely applicable in problems involving translation, encoding/decoding, or input normalization. The core pattern (first-seen mapping) is also seen in bijective mapping and custom sort problems.


### Flashcard
Build a mapping from each unique letter in key (first appearance) to 'a'..'z', then decode message by substituting each character using this mapping; spaces remain unchanged.

### Tags
Hash Table(#hash-table), String(#string)

### Similar Problems
