### Leetcode 717 (Easy): 1-bit and 2-bit Characters [Practice](https://leetcode.com/problems/1-bit-and-2-bit-characters)

### Description  
Given an array `bits` containing only `0` and `1`, each representing a bit, where:
- A single `0` represents a one-bit character.
- A pair of bits starting with `1` (`10` or `11`) represents a two-bit character.

Your task is to determine if the last character in `bits` must be a one-bit character (i.e., the last `0` stands alone and is not part of a two-bit character). The array always ends with a `0`.


### Examples  

**Example 1:**  
Input: `bits = [1,0,0]`  
Output: `True`  
*Explanation: The only parsing is `[1,0]` (two-bit) and `` (one-bit). So, the last character is a one-bit character.*

**Example 2:**  
Input: `bits = [1,1,1,0]`  
Output: `False`  
*Explanation: The only parsing is `[1,1]` (two-bit) and `[1,0]` (another two-bit). So, the last character is NOT a one-bit character.*

**Example 3:**  
Input: `bits = [0,0,0]`  
Output: `True`  
*Explanation: All are one-bit characters: ``, ``, ``.*

### Thought Process (as if you’re the interviewee)  

- The task is to figure out whether the *last* bit (which is always 0) forms its *own* one-bit character or is consumed as the second bit of a two-bit character.
- Brute-force: Try all possible ways of dividing the string into valid 1- and 2-bit characters. This is not efficient and may get complicated for long arrays.
- **Observation:** Only a `1` at a given index can start a two-bit character. So, I can *walk through* the array from left, always moving:
  - 2 steps if I see `1` (since it and the next bit form a two-bit character)
  - 1 step if I see `0` (since it's a one-bit character)
- The crux is to see if we *land* on the last bit alone. If so, that means the last 0 is a one-bit character. If we never land on it (but skip past or "consume" it by a two-bit character), the answer is False.
- This method is efficient and simple: O(n) time, O(1) space.
- There is an alternative solution: scan backward from the end and count contiguous 1's before the last 0 — if the count is even, the last 0 is its own one-bit character; if odd, it's part of a two-bit character. Both work, but the forward scan is clearer and easier to explain and debug.

### Corner cases to consider  
- Empty array (not possible due to constraints, but good to note).
- All zeros: `[0,0,0]` — must return True.
- Sequence with only one bit: `` — True.
- A two-bit character at the very end: e.g., `[1,0,1,0]`.
- Mix of one- and two-bit characters.
- Multiple `1`s in a row (forces multiple 2-bit jumps).


### Solution

```python
def isOneBitCharacter(bits):
    # Pointer to scan through the array
    i = 0
    # Process up to the second-last bit (since last bit is always 0)
    while i < len(bits) - 1:
        # If the current bit is 1, it's a two-bit character, jump 2 steps
        # If it's a 0, it's a one-bit character, jump 1 step
        i += bits[i] + 1
    # If we stopped at the last bit, it means it is a one-bit character
    return i == len(bits) - 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since in the worst case we process each bit once, jumping over them by one or two steps.
- **Space Complexity:** O(1), as only a pointer variable is used, no extra space proportional to input size.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the bits array could end with `1`?  
  *Hint: What does it mean for the parsing? Is the input valid if last bit is `1`?*

- Can you write it recursively, or with a DP approach?  
  *Hint: Try to simulate all possible paths and discuss the trade-offs between top-down recursion and this greedy pointer approach.*

- If you now wanted to return the number of one-bit characters in the string, how would you modify your algorithm?  
  *Hint: Track whenever you make a one-step jump and increment a counter.*


### Summary
We used a **greedy pointer scan**: repeatedly jump by `2` if we see a `1`, or `1` if we see a `0`, and check if we land *exactly* on the last index. This avoids backtracking or recursion and leverages the parsing rules given. This pointer traversal pattern is common in string parsing and bit manipulations, and appears frequently in "decode message" type problems.

### Tags
Array(#array)

### Similar Problems
- Gray Code(gray-code) (Medium)