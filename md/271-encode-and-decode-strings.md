### Leetcode 271 (Medium): Encode and Decode Strings [Practice](https://leetcode.com/problems/encode-and-decode-strings)

### Description  
Design an algorithm to **encode a list of strings as a single string** so that it can be sent over a network, and then **decode it back to the original list of strings**. The encoding and decoding methods must be self-contained (i.e., not using eval or a built-in serialize method) and must handle all edge cases, including arbitrary characters in the strings.

Suppose you have:
- `encode` that takes `List[str]` and returns `str`
- `decode` that takes a single `str` and returns `List[str]`

After encoding and sending, decoding must return exactly the original list.  
The solution must be **robust** (e.g., if a string contains special characters or delimiters, decoding must still work properly).

### Examples  

**Example 1:**  
Input: `["hello", "world"]`  
Output: `'5#hello5#world'`  
Explanation:  
Each string is encoded as `[length]#[string]`.  
- "hello" → `"5#hello"`
- "world" → `"5#world"`  
The concatenated encoded string is `'5#hello5#world'`.  
Decoding parses numbers before each `#` to know string lengths, then extracts those segments.

**Example 2:**  
Input: `["", "abc", "d#f"]`  
Output: `'0#3#abc3#d#f'`  
Explanation:  
- "" → `'0#'`  
- "abc" → `'3#abc'`  
- "d#f" → `'3#d#f'` (note: '#' can appear in string content. We use the known count to extract string accurately.)

**Example 3:**  
Input: `[]`  
Output: `''`  
Explanation:  
An empty list encodes to an empty string. Decoding it produces `[]`.


### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  I considered separating the strings with a special delimiter (like ',') and `join`/`split`, but this doesn't work if delimiters appear in the strings themselves (e.g., "a,b", "c"). A string might contain any possible character, including chosen delimiters.

- **Robust Approach:**  
  Instead, I can encode each string with its **length** and a separator. For example, `"hello"` becomes `"5#hello"`, and concatenate all such encodings.  
  On decoding, I scan for numbers until the '#' character to determine the length, then read that many characters, repeat for the full string.  
  This approach avoids delimiter conflicts and guarantees safe encoding/decoding.

- **Why this approach:**  
  - Simple to implement.
  - Linear time encoding/decoding.
  - Works for any content, including empty strings or non-ASCII characters.
  - The trade-off is a bit of extra metadata, but it's negligible.

### Corner cases to consider  
- List contains empty strings: `["", "", "abc"]`.
- Strings have the separator character (e.g. "#").
- Strings have numbers at start or end.
- Unicode or special characters.
- Very long strings.
- Single string in the list.
- Empty input list: `[]`.


### Solution

```python
class Codec:
    # Encodes a list of strings to a single string.
    def encode(self, strs):
        # For each string, encode as: str(len(s)) + '#' + s
        return ''.join(
            f"{len(s)}#{s}" for s in strs
        )

    # Decodes a single string to a list of strings.
    def decode(self, s):
        res = []
        i = 0
        while i < len(s):
            # Find location of separator
            j = i
            while j < len(s) and s[j] != '#':
                j += 1
            # Extract length
            length = int(s[i:j])
            # Extract substring of that length after '#'
            j += 1 # skip '#'
            res.append(s[j:j + length])
            i = j + length
        return res

# Example usage:
# codec = Codec()
# encoded = codec.encode(["hello","world"])
# decoded = codec.decode(encoded)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Encoding: O(n + total_chars), where n is the number of strings and total_chars is the sum of their lengths.  
  - Decoding: O(L), L = length of the encoded string (since we process each character once).

- **Space Complexity:**  
  - Encoding: O(L) for the resulting string.
  - Decoding: O(k + total_chars), where k = number of strings (for list overhead), and total_chars is the sum of the decoded strings (for string storage).


### Potential follow-up questions (as if you’re the interviewer)  

- What if the string length is very large (e.g., millions of characters)?
  *Hint: Can you process in a streaming/iterative manner if sending data over a network chunk by chunk?*

- Can you encode a list of integers or more complex data types?
  *Hint: Consider serializing non-string data (e.g. with `str(x)` and use the same schema.)*

- What if some strings are extremely large and memory is a constraint?
  *Hint: Think about how to decode without holding the entire result in memory at once.*


### Summary
The problem uses a **custom serialization pattern**, encoding each string as `[length]#[string]` to guarantee safe, reversible conversion between a list of strings and a plain string. This avoids delimiter conflicts since the length prefix always determines exact string boundaries.  
It's a **common pattern** in network protocols, file formats, and database serialization: anywhere you need robust, delimiter-agnostic encoding/decoding.  
The approach is clean, linear time, and very reliable for arbitrary string content.