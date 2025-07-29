### Leetcode 1678 (Easy): Goal Parser Interpretation [Practice](https://leetcode.com/problems/goal-parser-interpretation)

### Description  
Given a command string consisting of "G", "()", and "(al)" in any sequence, interpret and translate it to a new string as follows:
- "G" becomes "G"
- "()" becomes "o"
- "(al)" becomes "al"
Return the interpreted string.

### Examples  
**Example 1:**  
Input: `command = "G()(al)"`  
Output: `Goal`  
*Explanation: "G" -> "G", "()" -> "o", "(al)" -> "al" => "Goal"*

**Example 2:**  
Input: `command = "G()()()()(al)"`  
Output: `Gooooal`  
*Explanation: There are four "()" which become four "o"s, plus one "(al)".*

**Example 3:**  
Input: `command = "(al)G(al)()()G"`  
Output: `alGalooG`  
*Explanation: "(al)" first, then "G", then "(al)", two "()" as "oo", then "G".*


### Thought Process (as if you’re the interviewee)  
- I need to scan the string and replace patterns: "()" with "o", "(al)" with "al". Single character "G" stays "G". 
- Options: perform explicit string replacement, or loop through and build result character by character, detecting each pattern.
- Since patterns don't overlap and have different lengths, a pointer-based parsing is easy and unambiguous.


### Corner cases to consider  
- The command is only "G".
- The command is only repetitions of "()".
- The command alternates between different patterns.
- Very long input string (test efficiency).


### Solution

```python
def interpret(command: str) -> str:
    res = []
    i = 0
    while i < len(command):
        if command[i] == 'G':
            res.append('G')
            i += 1
        elif command[i:i+2] == '()':
            res.append('o')
            i += 2
        elif command[i:i+4] == '(al)':
            res.append('al')
            i += 4
    return ''.join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N = length of command. Each character is checked at most once.
- **Space Complexity:** O(N), storing the interpreted string.


### Potential follow-up questions (as if you’re the interviewer)  

- Can this be solved using regular expressions?
  *Hint: Use re.sub to replace all patterns.*

- What if patterns could overlap or be ambiguous?
  *Hint: More advanced parsing, e.g., FSM or recursive descent.*

- How would you parse if there were more or nested pattern types?
  *Hint: Generalize the parser logic for more token types.*

### Summary
A simple parsing/string manipulation problem, classic pattern for scanner or interpreter. Checking substring slices and incrementing pointer. Applies to situations where you need to implement a lightweight domain-specific interpreter.