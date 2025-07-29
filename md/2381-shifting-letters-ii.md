### Leetcode 2381 (Medium): Shifting Letters II [Practice](https://leetcode.com/problems/shifting-letters-ii)

### Description  
You're given a string `s` of lowercase English letters and a list of shift operations, where each operation is a triplet `[start, end, direction]`. For each operation, you must shift every character from index `start` to `end` in the string `s`:
- if `direction` is 1, shift forward (e.g. `'a'`→`'b'`, `'z'`→`'a'`),
- if `direction` is 0, shift backward (e.g. `'b'`→`'a'`, `'a'`→`'z'`).
All shifts are cyclic. After all operations, return the resulting string.

### Examples  

**Example 1:**  
Input: `s = "abc"`, `shifts = [[0,1,0],[1,2,1],[0,2,1]]`  
Output: `"ace"`  
*Explanation:*
- Shift [0,1,0]: shift indices 0 and 1 backward: "a"→"z", "b"→"a" → `"zac"`
- Shift [1,2,1]: shift indices 1 and 2 forward: "a"→"b", "c"→"d" → `"zbd"`
- Shift [0,2,1]: shift all indices forward: "z"→"a", "b"→"c", "d"→"e" → `"ace"`

**Example 2:**  
Input: `s = "dztz"`, `shifts = [[0,0,0],[1,1,1],[2,3,0],[0,3,1]]`  
Output: `"azaa"`  
*Explanation:*
- [0,0,0]: "d"→"c" → `"cztz"`
- [1,1,1]: "z"→"a" → `"catz"`
- [2,3,0]: "t"→"s", "z"→"y" → `"casy"`
- [0,3,1]: all +1 → "c"→"d", "a"→"b", "s"→"t", "y"→"z" → `"dbtz"`

**Example 3:**  
Input: `s = "aaa"`, `shifts = [[0,2,1],[0,2,0],[0,2,1],[0,2,0]]`  
Output: `"aaa"`  
*Explanation:*
- Day all letters +1: "aaa"→"bbb"
- Then -1: "bbb"→"aaa"
- Then +1: "aaa"→"bbb"
- Then -1: "bbb"→"aaa"


### Thought Process (as if you’re the interviewee)  
The brute-force way would loop through each shift, and for each one, update all characters from `start` to `end` as required. For many operations or a long string, that would be slow—O(\#operations × n).

A better way is to use a **difference array** (or prefix sum trick):  
- Use an array `delta` of length n+1 initialized to 0.
- For each shift:  
  - If direction is 1, do `delta[start] += 1; delta[end+1] -= 1`.
  - If direction is 0, do `delta[start] -= 1; delta[end+1] += 1`.
- At the end, do a prefix sum to get the net shift for each character.
- For each position, shift the letter by its value in `delta`, using modular arithmetic to wrap around the alphabet.

This way, all operations are added up efficiently, then only a single pass is required to build the result.  
This approach is O(n + \#operations), much better for large inputs.

### Corner cases to consider  
- Empty string: `s = ""` → should return `""`
- No shifts: `shifts = []` → should return unchanged string
- Shifts going out of bounds (not possible per constraints, but worth being careful)
- Large number of shifts with overlapping ranges  
- Repeated shifts that cancel out each other
- Characters at "z" or "a", with wrapping

### Solution

```python
def shiftingLetters(s, shifts):
    n = len(s)
    delta = [0] * (n + 1)
    
    # Apply all shifts to the delta array
    for start, end, direction in shifts:
        val = 1 if direction == 1 else -1
        delta[start] += val
        if end + 1 < len(delta):
            delta[end + 1] -= val
    
    # Compute prefix sum to get net shift for each character
    for i in range(1, n):
        delta[i] += delta[i-1]
    
    res = []
    for i in range(n):
        # calc new character with wrap-around, only 0..25
        shift = delta[i] % 26
        orig = ord(s[i]) - ord('a')
        new_char = chr((orig + shift) % 26 + ord('a'))
        res.append(new_char)
    return ''.join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n = length of s, m = # of shifts.  
  Building the delta array is O(m); prefix sum and final translation are O(n).
- **Space Complexity:** O(n), for the delta array and result list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are a billion shifts and the ranges are huge?
  *Hint: Is there any further optimization if shifts totally cover the string, or are redundant?*

- How would you solve this if the string was very big and couldn’t fit in memory?
  *Hint: Can you process parts independently or in chunks?*

- Could you generalize: shift over Unicode, not just lowercase letters?
  *Hint: Need to handle variable-size alphabets, not just 26.*

### Summary
This problem uses the **difference array / prefix sum** technique for efficient range updates.  
It's a very common interview pattern for bulk range modifications (used for e.g., "Range addition," "Interval increment queries"), and helps reduce brute-force O(n × m) work to O(n + m).  
Understanding this trick is extremely useful for algorithmic interviews, especially for string or array range update problems.