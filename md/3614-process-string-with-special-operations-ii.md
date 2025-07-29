### Leetcode 3614 (Hard): Process String with Special Operations II [Practice](https://leetcode.com/problems/process-string-with-special-operations-ii)

### Description  
Given a string **s** with lowercase letters and special characters `*`, `#`, `%`, and an integer **k** (1-based), return the kᵗʰ character in the fully processed result string. If **k** is out of bounds, return '.'.

Rules for processing **s** from left to right:
- Letter: append to result.
- `*`: remove last character if exists.
- `#`: duplicate current result and append (result = result + result).
- `%`: reverse current result.

**Note:** The processed string can be exponentially large from duplications, so you must not build it entirely. 

### Examples  

**Example 1:**  
Input: `s = "a#b", k = 2`  
Output: `a`  
*Explanation: 'a' → "a", `#`: "aa", 'b': "aab". The 2ⁿᵈ character: 'a'.*

**Example 2:**  
Input: `s = "ab#%", k = 4`  
Output: `a`  
*Explanation: 'a' ("a"), 'b' ("ab"), `#`: ("abab"), `%`: ("baba"). 4ᵗʰ character is 'a'.*

**Example 3:**  
Input: `s = "a*#", k = 1`  
Output: `.`  
*Explanation: 'a' → "a", `*`: "", `#`: "". 1st character out of bounds: '.'.*


### Thought Process (as if you’re the interviewee)  
- If we simulate directly, result could be huge (exponential).
- Need to **simulate the operations** on the length only (forward pass), compute the final result length.
- Then, using **reverse engineering** (backward trace), for position k, trace back which char of the previous state is responsible for it:
    - For `#`, the result is twice as long; if k ≤ prev_len, k from first half; else subtract prev_len for second half.
    - For `%`, reverse: actual index is len - k + 1 if 1-indexed.
    - For `*`, whenever non-empty and char removed, length decreases by 1.
- Trace k back through the operations, never building the full string.
- If at any point, k is out of bounds, return '.'.

### Corner cases to consider  
- k > length after processing (return '.')
- Result is empty after all operations
- Undoing an append by a star, or star with empty result
- Multiple duplications or reverses in a row


### Solution

```python
def get_kth_char(s: str, k: int) -> str:
    n = len(s)
    # Forward: calculate length after each op
    lens = [0] * (n + 1)
    for i in range(n):
        c = s[i]
        if 'a' <= c <= 'z':
            lens[i+1] = lens[i] + 1
        elif c == '*':
            lens[i+1] = max(0, lens[i] - 1)
        elif c == '#':
            lens[i+1] = lens[i] * 2
        elif c == '%':
            lens[i+1] = lens[i]
    # If k > length, return '.'
    if k > lens[n] or k < 1:
        return '.'
    # Backward: trace back k
    for i in range(n, 0, -1):
        c = s[i-1]
        if 'a' <= c <= 'z':
            if lens[i] == lens[i-1] + 1:
                if k == lens[i]:
                    return c
                # else: k remains
        elif c == '*':
            if lens[i] == lens[i-1] - 1:
                # a char has been popped
                if k == lens[i-1]:
                    # would have been the last char
                    return '.'
                # else k remains
        elif c == '#':
            if k > lens[i] // 2:
                k -= lens[i] // 2
            # else: k stays
        elif c == '%':
            k = lens[i] - k + 1
    return '.'
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), where n is the length of s. No string concatenations or reverses are actually done.
- **Space Complexity:** O(n), for storing lengths at each step.


### Potential follow-up questions (as if you’re the interviewer)  
- How would you handle queries for multiple k, efficiently?
  *Hint: Share the length array, trace back independently per query.*
- What if another special character was added, e.g., random shuffle?
  *Hint: You may have to store extra state or process per op type.*
- Can the solution work if result length is up to 10¹⁸?
  *Hint: Yes, as we never build the explicit result.*

### Summary
This is a prototypical **string reverse engineering** and simulation problem, requiring you to process instructions in reverse to trace a particular position. Patterns from this problem appear in compressed string queries, version stacks, and browser or text editor undo/redo internals.