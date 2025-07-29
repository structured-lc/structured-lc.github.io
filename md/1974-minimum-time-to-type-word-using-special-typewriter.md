### Leetcode 1974 (Easy): Minimum Time to Type Word Using Special Typewriter [Practice](https://leetcode.com/problems/minimum-time-to-type-word-using-special-typewriter)

### Description  
You are given a **special typewriter** with lowercase English letters 'a' to 'z' arranged **in a circle**. There's a single pointer that starts at 'a'.  
- At each second, you may:  
  - Move the pointer **clockwise** or **counterclockwise** by one letter,  
  - Or **type** the character the pointer is currently on (pressing the key for that letter).  
Return the **minimum number of seconds** to type a given string word, where you must type each character in order (no skipping or reordering).

### Examples  

**Example 1:**  
Input: `word = "abc"`  
Output: `5`  
*Explanation:  
- Start at 'a'; type 'a' (1 sec).  
- Move clockwise to 'b' (1 sec), type 'b' (1 sec).  
- Move clockwise to 'c' (1 sec), type 'c' (1 sec).  
Total = 5 seconds.*

**Example 2:**  
Input: `word = "bza"`  
Output: `7`  
*Explanation:  
- Start at 'a'; move to 'b' (1 sec), type 'b' (1 sec).  
- Move clockwise from 'b' to 'z' (1 sec), type 'z' (1 sec).  
- Move counterclockwise from 'z' to 'a' (1 sec), type 'a' (1 sec).  
Total move times: 1 (to 'b') + 1 (to 'z') + 1 (to 'a') = 3  
Typing times: 3  
Total = 6 but need to count move from 'b' to 'z' which is 25 steps counter, but clockwise is 1 step; choose min(24, 2), so it's 1.  
So total = 7 seconds.*

**Example 3:**  
Input: `word = "zjpc"`  
Output: `34`  
*Explanation: Step through and always use the minimal movement between letters, accounting for the circle.*

### Thought Process (as if you’re the interviewee)  
First, since the letters are arranged in a circle, moving from any letter to another can be done either clockwise or counterclockwise. For any two letters (say from cur to target),  
- The clockwise distance is abs(ord(cur) - ord(target)).  
- The counterclockwise distance is 26 - that value.  
We always use the minimum of the two.

For each letter in the word,  
1. Calculate the minimal movement from current pointer to next letter.
2. Add one second for the typing action.

Start with pointer at 'a', keep updating the pointer as you type each character.  
Time = total moves + number of characters (for typing).

This is a classic greedy pattern: at each step, always take the least-move option.

### Corner cases to consider  
- Empty string: Should return 0 (no typing, no movement).
- All letters the same: Only typing time, no movement between letters.
- Letters separated by largest possible step ('a' to 'n', or 'a' to 'z').
- Single-letter input.
- Large inputs (long word): Make sure time complexity is linear.

### Solution

```python
def minTimeToType(word: str) -> int:
    # Start pointer at 'a'
    pointer = 'a'
    # Accumulate total seconds taken
    total_time = 0

    for char in word:
        # Calculate clockwise distance
        clockwise = abs(ord(char) - ord(pointer))
        # Counterclockwise is wrapping the rest of the way
        counterclockwise = 26 - clockwise
        # Choose the minimum movement
        move_time = min(clockwise, counterclockwise)
        # One second to type the character
        total_time += move_time + 1
        # Move pointer to current char
        pointer = char

    return total_time
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of word. Each character requires O(1) calculation.
- **Space Complexity:** O(1), no extra storage except counters and pointer. Not dependent on input length.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the typewriter contains more than 26 symbols or a different set of characters?  
  *Hint: How would you generalize the movement calculations for n symbols?*

- How would you handle the case if the typing pointer could start at any letter, not always at 'a'?  
  *Hint: How would the code change if the start was a parameter?*

- If there are costs assigned to changing letters (i.e., some transitions take longer), how would you adapt the approach?  
  *Hint: Can you prebuild a cost map or need to model as a graph?*

### Summary
This problem is a **greedy pattern** around minimal incremental cost between circular array elements.  
It can be applied to ring-like data structures, minimum-walk on modulus/jump operations, and scenarios where cyclic distance (wrapping around) must be measured.  
No advanced data structures are needed; the solution is optimized and purely arithmetic.