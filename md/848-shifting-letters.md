### Leetcode 848 (Medium): Shifting Letters [Practice](https://leetcode.com/problems/shifting-letters)

### Description  
Given a string s of lowercase English letters and an integer array shifts of the same length, you’re to shift the first i + 1 letters of s by shifts[i] positions. Each shift moves the current letter forward in the alphabet by one (wrapping 'z' to 'a'). The goal is to apply all shifts and return the resulting string.  
For example:  
- If shifts[i] = 4 at position i = 2, you’ll shift the first 3 characters 4 times ahead in the alphabet.

### Examples  

**Example 1:**  
Input: `s = "abc", shifts = [3,5,9]`  
Output: `"rpl"`  
*Explanation:*
- shifts = [3,5,9]
- Shift first 3 letters by 9 ⇒ "jkl"
- Shift first 2 letters by 5 ⇒ "oql"
- Shift first 1 letter by 3 ⇒ "rql"
- Final string: "rpl"

**Example 2:**  
Input: `s = "aaa", shifts = [1,2,3]`  
Output: `"gfd"`  
*Explanation:*
- Total shifts for each character:  
  - 1ˢᵗ char: 1 + 2 + 3 = 6, 'a' + 6 → 'g'
  - 2ⁿᵈ char: 2 + 3 = 5, 'a' + 5 → 'f'
  - 3ʳᵈ char: 3, 'a' + 3 → 'd'

**Example 3:**  
Input: `s = "z", shifts = `  
Output: `"z"`  
*Explanation:*  
A shift of 52 brings 'z' around the alphabet twice, so it remains 'z'.

### Thought Process (as if you’re the interviewee)  
First, I’d think about simulating the process directly:  
- For each position i, apply `shifts[i]` (>0) to the first i+1 chars.  
- This means for every shift, many letters are updated multiple times, resulting in O(n²) time—inefficient.

To optimize:
- Observe that for each character s[i], it is affected by all shifts[j] where i ≤ j < n (since each shift[j] applies to all letters from beginning up to j).
- Precompute, from right to left, the total shifts each character gets using a single pass and prefix sums.
- Apply the resulting total shifts to each letter, using modulo 26 to account for wrapping around the alphabet.

### Corner cases to consider  
- Empty string or empty shifts array  
- Large shift values (like multiples of 26)  
- All shift values are 0  
- Only one character  
- Letters that wrap from 'z' to 'a'

### Solution

```python
def shiftingLetters(s, shifts):
    n = len(s)
    # Convert to list for mutability
    s = list(s)
    # Traverse shifts right-to-left, accumulating total shift
    total_shift = 0
    for i in range(n - 1, -1, -1):
        total_shift = (total_shift + shifts[i]) % 26
        # Shift character, wrap around using modulo
        s[i] = chr((ord(s[i]) - ord('a') + total_shift) % 26 + ord('a'))
    return ''.join(s)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — one pass to compute cumulative shifts and shift the string; each character is processed once.
- **Space Complexity:** O(n) — for the mutable list (or O(1) if we reuse and return a new string without extra structures except input/output).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array shifts is very large (i.e., memory limits), but only a few nonzero values?  
  *Hint: How to process efficiently when data is sparse?*

- What if each shift can be negative, i.e., we sometimes need to shift left?  
  *Hint: How is negative modulo handled in Python for alphabet wraparound?*

- What if instead of lowercase, the string could contain both upper and lowercase?  
  *Hint: How would you generalize the shifting logic to multiple alphabets?*

### Summary
This approach uses a prefix-sum-style reverse traversal to efficiently precompute cumulative shifts and vectorizes the shifting process to O(n) time, rather than simulating each shift update in O(n²). The pattern is common in *range update* or *sweep line* problems, where you aggregate changes in advance and apply effects in a single pass, which can also be used for difference arrays or cumulative interval counting.