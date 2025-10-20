### Leetcode 393 (Medium): UTF-8 Validation [Practice](https://leetcode.com/problems/utf-8-validation)

### Description  
Given an array of integers (each representing one byte, 0-255), validate whether the sequence forms a valid UTF-8 encoding.  
A UTF-8 character can be 1 to 4 bytes:
- 1-byte: starts with 0xxxxxxx
- 2-byte: starts with 110xxxxx, followed by a byte 10xxxxxx
- 3-byte: starts with 1110xxxx, followed by two bytes 10xxxxxx
- 4-byte: starts with 11110xxx, followed by three bytes 10xxxxxx  
For each multi-byte character, all continuation bytes must start with '10'.  
We must check the pattern of leading and continuation bytes, and also ensure the byte count matches the character’s declared length.

### Examples  

**Example 1:**  
Input: `[197, 130, 1]`  
Output: `True`  
*Explanation: 197 is 11000101 → 2-byte char, expects one continuation. 130 is 10000010 → valid continuation. 1 is 00000001 → valid 1-byte char.*

**Example 2:**  
Input: `[235, 140, 4]`  
Output: `False`  
*Explanation: 235 is 11101011 → 3-byte char, expects two continuations. 140 is 10001100 (valid continuation), but 4 is 00000100 (not a continuation). Invalid.*

**Example 3:**  
Input: `[240, 162, 138, 147]`  
Output: `True`  
*Explanation: 240 is 11110000 → 4-byte char, expects three continuations. 162, 138, 147 all start with 10xxxxxx. All valid.*

### Thought Process (as if you’re the interviewee)  

First, I’d iterate through the array, examining the most significant bits of each byte to identify if it is a single-byte or a multi-byte starting byte.  
If it’s a multi-byte start (starts with 110, 1110, or 11110), I count how many bytes should follow and verify that the next bytes start with '10'.  
If I ever find a byte not following the expected sequence, or expect more bytes than exist, return False.  
A brute-force solution would convert integers to binary strings and check prefixes, but bitwise operations are faster and more idiomatic.  
Bit manipulation is the optimal solution for O(n) time and O(1) extra space:  
- Use masking and shifting to identify leading bits.  
- Track how many continuation bytes remain to process.

### Corner cases to consider  
- Empty input array  
- Input array with bytes above 255  
- Correct number but wrong pattern for continuation bytes  
- Continuation byte seen where start byte should be  
- Not enough bytes for a declared multi-byte char  
- Bytes after a complete multi-byte char not matching the continuation pattern  
- Overly long multi-byte declarations (more than 4 bytes, not allowed)

### Solution

```python
def validUtf8(data):
    # Tracks how many continuation bytes are expected
    n_bytes = 0
    
    # Masks to check the most significant bits
    mask1 = 1 << 7      # 10000000
    mask2 = 1 << 6      # 01000000
    
    for num in data:
        # We only care about the last 8 bits of each integer
        byte = num & 0xFF
        
        if n_bytes == 0:
            # Count the number of leading '1's
            mask = 1 << 7
            while mask & byte:
                n_bytes += 1
                mask >>= 1
            
            if n_bytes == 0:
                continue  # Single-byte character, valid
            if n_bytes == 1 or n_bytes > 4:
                return False  # According to UTF-8: invalid lead
            # For multi-byte characters: we need (n_bytes - 1) more bytes
            n_bytes -= 1
        else:
            # Continuation bytes must start with '10xxxxxx'
            if not (byte & mask1 and not (byte & mask2)):
                return False
            n_bytes -= 1
    
    return n_bytes == 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - We process each byte exactly once, constant work per byte.
- **Space Complexity:** O(1)
  - Only a few variables for counting and masking, no extra structures based on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle input where bytes can be larger than 255?
  *Hint: Check input validity before processing; only least significant 8 bits are relevant.*
- Can you generalize this approach for validation of other encodings like UTF-16?
  *Hint: Review byte/word structure and continuation rules for those encodings.*
- How would your algorithm respond if continuation bytes appear where a lead byte is expected?
  *Hint: This would already trigger a False in your algorithm. Show with an example why.*

### Summary
This problem uses the **bit manipulation** coding pattern—key for parsing byte-level data, state tracking, and validating protocol or encoding rules.  
It is a classic example for situations where sequence rules are strict: you must track not just the current element but also state and context from preceding elements (in this case, how many more bytes are expected).  
This pattern is seen in problems like parsing network protocols, instruction decoders, or even more advanced string encoding/decoding problems.


### Flashcard
For each byte, check leading bits to determine UTF-8 length; ensure following bytes start with '10' and sequence is valid.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation)

### Similar Problems
