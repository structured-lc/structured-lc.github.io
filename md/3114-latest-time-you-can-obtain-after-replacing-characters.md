### Leetcode 3114 (Easy): Latest Time You Can Obtain After Replacing Characters [Practice](https://leetcode.com/problems/latest-time-you-can-obtain-after-replacing-characters)

### Description  
You are given a string `s` representing a **12-hour time** in the format `"HH:MM"`, where some digits (possibly none) have been replaced with `'?'`.  
- `'HH'` must be *00* to *11* (inclusive), and `'MM'` must be *00* to *59*.
- Your task: **Replace each `'?'` with a digit** (0-9), so the resulting time is valid and as late as possible (i.e., numerically maximal in this 12-hour format).
- Return this **latest valid time** as a string.

### Examples  

**Example 1:**  
Input: `"?1:34"`  
Output: `"11:34"`  
*Explanation: Replace the first '?' with '1' for HH=11. '11:34' is the latest possible valid time.*

**Example 2:**  
Input: `"0?:5?"`  
Output: `"09:59"`  
*Explanation:  
Replace the second character with '9' → "09" for hours.  
Replace the last character with '9' → "59" for minutes.  
So, "09:59" is the latest possible valid time.*

**Example 3:**  
Input: `"??:??"`  
Output: `"11:59"`  
*Explanation:  
All unknowns.  
Hours: Max is "11", Minutes: Max is "59". Return "11:59".*

### Thought Process (as if you’re the interviewee)  
First, treat each position independently:
- For the hour positions:
  - Since only `"00"` to `"11"` are valid, the **latest is "11"**.
  - So, if position 0 is '?', choose '1' **only if position 1 can still be 1** without exceeding '11'; otherwise, pick the maximum possible.
- For minutes:
  - Valid range: "00" to "59".
  - If '?' in minutes positions, always pick '5' for position 3 and '9' for position 4.

Step by step:
- For `s` (first hour digit):
  - If `s[1] == '?'` or `s[1] ≤ '1'`: set `s = '1'` (since "11" is the biggest possible hour).
  - Else: set `s = '0'` (to keep hour ≤ "11").
- For `s[1]` (second hour digit):  
  - If `s == '1'`: pick '1' (i.e. "11" is possible).  
  - Else: pick '9' (e.g. "09" is possible).
- For `s[3]` (minute tens): always '5' for the max valid minute.
- For `s[4]` (minute ones): always '9'.

This greedy approach ensures that at every place, we choose the largest digit that does not invalidate the time.

### Corner cases to consider  
- All positions are '?'.
- Only one or two positions are '?'.
- Hour can only be "0x" because of the second digit.
- Minute positions being '?' but not hour.
- Input is already fully complete (no '?').
- Cases like "1?:??", "?0:??", "??:3?" etc.

### Solution

```python
def findLatestTime(s: str) -> str:
    # Convert input to a list for mutability
    res = list(s)

    # Handle hour first digit (res[0])
    if res[0] == '?':
        if res[1] == '?' or res[1] <= '1':
            res[0] = '1'  # Can make 10 or 11
        else:
            res[0] = '0'  # Only possible to make 09

    # Handle hour second digit (res[1])
    if res[1] == '?':
        if res[0] == '1':
            res[1] = '1'  # 11 is the latest possible
        else:
            res[1] = '9'  # Ex: 09 is the latest possible under 11

    # Handle minute tens (res[3])
    if res[3] == '?':
        res[3] = '5'  # Max possible for tens place in minute

    # Handle minute ones (res[4])
    if res[4] == '?':
        res[4] = '9'  # Max possible for ones place in minute

    return ''.join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  The string is always length 5. Each check is a constant-time operation, no loops.

- **Space Complexity:** O(1)  
  Only a fixed-size `list` of length 5 is used, regardless of input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the format was 24-hour?  
  *Hint: Need to handle 00-23, with more careful constraints for hour digits.*

- How would you extend this to other formats (e.g., "HH:MM:SS")?  
  *Hint: Same greedy approach, but expand the range logic for each position.*

- Can you validate an already complete input for correctness?  
  *Hint: Parse and check bounds for each part; just check hour ∈ [0, 11] and minute ∈ [0, 59].*

### Summary
This problem is a classic example of **greedy character substitution** under digit constraints. The solution walks through each time digit, greedily picking the largest possible digit that forms a valid 12-hour time. This pattern (greedy string replacement within validation ranges) is common for problems involving masked numeric data, and variants of this appear in clock/time formatting, form validation, and partial data completion.


### Flashcard
Treat hour and minute independently. For hours, maximize first digit (1 if second can be ≤ 1, else 0), then second digit (1 if first is 1, else 9). For minutes, always pick 5 then 9.

### Tags
String(#string), Enumeration(#enumeration)

### Similar Problems
- Latest Time by Replacing Hidden Digits(latest-time-by-replacing-hidden-digits) (Easy)