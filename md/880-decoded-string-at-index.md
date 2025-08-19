### Leetcode 880 (Medium): Decoded String at Index [Practice](https://leetcode.com/problems/decoded-string-at-index)

### Description  
Given an **encoded string** S and an integer K, return the **Kᵗʰ** letter (1-indexed) in the decoded string.  
The encoding rule is:  
- If a character is a **letter**, write it on the tape.
- If a character is a **digit d**, the entire current tape is repeated d-1 more times (so repeated d times in total).  
**Note:** The decoded string may be extremely large, so you must find a way to get the answer without fully constructing it.

### Examples  

**Example 1:**  
Input: `S = "leet2code3", K = 10`  
Output: `"o"`  
*Explanation: Decoded string is "leetleetcodeleetleetcodeleetleetcode". The 10ᵗʰ character is "o".*

**Example 2:**  
Input: `S = "ha22", K = 5`  
Output: `"h"`  
*Explanation: Decoded string is "hahahaha", 5ᵗʰ character is "h".*

**Example 3:**  
Input: `S = "a2345678999999999999999", K = 1`  
Output: `"a"`  
*Explanation: Decoded string is just "a" repeated a huge number of times, so the 1ˢᵗ character is "a".*

### Thought Process (as if you’re the interviewee)  

First, I thought of simulating the decoding process, but quickly realized that the string could grow to an enormous size, making this brute-force approach infeasible for both time and space.  
So, next, I tried to **compute the final length** of the decoded string by walking through S, multiplying or increasing a length count depending on whether I was at a digit or letter.  

Once I get the total decoded length, I can work **backwards**: every time I see a digit while unwinding S from the back, I reduce K using modulo, to only consider the relevant segment.  
- When I hit a digit, the current decoded length was multiplied by that digit, so I reduce the length by dividing.
- When I hit a letter, I simply check if the current length matches K, and decrement otherwise.

This **reverse traversal** avoids building the huge string, letting us find the answer with O(N) time and O(1) extra space. The only trick is carefully handling 1-indexing and modulo at the right time[1][2].

### Corner cases to consider  
- S contains only one letter, e.g., `"a"`, K = 1.
- K points to the very end or start of the decoded string.
- S contains no digits (entire string is letters).
- Multiple consecutive digits.
- K is larger than the length of the decoded string.
- Empty string S (shouldn't happen by constraints, but mention).
- Digits are '2' or very large (test integer overflows).

### Solution

```python
def decodeAtIndex(S: str, K: int) -> str:
    # Step 1: Find the length of the decoded string
    decoded_len = 0
    for c in S:
        if c.isdigit():
            decoded_len *= int(c)
        else:
            decoded_len += 1

    # Step 2: Traverse from the back, reducing K as we go
    for i in range(len(S) - 1, -1, -1):
        c = S[i]
        K %= decoded_len
        if K == 0 and c.isalpha():
            # If K is 0 and it's a letter, that's the answer
            return c
        if c.isdigit():
            decoded_len //= int(c)
        else:
            decoded_len -= 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N) — We make two passes over the input string: one forward to compute decoded length, one backward to unwind the decoding. Each pass is O(N) where N = len(S).

- **Space Complexity:** O(1) — Apart from variables for decoding length and counters, we do not use any extra space that depends on the input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if K is larger than the decoded string length?  
  *Hint: How do you compute the length before searching for the character?*

- How would you handle non-ASCII characters or digits exceeding single digits?  
  *Hint: Think about parsing and generalizing the digit processing.*

- Can you return all letters at positions [K₁, K₂, ...] efficiently in one pass?  
  *Hint: Parallel tracking or batch positioning logic.*

### Summary
This problem uses a **reverse decoding** and **modulo reduction** pattern, which frequently appears when the expanded result is too large to construct directly.  
Similar logic applies in compressed file expansions, run-length decoding, and tape simulation where only the result at a particular index is requested—never the whole output.  
It emphasizes careful string traversal, pre-computation of cumulative sizes, and reverse engineering repeated structures.

### Tags
String(#string), Stack(#stack)

### Similar Problems
