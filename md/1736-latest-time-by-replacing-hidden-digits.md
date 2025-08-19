### Leetcode 1736 (Easy): Latest Time by Replacing Hidden Digits [Practice](https://leetcode.com/problems/latest-time-by-replacing-hidden-digits)

### Description  
You are given a string representing time in the format "hh:mm", where some digits are unknown and replaced by '?'. Your task is to generate the **latest valid 24-hour format time** by replacing every '?' with the largest possible digit such that the result is still a valid time between 00:00 and 23:59.

### Examples  

**Example 1:**  
Input: `time = "2?:?0"`  
Output: `23:50`  
*Explanation: The first '?' (hour's tens) stays '2'. The second '?' (hour's ones) can be '3' for '23', the minute's tens '?' can be '5', so the maximum legal time is "23:50".*

**Example 2:**  
Input: `time = "0?:3?"`  
Output: `09:39`  
*Explanation: The first '?' can be '0' for '09', and the last '?' in minutes can be '9' ("09:39" is the max valid).*

**Example 3:**  
Input: `time = "1?:22"`  
Output: `19:22`  
*Explanation: The hour's ones '?' can be '9'. So the time becomes "19:22".*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all 00:00 to 23:59 and pick the lexicographically greatest matching the given mask. But that's wasteful for such a small space.
- **Observation:** The constraints for hours and minutes are tightly bounded: hours: 00-23, minutes: 00-59.
- **Greedy (Optimal):** For each '?', greedily replace it with the biggest digit that yields a valid time:
  - Hour's tens (`time`): 
    - If `time` == '?' and `time[1]` == '?' or '0'-'3', use '2'. 
    - If `time` == '?' and `time[1]` > '3', use '1' (since '24' is invalid, so only '20', '21', '22', '23' are valid for '2').
  - Hour's ones (`time[1]`): 
    - If `time[1]` == '?' and `time` == '2', use '3'.
    - Else (if `time` is '0' or '1'), use '9'.
  - Minute's tens (`time[3]`): can only be '5' max.
  - Minute's ones (`time[4]`): can be '9' max.
- This approach uses constant time and is straightforward.

### Corner cases to consider  
- Both hour digits are '?' ("??:??"): Should produce "23:59".
- Only minute digits are '?' (e.g., "12:??"): Should produce "12:59".
- Only hour's ones is '?' and tens is '2' ("2?:15"): Should be "23:15".
- Input with no '?', already valid (should return as is).
- `time[1]` is > '3', so `time` cannot be '2'.

### Solution

```python
def maximumTime(time: str) -> str:
    # Convert to a list for mutability
    t = list(time)
    
    # Hour tens
    if t[0] == '?':
        if t[1] == '?' or t[1] <= '3':
            t[0] = '2'
        else:
            t[0] = '1'
    
    # Hour ones
    if t[1] == '?':
        t[1] = '3' if t[0] == '2' else '9'
    
    # Minute tens
    if t[3] == '?':
        t[3] = '5'
    
    # Minute ones
    if t[4] == '?':
        t[4] = '9'
    
    return "".join(t)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1). All operations are just index checks and replacements in a fixed-length string.
- **Space Complexity:** O(1). Uses constant extra space for the list representation.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle an input not guaranteed to be correct format?
  *Hint: Validate the string length, the position of ':', and that all digits/unknowns are in valid positions.*

- What if the time was in 12-hour format with AM/PM indicator?
  *Hint: Adjust logic for hours (should be max 12), and ensure handling of '12' and '00' conversion with AM/PM.*

- Can you generalize this for more flexible patterns, e.g. years or any numeric mask string?
  *Hint: Provide a function that can take a format string and legal ranges for each segment.*

### Summary
This problem uses the **greedy filling pattern**, commonly seen in mask-filling or string digit replacement problems, where you must build the maximal or minimal string/number by filling unknowns optimally. This coding pattern is frequently useful whenever constructing largest (or smallest) valid numbers under specific constraints, and is especially quick and elegant for situations with tight, small, bounded positions like clock times or dates.

### Tags
String(#string), Greedy(#greedy)

### Similar Problems
- Number of Valid Clock Times(number-of-valid-clock-times) (Easy)
- Latest Time You Can Obtain After Replacing Characters(latest-time-you-can-obtain-after-replacing-characters) (Easy)