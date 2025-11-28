### Leetcode 3324 (Medium): Find the Sequence of Strings Appeared on the Screen [Practice](https://leetcode.com/problems/find-the-sequence-of-strings-appeared-on-the-screen)

### Description  
You are given a string target. Starting from an empty string, Alice can only use a special keyboard with two keys:
- Key 1: Appends the character "a" to the current string.
- Key 2: Changes the last character of the current string to its next English alphabet letter (wrapping from "z" to "a").  
Every time she appends or increments, the current screen string changes.  
Your task: return a list of all intermediate strings, in order, that appear on the screen as Alice types the target in the minimum number of key presses.

### Examples  

**Example 1:**  
Input: `target = "abc"`  
Output: `["a", "b", "c"]`  
*Explanation: Start with empty.  
Type "a" (append) → "a".  
Increment last to "b" → "b".  
Increment last to "c" → "c".*

**Example 2:**  
Input: `target = "ace"`  
Output: `["a", "b", "c", "a", "b", "c", "d", "e"]`  
*Explanation:  
- Append "a": "a"  
    - Increments: "b", "c"  
- Append "a": "ca"  
    - Increments: "b", "c", "d", "e"  
So the sequence is ["a", "b", "c", "ca", "cb", "cc", "cd", "ce"].*

**Example 3:**  
Input: `target = "aaa"`  
Output: `["a", "aa", "aaa"]`  
*Explanation: Just keep appending "a".*

### Thought Process (as if you’re the interviewee)  
First, simulate the process step by step. For each target character:
- If starting a new character, always append "a".
- Then, if the desired character is not "a", increment the last character until it matches.  
For each new character in the target string, append the difference between it and 'a', counting wraps from 'z' to 'a'.

At every operation (append or increment), we record the new string.

A brute-force solution is to build the string from scratch:  
- For each target[i],  
    - append "a", then  
    - repeatedly increment until equals target[i].
But we can simulate this linear, O(n × k), where k is average increments.

Key realization: There is no shortcut because with only these two operations, we must go character by character.

### Corner cases to consider  
- Empty string `target=""` → Output should be empty list.
- All characters are "a": only append steps.
- Repeated letters: ensure you don’t reuse the previous character.
- "z" in string: wrapping must go "z"→"a" correctly.
- Single character target.
- Long target string (e.g., length 400): implementation needs to be efficient but not necessarily sub-linear.

### Solution

```python
def find_sequence_of_strings(target: str):
    result = []
    curr = ''
    for i, ch in enumerate(target):
        # Start a new character by appending 'a'
        curr += 'a'
        result.append(curr)
        # Now increment last character until it matches target character
        while curr[-1] != ch:
            # Get current last character
            last = curr[-1]
            # Next character with wrap around
            next_ch = chr(((ord(last) - ord('a') + 1) % 26) + ord('a'))
            curr = curr[:-1] + next_ch
            result.append(curr)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k), where n = len(target) and k is the average number of increments needed per character (max 26 per char). For English lowercase, this is acceptable for the constraints.
- **Space Complexity:** O(N), due to the output list storing all intermediate strings. Additional space for `curr`, but negligible compared to result list.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you minimize key presses if the allowed keys let you increment any character, not just the last?  
  *Hint: Think of dynamic programming, replacing any character, or even memoizing substrings.*

- What changes if the keyboard has a "delete" key?  
  *Hint: You might need to backtrack if you make mistakes or want optimal path recalculation.*

- Could you return only the final number of key presses instead of the intermediate strings?  
  *Hint: Just simulate the process and count.*

### Summary
This approach simulates the keyboard operations, recording all intermediate strings as required by the typing process. The coding pattern is simulation and greedy string construction—understanding the restrictions and directly translating operations step-by-step. This pattern is common in problems involving system process simulation and greedy/step-by-step state transitions.


### Flashcard
Simulate character-by-character: for each target[i], append "a" then increment last character (wrapping 'z'→'a') until it matches target[i]; record string after each operation.

### Tags
String(#string), Simulation(#simulation)

### Similar Problems
- Keyboard Row(keyboard-row) (Easy)