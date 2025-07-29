### Leetcode 2810 (Easy): Faulty Keyboard [Practice](https://leetcode.com/problems/faulty-keyboard)

### Description  
Given a string `s`, simulate typing it on a faulty keyboard where:
- Every time you type the character `'i'`, it **does not appear** in the text; instead, it **reverses the entire string** typed so far.
- Any other character is appended as usual.

Return the **final string** on the screen after you’ve typed all characters in `s`.

### Examples  

**Example 1:**  
Input: `string`  
Output: `rtsng`  
*Explanation: Type 's', 't', 'r', and then 'i' ⇒ reverse 'str' to 'rts', then type 'n', 'g'.*

**Example 2:**  
Input: `poiinter`  
Output: `ponter`  
*Explanation: After typing 'p', 'o', 'i' ⇒ reverse to 'op', then add 'n', 't', type 'e', 'r', for final output 'ponter'.*

**Example 3:**  
Input: `abcdefghi`  
Output: `hgfedcba`  
*Explanation: Typing up to 'i' will reverse the current string 'abcdefgh' to 'hgfedcba'.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force idea is to keep a result string and for every character in `s`, if it’s `'i'`, reverse the string so far; otherwise, append the character. Since reversing each time could be costly, in practice, Python’s list operations make reversing efficient enough for this problem size (length ≤ 100).  
Optimal approach:
- Build using a list for efficient append operations.
- Reverse the list whenever `'i'` is encountered.
- Finally, join the list into a string.

Trade-offs:
- For every `'i'`, reversing takes O(k) where k is current string length, but given n ≤ 100, total work is acceptable.
- More complicated data structures (like double-ended queues) are unnecessary for these constraints.

### Corner cases to consider  
- All characters are `'i'` (output: empty string, since all flips, nothing new typed).
- `s` does **not** contain any `'i'` (output: original string).
- `'i'` at the end (reverse at the end).
- Input length == 1.
- `'i'` is the first character (constraint says s ≠ 'i').
- Reversal causes nested reordering (e.g., many 'i's).
- Consecutive 'i's (multiple reversals without new characters).

### Solution

```python
def finalString(s: str) -> str:
    # Use a list for efficient append and reversal
    result = []
    for c in s:
        if c == 'i':
            # Reverse the string typed so far
            result.reverse()
        else:
            # Append current character
            result.append(c)
    # Join the list into a string for the final result
    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) worst-case (if every character is 'i', each reverse takes O(k) for current length k), but practical for n ≤ 100.
- **Space Complexity:** O(n) for storing the result list up to the input length.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize for arbitrary reversal keys or multiple keys?  
  *Hint: What if any of a set of characters triggered reversal?*

- Can you optimize for a much longer string (n in millions) and many reversals?  
  *Hint: Avoid frequent costly reversals -- can you simulate reversals or track orientation?*

- How can you adapt the algorithm if instead of reversing, another transformation was applied, e.g., shifting all letters?  
  *Hint: Make the transformation an argument to a processing function.*

### Summary
This problem uses the **simulation pattern**, directly modeling the behavior described. The main coding pattern is: **string building with in-place transformations**, a common approach for many parsing/simulation questions. Understanding efficient use of string/list operations is key, especially for constrained input sizes, and can be broadly applied to problems involving stream processing or interpreters.